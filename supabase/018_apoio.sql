-- 018: formulário da página Apoie (/apoie): quem quer contribuir, patrocinar ou fazer parceria.
-- Rode depois de 017_metricas.sql. Pode rodar de novo sem problema.
--
-- Qualquer visitante (com ou sem conta) pode enviar; só o administrador lê, marca como
-- respondido ou apaga (painel Admin). Proteção contra enxurrada: no máximo 20 envios
-- por minuto no site inteiro.

create table if not exists public.support_contacts (
  id         bigint generated always as identity primary key,
  user_id    uuid default auth.uid() references auth.users(id) on delete set null,
  name       text not null check (char_length(trim(name)) between 2 and 120),
  email      text not null check (char_length(email) between 5 and 200 and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  org        text check (org is null or char_length(org) <= 160),
  kind       text not null check (kind in ('apoiar', 'patrocinio', 'parceria')),
  message    text check (message is null or char_length(message) <= 2000),
  status     text not null default 'novo' check (status in ('novo', 'respondido', 'arquivado')),
  created_at timestamptz not null default now()
);
create index if not exists support_contacts_time on public.support_contacts (created_at desc);
alter table public.support_contacts enable row level security;

drop policy if exists "apoio: qualquer um envia" on public.support_contacts;
drop policy if exists "apoio: admin lê" on public.support_contacts;
drop policy if exists "apoio: admin muda" on public.support_contacts;
drop policy if exists "apoio: admin apaga" on public.support_contacts;
create policy "apoio: qualquer um envia" on public.support_contacts for insert to anon, authenticated
  with check ((user_id is null or user_id = auth.uid()) and status = 'novo');
create policy "apoio: admin lê" on public.support_contacts for select using (public.is_admin());
create policy "apoio: admin muda" on public.support_contacts for update using (public.is_admin()) with check (public.is_admin());
create policy "apoio: admin apaga" on public.support_contacts for delete using (public.is_admin());
grant insert on public.support_contacts to anon, authenticated;
grant select, update, delete on public.support_contacts to authenticated;

create or replace function public.support_contacts_cap()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if (select count(*) from public.support_contacts where created_at > now() - interval '1 minute') >= 20 then
    raise exception 'muitos envios agora, tente daqui a pouco';
  end if;
  return new;
end $$;
drop trigger if exists support_contacts_cap on public.support_contacts;
create trigger support_contacts_cap before insert on public.support_contacts for each row execute function public.support_contacts_cap();
