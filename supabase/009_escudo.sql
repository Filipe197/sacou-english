-- Sacou English — escudo da sequência
-- Rode uma vez em: Supabase → SQL Editor → New query → Run (depois do 005). É seguro rodar de novo.
--
-- A cada 7 dias seguidos o aluno ganha 1 escudo (guarda no máximo 2). Se ele ficar um dia sem
-- estudar, o escudo é gasto automaticamente na próxima lição e a sequência continua.
-- Só o banco mexe nos escudos (o aluno não consegue editar pelo navegador).

alter table public.profiles add column if not exists streak_freezes int not null default 0;
alter table public.profiles add column if not exists freeze_used_on date;
alter table public.profiles drop constraint if exists profiles_streak_freezes_check;
alter table public.profiles add constraint profiles_streak_freezes_check check (streak_freezes between 0 and 2);

-- Atualiza a sequência do aluno para um dia de estudo (usado pelas funções de concluir lição)
create or replace function public.apply_streak(p_uid uuid, p_day date)
returns void language plpgsql security definer set search_path = public as $$
declare
  p public.profiles;
  missed int;
  new_streak int;
  freezes int;
  used_on date;
begin
  select * into p from public.profiles where id = p_uid for update;
  if not found then return; end if;
  freezes := p.streak_freezes;
  used_on := p.freeze_used_on;

  if p.last_active is not null and p.last_active >= p_day then
    return;                                     -- já estudou neste dia
  elsif p.last_active = p_day - 1 then
    new_streak := p.streak + 1;
  else
    missed := case when p.last_active is null then null else p_day - p.last_active - 1 end;
    if missed is not null and p.streak > 0 and missed <= freezes then
      freezes := freezes - missed;              -- o escudo cobre os dias perdidos
      new_streak := p.streak + 1;
      used_on := p_day;
    else
      new_streak := 1;
    end if;
  end if;

  if new_streak > p.streak and new_streak % 7 = 0 then
    freezes := least(2, freezes + 1);           -- ganhou um escudo
  end if;

  update public.profiles set
    streak = new_streak,
    best_streak = greatest(best_streak, new_streak),
    last_active = greatest(coalesce(last_active, p_day), p_day),
    streak_freezes = freezes,
    freeze_used_on = used_on
  where id = p_uid;
end $$;
revoke execute on function public.apply_streak(uuid, date) from anon, authenticated, public;

create or replace function public.complete_lesson(p_lesson_id text, p_score int, p_xp int)
returns public.profiles
language plpgsql security definer set search_path = public as $$
begin
  return public.complete_lesson_at(p_lesson_id, p_score, p_xp, public.today_br());
end $$;

create or replace function public.complete_lesson_at(p_lesson_id text, p_score int, p_xp int, p_day date)
returns public.profiles
language plpgsql security definer set search_path = public as $$
declare
  v_uid   uuid := auth.uid();
  v_today date := public.today_br();
  v_day   date := least(v_today, greatest(coalesce(p_day, v_today), v_today - 3));
  v_xp    int  := greatest(0, least(coalesce(p_xp, 0), 40));
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
    insert into public.daily_xp (user_id, day, xp) values (v_uid, v_day, v_xp)
    on conflict (user_id, day) do update set xp = daily_xp.xp + excluded.xp;
    update public.profiles set xp_total = xp_total + v_xp where id = v_uid;
    perform public.apply_streak(v_uid, v_day);
  end if;

  select * into v_prof from public.profiles where id = v_uid;
  return v_prof;
end $$;

revoke execute on function public.complete_lesson(text, int, int) from anon;
revoke execute on function public.complete_lesson_at(text, int, int, date) from anon;
