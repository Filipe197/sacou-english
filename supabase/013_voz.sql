-- 013: voz natural do Professor Juvenal (ElevenLabs, api/voz.js) com limite por AULA.
-- Rode depois de 012_conta_combo.sql. Pode rodar de novo sem problema.
--
-- Cada fala custa créditos da ElevenLabs. As travas:
--   * aulas com voz natural por dia: plano grátis 1, premium 5 (tabela plans abaixo);
--   * falas por aula: 40 (uma aula tem 16 passos);
--   * falas no site inteiro por dia: 60 (protege os créditos do plano da ElevenLabs).
-- Passou de qualquer limite, a aula continua normalmente com a voz do aparelho.
-- Para mudar os números: edite as linhas marcadas com "← limite" e rode de novo.

-- ---------- planos (preparado para o premium) ----------
-- O plano de cada aluno fica aqui, e NÃO no perfil: o aluno pode editar o próprio perfil,
-- mas não esta tabela (só o administrador, pelo painel do Supabase).
create table if not exists public.plans (
  user_id uuid primary key references auth.users(id) on delete cascade,
  plan    text not null default 'free' check (plan in ('free', 'premium')),
  until   date,            -- vencimento do premium (vazio = sem vencimento)
  updated_at timestamptz not null default now()
);
alter table public.plans enable row level security;
drop policy if exists "planos: ler o próprio" on public.plans;
create policy "planos: ler o próprio" on public.plans for select using (auth.uid() = user_id);

create or replace function public.my_plan(p_user uuid default auth.uid())
returns text language sql stable security definer set search_path = public as $$
  select coalesce((select plan from public.plans where user_id = p_user and (until is null or until >= public.today_br())), 'free')
$$;

-- ---------- uso da voz ----------
create table if not exists public.voice_usage (
  user_id uuid not null references auth.users(id) on delete cascade,
  aula_id uuid not null,
  day     date not null default public.today_br(),
  falas   int  not null default 0,
  primary key (user_id, aula_id)
);
create index if not exists voice_usage_day on public.voice_usage (day);
alter table public.voice_usage enable row level security; -- só as funções abaixo mexem aqui

-- Reserva uma fala com voz natural na aula p_aula. Devolve quantas falas ainda cabem na aula,
-- ou -1 (limite de aulas do dia), -2 (limite de falas da aula) ou -3 (limite do site no dia).
create or replace function public.voice_take(p_aula uuid)
returns int language plpgsql security definer set search_path = public as $$
declare
  v_uid uuid := auth.uid(); v_day date := public.today_br();
  v_aulas int; v_falas int; v_site int;
  lim_aulas int := case public.my_plan() when 'premium' then 5 else 1 end;  -- ← limite: aulas por dia
  lim_falas int := 40;                                                     -- ← limite: falas por aula
  lim_site  int := 60;                                                     -- ← limite: falas no site por dia
begin
  if v_uid is null then raise exception 'not authenticated'; end if;
  if p_aula is null then raise exception 'aula inválida'; end if;
  select coalesce(sum(falas), 0) into v_site from public.voice_usage where day = v_day;
  if v_site >= lim_site then return -3; end if;
  if not exists (select 1 from public.voice_usage where user_id = v_uid and aula_id = p_aula) then
    select count(*) into v_aulas from public.voice_usage where user_id = v_uid and day = v_day;
    if v_aulas >= lim_aulas then return -1; end if;
    insert into public.voice_usage (user_id, aula_id, day) values (v_uid, p_aula, v_day) on conflict do nothing;
  end if;
  update public.voice_usage set falas = falas + 1 where user_id = v_uid and aula_id = p_aula and falas < lim_falas
    returning falas into v_falas;
  if v_falas is null then return -2; end if;
  return lim_falas - v_falas;
end $$;

-- Quantas aulas com voz natural o aluno ainda tem hoje (para mostrar na tela da aula)
create or replace function public.voice_status()
returns json language sql stable security definer set search_path = public as $$
  select json_build_object(
    'plan', public.my_plan(),
    'limit', case public.my_plan() when 'premium' then 5 else 1 end,           -- ← mesmo limite de aulas
    'used', (select count(*) from public.voice_usage where user_id = auth.uid() and day = public.today_br()))
$$;

revoke execute on function public.voice_take(uuid)  from public, anon;
revoke execute on function public.voice_status()    from public, anon;
revoke execute on function public.my_plan(uuid)     from public, anon, authenticated;
grant  execute on function public.voice_take(uuid)  to authenticated;
grant  execute on function public.voice_status()    to authenticated;
