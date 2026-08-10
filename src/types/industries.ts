import { CapabilityPillarId } from './capabilities';

export type IndustryCategoryId =
  | 'ecommerce'
  | 'dtc-consumer'
  | 'retail'
  | 'b2b'
  | 'saas-technology'
  | 'professional-services'
  | 'startups'
  | 'marketplaces'
  | 'local-regional';

export type BusinessModelId =
  | 'dtc'
  | 'b2b'
  | 'b2c'
  | 'marketplace'
  | 'subscription'
  | 'lead-generation'
  | 'retail-ecommerce'
  | 'service-firm';

export interface PlatformItem {
  name: string;
  category: 'commerce' | 'advertising' | 'marketplace' | 'crm-tech';
  badge?: string;
}

export interface IndustryCategory {
  id: IndustryCategoryId;
  numberLabel: string; // e.g. "01 / E-COMMERCE"
  title: string;
  tagline: string;
  description: string;
  businessStageOrType: 'Industry' | 'Business Model' | 'Business Stage';
  commonGrowthNeeds: string[];
  primaryCapabilities: CapabilityPillarId[];
  businessModels: string[];
  platforms: PlatformItem[];
  engagementTypes: string[];
  hasRealCaseStudy: boolean;
  sampleCaseStudySummary?: {
    title: string;
    model: string;
    platforms: string[];
    scope: string;
  };
}

export interface NetworkNode {
  id: string;
  label: string;
  type: 'business' | 'model' | 'capability' | 'platform' | 'need';
  category?: string;
  active?: boolean;
}

export interface CaseStudySchemaRef {
  id: string;
  title: string;
  industry: IndustryCategoryId;
  businessModel: BusinessModelId;
  platforms: string[];
  capabilities: CapabilityPillarId[];
  service: string;
  budgetRange: '$5k–15k/mo' | '$15k–35k/mo' | '$35k–75k/mo' | '$75k+/mo';
  geography: 'North America' | 'Europe' | 'Asia Pacific' | 'Global / Multi-Region';
  status: 'ACTIVE_ENGAGEMENT' | 'COMPLETED_SCALE';
}
