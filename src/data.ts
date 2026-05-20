import { ServiceItem, PlatformTrustItem, CaseStudy, ProcessStep, ShowcaseWebsite, Testimonial, HandledClient } from "./types";

export const TRUST_PLATFORMS: PlatformTrustItem[] = [
  {
    name: "Google Ads",
    iconName: "Search",
    category: "Ads",
    colorClass: "from-blue-500/10 to-blue-500/30 border-blue-500/20 text-blue-400",
    description: "Search, Shopping & PMax targeting high-intent buyers."
  },
  {
    name: "Meta Ads",
    iconName: "Instagram",
    category: "Ads",
    colorClass: "from-purple-500/10 to-purple-500/30 border-purple-500/20 text-purple-400",
    description: "Disruptive social storytelling across Instagram & Facebook."
  },
  {
    name: "TikTok Shop",
    iconName: "ShoppingBag",
    category: "Marketplace",
    colorClass: "from-pink-500/10 to-pink-500/30 border-pink-500/20 text-pink-400",
    description: "Viral shoppable content & full in-app commerce checkout."
  },
  {
    name: "LinkedIn Ads",
    iconName: "Linkedin",
    category: "Ads",
    colorClass: "from-cyan-500/10 to-cyan-500/30 border-cyan-500/20 text-cyan-400",
    description: "Laser-focused account targeting for premium B2B SaaS."
  },
  {
    name: "Amazon Sell",
    iconName: "TrendingUp",
    category: "Marketplace",
    colorClass: "from-amber-500/10 to-amber-500/30 border-amber-500/20 text-amber-500",
    description: "Buy Box takeover, SEO, & PPC campaigns for FBA dominance."
  },
  {
    name: "Etsy Scale",
    iconName: "Sparkles",
    category: "Marketplace",
    colorClass: "from-orange-500/10 to-orange-500/30 border-orange-500/20 text-orange-400",
    description: "Niche handmade & print-on-demand keyword mastery."
  },
  {
    name: "Walmart Store",
    iconName: "Store",
    category: "Marketplace",
    colorClass: "from-blue-400/10 to-blue-400/30 border-blue-400/20 text-blue-300",
    description: "Fast-growing omni-channel marketplace strategy."
  },
  {
    name: "Web Dev",
    iconName: "CodeXml",
    category: "Development",
    colorClass: "from-rose-500/10 to-rose-500/30 border-rose-500/20 text-rose-400",
    description: "Speed-tuned, headless commerce and corporate websites."
  }
];

export const STATISTICS = [
  { id: "campaigns", val: 420, prefix: "", suffix: "+", label: "Campaigns Orchestrated" },
  { id: "adspend", val: 84, prefix: "$", suffix: "M+", label: "Ad Spend Engineered" },
  { id: "websites", val: 125, prefix: "", suffix: "+", label: "Bespoke Webs Built" },
  { id: "scaling", val: 32, prefix: "", suffix: "x", label: "Average Brand Expansion" }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "google-ads",
    title: "Google Ads Management",
    category: "marketing",
    description: "Capture intentional demand. Setup Performance Max, Search, and YouTube campaigns tracked with high-precision server-side pixels.",
    stat: "4.8x",
    statLabel: "Average ROAS",
    iconName: "Activity"
  },
  {
    id: "meta-ads",
    title: "Meta Ads Performance",
    category: "marketing",
    description: "Unleash scalable social channels. We design, produce, and test highly interactive visual creatives that convert passive scrollers into loyalty.",
    stat: "340%",
    statLabel: "Volume Lift",
    iconName: "Zap"
  },
  {
    id: "tiktok-ads",
    title: "TikTok Advertising",
    category: "marketing",
    description: "Capitalize on high-impact attention. Sound-on, native-made content strategies designed specifically for algorithmic acceleration.",
    stat: "5.1M+",
    statLabel: "Impressions Managed",
    iconName: "Flame"
  },
  {
    id: "linkedin",
    title: "LinkedIn Marketing",
    category: "marketing",
    description: "Enterprise B2B buyer targeting. Maximize pipeline velocity using conversational ad units, document gating, and decision-maker targeting.",
    stat: "$180k",
    statLabel: "Avg Deal Size Generated",
    iconName: "Target"
  },
  {
    id: "amazon-marketplace",
    title: "Amazon Management",
    category: "marketplace",
    description: "End-to-end operation of your merchant nodes. Catalog optimization, A+ content architecture, review collection, and Sponsored Brand Ads setup.",
    stat: "2.1x",
    statLabel: "Amazon Sales Multiplier",
    iconName: "Layers"
  },
  {
    id: "etsy-optim",
    title: "Etsy Optimization",
    category: "marketplace",
    description: "Elevate your creative brand presence. Highly focused keyword tagging, custom listing templates, and strategic advertising loops.",
    stat: "99%",
    statLabel: "Listing Visibility Boost",
    iconName: "Award"
  },
  {
    id: "walmart-market",
    title: "Walmart Marketplace",
    category: "marketplace",
    description: "Unlock America's second-biggest marketplace. Leverage fulfillment centers, custom SEO strategies, and optimized landing grids.",
    stat: "145k",
    statLabel: "New Customers Reached",
    iconName: "Compass"
  },
  {
    id: "tiktok-shop",
    title: "TikTok Shop Growth",
    category: "marketplace",
    description: "Integrate video sales with absolute simplicity. Influencer campaigns, affiliate network program rules, and seamless Shopify synchronizing.",
    stat: "3.2x",
    statLabel: "Influencer ROI",
    iconName: "Eye"
  },
  {
    id: "web-dev",
    title: "Shopify & WordPress",
    category: "development",
    description: "Blazing fast conversions. Hand-crafted responsive custom web systems integrated with Stripe, animations, and high security infrastructure.",
    stat: "<1.2s",
    statLabel: "Ultra-Lightweight Load Speed",
    iconName: "Cpu"
  },
  {
    id: "cro",
    title: "Conversion Optimization",
    category: "development",
    description: "Transform existing visits into margin. Scientific A/B testing framework assessing scroll tracking, cognitive barriers, and checkout drag.",
    stat: "+44%",
    statLabel: "Conversion Enhancement",
    iconName: "MousePointer"
  },
  {
    id: "analytics",
    title: "Analytics & Tracking",
    category: "development",
    description: "True attribution clarity. Full implementation of GA4, Google Tag Manager server-side tagging, custom reporting, and CRM connections.",
    stat: "100%",
    statLabel: "Pixel Accuracy Standard",
    iconName: "LineChart"
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "aethera",
    brandName: "AETHERA APPAREL",
    logoText: "Æ",
    category: "Premium Athletic Wear",
    tagline: "Unlocking direct-to-consumer digital channels to bypass traditional brick-and-mortar blockages.",
    metrics: {
      roas: "5.4x",
      revenue: "+280%",
      conversion: "4.2%"
    },
    narrative: "We rebuilt their social funnel from scratch with custom creative workflows, transitioning the brand from 90% retail reliance to an direct-to-consumer powerhouse in 6 months.",
    chartData: [20, 35, 30, 50, 65, 80, 100],
    accentColor: "#ec4899",
    image: "Sleek activewear mockup against dark titanium textures"
  },
  {
    id: "lumina",
    brandName: "LUMINA SLEEP",
    logoText: "L",
    category: "Luxury Tech Wellness",
    tagline: "Restructuring marketplace ecosystems to establish luxury buy-box dominance.",
    metrics: {
      roas: "4.8x",
      revenue: "+190%",
      conversion: "3.8%"
    },
    narrative: "By implementing synchronized listing optimization across Amazon FBA and TikTok Shop, Lumina captured the high-end category ranking and secured automatic influencer pipelines.",
    chartData: [40, 45, 60, 55, 75, 90, 120],
    accentColor: "#3b82f6",
    image: "Modern aesthetic wellness glow light against black marble bedside"
  },
  {
    id: "krypton",
    brandName: "KRYPTON AUTOMATION",
    logoText: "K",
    category: "Enterprise AI Platforms",
    tagline: "Scaling qualified demo bookings for next-generation automated work suites.",
    metrics: {
      roas: "6.2x",
      revenue: "+420%",
      conversion: "6.1%"
    },
    narrative: "An account-based LinkedIn prospecting model paired with custom responsive landing pages that load in under 1 second produced 75 enterprise signups in record timing.",
    chartData: [15, 30, 45, 40, 70, 85, 130],
    accentColor: "#06b6d4",
    image: "Glossy floating node structure showing digital automation charts"
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: 1,
    title: "Strategy",
    tagline: "Architecting the Growth Map",
    description: "Deep audit of unit economics, competitor bidding, and visual weaknesses. We build an actionable launch roadmap focusing strictly on the highest leverage adjustments first.",
    deliverables: ["Competitor Bidding Audit", "Creative Performance Plan", "Attribution Matrix Map"],
    duration: "Week 1"
  },
  {
    number: 2,
    title: "Creative",
    tagline: "Creative Storyboarding & Assets",
    description: "Our high-end production unit creates custom video assets, photography layouts, and responsive landing pages designed directly to trigger high cognitive retention.",
    deliverables: ["TikTok Creator Ads", "Landing Framework Code", "Ad Messaging Angles"],
    duration: "Weeks 2-3"
  },
  {
    number: 3,
    title: "Launch",
    tagline: "Precision Setup & Activation",
    description: "Safe implementation of server-side conversions API, bidding caps, automated scripts, and multi-channel campaign groups on native ad networks.",
    deliverables: ["Conversion API Connection", "Bid-Capped Launch Runs", "Marketplace Launch Ads"],
    duration: "Week 4"
  },
  {
    number: 4,
    title: "Optimize",
    tagline: "Data Auditing & Calibration",
    description: "We review the real results of first launch. Shifting budgets to top-performing audience angles, excluding non-buying demographics, and rewriting weak headlines.",
    deliverables: ["A/B Conversion Reports", "Budget Stream Calibration", "Audience Refinement"],
    duration: "On-going"
  },
  {
    number: 5,
    title: "Scale",
    tagline: "Exponential Node Multiplication",
    description: "Taking your successful formulas to new channels. Sponsoring higher-end keywords on marketplace platforms, launching customized Shopify storefront expansion nodes, and moving into wholesale.",
    deliverables: ["Omni-channel Outposts", "Affiliate Network Setup", "Global Logistics Scale"],
    duration: "On-going"
  }
];

export const SHOWCASE_WEBSITES: ShowcaseWebsite[] = [
  {
    id: "chronos",
    title: "CHRONOS LUX",
    type: "Ecommerce",
    urlName: "chronoslux.design",
    metrics: "+48% Conversion Space",
    features: ["Dynamic WebGL Cart", "Bespoke Filter Nodes", "Apple Pay Express Layer"],
    mockData: {
      heroTitle: "Timeless Precision.",
      tagline: "The modern horological archive built for luxury watch collectors worldwide.",
      productPrice: "$12,450",
      conversionRate: "4.82%"
    }
  },
  {
    id: "velo",
    title: "VELO LABS",
    type: "Corporate",
    urlName: "velolabs.ai",
    metrics: "1.1s Total Load Speed",
    features: ["Custom Graphing Visuals", "Fluid Motion Grid", "Multi-Region Edge Caching"],
    mockData: {
      heroTitle: "Performance Decoded.",
      tagline: "Intelligent biometric tracking metrics for elite cycling teams on the move.",
      activeUsers: "18,450",
      conversionRate: "8.14%"
    }
  },
  {
    id: "nova",
    title: "NOVA INTELLIGENCE",
    type: "Web3 Platform",
    urlName: "novaintelligence.io",
    metrics: "$2.4M Transaction Vol",
    features: ["Live Crypto Connection", "Liquid Floating Cards", "Glassmorphic Input States"],
    mockData: {
      heroTitle: "Distributed Vision.",
      tagline: "AI clusters running on autonomous decentralised protocols with secure nodes.",
      activeUsers: "109,240",
      conversionRate: "5.60%"
    }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test1",
    name: "Catherine Vance",
    role: "VP of Digital Growth",
    company: "Aethera Apparel",
    review: "Magniar & Co took our ad funnel and brought complete logical engineering to it. Within four months our ROAS reached 5.4x and direct-to-consumer revenue surpassed our wholesale channels. They act like full-stack growth partners rather than a distant agency.",
    avatarSeed: "Catherine",
    rating: 5
  },
  {
    id: "test2",
    name: "Marcus Sterling",
    role: "Co-Founder & CEO",
    company: "Lumina Sleep",
    review: "The combination of marketplace optimization on Amazon and running high-retaining TikTok Shops is a game changer. Magniar handle the design, code, optimization, and bidding with complete alignment. Our revenue increased by 190% YoY.",
    avatarSeed: "Marcus",
    rating: 5
  },
  {
    id: "test3",
    name: "Dr. Aris Thorne",
    role: "Chief Marketing Officer",
    company: "Krypton Automation",
    review: "Usually, agencies fail to grasp highly technical products. Magniar designed bespoke landing pages that explained our AI platform visually in under a second. The resulting LinkedIn funnels have generated some of our largest active client accounts.",
    avatarSeed: "Aris",
    rating: 5
  }
];

export const HANDLED_CLIENTS: HandledClient[] = [
  {
    id: "global-konnexon",
    name: "Global Konnexon",
    serviceType: "Google Marketing",
    focus: "Lead Generation",
    spend: 4200,
    spendLabel: "$4,200 Spend Managed",
    description: "Configured automated lead ingestion with high-intent Search channels to attract qualified enterprise connections.",
    category: "lead-generation"
  },
  {
    id: "ticketsaway",
    name: "Ticketsaway",
    serviceType: "Google Marketing",
    focus: "Lead Generation",
    spend: 6800,
    spendLabel: "$6,800 Spend Managed",
    description: "Designed hyper-targeted lead loops around secondary entertainment events, scaling reliable conversion clicks.",
    category: "lead-generation"
  },
  {
    id: "techsanswers",
    name: "Techsanswers",
    serviceType: "Google Marketing",
    focus: "Lead Generation",
    spend: 5120,
    spendLabel: "$5,120 Spend Managed",
    description: "Constructed direct support inquiry tunnels and tracked deep customer validation metrics with server-side conversion tags.",
    category: "lead-generation"
  },
  {
    id: "earlytrips",
    name: "Earlytrips",
    serviceType: "Google Marketing",
    focus: "Lead Generation",
    spend: 3950,
    spendLabel: "$3,950 Spend Managed",
    description: "Designed visual lead attraction campaigns for specialized travel packages, increasing inquiry velocity.",
    category: "lead-generation"
  },
  {
    id: "flysair",
    name: "FlysAir",
    serviceType: "Google Marketing",
    focus: "Lead Generation",
    spend: 7400,
    spendLabel: "$7,400 Spend Managed",
    description: "Deployed specialized Google Search lead forms for group travel charters, minimizing mobile landing drop-off rates.",
    category: "lead-generation"
  },
  {
    id: "house-of-hestia",
    name: "House of Hestia",
    serviceType: "Google Marketing",
    focus: "Lead Generation",
    spend: 5500,
    spendLabel: "$5,500 Spend Managed",
    description: "Established clean ad triggers for premium staging packages, capturing premium decor and development bookings.",
    category: "lead-generation"
  },
  {
    id: "kozzah",
    name: "kozzah",
    serviceType: "Shopify & Marketplace Setup",
    focus: "E-commerce Scale",
    spend: 8500,
    spendLabel: "$8,500 Setup Budget",
    description: "Formated elite Shopify checkout flows, synchronization scripts, and customized marketplace integrations to drive sales.",
    category: "e-commerce"
  }
];
