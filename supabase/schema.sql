-- Sacou English — schema do banco (Supabase / Postgres)
-- Rode este arquivo inteiro uma vez em: Supabase → SQL Editor → New query → Run.
-- É seguro rodar de novo: usa "if not exists" / "create or replace".

-- ---------------------------------------------------------------
-- 1. Perfil do aluno
-- ---------------------------------------------------------------
create table if not exists public.profiles (
  id             uuid primary key references auth.users(id) on delete cascade,
  display_name   text,
  start_level    text not null default 'A1',
  daily_goal_xp  int  not null default 30 check (daily_goal_xp between 10 and 200),
  sound_on       boolean not null default true,
  onboarded      boolean not null default false,
  xp_total       int  not null default 0,
  streak         int  not null default 0,
  best_streak    int  not null default 0,
  last_active    date,
  created_at     timestamptz not null default now()
);

-- ---------------------------------------------------------------
-- 2. Lições concluídas
-- ---------------------------------------------------------------
create table if not exists public.lesson_progress (
  user_id      uuid not null references auth.users(id) on delete cascade,
  lesson_id    text not null,
  best_score   int  not null default 0 check (best_score between 0 and 100),
  times_done   int  not null default 1,
  completed_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

-- ---------------------------------------------------------------
-- 3. Erros para revisão
-- ---------------------------------------------------------------
create table if not exists public.mistakes (
  user_id    uuid not null references auth.users(id) on delete cascade,
  item_id    text not null,
  lesson_id  text not null,
  times      int  not null default 1,
  resolved   boolean not null default false,
  last_seen  timestamptz not null default now(),
  primary key (user_id, item_id)
);

-- ---------------------------------------------------------------
-- 4. XP por dia (gráfico da semana e meta diária)
-- ---------------------------------------------------------------
create table if not exists public.daily_xp (
  user_id uuid not null references auth.users(id) on delete cascade,
  day     date not null,
  xp      int  not null default 0,
  primary key (user_id, day)
);

-- ---------------------------------------------------------------
-- 5. "Reportar erro" no conteúdo
-- ---------------------------------------------------------------
create table if not exists public.content_reports (
  id         bigint generated always as identity primary key,
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  item_id    text not null,
  message    text not null check (char_length(message) between 3 and 1000),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------
-- Segurança: cada aluno só vê e altera os próprios dados
-- ---------------------------------------------------------------
alter table public.profiles        enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.mistakes        enable row level security;
alter table public.daily_xp        enable row level security;
alter table public.content_reports enable row level security;

drop policy if exists "perfil: ler o próprio"      on public.profiles;
drop policy if exists "perfil: editar o próprio"   on public.profiles;
drop policy if exists "progresso: ler o próprio"   on public.lesson_progress;
drop policy if exists "erros: ler os próprios"     on public.mistakes;
drop policy if exists "xp: ler o próprio"          on public.daily_xp;
drop policy if exists "reports: criar"             on public.content_reports;

create policy "perfil: ler o próprio"    on public.profiles        for select using (auth.uid() = id);
create policy "perfil: editar o próprio" on public.profiles        for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "progresso: ler o próprio" on public.lesson_progress for select using (auth.uid() = user_id);
create policy "erros: ler os próprios"   on public.mistakes        for select using (auth.uid() = user_id);
create policy "xp: ler o próprio"        on public.daily_xp        for select using (auth.uid() = user_id);
create policy "reports: criar"           on public.content_reports for insert with check (auth.uid() = user_id);

-- XP, sequência e progresso só mudam pelas funções abaixo (evita trapaça
-- editando a tabela direto). O aluno pode editar só os campos do perfil:
revoke update on public.profiles from authenticated;
grant  update (display_name, start_level, daily_goal_xp, sound_on, onboarded) on public.profiles to authenticated;

-- ---------------------------------------------------------------
-- Cria o perfil automaticamente quando alguém se cadastra
-- ---------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(nullif(new.raw_user_meta_data->>'display_name', ''),
                           nullif(new.raw_user_meta_data->>'full_name', ''),
                           split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------
-- Data "de hoje" no horário de Brasília
-- ---------------------------------------------------------------
create or replace function public.today_br()
returns date language sql stable as $$
  select (now() at time zone 'America/Sao_Paulo')::date
$$;

-- ---------------------------------------------------------------
-- Concluir lição: salva nota, soma XP e atualiza a sequência
-- ---------------------------------------------------------------
create or replace function public.complete_lesson(p_lesson_id text, p_score int, p_xp int)
returns public.profiles
language plpgsql security definer set search_path = public as $$
declare
  v_uid   uuid := auth.uid();
  v_today date := public.today_br();
  v_xp    int  := greatest(0, least(coalesce(p_xp, 0), 40));   -- teto por lição
  v_score int  := greatest(0, least(coalesce(p_score, 0), 100));
  v_prof  public.profiles;
begin
  if v_uid is null then raise exception 'not authenticated'; end if;
  if p_lesson_id !~ '^[a-z0-9-]{3,40}$' then raise exception 'invalid lesson id'; end if;

  insert into public.lesson_progress (user_id, lesson_id, best_score)
  values (v_uid, p_lesson_id, v_score)
  on conflict (user_id, lesson_id) do update
    set best_score   = greatest(lesson_progress.best_score, excluded.best_score),
        times_done   = lesson_progress.times_done + 1,
        completed_at = now();

  if v_xp > 0 then
    insert into public.daily_xp (user_id, day, xp) values (v_uid, v_today, v_xp)
    on conflict (user_id, day) do update set xp = daily_xp.xp + excluded.xp;

    update public.profiles p set
      xp_total    = p.xp_total + v_xp,
      streak      = case when p.last_active = v_today then p.streak
                         when p.last_active = v_today - 1 then p.streak + 1
                         else 1 end,
      last_active = v_today
    where p.id = v_uid;

    update public.profiles set best_streak = greatest(best_streak, streak) where id = v_uid;
  end if;

  select * into v_prof from public.profiles where id = v_uid;
  return v_prof;
end $$;

-- ---------------------------------------------------------------
-- Pular lições pelo teste de nível (sem dar XP)
-- ---------------------------------------------------------------
create or replace function public.skip_lessons(p_lesson_ids text[])
returns void language plpgsql security definer set search_path = public as $$
declare v_uid uuid := auth.uid(); v_id text;
begin
  if v_uid is null then raise exception 'not authenticated'; end if;
  if array_length(p_lesson_ids, 1) > 60 then raise exception 'too many'; end if;
  foreach v_id in array p_lesson_ids loop
    if v_id ~ '^[a-z0-9-]{3,40}$' then
      insert into public.lesson_progress (user_id, lesson_id, best_score, times_done)
      values (v_uid, v_id, 100, 0)
      on conflict (user_id, lesson_id) do nothing;
    end if;
  end loop;
end $$;

-- ---------------------------------------------------------------
-- Registrar / resolver erros
-- ---------------------------------------------------------------
create or replace function public.record_mistake(p_item_id text, p_lesson_id text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'not authenticated'; end if;
  insert into public.mistakes (user_id, item_id, lesson_id)
  values (auth.uid(), left(p_item_id, 60), left(p_lesson_id, 40))
  on conflict (user_id, item_id) do update
    set times = mistakes.times + 1, resolved = false, last_seen = now();
end $$;

create or replace function public.resolve_mistake(p_item_id text)
returns void language plpgsql security definer set search_path = public as $$
begin
  update public.mistakes set resolved = true, last_seen = now()
  where user_id = auth.uid() and item_id = p_item_id;
end $$;

revoke execute on function public.complete_lesson(text, int, int) from anon;
revoke execute on function public.skip_lessons(text[])            from anon;
revoke execute on function public.record_mistake(text, text)      from anon;
revoke execute on function public.resolve_mistake(text)           from anon;
