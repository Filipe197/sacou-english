-- Execute depois de 009_escudo.sql. Conclusões idempotentes e XP duplo por 10 minutos.
alter table public.profiles add column if not exists xp_boost_until timestamptz;
alter table public.profiles add column if not exists xp_boost_day date;

create table if not exists public.completed_sessions (
  user_id uuid not null references auth.users(id) on delete cascade,
  attempt_id uuid not null,
  result jsonb not null,
  created_at timestamptz not null default now(),
  primary key (user_id, attempt_id)
);
alter table public.completed_sessions enable row level security;
-- A tabela só é acessada pela função; não há gravação direta pelo navegador.
revoke all on public.completed_sessions from anon, authenticated;

create or replace function public.complete_session(
  p_lesson_id text, p_score int, p_xp int, p_attempt_id uuid, p_day date default null
) returns jsonb language plpgsql security definer set search_path = public as $$
declare
  v_uid uuid := auth.uid();
  v_today date := public.today_br();
  v_day date := least(v_today, greatest(coalesce(p_day, v_today), v_today - 3));
  v_xp int := greatest(0, least(coalesce(p_xp, 0), 40));
  v_score int := greatest(0, least(coalesce(p_score, 0), 100));
  v_before public.profiles;
  v_after public.profiles;
  v_result jsonb;
  v_started boolean := false;
  v_multiplier int := 1;
begin
  if v_uid is null then raise exception 'not authenticated'; end if;
  if p_attempt_id is null or p_lesson_id is null or p_lesson_id !~ '^[a-z0-9-]{3,40}$' then
    raise exception 'invalid session';
  end if;
  -- Serializa as conclusões da conta, inclusive em abas/dispositivos diferentes.
  select * into v_before from public.profiles where id = v_uid for update;
  if not found then raise exception 'profile not found'; end if;
  select result into v_result from public.completed_sessions
    where user_id = v_uid and attempt_id = p_attempt_id;
  if found then
    return v_result || jsonb_build_object('profile', to_jsonb(v_before));
  end if;

  -- A primeira lição da trilha enviada no dia ativa o bônus, inclusive para ela.
  -- Envios de dias anteriores preservam o progresso, mas não ativam o bônus de hoje.
  if v_xp > 0 and v_day = v_today
     and p_lesson_id ~ '^(a1|a2|b1|b2)-u[1-8]-l[1-7]$'
     and v_before.xp_boost_day is distinct from v_today then
    update public.profiles set xp_boost_until = now() + interval '10 minutes', xp_boost_day = v_today
      where id = v_uid;
    v_started := true;
  end if;
  select * into v_after from public.profiles where id = v_uid;
  if v_xp > 0 and v_day = v_today and v_after.xp_boost_until > now() then v_multiplier := 2; end if;
  v_xp := v_xp * v_multiplier;

  insert into public.lesson_progress (user_id, lesson_id, best_score)
    values (v_uid, p_lesson_id, v_score)
    on conflict (user_id, lesson_id) do update set
      best_score = greatest(lesson_progress.best_score, excluded.best_score),
      times_done = lesson_progress.times_done + 1,
      completed_at = now();
  if v_xp > 0 then
    insert into public.daily_xp (user_id, day, xp) values (v_uid, v_day, v_xp)
      on conflict (user_id, day) do update set xp = daily_xp.xp + excluded.xp;
    update public.profiles set xp_total = xp_total + v_xp where id = v_uid;
    perform public.apply_streak(v_uid, v_day);
  end if;
  select * into v_after from public.profiles where id = v_uid;
  v_result := jsonb_build_object(
    'profile', to_jsonb(v_after), 'awarded_xp', v_xp, 'multiplier', v_multiplier,
    'streak_increased', v_day = v_today and v_xp > 0 and v_before.last_active is distinct from v_after.last_active,
    'boost_started', v_started, 'boost_until', v_after.xp_boost_until
  );
  insert into public.completed_sessions (user_id, attempt_id, result) values (v_uid, p_attempt_id, v_result);
  return v_result;
end $$;
revoke execute on function public.complete_session(text, int, int, uuid, date) from public, anon;
grant execute on function public.complete_session(text, int, int, uuid, date) to authenticated;
