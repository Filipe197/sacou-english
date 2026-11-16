-- Sacou English — painel de administração
-- Rode este arquivo uma vez em: Supabase → SQL Editor → New query → Run.
-- Depois, rode à parte o comando que transforma a SUA conta em administradora
-- (ele está no final deste arquivo, comentado, com um espaço para o seu e-mail).

-- Quem é administrador
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.admins enable row level security;
drop policy if exists "admins: ver a si mesmo" on public.admins;
create policy "admins: ver a si mesmo" on public.admins for select using (auth.uid() = user_id);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where user_id = auth.uid())
$$;

-- "Reportar erro": status de acompanhamento
alter table public.content_reports
  add column if not exists status text not null default 'aberto'
  check (status in ('aberto', 'corrigido', 'ignorado'));

drop policy if exists "reports: admin lê" on public.content_reports;
drop policy if exists "reports: admin atualiza" on public.content_reports;
create policy "reports: admin lê"      on public.content_reports for select using (public.is_admin());
create policy "reports: admin atualiza" on public.content_reports for update using (public.is_admin()) with check (public.is_admin());
grant update (status) on public.content_reports to authenticated;

-- Números do painel (só administradores conseguem chamar)
create or replace function public.admin_stats()
returns json language plpgsql stable security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'forbidden'; end if;
  return json_build_object(
    'users',        (select count(*) from public.profiles),
    'new_users_7d', (select count(*) from public.profiles where created_at >= now() - interval '7 days'),
    'active_today', (select count(distinct user_id) from public.daily_xp where day = public.today_br()),
    'active_7d',    (select count(distinct user_id) from public.daily_xp where day >= public.today_br() - 6),
    'lessons_done', (select coalesce(sum(times_done), 0) from public.lesson_progress where lesson_id not in ('review', 'practice')),
    'open_reports', (select count(*) from public.content_reports where status = 'aberto'),
    'daily', (select coalesce(json_agg(t order by t.day), '[]'::json) from (
        select day, count(distinct user_id) as users, sum(xp) as xp
        from public.daily_xp where day >= public.today_br() - 13 group by day) t),
    'top_lessons', (select coalesce(json_agg(t), '[]'::json) from (
        select lesson_id, count(*) as students from public.lesson_progress
        where times_done > 0 and lesson_id not in ('review', 'practice')
        group by lesson_id order by students desc limit 10) t),
    'hard_items', (select coalesce(json_agg(t), '[]'::json) from (
        select item_id, sum(times) as mistakes, count(*) as students from public.mistakes
        group by item_id order by mistakes desc limit 15) t)
  );
end $$;

revoke execute on function public.admin_stats() from anon;

-- ---------------------------------------------------------------
-- TORNAR A SUA CONTA ADMINISTRADORA (rode só uma vez, à parte):
-- troque o e-mail abaixo pelo e-mail da sua conta no site e rode:
--
-- insert into public.admins (user_id)
-- select id from auth.users where email = 'SEU-EMAIL-AQUI'
-- on conflict do nothing;
-- ---------------------------------------------------------------
