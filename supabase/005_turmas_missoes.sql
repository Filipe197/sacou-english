-- Sacou English — missões da semana, turmas, lembretes, treino com IA e lição offline
-- Rode uma vez em: Supabase → SQL Editor → New query → Run (depois do 004_ia.sql).
-- É seguro rodar de novo.

-- ---------------------------------------------------------------
-- 1. Atividades (para as missões da semana)
-- ---------------------------------------------------------------
create table if not exists public.activity (
  id         bigint generated always as identity primary key,
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  kind       text not null check (kind in ('lesson', 'review', 'practice', 'conversa', 'fone', 'treino')),
  created_at timestamptz not null default now()
);
create index if not exists activity_user_time on public.activity (user_id, created_at desc);
alter table public.activity enable row level security;
drop policy if exists "activity: lê o próprio" on public.activity;
drop policy if exists "activity: grava o próprio" on public.activity;
create policy "activity: lê o próprio" on public.activity for select using (auth.uid() = user_id);
create policy "activity: grava o próprio" on public.activity for insert with check (auth.uid() = user_id);

-- ---------------------------------------------------------------
-- 2. Concluir lição feita sem internet (com a data em que foi feita)
--    Aceita até 3 dias atrás; a sequência conta o dia certo.
-- ---------------------------------------------------------------
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

    update public.profiles p set
      xp_total    = p.xp_total + v_xp,
      streak      = case when p.last_active >= v_day then p.streak
                         when p.last_active = v_day - 1 then p.streak + 1
                         else 1 end,
      last_active = greatest(coalesce(p.last_active, v_day), v_day)
    where p.id = v_uid;
    update public.profiles set best_streak = greatest(best_streak, streak) where id = v_uid;
  end if;

  select * into v_prof from public.profiles where id = v_uid;
  return v_prof;
end $$;
revoke execute on function public.complete_lesson_at(text, int, int, date) from anon;

-- ---------------------------------------------------------------
-- 3. Limite do treino com IA (novo tipo "practice" no ai_usage)
-- ---------------------------------------------------------------
alter table public.ai_usage drop constraint if exists ai_usage_kind_check;
alter table public.ai_usage add constraint ai_usage_kind_check check (kind in ('explain', 'chat', 'summary', 'practice'));

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
  if used > lim then return -1; end if;
  return lim - used;
end $$;
revoke all on function public.ai_take(text) from public, anon;
grant execute on function public.ai_take(text) to authenticated;

-- ---------------------------------------------------------------
-- 4. Lembretes no celular (notificações)
-- ---------------------------------------------------------------
create table if not exists public.push_subs (
  endpoint   text primary key,
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  p256dh     text not null,
  auth       text not null,
  created_at timestamptz not null default now()
);
alter table public.push_subs enable row level security;
drop policy if exists "push: lê o próprio" on public.push_subs;
drop policy if exists "push: grava o próprio" on public.push_subs;
drop policy if exists "push: apaga o próprio" on public.push_subs;
create policy "push: lê o próprio"    on public.push_subs for select using (auth.uid() = user_id);
create policy "push: grava o próprio" on public.push_subs for insert with check (auth.uid() = user_id);
create policy "push: apaga o próprio" on public.push_subs for delete using (auth.uid() = user_id);

-- ---------------------------------------------------------------
-- 5. Turmas (professor acompanha os alunos)
-- ---------------------------------------------------------------
create table if not exists public.classes (
  id         uuid primary key default gen_random_uuid(),
  owner      uuid not null default auth.uid() references auth.users(id) on delete cascade,
  name       text not null check (length(name) between 2 and 60),
  code       text not null unique,
  created_at timestamptz not null default now()
);
create table if not exists public.class_members (
  class_id  uuid not null references public.classes(id) on delete cascade,
  user_id   uuid not null references auth.users(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (class_id, user_id)
);
alter table public.classes enable row level security;
alter table public.class_members enable row level security;

-- funções auxiliares (evitam recursão entre as políticas das duas tabelas)
create or replace function public.is_class_owner(p_class uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.classes where id = p_class and owner = auth.uid())
$$;
create or replace function public.is_class_member(p_class uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.class_members where class_id = p_class and user_id = auth.uid())
$$;

drop policy if exists "classes: dono ou membro lê" on public.classes;
drop policy if exists "classes: dono cria" on public.classes;
drop policy if exists "classes: dono edita" on public.classes;
drop policy if exists "classes: dono apaga" on public.classes;
create policy "classes: dono ou membro lê" on public.classes for select using (owner = auth.uid() or public.is_class_member(id));
create policy "classes: dono cria"  on public.classes for insert with check (owner = auth.uid());
create policy "classes: dono edita" on public.classes for update using (owner = auth.uid()) with check (owner = auth.uid());
create policy "classes: dono apaga" on public.classes for delete using (owner = auth.uid());

drop policy if exists "members: lê" on public.class_members;
drop policy if exists "members: sai ou dono remove" on public.class_members;
create policy "members: lê" on public.class_members for select using (user_id = auth.uid() or public.is_class_owner(class_id));
create policy "members: sai ou dono remove" on public.class_members for delete using (user_id = auth.uid() or public.is_class_owner(class_id));

-- no máximo 20 turmas por professor
create or replace function public.classes_limit() returns trigger language plpgsql security definer set search_path = public as $$
begin
  if (select count(*) from public.classes where owner = new.owner) >= 20 then raise exception 'limite de 20 turmas'; end if;
  return new;
end $$;
drop trigger if exists classes_limit on public.classes;
create trigger classes_limit before insert on public.classes for each row execute function public.classes_limit();

-- Criar turma com código de convite (6 letras/números, sem letras parecidas)
create or replace function public.create_class(p_name text)
returns public.classes language plpgsql security definer set search_path = public as $$
declare v_code text; v_row public.classes; i int := 0;
begin
  if auth.uid() is null then raise exception 'not authenticated'; end if;
  loop
    v_code := (select string_agg(substr('ABCDEFGHJKMNPQRSTUVWXYZ23456789', 1 + floor(random() * 31)::int, 1), '') from generate_series(1, 6));
    exit when not exists (select 1 from public.classes where code = v_code);
    i := i + 1; if i > 20 then raise exception 'try again'; end if;
  end loop;
  insert into public.classes (owner, name, code) values (auth.uid(), trim(p_name), v_code) returning * into v_row;
  return v_row;
end $$;

-- Entrar numa turma pelo código
create or replace function public.join_class(p_code text)
returns public.classes language plpgsql security definer set search_path = public as $$
declare v_row public.classes;
begin
  if auth.uid() is null then raise exception 'not authenticated'; end if;
  select * into v_row from public.classes where code = upper(trim(p_code));
  if v_row.id is null then raise exception 'turma não encontrada'; end if;
  if v_row.owner = auth.uid() then return v_row; end if;
  if (select count(*) from public.class_members where class_id = v_row.id) >= 200 then raise exception 'turma cheia'; end if;
  insert into public.class_members (class_id, user_id) values (v_row.id, auth.uid()) on conflict do nothing;
  return v_row;
end $$;

-- Relatório da turma (só o professor dono)
create or replace function public.class_report(p_class uuid)
returns table (user_id uuid, name text, xp_total int, streak int, last_active date, lessons_done bigint, mistakes_open bigint, week_xp bigint, joined_at timestamptz)
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.is_class_owner(p_class) then raise exception 'forbidden'; end if;
  return query
    select m.user_id, p.display_name, p.xp_total,
           case when p.last_active >= public.today_br() - 1 then p.streak else 0 end,
           p.last_active,
           (select count(*) from public.lesson_progress lp where lp.user_id = m.user_id and lp.lesson_id ~ '^[abc][12]-'),
           (select count(*) from public.mistakes mk where mk.user_id = m.user_id and not mk.resolved),
           (select coalesce(sum(d.xp), 0) from public.daily_xp d where d.user_id = m.user_id and d.day > public.today_br() - 7),
           m.joined_at
    from public.class_members m join public.profiles p on p.id = m.user_id
    where m.class_id = p_class
    order by p.xp_total desc;
end $$;

revoke execute on function public.create_class(text) from anon;
revoke execute on function public.join_class(text) from anon;
revoke execute on function public.class_report(uuid) from anon;
