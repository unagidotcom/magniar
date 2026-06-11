import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

interface ContactBody {
  name?: string;
  email?: string;
  website?: string;
  spend?: string;
  details?: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildLeadEmailHtml(
  name: string,
  email: string,
  website: string,
  spend: string,
  details: string
): string {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeWebsite = escapeHtml(website);
  const safeSpend = escapeHtml(spend);
  const safeDetails = escapeHtml(details);

  return `
    <h2>New growth inquiry — magniar.com</h2>
    <p><strong>Name:</strong> ${safeName}</p>
    <p><strong>Email:</strong> ${safeEmail}</p>
    <p><strong>Website:</strong> ${safeWebsite}</p>
    <p><strong>Monthly spend:</strong> ${safeSpend}</p>
    <p><strong>Details:</strong></p>
    <p>${safeDetails.replace(/\n/g, "<br>")}</p>
  `;
}

async function sendViaBrevoApi(params: {
  apiKey: string;
  senderName: string;
  senderEmail: string;
  notifyEmail: string;
  replyName: string;
  replyEmail: string;
  subject: string;
  htmlContent: string;
  listId: number | null;
  contactPayload?: {
    email: string;
    name: string;
    website: string;
    spend: string;
    details: string;
  };
}): Promise<void> {
  const emailRes = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": params.apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: params.senderName, email: params.senderEmail },
      to: [{ email: params.notifyEmail, name: "Magniar Leads" }],
      replyTo: { email: params.replyEmail, name: params.replyName },
      subject: params.subject,
      htmlContent: params.htmlContent,
    }),
  });

  if (!emailRes.ok) {
    const errText = await emailRes.text();
    console.error("Brevo API email error:", emailRes.status, errText);
    throw new Error("BREVO_API_SEND_FAILED");
  }

  if (params.listId && !Number.isNaN(params.listId) && params.contactPayload) {
    const contactRes = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": params.apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: params.contactPayload.email,
        attributes: {
          FIRSTNAME: params.contactPayload.name,
          WEBSITE: params.contactPayload.website,
          MONTHLY_SPEND: params.contactPayload.spend,
          MESSAGE: params.contactPayload.details,
        },
        listIds: [params.listId],
        updateEnabled: true,
      }),
    });

    if (!contactRes.ok && contactRes.status !== 400) {
      const errText = await contactRes.text();
      console.error("Brevo contact error:", contactRes.status, errText);
    }
  }
}

async function sendViaBrevoSmtp(params: {
  senderName: string;
  senderEmail: string;
  notifyEmail: string;
  replyName: string;
  replyEmail: string;
  subject: string;
  htmlContent: string;
}): Promise<void> {
  const smtpUser = process.env.BREVO_SMTP_USER;
  const smtpPass = process.env.BREVO_SMTP_PASS;

  if (!smtpUser || !smtpPass) {
    throw new Error("BREVO_SMTP_NOT_CONFIGURED");
  }

  const transporter = nodemailer.createTransport({
    host: process.env.BREVO_SMTP_HOST || "smtp-relay.brevo.com",
    port: Number(process.env.BREVO_SMTP_PORT || 587),
    secure: false,
    auth: { user: smtpUser, pass: smtpPass },
  });

  await transporter.sendMail({
    from: `"${params.senderName}" <${params.senderEmail}>`,
    to: params.notifyEmail,
    replyTo: `"${params.replyName}" <${params.replyEmail}>`,
    subject: params.subject,
    html: params.htmlContent,
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const smtpConfigured =
    Boolean(process.env.BREVO_SMTP_USER) && Boolean(process.env.BREVO_SMTP_PASS);

  if (!apiKey && !smtpConfigured) {
    return res.status(503).json({
      error:
        "Contact form is not configured. Add BREVO_API_KEY or Brevo SMTP credentials in Vercel.",
    });
  }

  const body = (req.body ?? {}) as ContactBody;
  const name = body.name?.trim();
  const email = body.email?.trim().toLowerCase();
  const website = body.website?.trim() || "—";
  const spend = body.spend?.trim() || "—";
  const details = body.details?.trim() || "—";

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  const notifyEmail =
    process.env.BREVO_NOTIFY_EMAIL || "magniarventures@gmail.com";
  const senderEmail =
    process.env.BREVO_SENDER_EMAIL || "noreply@magniar.com";
  const senderName = process.env.BREVO_SENDER_NAME || "Magniar & Co. Website";
  const listId = process.env.BREVO_LIST_ID
    ? Number(process.env.BREVO_LIST_ID)
    : null;

  const subject = `New inquiry from ${name} — Magniar & Co.`;
  const htmlContent = buildLeadEmailHtml(name, email, website, spend, details);

  try {
    if (apiKey) {
      await sendViaBrevoApi({
        apiKey,
        senderName,
        senderEmail,
        notifyEmail,
        replyName: name,
        replyEmail: email,
        subject,
        htmlContent,
        listId,
        contactPayload: { email, name, website, spend, details },
      });
    } else {
      await sendViaBrevoSmtp({
        senderName,
        senderEmail,
        notifyEmail,
        replyName: name,
        replyEmail: email,
        subject,
        htmlContent,
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Contact handler error:", err);
    return res.status(502).json({
      error:
        "Could not send email. Verify Brevo sender domain and SMTP/API credentials.",
    });
  }
}
