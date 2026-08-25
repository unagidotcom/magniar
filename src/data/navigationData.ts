import { CapabilityGroup, NavLink, FooterColumn } from '../types/navigation';

export const PRIMARY_NAV_LINKS: NavLink[] = [
  { id: 'services', label: 'Services', href: '#services', hasMegaMenu: true },
  { id: 'work', label: 'Work', href: '#work' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'insights', label: 'Insights', href: '#insights' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const MOBILE_NAV_LINKS: NavLink[] = [
  { id: 'services', label: 'Services', href: '#services', hasMegaMenu: true },
  { id: 'work', label: 'Work', href: '#work' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'insights', label: 'Insights', href: '#insights' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const CAPABILITY_GROUPS: CapabilityGroup[] = [
  {
    id: 'websites',
    numberLabel: '01 / WEBSITES',
    title: 'Websites',
    summary: 'Business websites, WordPress builds and landing pages.',
    items: [
      { name: 'Website Design & Development', description: 'Modern websites designed for clarity and conversion.' },
      { name: 'WordPress', description: 'Flexible WordPress sites with practical editing workflows.' },
      { name: 'Custom Websites', description: 'Tailored web experiences for specific business needs.' },
      { name: 'Landing Pages', description: 'Focused pages for campaigns, launches and lead generation.' },
    ]
  },
  {
    id: 'ecommerce',
    numberLabel: '02 / ECOMMERCE',
    title: 'eCommerce',
    summary: 'Shopify, WooCommerce and conversion-focused storefronts.',
    items: [
      { name: 'Shopify', description: 'Custom Shopify setup, theme work and store improvements.' },
      { name: 'WooCommerce', description: 'WordPress commerce builds and practical store management.' },
      { name: 'eCommerce Development', description: 'Product, checkout and catalog experiences.' },
      { name: 'Storefront Optimization', description: 'Cleaner shopping journeys and conversion-focused improvements.' },
    ]
  },
  {
    id: 'marketing',
    numberLabel: '03 / MARKETING',
    title: 'Marketing',
    summary: 'Meta Ads, Google Ads, analytics and campaign management.',
    items: [
      { name: 'Meta Ads', description: 'Facebook and Instagram campaign setup and management.' },
      { name: 'Google Ads', description: 'Search and paid traffic campaigns for demand capture.' },
      { name: 'Analytics & Tracking', description: 'Measurement setup for websites, campaigns and conversions.' },
      { name: 'Campaign Management', description: 'Ongoing optimization and reporting for active accounts.' },
    ]
  },
  {
    id: 'maintenance',
    numberLabel: '04 / MAINTENANCE',
    title: 'Maintenance',
    summary: 'Website care, performance, support and ongoing updates.',
    items: [
      { name: 'Website Care', description: 'Routine updates and support for active websites.' },
      { name: 'Performance', description: 'Speed, stability and technical quality improvements.' },
      { name: 'Technical Support', description: 'Help with website issues, fixes and platform questions.' },
      { name: 'Ongoing Updates', description: 'Content, feature and maintenance changes as needs evolve.' },
    ]
  }
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'SERVICES',
    numberLabel: '01',
    links: [
      { label: 'Websites', href: '#services' },
      { label: 'eCommerce', href: '#services' },
      { label: 'Marketing', href: '#services' },
      { label: 'Maintenance', href: '#services' },
    ]
  },
  {
    title: 'COMPANY',
    numberLabel: '02',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Work', href: '#work' },
      { label: 'Insights', href: '#insights' },
      { label: 'Contact', href: '#contact' },
    ]
  },
  {
    title: 'LEGAL',
    numberLabel: '03',
    links: [
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms & Conditions', href: '#terms' },
      { label: 'Cancellation & Refund Policy', href: '#refund-policy' },
    ]
  },
  {
    title: 'START',
    numberLabel: '04',
    links: [
      { label: 'Start a Project', href: '#start' },
      { label: 'Client Login', href: '/portal' },
    ]
  }
];
