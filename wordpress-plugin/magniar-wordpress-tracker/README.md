# Magniar WordPress Tracker

Production-oriented WordPress plugin for sending safe operational health reports to Magniar Admin OS.

## What It Collects

- WordPress version and whether a core update is available
- PHP version and basic support flag
- Active theme name/version and theme update count
- Plugin totals and plugin update count
- SSL/admin SSL flags
- Search engine visibility flag
- Optional backup signal placeholders

It does not collect visitors, users, customers, orders, posts, database credentials, environment variables, salts, API keys, cookies, paths, or server configuration dumps.

## Setup

1. In Magniar Admin OS, open a website detail page.
2. Generate a WordPress tracker key.
3. Copy the tracker endpoint, website ID, and tracker key shown in Admin OS.
4. In WordPress, install this folder as a plugin.
5. Go to Settings > Magniar Tracker.
6. Paste the endpoint, website ID, and tracker key.
7. Enable the tracker.
8. Save settings.
9. Send a test report.

## Runtime Behavior

- Sends reports only from admin test action or the plugin-owned daily WordPress cron event.
- Does not load frontend assets.
- Uses one transient lock to prevent overlapping reports.
- Stores a small redacted log in a non-autoloaded option.
- Removes only the plugin-owned scheduled event and lock on deactivation.

## Minimum Requirements

- WordPress 6.0+
- PHP 7.4+
- HTTPS endpoint from Magniar Admin OS
