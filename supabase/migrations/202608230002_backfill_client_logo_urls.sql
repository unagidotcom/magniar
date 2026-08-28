alter table public.clients
  add column if not exists logo_url text;

update public.clients
set logo_url = nullif(raw_client_data ->> 'logo_url', '')
where (logo_url is null or logo_url = '')
  and nullif(raw_client_data ->> 'logo_url', '') is not null;

create or replace function public.list_homepage_clients()
returns table (
  id text,
  business_name text,
  industry text,
  homepage_label text,
  website text,
  logo_url text
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
    clients.website,
    coalesce(nullif(clients.logo_url, ''), nullif(clients.raw_client_data ->> 'logo_url', '')) as logo_url
  from public.clients
  where clients.show_on_homepage = true
    and clients.status in ('ACTIVE', 'ONBOARDING')
  order by clients.homepage_order asc, clients.created_at desc
  limit 12;
$$;

revoke all on function public.list_homepage_clients() from public;
grant execute on function public.list_homepage_clients() to anon, authenticated;
