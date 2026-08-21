import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Client } from '../types/clients';
import { BusinessSettings, defaultBusinessSettings } from './businessSettingsService';

export type InvoiceStatus = 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE' | 'VOID' | 'ARCHIVED';

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unit_amount_cents: number;
  service_period?: string;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  client_id?: string | null;
  client_name: string;
  client_email?: string | null;
  status: InvoiceStatus;
  issue_date: string;
  due_date: string;
  currency: string;
  subtotal_cents: number;
  tax_cents: number;
  total_cents: number;
  service_summary: string;
  line_items: InvoiceLineItem[];
  notes?: string | null;
  sent_at?: string | null;
  downloaded_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateInvoiceInput {
  client: Client;
  serviceSummary: string;
  amountCents: number;
  dueDate: string;
  notes?: string;
  currency?: string;
  servicePeriod?: string;
}

export interface UpdateInvoiceInput {
  client?: Client;
  serviceSummary: string;
  amountCents: number;
  dueDate: string;
  notes?: string;
  status: InvoiceStatus;
  currency?: string;
  servicePeriod?: string;
}

const requireSupabase = () => {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }
  return supabase;
};

const primaryEmailForClient = (client: Client) =>
  client.contacts.find((contact) => contact.is_primary)?.email || client.contacts[0]?.email || null;

export async function listInvoices(): Promise<Invoice[]> {
  const db = requireSupabase();
  const { data, error } = await db
    .from('invoices')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data || []) as Invoice[];
}

export async function createInvoice(input: CreateInvoiceInput): Promise<Invoice> {
  if (!input.serviceSummary.trim()) {
    throw new Error('Invoice service summary is required.');
  }

  if (!Number.isFinite(input.amountCents) || input.amountCents <= 0) {
    throw new Error('Invoice amount must be greater than zero.');
  }

  const lineItems: InvoiceLineItem[] = [
    {
      description: input.serviceSummary.trim(),
      quantity: 1,
      unit_amount_cents: Math.round(input.amountCents),
      service_period: input.servicePeriod?.trim() || '',
    },
  ];

  const db = requireSupabase();
  const { data, error } = await db
    .from('invoices')
    .insert({
      client_id: input.client.id,
      client_name: input.client.business_name,
      client_email: primaryEmailForClient(input.client),
      due_date: input.dueDate,
      currency: input.currency || 'USD',
      subtotal_cents: Math.round(input.amountCents),
      service_summary: input.serviceSummary.trim(),
      line_items: lineItems,
      notes: input.notes?.trim() || null,
    })
    .select('*')
    .single();

  if (error) throw error;
  return data as Invoice;
}

export async function updateInvoiceStatus(
  invoiceId: string,
  status: InvoiceStatus
): Promise<Invoice> {
  const db = requireSupabase();
  const patch: Record<string, unknown> = { status };

  if (status === 'SENT') {
    patch.sent_at = new Date().toISOString();
  }

  if (status === 'DRAFT') {
    patch.sent_at = null;
  }

  const { data, error } = await db
    .from('invoices')
    .update(patch)
    .eq('id', invoiceId)
    .select('*')
    .single();

  if (error) throw error;
  return data as Invoice;
}

export async function updateInvoice(
  invoiceId: string,
  input: UpdateInvoiceInput
): Promise<Invoice> {
  if (!input.serviceSummary.trim()) {
    throw new Error('Invoice service summary is required.');
  }

  if (!Number.isFinite(input.amountCents) || input.amountCents <= 0) {
    throw new Error('Invoice amount must be greater than zero.');
  }

  const lineItems: InvoiceLineItem[] = [
    {
      description: input.serviceSummary.trim(),
      quantity: 1,
      unit_amount_cents: Math.round(input.amountCents),
      service_period: input.servicePeriod?.trim() || '',
    },
  ];

  const patch: Record<string, unknown> = {
    due_date: input.dueDate,
    currency: input.currency || 'USD',
    subtotal_cents: Math.round(input.amountCents),
    service_summary: input.serviceSummary.trim(),
    line_items: lineItems,
    notes: input.notes?.trim() || null,
    status: input.status,
  };

  if (input.client) {
    patch.client_id = input.client.id;
    patch.client_name = input.client.business_name;
    patch.client_email = primaryEmailForClient(input.client);
  }

  if (input.status === 'SENT') {
    patch.sent_at = new Date().toISOString();
  }

  if (input.status === 'DRAFT') {
    patch.sent_at = null;
  }

  const db = requireSupabase();
  const { data, error } = await db
    .from('invoices')
    .update(patch)
    .eq('id', invoiceId)
    .select('*')
    .single();

  if (error) throw error;
  return data as Invoice;
}

export async function deleteInvoice(invoiceId: string): Promise<void> {
  const db = requireSupabase();
  const { error } = await db
    .from('invoices')
    .delete()
    .eq('id', invoiceId);

  if (error) throw error;
}

export async function markInvoiceDownloaded(invoiceId: string): Promise<void> {
  const db = requireSupabase();
  const { error } = await db
    .from('invoices')
    .update({ downloaded_at: new Date().toISOString() })
    .eq('id', invoiceId);

  if (error) throw error;
}

const formatMoney = (cents: number, currency: string) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD',
  }).format((cents || 0) / 100);

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const formatTextBlock = (value?: string | null) =>
  escapeHtml(value || '').replace(/\r?\n/g, '<br />');

const currencyLabels: Record<string, { singular: string; plural: string }> = {
  INR: { singular: 'Rupee', plural: 'Rupees' },
  USD: { singular: 'Dollar', plural: 'Dollars' },
  EUR: { singular: 'Euro', plural: 'Euros' },
  GBP: { singular: 'Pound', plural: 'Pounds' },
  AED: { singular: 'Dirham', plural: 'Dirhams' },
};

const numberWordsUnderThousand = (num: number): string => {
  const ones = [
    '',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen',
  ];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  if (num < 20) return ones[num];
  if (num < 100) return `${tens[Math.floor(num / 10)]} ${ones[num % 10]}`.trim();
  return `${ones[Math.floor(num / 100)]} Hundred ${numberWordsUnderThousand(num % 100)}`.trim();
};

const numberToWords = (num: number): string => {
  if (num === 0) return 'Zero';
  const units = [
    { value: 10000000, label: 'Crore' },
    { value: 100000, label: 'Lakh' },
    { value: 1000, label: 'Thousand' },
    { value: 1, label: '' },
  ];
  let remaining = num;
  const parts: string[] = [];

  units.forEach((unit) => {
    const count = Math.floor(remaining / unit.value);
    if (count > 0) {
      parts.push(`${numberWordsUnderThousand(count)} ${unit.label}`.trim());
      remaining %= unit.value;
    }
  });

  return parts.join(' ');
};

const amountInWords = (cents: number, currency: string) => {
  const wholeAmount = Math.round((cents || 0) / 100);
  const normalizedCurrency = (currency || 'USD').toUpperCase();
  const label = currencyLabels[normalizedCurrency] || {
    singular: normalizedCurrency,
    plural: normalizedCurrency,
  };
  return `${label.plural} ${numberToWords(wholeAmount)} Only.`;
};

const compactLines = (lines: Array<string | null | undefined>) =>
  lines.map((line) => line?.trim()).filter(Boolean) as string[];

export function buildInvoiceTemplate(
  invoice: Invoice,
  businessSettings: BusinessSettings = defaultBusinessSettings
): string {
  const rows = invoice.line_items
    .map(
      (item) => `
        <tr>
          <td>${escapeHtml(item.description)}</td>
          <td>${escapeHtml(item.service_period || 'Current service period')}</td>
          <td>${formatMoney(item.quantity * item.unit_amount_cents, invoice.currency)}</td>
        </tr>`
    )
    .join('');
  const businessName =
    businessSettings.legal_name.trim() ||
    businessSettings.display_name.trim() ||
    'Magniar';
  const businessContact = compactLines([
    businessSettings.email,
    businessSettings.phone,
    businessSettings.website,
  ]);
  const businessAddress = compactLines([
    businessSettings.address_line_1,
    businessSettings.address_line_2,
    compactLines([businessSettings.city, businessSettings.region, businessSettings.postal_code]).join(', '),
    businessSettings.country,
  ]);
  const taxLine =
    businessSettings.tax_id_label && businessSettings.tax_id_value
      ? `${businessSettings.tax_id_label}: ${businessSettings.tax_id_value}`
      : '';
  const servicePeriod = invoice.line_items[0]?.service_period || 'Current service period';
  const issuedDate = new Date(invoice.issue_date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const dueDate = new Date(invoice.due_date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(invoice.invoice_number)}</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: Arial, Helvetica, sans-serif; color: #172033; margin: 0; background: #ffffff; }
    .page { max-width: 980px; margin: 0 auto; padding: 56px 56px 96px; min-height: 1320px; }
    header { display: grid; grid-template-columns: 1fr 360px; gap: 48px; padding-bottom: 34px; border-bottom: 2px solid #e2e8f0; }
    h1 { font-size: 34px; line-height: 1; letter-spacing: -0.02em; margin: 0 0 14px; color: #1f2a44; }
    .subtitle { color: #6b7280; text-transform: uppercase; letter-spacing: 0.08em; font-size: 15px; }
    .invoice-title { font-size: 42px; font-weight: 800; letter-spacing: 0.02em; text-align: right; color: #111827; margin-bottom: 20px; }
    .invoice-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 22px; font-size: 14px; }
    .invoice-meta dt { color: #64748b; text-align: right; margin: 0; }
    .invoice-meta dd { color: #111827; font-weight: 700; margin: 0; text-align: right; }
    .party-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; margin-top: 22px; }
    .label { color: #64748b; text-transform: uppercase; letter-spacing: 0.12em; font-size: 13px; font-weight: 800; margin-bottom: 10px; }
    .party strong { display: block; font-size: 18px; color: #111827; margin-bottom: 8px; }
    .muted { color: #475569; font-size: 15px; line-height: 1.45; }
    .line { margin-top: 2px; }
    table { border-collapse: collapse; width: 100%; margin-top: 26px; table-layout: fixed; }
    thead { background: #1f2a3d; color: #ffffff; }
    th { font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; padding: 13px 14px; text-align: left; }
    th:nth-child(2), td:nth-child(2) { width: 210px; text-align: center; }
    th:nth-child(3), td:nth-child(3) { width: 160px; text-align: right; }
    td { padding: 16px 14px; border-bottom: 2px solid #e2e8f0; color: #334155; font-size: 15px; line-height: 1.4; vertical-align: top; }
    .totals { width: 420px; margin: 20px 0 0 auto; font-size: 15px; }
    .totals-row { display: grid; grid-template-columns: 1fr 160px; gap: 24px; padding: 7px 12px; }
    .totals-row span:first-child { color: #64748b; text-align: right; }
    .totals-row span:last-child { color: #111827; font-weight: 700; text-align: right; }
    .totals-row.due { border-top: 2px solid #1f2937; padding-top: 13px; font-size: 16px; }
    .amount-words { margin-top: 24px; border: 1px solid #d9e1ec; background: #f8fafc; border-radius: 4px; padding: 11px 14px; }
    .amount-words .label { margin-bottom: 4px; }
    .amount-words strong { color: #111827; }
    .bottom-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 18px; }
    .info-box { background: #f8fafc; border-left: 4px solid #2563eb; padding: 14px 16px; min-height: 104px; }
    .info-box.terms { border-left-color: #64748b; }
    .info-box h2 { font-size: 15px; letter-spacing: 0.08em; text-transform: uppercase; margin: 0 0 10px; color: #1f2937; }
    .info-box p { margin: 0; color: #475569; line-height: 1.5; font-size: 14px; }
    .signature { margin-top: 78px; text-align: right; font-size: 14px; color: #64748b; }
    .signature strong { display: block; color: #111827; font-size: 15px; margin-bottom: 4px; }
    @media print { .page { padding: 48px 54px 80px; } }
  </style>
</head>
<body>
  <main class="page">
    <header>
      <div>
        <h1>${escapeHtml(businessSettings.display_name || businessName)}</h1>
        <div class="subtitle">${escapeHtml(businessSettings.legal_name ? 'Proprietary Enterprise' : 'Invoice Issuer')}</div>
      </div>
      <div>
        <div class="invoice-title">INVOICE</div>
        <dl class="invoice-meta">
          <dt>Invoice No:</dt><dd>${escapeHtml(invoice.invoice_number)}</dd>
          <dt>Invoice Date:</dt><dd>${escapeHtml(issuedDate)}</dd>
          <dt>Service Period:</dt><dd>${escapeHtml(servicePeriod)}</dd>
          <dt>Payment Terms:</dt><dd>${escapeHtml(invoice.status === 'PAID' ? 'Paid' : 'Due on receipt')}</dd>
        </dl>
      </div>
    </header>

    <section class="party-grid">
      <div class="party">
        <div class="label">From</div>
        <strong>${escapeHtml(businessName)}</strong>
        ${businessAddress.map((line) => `<div class="muted line">${escapeHtml(line)}</div>`).join('')}
        ${businessContact.map((line) => `<div class="muted line">${escapeHtml(line)}</div>`).join('')}
        ${taxLine ? `<div class="muted line">${escapeHtml(taxLine)}</div>` : ''}
      </div>
      <div class="party">
        <div class="label">Bill To</div>
        <strong>${escapeHtml(invoice.client_name)}</strong>
        ${invoice.client_email ? `<div class="muted line"><strong style="display:inline;font-size:15px;">Email:</strong> ${escapeHtml(invoice.client_email)}</div>` : ''}
      </div>
    </section>

    <table>
      <thead>
        <tr><th>Description</th><th>Service Period</th><th>Amount</th></tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <section class="totals">
      <div class="totals-row"><span>Subtotal:</span><span>${formatMoney(invoice.subtotal_cents, invoice.currency)}</span></div>
      <div class="totals-row"><span>Tax:</span><span>${invoice.tax_cents > 0 ? formatMoney(invoice.tax_cents, invoice.currency) : 'Not charged'}</span></div>
      <div class="totals-row due"><span>Total Amount Due:</span><span>${formatMoney(invoice.total_cents, invoice.currency)}</span></div>
    </section>

    <section class="amount-words">
      <div class="label">Amount In Words</div>
      <strong>${escapeHtml(amountInWords(invoice.total_cents, invoice.currency))}</strong>
    </section>

    <section class="bottom-grid">
      <div class="info-box">
        <h2>Payment Details</h2>
        <p>${businessSettings.payment_instructions ? formatTextBlock(businessSettings.payment_instructions) : 'Payment details can be added from Admin OS System Settings.'}</p>
      </div>
      <div class="info-box terms">
        <h2>Notes & Terms</h2>
        <p>${invoice.notes ? formatTextBlock(invoice.notes) : formatTextBlock(businessSettings.invoice_footer || 'Payment is due upon receipt.')}</p>
      </div>
    </section>

    <section class="signature">
      <strong>For ${escapeHtml(businessSettings.display_name || businessName)}</strong>
      Authorised Signatory
    </section>
  </main>
</body>
</html>`;
}

export async function downloadInvoiceTemplate(
  invoice: Invoice,
  businessSettings?: BusinessSettings
): Promise<void> {
  const html = buildInvoiceTemplate(invoice, businessSettings);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${invoice.invoice_number}.html`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  await markInvoiceDownloaded(invoice.id);
}
