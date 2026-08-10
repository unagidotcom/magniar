export type ProjectStatus =
  | 'PLANNING'
  | 'ONBOARDING'
  | 'ACTIVE'
  | 'IN_PROGRESS'
  | 'AT_RISK'
  | 'PAUSED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'ARCHIVED';

export type ProjectHealth = 'ON_TRACK' | 'ATTENTION' | 'AT_RISK' | 'BLOCKED';

export type ProjectPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'CRITICAL';

export type ProjectType =
  | 'PERFORMANCE'
  | 'COMMERCE'
  | 'DEVELOPMENT'
  | 'STRATEGY'
  | 'AI STRATEGY'
  | 'CRO'
  | 'ANALYTICS'
  | 'MARKETPLACE'
  | 'CONSULTING'
  | 'CUSTOM';

export type ProjectPhase =
  | 'DISCOVERY'
  | 'PLANNING'
  | 'ONBOARDING'
  | 'IMPLEMENTATION'
  | 'LAUNCH'
  | 'OPTIMIZATION'
  | 'REVIEW'
  | 'COMPLETION';

export type ProjectServiceStatus = 'PLANNED' | 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'CANCELLED';

export type MilestoneStatus = 'COMPLETED' | 'IN_PROGRESS' | 'UPCOMING' | 'BLOCKED';

export type DeliverableStatus =
  | 'DRAFT'
  | 'PLANNED'
  | 'IN_PROGRESS'
  | 'IN_REVIEW'
  | 'APPROVED'
  | 'COMPLETED'
  | 'BLOCKED';

export type BlockerStatus =
  | 'OPEN'
  | 'WAITING_ON_CLIENT'
  | 'WAITING_ON_MAGNIAR'
  | 'BLOCKED'
  | 'RESOLVED';

export type ScopeType = 'IN_SCOPE' | 'OUT_OF_SCOPE' | 'PENDING_APPROVAL';

export type PlatformStatus = 'CONNECTED' | 'PENDING' | 'NOT_CONNECTED' | 'ERROR';

export interface ProjectScopeItem {
  id: string;
  name: string;
  description: string;
  type: ScopeType;
}

export interface ProjectServiceItem {
  id: string;
  service_name: string;
  status: ProjectServiceStatus;
  owner: string;
  started_at: string;
  notes?: string;
}

export interface ProjectTeamMember {
  id: string;
  name: string;
  role: string; // e.g. 'Project Lead', 'Strategy', 'Performance', 'Development', 'Creative', 'Analytics'
  email?: string;
}

export interface ProjectClientContact {
  name: string;
  role: string;
  email: string;
  phone?: string;
}

export interface ProjectMilestone {
  id: string;
  name: string;
  status: MilestoneStatus;
  due_date: string;
  owner: string;
  description: string;
  completed_at?: string;
}

export interface ProjectDeliverable {
  id: string;
  name: string;
  status: DeliverableStatus;
  owner: string;
  due_date: string;
  description?: string;
}

export interface ProjectTaskPreview {
  id: string;
  title: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'WAITING' | 'COMPLETED';
  due_date: string;
  owner: string;
  notes?: string;
}

export interface ProjectBlocker {
  id: string;
  title: string;
  status: BlockerStatus;
  owner: string;
  waiting_since: string;
  description: string;
}

export interface ProjectCommercialSummary {
  monthly_service_fee?: string; // e.g. "$8,500 / mo" (Magniar Service Revenue)
  media_budget?: string; // e.g. "$25,000–$50,000 / mo" (Client Media Spend - NOT Magniar Revenue)
  project_fee?: string; // e.g. "$18,000" (One-time project fee)
  total_contract_value?: string; // e.g. "$120,000"
  billing_model: string; // e.g. "MONTHLY RETAINER + PROJECT"
  next_invoice_date: string; // e.g. "Aug 31, 2026"
  billing_status: 'UP_TO_DATE' | 'PENDING_APPROVAL' | 'OVERDUE' | 'PAUSED';
}

export interface ProjectPlatform {
  name: string;
  category: string;
  status: PlatformStatus;
}

export interface ProjectStrategyPreview {
  id: string;
  title: string;
  status: 'ACTIVE' | 'DRAFT' | 'REVIEW';
  last_updated: string;
  description: string;
}

export interface ProjectDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  uploaded_at: string;
  visibility: 'INTERNAL' | 'CLIENT_VISIBLE';
  download_url?: string;
}

export interface ProjectActivity {
  id: string;
  type:
    | 'PROJECT_CREATED'
    | 'SERVICE_ADDED'
    | 'MILESTONE_COMPLETED'
    | 'CLIENT_COMMENT_ADDED'
    | 'STRATEGY_UPDATED'
    | 'DELIVERABLE_APPROVED'
    | 'STATUS_CHANGED'
    | 'NOTE_ADDED'
    | 'SCOPE_UPDATED';
  title: string;
  description: string;
  timestamp: string;
  author: string;
}

export interface ProjectNote {
  id: string;
  text: string;
  author: string;
  created_at: string;
  visibility: 'INTERNAL';
}

export interface Project {
  id: string; // e.g. MG-PRJ-2026-014
  name: string; // e.g. Q3 Paid Acquisition System
  client_id: string; // e.g. MG-CL-2026-008
  client_business_name: string; // e.g. Northstar Commerce
  source_prospect_id?: string; // e.g. MG-PR-2026-014
  source_request_id?: string; // e.g. MG-REQ-2026-081

  project_type: ProjectType;
  description: string;
  primary_objective: string;

  status: ProjectStatus;
  health: ProjectHealth;
  health_reason?: string;
  priority: ProjectPriority;

  project_lead: string; // e.g. Kaelen Voss
  start_date: string; // e.g. Jun 01, 2026
  target_end_date: string; // e.g. Sep 30, 2026
  current_phase: ProjectPhase;
  progress_percent: number; // Operational progress (0-100)

  pause_reason?: string;
  resume_target_date?: string;
  completed_at?: string;
  completion_summary?: string;

  next_action: {
    title: string;
    due_date: string;
    owner: string;
  };

  client_contact: ProjectClientContact;
  team: ProjectTeamMember[];
  services: ProjectServiceItem[];
  scope: ProjectScopeItem[];
  milestones: ProjectMilestone[];
  deliverables: ProjectDeliverable[];
  open_tasks: ProjectTaskPreview[];
  blockers: ProjectBlocker[];
  commercial: ProjectCommercialSummary;
  platforms: ProjectPlatform[];
  strategy?: ProjectStrategyPreview;
  documents: ProjectDocument[];
  activities: ProjectActivity[];
  notes: ProjectNote[];

  created_at: string;
  updated_at: string;
}
