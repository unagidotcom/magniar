# Magniar WordPress Tracker

An installable, read-only health reporter for the existing Magniar Admin OS.
Version 1.0.0. WordPress 6.0+ and PHP 7.4+; use a PHP branch that still receives
security fixes on a production site.

## Install and connect

1. In WordPress, open Plugins > Add New > Upload Plugin.
2. Upload `magniar-wordpress-tracker-1.0.0.zip`, install it, and activate.
3. In Magniar Admin OS > Websites, open the matching website record.
   Its hostname must match WordPress Settings > General > Site Address.
4. Generate a WordPress tracker key. Copy the Website ID and key.
5. In WordPress > Settings > Magniar Tracker, enter the Website ID and key.
   The Magniar endpoint is already filled in. Check it against your dashboard.
6. Check "Allow daily health reports to Magniar" and save.
7. Click "Send test report." A successful connection requires a JSON acknowledgement
   containing a saved report ID and report time, not just an HTTP 200.
8. Refresh the website detail page in Magniar to see its WordPress health data.

The ZIP contains one `magniar-wordpress-tracker/` folder. Do not upload the
repository or the tests folder. No Supabase service-role key, database password,
or WordPress administrator password belongs in these settings.

The saved key is not displayed in the page source. Leave its input blank to keep
it. Generate a new key in Magniar and save that key here when rotating access.
Changing the endpoint or website ID requires re-entering the key.

## Reporting and controls

- Activation sends nothing. Both daily and manual reports require explicit consent.
- Daily reports use this plugin's existing WordPress scheduled event, with a
  randomized first run to spread different sites across the day.
- This is the WordPress diagnostic sender, separate from the GitHub Actions
  scheduler that triggers Magniar's external HTTPS uptime checks. Neither that
  scheduler nor the Supabase monitoring architecture is changed.
- WP-Cron is traffic dependent. On a low-traffic site, a report can arrive late.
  If DISABLE_WP_CRON is set, the host must already be processing WordPress events.
  This plugin does not install or modify any server scheduler.
- Manual reports are limited to one attempt per minute. Scheduled invocations
  skip a recent attempt. Failures wait for the next daily event or a manual retry;
  they cannot cause an automatic retry loop.
- Clear the reporting checkbox and save to pause. This retains the configuration.
- Disconnect removes the saved key, local snapshot, and logs and stops future reports.
  An in-flight report may finish. Disable tracking/rotate the key in Magniar for
  server-side revocation.
- The screen shows the last attempt, last accepted report, next event, latest
  diagnostic snapshot, and the last 25 events from the past seven days.

## Data and privacy

The authenticated HTTPS report contains only:

- Website UUID and public site URL
- WordPress version and cached core update availability
- PHP version and its known security-support status
- Active theme name/version and installed theme update count
- Installed/active/inactive plugin counts and cached plugin update count
- Site/admin HTTPS configuration and search indexing preference
- Recognized active backup plugin presence, when known
- A derived GOOD, WARNING, CRITICAL, or UNKNOWN health label

Plugin names/lists, visitor/user/customer/order records, content, IP addresses,
emails, filesystem paths, database information, environment variables, credentials,
cookies, and server configuration are not collected. The tracker key is used only
as the HTTPS authentication header; it is never part of diagnostic JSON or logs.

Local data resides in non-autoloaded, plugin-prefixed WordPress options. Like other
WordPress options, saved credentials can be accessed by trusted PHP code/database
administrators: this is not a security boundary against an already-compromised
WordPress installation. Keep the database and its backups protected.

Remote reports go to the configured Magniar Supabase receive-wordpress-report
function and its existing wordpress_site_reports table. They remain in Magniar
when this plugin is disconnected or uninstalled. Remove remote history through
the agency's authorized data-removal process; no public deletion capability is added.

## What diagnostics do not prove

Update counts use WordPress's existing cached checks without forcing update-server
requests. Missing or older-than-seven-days checks do not produce a GOOD health
result. The receiver's integer count fields cannot express unknown; a zero count
in an UNKNOWN snapshot is not proof there are no updates.

PHP support uses documented security deadlines for known branches, not only a
minimum version. Unknown future PHP branches produce an unknown flag. This is
not a full vulnerability scanner, patch-level audit, or hosting certificate test.

Backup detection only recognizes active UpdraftPlus, BackWPup, Duplicator,
WPvivid, or BackUpWordPress plugins. Host-managed/other backups are unknown.
The last verified backup remains unknown: installing a backup plugin cannot prove
that a backup ran or that restoration works.

There are no remote commands, automatic updates, repair actions, filesystem
scans, performance profiling, vulnerability database, or backup execution.

## Compatibility boundaries

- Uses WordPress native options, settings, capability, nonce, HTTP, and cron APIs.
- No frontend CSS or JavaScript. CSS is scoped to this plugin's settings screen.
- No new REST/AJAX endpoints, database tables, or public diagnostics.
- Does not alter themes, core, other plugins, .htaccess, wp-config.php, PHP settings,
  checkout/cart/order data, Elementor rendering, or WooCommerce HPOS storage.
- Optional plugins are counted through WordPress APIs, not their private internals.
- On multisite, activate/configure separately per site. Network activation is
  deliberately rejected; uninstall cleans only each site's opted-in tracker data.
- Outbound requests use WordPress's safe HTTP API, verified TLS, zero redirects,
  an eight-second timeout, and an 8 KiB response limit.
- Only managed Supabase HTTPS URLs ending in /functions/v1/receive-wordpress-report
  are accepted. Custom proxy/self-hosted endpoints are not supported.
- An atomic database-backed lock prevents overlapping reports and expires after a
  failed worker. There are no credential-bearing debug dumps.
- A clone/site address change blocks reports until an administrator reviews and
  saves the connection.

Compatibility is bounded by the versions/environments actually tested. Third-party
code on a specific production site still needs a staging installation test.

## Lifecycle and upgrades

Deactivation removes this plugin's scheduled event and retains settings/history.
Reactivation schedules only a configured, consented site. Versioned upgrades do
not replace credentials. Upgrading the old 0.1.0 starter pauses reporting until
the administrator saves consent on the current site.

By default, deletion retains local settings/history. Enable the uninstall cleanup
checkbox to remove plugin-owned settings, logs, snapshot, and version data.
Uninstall never deletes another plugin's data, WordPress content, or remote reports.
To remove the key immediately without deleting the plugin, use Disconnect.

## Troubleshooting

- Rejected key: regenerate it for this website in Magniar and save it in WordPress.
- Rejected report: ensure the registered site's hostname matches the site address.
- Connection timeout: check your host/firewall permits outbound HTTPS to the endpoint.
- No accepted report: look at Recent activity; HTML login pages, redirects, and
  malformed replies are failures, not successful deliveries.
- Overdue schedule: check site traffic and the host's WordPress cron processing.
- UNKNOWN health: cached update information or a support/backup signal is unavailable.

## Development

Tests and packaging live in the adjacent tests folder, outside the installable ZIP.
See wordpress-plugin/TESTING.md in the source repository for test commands,
scope, and remaining compatibility limitations.
