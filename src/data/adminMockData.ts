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
  active_clients: 0,
  active_projects: 0,
  open_requests: 0,
  outstanding_invoices: '$0',
  monthly_mrr: '$0',
  quarterly_growth: 'Live',
  is_demo_data: false,
};

export const MOCK_REQUESTS: MockRequest[] = [];
export const MOCK_PROSPECTS: MockProspect[] = [];
export const MOCK_CLIENTS: MockClient[] = [];
export const MOCK_PROJECTS: MockProject[] = [];
export const MOCK_INVOICES: MockInvoice[] = [];
export const MOCK_PAYMENTS: MockPayment[] = [];
export const MOCK_NOTIFICATIONS: MockNotification[] = [];
