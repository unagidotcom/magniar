export interface DisciplineNode {
  id: 'performance' | 'commerce' | 'development' | 'intelligence';
  numberLabel: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  connections: ('performance' | 'commerce' | 'development' | 'intelligence')[];
  href: string;
}

export interface ThinkingPrinciple {
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface PlatformItem {
  id: string;
  name: string;
  category: 'Paid Acquisition' | 'Commerce & Storefronts' | 'Marketplaces & Social';
  region: 'Global' | 'Americas' | 'EMEA' | 'APAC' | 'Cross-Border';
  description: string;
  techTag: string;
}

export interface FounderProfile {
  id: string;
  name?: string;
  role?: string;
  bio?: string;
  photoUrl?: string;
  linkedinUrl?: string;
  quote?: string;
  isPlaceholder: boolean;
}

export interface DifferentiatorItem {
  number: string;
  title: string;
  shortDesc: string;
  detail: string;
}

export interface ValuePrinciple {
  id: string;
  title: string;
  subtitle: string;
  description: string;
}
