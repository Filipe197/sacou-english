-- Executar em um Supabase de TESTES, após schema.sql e migrações 002–011.
-- Não modifica os alunos existentes; tudo é revertido ao final.
begin;
do $$
declare
  v_week date := public.week_start();
  v_users uuid[] := array[]::uuid[];
  v_uid uuid;
  v_me uuid;
  v_board json;
  v_tier int;
  i int;
begin
  -- 12 alunos com XP diferente na semana passada, todos no mesmo grupo de Bronze
  insert into public.league_groups (week, tier, size) values (v_week - 7, 0, 12);
  for i in 1..12 loop
    v_uid := gen_random_uuid();
    v_users := v_users || v_uid;
    insert into auth.users (id, email, raw_user_meta_data)
      values (v_uid, v_uid::text || '@example.invalid', jsonb_build_object('display_name', 'Aluno da Silva'));
    insert into public.league_members (user_id, week, tier, group_id)
      values (v_uid, v_week - 7, 0, (select max(id) from public.league_groups where week = v_week - 7 and tier = 0));
    insert into public.daily_xp (user_id, day, xp) values (v_uid, v_week - 7, 200 - i * 10);
  end loop;

  -- 1º lugar sobe para Prata ao fazer o primeiro XP da semana (pelo gatilho)
  insert into public.daily_xp (user_id, day, xp) values (v_users[1], public.today_br(), 15);
  select tier into v_tier from public.league_members where user_id = v_users[1] and week = v_week;
  if v_tier is distinct from 1 then raise exception '1º lugar deveria subir para a liga 1, ficou %', v_tier; end if;

  -- 12º lugar (zona de queda) continua no Bronze, que é a liga mais baixa
  insert into public.daily_xp (user_id, day, xp) values (v_users[12], public.today_br(), 15);
  select tier into v_tier from public.league_members where user_id = v_users[12] and week = v_week;
  if v_tier is distinct from 0 then raise exception 'Último lugar no Bronze deveria ficar no 0, ficou %', v_tier; end if;

  -- 7º lugar, o último da zona de subida, também sobe
  insert into public.daily_xp (user_id, day, xp) values (v_users[7], public.today_br(), 15);
  select tier into v_tier from public.league_members where user_id = v_users[7] and week = v_week;
  if v_tier is distinct from 1 then raise exception '7º lugar deveria subir para a liga 1, ficou %', v_tier; end if;

  -- Mais XP no mesmo dia não cria uma segunda inscrição
  update public.daily_xp set xp = xp + 10 where user_id = v_users[1] and day = public.today_br();
  if (select count(*) from public.league_members where user_id = v_users[1] and week = v_week) <> 1
    then raise exception 'Inscrição duplicada na semana'; end if;

  -- O ranking do aluno mostra só o nome curto e marca "me"
  v_me := v_users[1];
  perform set_config('request.jwt.claim.sub', v_me::text, true);
  perform set_config('request.jwt.claims', jsonb_build_object('sub', v_me, 'role', 'authenticated')::text, true);
  v_board := public.league_board();
  if not (v_board->>'joined')::boolean then raise exception 'Aluno com XP deveria estar na liga'; end if;
  if (v_board->'rows'->0->>'name') <> 'Aluno S.' or not (v_board->'rows'->0->>'me')::boolean
    then raise exception 'Nome público ou marcação "me" incorretos: %', v_board->'rows'->0; end if;

  -- Sair do ranking remove da semana e esconde o aluno
  perform public.set_ranking(false);
  if exists (select 1 from public.league_members where user_id = v_me and week = v_week) then raise exception 'Não saiu da liga'; end if;
  if not (public.league_board()->>'opt_out')::boolean then raise exception 'Deveria aparecer como fora do ranking'; end if;
  update public.daily_xp set xp = xp + 5 where user_id = v_me and day = public.today_br();
  if exists (select 1 from public.league_members where user_id = v_me and week = v_week) then raise exception 'Voltou à liga sem querer'; end if;

  -- Voltar ao ranking
  perform public.set_ranking(true);
  if not (public.league_board()->>'joined')::boolean then raise exception 'Não voltou à liga'; end if;
end $$;
rollback;
