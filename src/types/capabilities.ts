export type CapabilityPillarId = 'performance' | 'commerce' | 'development' | 'intelligence';

export interface ServiceItem {
  id: string;
  title: string;
  pillarId: CapabilityPillarId;
  oneLiner: string;
  description: string;
  includes: string[];
  platforms: string[];
  targetAudience: string;
  ctaText: string;
  featured?: boolean;
  order?: number;
  status?: 'active' | 'draft';
}

export interface CapabilityPillar {
  id: CapabilityPillarId;
  numberLabel: string; // e.g. '01 / PERFORMANCE'
  title: string;
  tagline: string;
  description: string;
  statement: string;
  platforms: string[];
  services: ServiceItem[];
  featuredServices: string[];
}

export interface ConnectedLoopStep {
  id: string;
  stepNumber: string;
  label: string;
  description: string;
  pillarId: CapabilityPillarId;
  outputSignal: string;
}

export interface BusinessJourneyExample {
  title: string;
  businessType: string;
  challenge: string;
  solutionPillars: CapabilityPillarId[];
  componentsUsed: string[];
  systemOutcome: string;
}
