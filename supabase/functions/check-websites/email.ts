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

const visualStateFor = (notification: WebsiteAlertNotification) => {
  if (notification.event_type === 'RECOVERY') {
    return {
      accent: '#22D38B',
      accentSoft: '#0D2A22',
      label: 'SERVICE RESTORED',
      signal: 'RECOVERY CONFIRMED',
    };
  }

  if (notification.event_type === 'REMINDER') {
    return {
      accent: '#FFB020',
      accentSoft: '#2B210C',
      label: 'INCIDENT ACTIVE',
      signal: '24 HOUR REMINDER',
    };
  }

  return {
    accent: '#FF526D',
    accentSoft: '#2A1017',
    label: notification.monitor_status === 'DOWN' ? 'SERVICE DOWN' : 'SERVICE ERROR',
    signal: 'ACTION REQUIRED',
  };
};

const safeLinkUrl = (value: string) => {
  try {
    const parsed = new URL(value);
    return ['http:', 'https:'].includes(parsed.protocol) ? parsed.href : 'https://magniar.com';
  } catch {
    return 'https://magniar.com';
  }
};

export const renderWebsiteAlertEmail = (
  notification: WebsiteAlertNotification
): RenderedAlertEmail => {
  const title = titleFor(notification);
  const clientName = notification.client_business_name || 'Unassigned client';
  const detectedAt = displayTimestamp(notification.created_at);
  const incidentStartedAt = displayTimestamp(notification.incident_started_at);
  const incidentReference = `MON-${notification.id.slice(0, 8).toUpperCase()}`;
  const visualState = visualStateFor(notification);
  const websiteUrl = safeLinkUrl(notification.website_url);
  const adminUrl = `https://magniar.com/admin/websites/${encodeURIComponent(notification.website_id)}`;
  const statusLine = notification.event_type === 'RECOVERY'
    ? 'The website responded successfully and has returned to normal operation.'
    : notification.event_type === 'REMINDER'
      ? 'The incident remains active. Review the website and hosting environment.'
      : 'Two consecutive availability checks failed. The incident is now confirmed.';
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
  const httpStatus = notification.http_status_code === null
    ? 'NO RESPONSE'
    : String(notification.http_status_code);
  const responseTime = notification.response_time_ms === null
    ? 'NOT AVAILABLE'
    : `${notification.response_time_ms} MS`;
  const errorMessage = notification.error_message || (
    notification.event_type === 'RECOVERY'
      ? 'The latest HTTPS check completed successfully.'
      : 'No additional error detail was returned.'
  );

  const metricCell = (label: string, value: string, border = true) =>
    `<td class="metric-cell" width="33.33%" valign="top" style="padding:15px 16px;${border ? 'border-right:1px solid #202A36;' : ''}"><div style="font-family:Arial,sans-serif;font-size:9px;line-height:14px;letter-spacing:1.2px;color:#6F7C8A;font-weight:700">${escapeHtml(label)}</div><div style="margin-top:5px;font-family:'Courier New',monospace;font-size:13px;line-height:18px;color:#F4F7FB;font-weight:700">${escapeHtml(value)}</div></td>`;

  return {
    subject: `[Magniar ${subjectPrefixFor(notification.event_type)}] ${title}`,
    text: `MAGNIAR // WEBSITE MONITORING\n${visualState.label}\n\n${title}\n${statusLine}\n\nINCIDENT ${incidentReference}\n${details.join('\n')}\n\nOpen Admin OS: ${adminUrl}\n\nAutomated by Magniar Operations`,
    html: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>${escapeHtml(title)}</title>
  <style>
    @media only screen and (max-width: 620px) {
      .email-shell { width: 100% !important; }
      .email-pad { padding-left: 20px !important; padding-right: 20px !important; }
      .metric-cell { display: block !important; width: auto !important; border-right: 0 !important; border-bottom: 1px solid #202A36 !important; }
      .metric-cell:last-child { border-bottom: 0 !important; }
      .stack-cell { display: block !important; width: auto !important; }
      .action-button { display: block !important; text-align: center !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#05070A;color:#F4F7FB;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(visualState.label)}: ${escapeHtml(notification.website_name)}. ${escapeHtml(statusLine)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#05070A;">
    <tr>
      <td align="center" style="padding:36px 14px;">
        <table role="presentation" class="email-shell" width="620" cellspacing="0" cellpadding="0" border="0" style="width:620px;max-width:620px;border-collapse:separate;background:#0B0F14;border:1px solid #202A36;border-top:3px solid ${visualState.accent};">
          <tr>
            <td class="email-pad" style="padding:22px 28px;border-bottom:1px solid #202A36;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td class="stack-cell" valign="middle">
                    <div style="font-size:16px;line-height:20px;font-weight:800;letter-spacing:1.8px;color:#FFFFFF;">MAGNIAR<span style="color:#1683FF;">.</span></div>
                    <div style="margin-top:4px;font-family:'Courier New',monospace;font-size:9px;line-height:13px;letter-spacing:1.2px;color:#6F7C8A;">OPERATIONS / WEBSITE MONITOR</div>
                  </td>
                  <td class="stack-cell" align="right" valign="middle" style="padding-top:2px;">
                    <span style="display:inline-block;padding:7px 10px;background:${visualState.accentSoft};border:1px solid ${visualState.accent};font-family:'Courier New',monospace;font-size:9px;line-height:12px;letter-spacing:1px;color:${visualState.accent};font-weight:700;">${escapeHtml(visualState.signal)}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="email-pad" style="padding:30px 28px 26px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td width="16" valign="top" style="padding-top:3px;"><span style="display:block;width:9px;height:9px;background:${visualState.accent};box-shadow:0 0 16px ${visualState.accent};"></span></td>
                  <td valign="top">
                    <div style="font-family:'Courier New',monospace;font-size:10px;line-height:14px;letter-spacing:1.3px;color:${visualState.accent};font-weight:700;">${escapeHtml(visualState.label)}</div>
                    <h1 style="margin:10px 0 0;font-size:25px;line-height:32px;letter-spacing:0;color:#FFFFFF;font-weight:700;">${escapeHtml(title)}</h1>
                    <p style="margin:12px 0 0;font-size:14px;line-height:22px;color:#A7B1BD;">${escapeHtml(statusLine)}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="email-pad" style="padding:0 28px 24px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#0E141B;border:1px solid #202A36;">
                <tr>
                  ${metricCell('MONITOR STATE', notification.monitor_status)}
                  ${metricCell('HTTP SIGNAL', httpStatus)}
                  ${metricCell('RESPONSE', responseTime, false)}
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="email-pad" style="padding:0 28px 24px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding:11px 0;border-bottom:1px solid #1B2530;width:35%;font-size:11px;line-height:17px;letter-spacing:.8px;color:#6F7C8A;font-weight:700;">CLIENT</td>
                  <td align="right" style="padding:11px 0;border-bottom:1px solid #1B2530;font-size:13px;line-height:19px;color:#F4F7FB;font-weight:700;">${escapeHtml(clientName)}</td>
                </tr>
                <tr>
                  <td style="padding:11px 0;border-bottom:1px solid #1B2530;font-size:11px;line-height:17px;letter-spacing:.8px;color:#6F7C8A;font-weight:700;">WEBSITE</td>
                  <td align="right" style="padding:11px 0;border-bottom:1px solid #1B2530;font-size:13px;line-height:19px;color:#F4F7FB;font-weight:700;">${escapeHtml(notification.website_name)}</td>
                </tr>
                <tr>
                  <td style="padding:11px 0;border-bottom:1px solid #1B2530;font-size:11px;line-height:17px;letter-spacing:.8px;color:#6F7C8A;font-weight:700;">TARGET</td>
                  <td align="right" style="padding:11px 0;border-bottom:1px solid #1B2530;font-family:'Courier New',monospace;font-size:11px;line-height:17px;"><a href="${escapeHtml(websiteUrl)}" style="color:#55A9FF;text-decoration:none;word-break:break-all;">${escapeHtml(notification.website_url)}</a></td>
                </tr>
                <tr>
                  <td style="padding:11px 0;border-bottom:1px solid #1B2530;font-size:11px;line-height:17px;letter-spacing:.8px;color:#6F7C8A;font-weight:700;">INCIDENT START</td>
                  <td align="right" style="padding:11px 0;border-bottom:1px solid #1B2530;font-family:'Courier New',monospace;font-size:11px;line-height:17px;color:#D7DEE7;">${escapeHtml(incidentStartedAt)}</td>
                </tr>
                <tr>
                  <td style="padding:11px 0;font-size:11px;line-height:17px;letter-spacing:.8px;color:#6F7C8A;font-weight:700;">REFERENCE</td>
                  <td align="right" style="padding:11px 0;font-family:'Courier New',monospace;font-size:11px;line-height:17px;color:#D7DEE7;">${escapeHtml(incidentReference)}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="email-pad" style="padding:0 28px 26px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:${visualState.accentSoft};border-left:3px solid ${visualState.accent};">
                <tr>
                  <td style="padding:14px 16px;">
                    <div style="font-family:'Courier New',monospace;font-size:9px;line-height:13px;letter-spacing:1.1px;color:${visualState.accent};font-weight:700;">LATEST SIGNAL</div>
                    <div style="margin-top:5px;font-family:'Courier New',monospace;font-size:12px;line-height:19px;color:#E3E9F0;word-break:break-word;">${escapeHtml(errorMessage)}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="email-pad" style="padding:0 28px 30px;">
              <a class="action-button" href="${escapeHtml(adminUrl)}" style="display:inline-block;padding:12px 18px;background:#1683FF;border:1px solid #45A0FF;color:#FFFFFF;font-size:12px;line-height:16px;font-weight:700;text-decoration:none;">OPEN WEBSITE IN ADMIN OS&nbsp;&nbsp;&rarr;</a>
            </td>
          </tr>
          <tr>
            <td class="email-pad" style="padding:17px 28px;background:#080C11;border-top:1px solid #202A36;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td class="stack-cell" style="font-family:'Courier New',monospace;font-size:9px;line-height:14px;letter-spacing:.8px;color:#617080;">AUTOMATED BY MAGNIAR OPERATIONS</td>
                  <td class="stack-cell" align="right" style="font-family:'Courier New',monospace;font-size:9px;line-height:14px;color:#617080;">30 MIN WATCH&nbsp;&nbsp;/&nbsp;&nbsp;${escapeHtml(detectedAt)}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
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
