-- Sacou English — aviso automático de erros
-- Rode uma vez em: Supabase → SQL Editor → New query → Run (depois do 002_admin.sql).
-- É seguro rodar de novo.
--
-- Quando algo quebra no aparelho de um aluno (tela que não abre, professor que não
-- responde), o site grava um registro aqui. Só administradores leem. Você vê tudo
-- no painel Admin e recebe um aviso no celular (junto do lembrete diário) se houver
-- erros novos nas últimas 24 horas.

create table if not exists public.app_errors (
  id         bigint generated always as identity primary key,
  user_id    uuid default auth.uid() references auth.users(id) on delete set null,
  kind       text not null check (kind in ('js', 'promise', 'react', 'api')),
  message    text not null check (char_length(message) between 1 and 500),
  detail     text check (char_length(detail) <= 4000),
  page       text check (char_length(page) <= 300),
  ua         text check (char_length(ua) <= 300),
  created_at timestamptz not null default now()
);
create index if not exists app_errors_time on public.app_errors (created_at desc);
alter table public.app_errors enable row level security;

drop policy if exists "erros: qualquer um registra" on public.app_errors;
drop policy if exists "erros: admin lê" on public.app_errors;
drop policy if exists "erros: admin apaga" on public.app_errors;
create policy "erros: qualquer um registra" on public.app_errors for insert to anon, authenticated
  with check (user_id is null or user_id = auth.uid());
create policy "erros: admin lê" on public.app_errors for select using (public.is_admin());
create policy "erros: admin apaga" on public.app_errors for delete using (public.is_admin());
grant insert on public.app_errors to anon, authenticated;
grant select, delete on public.app_errors to authenticated;

-- Proteção contra enxurrada: acima de 300 registros por minuto, os novos são ignorados.
create or replace function public.app_errors_cap()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if (select count(*) from public.app_errors where created_at > now() - interval '1 minute') >= 300 then
    return null;
  end if;
  return new;
end $$;
drop trigger if exists app_errors_cap on public.app_errors;
create trigger app_errors_cap before insert on public.app_errors for each row execute function public.app_errors_cap();
