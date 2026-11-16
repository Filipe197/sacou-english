-- Sacou English — caderno digital
-- Rode este arquivo uma vez em: Supabase → SQL Editor → New query → Run.
-- É seguro rodar de novo.

-- ---------------------------------------------------------------
-- Anotações e cartões de vocabulário
--   kind = 'note' → anotação livre (texto rico do editor, em JSON)
--   kind = 'word' → cartão de vocabulário (en / pt / exemplo), revisado em flashcards
-- ---------------------------------------------------------------
create table if not exists public.notes (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  kind       text not null default 'note' check (kind in ('note', 'word')),
  title      text not null default '' check (char_length(title) <= 200),
  content    jsonb,                                                     -- documento do editor
  plain      text not null default '' check (char_length(plain) <= 60000), -- texto puro (busca)
  en         text check (char_length(en) <= 300),
  pt         text check (char_length(pt) <= 300),
  example    text check (char_length(example) <= 500),
  color      text not null default 'none' check (color in ('none', 'violet', 'lime', 'sky', 'rose', 'amber')),
  tags       text[] not null default '{}' check (cardinality(tags) <= 12),
  pinned     boolean not null default false,
  lesson_id  text check (char_length(lesson_id) <= 40),
  unit_id    text check (char_length(unit_id) <= 40),
  item_id    text check (char_length(item_id) <= 60),
  box        int not null default 0 check (box between 0 and 6),    -- caixa de Leitner (flashcards)
  due_at     timestamptz,                                           -- quando o cartão volta
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists notes_user_updated on public.notes (user_id, updated_at desc);

alter table public.notes enable row level security;

drop policy if exists "notas: ler as próprias"    on public.notes;
drop policy if exists "notas: criar as próprias"  on public.notes;
drop policy if exists "notas: editar as próprias" on public.notes;
drop policy if exists "notas: apagar as próprias" on public.notes;

create policy "notas: ler as próprias"    on public.notes for select using (auth.uid() = user_id);
create policy "notas: criar as próprias"  on public.notes for insert with check (auth.uid() = user_id);
create policy "notas: editar as próprias" on public.notes for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "notas: apagar as próprias" on public.notes for delete using (auth.uid() = user_id);

-- Limite por aluno (evita abuso): 2000 anotações/cartões
create or replace function public.notes_limit()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if (select count(*) from public.notes where user_id = new.user_id) >= 2000 then
    raise exception 'limite de anotações atingido';
  end if;
  return new;
end $$;

drop trigger if exists notes_limit on public.notes;
create trigger notes_limit before insert on public.notes
  for each row execute function public.notes_limit();
