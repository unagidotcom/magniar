export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'overview' | 'services' | 'engagement';
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'services',
    question: 'What services does Magniar provide?',
    answer: 'Magniar provides website design and development, WordPress development, Shopify and WooCommerce work, digital marketing, analytics setup, tracking and ongoing website support.',
    category: 'services',
  },
  {
    id: 'outside-gurgaon',
    question: 'Do you work with businesses outside Gurgaon?',
    answer: 'Yes. Magniar is based in Gurgaon, Haryana, India and can work with businesses in other locations through remote project communication and online delivery.',
    category: 'overview',
  },
  {
    id: 'shopify-wordpress',
    question: 'Do you build Shopify and WordPress websites?',
    answer: 'Yes. Magniar works on WordPress, WooCommerce, Shopify and custom websites depending on the business requirement and project scope.',
    category: 'services',
  },
  {
    id: 'ads',
    question: 'Do you manage Meta and Google Ads?',
    answer: 'Yes. Magniar can support Meta Ads and Google Ads setup, campaign management, tracking and performance reporting.',
    category: 'services',
  },
  {
    id: 'cost',
    question: 'How much do your services cost?',
    answer: 'Website and eCommerce work is quoted based on scope. Digital marketing starts at INR 5,000 per month or 30% of monthly advertising spend. Maintenance is priced monthly based on support needs.',
    category: 'engagement',
  },
  {
    id: 'project-start',
    question: 'How do projects begin?',
    answer: 'Start by submitting the project form. Magniar reviews the request, clarifies scope and then confirms the next step before any paid work begins.',
    category: 'engagement',
  },
];
