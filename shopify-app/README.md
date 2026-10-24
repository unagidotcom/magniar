# Magniar Store Tracker for Shopify

This integration connects a Shopify store to an existing Shopify website record in Magniar Admin OS. It is a public, limited-visibility Shopify app architecture so it can be installed on unrelated client stores after Shopify review.

## Data boundary

The app requests only `read_themes`. It reads basic shop identity and configuration exposed by Shopify, the current app scopes, and the published theme. It does not request or store customers, orders, products, payments, or checkout data.

OAuth access and refresh tokens are encrypted with AES-256-GCM inside Supabase Edge Functions before storage. New installations use Shopify's required expiring offline tokens, which are renewed server-side shortly before expiry. Tokens are never returned to the browser. Direct browser access to the installation and webhook tables is revoked.

## Shopify app setup

1. Create a public app in the Shopify Dev Dashboard and choose limited visibility when distributing it.
2. Copy `shopify.app.toml.example` to `shopify.app.toml` and replace the client ID.
3. Keep `use_legacy_install_flow = true`. Magniar is a standalone, non-embedded app that starts the authorization-code installation from Admin OS.
4. Set the app URL, callback URL, scopes, and webhook URL exactly as shown in the example.
5. Run `shopify app deploy` so Shopify registers the installation mode and webhook subscriptions.
6. Add the server-only Supabase secrets below.
7. Open a website whose platform is `Shopify` in Magniar Admin OS and connect its permanent `*.myshopify.com` domain.

## Required Supabase secrets

- `SHOPIFY_API_KEY`: Shopify app client ID.
- `SHOPIFY_API_SECRET`: Shopify app client secret.
- `SHOPIFY_TOKEN_ENCRYPTION_KEY`: a random 32-byte value encoded as base64.
- `MAGNIAR_ADMIN_URL`: the public Magniar origin, normally `https://magniar.com`.

Never put these values in a Vite environment file or expose them with a `VITE_` prefix.

## Supabase functions

- `shopify-admin`: authenticated Admin OS status, connect, and manual sync operations.
- `shopify-oauth-callback`: Shopify OAuth callback with query HMAC and signed-state verification.
- `shopify-webhooks`: raw-body HMAC verification, delivery deduplication, uninstall cleanup, privacy webhooks, and metadata refresh.

The callback and webhook functions must be deployed without Supabase JWT verification because Shopify calls them directly. They perform their own Shopify signature validation. `shopify-admin` must retain Supabase JWT verification and also checks the trusted `app_metadata` admin claim.

## Required deployment order

1. Apply `supabase/migrations/202610200001_shopify_monitoring.sql` and `supabase/migrations/202610250001_shopify_expiring_tokens.sql`.
2. Set the four Supabase secrets.
3. Deploy `shopify-admin` with JWT verification.
4. Deploy `shopify-oauth-callback` and `shopify-webhooks` with `--no-verify-jwt`.
5. Deploy the Shopify app configuration and complete a development-store install before submitting for public review.
