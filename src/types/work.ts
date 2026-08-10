import { CapabilityPillarId } from './capabilities';
import { IndustryCategoryId, BusinessModelId } from './industries';

export type CaseStudyStatus =
  | 'ACTIVE_CLIENT'
  | 'ONGOING'
  | 'COMPLETED'
  | 'SELECTED_PROJECT'
  | 'PAST_CLIENT';

export type BudgetVisibilityMode = 'EXACT' | 'RANGE' | 'CATEGORY' | 'HIDDEN';

export interface CaseStudyMetricResult {
  label: string;
  metric: string; // e.g. "+142%" or "$1.4M" or "2.8x"
  note: string;
  category: 'PERFORMANCE' | 'COMMERCE' | 'DEVELOPMENT' | 'INTELLIGENCE';
  isDemoPlaceholder?: boolean;
}

export interface BeforeAfterComparison {
  dimension: string;
  before: string;
  after: string;
}

export interface StrategyStep {
  stepNumber: string; // e.g. "01"
  title: string;
  description: string;
}

export interface ClientRef {
  id: string;
  name: string;
  isConfidential: boolean;
  publicDisplayName: string;
  industry: IndustryCategoryId;
  businessModel: BusinessModelId;
  countryOrRegion: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  clientId: string;
  clientName: string;
  isConfidential: boolean;
  title: string;
  subtitle: string;
  industryId: IndustryCategoryId;
  businessModel: string;
  geography: string;
  status: CaseStudyStatus;
  engagementType: string; // e.g. "Full Growth Assembly", "Performance + Commerce Sprint"
  startDate: string; // e.g. "Q1 2025"
  duration: string; // e.g. "8 Months (Ongoing)"
  mediaBudgetDisplay: string; // e.g. "$10K–$25K / month"
  budgetVisibility: BudgetVisibilityMode;
  clientBio: string;
  challenge: string;
  objective: string;
  strategySteps: StrategyStep[];
  executionItems: string[];
  capabilities: CapabilityPillarId[];
  servicesUsed: string[];
  platforms: string[];
  results: CaseStudyMetricResult[];
  beforeAfter?: BeforeAfterComparison[];
  testimonial?: {
    quote: string;
    authorName: string;
    authorRole: string;
    companyName: string;
  };
  heroPlaceholderLabel: string;
  featured: boolean;
  isDemoData: boolean; // Explicit flag indicating prototype mock data
}

export interface WorkFilterState {
  industry: IndustryCategoryId | 'all';
  businessModel: string | 'all';
  capability: CapabilityPillarId | 'all';
  service: string | 'all';
  platform: string | 'all';
  budgetRange: string | 'all';
  status: CaseStudyStatus | 'all';
  geography: string | 'all';
  searchQuery: string;
}
