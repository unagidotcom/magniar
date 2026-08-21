create table if not exists public.business_settings (
  id boolean primary key default true check (id),
  legal_name text not null default '',
  display_name text not null default 'Magniar',
  email text,
  phone text,
  website text,
  address_line_1 text,
  address_line_2 text,
  city text,
  region text,
  postal_code text,
  country text,
  tax_id_label text,
  tax_id_value text,
  default_currency text not null default 'USD',
  payment_instructions text,
  invoice_footer text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists business_settings_touch_updated_at on public.business_settings;
create trigger business_settings_touch_updated_at
before update on public.business_settings
for each row
execute function public.touch_updated_at();

alter table public.business_settings enable row level security;

drop policy if exists "Admins can read business settings" on public.business_settings;
create policy "Admins can read business settings"
on public.business_settings
for select
to authenticated
using (public.is_admin());

drop policy if exists "Admins can create business settings" on public.business_settings;
create policy "Admins can create business settings"
on public.business_settings
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "Admins can update business settings" on public.business_settings;
create policy "Admins can update business settings"
on public.business_settings
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

revoke all on table public.business_settings from anon, authenticated;
grant select, insert, update on table public.business_settings to authenticated;
