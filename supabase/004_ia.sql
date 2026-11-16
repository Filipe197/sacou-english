-- Sacou English — professor de IA e conversa por voz
-- Rode uma vez em: Supabase → SQL Editor → New query → Run (depois do schema.sql).
-- Guarda quantas vezes cada aluno usou a IA por dia, para limitar o custo.

create table if not exists public.ai_usage (
  user_id uuid not null references auth.users(id) on delete cascade,
  day     date not null default public.today_br(),
  kind    text not null check (kind in ('explain', 'chat', 'summary')),
  count   int  not null default 0,
  primary key (user_id, day, kind)
);

alter table public.ai_usage enable row level security;
drop policy if exists "ai_usage: lê o próprio" on public.ai_usage;
create policy "ai_usage: lê o próprio" on public.ai_usage for select using (auth.uid() = user_id);

-- Conta um uso e devolve quantos ainda restam hoje (-1 = limite atingido).
-- Limites diários por aluno: 40 explicações, 60 falas na conversa, 8 resumos de conversa.
create or replace function public.ai_take(p_kind text)
returns int language plpgsql security definer set search_path = public as $$
declare lim int; used int;
begin
  if auth.uid() is null then raise exception 'not authenticated'; end if;
  lim := case p_kind when 'explain' then 40 when 'chat' then 60 when 'summary' then 8 else 0 end;
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
