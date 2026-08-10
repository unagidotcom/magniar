import { CapabilityPillar, ConnectedLoopStep, BusinessJourneyExample } from '../types/capabilities';

export const CAPABILITY_PILLARS: CapabilityPillar[] = [
  {
    id: 'performance',
    numberLabel: '01 / PERFORMANCE',
    title: 'PERFORMANCE',
    tagline: 'Paid Acquisition & Customer Demand Generation',
    description: 'Performance marketing focused on acquiring customers, generating demand and improving marketing efficiency across global channels.',
    statement: 'TURN ATTENTION INTO MEASURABLE DEMAND.',
    platforms: ['Google Ads', 'Meta Ads', 'TikTok Ads', 'LinkedIn Ads', 'Native Advertising'],
    featuredServices: ['Paid Search', 'Paid Social', 'Native Advertising', 'Audience & Creative', 'Conversion & Attribution'],
    services: [
      {
        id: 'paid-search',
        title: 'PAID SEARCH & SHOPPING',
        pillarId: 'performance',
        oneLiner: 'High-intent search and shopping campaigns engineered for profit economics.',
        description: 'Scalable paid search, Google Shopping, Performance Max and remarketing structures built for maximum acquisition efficiency.',
        includes: ['Search Campaigns', 'Google Shopping & Feeds', 'Performance Max', 'Brand Protection & Conquesting', 'Remarketing Systems'],
        platforms: ['Google Ads', 'Microsoft Advertising'],
        targetAudience: 'E-commerce brands and high-intent lead generation businesses.',
        ctaText: 'DISCUSS PAID SEARCH →',
        featured: true,
        order: 1,
        status: 'active'
      },
      {
        id: 'paid-social',
        title: 'PAID SOCIAL ACQUISITION',
        pillarId: 'performance',
        oneLiner: 'Full-funnel paid social campaigns driving first-time and repeat customer growth.',
        description: 'Predictable paid social funnels across Meta, TikTok, and LinkedIn with rapid creative testing and audience segmentation.',
        includes: ['Meta (FB/IG) Funnels', 'TikTok Performance Ads', 'LinkedIn B2B Pipeline', 'Retargeting Sequences', 'Dynamic Product Ads'],
        platforms: ['Meta Ads', 'TikTok Ads', 'LinkedIn Ads'],
        targetAudience: 'DTC brands, B2B enterprises, and digital commerce companies.',
        ctaText: 'DISCUSS PAID SOCIAL →',
        featured: true,
        order: 2,
        status: 'active'
      },
      {
        id: 'native-advertising',
        title: 'NATIVE ADVERTISING & DISCOVERY',
        pillarId: 'performance',
        oneLiner: 'Editorial discovery ads tapping into premium high-volume publisher inventory.',
        description: 'High-converting native editorial funnels that scale customer acquisition beyond traditional search and social feeds.',
        includes: ['Outbrain & Taboola Campaigns', 'Editorial Advertorial Strategy', 'Content Discovery Funnels', 'Publisher Retargeting'],
        platforms: ['Outbrain', 'Taboola', 'Yahoo Native'],
        targetAudience: 'High-scale consumer products, subscriptions, and lead-gen offers.',
        ctaText: 'DISCUSS NATIVE ADS →',
        featured: false,
        order: 3,
        status: 'active'
      },
      {
        id: 'audience-creative',
        title: 'AUDIENCE & CREATIVE STRATEGY',
        pillarId: 'performance',
        oneLiner: 'Systematic creative testing and audience positioning built for high ad velocity.',
        description: 'Data-driven ad creative direction, messaging frameworks, and audience hypothesis testing to combat creative fatigue.',
        includes: ['Creative Testing Frameworks', 'Messaging Strategy', 'Audience Segmentation', 'Landing Page Direction', 'Hook & Angle Development'],
        platforms: ['All Paid Channels'],
        targetAudience: 'Brands scaling past initial ad fatigue into multi-million ad spends.',
        ctaText: 'DISCUSS CREATIVE STRATEGY →',
        featured: true,
        order: 4,
        status: 'active'
      },
      {
        id: 'conversion-attribution',
        title: 'ATTRIBUTION & CAMPAIGN OPTIMIZATION',
        pillarId: 'performance',
        oneLiner: 'Server-side tracking and attribution models guiding real-time budget allocation.',
        description: 'Precision campaign auditing, conversion rate optimization, and server-side tracking to ensure true acquisition ROI.',
        includes: ['Multi-Touch Attribution', 'Conversion Rate Optimization', 'Landing Page Audits', 'Creative Fatigue Monitoring', 'Budget Pacing Systems'],
        platforms: ['Google Tag Manager', 'Server GTM', 'Custom Attribution'],
        targetAudience: 'Businesses managing complex multi-channel marketing budgets.',
        ctaText: 'DISCUSS ATTRIBUTION →',
        featured: false,
        order: 5,
        status: 'active'
      }
    ]
  },
  {
    id: 'commerce',
    numberLabel: '02 / COMMERCE',
    title: 'COMMERCE',
    tagline: 'Digital Storefronts & Multi-Channel Marketplace Systems',
    description: 'Building and optimizing digital commerce systems and marketplace channels that turn traffic into loyal customers.',
    statement: 'BUILD THE SYSTEM THAT TURNS TRAFFIC INTO CUSTOMERS.',
    platforms: ['Shopify', 'WooCommerce', 'Amazon', 'Walmart', 'TikTok Shop', 'Etsy', 'eBay', 'Meesho'],
    featuredServices: ['Store Architecture', 'Shopify & Woo Dev', 'Marketplace Strategy', 'Catalog & Feeds', 'Checkout Optimization'],
    services: [
      {
        id: 'store-architecture',
        title: 'STORE STRATEGY & ARCHITECTURE',
        pillarId: 'commerce',
        oneLiner: 'Strategic digital commerce blueprints built for high conversion and lifetime value.',
        description: 'Comprehensive store audits, user journey mapping, and conversion-first site architecture tailored to your catalog complexity.',
        includes: ['E-commerce Strategy', 'UX/UI Wireframing', 'Category & Navigation Design', 'Catalog Structuring', 'LTV & Repeat Purchase Models'],
        platforms: ['Shopify', 'WooCommerce', 'Custom Headless'],
        targetAudience: 'Brands scaling storefront operations or migrating platform stacks.',
        ctaText: 'DISCUSS STORE STRATEGY →',
        featured: true,
        order: 1,
        status: 'active'
      },
      {
        id: 'shopify-woocommerce',
        title: 'SHOPIFY & WOOCOMMERCE DEVELOPMENT',
        pillarId: 'commerce',
        oneLiner: 'Custom e-commerce storefront development engineered for speed and usability.',
        description: 'Tailored theme development, app integrations, custom checkout flows, and headless commerce builds on leading store engines.',
        includes: ['Custom Theme Development', 'Headless Commerce Architecture', 'App Integration & Customization', 'Checkout Customization', 'Site Speed Optimization'],
        platforms: ['Shopify & Shopify Plus', 'WooCommerce'],
        targetAudience: 'Fast-growing brands demanding custom store functionality.',
        ctaText: 'DISCUSS STORE DEVELOPMENT →',
        featured: true,
        order: 2,
        status: 'active'
      },
      {
        id: 'marketplace-strategy',
        title: 'MARKETPLACE STRATEGY & GROWTH',
        pillarId: 'commerce',
        oneLiner: 'End-to-end marketplace expansion across Amazon, Walmart, and global platforms.',
        description: 'Marketplace channel setup, brand registry, sponsored ads management, listing optimization, and cross-border selling.',
        includes: ['Amazon FBA Strategy', 'Walmart Retail Network', 'Etsy & eBay Storefronts', 'Social Commerce (TikTok Shop)', 'Sponsored Ads Management'],
        platforms: ['Amazon', 'Walmart', 'TikTok Shop', 'Etsy', 'eBay', 'Meesho'],
        targetAudience: 'Brands diversifying revenue outside owned web channels.',
        ctaText: 'DISCUSS MARKETPLACES →',
        featured: true,
        order: 3,
        status: 'active'
      },
      {
        id: 'catalog-feeds',
        title: 'CATALOG & PRODUCT FEED MANAGEMENT',
        pillarId: 'commerce',
        oneLiner: 'Synchronized product feeds powering seamless multi-channel advertising.',
        description: 'Unified product data pipelines ensuring accurate inventory, price sync, and optimized titles across search and social channels.',
        includes: ['Google Merchant Center Feeds', 'Meta Commerce Catalogs', 'TikTok Product Sync', 'Cross-Channel Inventory Mapping', 'Dynamic Product Data Enrichment'],
        platforms: ['Feedonomics', 'Google Merchant Center', 'Meta Commerce'],
        targetAudience: 'Retailers with large product catalogs or frequent inventory updates.',
        ctaText: 'DISCUSS FEED MANAGEMENT →',
        featured: false,
        order: 4,
        status: 'active'
      },
      {
        id: 'commerce-cro',
        title: 'CHECKOUT & CONVERSION OPTIMIZATION',
        pillarId: 'commerce',
        oneLiner: 'Frictionless checkout experiences driving higher average order value and completion rates.',
        description: 'Data-led checkout tuning, payment gateway optimization, post-purchase upsells, and cart abandonment recovery systems.',
        includes: ['Checkout Friction Analysis', 'Payment Gateway Integration', 'Post-Purchase Upsells', 'Cart Abandonment Flows', 'International Currency & Tax Setup'],
        platforms: ['Shopify Checkout', 'Stripe', 'Klarna', 'PayPal'],
        targetAudience: 'E-commerce stores aiming to boost conversion rates and AOV.',
        ctaText: 'DISCUSS CHECKOUT OPTIMIZATION →',
        featured: false,
        order: 5,
        status: 'active'
      }
    ]
  },
  {
    id: 'development',
    numberLabel: '03 / DEVELOPMENT',
    title: 'DEVELOPMENT',
    tagline: 'Custom Web Systems, Tracking Infrastructure & Automations',
    description: 'Technology and digital infrastructure designed around business growth. We build technology that supports growth.',
    statement: 'BUILD THE DIGITAL INFRASTRUCTURE GROWTH DEPENDS ON.',
    platforms: ['React / Next.js', 'TypeScript', 'Node.js', 'Server GTM', 'Meta CAPI', 'REST & GraphQL APIs', 'Webhooks'],
    featuredServices: ['Web & App Dev', 'Tracking & CAPI', 'Automation & APIs', 'Integrations & Custom Tools'],
    services: [
      {
        id: 'web-app-dev',
        title: 'WEB & APP DEVELOPMENT',
        pillarId: 'development',
        oneLiner: 'High-performance websites, custom web apps and landing page engines.',
        description: 'Modern, ultra-fast web interfaces built with React, Next.js, and TypeScript focused on conversion velocity and technical SEO.',
        includes: ['Custom React / Next.js Frontends', 'Landing Page Engines', 'Responsive Web Applications', 'Core Web Vitals Tuning', 'Headless CMS Integration'],
        platforms: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
        targetAudience: 'Businesses seeking bespoke web experiences unconstrained by rigid templates.',
        ctaText: 'DISCUSS WEB DEVELOPMENT →',
        featured: true,
        order: 1,
        status: 'active'
      },
      {
        id: 'tracking-capi',
        title: 'TRACKING & SERVER-SIDE CAPI',
        pillarId: 'development',
        oneLiner: 'First-party data capture and server-side tracking pipelines immune to ad blockers.',
        description: 'Server-side Google Tag Manager, Meta Conversions API (CAPI), and custom pixel setups ensuring accurate measurement and signal strength.',
        includes: ['Server-Side GTM Setup', 'Meta Conversions API (CAPI)', 'Google Analytics 4 Architecture', 'First-Party Cookie Infrastructure', 'Consent Management & Privacy'],
        platforms: ['Server GTM', 'Meta CAPI', 'GA4', 'Stape.io'],
        targetAudience: 'Companies requiring bulletproof ad tracking and attribution post-iOS 14.5.',
        ctaText: 'DISCUSS TRACKING SETUP →',
        featured: true,
        order: 2,
        status: 'active'
      },
      {
        id: 'automation-apis',
        title: 'MARKETING & BUSINESS AUTOMATION',
        pillarId: 'development',
        oneLiner: 'Automated operational workflows connecting marketing, sales, and inventory.',
        description: 'Custom Zapier, Make, and API webhooks removing manual data entry and connecting leads directly to fulfillment and CRM engines.',
        includes: ['Custom API Webhooks', 'CRM Lead Sync Workflows', 'Order & Inventory Automations', 'Notification & Alert Engines', 'Process Automation'],
        platforms: ['Make', 'Zapier', 'Node.js', 'Python'],
        targetAudience: 'Scaling operations burdened by repetitive manual data tasks.',
        ctaText: 'DISCUSS AUTOMATIONS →',
        featured: true,
        order: 3,
        status: 'active'
      },
      {
        id: 'integrations-tools',
        title: 'INTEGRATIONS & CUSTOM TOOLS',
        pillarId: 'development',
        oneLiner: 'Custom software modules, internal tools and specialized data connectors.',
        description: 'Engineered web tools, pricing calculators, partner portal integrations, and custom dashboards built specifically for your workflow.',
        includes: ['Custom CRM & ERP Connectors', 'Internal Operations Portals', 'Specialized Calculator Tools', 'Data Export / Import Engines', 'Third-Party API Integrations'],
        platforms: ['REST APIs', 'GraphQL', 'PostgreSQL', 'Cloud Run'],
        targetAudience: 'Organizations needing tailored software connections between disparate systems.',
        ctaText: 'DISCUSS CUSTOM TOOLS →',
        featured: false,
        order: 4,
        status: 'active'
      }
    ]
  },
  {
    id: 'intelligence',
    numberLabel: '04 / INTELLIGENCE',
    title: 'INTELLIGENCE',
    tagline: 'AI Strategy, Unified Data & Strategic Decision Systems',
    description: 'AI, data and strategic thinking used to improve how businesses make decisions and operate efficiently.',
    statement: 'TURN DATA AND AI INTO BETTER DECISIONS.',
    platforms: ['Gemini AI', 'Proprietary LLM Agents', 'BigQuery', 'Looker Studio', 'Custom Python Models'],
    featuredServices: ['AI Strategy', 'AI Implementation', 'Data Pipelines', 'Growth Strategy & Analysis'],
    services: [
      {
        id: 'ai-strategy',
        title: 'AI STRATEGY & ROADMAPPING',
        pillarId: 'intelligence',
        oneLiner: 'Pragmatic AI adoption roadmaps focused on operational efficiency and competitive edge.',
        description: 'Identifying high-impact AI opportunities in your business operations, content creation, customer support, and decision-making.',
        includes: ['AI Opportunity Audit', 'Workflow Automation Blueprint', 'Tool Selection & Architecture', 'Data Readiness Assessment', 'AI Security & Policy Guidelines'],
        platforms: ['Gemini', 'OpenAI', 'Custom LLM Frameworks'],
        targetAudience: 'Leadership teams evaluating how to leverage AI practically.',
        ctaText: 'DISCUSS AI STRATEGY →',
        featured: true,
        order: 1,
        status: 'active'
      },
      {
        id: 'ai-implementation',
        title: 'AI WORKFLOW IMPLEMENTATION',
        pillarId: 'intelligence',
        oneLiner: 'Custom LLM agents and automated intelligence pipelines deployed into daily operations.',
        description: 'Building and deploying AI-assisted marketing analysis, customer query handlers, automated content synthesizers, and operational bots.',
        includes: ['Custom AI Agents', 'LLM Prompt Engineering Pipelines', 'Automated Content & Ad Copy Generators', 'Customer Query Categorization', 'Internal Knowledge Search Engines'],
        platforms: ['Google Cloud AI', 'LangChain', 'Python'],
        targetAudience: 'Teams ready to automate repetitive analysis and content workflows.',
        ctaText: 'DISCUSS AI IMPLEMENTATION →',
        featured: true,
        order: 2,
        status: 'active'
      },
      {
        id: 'data-pipelines',
        title: 'UNIFIED DATA & REPORTING SYSTEMS',
        pillarId: 'intelligence',
        oneLiner: 'Consolidated data warehouses turning scattered metrics into single-source truth.',
        description: 'Connecting ad spend, store revenue, CRM leads, and fulfillment costs into automated executive dashboards and predictive models.',
        includes: ['Data Warehouse Setup (BigQuery)', 'Automated ETL Data Pipelines', 'Executive Looker Dashboards', 'LTV & Cohort Analytics', 'Margin & Profitability Tracking'],
        platforms: ['BigQuery', 'Looker Studio', 'PostgreSQL'],
        targetAudience: 'Companies requiring reliable, single-source financial and marketing metrics.',
        ctaText: 'DISCUSS DATA PIPELINES →',
        featured: true,
        order: 3,
        status: 'active'
      },
      {
        id: 'growth-strategy',
        title: 'GROWTH STRATEGY & DECISION SUPPORT',
        pillarId: 'intelligence',
        oneLiner: 'Continuous strategic guidance connecting performance data to business capital allocation.',
        description: 'Quarterly growth planning, unit economic modeling, multi-channel budget allocation, and executive strategic advisory.',
        includes: ['Unit Economics Modeling', 'Capital Allocation Strategy', 'Quarterly Growth Reviews', 'Market Expansion Analysis', 'Competitive Intelligence Audits'],
        platforms: ['Magniar Growth Model'],
        targetAudience: 'Founders and executives steering multi-channel growth investments.',
        ctaText: 'DISCUSS STRATEGY ADVISORY →',
        featured: false,
        order: 4,
        status: 'active'
      }
    ]
  }
];

export const CONNECTED_CAPABILITY_LOOP: ConnectedLoopStep[] = [
  {
    id: 'step-1',
    stepNumber: '01',
    label: 'PERFORMANCE (DEMAND)',
    description: 'Targeted paid search, social, and native campaigns generate high-intent visitor traffic.',
    pillarId: 'performance',
    outputSignal: 'High-Intent Traffic'
  },
  {
    id: 'step-2',
    stepNumber: '02',
    label: 'COMMERCE (CONVERSION)',
    description: 'Optimized digital storefronts and marketplaces convert visitors into high-AOV customers.',
    pillarId: 'commerce',
    outputSignal: 'Verified Orders & Revenue'
  },
  {
    id: 'step-3',
    stepNumber: '03',
    label: 'DEVELOPMENT (INFRASTRUCTURE)',
    description: 'Server-side tracking, APIs, and automations capture clean first-party data and streamline ops.',
    pillarId: 'development',
    outputSignal: 'Clean First-Party Signals'
  },
  {
    id: 'step-4',
    stepNumber: '04',
    label: 'INTELLIGENCE (OPTIMIZATION)',
    description: 'AI models and unified analytics guide capital reallocation back into top-performing demand channels.',
    pillarId: 'intelligence',
    outputSignal: 'Optimized Growth Capital'
  }
];

export const BUSINESS_JOURNEY_EXAMPLE: BusinessJourneyExample = {
  title: 'CONNECTED SYSTEM IN PRACTICE',
  businessType: 'Fast-Growing Direct-to-Consumer & Retail Brand',
  challenge: 'High customer acquisition costs on paid social paired with fragmented storefront analytics and manual inventory sync across Amazon and Shopify.',
  solutionPillars: ['performance', 'commerce', 'development', 'intelligence'],
  componentsUsed: [
    'Performance: Google Shopping + Meta Retargeting restructuring',
    'Commerce: Shopify Plus theme optimization & Amazon FBA inventory feed sync',
    'Development: Server GTM + Meta CAPI implementation for privacy-compliant signal recovery',
    'Intelligence: BigQuery metric consolidation for true ROAS and LTV modeling'
  ],
  systemOutcome: 'A synchronized growth engine where attribution data directly feeds campaign bidding, storefront conversion increases, and marketplace revenue scales predictably.'
};
