create extension if not exists pgcrypto;

create table if not exists public.books (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null check (char_length(trim(title)) > 0),
  author text not null check (char_length(trim(author)) > 0),
  cover_url text,
  status text not null default 'want_to_read' check (status in ('want_to_read', 'reading', 'completed')),
  rating smallint not null default 0 check (rating between 0 and 5),
  notes text
);

alter table public.books enable row level security;

grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on table public.books to anon, authenticated;

drop policy if exists "Public can read books" on public.books;
drop policy if exists "Public can add books" on public.books;
drop policy if exists "Public can update books" on public.books;
drop policy if exists "Public can delete books" on public.books;

create policy "Public can read books" on public.books
  for select to anon, authenticated using (true);
create policy "Public can add books" on public.books
  for insert to anon, authenticated with check (true);
create policy "Public can update books" on public.books
  for update to anon, authenticated using (true) with check (true);
create policy "Public can delete books" on public.books
  for delete to anon, authenticated using (true);
