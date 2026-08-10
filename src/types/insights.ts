export type InsightCategoryId =
  | 'performance'
  | 'commerce'
  | 'development'
  | 'intelligence'
  | 'strategy'
  | 'observations';

export type InsightCategoryFilter = 'all' | InsightCategoryId;

export type InsightContentType =
  | 'ARTICLE'
  | 'GUIDE'
  | 'ANALYSIS'
  | 'PLAYBOOK'
  | 'REPORT'
  | 'FRAMEWORK'
  | 'OBSERVATION'
  | 'EXPERIMENT'
  | 'OPINION'
  | 'STRATEGY'
  | 'RESOURCE';

export type InsightContentTypeFilter = 'all' | InsightContentType;

export interface InsightAuthor {
  name: string;
  role: string;
  bio?: string;
  avatarUrl?: string;
}

export interface InsightDataPoint {
  label: string;
  value: string;
  change?: string;
  badge?: string;
}

export interface InsightContentSection {
  id: string;
  heading: string;
  paragraphs: string[];
  calloutQuote?: string;
  codeBlock?: {
    language: string;
    code: string;
  };
  dataCallout?: {
    label: string;
    metric: string;
    description: string;
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
  visualGraphic?: {
    type: 'chart' | 'flow' | 'metric_grid';
    title: string;
    dataPoints: InsightDataPoint[];
  };
}

export interface InsightArticle {
  id: string;
  slug: string;
  contentType: InsightContentType;
  category: InsightCategoryId;
  title: string;
  subtitle: string;
  excerpt: string;
  readTimeDisplay: string;
  publishedDateDisplay: string;
  publishedAtIso: string;
  author: InsightAuthor;
  featured: boolean;
  isDemoData: boolean; // Prototype verification: marked as demo content
  tags: string[];
  capabilityId?: string;
  serviceUsed?: string;
  platform?: string;
  relatedCaseStudySlug?: string;
  ctaConfig?: {
    title: string;
    buttonText: string;
    targetTab: 'capabilities' | 'process' | 'industries' | 'work' | 'start';
  };
  keyTakeaways: string[];
  toc: { id: string; title: string }[];
  sections: InsightContentSection[];
}

export interface InsightFilterState {
  category: InsightCategoryFilter;
  contentType: InsightContentTypeFilter;
  searchQuery: string;
}
