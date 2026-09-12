alter table public.websites
  add column if not exists monitoring_consecutive_failures integer not null default 0
    check (monitoring_consecutive_failures >= 0),
  add column if not exists monitoring_incident_started_at timestamptz,
  add column if not exists monitoring_incident_notified_at timestamptz,
  add column if not exists monitoring_last_alert_sent_at timestamptz,
  add column if not exists monitoring_last_reminder_at timestamptz;

alter table public.websites
  alter column check_interval_minutes set default 30;

update public.websites
set check_interval_minutes = 30
where monitoring_enabled = true
  and check_interval_minutes <> 30;

create table if not exists public.website_alert_notifications (
  id uuid primary key default gen_random_uuid(),
  website_id uuid not null references public.websites(id) on delete cascade,
  website_check_id uuid references public.website_checks(id) on delete set null,
  event_type text not null
    check (event_type in ('OUTAGE', 'REMINDER', 'RECOVERY')),
  monitor_status text not null
    check (monitor_status in ('ONLINE', 'DOWN', 'ERROR')),
  incident_started_at timestamptz not null,
  recipient_email text not null check (
    char_length(trim(recipient_email)) > 3
    and position('@' in recipient_email) > 1
  ),
  dedupe_key text not null unique,
  delivery_status text not null default 'PENDING'
    check (delivery_status in ('PENDING', 'PROCESSING', 'SENT', 'FAILED', 'CANCELLED')),
  attempt_count integer not null default 0 check (attempt_count >= 0),
  next_attempt_at timestamptz not null default now(),
  processing_started_at timestamptz,
  provider_message_id text,
  delivery_error text,
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists website_alert_notifications_delivery_idx
  on public.website_alert_notifications (delivery_status, next_attempt_at, created_at);

create index if not exists website_alert_notifications_website_idx
  on public.website_alert_notifications (website_id, created_at desc);

drop trigger if exists website_alert_notifications_touch_updated_at
  on public.website_alert_notifications;
create trigger website_alert_notifications_touch_updated_at
before update on public.website_alert_notifications
for each row
execute function public.touch_updated_at();

alter table public.website_alert_notifications enable row level security;

drop policy if exists "Admins can read website alert notifications"
  on public.website_alert_notifications;
create policy "Admins can read website alert notifications"
on public.website_alert_notifications
for select
to authenticated
using (public.is_admin());

revoke all on table public.website_alert_notifications from anon, authenticated;
grant select on table public.website_alert_notifications to authenticated;

drop function if exists public.claim_due_websites(uuid, integer);
create function public.claim_due_websites(
  p_website_id uuid default null,
  p_limit integer default 50
)
returns table (
  id uuid,
  name text,
  url text,
  normalized_url text,
  monitoring_enabled boolean,
  check_interval_minutes integer,
  last_checked_at timestamptz,
  current_status text,
  monitoring_consecutive_failures integer,
  monitoring_incident_started_at timestamptz,
  monitoring_incident_notified_at timestamptz,
  monitoring_last_alert_sent_at timestamptz,
  monitoring_last_reminder_at timestamptz
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
    w.name,
    w.url,
    w.normalized_url,
    w.monitoring_enabled,
    w.check_interval_minutes,
    w.last_checked_at,
    w.current_status,
    w.monitoring_consecutive_failures,
    w.monitoring_incident_started_at,
    w.monitoring_incident_notified_at,
    w.monitoring_last_alert_sent_at,
    w.monitoring_last_reminder_at;
end;
$$;

create or replace function public.record_website_check(
  p_website_id uuid,
  p_checked_at timestamptz,
  p_status text,
  p_http_status_code integer,
  p_response_time_ms integer,
  p_error_message text,
  p_alert_recipient text
)
returns table (
  website_check_id uuid,
  alert_notification_id uuid
)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  website_row public.websites%rowtype;
  safe_checked_at timestamptz := coalesce(p_checked_at, statement_timestamp());
  safe_recipient text := lower(trim(coalesce(p_alert_recipient, '')));
  next_failure_count integer;
  incident_start timestamptz;
  notification_dedupe_key text;
begin
  if p_status not in ('ONLINE', 'DOWN', 'ERROR') then
    raise exception 'Invalid website status'
      using errcode = '22023';
  end if;

  if p_http_status_code is not null
    and (p_http_status_code < 100 or p_http_status_code > 599) then
    raise exception 'Invalid HTTP status code'
      using errcode = '22023';
  end if;

  if p_response_time_ms is not null and p_response_time_ms < 0 then
    raise exception 'Invalid response time'
      using errcode = '22023';
  end if;

  select *
  into website_row
  from public.websites
  where id = p_website_id
  for update;

  if not found then
    raise exception 'Website not found'
      using errcode = 'P0002';
  end if;

  insert into public.website_checks (
    website_id,
    checked_at,
    status,
    http_status_code,
    response_time_ms,
    error_message
  ) values (
    p_website_id,
    safe_checked_at,
    p_status,
    p_http_status_code,
    p_response_time_ms,
    left(nullif(trim(coalesce(p_error_message, '')), ''), 500)
  )
  returning id into website_check_id;

  alert_notification_id := null;

  if p_status = 'ONLINE' then
    if website_row.monitoring_incident_notified_at is not null
      and website_row.monitoring_incident_started_at is not null
      and position('@' in safe_recipient) > 1 then
      notification_dedupe_key := concat(
        p_website_id,
        ':recovery:',
        extract(epoch from website_row.monitoring_incident_started_at)::bigint
      );

      insert into public.website_alert_notifications (
        website_id,
        website_check_id,
        event_type,
        monitor_status,
        incident_started_at,
        recipient_email,
        dedupe_key
      ) values (
        p_website_id,
        website_check_id,
        'RECOVERY',
        p_status,
        website_row.monitoring_incident_started_at,
        safe_recipient,
        notification_dedupe_key
      )
      on conflict (dedupe_key) do nothing
      returning id into alert_notification_id;
    else
      update public.website_alert_notifications
      set
        delivery_status = 'CANCELLED',
        delivery_error = 'Incident recovered before an outage email was delivered.',
        processing_started_at = null,
        updated_at = statement_timestamp()
      where website_id = p_website_id
        and event_type in ('OUTAGE', 'REMINDER')
        and delivery_status in ('PENDING', 'FAILED');
    end if;

    update public.websites
    set
      current_status = p_status,
      last_http_status_code = p_http_status_code,
      last_response_time_ms = p_response_time_ms,
      last_checked_at = safe_checked_at,
      monitoring_consecutive_failures = 0,
      monitoring_incident_started_at = null,
      monitoring_incident_notified_at = null,
      monitoring_last_alert_sent_at = null,
      monitoring_last_reminder_at = null,
      updated_at = statement_timestamp()
    where id = p_website_id;
  else
    next_failure_count := website_row.monitoring_consecutive_failures + 1;
    incident_start := coalesce(website_row.monitoring_incident_started_at, safe_checked_at);

    if next_failure_count >= 2
      and website_row.monitoring_incident_notified_at is null
      and position('@' in safe_recipient) > 1 then
      notification_dedupe_key := concat(
        p_website_id,
        ':outage:',
        extract(epoch from incident_start)::bigint
      );

      insert into public.website_alert_notifications (
        website_id,
        website_check_id,
        event_type,
        monitor_status,
        incident_started_at,
        recipient_email,
        dedupe_key
      ) values (
        p_website_id,
        website_check_id,
        'OUTAGE',
        p_status,
        incident_start,
        safe_recipient,
        notification_dedupe_key
      )
      on conflict (dedupe_key) do nothing
      returning id into alert_notification_id;
    elsif website_row.monitoring_incident_notified_at is not null
      and (
        website_row.monitoring_last_reminder_at is null
        or website_row.monitoring_last_reminder_at <= safe_checked_at - interval '24 hours'
      )
      and position('@' in safe_recipient) > 1 then
      notification_dedupe_key := concat(
        p_website_id,
        ':reminder:',
        extract(epoch from date_trunc('day', safe_checked_at))::bigint
      );

      insert into public.website_alert_notifications (
        website_id,
        website_check_id,
        event_type,
        monitor_status,
        incident_started_at,
        recipient_email,
        dedupe_key
      ) values (
        p_website_id,
        website_check_id,
        'REMINDER',
        p_status,
        incident_start,
        safe_recipient,
        notification_dedupe_key
      )
      on conflict (dedupe_key) do nothing
      returning id into alert_notification_id;
    end if;

    update public.websites
    set
      current_status = p_status,
      last_http_status_code = p_http_status_code,
      last_response_time_ms = p_response_time_ms,
      last_checked_at = safe_checked_at,
      monitoring_consecutive_failures = next_failure_count,
      monitoring_incident_started_at = incident_start,
      updated_at = statement_timestamp()
    where id = p_website_id;
  end if;

  return next;
end;
$$;

create or replace function public.claim_pending_website_alerts(p_limit integer default 25)
returns table (
  id uuid,
  website_id uuid,
  website_name text,
  website_url text,
  client_business_name text,
  event_type text,
  monitor_status text,
  incident_started_at timestamptz,
  recipient_email text,
  http_status_code integer,
  response_time_ms integer,
  error_message text,
  attempt_count integer,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  safe_limit integer := least(greatest(coalesce(p_limit, 25), 1), 100);
begin
  return query
  with candidates as (
    select notification.id
    from public.website_alert_notifications notification
    where notification.attempt_count < 5
      and (
        (
          notification.delivery_status in ('PENDING', 'FAILED')
          and notification.next_attempt_at <= statement_timestamp()
        )
        or (
          notification.delivery_status = 'PROCESSING'
          and notification.processing_started_at <= statement_timestamp() - interval '15 minutes'
        )
      )
    order by notification.created_at asc
    limit safe_limit
    for update of notification skip locked
  ), claimed as (
    update public.website_alert_notifications notification
    set
      delivery_status = 'PROCESSING',
      processing_started_at = statement_timestamp(),
      attempt_count = notification.attempt_count + 1,
      delivery_error = null,
      updated_at = statement_timestamp()
    from candidates
    where notification.id = candidates.id
    returning notification.*
  )
  select
    claimed.id,
    claimed.website_id,
    website.name,
    website.normalized_url,
    client.business_name,
    claimed.event_type,
    claimed.monitor_status,
    claimed.incident_started_at,
    claimed.recipient_email,
    website_check.http_status_code,
    website_check.response_time_ms,
    website_check.error_message,
    claimed.attempt_count,
    claimed.created_at
  from claimed
  join public.websites website on website.id = claimed.website_id
  left join public.clients client on client.id = website.client_id
  left join public.website_checks website_check on website_check.id = claimed.website_check_id
  order by claimed.created_at asc;
end;
$$;

create or replace function public.mark_website_alert_delivery(
  p_notification_id uuid,
  p_succeeded boolean,
  p_provider_message_id text default null,
  p_delivery_error text default null
)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  notification_row public.website_alert_notifications%rowtype;
  delivery_time timestamptz := statement_timestamp();
  retry_delay interval;
begin
  select *
  into notification_row
  from public.website_alert_notifications
  where id = p_notification_id
  for update;

  if not found then
    raise exception 'Website alert notification not found'
      using errcode = 'P0002';
  end if;

  if p_succeeded then
    update public.website_alert_notifications
    set
      delivery_status = 'SENT',
      provider_message_id = left(nullif(trim(coalesce(p_provider_message_id, '')), ''), 200),
      delivery_error = null,
      sent_at = delivery_time,
      processing_started_at = null,
      updated_at = delivery_time
    where id = p_notification_id;

    if notification_row.event_type = 'OUTAGE' then
      update public.websites
      set
        monitoring_incident_notified_at = delivery_time,
        monitoring_last_alert_sent_at = delivery_time,
        updated_at = delivery_time
      where id = notification_row.website_id
        and monitoring_incident_started_at = notification_row.incident_started_at;
    elsif notification_row.event_type = 'REMINDER' then
      update public.websites
      set
        monitoring_last_alert_sent_at = delivery_time,
        monitoring_last_reminder_at = delivery_time,
        updated_at = delivery_time
      where id = notification_row.website_id
        and monitoring_incident_started_at = notification_row.incident_started_at;
    end if;
  else
    retry_delay := case
      when notification_row.attempt_count <= 1 then interval '30 minutes'
      when notification_row.attempt_count = 2 then interval '1 hour'
      when notification_row.attempt_count = 3 then interval '3 hours'
      else interval '12 hours'
    end;

    update public.website_alert_notifications
    set
      delivery_status = 'FAILED',
      delivery_error = left(nullif(trim(coalesce(p_delivery_error, 'Email delivery failed.')), ''), 500),
      next_attempt_at = delivery_time + retry_delay,
      processing_started_at = null,
      updated_at = delivery_time
    where id = p_notification_id;
  end if;
end;
$$;

revoke all on function public.claim_due_websites(uuid, integer)
  from public, anon, authenticated;
grant execute on function public.claim_due_websites(uuid, integer) to service_role;

revoke all on function public.record_website_check(
  uuid, timestamptz, text, integer, integer, text, text
) from public, anon, authenticated;
grant execute on function public.record_website_check(
  uuid, timestamptz, text, integer, integer, text, text
) to service_role;

revoke all on function public.claim_pending_website_alerts(integer)
  from public, anon, authenticated;
grant execute on function public.claim_pending_website_alerts(integer) to service_role;

revoke all on function public.mark_website_alert_delivery(
  uuid, boolean, text, text
) from public, anon, authenticated;
grant execute on function public.mark_website_alert_delivery(
  uuid, boolean, text, text
) to service_role;
