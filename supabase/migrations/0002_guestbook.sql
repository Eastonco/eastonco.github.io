create table guestbook_entries (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) > 0 and char_length(name) <= 60),
  message text not null check (char_length(message) > 0 and char_length(message) <= 500),
  created_at timestamptz not null default now()
);

alter table guestbook_entries enable row level security;

create policy "anon can read guestbook_entries" on guestbook_entries
  for select to anon using (true);

create policy "anon can insert guestbook_entries" on guestbook_entries
  for insert to anon with check (true);
