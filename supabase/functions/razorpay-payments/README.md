# Razorpay invoice payments

This integration creates invoice-specific Razorpay Payment Links from Admin OS and reconciles
captured payments through a signed webhook.

## Supabase secrets

Configure these as Supabase Edge Function secrets. Never add them to `VITE_` variables or commit
their values.

- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `RAZORPAY_WEBHOOK_SECRET`

## Functions

- `razorpay-payments`: authenticated admin endpoint for creating and cancelling Payment Links.
- `razorpay-webhook`: public Razorpay webhook receiver secured by raw-body HMAC-SHA256 validation.

Deploy the admin function with normal Supabase JWT verification. Deploy the webhook with JWT
verification disabled because Razorpay authenticates with `X-Razorpay-Signature`.

```powershell
npx supabase functions deploy razorpay-payments --project-ref smgvuxpemrglntzvchwi
npx supabase functions deploy razorpay-webhook --project-ref smgvuxpemrglntzvchwi --no-verify-jwt
```

Configure the Razorpay webhook URL as:

```text
https://smgvuxpemrglntzvchwi.supabase.co/functions/v1/razorpay-webhook
```

Enable at least these events:

- `payment_link.paid`
- `payment_link.expired`
- `payment_link.cancelled`
- `payment.captured`
- `payment.failed`

For recurring billing, also enable:

- `subscription.authenticated`
- `subscription.activated`
- `subscription.charged`
- `subscription.pending`
- `subscription.halted`
- `subscription.paused`
- `subscription.resumed`
- `subscription.cancelled`
- `subscription.completed`

Use separate Test and Live API keys and webhook secrets. Complete Test Mode verification before
replacing the Supabase secrets with Live Mode credentials.
