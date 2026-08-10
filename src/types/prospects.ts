export type ProspectStage =
  | 'QUALIFIED'
  | 'DISCOVERY'
  | 'PROPOSAL'
  | 'NEGOTIATION'
  | 'WON'
  | 'LOST'
  | 'NOT_A_FIT';

export type ProspectPriority = 'URGENT' | 'HIGH' | 'NORMAL' | 'LOW';

export type LeadSource =
  | 'WEBSITE'
  | 'REFERRAL'
  | 'OUTBOUND'
  | 'LINKEDIN'
  | 'PARTNER'
  | 'EXISTING_CLIENT'
  | 'EVENT'
  | 'OTHER';

export type QualificationStatus = 'CONFIRMED' | 'LIKELY' | 'UNKNOWN' | 'CONCERN';

export type LostReason =
  | 'PRICE'
  | 'TIMING'
  | 'NO_BUDGET'
  | 'CHOOSE_COMPETITOR'
  | 'NOT_A_FIT'
  | 'NO_RESPONSE'
  | 'PROJECT_CANCELLED'
  | 'OTHER';

export type ActivityType =
  | 'NOTE'
  | 'EMAIL'
  | 'CALL'
  | 'MEETING'
  | 'STATUS_CHANGE'
  | 'DOCUMENT'
  | 'PROPOSAL'
  | 'TASK'
  | 'REQUEST';

export interface ProspectActivity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  author: string;
  visibility?: 'INTERNAL' | 'PUBLIC';
}

export interface ProspectTask {
  id: string;
  title: string;
  due_date: string;
  status: 'OPEN' | 'DONE' | 'OVERDUE';
  assigned_to: string;
}

export interface ProspectDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  uploaded_at: string;
  url?: string;
}

export interface ProspectNextAction {
  id: string;
  title: string;
  due_date: string;
  owner: string;
  completed: boolean;
}

export interface ProspectQualification {
  budget_fit: QualificationStatus;
  service_fit: QualificationStatus;
  timeline_fit: QualificationStatus;
  decision_maker_fit: QualificationStatus;
  strategic_fit: QualificationStatus;
  why_magniar: string;
}

export interface ProspectDiscovery {
  primary_objective: string;
  current_challenge: string;
  desired_outcome: string;
  current_acquisition_channels: string[];
  current_monthly_spend: string;
  current_revenue_range: string;
  target_market: string;
  timeline: string;
  decision_maker: string;
  internal_constraints: string;
  success_criteria: string;
  market_context?: string;
}

export interface ProspectOpportunity {
  media_budget: string;
  media_budget_val?: number;
  service_fee: string;
  service_fee_val?: number;
  project_fee?: string;
  estimated_monthly_value: string;
  estimated_monthly_value_num: number;
  estimated_contract_value: string;
  estimated_contract_value_num: number;
  currency: string;
  probability: number; // Internal estimate %
  expected_close_date: string;
}

export interface Prospect {
  id: string; // e.g. MG-PR-2026-014
  request_id?: string; // e.g. req-001
  source_request_code?: string; // e.g. MG-REQ-2026-081
  source_request_date?: string; // e.g. Aug 08, 2026
  
  // Business
  business_name: string;
  contact_name: string;
  contact_title: string;
  email: string;
  phone?: string;
  website?: string;
  industry: string;
  business_model: string;
  company_size?: string;
  primary_market?: string;
  markets_served?: string;
  current_technology?: string;
  current_marketing_channels?: string[];
  
  // CRM Attributes
  stage: ProspectStage;
  priority: ProspectPriority;
  owner: string; // e.g. Kaelen Voss
  lead_source: LeadSource;

  // Services
  services: string[];

  // Opportunity financials
  opportunity: ProspectOpportunity;

  // Next action
  next_action: ProspectNextAction;

  // Details
  discovery: ProspectDiscovery;
  qualification: ProspectQualification;
  internal_notes: string;

  // Conversion / Lost tracking
  converted_client_id?: string; // e.g. MG-CL-2026-008
  converted_at?: string;
  lost_reason?: LostReason;
  lost_note?: string;

  // Timestamps
  created_at: string;
  updated_at: string;

  // Relational items
  activities: ProspectActivity[];
  tasks: ProspectTask[];
  documents: ProspectDocument[];
}
