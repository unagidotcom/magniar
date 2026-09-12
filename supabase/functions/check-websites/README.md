# check-websites

Server-side HTTPS availability monitor for `public.websites`.

## Required secrets

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `MONITORING_CRON_SECRET` for scheduled runs
- `RESEND_API_KEY` for alert delivery
- `MONITORING_FROM_EMAIL` using a sender on a verified Resend domain
- `MONITORING_ALERT_EMAIL` for the alert recipient

Do not expose the service-role key to Vite or React.

## Manual admin trigger

The Admin OS can invoke this function for a single website by sending:

```json
{
  "website_id": "website uuid"
}
```

The function verifies the caller's Supabase user and only allows users whose `app_metadata`
contains the existing admin claim.

## GitHub Actions scheduled trigger

GitHub Actions is the only scheduler for website monitoring.

Run `.github/workflows/check-websites.yml` approximately every 30 minutes. The GitHub Action only
triggers this Edge Function; this function claims and checks only websites that are due using
`monitoring_enabled`, `last_checked_at`, and `check_interval_minutes`.

The automated scheduler runs every 30 minutes. New websites default to 30 minutes, and the alert
migration normalizes existing monitored websites to 30 minutes. The existing per-site choices remain
available for future flexibility:

- 5 minutes
- 10 minutes
- 15 minutes
- 30 minutes
- 60 minutes

Required GitHub repository secrets:

- `SUPABASE_FUNCTION_URL`
- `MONITORING_CRON_SECRET`

For the scheduled HTTP call, include:

```text
Authorization: Bearer <MONITORING_CRON_SECRET>
x-monitoring-secret: <MONITORING_CRON_SECRET>
```

Deploy this function without Supabase JWT verification so the function can authenticate scheduled
GitHub Actions requests using `MONITORING_CRON_SECRET`. Manual Admin OS checks still require a
valid Supabase admin user token unless the monitoring secret is supplied.

Scheduling is not live until this Edge Function is deployed and the GitHub repository secrets exist.

## Email alert behavior

- Two consecutive `DOWN` or `ERROR` checks confirm an incident before the first email is sent.
- HTTP 400-599 responses are treated as errors. Network failures and timeouts are treated as down.
- One recovery email is sent after a confirmed incident returns online.
- One reminder may be sent after each 24 hours that a confirmed incident remains active.
- Delivery uses a durable database outbox and an idempotency key so retries do not create a new
  alert for every scheduler run.

`RESEND_API_KEY`, `MONITORING_FROM_EMAIL`, and `MONITORING_ALERT_EMAIL` belong in Supabase Edge
Function secrets, not GitHub and not Vite environment files. GitHub only stores the function URL and
the existing scheduler secret.
