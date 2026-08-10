export interface MockRequest {
  id: string;
  code: string;
  created_at: string;
  client_name: string;
  company: string;
  email: string;
  phone?: string;
  subject: string;
  budget_tier: string;
  status: 'NEW' | 'REVIEWING' | 'QUALIFIED' | 'DISCOVERY' | 'NOT_A_FIT' | 'ARCHIVED';
  source: string;
  summary: string;
  industry: string;
}

export interface MockProspect {
  id: string;
  company: string;
  contact_name: string;
  email: string;
  qualified_at: string;
  status: 'QUALIFIED' | 'DISCOVERY' | 'PROPOSAL_SENT' | 'WON' | 'LOST';
  estimated_acv: string;
  assigned_strategist: string;
  target_launch: string;
}

export interface MockClient {
  id: string;
  name: string;
  code: string;
  industry: string;
  active_projects_count: number;
  monthly_retainer: string;
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'ARCHIVED';
  portal_access_active: boolean;
  lead_partner: string;
  since_date: string;
}

export interface MockProject {
  id: string;
  client_name: string;
  name: string;
  pillar: 'PERFORMANCE' | 'COMMERCE' | 'MEDIA' | 'ENGINEERING';
  status: 'ACTIVE' | 'IN_REVIEW' | 'ON_TRACK' | 'AT_RISK' | 'COMPLETED';
  health_score: number;
  start_date: string;
  target_completion: string;
  lead_engineer: string;
}

export interface MockInvoice {
  id: string;
  code: string;
  client_name: string;
  amount: string;
  due_date: string;
  issued_date: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE' | 'DRAFT';
  service_summary: string;
}

export interface MockPayment {
  id: string;
  invoice_code: string;
  client_name: string;
  amount: string;
  method: 'ACH' | 'WIRE' | 'CREDIT_CARD';
  status: 'COMPLETED' | 'PROCESSING' | 'FAILED';
  date: string;
}

export interface MockNotification {
  id: string;
  type: 'REQUEST' | 'INVOICE' | 'PROJECT' | 'SECURITY';
  title: string;
  message: string;
  timestamp: string;
  is_read: boolean;
  route_target: string;
}

export interface MockAdminMetrics {
  active_clients: number;
  active_projects: number;
  open_requests: number;
  outstanding_invoices: string;
  monthly_mrr: string;
  quarterly_growth: string;
  is_demo_data: boolean;
}

export const ADMIN_DEMO_METRICS: MockAdminMetrics = {
  active_clients: 18,
  active_projects: 24,
  open_requests: 7,
  outstanding_invoices: '$84,500',
  monthly_mrr: '$215,000',
  quarterly_growth: '+28.4%',
  is_demo_data: true,
};

export const MOCK_REQUESTS: MockRequest[] = [
  {
    id: 'req-001',
    code: 'MG-REQ-2026-081',
    created_at: '2026-08-08 14:22',
    client_name: 'Alexander Vance',
    company: 'Solaris Apparel Group',
    email: 'alex.vance@solaris.com',
    phone: '+1 (555) 234-5678',
    subject: 'Meta + Shopify Scale Engagement',
    budget_tier: '$50,000 - $100,000 / mo',
    status: 'NEW',
    source: '/start-a-project Intake',
    summary: 'Scaling DTC acquisition spend from $40k to $150k monthly while maintaining 3.2x blended MER.',
    industry: 'E-commerce / Apparel',
  },
  {
    id: 'req-002',
    code: 'MG-REQ-2026-080',
    created_at: '2026-08-07 09:15',
    client_name: 'Elena Rostova',
    company: 'Aetheria Health Science',
    email: 'elena@aetheriahealth.io',
    phone: '+1 (555) 876-5432',
    subject: 'Headless Subscriptions Architecture',
    budget_tier: '$100,000+ / mo',
    status: 'REVIEWING',
    source: '/start-a-project Intake',
    summary: 'Re-building legacy WooCommerce portal on Shopify Plus with Custom React/Next.js checkout app.',
    industry: 'Health & Wellness',
  },
  {
    id: 'req-003',
    code: 'MG-REQ-2026-079',
    created_at: '2026-08-06 18:40',
    client_name: 'Marcus Brody',
    company: 'Apex Logistics Corp',
    email: 'm.brody@apexlogistics.com',
    subject: 'Enterprise B2B Demand Gen',
    budget_tier: '$25,000 - $50,000 / mo',
    status: 'QUALIFIED',
    source: 'Direct Partner Referral',
    summary: 'Multi-channel LinkedIn Ads and Google Search campaign targeting supply chain VPs.',
    industry: 'B2B Logistics & Tech',
  },
  {
    id: 'req-004',
    code: 'MG-REQ-2026-078',
    created_at: '2026-08-05 11:05',
    client_name: 'Sophia Chen',
    company: 'Lumina Home Living',
    email: 'sophia@luminahome.com',
    subject: 'Amazon DSP & Marketplace Growth',
    budget_tier: '$50,000 - $100,000 / mo',
    status: 'DISCOVERY',
    source: '/start-a-project Intake',
    summary: 'Expanding US catalog to Amazon EU & APAC with localized Amazon DSP retargeting.',
    industry: 'Consumer Goods',
  },
  {
    id: 'req-005',
    code: 'MG-REQ-2026-077',
    created_at: '2026-08-04 16:30',
    client_name: 'Derek Miller',
    company: 'Krono Watchworks',
    email: 'derek@kronowatches.com',
    subject: 'Creative Testing Engine',
    budget_tier: '$10,000 - $25,000 / mo',
    status: 'NOT_A_FIT',
    source: '/contact Form',
    summary: 'Requesting low-budget social ad edits without media spend commitment.',
    industry: 'Luxury Accessories',
  },
];

export const MOCK_PROSPECTS: MockProspect[] = [
  {
    id: 'pro-001',
    company: 'Apex Logistics Corp',
    contact_name: 'Marcus Brody',
    email: 'm.brody@apexlogistics.com',
    qualified_at: '2026-08-06',
    status: 'DISCOVERY',
    estimated_acv: '$360,000',
    assigned_strategist: 'Kaelen Voss',
    target_launch: '2026-09-15',
  },
  {
    id: 'pro-002',
    company: 'Lumina Home Living',
    contact_name: 'Sophia Chen',
    email: 'sophia@luminahome.com',
    qualified_at: '2026-08-05',
    status: 'PROPOSAL_SENT',
    estimated_acv: '$600,000',
    assigned_strategist: 'Devon Thorne',
    target_launch: '2026-09-01',
  },
  {
    id: 'pro-003',
    company: 'Vanguard Nutrition',
    contact_name: 'Liam O’Connor',
    email: 'liam@vanguardnutra.com',
    qualified_at: '2026-07-28',
    status: 'WON',
    estimated_acv: '$480,000',
    assigned_strategist: 'Kaelen Voss',
    target_launch: '2026-08-15',
  },
];

export const MOCK_CLIENTS: MockClient[] = [
  {
    id: 'cli-001',
    code: 'CLI-SOLARIS',
    name: 'Solaris Apparel Group',
    industry: 'Fashion & E-Commerce',
    active_projects_count: 3,
    monthly_retainer: '$45,000',
    status: 'ACTIVE',
    portal_access_active: true,
    lead_partner: 'Kaelen Voss',
    since_date: '2025-03-15',
  },
  {
    id: 'cli-002',
    code: 'CLI-VANGUARD',
    name: 'Vanguard Nutrition',
    industry: 'DTC Health & Supplement',
    active_projects_count: 2,
    monthly_retainer: '$35,000',
    status: 'ACTIVE',
    portal_access_active: true,
    lead_partner: 'Devon Thorne',
    since_date: '2025-08-01',
  },
  {
    id: 'cli-003',
    code: 'CLI-AURA',
    name: 'Aura Skincare Labs',
    industry: 'Beauty & Cosmetics',
    active_projects_count: 1,
    monthly_retainer: '$28,000',
    status: 'ACTIVE',
    portal_access_active: true,
    lead_partner: 'Aria Lin',
    since_date: '2024-11-10',
  },
  {
    id: 'cli-004',
    code: 'CLI-ZEPHYR',
    name: 'Zephyr Mobility Systems',
    industry: 'EV & Micromobility',
    active_projects_count: 0,
    monthly_retainer: '$0',
    status: 'PAUSED',
    portal_access_active: false,
    lead_partner: 'Kaelen Voss',
    since_date: '2024-05-20',
  },
];

export const MOCK_PROJECTS: MockProject[] = [
  {
    id: 'proj-001',
    client_name: 'Solaris Apparel Group',
    name: 'Q3 Meta & TikTok Scale System',
    pillar: 'PERFORMANCE',
    status: 'ON_TRACK',
    health_score: 96,
    start_date: '2026-07-01',
    target_completion: '2026-09-30',
    lead_engineer: 'Marc Andre',
  },
  {
    id: 'proj-002',
    client_name: 'Solaris Apparel Group',
    name: 'Shopify Plus Custom Cart Re-architecture',
    pillar: 'ENGINEERING',
    status: 'ACTIVE',
    health_score: 92,
    start_date: '2026-07-15',
    target_completion: '2026-08-31',
    lead_engineer: 'Zara Finch',
  },
  {
    id: 'proj-003',
    client_name: 'Vanguard Nutrition',
    name: 'Amazon SP-API Catalog & DSP Integration',
    pillar: 'COMMERCE',
    status: 'ON_TRACK',
    health_score: 98,
    start_date: '2026-08-01',
    target_completion: '2026-10-15',
    lead_engineer: 'Tyler Ramos',
  },
  {
    id: 'proj-004',
    client_name: 'Aura Skincare Labs',
    name: 'Omnichannel Attribution Engine',
    pillar: 'MEDIA',
    status: 'AT_RISK',
    health_score: 74,
    start_date: '2026-06-10',
    target_completion: '2026-08-25',
    lead_engineer: 'Marc Andre',
  },
];

export const MOCK_INVOICES: MockInvoice[] = [
  {
    id: 'inv-1001',
    code: 'INV-2026-0801',
    client_name: 'Solaris Apparel Group',
    amount: '$45,000.00',
    due_date: '2026-08-15',
    issued_date: '2026-08-01',
    status: 'PAID',
    service_summary: 'August Performance Media & Strategy Retainer',
  },
  {
    id: 'inv-1002',
    code: 'INV-2026-0802',
    client_name: 'Vanguard Nutrition',
    amount: '$35,000.00',
    due_date: '2026-08-20',
    issued_date: '2026-08-01',
    status: 'PENDING',
    service_summary: 'Onboarding & Q3 Strategy Activation',
  },
  {
    id: 'inv-1003',
    code: 'INV-2026-0715',
    client_name: 'Aura Skincare Labs',
    amount: '$28,000.00',
    due_date: '2026-07-31',
    issued_date: '2026-07-01',
    status: 'OVERDUE',
    service_summary: 'Attribution Engine Engineering Milestone 2',
  },
  {
    id: 'inv-1004',
    code: 'INV-2026-0803',
    client_name: 'Apex Logistics Corp',
    amount: '$15,000.00',
    due_date: '2026-09-01',
    issued_date: '2026-08-08',
    status: 'DRAFT',
    service_summary: 'Initial Discovery & Architecture Audit Fee',
  },
];

export const MOCK_PAYMENTS: MockPayment[] = [
  {
    id: 'pay-501',
    invoice_code: 'INV-2026-0801',
    client_name: 'Solaris Apparel Group',
    amount: '$45,000.00',
    method: 'WIRE',
    status: 'COMPLETED',
    date: '2026-08-03 11:20',
  },
  {
    id: 'pay-500',
    invoice_code: 'INV-2026-0701',
    client_name: 'Solaris Apparel Group',
    amount: '$45,000.00',
    method: 'ACH',
    status: 'COMPLETED',
    date: '2026-07-02 14:05',
  },
  {
    id: 'pay-499',
    invoice_code: 'INV-2026-0702',
    client_name: 'Aura Skincare Labs',
    amount: '$28,000.00',
    method: 'CREDIT_CARD',
    status: 'COMPLETED',
    date: '2026-07-05 09:40',
  },
];

export const MOCK_NOTIFICATIONS: MockNotification[] = [
  {
    id: 'notif-01',
    type: 'REQUEST',
    title: 'New Project Intake Received',
    message: 'Solaris Apparel Group submitted a new Meta + Shopify scale request (Budget: $50k-$100k).',
    timestamp: '10 mins ago',
    is_read: false,
    route_target: 'requests',
  },
  {
    id: 'notif-02',
    type: 'INVOICE',
    title: 'Invoice Payment Received',
    message: 'Solaris Apparel Group paid INV-2026-0801 ($45,000.00) via Wire.',
    timestamp: '2 hours ago',
    is_read: false,
    route_target: 'invoices',
  },
  {
    id: 'notif-03',
    type: 'PROJECT',
    title: 'Milestone Completed',
    message: 'Shopify Plus Custom Cart Re-architecture passed staging QA tests.',
    timestamp: '5 hours ago',
    is_read: true,
    route_target: 'projects',
  },
  {
    id: 'notif-04',
    type: 'SECURITY',
    title: 'Admin Session Access Logged',
    message: 'Super Admin signed in from IP 192.168.1.42 (San Francisco, US).',
    timestamp: 'Yesterday at 18:30',
    is_read: true,
    route_target: 'settings',
  },
];
