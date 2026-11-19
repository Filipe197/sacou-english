-- 014: 1 aula com o Professor Juvenal por dia para cada aluno, e administradores sem limite.
-- Rode depois de 013_voz.sql. Pode rodar de novo sem problema.
--
-- * Alunos: 1 aula falada por dia (a voz natural vale nessa aula).
-- * Administradores (tabela admins): aulas, voz natural e professor de IA sem limite, para testar.
-- * O plano premium (tabela plans, da 013) fica para depois: por enquanto vale o mesmo limite de todos.

-- ---------- aulas do dia ----------
create table if not exists public.aula_days (
  user_id uuid not null references auth.users(id) on delete cascade,
  aula_id uuid not null,
  day     date not null default public.today_br(),
  primary key (user_id, aula_id)
);
create index if not exists aula_days_user_day on public.aula_days (user_id, day);
alter table public.aula_days enable row level security; -- só as funções abaixo mexem aqui

-- Registra a aula p_aula (se ainda não estiver) e diz se ela pode continuar.
create or replace function public.aula_take(p_aula uuid)
returns json language plpgsql security definer set search_path = public as $$
declare v_uid uuid := auth.uid(); v_admin boolean := public.is_admin(); v_used int;
  lim int := 1;   -- ← limite: aulas por dia para quem não é administrador
begin
  if v_uid is null then raise exception 'not authenticated'; end if;
  if p_aula is null then raise exception 'aula inválida'; end if;
  if not exists (select 1 from public.aula_days where user_id = v_uid and aula_id = p_aula) then
    select count(*) into v_used from public.aula_days where user_id = v_uid and day = public.today_br();
    if not v_admin and v_used >= lim then
      return json_build_object('ok', false, 'used', v_used, 'limit', lim, 'admin', false);
    end if;
    insert into public.aula_days (user_id, aula_id) values (v_uid, p_aula) on conflict do nothing;
  end if;
  select count(*) into v_used from public.aula_days where user_id = v_uid and day = public.today_br();
  return json_build_object('ok', true, 'used', v_used, 'limit', lim, 'admin', v_admin);
end $$;

-- Para a tela inicial da aula: quantas aulas já foram hoje
create or replace function public.aula_status()
returns json language sql stable security definer set search_path = public as $$
  select json_build_object(
    'used', (select count(*) from public.aula_days where user_id = auth.uid() and day = public.today_br()),
    'limit', 1,          -- ← mesmo limite de aula_take
    'admin', public.is_admin())
$$;

-- ---------- voz natural: administrador sem limite ----------
create or replace function public.voice_take(p_aula uuid)
returns int language plpgsql security definer set search_path = public as $$
declare
  v_uid uuid := auth.uid(); v_day date := public.today_br(); v_admin boolean := public.is_admin();
  v_aulas int; v_falas int; v_site int;
  lim_aulas int := 1;    -- ← aulas com voz natural por dia (igual ao limite de aulas)
  lim_falas int := 40;   -- ← falas com voz natural por aula
  lim_site  int := 60;   -- ← falas com voz natural no site por dia (sem contar administradores)
begin
  if v_uid is null then raise exception 'not authenticated'; end if;
  if p_aula is null then raise exception 'aula inválida'; end if;
  if not v_admin then
    select coalesce(sum(u.falas), 0) into v_site from public.voice_usage u
      where u.day = v_day and not exists (select 1 from public.admins a where a.user_id = u.user_id);
    if v_site >= lim_site then return -3; end if;
  end if;
  if not exists (select 1 from public.voice_usage where user_id = v_uid and aula_id = p_aula) then
    select count(*) into v_aulas from public.voice_usage where user_id = v_uid and day = v_day;
    if not v_admin and v_aulas >= lim_aulas then return -1; end if;
    insert into public.voice_usage (user_id, aula_id, day) values (v_uid, p_aula, v_day) on conflict do nothing;
  end if;
  update public.voice_usage set falas = falas + 1
    where user_id = v_uid and aula_id = p_aula and (v_admin or falas < lim_falas)
    returning falas into v_falas;
  if v_falas is null then return -2; end if;
  return case when v_admin then 999 else lim_falas - v_falas end;
end $$;

create or replace function public.voice_status()
returns json language sql stable security definer set search_path = public as $$
  select json_build_object(
    'plan', public.my_plan(),
    'limit', case when public.is_admin() then 999 else 1 end,
    'used', (select count(*) from public.voice_usage where user_id = auth.uid() and day = public.today_br()),
    'admin', public.is_admin())
$$;

-- ---------- professor de IA: administrador sem limite (o uso continua sendo contado) ----------
create or replace function public.ai_take(p_kind text)
returns int language plpgsql security definer set search_path = public as $$
declare lim int; used int;
begin
  if auth.uid() is null then raise exception 'not authenticated'; end if;
  lim := case p_kind when 'explain' then 40 when 'chat' then 60 when 'summary' then 8 when 'practice' then 10 else 0 end;
  if lim = 0 then raise exception 'invalid kind'; end if;
  insert into public.ai_usage (user_id, day, kind, count)
  values (auth.uid(), public.today_br(), p_kind, 1)
  on conflict (user_id, day, kind) do update set count = ai_usage.count + 1
  returning count into used;
  if public.is_admin() then return 999; end if;
  if used > lim then return -1; end if;
  return lim - used;
end $$;

revoke execute on function public.aula_take(uuid)   from public, anon;
revoke execute on function public.aula_status()     from public, anon;
revoke execute on function public.voice_take(uuid)  from public, anon;
revoke execute on function public.voice_status()    from public, anon;
revoke all     on function public.ai_take(text)     from public, anon;
grant execute on function public.aula_take(uuid)    to authenticated;
grant execute on function public.aula_status()      to authenticated;
grant execute on function public.voice_take(uuid)   to authenticated;
grant execute on function public.voice_status()     to authenticated;
grant execute on function public.ai_take(text)      to authenticated;
