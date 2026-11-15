=== Magniar WordPress Tracker ===
Requires at least: 6.0
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Consent-based daily WordPress health reports to Magniar Admin OS.

== Description ==
Connect a website using its Magniar website ID and tracker key. Reports include
software versions, cached update counts, HTTPS configuration, and search visibility.
No visitor, customer, order, or user data is collected. No remote code or repairs.

This plugin sends authenticated HTTPS reports to the configured Magniar Supabase
endpoint only after an administrator enables reporting. See README.md for the
complete data inventory, storage, retention, hosting requirements, and limitations.

== Installation ==
Upload the plugin ZIP through Plugins > Add New > Upload Plugin, activate, and
open Settings > Magniar Tracker. Enter the website ID and generated tracker key,
enable reporting, save, and send a test report. Confirm it in Magniar Admin OS.

== Changelog ==
= 1.0.0 =
Installable reporter with explicit consent, connection status, bounded diagnostics,
strict HTTPS transport, atomic locking, protected admin controls, and safe cleanup.
