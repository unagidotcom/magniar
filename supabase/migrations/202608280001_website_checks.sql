create table if not exists public.website_checks (
  id uuid primary key default gen_random_uuid(),
  website_id uuid not null references public.websites(id) on delete cascade,
  checked_at timestamptz not null default now(),
  status text not null check (status in ('ONLINE', 'DOWN', 'ERROR')),
  http_status_code integer check (
    http_status_code is null or (http_status_code >= 100 and http_status_code <= 599)
  ),
  response_time_ms integer check (
    response_time_ms is null or response_time_ms >= 0
  ),
  error_message text
);

create index if not exists website_checks_website_id_checked_at_idx
  on public.website_checks (website_id, checked_at desc);

create index if not exists website_checks_checked_at_idx
  on public.website_checks (checked_at desc);

create index if not exists website_checks_status_idx
  on public.website_checks (status);

alter table public.website_checks enable row level security;

drop policy if exists "Admins can read website checks" on public.website_checks;
create policy "Admins can read website checks"
on public.website_checks
for select
to authenticated
using (public.is_admin());

revoke all on table public.website_checks from anon, authenticated;
grant select on table public.website_checks to authenticated;
