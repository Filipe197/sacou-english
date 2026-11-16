-- Sacou English — lista de alunos no painel de administração
-- Rode este arquivo uma vez em: Supabase → SQL Editor → New query → Run.
-- Precisa do 002_admin.sql já rodado. Só contas da tabela admins conseguem chamar.

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
               where lp.user_id = u.id and lp.times_done > 0 and lp.lesson_id not in ('review', 'practice')) as lessons_done
      from auth.users u left join public.profiles p on p.id = u.id
      where lower(coalesce(u.email, '')) like q or lower(coalesce(p.display_name, '')) like q
      order by u.created_at desc
      limit p_limit offset p_offset) t)
  );
end $$;

revoke execute on function public.admin_users(text, int, int) from anon, public;
grant execute on function public.admin_users(text, int, int) to authenticated;
