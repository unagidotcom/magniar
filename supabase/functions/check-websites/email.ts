export type WebsiteAlertNotification = {
  id: string;
  website_id: string;
  website_name: string;
  website_url: string;
  client_business_name: string | null;
  event_type: 'OUTAGE' | 'REMINDER' | 'RECOVERY';
  monitor_status: 'ONLINE' | 'DOWN' | 'ERROR';
  incident_started_at: string;
  recipient_email: string;
  http_status_code: number | null;
  response_time_ms: number | null;
  error_message: string | null;
  attempt_count: number;
  created_at: string;
};

export type RenderedAlertEmail = {
  subject: string;
  text: string;
  html: string;
};

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const displayTimestamp = (value: string) => {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toISOString().replace('T', ' ').replace('.000Z', ' UTC');
};

const titleFor = (notification: WebsiteAlertNotification) => {
  if (notification.event_type === 'RECOVERY') return `${notification.website_name} is back online`;
  if (notification.event_type === 'REMINDER') return `${notification.website_name} is still unavailable`;
  return notification.monitor_status === 'DOWN'
    ? `${notification.website_name} is down`
    : `${notification.website_name} returned an error`;
};

const subjectPrefixFor = (eventType: WebsiteAlertNotification['event_type']) => {
  if (eventType === 'RECOVERY') return 'Recovery';
  if (eventType === 'REMINDER') return 'Reminder';
  return 'Alert';
};

export const renderWebsiteAlertEmail = (
  notification: WebsiteAlertNotification
): RenderedAlertEmail => {
  const title = titleFor(notification);
  const clientName = notification.client_business_name || 'Unassigned client';
  const detectedAt = displayTimestamp(notification.created_at);
  const incidentStartedAt = displayTimestamp(notification.incident_started_at);
  const statusLine = notification.event_type === 'RECOVERY'
    ? 'The website responded successfully after a confirmed monitoring incident.'
    : notification.event_type === 'REMINDER'
      ? 'The monitoring incident is still active.'
      : 'Two consecutive checks failed, so this incident has been confirmed.';
  const details = [
    `Website: ${notification.website_name}`,
    `Client: ${clientName}`,
    `URL: ${notification.website_url}`,
    `Status: ${notification.monitor_status}`,
    `Incident started: ${incidentStartedAt}`,
    `Notification created: ${detectedAt}`,
    notification.http_status_code ? `HTTP status: ${notification.http_status_code}` : null,
    notification.response_time_ms !== null ? `Response time: ${notification.response_time_ms} ms` : null,
    notification.error_message ? `Error: ${notification.error_message}` : null,
  ].filter(Boolean) as string[];

  const detailRows = details
    .map((detail) => {
      const separator = detail.indexOf(':');
      const label = separator >= 0 ? detail.slice(0, separator) : detail;
      const value = separator >= 0 ? detail.slice(separator + 1).trim() : '';
      return `<tr><td style="padding:7px 12px;color:#68717c;font-size:13px;vertical-align:top">${escapeHtml(label)}</td><td style="padding:7px 12px;color:#111827;font-size:13px;font-weight:600">${escapeHtml(value)}</td></tr>`;
    })
    .join('');

  return {
    subject: `[Magniar ${subjectPrefixFor(notification.event_type)}] ${title}`,
    text: `${title}\n\n${statusLine}\n\n${details.join('\n')}\n\nMagniar Website Monitoring`,
    html: `<!doctype html><html><body style="margin:0;background:#f5f7fa;font-family:Arial,sans-serif;color:#111827"><div style="max-width:640px;margin:0 auto;padding:32px 16px"><div style="background:#ffffff;border:1px solid #d9dee5;border-radius:8px;overflow:hidden"><div style="padding:22px 24px;background:#0b0d0f;color:#ffffff"><div style="font-size:12px;letter-spacing:1.4px;text-transform:uppercase;color:#64b5ff">Magniar Website Monitoring</div><h1 style="margin:10px 0 0;font-size:22px;line-height:1.3">${escapeHtml(title)}</h1></div><div style="padding:24px"><p style="margin:0 0 18px;color:#4b5563;font-size:14px;line-height:1.6">${escapeHtml(statusLine)}</p><table style="width:100%;border-collapse:collapse;background:#f8fafc;border:1px solid #e5e7eb">${detailRows}</table><p style="margin:20px 0 0;font-size:12px;color:#68717c">Open Magniar Admin OS for the latest monitoring history and diagnostics.</p></div></div></div></body></html>`,
  };
};

export const sendWebsiteAlertEmail = async (
  notification: WebsiteAlertNotification,
  config: { apiKey: string; fromEmail: string }
) => {
  const email = renderWebsiteAlertEmail(notification);
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': `magniar-monitor-${notification.id}`,
    },
    body: JSON.stringify({
      from: config.fromEmail,
      to: [notification.recipient_email],
      subject: email.subject,
      text: email.text,
      html: email.html,
    }),
  });

  let responseBody: { id?: string; message?: string; name?: string } = {};
  try {
    responseBody = await response.json();
  } catch {
    responseBody = {};
  }

  if (!response.ok || !responseBody.id) {
    throw new Error(responseBody.message || responseBody.name || `Email provider returned HTTP ${response.status}`);
  }

  return responseBody.id;
};
