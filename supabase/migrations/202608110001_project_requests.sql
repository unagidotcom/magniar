create extension if not exists pgcrypto;

create sequence if not exists public.project_request_number_seq;

create table if not exists public.project_requests (
  id uuid primary key default gen_random_uuid(),
  request_number text not null unique default (
    'MG-REQ-' ||
    to_char(now(), 'YYYY') ||
    '-' ||
    lpad(nextval('public.project_request_number_seq')::text, 6, '0')
  ),
  status text not null default 'NEW'
    check (status in (
      'NEW',
      'REVIEWING',
      'QUALIFIED',
      'DISCOVERY',
      'PROPOSAL',
      'WON',
      'LOST',
      'NOT_A_FIT',
      'ARCHIVED'
    )),
  source text not null default '/start-project',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  opening_goal text,

  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  country text,
  role text,

  company_name text not null,
  website text not null,
  industry text,
  business_model text,
  primary_market text,
  target_market text,
  business_size text,

  performance_services text[] not null default '{}',
  commerce_platforms text[] not null default '{}',
  development_services text[] not null default '{}',
  intelligence_services text[] not null default '{}',
  is_not_sure_needs boolean not null default false,

  current_platforms text[] not null default '{}',
  current_marketing_channels text[] not null default '{}',
  current_team text,
  current_challenges text[] not null default '{}',
  tell_us_more text not null,
  primary_goals text[] not null default '{}',

  monthly_media_ad_spend text,
  project_service_budget text,
  timeline text,
  engagement_type text,

  referral_source text,
  anything_else text,
  attachment_name text,
  raw_form_data jsonb not null default '{}'::jsonb,

  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz,
  internal_notes text
);

create index if not exists project_requests_created_at_idx
  on public.project_requests (created_at desc);

create index if not exists project_requests_status_idx
  on public.project_requests (status);

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

drop trigger if exists project_requests_touch_updated_at on public.project_requests;
create trigger project_requests_touch_updated_at
before update on public.project_requests
for each row
execute function public.touch_updated_at();

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

create or replace function public.require_non_empty(value text, field_name text)
returns text
language plpgsql
immutable
set search_path = ''
as $$
declare
  cleaned text := nullif(btrim(value), '');
begin
  if cleaned is null then
    raise exception '% is required', field_name using errcode = '22023';
  end if;
  return cleaned;
end;
$$;

create or replace function public.submit_project_request(
  p_opening_goal text,
  p_first_name text,
  p_last_name text,
  p_email text,
  p_phone text,
  p_country text,
  p_role text,
  p_company_name text,
  p_website text,
  p_industry text,
  p_business_model text,
  p_primary_market text,
  p_target_market text,
  p_business_size text,
  p_performance_services text[],
  p_commerce_platforms text[],
  p_development_services text[],
  p_intelligence_services text[],
  p_is_not_sure_needs boolean,
  p_current_platforms text[],
  p_current_marketing_channels text[],
  p_current_team text,
  p_current_challenges text[],
  p_tell_us_more text,
  p_primary_goals text[],
  p_monthly_media_ad_spend text,
  p_project_service_budget text,
  p_timeline text,
  p_engagement_type text,
  p_referral_source text,
  p_anything_else text,
  p_attachment_name text
)
returns table (
  id uuid,
  request_number text,
  status text,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if position('@' in coalesce(p_email, '')) = 0 then
    raise exception 'A valid email is required' using errcode = '22023';
  end if;

  if char_length(public.require_non_empty(p_tell_us_more, 'Project context')) < 10 then
    raise exception 'Project context must be at least 10 characters' using errcode = '22023';
  end if;

  return query
  insert into public.project_requests (
    opening_goal,
    first_name,
    last_name,
    email,
    phone,
    country,
    role,
    company_name,
    website,
    industry,
    business_model,
    primary_market,
    target_market,
    business_size,
    performance_services,
    commerce_platforms,
    development_services,
    intelligence_services,
    is_not_sure_needs,
    current_platforms,
    current_marketing_channels,
    current_team,
    current_challenges,
    tell_us_more,
    primary_goals,
    monthly_media_ad_spend,
    project_service_budget,
    timeline,
    engagement_type,
    referral_source,
    anything_else,
    attachment_name,
    raw_form_data
  )
  values (
    nullif(btrim(p_opening_goal), ''),
    public.require_non_empty(p_first_name, 'First name'),
    public.require_non_empty(p_last_name, 'Last name'),
    lower(public.require_non_empty(p_email, 'Email')),
    nullif(btrim(p_phone), ''),
    nullif(btrim(p_country), ''),
    nullif(btrim(p_role), ''),
    public.require_non_empty(p_company_name, 'Company name'),
    public.require_non_empty(p_website, 'Website'),
    nullif(btrim(p_industry), ''),
    nullif(btrim(p_business_model), ''),
    nullif(btrim(p_primary_market), ''),
    nullif(btrim(p_target_market), ''),
    nullif(btrim(p_business_size), ''),
    coalesce(p_performance_services, '{}'),
    coalesce(p_commerce_platforms, '{}'),
    coalesce(p_development_services, '{}'),
    coalesce(p_intelligence_services, '{}'),
    coalesce(p_is_not_sure_needs, false),
    coalesce(p_current_platforms, '{}'),
    coalesce(p_current_marketing_channels, '{}'),
    nullif(btrim(p_current_team), ''),
    coalesce(p_current_challenges, '{}'),
    public.require_non_empty(p_tell_us_more, 'Project context'),
    coalesce(p_primary_goals, '{}'),
    nullif(btrim(p_monthly_media_ad_spend), ''),
    nullif(btrim(p_project_service_budget), ''),
    nullif(btrim(p_timeline), ''),
    nullif(btrim(p_engagement_type), ''),
    nullif(btrim(p_referral_source), ''),
    nullif(btrim(p_anything_else), ''),
    nullif(btrim(p_attachment_name), ''),
    jsonb_build_object(
      'openingGoal', p_opening_goal,
      'firstName', p_first_name,
      'lastName', p_last_name,
      'email', p_email,
      'phone', p_phone,
      'country', p_country,
      'role', p_role,
      'companyName', p_company_name,
      'website', p_website,
      'industry', p_industry,
      'businessModel', p_business_model,
      'primaryMarket', p_primary_market,
      'targetMarket', p_target_market,
      'businessSize', p_business_size,
      'performanceServices', coalesce(p_performance_services, '{}'),
      'commercePlatforms', coalesce(p_commerce_platforms, '{}'),
      'developmentServices', coalesce(p_development_services, '{}'),
      'intelligenceServices', coalesce(p_intelligence_services, '{}'),
      'isNotSureNeeds', coalesce(p_is_not_sure_needs, false),
      'currentPlatforms', coalesce(p_current_platforms, '{}'),
      'currentMarketingChannels', coalesce(p_current_marketing_channels, '{}'),
      'currentTeam', p_current_team,
      'currentChallenges', coalesce(p_current_challenges, '{}'),
      'tellUsMore', p_tell_us_more,
      'primaryGoals', coalesce(p_primary_goals, '{}'),
      'monthlyMediaAdSpend', p_monthly_media_ad_spend,
      'projectServiceBudget', p_project_service_budget,
      'timeline', p_timeline,
      'engagementType', p_engagement_type,
      'referralSource', p_referral_source,
      'anythingElse', p_anything_else,
      'attachmentName', p_attachment_name
    )
  )
  returning
    project_requests.id,
    project_requests.request_number,
    project_requests.status,
    project_requests.created_at;
end;
$$;

alter table public.project_requests enable row level security;

drop policy if exists "Admins can read project requests" on public.project_requests;
create policy "Admins can read project requests"
on public.project_requests
for select
to authenticated
using (public.is_admin());

drop policy if exists "Admins can update project requests" on public.project_requests;
create policy "Admins can update project requests"
on public.project_requests
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

revoke all on table public.project_requests from anon, authenticated;
revoke all on function public.submit_project_request(
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text[],
  text[],
  text[],
  text[],
  boolean,
  text[],
  text[],
  text,
  text[],
  text,
  text[],
  text,
  text,
  text,
  text,
  text,
  text,
  text
) from public;

grant execute on function public.submit_project_request(
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text[],
  text[],
  text[],
  text[],
  boolean,
  text[],
  text[],
  text,
  text[],
  text,
  text[],
  text,
  text,
  text,
  text,
  text,
  text,
  text
) to anon, authenticated;

grant select, update on table public.project_requests to authenticated;
