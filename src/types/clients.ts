export type ClientStatus =
  | 'ACTIVE'
  | 'ONBOARDING'
  | 'ATTENTION'
  | 'PAUSED'
  | 'OFFBOARDING'
  | 'ARCHIVED';

export type ClientHealth = 'HEALTHY' | 'ATTENTION' | 'AT_RISK' | 'PAUSED';

export type ServiceStatus = 'ACTIVE' | 'PAUSED' | 'PLANNED' | 'COMPLETED' | 'CANCELLED';

export type PortalStatus = 'NOT_INVITED' | 'INVITED' | 'ACTIVE' | 'SUSPENDED';

export type ContactRole =
  | 'Founder'
  | 'CEO'
  | 'CMO'
  | 'Marketing Director'
  | 'Head of Ecommerce'
  | 'Developer'
  | 'Finance'
  | 'Operations'
  | 'Other';

export interface ClientContact {
  id: string;
  name: string;
  role: ContactRole | string;
  email: string;
  phone?: string;
  is_primary: boolean;
  notes?: string;
}

export interface ClientService {
  id: string;
  name: string;
  status: ServiceStatus;
  owner: string;
  started_at: string;
  associated_projects_count: number;
  monthly_fee_display?: string;
}

export interface ClientProjectPreview {
  id: string; // e.g. MG-PROJ-2026-001
  name: string;
  category: 'PERFORMANCE' | 'COMMERCE' | 'STRATEGY' | 'DEVELOPMENT';
  status: 'ACTIVE' | 'IN_PROGRESS' | 'PLANNING' | 'PAUSED' | 'COMPLETED';
  platforms: string[];
  owner: string;
  progress_percent: number;
}

export interface ClientPlatform {
  name: string;
  category: 'E-COMMERCE' | 'ADS' | 'ANALYTICS' | 'CRM' | 'DEVELOPMENT';
  status: 'CONNECTED' | 'NOT_CONNECTED' | 'PENDING';
}

export interface ClientDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  uploaded_at: string;
  visibility: 'INTERNAL' | 'CLIENT_VISIBLE';
  download_url?: string;
}

export interface ClientActivity {
  id: string;
  type:
    | 'CLIENT_CREATED'
    | 'CONTACT_ADDED'
    | 'PROJECT_CREATED'
    | 'SERVICE_ACTIVATED'
    | 'SERVICE_PAUSED'
    | 'STRATEGY_UPDATED'
    | 'DOCUMENT_ADDED'
    | 'PROPOSAL_CREATED'
    | 'INVOICE_CREATED'
    | 'PAYMENT_RECEIVED'
    | 'MEETING'
    | 'NOTE'
    | 'STATUS_CHANGE';
  title: string;
  description: string;
  timestamp: string;
  author: string;
}

export interface ClientNote {
  id: string;
  text: string;
  author: string;
  created_at: string;
  visibility: 'INTERNAL' | 'CLIENT_VISIBLE';
}

export interface Client {
  id: string; // e.g. MG-CL-2026-008
  source_prospect_id?: string; // e.g. MG-PR-2026-014
  source_request_id?: string; // e.g. MG-REQ-2026-081

  // Business Profile
  business_name: string;
  industry: string;
  business_model: string;
  company_size: string;
  primary_market: string;
  markets_served: string;
  website: string;
  logo_url?: string;
  description: string;
  primary_objective: string;

  // Commercial Relationship
  client_since: string; // e.g. May 2026
  account_owner: string; // e.g. Kaelen Voss or Growth Team
  status: ClientStatus;
  health: ClientHealth;
  health_reason?: string;
  pause_reason?: string;

  // Next Action
  next_action: {
    title: string;
    due_date: string;
    owner: string;
  };

  // Related Sub-Entities
  contacts: ClientContact[];
  services: ClientService[];
  platforms: ClientPlatform[];
  projects: ClientProjectPreview[];
  activities: ClientActivity[];
  documents: ClientDocument[];
  notes: ClientNote[];

  // Client Portal Integration
  portal_status: PortalStatus;
  portal_invited_at?: string;
  show_on_homepage?: boolean;
  homepage_label?: string;
  homepage_order?: number;

  // Metadata
  created_at: string;
  updated_at: string;
}
