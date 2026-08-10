export type StrategyStatus =
  | 'DRAFT'
  | 'IN REVIEW'
  | 'CLIENT REVIEW'
  | 'APPROVED'
  | 'ACTIVE'
  | 'PAUSED'
  | 'SUPERSEDED'
  | 'ARCHIVED';

export type StrategyHealth = 'ON TRACK' | 'ATTENTION' | 'AT RISK' | 'BLOCKED';

export type StrategyType =
  | 'GROWTH'
  | 'PERFORMANCE MARKETING'
  | 'ECOMMERCE'
  | 'CRO'
  | 'SEO'
  | 'DEVELOPMENT'
  | 'AI STRATEGY'
  | 'MARKETPLACE'
  | 'B2B'
  | 'BRAND'
  | 'CUSTOM';

export type BusinessModel =
  | 'Ecommerce'
  | 'B2B'
  | 'B2C'
  | 'SaaS'
  | 'Marketplace'
  | 'Local'
  | 'Professional Services'
  | 'D2C'
  | 'Subscription'
  | 'Other';

export type ObjectivePriority = 'PRIMARY' | 'HIGH' | 'MEDIUM' | 'LOW';

export type ObjectiveStatus =
  | 'NOT STARTED'
  | 'IN PROGRESS'
  | 'ON TRACK'
  | 'AT RISK'
  | 'COMPLETED'
  | 'PAUSED';

export type ChannelRole =
  | 'ACQUISITION'
  | 'RETARGETING'
  | 'RETENTION'
  | 'AWARENESS'
  | 'CONVERSION'
  | 'DEMAND GENERATION'
  | 'EXPERIMENTAL';

export type ChannelPriority = 'CORE' | 'GROWTH' | 'TEST' | 'SUPPORT' | 'PAUSED';

export type BudgetFlexibility = 'FIXED' | 'FLEXIBLE' | 'PERFORMANCE-DEPENDENT' | 'EXPERIMENTAL';

export type FunnelStageName = 'DISCOVERY' | 'INTEREST' | 'CONSIDERATION' | 'CONVERSION' | 'RETENTION';

export type ExperimentPriority = 'HIGH IMPACT' | 'MEDIUM IMPACT' | 'LOW IMPACT';

export type ExperimentStatus =
  | 'IDEA'
  | 'PLANNED'
  | 'RUNNING'
  | 'ANALYZING'
  | 'WINNER'
  | 'INCONCLUSIVE' | 'FAILED'
  | 'ARCHIVED';

export type RecommendationEffort = 'LOW' | 'MEDIUM' | 'HIGH';
export type RecommendationPriority = 'HIGH' | 'MEDIUM' | 'LOW';
export type RecommendationStatus =
  | 'PROPOSED'
  | 'APPROVED'
  | 'REJECTED'
  | 'IMPLEMENTING'
  | 'COMPLETED'
  | 'ARCHIVED';

export type KPIType = 'BUSINESS KPI' | 'MARKETING KPI' | 'CHANNEL KPI' | 'CAMPAIGN KPI';

export interface StrategyObjective {
  id: string;
  number: string;
  name: string;
  description: string;
  priority: ObjectivePriority;
  status: ObjectiveStatus;
  owner: string;
  measurement_target: {
    metric_name: string;
    target_value: string;
    status: 'NOT CONNECTED' | 'DEMO' | 'CONNECTED';
  };
}

export interface StrategyAudience {
  primary_audience: {
    name: string;
    age_range: string;
    geography: string;
    gender: string;
    interests: string;
    behavior: string;
    buying_intent: string;
    pain_points: string;
    needs: string;
    motivations: string;
    barriers: string;
    use_case: string;
  };
  secondary_audience?: {
    name: string;
    description: string;
  };
  exclusion_audience?: {
    name: string;
    description: string;
  };
  customer_problem: string;
  primary_motivators: string[];
  primary_objections: string[];
}

export interface StrategyPositioning {
  market_position: string;
  core_value_proposition: string;
  key_differentiators: string[];
  proof_points: string[];
  competitive_advantage: string;
  brand_promise: string;
  competitors: Array<{
    id: string;
    name: string;
    category: string;
    strength: string;
    weakness: string;
    strategic_implication: string;
  }>;
}

export interface StrategyChannelItem {
  id: string;
  channel_name: string;
  role: ChannelRole;
  priority: ChannelPriority;
  objective: string;
  audience: string;
  budget_allocation_pct: number;
  current_status: string;
  owner: string;
  approach: string;
  testing_plan?: string;
  creative_requirements?: string;
  measurement_notes?: string;
  risks?: string;
  next_actions?: string;
}

export interface StrategyBudget {
  client_media_spend_range: string;
  currency: string;
  flexibility: BudgetFlexibility;
  note: string;
  allocations: Array<{
    channel_name: string;
    percentage: number;
    estimated_amount: string;
  }>;
}

export interface StrategyFunnelStage {
  stage: FunnelStageName;
  audience: string;
  channels: string[];
  message: string;
  offer: string;
  creative: string;
  landing_experience: string;
  measurement: string;
}

export interface StrategyMessaging {
  core_message: string;
  supporting_messages: string[];
  proof_points: string[];
  offer: string;
  cta: string;
  objection_handling: string;
}

export interface StrategyCreative {
  themes: string[];
  angles: Array<{
    id: string;
    number: string;
    title: string;
    description: string;
  }>;
  formats: string[];
  testing_approach: string;
}

export interface StrategyExperiment {
  id: string;
  name: string;
  hypothesis: string;
  channel: string;
  variable: string;
  expected_outcome: string;
  priority: ExperimentPriority;
  status: ExperimentStatus;
  start_date?: string;
  end_date?: string;
  owner: string;
}

export interface StrategyHypothesis {
  id: string;
  hypothesis: string;
  reasoning: string;
}

export interface StrategyRecommendation {
  id: string;
  title: string;
  description: string;
  reason: string;
  expected_impact: string;
  effort: RecommendationEffort;
  priority: RecommendationPriority;
  owner: string;
  status: RecommendationStatus;
}

export interface StrategyRoadmapPhase {
  phase_number: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  status: 'NOT STARTED' | 'IN PROGRESS' | 'COMPLETED' | 'PAUSED';
  objectives: string[];
  deliverables: string[];
}

export interface StrategyDependency {
  id: string;
  name: string;
  owner: string;
  status: 'PENDING' | 'READY' | 'BLOCKED' | 'COMPLETED';
  due_date: string;
}

export interface StrategyRisk {
  id: string;
  risk: string;
  probability: 'LOW' | 'MEDIUM' | 'HIGH';
  impact: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  mitigation: string;
  owner: string;
  status: 'OPEN' | 'MITIGATED' | 'ACCEPTED';
}

export interface StrategyMeasurementItem {
  id: string;
  metric: string;
  type: KPIType;
  definition: string;
  source: string;
  target: string;
  frequency: string;
  owner: string;
  status: 'NOT CONNECTED' | 'DEMO' | 'CONNECTED';
}

export interface StrategyDataSource {
  name: string;
  category: string;
  status: 'NOT CONNECTED' | 'DEMO / MOCK' | 'CONNECTED';
}

export interface StrategyApprovalState {
  status: 'DRAFT' | 'INTERNAL REVIEW' | 'CLIENT REVIEW' | 'APPROVED' | 'REJECTED' | 'SUPERSEDED';
  internal_review?: {
    reviewer: string;
    date: string;
    comment: string;
    status: string;
  };
  client_review?: {
    status: 'NOT SENT' | 'SENT' | 'VIEWED' | 'COMMENTED' | 'APPROVED' | 'REJECTED';
    sent_date?: string;
    comment?: string;
  };
}

export interface StrategyVersionItem {
  version: string;
  is_current: boolean;
  date: string;
  author: string;
  summary: string;
  status: string;
}

export interface StrategyActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  author: string;
}

export interface StrategyNoteItem {
  id: string;
  author: string;
  text: string;
  created_at: string;
}

export interface Strategy {
  id: string; // e.g. "MG-STR-2026-014"
  name: string; // e.g. "Q3 Growth Acquisition Strategy"
  strategy_type: StrategyType;
  status: StrategyStatus;
  health: StrategyHealth;
  version: string; // e.g. "v1.4"
  is_current: boolean;
  
  // Relationships
  client_id: string;
  client_business_name: string;
  project_id: string;
  project_name: string;
  
  // Ownership
  strategy_lead: string;
  contributors: string[];
  approvers: string[];
  client_stakeholders: string[];
  
  // Timestamps
  created_at: string;
  last_updated: string;
  next_review_date: string;
  
  // Content
  description: string;
  executive_summary: string;
  
  // Business Context
  business_context: {
    business_model: BusinessModel;
    industry: string;
    primary_market: string;
    secondary_markets: string[];
    countries: string[];
    languages: string[];
    currency: string;
    product_service: string;
    business_maturity: string;
    growth_stage: string;
    current_situation: string;
    strategic_problem: string;
    strategic_opportunity: string;
  };
  
  // Sub-modules
  objectives: StrategyObjective[];
  audience: StrategyAudience;
  positioning: StrategyPositioning;
  channels: StrategyChannelItem[];
  budget: StrategyBudget;
  funnel: StrategyFunnelStage[];
  messaging: StrategyMessaging;
  creative: StrategyCreative;
  experiments: StrategyExperiment[];
  hypotheses: StrategyHypothesis[];
  recommendations: StrategyRecommendation[];
  roadmap: StrategyRoadmapPhase[];
  dependencies: StrategyDependency[];
  risks: StrategyRisk[];
  assumptions: string[];
  measurement_framework: StrategyMeasurementItem[];
  data_sources: StrategyDataSource[];
  approval: StrategyApprovalState;
  version_history: StrategyVersionItem[];
  activities: StrategyActivityItem[];
  notes: StrategyNoteItem[];
}
