export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'overview' | 'services' | 'engagement';
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'business-size',
    question: 'What size businesses do you work with?',
    answer: 'Magniar works primarily with small businesses, mid-sized companies, ecommerce brands, growing digital services, and B2B companies looking for a unified marketing and technical execution partner.',
    category: 'overview',
  },
  {
    id: 'international',
    question: 'Do you work internationally?',
    answer: 'Yes. Magniar operates internationally across North America, Europe, United Kingdom, APAC, and LATAM markets, developing cross-border advertising campaigns and multi-currency ecommerce architectures.',
    category: 'overview',
  },
  {
    id: 'paid-ads',
    question: 'Do you manage paid advertising?',
    answer: 'Yes. We engineer and execute paid acquisition strategies across Google Ads, Meta Ads (Facebook & Instagram), TikTok Ads, LinkedIn Ads, and Native programmatic platforms.',
    category: 'services',
  },
  {
    id: 'web-development',
    question: 'Do you build websites?',
    answer: 'Yes. We design and develop custom websites, high-converting landing pages, web applications, and conversion systems built on modern frontend stacks (React, Next.js, Node.js).',
    category: 'services',
  },
  {
    id: 'ecommerce-platforms',
    question: 'Do you work with Shopify and WooCommerce?',
    answer: 'Yes. We specialize in storefront development, custom theme/app customization, and conversion rate optimization for both Shopify/Shopify Plus and WooCommerce.',
    category: 'services',
  },
  {
    id: 'marketplace-growth',
    question: 'Can you manage marketplace growth?',
    answer: 'Yes. We optimize seller presence, PPC advertising, and fulfillment catalog integrations across Amazon, Walmart, TikTok Shop, Etsy, eBay, and Meesho.',
    category: 'services',
  },
  {
    id: 'ai-strategy',
    question: 'Do you work with AI strategy?',
    answer: 'Yes. We help companies identify operational leverage, build automated AI workflows, map growth opportunities, and integrate AI strategy directly into their marketing and technology operations.',
    category: 'services',
  },
  {
    id: 'project-start',
    question: 'How do projects begin?',
    answer: 'Projects begin with a discovery intake through our Start a Project form, followed by an alignment call to evaluate your current setup, goals, constraints, and custom roadmap.',
    category: 'engagement',
  },
  {
    id: 'budgets',
    question: 'What budgets do you work with?',
    answer: 'We work with flexible project and monthly marketing budget tiers starting from under $2,500 up to $50,000+ per month, tailored to client size and campaign scale.',
    category: 'engagement',
  },
  {
    id: 'retainers',
    question: 'Do you offer ongoing retainers?',
    answer: 'Yes. We offer both structured monthly growth retainers for continuous media buying, development and optimization, as well as standalone fixed-scope engineering or strategy projects.',
    category: 'engagement',
  },
];
