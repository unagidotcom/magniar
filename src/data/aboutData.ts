import {
  DisciplineNode,
  ThinkingPrinciple,
  PlatformItem,
  FounderProfile,
  DifferentiatorItem,
  ValuePrinciple,
} from '../types/about';

export const DISCIPLINE_NODES: DisciplineNode[] = [
  {
    id: 'performance',
    numberLabel: '01',
    title: 'PERFORMANCE',
    tagline: 'Paid Acquisition & Demand Generation',
    description: 'Create demand and acquire high-intent customers through measurable global paid channels.',
    capabilities: ['Google Ads & Search', 'Meta Paid Social', 'TikTok Commerce Ads', 'LinkedIn B2B Pipeline', 'Programmatic Native'],
    connections: ['commerce', 'development', 'intelligence'],
    href: '#capabilities',
  },
  {
    id: 'commerce',
    numberLabel: '02',
    title: 'COMMERCE',
    tagline: 'Storefronts & Global Marketplaces',
    description: 'Build the digital systems customers use to discover, evaluate and purchase products seamlessly.',
    capabilities: ['Shopify & Shopify Plus', 'WooCommerce Enterprise', 'Amazon FBA & Brand Store', 'Walmart & Target Marketplaces', 'TikTok Shop & Social Selling'],
    connections: ['performance', 'development', 'intelligence'],
    href: '#capabilities',
  },
  {
    id: 'development',
    numberLabel: '03',
    title: 'DEVELOPMENT',
    tagline: 'Engineering & Conversion Infrastructure',
    description: 'Build the fast, resilient technical infrastructure that makes customer experiences conversion-focused.',
    capabilities: ['Custom React & Web Apps', 'Server-Side GTM & Analytics', 'Commerce API Integrations', 'Conversion Automation', 'Speed & UX Hardening'],
    connections: ['performance', 'commerce', 'intelligence'],
    href: '#capabilities',
  },
  {
    id: 'intelligence',
    numberLabel: '04',
    title: 'INTELLIGENCE',
    tagline: 'AI Strategy & Predictive Analytics',
    description: 'Use data, automated workflows, and AI systems to improve operational decisions and execution speed.',
    capabilities: ['AI Growth Strategy', 'Automated LLM Workflows', 'Attribution & LTV Modeling', 'Predictive CPA Optimization', 'Operations Intelligence'],
    connections: ['performance', 'commerce', 'development'],
    href: '#capabilities',
  },
];

export const THINKING_PRINCIPLES: ThinkingPrinciple[] = [
  {
    number: '01',
    title: 'START WITH THE BUSINESS',
    subtitle: 'Not the channel or ad unit.',
    description: 'We diagnose unit economics, margin constraints, and supply capabilities before choosing tools or channels.',
  },
  {
    number: '02',
    title: 'FOLLOW THE ECONOMICS',
    subtitle: 'Revenue, margin, CAC & efficiency.',
    description: 'Top-line traffic without contribution margin is vanity. We anchor strategy on true net profitability.',
  },
  {
    number: '03',
    title: 'BUILD BEFORE YOU SCALE',
    subtitle: 'Fix broken infrastructure first.',
    description: 'Broken funnels, missing server analytics, and slow site speed cannot be saved by throwing more ad spend at them.',
  },
  {
    number: '04',
    title: 'MEASURE WHAT MATTERS',
    subtitle: 'Decision metrics over vanity dashboards.',
    description: 'We track real customer acquisition costs, multi-touch attribution, and retention value—not impression fluff.',
  },
  {
    number: '05',
    title: 'USE AI WHERE IT CREATES LEVERAGE',
    subtitle: 'Practical speed and insight, not buzzwords.',
    description: 'AI should remove manual operational friction, accelerate creative iteration, and surface clear decisions.',
  },
  {
    number: '06',
    title: 'KEEP THE SYSTEM CONNECTED',
    subtitle: 'Silos fragment the customer experience.',
    description: 'Marketing, commerce technology, and data analytics must operate as a singular unified engine.',
  },
];

export const PLATFORM_ITEMS: PlatformItem[] = [
  {
    id: 'google',
    name: 'Google Ads & Shopping',
    category: 'Paid Acquisition',
    region: 'Global',
    description: 'Search, Shopping, YouTube & Performance Max campaigns engineered for intent capture.',
    techTag: 'GAds API / PMax',
  },
  {
    id: 'meta',
    name: 'Meta Ads (FB & IG)',
    category: 'Paid Acquisition',
    region: 'Global',
    description: 'Automated creative testing, CAPI integration, and Advantage+ shopping scaling.',
    techTag: 'Meta CAPI / Advantage+',
  },
  {
    id: 'tiktok',
    name: 'TikTok Ads & Shop',
    category: 'Marketplaces & Social',
    region: 'Global',
    description: 'Short-form viral media, creator partnerships, and native in-app checkout funnels.',
    techTag: 'TT Commerce / Spark',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Ads',
    category: 'Paid Acquisition',
    region: 'Global',
    description: 'ABM targeting, high-ACV lead generation, and executive decision-maker pipeline.',
    techTag: 'B2B Pipeline',
  },
  {
    id: 'shopify',
    name: 'Shopify & Shopify Plus',
    category: 'Commerce & Storefronts',
    region: 'Global',
    description: 'Custom liquid/headless storefronts, checkout extensions, and ERP synchronization.',
    techTag: 'Shopify Liquid / Storefront API',
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce & WP',
    category: 'Commerce & Storefronts',
    region: 'Global',
    description: 'High-volume open-source commerce architecture with custom API integrations.',
    techTag: 'WooCommerce REST / GraphQL',
  },
  {
    id: 'amazon',
    name: 'Amazon Marketplace',
    category: 'Marketplaces & Social',
    region: 'Global',
    description: 'FBA catalog management, A+ Content, Sponsored Products, and DSP advertising.',
    techTag: 'Amazon SP-API / DSP',
  },
  {
    id: 'walmart',
    name: 'Walmart Marketplace',
    category: 'Marketplaces & Social',
    region: 'Americas',
    description: 'Omnichannel retail presence, WFS fulfillment setup, and Walmart Connect ads.',
    techTag: 'Walmart Marketplace API',
  },
  {
    id: 'etsy-ebay',
    name: 'Etsy & eBay Global',
    category: 'Marketplaces & Social',
    region: 'Global',
    description: 'Cross-border artisan and multi-category marketplace store management.',
    techTag: 'Multi-Store Sync',
  },
  {
    id: 'meesho',
    name: 'Meesho & Social Commerce',
    category: 'Marketplaces & Social',
    region: 'Cross-Border',
    description: 'Emerging market direct-to-consumer reseller and social distribution.',
    techTag: 'Regional Marketplace',
  },
];

export const FOUNDER_PLACEHOLDER: FounderProfile = {
  id: 'founder-magniar',
  isPlaceholder: true,
  name: undefined,
  role: undefined,
  bio: undefined,
  photoUrl: undefined,
  linkedinUrl: undefined,
  quote: undefined,
};

export const MAGNIAR_DIFFERENTIATORS: DifferentiatorItem[] = [
  {
    number: '01',
    title: 'MULTIDISCIPLINARY ENGINE',
    shortDesc: 'Marketing + Development + Commerce + AI',
    detail: 'We eliminate handoff friction between ad managers, developers, and data analysts by operating under a unified technical playbook.',
  },
  {
    number: '02',
    title: 'BUSINESS-LED ARCHITECTURE',
    shortDesc: 'Starting with business economics, not ad packages',
    detail: 'Every campaign structure or technical build is dictated by your margins, LTV requirements, and supply chain constraints.',
  },
  {
    number: '03',
    title: 'MEASURABLE INFRASTRUCTURE',
    shortDesc: 'Server-side attribution & decision data',
    detail: 'We don’t rely on platform-reported inflated metrics. We deploy first-party server tracking so you know your exact net contribution.',
  },
  {
    number: '04',
    title: 'DEEP TECHNICAL RIGOR',
    shortDesc: 'Engineers who understand performance marketing',
    detail: 'Our developers understand conversion rates, page load latency, GTM server containers, and ad algorithm feed optimization.',
  },
  {
    number: '05',
    title: 'ADAPTABLE PARTNERSHIP MODEL',
    shortDesc: 'Tailored around your growth constraints',
    detail: 'No rigid, one-size-fits-all retainer templates. We adapt our sprint scope directly to where your growth system experiences friction.',
  },
];

export const VALUE_PRINCIPLES: ValuePrinciple[] = [
  {
    id: 'systems-silos',
    title: 'SYSTEMS OVER SILOS',
    subtitle: 'The customer experiences one unified brand, not four separate departments.',
    description: 'Marketing, commerce, technology, and intelligence shouldn’t operate as isolated islands. Connected workflows yield exponential growth.',
  },
  {
    id: 'business-first',
    title: 'BUSINESS FIRST',
    subtitle: 'Prioritize unit economics and long-term business enterprise value.',
    description: 'We don’t chase superficial vanity metrics that look good on a slide deck but leave bank accounts empty.',
  },
  {
    id: 'clarity-complexity',
    title: 'CLARITY OVER COMPLEXITY',
    subtitle: 'Simple, well-engineered systems out-execute convoluted setups.',
    description: 'We strip away unnecessary noise, over-engineered tech stacks, and redundant agency fluff.',
  },
  {
    id: 'measure-matters',
    title: 'MEASURE WHAT MATTERS',
    subtitle: 'Data exists to inform high-stakes business choices.',
    description: 'If a metric cannot influence an operational decision or budget allocation, it does not belong in our reports.',
  },
  {
    id: 'build-leverage',
    title: 'BUILD FOR LEVERAGE',
    subtitle: 'Deploy automation and AI where it compounds human output.',
    description: 'We treat technology as a force multiplier—speeding up research, creative testing, and execution loops.',
  },
  {
    id: 'continuous-improvement',
    title: 'CONTINUOUS EVOLUTION',
    subtitle: 'Digital growth requires perpetual iteration and testing.',
    description: 'Markets shift rapidly. Our systems are built to test, learn, refine, and redeploy on continuous sprints.',
  },
];

export const COMPACT_PROCESS_STEPS = [
  { step: '01', title: 'DIAGNOSE', desc: 'Audit unit economics, tracking integrity, and funnel leaks.' },
  { step: '02', title: 'BUILD', desc: 'Engineer storefronts, server containers, and campaign structures.' },
  { step: '03', title: 'ACTIVATE', desc: 'Launch targeted performance ads and social marketplace channels.' },
  { step: '04', title: 'MEASURE', desc: 'Track real net contribution margin and multi-touch attribution.' },
  { step: '05', title: 'EVOLVE', desc: 'Iterate creative, optimize funnels, and scale high-margin paths.' },
];
