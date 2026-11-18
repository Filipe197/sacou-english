-- Executar em um Supabase de TESTES, após schema.sql e migrações 002–010.
-- Não modifica os alunos existentes; tudo é revertido ao final.
begin;
do $$
declare
  v_uid uuid := gen_random_uuid();
  v_attempt uuid := gen_random_uuid();
  v_result jsonb;
  v_until timestamptz;
  v_xp int;
begin
  insert into auth.users (id, email, raw_user_meta_data)
    values (v_uid, v_uid::text || '@example.invalid', '{"display_name":"Teste de bônus"}');
  perform set_config('request.jwt.claim.sub', v_uid::text, true);
  perform set_config('request.jwt.claims', jsonb_build_object('sub', v_uid, 'role', 'authenticated')::text, true);

  v_result := public.complete_session('a1-u1-l1', 100, 15, v_attempt);
  if (v_result->>'awarded_xp')::int <> 30 or not (v_result->>'boost_started')::boolean
     or not (v_result->>'streak_increased')::boolean then raise exception 'Primeira lição não ativou os bônus'; end if;
  v_until := (v_result->>'boost_until')::timestamptz;
  if v_until <> now() + interval '10 minutes' then raise exception 'Duração incorreta'; end if;

  perform public.complete_session('a1-u1-l1', 100, 15, v_attempt);
  select xp_total into v_xp from public.profiles where id = v_uid;
  if v_xp <> 30 then raise exception 'Reenvio duplicou XP'; end if;
  if (select times_done from public.lesson_progress where user_id = v_uid and lesson_id = 'a1-u1-l1') <> 1
    then raise exception 'Reenvio duplicou a conclusão'; end if;

  v_result := public.complete_session('practice', 80, 5, gen_random_uuid());
  if (v_result->>'awarded_xp')::int <> 10 or (v_result->>'boost_started')::boolean
     or (v_result->>'streak_increased')::boolean then raise exception 'Treino durante o bônus incorreto'; end if;
  if (v_result->>'boost_until')::timestamptz <> v_until then raise exception 'Bônus foi renovado'; end if;

  update public.profiles set xp_boost_until = now() - interval '1 second' where id = v_uid;
  v_result := public.complete_session('a1-u1-l2', 100, 15, gen_random_uuid());
  if (v_result->>'awarded_xp')::int <> 15 or (v_result->>'boost_started')::boolean
    then raise exception 'Bônus expirado foi renovado no mesmo dia'; end if;

  update public.profiles set xp_boost_day = public.today_br() - 1, last_active = public.today_br() - 1 where id = v_uid;
  v_result := public.complete_session('a1-u1-l3', 100, 15, gen_random_uuid(), public.today_br() - 1);
  if (v_result->>'boost_started')::boolean or (v_result->>'awarded_xp')::int <> 15
    then raise exception 'Envio antigo ativou bônus'; end if;
  v_result := public.complete_session('a1-u1-l4', 100, 15, gen_random_uuid());
  if not (v_result->>'boost_started')::boolean or (v_result->'profile'->>'streak')::int <> 2
    then raise exception 'Novo dia não ativou bônus e ofensiva'; end if;
end $$;
rollback;
