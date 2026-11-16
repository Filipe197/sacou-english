-- Sacou English — jogos e histórias
-- Rode uma vez em: Supabase → SQL Editor → New query → Run (depois do 005 e do 006).
-- É seguro rodar de novo.

-- 1. Novo tipo de atividade "jogo" (conta para a missão da semana "Jogue 3 minijogos")
alter table public.activity drop constraint if exists activity_kind_check;
alter table public.activity add constraint activity_kind_check
  check (kind in ('lesson', 'review', 'practice', 'conversa', 'fone', 'treino', 'jogo'));

-- 2. Os jogos ficam salvos como "jogo-..." no progresso. Os números do painel
--    passam a contar só lições de verdade (ids que começam com o nível, ex.: a1-).
create or replace function public.admin_stats()
returns json language plpgsql stable security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'forbidden'; end if;
  return json_build_object(
    'users',        (select count(*) from public.profiles),
    'new_users_7d', (select count(*) from public.profiles where created_at >= now() - interval '7 days'),
    'active_today', (select count(distinct user_id) from public.daily_xp where day = public.today_br()),
    'active_7d',    (select count(distinct user_id) from public.daily_xp where day >= public.today_br() - 6),
    'lessons_done', (select coalesce(sum(times_done), 0) from public.lesson_progress where lesson_id ~ '^[abc][12]-'),
    'open_reports', (select count(*) from public.content_reports where status = 'aberto'),
    'daily', (select coalesce(json_agg(t order by t.day), '[]'::json) from (
        select day, count(distinct user_id) as users, sum(xp) as xp
        from public.daily_xp where day >= public.today_br() - 13 group by day) t),
    'top_lessons', (select coalesce(json_agg(t), '[]'::json) from (
        select lesson_id, count(*) as students from public.lesson_progress
        where times_done > 0 and lesson_id ~ '^[abc][12]-'
        group by lesson_id order by students desc limit 10) t),
    'hard_items', (select coalesce(json_agg(t), '[]'::json) from (
        select item_id, sum(times) as mistakes, count(*) as students from public.mistakes
        group by item_id order by mistakes desc limit 15) t)
  );
end $$;

revoke execute on function public.admin_stats() from anon;

create or replace function public.admin_users(p_search text default '', p_limit int default 50, p_offset int default 0)
returns json language plpgsql stable security definer set search_path = public as $$
declare
  q text := '%' || lower(coalesce(trim(p_search), '')) || '%';
begin
  if not public.is_admin() then raise exception 'forbidden'; end if;
  p_limit := least(greatest(coalesce(p_limit, 50), 1), 200);
  p_offset := greatest(coalesce(p_offset, 0), 0);
  return json_build_object(
    'total', (
      select count(*) from auth.users u left join public.profiles p on p.id = u.id
      where lower(coalesce(u.email, '')) like q or lower(coalesce(p.display_name, '')) like q),
    'rows', (select coalesce(json_agg(t), '[]'::json) from (
      select u.id,
             p.display_name as name,
             u.email,
             u.created_at,
             u.last_sign_in_at,
             coalesce(u.raw_app_meta_data->>'provider', 'email') as provider,
             p.start_level,
             coalesce(p.xp_total, 0) as xp_total,
             coalesce(p.streak, 0) as streak,
             p.last_active,
             (select count(*) from public.lesson_progress lp
               where lp.user_id = u.id and lp.times_done > 0 and lp.lesson_id ~ '^[abc][12]-') as lessons_done
      from auth.users u left join public.profiles p on p.id = u.id
      where lower(coalesce(u.email, '')) like q or lower(coalesce(p.display_name, '')) like q
      order by u.created_at desc
      limit p_limit offset p_offset) t)
  );
end $$;

revoke execute on function public.admin_users(text, int, int) from anon, public;
grant execute on function public.admin_users(text, int, int) to authenticated;
