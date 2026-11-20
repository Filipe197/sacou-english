-- 017: métricas dos testadores (funil, retorno e onde desistem).
-- Rode depois de 016_trilha_maior.sql. Pode rodar de novo sem problema.
--
-- Cada vez que alguém abre uma lição, o app grava uma linha (a "tentativa") e vai
-- atualizando em que exercício a pessoa está. Se ela fecha o app no meio, a linha fica
-- sem "finished_at" e mostra exatamente onde parou. Só o próprio aluno grava as suas;
-- só o administrador vê o resumo (função admin_funnel, usada no painel Admin).
-- Ao excluir a conta, as linhas somem junto (on delete cascade).

create table if not exists public.lesson_runs (
  id          uuid primary key,
  user_id     uuid not null default auth.uid() references auth.users(id) on delete cascade,
  lesson_id   text not null check (char_length(lesson_id) between 1 and 80),
  total       smallint not null default 0 check (total between 0 and 500),
  last_step   smallint not null default 0 check (last_step between 0 and 500),
  last_item   text check (last_item is null or char_length(last_item) <= 80),
  started_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  finished_at timestamptz
);
create index if not exists lesson_runs_time on public.lesson_runs (started_at desc);
create index if not exists lesson_runs_user on public.lesson_runs (user_id, started_at);

alter table public.lesson_runs enable row level security;
drop policy if exists "runs: ver as minhas" on public.lesson_runs;
create policy "runs: ver as minhas" on public.lesson_runs for select using (auth.uid() = user_id);
drop policy if exists "runs: criar as minhas" on public.lesson_runs;
create policy "runs: criar as minhas" on public.lesson_runs for insert with check (auth.uid() = user_id);
drop policy if exists "runs: mudar as minhas" on public.lesson_runs;
create policy "runs: mudar as minhas" on public.lesson_runs for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
grant select, insert, update on public.lesson_runs to authenticated;

-- ---------- resumo para o painel Admin ----------
-- p_days: janela em dias (cadastros e tentativas desse período).
create or replace function public.admin_funnel(p_days int default 30)
returns json language plpgsql stable security definer set search_path = public as $$
declare
  v_days int := least(greatest(coalesce(p_days, 30), 1), 365);
  v_from timestamptz := now() - make_interval(days => v_days);
  v_today date := public.today_br();
begin
  if not public.is_admin() then raise exception 'forbidden'; end if;
  return (
    with coorte as (
      select id from public.profiles where created_at >= v_from
    ),
    primeiro_dia as (
      select d.user_id, min(d.day) as d0 from public.daily_xp d
      where d.user_id in (select id from coorte) group by d.user_id
    ),
    abandonos as (
      select * from public.lesson_runs
      where started_at >= v_from and finished_at is null and updated_at < now() - interval '1 hour'
    )
    select json_build_object(
      'days', v_days,
      'signed_up', (select count(*) from coorte),
      'started', (select count(*) from coorte c where
          exists (select 1 from public.lesson_runs r where r.user_id = c.id)
          or exists (select 1 from public.lesson_progress p where p.user_id = c.id and p.times_done > 0 and p.lesson_id ~ '^[abc][12]-')),
      'finished_1', (select count(*) from coorte c where
          exists (select 1 from public.lesson_progress p where p.user_id = c.id and p.times_done > 0 and p.lesson_id ~ '^[abc][12]-')),
      'finished_3', (select count(*) from coorte c where
          (select count(*) from public.lesson_progress p where p.user_id = c.id and p.times_done > 0 and p.lesson_id ~ '^[abc][12]-') >= 3),
      -- retorno: só conta quem teve o primeiro dia antes de hoje (senão ainda não teve chance de voltar)
      'd1_base', (select count(*) from primeiro_dia where d0 < v_today),
      'd1_back', (select count(*) from primeiro_dia f where f.d0 < v_today
          and exists (select 1 from public.daily_xp d where d.user_id = f.user_id and d.day = f.d0 + 1)),
      'd7_base', (select count(*) from primeiro_dia where d0 <= v_today - 7),
      'd7_back', (select count(*) from primeiro_dia f where f.d0 <= v_today - 7
          and exists (select 1 from public.daily_xp d where d.user_id = f.user_id and d.day between f.d0 + 1 and f.d0 + 7)),
      'runs', (select count(*) from public.lesson_runs where started_at >= v_from),
      'runs_done', (select count(*) from public.lesson_runs where started_at >= v_from and finished_at is not null),
      'runs_quit', (select count(*) from abandonos),
      'quit_items', (select coalesce(json_agg(t), '[]'::json) from (
          select last_item as item_id, count(*) as quits, count(distinct user_id) as students
          from abandonos where last_item is not null
          group by last_item order by quits desc limit 12) t),
      'lessons', (select coalesce(json_agg(t), '[]'::json) from (
          select lesson_id,
                 count(*) as starts,
                 count(*) filter (where finished_at is not null) as finishes,
                 count(*) filter (where finished_at is null and updated_at < now() - interval '1 hour') as quits,
                 round(avg(last_step::numeric / nullif(total, 0)) filter (where finished_at is null and updated_at < now() - interval '1 hour') * 100) as quit_at_pct
          from public.lesson_runs where started_at >= v_from
          group by lesson_id
          order by count(*) filter (where finished_at is null and updated_at < now() - interval '1 hour') desc, count(*) desc
          limit 12) t)
    )
  );
end $$;

revoke execute on function public.admin_funnel(int) from public, anon;
grant  execute on function public.admin_funnel(int) to authenticated;
