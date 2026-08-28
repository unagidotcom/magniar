create extension if not exists pgcrypto;

create sequence if not exists public.client_number_seq;
create sequence if not exists public.invoice_number_seq;

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
set search_path = ''
as $$
  select lower(coalesce(auth.jwt() -> 'app_metadata' ->> 'is_admin', 'false')) in ('true', '1', 'yes')
  or lower(coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '')) in (
    'admin',
    'administrator',
    'super_admin',
    'owner'
  );
$$;

create table if not exists public.clients (
  id text primary key default (
    'MG-CL-' ||
    to_char(now(), 'YYYY') ||
    '-' ||
    lpad(nextval('public.client_number_seq')::text, 6, '0')
  ),
  source_prospect_id text,
  source_request_id uuid references public.project_requests(id) on delete set null,
  business_name text not null,
  industry text not null default 'E-COMMERCE',
  business_model text not null default 'DTC',
  company_size text not null default '10-50 employees',
  primary_market text not null default 'North America',
  markets_served text not null default 'US',
  website text,
  description text not null default '',
  primary_objective text not null default '',
  client_since text not null default to_char(now(), 'Mon YYYY'),
  account_owner text not null default 'Growth Team',
  status text not null default 'ONBOARDING'
    check (status in ('ACTIVE', 'ONBOARDING', 'ATTENTION', 'PAUSED', 'OFFBOARDING', 'ARCHIVED')),
  health text not null default 'HEALTHY'
    check (health in ('HEALTHY', 'ATTENTION', 'AT_RISK', 'PAUSED')),
  health_reason text,
  pause_reason text,
  next_action jsonb not null default jsonb_build_object(
    'title', 'Complete Account Onboarding & Setup',
    'due_date', 'Next Week',
    'owner', 'Growth Team'
  ),
  contacts jsonb not null default '[]'::jsonb,
  services jsonb not null default '[]'::jsonb,
  platforms jsonb not null default '[]'::jsonb,
  projects jsonb not null default '[]'::jsonb,
  activities jsonb not null default '[]'::jsonb,
  documents jsonb not null default '[]'::jsonb,
  notes jsonb not null default '[]'::jsonb,
  portal_status text not null default 'NOT_INVITED'
    check (portal_status in ('NOT_INVITED', 'INVITED', 'ACTIVE', 'SUSPENDED')),
  portal_invited_at text,
  show_on_homepage boolean not null default true,
  homepage_label text,
  homepage_order integer not null default 100,
  raw_client_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists clients_created_at_idx
  on public.clients (created_at desc);

create index if not exists clients_status_idx
  on public.clients (status);

create index if not exists clients_homepage_idx
  on public.clients (show_on_homepage, homepage_order, created_at desc);

drop trigger if exists clients_touch_updated_at on public.clients;
create trigger clients_touch_updated_at
before update on public.clients
for each row
execute function public.touch_updated_at();

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  invoice_number text not null unique default (
    'MG-INV-' ||
    to_char(now(), 'YYYY') ||
    '-' ||
    lpad(nextval('public.invoice_number_seq')::text, 6, '0')
  ),
  client_id text references public.clients(id) on delete set null,
  client_name text not null,
  client_email text,
  status text not null default 'DRAFT'
    check (status in ('DRAFT', 'SENT', 'PAID', 'OVERDUE', 'VOID', 'ARCHIVED')),
  issue_date date not null default current_date,
  due_date date not null default (current_date + 14),
  currency text not null default 'USD',
  subtotal_cents integer not null default 0 check (subtotal_cents >= 0),
  tax_cents integer not null default 0 check (tax_cents >= 0),
  total_cents integer generated always as (subtotal_cents + tax_cents) stored,
  service_summary text not null,
  line_items jsonb not null default '[]'::jsonb,
  notes text,
  sent_at timestamptz,
  downloaded_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists invoices_created_at_idx
  on public.invoices (created_at desc);

create index if not exists invoices_client_id_idx
  on public.invoices (client_id);

create index if not exists invoices_status_idx
  on public.invoices (status);

drop trigger if exists invoices_touch_updated_at on public.invoices;
create trigger invoices_touch_updated_at
before update on public.invoices
for each row
execute function public.touch_updated_at();

create or replace function public.list_homepage_clients()
returns table (
  id text,
  business_name text,
  industry text,
  homepage_label text,
  website text
)
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select
    clients.id,
    clients.business_name,
    clients.industry,
    coalesce(nullif(clients.homepage_label, ''), clients.business_model) as homepage_label,
    clients.website
  from public.clients
  where clients.show_on_homepage = true
    and clients.status in ('ACTIVE', 'ONBOARDING')
  order by clients.homepage_order asc, clients.created_at desc
  limit 12;
$$;

alter table public.clients enable row level security;
alter table public.invoices enable row level security;

drop policy if exists "Admins can read clients" on public.clients;
create policy "Admins can read clients"
on public.clients
for select
to authenticated
using (public.is_admin());

drop policy if exists "Admins can create clients" on public.clients;
create policy "Admins can create clients"
on public.clients
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "Admins can update clients" on public.clients;
create policy "Admins can update clients"
on public.clients
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete clients" on public.clients;
create policy "Admins can delete clients"
on public.clients
for delete
to authenticated
using (public.is_admin());

drop policy if exists "Admins can read invoices" on public.invoices;
create policy "Admins can read invoices"
on public.invoices
for select
to authenticated
using (public.is_admin());

drop policy if exists "Admins can create invoices" on public.invoices;
create policy "Admins can create invoices"
on public.invoices
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "Admins can update invoices" on public.invoices;
create policy "Admins can update invoices"
on public.invoices
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete invoices" on public.invoices;
create policy "Admins can delete invoices"
on public.invoices
for delete
to authenticated
using (public.is_admin());

revoke all on table public.clients from anon, authenticated;
revoke all on table public.invoices from anon, authenticated;
revoke all on function public.list_homepage_clients() from public;

grant select, insert, update, delete on table public.clients to authenticated;
grant select, insert, update, delete on table public.invoices to authenticated;
grant execute on function public.list_homepage_clients() to anon, authenticated;
