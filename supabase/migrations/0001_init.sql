create table counters (id text primary key, count integer not null default 0);
insert into counters values ('global-button-counter', 0);

create function increment_counter(counter_id text) returns integer
language sql security definer as
$$ update counters set count = count + 1 where id = counter_id returning count $$;

create table dumpster_entries (
  id bigint generated always as identity primary key,
  content text not null check (char_length(content) <= 10000),
  dumped_at timestamptz not null default now()
);

alter table counters enable row level security;
alter table dumpster_entries enable row level security;

create policy "anon can read counters" on counters
  for select to anon using (true);

create policy "anon can read dumpster_entries" on dumpster_entries
  for select to anon using (true);

create policy "anon can insert dumpster_entries" on dumpster_entries
  for insert to anon with check (true);

alter publication supabase_realtime add table counters;
