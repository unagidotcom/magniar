import assert from 'node:assert/strict';
import { renderWebsiteAlertEmail } from '../supabase/functions/check-websites/email.ts';
import type { WebsiteAlertNotification } from '../supabase/functions/check-websites/email.ts';

const baseNotification: WebsiteAlertNotification = {
  id: '6daf5f0e-019f-4a29-9236-0177a6b66d31',
  website_id: '8b295428-25c8-44cd-9164-df4f66ca6aa7',
  website_name: 'Client Store',
  website_url: 'https://client.example',
  client_business_name: 'Example Client',
  event_type: 'OUTAGE',
  monitor_status: 'DOWN',
  incident_started_at: '2026-09-13T10:00:00.000Z',
  recipient_email: 'magniarventures@gmail.com',
  http_status_code: null,
  response_time_ms: null,
  error_message: 'Request timed out',
  attempt_count: 1,
  created_at: '2026-09-13T10:30:00.000Z',
};

const outageEmail = renderWebsiteAlertEmail(baseNotification);
assert.match(outageEmail.subject, /Client Store is down/);
assert.match(outageEmail.text, /Two consecutive checks failed/);
assert.match(outageEmail.text, /magniar/i);
assert.match(outageEmail.html, /Example Client/);

const recoveryEmail = renderWebsiteAlertEmail({
  ...baseNotification,
  event_type: 'RECOVERY',
  monitor_status: 'ONLINE',
  http_status_code: 200,
  response_time_ms: 243,
  error_message: null,
});
assert.match(recoveryEmail.subject, /Recovery/);
assert.match(recoveryEmail.subject, /back online/);
assert.match(recoveryEmail.text, /responded successfully/);

const escapedEmail = renderWebsiteAlertEmail({
  ...baseNotification,
  website_name: '<script>alert(1)</script>',
});
assert.doesNotMatch(escapedEmail.html, /<script>/);
assert.match(escapedEmail.html, /&lt;script&gt;/);

console.log('Website alert email rules passed.');
