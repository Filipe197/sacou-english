-- 012: excluir a própria conta (LGPD) e combo de acertos salvo na conta.
-- Rode depois de 011_ranking.sql. Pode rodar de novo sem problema.

-- ---------------------------------------------------------------
-- Combo: acertos seguidos que continuam entre lições e aparelhos
-- ---------------------------------------------------------------
alter table public.profiles add column if not exists combo      int not null default 0;
alter table public.profiles add column if not exists combo_best int not null default 0;

create or replace function public.set_combo(p_n int)
returns json language plpgsql security definer set search_path = public as $$
declare v_row record;
begin
  if auth.uid() is null then raise exception 'not authenticated'; end if;
  if p_n is null or p_n < 0 or p_n > 100000 then raise exception 'combo inválido'; end if;
  update public.profiles
     set combo = p_n, combo_best = greatest(combo_best, p_n)
   where id = auth.uid()
  returning combo, combo_best into v_row;
  return json_build_object('combo', v_row.combo, 'combo_best', v_row.combo_best);
end $$;

-- ---------------------------------------------------------------
-- Excluir a própria conta e todos os dados
-- ---------------------------------------------------------------
-- Todas as tabelas com dados do aluno apontam para auth.users com "on delete cascade"
-- (perfil, progresso, erros, XP, caderno, uso da IA, atividades, lembretes, turmas,
-- sessões, ranking). Os registros de erro técnico (app_errors) ficam sem o vínculo
-- com a pessoa (on delete set null). As turmas que a pessoa criou também são apagadas.
create or replace function public.delete_my_account()
returns void language plpgsql security definer set search_path = public, auth as $$
declare v_uid uuid := auth.uid();
begin
  if v_uid is null then raise exception 'not authenticated'; end if;
  -- mantém certo o tamanho dos grupos do ranking
  update public.league_groups g set size = greatest(0, g.size - 1)
    from public.league_members m where m.group_id = g.id and m.user_id = v_uid;
  delete from auth.users where id = v_uid;
end $$;

revoke execute on function public.set_combo(int)        from public, anon;
revoke execute on function public.delete_my_account()   from public, anon;
grant  execute on function public.set_combo(int)        to authenticated;
grant  execute on function public.delete_my_account()   to authenticated;
