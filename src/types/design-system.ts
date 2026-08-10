export interface ColorToken {
  name: string;
  variable: string;
  hex: string;
  rgb?: string;
  description: string;
  category: 'base' | 'surface' | 'text' | 'border' | 'accent' | 'semantic';
  contrastRatioOnBg?: string;
  usageRole: string;
}

export interface TypographyScaleItem {
  token: string;
  name: string;
  clampValue: string;
  fallbackSize: string;
  weight: string;
  letterSpacing: string;
  sampleText: string;
  usageContext: string;
}

export interface SpacingToken {
  name: string;
  token: string;
  pxValue: number;
  remValue: string;
  usage: string;
}

export interface RadiusToken {
  name: string;
  token: string;
  pxValue: number;
  remValue: string;
  usage: string;
  mathematicalRule?: string;
}

export interface MotionToken {
  token: string;
  name: string;
  duration: string;
  easing: string;
  usage: string;
}

export interface MicroTypographyItem {
  category: string;
  codeSnippet: string;
  renderedText: string;
  context: string;
}

export interface SignalMotifItem {
  id: string;
  title: string;
  asciiVariant: string;
  description: string;
  componentType: 'dot' | 'line' | 'badge' | 'scan';
}

export interface DoDontRule {
  id: number;
  category: string;
  ruleTitle: string;
  doText: string;
  dontText: string;
  doVisualNote: string;
  dontVisualNote: string;
}

export type SectionTab = 
  | 'overview'
  | 'colors'
  | 'typography'
  | 'grid-layout'
  | 'spacing-radius'
  | 'motion'
  | 'dataviz'
  | 'signals'
  | 'dodont'
  | 'exporter'
  | 'full-spec';
