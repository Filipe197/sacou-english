-- 015: memória de cada exercício (revisão espaçada por palavra e frase).
-- Rode depois de 014_aula_diaria.sql. Pode rodar de novo sem problema.
--
-- Cada linha guarda, para um aluno e um exercício do curso, a "caixa" de 0 a 5
-- (sobe quando acerta de primeira, volta a 0 quando erra) e o dia da próxima revisão.
-- O app funciona sem esta tabela (guarda só no aparelho); com ela, a memória
-- acompanha a pessoa entre celular e computador.

create table if not exists public.item_memory (
  user_id    uuid not null references auth.users(id) on delete cascade,
  item_id    text not null check (char_length(item_id) between 1 and 80),
  lesson_id  text check (lesson_id is null or char_length(lesson_id) <= 80),
  box        smallint not null default 0 check (box between 0 and 5),
  due_on     date not null,
  seen       int not null default 1 check (seen between 0 and 100000),
  wrong      int not null default 0 check (wrong between 0 and 100000),
  updated_at timestamptz not null default now(),
  primary key (user_id, item_id)
);
create index if not exists item_memory_due on public.item_memory (user_id, due_on);

alter table public.item_memory enable row level security;

drop policy if exists "item_memory: ver as minhas" on public.item_memory;
create policy "item_memory: ver as minhas" on public.item_memory
  for select using (auth.uid() = user_id);
drop policy if exists "item_memory: criar as minhas" on public.item_memory;
create policy "item_memory: criar as minhas" on public.item_memory
  for insert with check (auth.uid() = user_id);
drop policy if exists "item_memory: mudar as minhas" on public.item_memory;
create policy "item_memory: mudar as minhas" on public.item_memory
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "item_memory: apagar as minhas" on public.item_memory;
create policy "item_memory: apagar as minhas" on public.item_memory
  for delete using (auth.uid() = user_id);

grant select, insert, update, delete on public.item_memory to authenticated;
