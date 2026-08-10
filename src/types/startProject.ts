export type RequestStatus =
  | 'NEW'
  | 'REVIEWING'
  | 'QUALIFIED'
  | 'DISCOVERY'
  | 'PROPOSAL'
  | 'WON'
  | 'LOST'
  | 'NOT_A_FIT'
  | 'ARCHIVED';

export type GrowthGoalOpeningOption =
  | 'REVENUE'
  | 'LEADS'
  | 'CUSTOMERS'
  | 'COMMERCE'
  | 'NEW_BUSINESS'
  | 'EFFICIENCY'
  | 'AI_AUTOMATION'
  | 'NOT_SURE';

export type RoleOption =
  | 'Founder'
  | 'Owner'
  | 'CEO'
  | 'Marketing'
  | 'E-commerce'
  | 'Growth'
  | 'Operations'
  | 'Product'
  | 'Other';

export type IndustryOption =
  | 'E-commerce'
  | 'DTC / Consumer'
  | 'Retail'
  | 'B2B'
  | 'SaaS / Technology'
  | 'Professional Services'
  | 'Marketplace'
  | 'Local / Regional'
  | 'Other';

export type BusinessModelOption =
  | 'DTC'
  | 'B2B'
  | 'B2C'
  | 'Marketplace'
  | 'Subscription'
  | 'Lead Generation'
  | 'Other';

export type BusinessScaleOption =
  | 'PRE-REVENUE'
  | 'UNDER $100K / YEAR'
  | '$100K–$500K'
  | '$500K–$1M'
  | '$1M–$5M'
  | '$5M–$10M'
  | '$10M+'
  | 'PREFER NOT TO SAY';

export type TeamManagementOption =
  | 'Founder / internal team'
  | 'Internal marketing team'
  | 'Freelancers'
  | 'Agency'
  | 'Mixed'
  | 'No dedicated team';

export type MonthlyAdSpendOption =
  | 'Under $1K / month'
  | '$1K–$5K'
  | '$5K–$10K'
  | '$10K–$25K'
  | '$25K–$50K'
  | '$50K+'
  | 'Not sure'
  | 'Prefer not to say';

export type ProjectBudgetOption =
  | 'Under $2K'
  | '$2K–$5K'
  | '$5K–$10K'
  | '$10K–$25K'
  | '$25K+'
  | 'Not sure'
  | 'Prefer not to say';

export type TimingOption =
  | 'ASAP'
  | 'Within 30 days'
  | '1–3 months'
  | '3–6 months'
  | 'Exploring'
  | 'No specific timeline';

export type EngagementTypeOption =
  | 'ONGOING GROWTH PARTNERSHIP'
  | 'PROJECT / BUILD'
  | 'STRATEGY'
  | 'AUDIT / DIAGNOSIS'
  | 'ONE-TIME CAMPAIGN'
  | 'NOT SURE';

export type ReferralSourceOption =
  | 'Search'
  | 'Referral'
  | 'LinkedIn'
  | 'Social media'
  | 'Google'
  | 'Existing relationship'
  | 'Other';

export interface ProjectRequestFormData {
  // Opening interactive question
  openingGoal?: GrowthGoalOpeningOption;

  // Step 01: About You
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country: string;
  role: RoleOption | string;

  // Step 02: Your Business
  companyName: string;
  website: string;
  industry: IndustryOption | string;
  businessModel: BusinessModelOption | string;
  primaryMarket: string;
  targetMarket?: string;
  businessSize: BusinessScaleOption | string;

  // Step 03: What You Need
  performanceServices: string[];
  commercePlatforms: string[];
  developmentServices: string[];
  intelligenceServices: string[];
  isNotSureNeeds: boolean;

  // Step 04: Current System
  currentPlatforms: string[];
  currentMarketingChannels: string[];
  currentTeam: TeamManagementOption | string;
  currentChallenges: string[];
  tellUsMore: string;
  primaryGoals: string[];

  // Step 05: Budget & Timing
  monthlyMediaAdSpend: MonthlyAdSpendOption | string;
  projectServiceBudget: ProjectBudgetOption | string;
  timeline: TimingOption | string;
  engagementType: EngagementTypeOption | string;

  // Step 06: Final Details
  referralSource: ReferralSourceOption | string;
  anythingElse: string;
  attachmentName?: string;
}

export interface ProjectRequestRecord extends ProjectRequestFormData {
  id: string; // e.g. MG-829104
  createdAt: string;
  status: RequestStatus;
}

export type StartProjectStep =
  | 0 // Opening interactive goal selector (Optional / Human Warmup)
  | 1 // About You
  | 2 // Your Business
  | 3 // What You Need
  | 4 // Current System
  | 5 // Budget + Timing
  | 6 // Final Details
  | 7 // Review Summary
  | 8; // Submitted Success Screen

export interface FormValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  companyName?: string;
  website?: string;
  country?: string;
  industry?: string;
  businessModel?: string;
  needs?: string;
  tellUsMore?: string;
  timeline?: string;
}
