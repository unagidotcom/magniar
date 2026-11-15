# Razorpay recurring subscriptions

This admin-only Edge Function creates and controls Razorpay Subscriptions for Magniar retainers.

Supported actions:

- `create`
- `refresh`
- `pause`
- `resume`
- `cancel` immediately or at the end of the billing cycle

The function requires a valid Supabase administrator session and uses the existing
`RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` Edge Function secrets. Secret values must never be
added to frontend environment variables.

Deploy with normal Supabase JWT verification:

```powershell
npx supabase functions deploy razorpay-subscriptions --project-ref smgvuxpemrglntzvchwi
```

The existing signed `razorpay-webhook` function synchronizes provider lifecycle events and creates
one paid Magniar invoice for each successful subscription charge.
