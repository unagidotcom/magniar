import { CapabilityGroup, NavLink, FooterColumn } from '../types/navigation';

export const PRIMARY_NAV_LINKS: NavLink[] = [
  { id: 'capabilities', label: 'Capabilities', href: '#capabilities', hasMegaMenu: true },
  { id: 'work', label: 'Work', href: '#work' },
  { id: 'insights', label: 'Insights', href: '#insights' },
  { id: 'about', label: 'About', href: '#about' },
];

export const MOBILE_NAV_LINKS: NavLink[] = [
  { id: 'capabilities', label: 'Capabilities', href: '#capabilities', hasMegaMenu: true },
  { id: 'work', label: 'Work', href: '#work' },
  { id: 'insights', label: 'Insights', href: '#insights' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'process', label: 'Process', href: '#process' },
  { id: 'industries', label: 'Industries', href: '#industries' },
];

export const CAPABILITY_GROUPS: CapabilityGroup[] = [
  {
    id: 'performance',
    numberLabel: '01 / PERFORMANCE',
    title: 'Performance Marketing',
    summary: 'Data-driven acquisition across global paid channels.',
    items: [
      { name: 'Google Ads', description: 'Search, Shopping, Display & Performance Max scale.' },
      { name: 'Meta Ads', description: 'Facebook & Instagram automated creative funnels.' },
      { name: 'TikTok Ads', description: 'Short-form viral commerce & impulse acquisition.' },
      { name: 'LinkedIn Ads', description: 'B2B enterprise pipeline and high-ACV targeting.' },
      { name: 'Native Advertising', description: 'Outbrain & Taboola editorial programmatic scale.' },
    ]
  },
  {
    id: 'commerce',
    numberLabel: '02 / COMMERCE',
    title: 'Digital Commerce',
    summary: 'Build and scale high-converting storefronts & marketplaces.',
    items: [
      { name: 'Shopify & Shopify Plus', description: 'Custom headless & theme architecture.' },
      { name: 'WooCommerce & WordPress', description: 'Flexible open-source enterprise stores.' },
      { name: 'Amazon Marketplace', description: 'FBA optimization, A+ content & PPC ads.' },
      { name: 'Walmart & Target Marketplaces', description: 'Omnichannel retail presence & inventory sync.' },
      { name: 'TikTok Shop, Etsy, eBay & Meesho', description: 'Global social commerce & cross-border selling.' },
    ]
  },
  {
    id: 'technology',
    numberLabel: '03 / TECHNOLOGY',
    title: 'Growth Infrastructure',
    summary: 'Engineered web systems, tracking & integrations.',
    items: [
      { name: 'Custom Web Development', description: 'Fast, responsive Next.js & React applications.' },
      { name: 'Analytics & Server GTM', description: 'Precision multi-touch attribution & server-side tracking.' },
      { name: 'API & Commerce Integrations', description: 'Custom CRM, ERP & platform webhooks.' },
      { name: 'Conversion Automation', description: 'Behavioral triggers & funnel optimization.' },
    ]
  },
  {
    id: 'intelligence',
    numberLabel: '04 / INTELLIGENCE',
    title: 'AI & Data Strategy',
    summary: 'Transform workflows and decision-making with custom AI.',
    items: [
      { name: 'AI Strategy & Growth Architecture', description: 'Custom roadmap for enterprise AI adoption.' },
      { name: 'Automated AI Workflows', description: 'LLM-powered creative & ops automation.' },
      { name: 'Performance Intelligence', description: 'Predictive LTV, CPA & ROAS modeling.' },
      { name: 'AI-Assisted Marketing Systems', description: 'Dynamic campaign synthesis & ad generation.' },
    ]
  }
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'CAPABILITIES',
    numberLabel: '01',
    links: [
      { label: 'Performance Marketing', href: '#capabilities' },
      { label: 'Digital Commerce', href: '#capabilities' },
      { label: 'Growth Technology', href: '#capabilities' },
      { label: 'AI & Data Strategy', href: '#capabilities' },
    ]
  },
  {
    title: 'PLATFORMS',
    numberLabel: '02',
    links: [
      { label: 'Google Ads & Shopping', href: '#platforms' },
      { label: 'Meta (FB / IG)', href: '#platforms' },
      { label: 'TikTok Shop & Ads', href: '#platforms' },
      { label: 'Shopify & WooCommerce', href: '#platforms' },
      { label: 'Amazon & Walmart', href: '#platforms' },
    ]
  },
  {
    title: 'COMPANY',
    numberLabel: '03',
    links: [
      { label: 'Process', href: '#process' },
      { label: 'Growth Lab', href: '#growth-lab' },
      { label: 'About Magniar', href: '#about' },
      { label: 'Start a Project', href: '#start' },
    ]
  },
  {
    title: 'CLIENT WORKSPACE',
    numberLabel: '04',
    links: [
      { label: 'Client Login', href: '/portal' },
      { label: 'Portal Dashboard', href: '/admin/login' },
      { label: 'Performance Reports', href: '/portal' },
      { label: 'Invoices & Billing', href: '/portal' },
    ]
  }
];
