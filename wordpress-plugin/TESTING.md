# WordPress Tracker verification

Release: 1.0.0. Tested locally on 2026-09-13.

## Verified

- The packaged ZIP installs and activates through WordPress's real plugin upgrader.
- WordPress 6.0.14 / PHP 7.4.33: 86 security, reporting, and lifecycle assertions passed.
- WordPress 7.1 / PHP 8.3.33: final 87 assertions passed, with syntax parsing of all nine PHP files.
- WordPress 7.1 / PHP 8.5.10: 87 assertions passed, including the additional incomplete-update-cache regression test. All nine PHP files passed PHP syntax parsing.
- 13 browser workflow checks passed in Microsoft Edge, controlled by Playwright.
- Settings save and survive reload; saved keys are absent from HTML.
- Correct acknowledgements produce success. HTTP rejection, HTML replies, redirects, and malformed acknowledgements do not.
- Unauthorized/subscriber users and invalid nonces cannot perform tracker actions.
- Pause removes the daily event; disconnect removes the saved key and association.
- Frontend and unrelated admin screens contain no tracker CSS/JS or credentials.
- Screenshots checked at 1440px and 390px; no horizontal page overflow.
- Website checks: npm run lint, npm test, and npm run build pass. Build retains the existing large-chunk warning.

Report responses are controlled test fixtures through WordPress's HTTP API. The
tests exercise the real plugin, WordPress APIs, options database, admin forms,
permissions, scheduler, and installation flow. They do not claim that a report
was inserted into the live Magniar Supabase database during this build.

## Third-party coexistence results

The following passed activation, read-only diagnostics collection, and public
homepage loading without Magniar assets or a fatal error, on WordPress 7.1 / PHP 8.3.33:

| Environment | Result |
| --- | --- |
| Clean WordPress | Passed |
| WP Super Cache 3.1.3 | Passed activation/coexistence; full page-cache configuration not tested |
| Elementor 4.2.4 | Passed |
| WooCommerce 11.1.0 | Passed |
| Elementor 4.2.4 + WooCommerce 11.1.0 | Passed |
| Yoast SEO 28.4 | Passed |
| Docket Cache 26.04.05 | Passed coexistence; its persistent cache was not enabled |
| Limit Login Attempts Reloaded 3.3.8 | Passed |
| SQLite Object Cache 1.6.5 | Passed with wp_using_ext_object_cache() returning true |
| 120 additional plugin-header fixtures, PHP memory_limit=64M | Passed, 40.5 MiB whole-request peak in the targeted run |
| Optional intl, Redis, and Memcached extensions absent | Collection and browser tests passed |

Wordfence could not activate in the SQLite test environment. The failure was
reproduced with Magniar deactivated: Wordfence's wfConfig::set_ser() called an
unsupported prepared-statement operation on WordPress's MySQL-on-SQLite driver
(SQLSTATE IM001). This is not a passing Wordfence compatibility result. Verify
Wordfence on a MySQL/MariaDB staging site before a production installation that
uses it. The compatibility runner deliberately exits nonzero for this unresolved
environment case instead of hiding it.

## Reproduce

From wordpress-plugin/tests:

```powershell
npm ci
npx playwright install chromium
node package.mjs
node run.mjs
node browser.mjs
node compatibility.mjs
```

For a specific runtime:

```powershell
$env:MAGNIAR_TEST_PHP = '7.4'
$env:MAGNIAR_TEST_WP = '6.0'
node run.mjs
```

Browser tests accept MAGNIAR_CHROMIUM_PATH to use an installed Chromium-based
browser. Test dependencies have their own package and lockfile; they do not enter
the website bundle or plugin ZIP. Release ZIPs, downloaded third-party plugins,
JSON results, and screenshots are under wordpress-plugin/dist (Git-ignored).

Initial lifecycle runs used official WordPress Playground CLI. The runners now
use the same project's PHP/WordPress engine in memory to avoid Windows native
file-lock delays. These disposable environments use WordPress's SQLite
integration, not a production MySQL server. No production site is modified.

## Limits requiring a staging site

- Live delivery to the agency's Supabase receiver using a real website/key.
- The customer's exact theme, plugin versions, hosting restrictions, and firewall.
- Real Elementor editor interactions and WooCommerce checkout/payment flows.
- Real Redis/Memcached, MySQL/MariaDB, multisite networks, host-managed scheduling,
  and host-managed backups.

The plugin does not access orders, customers, payments, Elementor documents, or
third-party configuration. A coexistence smoke test is not a certification of
every third-party workflow or version.

## Security design references

- [WordPress safe HTTP POST API](https://developer.wordpress.org/reference/functions/wp_safe_remote_post/)
- [WordPress Playground browser testing](https://developer.wordpress.org/playground/handbook/guides/e2e-testing-with-playwright/)
- [PHP security support dates](https://www.php.net/supported-versions.php)
