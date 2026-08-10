import { CaseStudy } from '../types/work';

export const CASE_STUDIES_DATA: CaseStudy[] = [
  {
    id: 'cs-01',
    slug: 'solaris-apparel-scaling-dtc-acquisition',
    clientId: 'client-01',
    clientName: 'Solaris Apparel',
    isConfidential: false,
    title: 'Scaling DTC Paid Acquisition & Headless Commerce Architecture',
    subtitle: 'Transitioned a regional apparel brand from organic dependency to a high-ROAS international acquisition engine.',
    industryId: 'ecommerce',
    businessModel: 'DTC / Consumer Brand',
    geography: 'India → US & EU Markets',
    status: 'ACTIVE_CLIENT',
    engagementType: 'Full Growth Assembly (Performance + Commerce)',
    startDate: 'Jan 2025',
    duration: '14 Months (Ongoing)',
    mediaBudgetDisplay: '$10K–$25K / month',
    budgetVisibility: 'RANGE',
    clientBio: 'Solaris Apparel is a high-growth premium outerwear and lifestyle apparel brand serving design-conscious consumers across urban markets in North America and Western Europe.',
    challenge: 'Solaris faced flatlining revenue due to rising CAC on Meta Ads, fragmented attribution tracking after iOS privacy updates, and slow page load speeds on their legacy Shopify theme during peak traffic spikes.',
    objective: 'Re-architect Meta and Google ad account structures to achieve predictable CAC, build server-side Conversion API tracking, and optimize Shopify theme conversion rates to support international expansion.',
    strategySteps: [
      {
        stepNumber: '01',
        title: 'Attribution & Server-Side Tracking Restructure',
        description: 'Deployed Google Tag Manager Server-Side with Meta CAPI and Google Analytics 4, establishing a clean 1st-party data foundation without relying on browser cookies.'
      },
      {
        stepNumber: '02',
        title: 'Modular Paid Social Campaign Architecture',
        description: 'Eliminated campaign overlap by establishing Broad targeting CBO frameworks with dynamic creative testing loops, isolating high-LTV customer personas.'
      },
      {
        stepNumber: '03',
        title: 'Shopify Storefront Speed & CRO Optimization',
        description: 'Re-engineered product detail pages (PDPs) with custom liquid sections, optimized image assets, and streamlined 1-click checkout flows.'
      },
      {
        stepNumber: '04',
        title: 'Automated Retention & Catalog Intelligence',
        description: 'Connected Klaviyo SMS & Email flows with automated RFM customer segmentation and AI catalog recommendations for cross-sell optimization.'
      }
    ],
    executionItems: [
      'Server-Side GTM & Meta Conversion API (CAPI) Integration',
      'Meta Ads & Google Search/Shopping Account Consolidation',
      'Custom Shopify Liquid PDP Design & Checkout Speed Sprint',
      'AI-Powered Creative Asset Matrix (Static + UGC UGC Hooks)',
      'Automated Klaviyo Lifecycle Flows & SMS Revenue Engines'
    ],
    capabilities: ['performance', 'commerce', 'development', 'intelligence'],
    servicesUsed: ['Meta Ads', 'Google Ads', 'Shopify Development', 'CRO', 'Server-Side CAPI Tracking'],
    platforms: ['Meta', 'Google', 'Shopify', 'Klaviyo'],
    results: [
      {
        label: 'MER / Total ROAS',
        metric: '3.42x',
        note: 'Blended marketing efficiency ratio across all paid & organic channels.',
        category: 'PERFORMANCE',
        isDemoPlaceholder: true
      },
      {
        label: 'Customer Acquisition Cost',
        metric: '-28.4%',
        note: 'Reduction in blended CAC through creative iteration and audience consolidation.',
        category: 'PERFORMANCE',
        isDemoPlaceholder: true
      },
      {
        label: 'Conversion Rate (CR)',
        metric: '+41.2%',
        note: 'Mobile conversion rate uplift after headless Shopify optimizations.',
        category: 'COMMERCE',
        isDemoPlaceholder: true
      },
      {
        label: 'Monthly Paid Revenue',
        metric: '$180K+',
        note: 'Attributable monthly revenue generated via paid social & search.',
        category: 'COMMERCE',
        isDemoPlaceholder: true
      }
    ],
    beforeAfter: [
      {
        dimension: 'Acquisition Tracking',
        before: 'Fragmented browser-only pixel with 35% attributed data loss post-iOS 14.5.',
        after: 'Full 1st-party Server-Side CAPI pipeline with 98.2% Event Match Quality.'
      },
      {
        dimension: 'Campaign Structure',
        before: '28 micro-targeted campaigns competing against each other in self-overlap auction.',
        after: 'Streamlined 3-tier CBO framework with automated creative fatigue replacement.'
      },
      {
        dimension: 'Storefront Experience',
        before: '4.8s mobile load time with heavy app script overhead and low PDP conversion.',
        after: '1.2s instant page paint with modular custom liquid sections & 1-click checkout.'
      }
    ],
    testimonial: {
      quote: 'Magniar did not just run ads for us; they rebuilt our entire commerce engine. Their engineering team fixed tracking issues that two previous agencies had declared impossible.',
      authorName: 'Vikram Mehta',
      authorRole: 'Founder & CEO',
      companyName: 'Solaris Apparel'
    },
    heroPlaceholderLabel: 'SOLARIS DTC ACQUISITION & SHOPIFY ARCHITECTURE',
    featured: true,
    isDemoData: true
  },
  {
    id: 'cs-02',
    slug: 'apex-logistics-b2b-saas-pipeline',
    clientId: 'client-02',
    clientName: 'Apex Logistics Systems',
    isConfidential: false,
    title: 'Enterprise B2B Lead Gen & AI Qualified Pipeline Engine',
    subtitle: 'Replaced high-burn outbound sales cold calls with an automated account-based marketing & lead scoring system.',
    industryId: 'b2b',
    businessModel: 'B2B Enterprise SaaS',
    geography: 'North America & APAC',
    status: 'ACTIVE_CLIENT',
    engagementType: 'Growth & Intelligence Assembly',
    startDate: 'Nov 2024',
    duration: '16 Months (Ongoing)',
    mediaBudgetDisplay: '$25K–$50K / month',
    budgetVisibility: 'RANGE',
    clientBio: 'Apex Logistics Systems provides cloud-native warehouse management software (WMS) and supply chain telematics for mid-market and enterprise logistics providers.',
    challenge: 'Apex suffered from a 9-month sales cycle with high customer acquisition costs and low sales-accepted lead (SAL) conversion from generic LinkedIn lead gen forms.',
    objective: 'Implement an Account-Based Marketing (ABM) strategy on LinkedIn & Google Search, build custom interactive ROI calculators, and automate lead qualification via AI workflows.',
    strategySteps: [
      {
        stepNumber: '01',
        title: 'ABM Intent & Ideal Customer Profile (ICP) Mapping',
        description: 'Identified top 2,500 target logistics accounts using 1st-party CRM data and 3rd-party intent signals.'
      },
      {
        stepNumber: '02',
        title: 'High-Intent Google & LinkedIn Search Integration',
        description: 'Deployed exact-match Search campaigns targeting operational WMS keywords and targeted LinkedIn Thought Leader ads.'
      },
      {
        stepNumber: '03',
        title: 'Custom Interactive Savings Calculator Development',
        description: 'Built a lightweight React ROI web app allowing logistics directors to calculate annual labor savings before requesting a demo.'
      },
      {
        stepNumber: '04',
        title: 'AI Lead Scoring & Automated CRM Dispatch',
        description: 'Programmed Gemini-powered lead triage to automatically enrich incoming leads and route high-value accounts directly to enterprise AE calendars.'
      }
    ],
    executionItems: [
      'LinkedIn ABM Account Targeting & Sponsored Thought Leadership',
      'Google Ads High-Intent B2B Search Campaign Overhaul',
      'Custom React Interactive Logistics ROI Savings Web Calculator',
      'HubSpot + Gemini AI Automated Lead Scoring & Routing Flow',
      'Executive Pipeline & CAC Analytics Dashboard'
    ],
    capabilities: ['performance', 'development', 'intelligence'],
    servicesUsed: ['LinkedIn Ads', 'Google Ads', 'Custom Web App Dev', 'AI Lead Scoring', 'HubSpot CRM Integration'],
    platforms: ['LinkedIn', 'Google', 'HubSpot', 'React'],
    results: [
      {
        label: 'Sales Qualified Leads (SQL)',
        metric: '+118%',
        note: 'Increase in qualified enterprise demo requests quarter-over-quarter.',
        category: 'PERFORMANCE',
        isDemoPlaceholder: true
      },
      {
        label: 'Cost Per Demo (CPD)',
        metric: '-36.5%',
        note: 'Reduction in cost per validated enterprise demo request.',
        category: 'PERFORMANCE',
        isDemoPlaceholder: true
      },
      {
        label: 'Demo to SQL Rate',
        metric: '68.5%',
        note: 'Percentage of leads meeting enterprise ACV thresholds.',
        category: 'INTELLIGENCE',
        isDemoPlaceholder: true
      },
      {
        label: 'Pipeline Value Generated',
        metric: '$4.2M',
        note: 'New qualified enterprise opportunity pipeline generated in 6 months.',
        category: 'PERFORMANCE',
        isDemoPlaceholder: true
      }
    ],
    beforeAfter: [
      {
        dimension: 'Lead Qualification',
        before: 'Manual BDR outreach filtering through low-quality lead submissions line by line.',
        after: 'Real-time AI lead scoring routing top accounts directly to sales calendars in seconds.'
      },
      {
        dimension: 'Ad Targeting',
        before: 'Broad job title targeting on LinkedIn resulting in inflated ad spend on job seekers.',
        after: 'Domain-matched ABM account lists updated weekly via CRM sync.'
      }
    ],
    testimonial: {
      quote: 'Magniar turned our marketing from a cost center into a predictable pipeline machine. Their interactive ROI calculator alone generated over $1.5M in pipeline in 90 days.',
      authorName: 'Sarah Jenkins',
      authorRole: 'VP of Marketing',
      companyName: 'Apex Logistics Systems'
    },
    heroPlaceholderLabel: 'APEX B2B ENTERPRISE ABM & AI PIPELINE',
    featured: true,
    isDemoData: true
  },
  {
    id: 'cs-03',
    slug: 'aethel-home-omnichannel-expansion',
    clientId: 'client-03',
    clientName: 'Aethel Home & Living',
    isConfidential: false,
    title: 'Omnichannel Commerce & High-AOV Retail Media Synchronization',
    subtitle: 'Unified Shopify storefront, Amazon Brand Store, and Google Performance Max for high-ticket home decor.',
    industryId: 'retail',
    businessModel: 'Omnichannel Brand',
    geography: 'United Kingdom & Western Europe',
    status: 'COMPLETED',
    engagementType: 'Commerce & Performance Sprint',
    startDate: 'Mar 2024',
    duration: '9 Months (Completed)',
    mediaBudgetDisplay: '$10K–$25K / month',
    budgetVisibility: 'RANGE',
    clientBio: 'Aethel Home is a luxury sustainable homeware and furniture brand operating a flagship boutique in London alongside a global e-commerce presence.',
    challenge: 'Aethel struggled with low repeat customer rates, high shipping overhead on bulky items affecting margin transparency, and channel conflict between Amazon and their direct Shopify store.',
    objective: 'Establish a cohesive pricing and catalog strategy across Shopify and Amazon, deploy high-converting Pinterest & Meta visual ads, and streamline post-purchase tracking.',
    strategySteps: [
      {
        stepNumber: '01',
        title: 'Channel Margins & Catalog Segmentation',
        description: 'Separated hero flagship furniture for DTC exclusivity while leveraging Amazon FBA for fast-moving home accessories.'
      },
      {
        stepNumber: '02',
        title: 'Visual Search & High-AOV Ad Strategy',
        description: 'Leveraged Pinterest Video Ads and Meta Advantage+ Catalog Ads targeting high-net-worth interior design enthusiasts.'
      },
      {
        stepNumber: '03',
        title: 'Multi-Currency Shopify Plus Experience',
        description: 'Built localized landing pages for EU markets with automatic currency conversion and localized VAT calculations.'
      }
    ],
    executionItems: [
      'Shopify Plus Multi-Currency & Localized Checkout Setup',
      'Amazon Brand Registry & Storefront A+ Content Redesign',
      'Pinterest Shopping Ads & Meta Advantage+ Catalog Campaigns',
      'Google Performance Max Feed Optimization for High-AOV SKUs'
    ],
    capabilities: ['commerce', 'performance', 'development'],
    servicesUsed: ['Shopify Plus', 'Amazon Advertising', 'Meta Ads', 'Pinterest Ads', 'Product Feed Optimization'],
    platforms: ['Shopify', 'Amazon', 'Meta', 'Pinterest', 'Google'],
    results: [
      {
        label: 'Average Order Value (AOV)',
        metric: '£385',
        note: 'AOV uplift driven by automated bundle recommendations.',
        category: 'COMMERCE',
        isDemoPlaceholder: true
      },
      {
        label: 'Blended ROAS',
        metric: '4.15x',
        note: 'Across Shopify DTC and Amazon UK marketplaces.',
        category: 'PERFORMANCE',
        isDemoPlaceholder: true
      },
      {
        label: 'International Sales Share',
        metric: '+64%',
        note: 'Expansion into EU markets via localized Shopify checkout.',
        category: 'COMMERCE',
        isDemoPlaceholder: true
      }
    ],
    beforeAfter: [
      {
        dimension: 'Marketplace Integration',
        before: 'Amazon and Shopify operating as silos with conflicting price points and stockouts.',
        after: 'Synchronized inventory engine with automated cross-channel inventory buffers.'
      }
    ],
    heroPlaceholderLabel: 'AETHEL HOME OMNICHANNEL SHOPIFY + AMAZON',
    featured: true,
    isDemoData: true
  },
  {
    id: 'cs-04',
    slug: 'nexus-fintech-global-confidential',
    clientId: 'client-04',
    clientName: 'Confidential FinTech Platform',
    isConfidential: true,
    title: 'High-Volume Paid Search & Compliance-First Lead Acquisition',
    subtitle: 'Scalable paid search and landing page infrastructure for a regulated global cross-border payments provider.',
    industryId: 'saas-technology',
    businessModel: 'B2B FinTech / SaaS',
    geography: 'Global (EU, US, SGP)',
    status: 'SELECTED_PROJECT',
    engagementType: 'Performance & Intelligence Retainer',
    startDate: 'Aug 2024',
    duration: '12 Months',
    mediaBudgetDisplay: '$50K+ / month',
    budgetVisibility: 'CATEGORY',
    clientBio: 'An institutional cross-border payment & treasury automation platform serving high-volume international trade businesses and global startups.',
    challenge: 'Strict financial marketing compliance required real-time ad copy disclaimers, while aggressive competitor bidding in Google Search pushed keyword CPCs over $45 per click.',
    objective: 'Build a compliant landing page engine, deploy negative keyword matrices to eliminate junk clicks, and optimize for cost-per-funded account rather than raw signups.',
    strategySteps: [
      {
        stepNumber: '01',
        title: 'Compliance-Automated Dynamic Landing Pages',
        description: 'Developed dynamically rendered Next.js landing pages with region-specific regulatory disclaimers baked into server components.'
      },
      {
        stepNumber: '02',
        title: 'Value-Based Bidding (VBB) Search Architecture',
        description: 'Connected Google Ads offline conversion tracking (OCT) directly to bank account funding milestones.'
      }
    ],
    executionItems: [
      'Compliance-First Next.js High-Speed Landing Page Framework',
      'Google Ads Offline Conversion Tracking (OCT) API Integration',
      'Automated Disclaimers & Regulatory Ad Copy Management',
      'Competitor Defense & High-Intent Search Bidding Strategies'
    ],
    capabilities: ['performance', 'development', 'intelligence'],
    servicesUsed: ['Google Ads Search', 'Offline Conversion Tracking', 'Next.js Web Dev', 'AI Compliance Checking'],
    platforms: ['Google', 'React', 'Google Cloud Platform'],
    results: [
      {
        label: 'Cost Per Funded Account',
        metric: '-42.8%',
        note: 'Significant reduction in acquisition cost for active trading clients.',
        category: 'PERFORMANCE',
        isDemoPlaceholder: true
      },
      {
        label: 'Lead to Account Funding',
        metric: '22.4%',
        note: 'Conversion rate from initial form submission to account deposit.',
        category: 'INTELLIGENCE',
        isDemoPlaceholder: true
      }
    ],
    heroPlaceholderLabel: 'CONFIDENTIAL FINTECH COMPLIANT SEARCH ENGINE',
    featured: false,
    isDemoData: true
  },
  {
    id: 'cs-05',
    slug: 'vanguard-regional-services-local-growth',
    clientId: 'client-05',
    clientName: 'Vanguard Medical Advisory',
    isConfidential: false,
    title: 'Multi-Location Lead Gen & Automated Patient Intake Portal',
    subtitle: 'Hyper-local Meta & Google Ads campaigns tied to an automated WhatsApp & SMS consultation scheduling workflow.',
    industryId: 'professional-services',
    businessModel: 'Multi-Location Service',
    geography: 'Regional (12 Clinics)',
    status: 'ONGOING',
    engagementType: 'Full Growth Assembly',
    startDate: 'Dec 2024',
    duration: '8 Months (Ongoing)',
    mediaBudgetDisplay: '$5K–$10K / month',
    budgetVisibility: 'RANGE',
    clientBio: 'Vanguard Medical Advisory operates 12 specialized preventive healthcare and diagnostic centers across major urban metro hubs.',
    challenge: 'High drop-off between ad click and appointment booking, with front-desk staff spending 15+ hours weekly manually confirming leads via telephone calls.',
    objective: 'Implement 24/7 instant AI WhatsApp/SMS intake workflows, geo-targeted Google Local Services Ads, and automated appointment deposit processing.',
    strategySteps: [
      {
        stepNumber: '01',
        title: 'Geo-Fenced Meta & Google Local Ads',
        description: 'Established 10-mile radius targeting around each clinic location featuring localized practitioner reviews.'
      },
      {
        stepNumber: '02',
        title: 'Instant WhatsApp & SMS AI Intake Assistant',
        description: 'Programmed conversational AI workflow that engages inquiries within 30 seconds of form completion.'
      }
    ],
    executionItems: [
      'Meta Lead Ads & Google Local Search Campaign Management',
      'Twilio + WhatsApp Business AI Conversational Assistant',
      'Automated Appointment Booking & Calendar Syncing',
      'Stripe Integrated Pre-Consultation Deposit Flow'
    ],
    capabilities: ['performance', 'development', 'intelligence'],
    servicesUsed: ['Meta Ads', 'Google Local Ads', 'WhatsApp AI Assistant', 'Stripe Payments', 'Custom CRM'],
    platforms: ['Meta', 'Google', 'WhatsApp', 'Stripe'],
    results: [
      {
        label: 'Appointment Show-Up Rate',
        metric: '89.2%',
        note: 'Up from 54% prior to SMS automation and deposits.',
        category: 'PERFORMANCE',
        isDemoPlaceholder: true
      },
      {
        label: 'Front Desk Hours Saved',
        metric: '18 hrs/wk',
        note: 'Saved per clinic location via automated AI scheduling.',
        category: 'DEVELOPMENT',
        isDemoPlaceholder: true
      }
    ],
    heroPlaceholderLabel: 'VANGUARD MEDICAL AUTOMATED INTAKE & LOCAL ADS',
    featured: false,
    isDemoData: true
  },
  {
    id: 'cs-06',
    slug: 'omni-marketplace-brand-multi-channel',
    clientId: 'client-06',
    clientName: 'Omni Beauty Labs',
    isConfidential: false,
    title: 'TikTok Shop, Amazon & Shopify Multi-Channel Scale',
    subtitle: 'Unified influencer seeding, TikTok Shop affiliate management, and Amazon Brand Advertising.',
    industryId: 'dtc-consumer',
    businessModel: 'DTC & Marketplace Hybrid',
    geography: 'United States & Canada',
    status: 'ACTIVE_CLIENT',
    engagementType: 'Performance & Commerce Retainer',
    startDate: 'Feb 2025',
    duration: '12 Months (Ongoing)',
    mediaBudgetDisplay: '$25K–$50K / month',
    budgetVisibility: 'RANGE',
    clientBio: 'Omni Beauty Labs manufactures clean skincare formulations and viral beauty accessories distributed direct-to-consumer and across top digital marketplaces.',
    challenge: 'Managing influencer content licensing rights, volatile inventory sync between TikTok Shop and Amazon FBA, and high customer return rates due to mismatched shade expectations.',
    objective: 'Deploy TikTok Shop Affiliate seeding loops, build a custom Shopify shade-matching quiz, and scale Amazon Sponsored Display ads.',
    strategySteps: [
      {
        stepNumber: '01',
        title: 'Viral Creator Seeding & TikTok Shop Affiliate System',
        description: 'Onboarded 150+ micro-creators with commission incentives linked to TikTok Shop sample fulfillments.'
      },
      {
        stepNumber: '02',
        title: 'AI Shade-Matching Quiz App on Shopify',
        description: 'Engineered a custom React shade recommendation widget that reduced return rates by 38%.'
      }
    ],
    executionItems: [
      'TikTok Shop Setup & Affiliate Creator Engine Management',
      'Custom React Shade-Finder Quiz App for Shopify',
      'Amazon Sponsored Products & DSP Advertising Strategy',
      'Multi-Channel Inventory Buffering & Analytics'
    ],
    capabilities: ['performance', 'commerce', 'development', 'intelligence'],
    servicesUsed: ['TikTok Ads', 'TikTok Shop Affiliate', 'Amazon Advertising', 'Shopify App Development', 'AI Quiz App'],
    platforms: ['TikTok', 'Shopify', 'Amazon', 'Meta'],
    results: [
      {
        label: 'Monthly Social Commerce GMV',
        metric: '$320K',
        note: 'Generated across TikTok Shop and Shopify store.',
        category: 'COMMERCE',
        isDemoPlaceholder: true
      },
      {
        label: 'Return Rate Reduction',
        metric: '-38.0%',
        note: 'Reduction in product returns following the interactive quiz launch.',
        category: 'DEVELOPMENT',
        isDemoPlaceholder: true
      }
    ],
    heroPlaceholderLabel: 'OMNI BEAUTY TIKTOK SHOP + AMAZON ENGINE',
    featured: true,
    isDemoData: true
  }
];
