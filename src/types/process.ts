export type ProcessStageId =
  | 'discover'
  | 'diagnose'
  | 'strategize'
  | 'build'
  | 'launch'
  | 'measure'
  | 'optimize'
  | 'scale';

export interface ProcessStage {
  id: ProcessStageId;
  number: string;
  name: string;
  tagline: string;
  purpose: string;
  shortDescription: string;
  fullDescription: string;
  includes: string[];
  output: string;
  questionsAnswered: string[];
  magniarRole: string[];
  clientRole: string[];
  capabilityLinks: {
    capabilityId: string;
    capabilityName: string;
    description: string;
  }[];
}

export interface EngagementModelItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bestFor: string;
  typicalDeliverables: string[];
  structure: string;
}

export interface ExampleJourneyStep {
  stageId: ProcessStageId;
  stageName: string;
  action: string;
  outcome: string;
}

export interface ExampleJourney {
  title: string;
  clientType: string;
  challenge: string;
  steps: ExampleJourneyStep[];
  disclaimer: string;
}
