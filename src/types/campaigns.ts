export type CampaignStatus =
  | 'DRAFT'
  | 'PLANNED'
  | 'IN REVIEW'
  | 'READY'
  | 'ACTIVE'
  | 'PAUSED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'ARCHIVED';

export type CampaignPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'CRITICAL';

export type CampaignType =
  | 'PROSPECTING'
  | 'RETARGETING'
  | 'CONVERSION'
  | 'LEAD GENERATION'
  | 'BRAND'
  | 'AWARENESS'
  | 'REMARKETING'
  | 'PRODUCT LAUNCH'
  | 'CATALOG'
  | 'SHOPPING'
  | 'EXPERIMENT'
  | 'CUSTOM';

export type CampaignObjective =
  | 'AWARENESS'
  | 'TRAFFIC'
  | 'ENGAGEMENT'
  | 'LEADS'
  | 'CONVERSIONS'
  | 'SALES'
  | 'APP INSTALLS'
  | 'CATALOG SALES'
  | 'RETENTION'
  | 'CUSTOM';

export type CampaignChannel =
  | 'GOOGLE ADS'
  | 'META ADS'
  | 'TIKTOK ADS'
  | 'LINKEDIN ADS'
  | 'NATIVE ADS'
  | 'GOOGLE SHOPPING'
  | 'SEO'
  | 'EMAIL'
  | 'ORGANIC SOCIAL'
  | 'AFFILIATE'
  | 'INFLUENCER'
  | 'MARKETPLACE'
  | 'DIRECT'
  | 'CUSTOM';

export type CampaignPhase =
  | 'PLANNING'
  | 'SETUP'
  | 'LAUNCH'
  | 'LEARNING'
  | 'OPTIMIZATION'
  | 'SCALING'
  | 'PAUSED'
  | 'COMPLETED';

export type CampaignHealth = 'ON TRACK' | 'ATTENTION' | 'AT RISK' | 'BLOCKED';

export type BudgetType =
  | 'DAILY'
  | 'MONTHLY'
  | 'LIFETIME'
  | 'PROJECT ALLOCATION'
  | 'FLEXIBLE'
  | 'UNLIMITED / PLATFORM CONTROLLED';

export type BudgetPacing = 'EVEN' | 'ACCELERATED' | 'FLEXIBLE' | 'MANUAL';

export type AudienceType =
  | 'BROAD'
  | 'LOOKALIKE'
  | 'CUSTOM'
  | 'INTEREST'
  | 'BEHAVIORAL'
  | 'RETARGETING'
  | 'FIRST-PARTY'
  | 'HIGH INTENT'
  | 'CUSTOM';

export type AdGroupStatus = 'DRAFT' | 'READY' | 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'ARCHIVED';

export type PlacementOption =
  | 'AUTOMATIC'
  | 'MANUAL'
  | 'FEED'
  | 'STORIES'
  | 'REELS'
  | 'SEARCH'
  | 'DISPLAY'
  | 'VIDEO'
  | 'NATIVE'
  | 'SHOPPING'
  | 'CUSTOM';

export type OptimizationEvent =
  | 'IMPRESSIONS'
  | 'CLICKS'
  | 'LANDING PAGE VIEW'
  | 'LEAD'
  | 'PURCHASE'
  | 'VALUE'
  | 'OTHER';

export type CreativeType =
  | 'STATIC IMAGE'
  | 'VIDEO'
  | 'CAROUSEL'
  | 'UGC'
  | 'DYNAMIC'
  | 'TEXT'
  | 'PRODUCT'
  | 'CATALOG'
  | 'NATIVE'
  | 'CUSTOM';

export type AdStatus =
  | 'DRAFT'
  | 'IN REVIEW'
  | 'APPROVED'
  | 'READY'
  | 'ACTIVE'
  | 'PAUSED'
  | 'REJECTED'
  | 'COMPLETED'
  | 'ARCHIVED';

export type CreativeReviewStatus =
  | 'NOT REVIEWED'
  | 'IN REVIEW'
  | 'APPROVED'
  | 'CHANGES REQUESTED'
  | 'REJECTED';

export type CTAOption =
  | 'SHOP NOW'
  | 'LEARN MORE'
  | 'GET STARTED'
  | 'BOOK A CALL'
  | 'REQUEST DEMO'
  | 'CONTACT US'
  | 'CUSTOM';

export type LandingPageType =
  | 'PRODUCT'
  | 'COLLECTION'
  | 'CATEGORY'
  | 'SERVICE'
  | 'LEAD FORM'
  | 'BLOG'
  | 'CUSTOM'
  | 'HOMEPAGE';

export type LandingPageStatus =
  | 'PLANNED'
  | 'READY'
  | 'ACTIVE'
  | 'NEEDS REVIEW'
  | 'PAUSED'
  | 'ARCHIVED';

export type TrackingStatus = 'NOT CONFIGURED' | 'PARTIAL' | 'READY' | 'ERROR' | 'NOT CONNECTED';

export type ExperimentStatus =
  | 'IDEA'
  | 'PLANNED'
  | 'RUNNING'
  | 'ANALYZING'
  | 'WINNER'
  | 'INCONCLUSIVE'
  | 'FAILED'
  | 'ARCHIVED';

export type CreativeAngle =
  | 'PROBLEM / SOLUTION'
  | 'PRODUCT DEMO'
  | 'SOCIAL PROOF'
  | 'COMPARISON'
  | 'FOUNDER'
  | 'UGC'
  | 'OFFER'
  | 'EDUCATIONAL'
  | 'TESTIMONIAL'
  | 'CUSTOM';

export type ChecklistStatus = 'CHECKED' | 'PENDING' | 'BLOCKED';

export interface CampaignAudience {
  name: string;
  type: AudienceType;
  geography: string;
  intent_level: string;
  exclusions: string[];
  notes?: string;
}

export interface CampaignBudget {
  type: BudgetType;
  monthly_amount: string;
  daily_amount: string;
  total_amount?: string;
  currency: string;
  pacing: BudgetPacing;
  budget_owner: string;
  project_media_budget_context: string;
  strategy_allocation_context: string;
  channel_allocation_context: string;
}

export interface CampaignAdGroup {
  id: string;
  name: string;
  campaign_id: string;
  audience_name: string;
  audience_type: AudienceType;
  placement: PlacementOption;
  optimization_event: OptimizationEvent;
  budget_allocation: string;
  status: AdGroupStatus;
  start_date: string;
  end_date?: string;
  owner: string;
  notes?: string;
}

export interface CampaignAd {
  id: string;
  name: string;
  campaign_id: string;
  ad_group_id: string;
  creative_type: CreativeType;
  angle: CreativeAngle;
  primary_message: string;
  headline?: string;
  cta: CTAOption;
  destination_url: string;
  status: AdStatus;
  review_status: CreativeReviewStatus;
  owner: string;
  preview_thumbnail?: string;
}

export interface CampaignCreativeMatrixRow {
  angle: CreativeAngle;
  format: string;
  audience: string;
  hook: string;
  offer: string;
  cta: CTAOption;
  status: string;
}

export interface CampaignLandingPage {
  id: string;
  campaign_id: string;
  url: string;
  page_type: LandingPageType;
  owner: string;
  status: LandingPageStatus;
  quality_checks: {
    message_match: 'PASS' | 'NEEDS ATTENTION' | 'NOT REVIEWED';
    mobile_readiness: 'PASS' | 'NEEDS ATTENTION' | 'NOT REVIEWED';
    speed_check: 'PASS' | 'NEEDS ATTENTION' | 'NOT REVIEWED';
    tracking_verified: 'PASS' | 'NEEDS ATTENTION' | 'NOT REVIEWED';
    conversion_path: 'PASS' | 'NEEDS ATTENTION' | 'NOT REVIEWED';
  };
}

export interface CampaignTracking {
  status: TrackingStatus;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  conversion_event: string;
  conversion_event_status: 'NOT CONNECTED' | 'DEMO' | 'CONNECTED';
  pixel_capi_status: string;
}

export interface CampaignExperiment {
  id: string;
  campaign_id: string;
  strategy_id?: string;
  name: string;
  hypothesis: string;
  variable: string;
  control_group: string;
  variant_group: string;
  channel: CampaignChannel;
  status: ExperimentStatus;
  start_date: string;
  end_date?: string;
  owner: string;
}

export interface LaunchChecklistItem {
  id: string;
  title: string;
  status: ChecklistStatus;
  blocker_reason?: string;
}

export interface CampaignDocument {
  id: string;
  name: string;
  type: 'Brief' | 'Spec' | 'Testing Plan' | 'Creative Assets';
  updated_at: string;
}

export interface CampaignActivity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  author: string;
}

export interface CampaignNote {
  id: string;
  author: string;
  text: string;
  created_at: string;
}

export interface CampaignTeam {
  campaign_owner: string;
  strategy_lead: string;
  performance_lead: string;
  creative_lead: string;
  contributors: string[];
  reviewers: string[];
  client_stakeholders: string[];
}

export interface Campaign {
  id: string; // e.g. "MG-CMP-2026-014"
  name: string; // e.g. "Q3 — PROSPECTING CORE"
  campaign_type: CampaignType;
  channel: CampaignChannel;
  objective: CampaignObjective;
  status: CampaignStatus;
  priority: CampaignPriority;
  health: CampaignHealth;
  health_reason?: string;
  current_phase: CampaignPhase;

  // Relationship Hierarchy
  client_id: string;
  client_business_name: string;
  project_id: string;
  project_name: string;
  strategy_id: string;
  strategy_name: string;
  strategic_role: string;
  strategic_objective_link: string;

  // Timestamps & Dates
  start_date: string;
  end_date: string;
  next_review_date: string;
  last_updated: string;
  created_at: string;

  // Primary Objective & Description
  campaign_objective_description: string;

  // Next Action & Blockers
  next_action: {
    title: string;
    owner: string;
    due_date: string;
  };
  blockers: Array<{
    id: string;
    category: 'CLIENT APPROVAL' | 'TRACKING' | 'CREATIVE' | 'LANDING PAGE' | 'BUDGET' | 'PLATFORM' | 'OTHER';
    description: string;
  }>;

  // Modules
  audience: CampaignAudience;
  budget: CampaignBudget;
  team: CampaignTeam;
  ad_groups: CampaignAdGroup[];
  ads: CampaignAd[];
  creative_matrix: CampaignCreativeMatrixRow[];
  landing_page: CampaignLandingPage;
  tracking: CampaignTracking;
  experiments: CampaignExperiment[];
  checklist: LaunchChecklistItem[];
  documents: CampaignDocument[];
  activities: CampaignActivity[];
  notes: CampaignNote[];
  pause_reason?: string;
  expected_resume_date?: string;
}
