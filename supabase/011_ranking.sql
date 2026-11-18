-- 011: Ranking semanal com ligas + ranking da turma.
-- Rode depois de 010_sessoes_bonus.sql. Pode rodar de novo sem problema.
--
-- Como funciona:
--  * A semana vai de segunda a domingo (horário de Brasília).
--  * Ao ganhar o primeiro XP da semana, o aluno entra num grupo de até 30 pessoas
--    da mesma liga (gatilho em daily_xp). Ninguém precisa de tarefa agendada.
--  * Na semana seguinte, a posição da semana anterior decide a liga:
--    os 7 primeiros sobem, os 5 últimos descem (só em grupos com 10+ pessoas
--    e só quem fez XP). Quem ficou semanas sem estudar volta uma liga.
--  * O ranking mostra só o primeiro nome e a inicial do sobrenome.
--    Quem não quiser aparecer desliga em "Participar do ranking".

alter table public.profiles add column if not exists ranking_opt_out boolean not null default false;

create table if not exists public.league_groups (
  id     bigserial primary key,
  week   date not null,
  tier   int  not null check (tier between 0 and 4),
  size   int  not null default 0
);
create index if not exists league_groups_open on public.league_groups (week, tier, size);

create table if not exists public.league_members (
  user_id  uuid not null references public.profiles(id) on delete cascade,
  week     date not null,
  tier     int  not null,
  group_id bigint not null references public.league_groups(id) on delete cascade,
  primary key (user_id, week)
);
create index if not exists league_members_group on public.league_members (group_id);

-- Só as funções abaixo leem e escrevem nas ligas.
alter table public.league_groups  enable row level security;
alter table public.league_members enable row level security;

create or replace function public.week_start(p_day date default public.today_br())
returns date language sql stable as $$ select date_trunc('week', p_day)::date $$;

-- Nome público: "Ana S." (primeiro nome + inicial do último sobrenome)
create or replace function public.public_name(p_name text)
returns text language sql immutable as $$
  select case
    when coalesce(trim(p_name), '') = '' then 'Estudante'
    when array_length(regexp_split_to_array(trim(p_name), '\s+'), 1) = 1 then initcap(trim(p_name))
    else initcap(split_part(trim(p_name), ' ', 1)) || ' ' ||
         upper(left((regexp_split_to_array(trim(p_name), '\s+'))[array_length(regexp_split_to_array(trim(p_name), '\s+'), 1)], 1)) || '.'
  end
$$;

-- XP de um aluno numa semana
create or replace function public.week_xp(p_user uuid, p_week date)
returns int language sql stable security definer set search_path = public as $$
  select coalesce(sum(xp), 0)::int from public.daily_xp where user_id = p_user and day between p_week and p_week + 6
$$;

-- Coloca o aluno num grupo da semana atual (se ainda não estiver).
create or replace function public.league_join_user(p_user uuid)
returns void language plpgsql security definer set search_path = public as $$
declare
  v_week date := public.week_start();
  v_last record; v_tier int := 0; v_rank int; v_n int; v_xp int; v_group bigint;
begin
  if p_user is null then return; end if;
  if exists (select 1 from public.league_members where user_id = p_user and week = v_week) then return; end if;
  if (select ranking_opt_out from public.profiles where id = p_user) then return; end if;

  select * into v_last from public.league_members where user_id = p_user and week < v_week order by week desc limit 1;
  if v_last.group_id is not null then
    v_tier := v_last.tier;
    if v_last.week = v_week - 7 then
      -- posição na semana passada
      with board as (
        select m.user_id, public.week_xp(m.user_id, m.week) as xp
        from public.league_members m where m.group_id = v_last.group_id
      )
      select (select count(*) from board where xp > 0),
             (select 1 + count(*) from board b2 where b2.xp > b.xp),
             b.xp
        into v_n, v_rank, v_xp
        from board b where b.user_id = p_user;
      if v_xp > 0 and v_rank <= 7 then v_tier := least(4, v_tier + 1);
      elsif v_n >= 10 and v_rank > v_n - 5 then v_tier := greatest(0, v_tier - 1);
      end if;
    else
      v_tier := greatest(0, v_tier - 1); -- ficou semanas fora
    end if;
  end if;

  select id into v_group from public.league_groups
    where week = v_week and tier = v_tier and size < 30
    order by size desc, id limit 1 for update skip locked;
  if v_group is null then
    insert into public.league_groups (week, tier) values (v_week, v_tier) returning id into v_group;
  end if;
  insert into public.league_members (user_id, week, tier, group_id) values (p_user, v_week, v_tier, v_group)
    on conflict (user_id, week) do nothing;
  if found then update public.league_groups set size = size + 1 where id = v_group; end if;
end $$;

-- Gatilho: o primeiro XP da semana coloca o aluno na liga
create or replace function public.league_on_xp() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.xp > 0 and new.day >= public.week_start() then
    begin
      perform public.league_join_user(new.user_id);
    exception when others then null; -- o ranking nunca pode impedir de salvar XP
    end;
  end if;
  return new;
end $$;
drop trigger if exists league_on_xp on public.daily_xp;
create trigger league_on_xp after insert or update of xp on public.daily_xp
  for each row execute function public.league_on_xp();

-- Ranking da liga do aluno nesta semana
create or replace function public.league_board()
returns json language plpgsql security definer set search_path = public as $$
declare v_uid uuid := auth.uid(); v_week date := public.week_start(); v_m record; v_rows json;
begin
  if v_uid is null then raise exception 'not authenticated'; end if;
  if (select ranking_opt_out from public.profiles where id = v_uid) then
    return json_build_object('opt_out', true, 'week_start', v_week, 'week_end', v_week + 6);
  end if;
  if public.week_xp(v_uid, v_week) > 0 then perform public.league_join_user(v_uid); end if;
  select * into v_m from public.league_members where user_id = v_uid and week = v_week;
  if v_m.group_id is null then
    return json_build_object('joined', false, 'week_start', v_week, 'week_end', v_week + 6,
      'tier', coalesce((select tier from public.league_members where user_id = v_uid order by week desc limit 1), 0));
  end if;
  select json_agg(r order by r.xp desc, r.name) into v_rows from (
    select public.public_name(p.display_name) as name, public.week_xp(m.user_id, v_week) as xp, (m.user_id = v_uid) as me
    from public.league_members m join public.profiles p on p.id = m.user_id
    where m.group_id = v_m.group_id and not p.ranking_opt_out
  ) r;
  return json_build_object('joined', true, 'tier', v_m.tier, 'week_start', v_week, 'week_end', v_week + 6,
    'promote', 7, 'demote', 5, 'rows', coalesce(v_rows, '[]'::json));
end $$;

-- Ranking da turma nesta semana (para o dono e para os alunos da turma)
create or replace function public.class_board(p_class uuid)
returns json language plpgsql stable security definer set search_path = public as $$
declare v_uid uuid := auth.uid(); v_week date := public.week_start();
begin
  if v_uid is null then raise exception 'not authenticated'; end if;
  if not (public.is_class_owner(p_class) or public.is_class_member(p_class)) then raise exception 'forbidden'; end if;
  return coalesce((select json_agg(r order by r.xp desc, r.name) from (
    select public.public_name(p.display_name) as name, public.week_xp(m.user_id, v_week) as xp, (m.user_id = v_uid) as me
    from public.class_members m join public.profiles p on p.id = m.user_id
    where m.class_id = p_class and not p.ranking_opt_out
  ) r), '[]'::json);
end $$;

-- Entrar ou sair do ranking
create or replace function public.set_ranking(p_on boolean)
returns void language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'not authenticated'; end if;
  update public.profiles set ranking_opt_out = not p_on where id = auth.uid();
  if not p_on then
    update public.league_groups g set size = greatest(0, size - 1)
      from public.league_members m where m.group_id = g.id and m.user_id = auth.uid() and m.week = public.week_start();
    delete from public.league_members where user_id = auth.uid() and week = public.week_start();
  end if;
end $$;

revoke execute on function public.league_join_user(uuid) from public, anon, authenticated;
revoke execute on function public.week_xp(uuid, date)    from public, anon, authenticated;
revoke execute on function public.league_board()         from anon;
revoke execute on function public.class_board(uuid)      from anon;
revoke execute on function public.set_ranking(boolean)   from anon;
grant execute on function public.league_board()       to authenticated;
grant execute on function public.class_board(uuid)    to authenticated;
grant execute on function public.set_ranking(boolean) to authenticated;
