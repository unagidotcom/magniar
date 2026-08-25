create table if not exists public.websites (
  id uuid primary key default gen_random_uuid(),
  client_id text not null references public.clients(id) on delete cascade,
  name text not null check (char_length(trim(name)) > 0),
  url text not null check (char_length(trim(url)) > 0),
  normalized_url text not null check (char_length(trim(normalized_url)) > 0),
  platform text not null default 'Other',
  hosting_provider text,
  monitoring_enabled boolean not null default true,
  current_status text not null default 'UNKNOWN'
    check (current_status in ('UNKNOWN', 'ONLINE', 'DOWN', 'ERROR')),
  last_http_status_code integer,
  last_response_time_ms integer check (
    last_response_time_ms is null or last_response_time_ms >= 0
  ),
  last_checked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint websites_normalized_url_unique unique (normalized_url)
);

create index if not exists websites_client_id_idx
  on public.websites (client_id);

create index if not exists websites_current_status_idx
  on public.websites (current_status);

create index if not exists websites_monitoring_enabled_idx
  on public.websites (monitoring_enabled);

create index if not exists websites_created_at_idx
  on public.websites (created_at desc);

drop trigger if exists websites_touch_updated_at on public.websites;
create trigger websites_touch_updated_at
before update on public.websites
for each row
execute function public.touch_updated_at();

alter table public.websites enable row level security;

drop policy if exists "Admins can read websites" on public.websites;
create policy "Admins can read websites"
on public.websites
for select
to authenticated
using (public.is_admin());

drop policy if exists "Admins can create websites" on public.websites;
create policy "Admins can create websites"
on public.websites
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "Admins can update websites" on public.websites;
create policy "Admins can update websites"
on public.websites
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete websites" on public.websites;
create policy "Admins can delete websites"
on public.websites
for delete
to authenticated
using (public.is_admin());

revoke all on table public.websites from anon, authenticated;
grant select, insert, update, delete on table public.websites to authenticated;
