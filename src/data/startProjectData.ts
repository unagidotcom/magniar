import {
  ProjectRequestFormData,
  GrowthGoalOpeningOption,
  RoleOption,
  IndustryOption,
  BusinessModelOption,
  BusinessScaleOption,
  TeamManagementOption,
  MonthlyAdSpendOption,
  ProjectBudgetOption,
  TimingOption,
  EngagementTypeOption,
  ReferralSourceOption,
} from '../types/startProject';

export const OPENING_GOAL_OPTIONS: {
  id: GrowthGoalOpeningOption;
  label: string;
  description: string;
}[] = [
  { id: 'REVENUE', label: 'REVENUE', description: 'Scale top-line growth and monthly recurring volume.' },
  { id: 'LEADS', label: 'QUALIFIED LEADS', description: 'Pipeline velocity for high-ACV or B2B sales.' },
  { id: 'CUSTOMERS', label: 'CUSTOMER ACQUISITION', description: 'Lower CPA and scale customer volume across channels.' },
  { id: 'COMMERCE', label: 'E-COMMERCE SCALE', description: 'Optimize store conversion, AOV, and multi-channel expansion.' },
  { id: 'NEW_BUSINESS', label: 'LAUNCH A NEW BUSINESS', description: 'Build go-to-market architecture from 0 to 1.' },
  { id: 'EFFICIENCY', label: 'EFFICIENCY & ROAS', description: 'Fix ad spend waste, improve margins, and fix attribution.' },
  { id: 'AI_AUTOMATION', label: 'AI & AUTOMATION', description: 'Implement AI workflows, predictive models, and custom tech.' },
  { id: 'NOT_SURE', label: 'NOT SURE YET', description: "We'll diagnose your business and recommend the right path." },
];

export const ROLE_OPTIONS: RoleOption[] = [
  'Founder',
  'Owner',
  'CEO',
  'Marketing',
  'E-commerce',
  'Growth',
  'Operations',
  'Product',
  'Other',
];

export const INDUSTRY_OPTIONS: IndustryOption[] = [
  'E-commerce',
  'DTC / Consumer',
  'Retail',
  'B2B',
  'SaaS / Technology',
  'Professional Services',
  'Marketplace',
  'Local / Regional',
  'Other',
];

export const BUSINESS_MODEL_OPTIONS: BusinessModelOption[] = [
  'DTC',
  'B2B',
  'B2C',
  'Marketplace',
  'Subscription',
  'Lead Generation',
  'Other',
];

export const BUSINESS_SCALE_OPTIONS: BusinessScaleOption[] = [
  'PRE-REVENUE',
  'UNDER $100K / YEAR',
  '$100K–$500K',
  '$500K–$1M',
  '$1M–$5M',
  '$5M–$10M',
  '$10M+',
  'PREFER NOT TO SAY',
];

export const TEAM_MANAGEMENT_OPTIONS: TeamManagementOption[] = [
  'Founder / internal team',
  'Internal marketing team',
  'Freelancers',
  'Agency',
  'Mixed',
  'No dedicated team',
];

export const MONTHLY_AD_SPEND_OPTIONS: MonthlyAdSpendOption[] = [
  'Under $1K / month',
  '$1K–$5K',
  '$5K–$10K',
  '$10K–$25K',
  '$25K–$50K',
  '$50K+',
  'Not sure',
  'Prefer not to say',
];

export const PROJECT_BUDGET_OPTIONS: ProjectBudgetOption[] = [
  'Under $2K',
  '$2K–$5K',
  '$5K–$10K',
  '$10K–$25K',
  '$25K+',
  'Not sure',
  'Prefer not to say',
];

export const TIMING_OPTIONS: TimingOption[] = [
  'ASAP',
  'Within 30 days',
  '1–3 months',
  '3–6 months',
  'Exploring',
  'No specific timeline',
];

export const ENGAGEMENT_TYPE_OPTIONS: EngagementTypeOption[] = [
  'ONGOING GROWTH PARTNERSHIP',
  'PROJECT / BUILD',
  'STRATEGY',
  'AUDIT / DIAGNOSIS',
  'ONE-TIME CAMPAIGN',
  'NOT SURE',
];

export const REFERRAL_SOURCE_OPTIONS: ReferralSourceOption[] = [
  'Search',
  'Referral',
  'LinkedIn',
  'Social media',
  'Google',
  'Existing relationship',
  'Other',
];

export const PERFORMANCE_SERVICES_LIST = [
  'Google Ads',
  'Meta Ads',
  'TikTok Ads',
  'LinkedIn Ads',
  'Native Ads',
  'Paid acquisition',
  'CRO',
];

export const COMMERCE_PLATFORMS_LIST = [
  'Shopify',
  'WooCommerce',
  'Amazon',
  'Walmart',
  'TikTok Shop',
  'Etsy',
  'eBay',
  'Meesho',
  'Marketplace',
];

export const DEVELOPMENT_SERVICES_LIST = [
  'Website',
  'Landing pages',
  'E-commerce development',
  'Tracking',
  'Analytics',
  'Automation',
  'Integrations',
  'Custom development',
];

export const INTELLIGENCE_SERVICES_LIST = [
  'AI strategy',
  'AI implementation',
  'AI automation',
  'Data',
  'Analytics',
  'Growth strategy',
];

export const CHALLENGE_SUGGESTIONS_LIST = [
  'Acquisition costs',
  'Lead quality',
  'Conversion',
  'Scaling',
  'Tracking',
  'Creative',
  'Website',
  'Store',
  'Marketplace',
  'Technology',
  'Automation',
  'Reporting',
  'Strategy',
  'Team capacity',
  'International expansion',
  'Other',
];

export const GOALS_SUGGESTIONS_LIST = [
  'More qualified leads',
  'More revenue',
  'Lower acquisition cost',
  'Higher conversion',
  'Better ROAS',
  'Scale existing campaigns',
  'Launch a new channel',
  'Improve commerce',
  'Build technology',
  'Automate operations',
  'Implement AI',
  'Expand internationally',
  'Improve reporting',
  'Something else',
];

export const INITIAL_FORM_DATA: ProjectRequestFormData = {
  openingGoal: 'REVENUE',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: 'United States',
  role: 'Founder',
  companyName: '',
  website: '',
  industry: 'E-commerce',
  businessModel: 'DTC',
  primaryMarket: 'North America',
  targetMarket: 'Global',
  businessSize: '$1M–$5M',
  performanceServices: ['Google Ads', 'Meta Ads'],
  commercePlatforms: ['Shopify'],
  developmentServices: ['Tracking', 'Landing pages'],
  intelligenceServices: ['AI strategy'],
  isNotSureNeeds: false,
  currentPlatforms: ['Shopify', 'Google', 'Meta'],
  currentMarketingChannels: ['Google', 'Meta'],
  currentTeam: 'Internal marketing team',
  currentChallenges: ['Acquisition costs', 'Conversion', 'Tracking'],
  tellUsMore: '',
  primaryGoals: ['More revenue', 'Lower acquisition cost', 'Better ROAS'],
  monthlyMediaAdSpend: '$10K–$25K',
  projectServiceBudget: '$5K–$10K',
  timeline: 'Within 30 days',
  engagementType: 'ONGOING GROWTH PARTNERSHIP',
  referralSource: 'LinkedIn',
  anythingElse: '',
  attachmentName: '',
};

export const SAMPLE_FILLED_FORM_DATA: ProjectRequestFormData = {
  openingGoal: 'REVENUE',
  firstName: 'Alexandra',
  lastName: 'Vance',
  email: 'alexandra@solarisapparel.com',
  phone: '+1 (555) 234-8901',
  country: 'United States',
  role: 'CEO',
  companyName: 'Solaris Apparel Co.',
  website: 'https://solarisapparel.com',
  industry: 'DTC / Consumer',
  businessModel: 'DTC',
  primaryMarket: 'North America',
  targetMarket: 'United States, Canada, UK',
  businessSize: '$1M–$5M',
  performanceServices: ['Google Ads', 'Meta Ads', 'Paid acquisition', 'CRO'],
  commercePlatforms: ['Shopify'],
  developmentServices: ['Landing pages', 'Tracking', 'Analytics'],
  intelligenceServices: ['Growth strategy', 'Analytics'],
  isNotSureNeeds: false,
  currentPlatforms: ['Shopify', 'Meta', 'Google'],
  currentMarketingChannels: ['Meta', 'Google'],
  currentTeam: 'Internal marketing team',
  currentChallenges: ['Acquisition costs', 'Conversion', 'Tracking', 'Scaling'],
  tellUsMore:
    'We have hit a plateau with our paid social performance over the last 2 quarters. CPA has increased 42% while ROAS dropped from 2.8x to 1.6x. We need a modern multi-channel media strategy, server-side GTM attribution, and landing page CRO to unlock our next scaling tier.',
  primaryGoals: [
    'More revenue',
    'Lower acquisition cost',
    'Higher conversion',
    'Better ROAS',
    'Scale existing campaigns',
  ],
  monthlyMediaAdSpend: '$25K–$50K',
  projectServiceBudget: '$10K–$25K',
  timeline: 'Within 30 days',
  engagementType: 'ONGOING GROWTH PARTNERSHIP',
  referralSource: 'LinkedIn',
  anythingElse:
    'We are ready to start immediately once discovery is completed and strategy is aligned.',
  attachmentName: 'solaris_growth_q3_brief.pdf',
};
