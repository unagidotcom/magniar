create extension if not exists pgcrypto with schema extensions;

alter table public.websites
  add column if not exists wordpress_tracker_enabled boolean not null default false,
  add column if not exists wordpress_tracker_key_hash text,
  add column if not exists wordpress_tracker_key_last_rotated_at timestamptz,
  add column if not exists wordpress_last_report_at timestamptz;

create table if not exists public.wordpress_site_reports (
  id uuid primary key default gen_random_uuid(),
  website_id uuid not null references public.websites(id) on delete cascade,
  reported_at timestamptz not null default now(),
  site_url text not null check (char_length(trim(site_url)) > 0),
  wordpress_version text,
  wordpress_update_available boolean,
  php_version text,
  php_supported boolean,
  active_theme_name text,
  active_theme_version text,
  theme_updates_available integer not null default 0
    check (theme_updates_available >= 0),
  plugin_count integer not null default 0
    check (plugin_count >= 0),
  active_plugin_count integer not null default 0
    check (active_plugin_count >= 0),
  inactive_plugin_count integer not null default 0
    check (inactive_plugin_count >= 0),
  plugin_updates_available integer not null default 0
    check (plugin_updates_available >= 0),
  ssl_enabled boolean,
  admin_ssl_enabled boolean,
  search_engine_visible boolean,
  backup_detected boolean,
  backup_last_run_at timestamptz,
  health_status text not null default 'UNKNOWN'
    check (health_status in ('UNKNOWN', 'GOOD', 'WARNING', 'CRITICAL')),
  raw_report_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists wordpress_site_reports_website_reported_at_idx
  on public.wordpress_site_reports (website_id, reported_at desc);

create index if not exists wordpress_site_reports_health_status_idx
  on public.wordpress_site_reports (health_status);

create index if not exists websites_wordpress_last_report_at_idx
  on public.websites (wordpress_last_report_at desc);

create or replace function public.generate_wordpress_tracker_key()
returns text
language sql
security definer
set search_path = public, extensions, pg_temp
as $$
  select 'mgwp_' || translate(trim(trailing '=' from encode(extensions.gen_random_bytes(32), 'base64')), '+/', '-_');
$$;

create or replace function public.hash_wordpress_tracker_key(p_tracker_key text)
returns text
language sql
immutable
security definer
set search_path = public, extensions, pg_temp
as $$
  select encode(extensions.digest(convert_to(coalesce(p_tracker_key, ''), 'UTF8'), 'sha256'), 'hex');
$$;

create or replace function public.regenerate_wordpress_tracker_key(p_website_id uuid)
returns table (
  website_id uuid,
  tracker_key text,
  rotated_at timestamptz
)
language plpgsql
security definer
set search_path = public, extensions, pg_temp
as $$
declare
  new_tracker_key text;
  rotation_time timestamptz := statement_timestamp();
begin
  if not public.is_admin() then
    raise exception 'Admin privileges required'
      using errcode = '42501';
  end if;

  if p_website_id is null then
    raise exception 'Website id is required'
      using errcode = '22023';
  end if;

  new_tracker_key := public.generate_wordpress_tracker_key();

  update public.websites
  set
    wordpress_tracker_enabled = true,
    wordpress_tracker_key_hash = public.hash_wordpress_tracker_key(new_tracker_key),
    wordpress_tracker_key_last_rotated_at = rotation_time,
    updated_at = rotation_time
  where id = p_website_id;

  if not found then
    raise exception 'Website not found'
      using errcode = 'P0002';
  end if;

  website_id := p_website_id;
  tracker_key := new_tracker_key;
  rotated_at := rotation_time;
  return next;
end;
$$;

alter table public.wordpress_site_reports enable row level security;

drop policy if exists "Admins can read WordPress site reports" on public.wordpress_site_reports;
create policy "Admins can read WordPress site reports"
on public.wordpress_site_reports
for select
to authenticated
using (public.is_admin());

revoke all on table public.wordpress_site_reports from anon, authenticated;
grant select on table public.wordpress_site_reports to authenticated;

revoke all on function public.generate_wordpress_tracker_key() from public, anon, authenticated;
grant execute on function public.generate_wordpress_tracker_key() to service_role;

revoke all on function public.hash_wordpress_tracker_key(text) from public, anon, authenticated;
grant execute on function public.hash_wordpress_tracker_key(text) to service_role;

revoke all on function public.regenerate_wordpress_tracker_key(uuid) from public, anon;
grant execute on function public.regenerate_wordpress_tracker_key(uuid) to authenticated;
