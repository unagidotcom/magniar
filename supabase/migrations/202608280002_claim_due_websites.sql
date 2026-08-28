create or replace function public.claim_due_websites(
  p_website_id uuid default null,
  p_limit integer default 50
)
returns table (
  id uuid,
  url text,
  normalized_url text,
  monitoring_enabled boolean,
  check_interval_minutes integer,
  last_checked_at timestamptz
)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  safe_limit integer := least(greatest(coalesce(p_limit, 50), 1), 500);
begin
  return query
  with due_websites as (
    select w.id
    from public.websites w
    where w.monitoring_enabled = true
      and (
        p_website_id is not null
        or w.last_checked_at is null
        or w.last_checked_at <= statement_timestamp() - (w.check_interval_minutes * interval '1 minute')
      )
      and (p_website_id is null or w.id = p_website_id)
    order by w.last_checked_at asc nulls first, w.created_at asc
    limit safe_limit
    for update of w skip locked
  )
  update public.websites w
  set
    last_checked_at = statement_timestamp(),
    updated_at = statement_timestamp()
  from due_websites
  where w.id = due_websites.id
  returning
    w.id,
    w.url,
    w.normalized_url,
    w.monitoring_enabled,
    w.check_interval_minutes,
    w.last_checked_at;
end;
$$;

revoke all on function public.claim_due_websites(uuid, integer) from public, anon, authenticated;
grant execute on function public.claim_due_websites(uuid, integer) to service_role;
