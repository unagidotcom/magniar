import { Strategy } from '../types/strategies';

export const MOCK_STRATEGIES: Strategy[] = [
  {
    id: 'MG-STR-2026-014',
    name: 'Q3 Growth Acquisition Strategy',
    strategy_type: 'PERFORMANCE MARKETING',
    status: 'ACTIVE',
    health: 'ON TRACK',
    version: 'v1.4',
    is_current: true,

    client_id: 'MG-CL-2026-001',
    client_business_name: 'Northstar Commerce',
    project_id: 'MG-PRJ-2026-001',
    project_name: 'Q3 Paid Acquisition System',

    strategy_lead: 'Kaelen Voss (Growth Lead)',
    contributors: ['Marcus Vance (Creative Lead)', 'Elena Rostova (Paid Media)', 'Devon Vance (Data Lead)'],
    approvers: ['Kaelen Voss (Strategy Director)', 'Maya Chen (Client CMO)'],
    client_stakeholders: ['Maya Chen (CMO)', 'Liam Thorne (VP Marketing)'],

    created_at: 'Jul 10, 2026',
    last_updated: 'Aug 08, 2026',
    next_review_date: 'Aug 30, 2026',

    description:
      'Omni-channel performance marketing plan focused on creative iteration, attribution consolidation, and scale across Meta and Google PMax.',
    executive_summary:
      'Northstar Commerce is entering a controlled acquisition scaling phase. The strategy focuses on improving creative iteration, strengthening measurement and expanding profitable acquisition while maintaining disciplined spend growth.',

    business_context: {
      business_model: 'Ecommerce',
      industry: 'Apparel & Lifestyle Goods',
      primary_market: 'North America',
      secondary_markets: ['UK', 'Australia'],
      countries: ['USA', 'Canada', 'United Kingdom', 'Australia'],
      languages: ['English'],
      currency: 'USD',
      product_service: 'Premium Apparel & Tech Everyday Carry',
      business_maturity: 'Growth Phase ($10M–$25M ARR)',
      growth_stage: 'Scaling Direct-to-Consumer Channel',
      current_situation:
        'Paid acquisition is active across Meta and Google. Creative production is inconsistent and campaign structure requires consolidation before meaningful scaling.',
      strategic_problem:
        'The business has sufficient demand but lacks a repeatable acquisition system capable of scaling while maintaining contribution margin.',
      strategic_opportunity:
        'Build a systematic creative testing and audience expansion process while improving measurement reliability across first-party pixel data.',
    },

    objectives: [
      {
        id: 'obj-1',
        number: '01',
        name: 'Improve Acquisition Efficiency',
        description: 'Lower blended customer acquisition cost by consolidating fragmented Meta ad sets and introducing dynamic bid capping.',
        priority: 'PRIMARY',
        status: 'ON TRACK',
        owner: 'Elena Rostova',
        measurement_target: {
          metric_name: 'Blended CAC',
          target_value: '< $38.00 (Current $46.20)',
          status: 'NOT CONNECTED',
        },
      },
      {
        id: 'obj-2',
        number: '02',
        name: 'Create Repeatable Creative Testing Sprints',
        description: 'Establish bi-weekly 3x3 creative angle testing framework to produce 6 fatigue-resistant winning ads per month.',
        priority: 'HIGH',
        status: 'IN PROGRESS',
        owner: 'Marcus Vance',
        measurement_target: {
          metric_name: 'Hook Rate / CVR',
          target_value: '> 35% Hook Rate / > 2.8% CVR',
          status: 'NOT CONNECTED',
        },
      },
      {
        id: 'obj-3',
        number: '03',
        name: 'Expand Qualified Audience Reach',
        description: 'Scale Google Performance Max and TikTok Spark Ads into new demographic clusters without diluting AOV.',
        priority: 'HIGH',
        status: 'ON TRACK',
        owner: 'Elena Rostova',
        measurement_target: {
          metric_name: 'New Customer Reach',
          target_value: '+ 40% QoQ Reach',
          status: 'NOT CONNECTED',
        },
      },
      {
        id: 'obj-4',
        number: '04',
        name: 'Improve Measurement & Attribution Confidence',
        description: 'Deploy Server-Side CAPI + GA4 DataLayer events to achieve >92% match quality score for Meta Ads Manager.',
        priority: 'MEDIUM',
        status: 'IN PROGRESS',
        owner: 'Devon Vance',
        measurement_target: {
          metric_name: 'Event Match Quality',
          target_value: 'Score > 8.5/10',
          status: 'NOT CONNECTED',
        },
      },
    ],

    audience: {
      primary_audience: {
        name: 'Modern Urban Professionals & Tech Enthusiasts',
        age_range: '25 – 44 years old',
        geography: 'Metropolitan US & Canada (NY, LA, SF, Toronto, Chicago)',
        gender: 'All (60% Male / 40% Female skew)',
        interests: 'Design, Everyday Carry, Premium Apparel, Remote Work, Tech Gear',
        behavior: 'Active online buyers, mobile-first shoppers, high disposable income',
        buying_intent: 'High intent during seasonal launches and promotional bundles',
        pain_points: 'Frustrated by cheap materials that wear out, unorganized work accessories',
        needs: 'Durable, sleek, multi-functional apparel & carrying gear that looks professional',
        motivations: 'Status elevation, functional utility, minimalist aesthetic',
        barriers: 'Higher price point requires clear proof of durability & craftsmanship',
        use_case: 'Daily commute, hybrid office working, weekend travel',
      },
      secondary_audience: {
        name: 'Gift Buyers & Lifestyle Enthusiasts',
        description: 'Gifting during Q3/Q4 holiday prep, looking for high-end curated gifts.',
      },
      exclusion_audience: {
        name: 'Bargain Hunter Audience Clusters',
        description: 'Exclude users engaged exclusively with heavy discount sub-$15 products.',
      },
      customer_problem:
        'High-intent shoppers are interested in the product but hesitate because product differentiation and durability are unclear in static ads.',
      primary_motivators: ['Price-to-value', 'Product quality', 'Speed', 'Trust', 'Social proof'],
      primary_objections: ['Price point', 'Lack of trust in new DTC brands', 'No immediate urgency'],
    },

    positioning: {
      market_position: 'Mid-to-Premium DTC Apparel & Carry Essentials',
      core_value_proposition: 'Enterprise-grade durability without corporate clutter.',
      key_differentiators: [
        'Weatherproof recycled technical textiles',
        'Modular pocketing designed specifically for modern hardware',
        'Direct-to-consumer value pricing (40% below traditional retail equivalent)',
        'Lifetime warranty & repair guarantee',
      ],
      proof_points: [
        'Over 14,000 5-star verified buyer reviews',
        'Featured in TechCrunch & Gear Patrol',
        '< 1.2% return rate across all product categories',
      ],
      competitive_advantage: 'Systematic modular product compatibility paired with rapid customer feedback iteration.',
      brand_promise: 'Crafted for daily resilience, guaranteed for life.',
      competitors: [
        {
          id: 'comp-1',
          name: 'Peak Carry Co.',
          category: 'Established Brand',
          strength: 'Strong brand equity & wholesale retail presence',
          weakness: 'Slow ad iteration, high retail markup',
          strategic_implication: 'Target dissatisfied Peak Carry owners with side-by-side material quality comparisons.',
        },
        {
          id: 'comp-2',
          name: 'UrbanTech Apparel',
          category: 'Direct DTC Competitor',
          strength: 'Aggressive Meta ad spend',
          weakness: 'Poor customer service & high return rates',
          strategic_implication: 'Highlight Northstar lifetime repair warranty and 30-day risk-free test trial.',
        },
      ],
    },

    channels: [
      {
        id: 'chan-1',
        channel_name: 'Meta Ads (Facebook & Instagram)',
        role: 'ACQUISITION',
        priority: 'CORE',
        objective: 'Drive cold prospecting conversion volume and dynamic retargeting at target ROAS.',
        audience: 'Broad + 1% Lookalikes + Interest Stacks',
        budget_allocation_pct: 40,
        current_status: 'ACTIVE',
        owner: 'Elena Rostova',
        approach: 'Consolidated CBO campaign structure with Advantage+ Shopping for winning creatives.',
        testing_plan: 'Weekly DCT (Dynamic Creative Test) sandboxes feeding scaling campaigns.',
        creative_requirements: 'UGC Unboxing, 3-Sec Hook variations, Product Demo Reels.',
        measurement_notes: 'Server-Side CAPI tracking via Stape.io & GA4 events.',
        risks: 'Creative fatigue on winning ad variations within 18-21 days.',
        next_actions: 'Launch 4 new Founder Story video hooks this Thursday.',
      },
      {
        id: 'chan-2',
        channel_name: 'Google Ads (Search & PMax)',
        role: 'CONVERSION',
        priority: 'CORE',
        objective: 'Capture high-intent branded search and run asset-rich Performance Max.',
        audience: 'In-Market Shoppers, Search Intent Keywords',
        budget_allocation_pct: 35,
        current_status: 'ACTIVE',
        owner: 'Elena Rostova',
        approach: 'Exact match branded campaign protection + PMax segmented by product margin.',
        testing_plan: 'Feed optimization sprint: custom labels for high margin / bestsellers.',
        creative_requirements: 'High-res lifestyle images, clean white background product shots.',
        measurement_notes: 'Enhanced Conversions enabled in Google Tag Manager.',
        next_actions: 'Update asset groups with Q3 lifestyle photography.',
      },
      {
        id: 'chan-3',
        channel_name: 'TikTok Ads',
        role: 'DEMAND GENERATION',
        priority: 'GROWTH',
        objective: 'Build top-of-funnel brand awareness and acquire younger demographic customers.',
        audience: 'Interest: Everyday Carry, Tech, Urban Fashion (Ages 18-34)',
        budget_allocation_pct: 15,
        current_status: 'ACTIVE',
        owner: 'Marcus Vance',
        approach: 'Spark Ads boosting native creator content with direct bundle discounts.',
        testing_plan: 'Test 5 creator hooks per week focused on "What\'s in my bag".',
        creative_requirements: 'Raw, unedited creator vertical videos under 15 seconds.',
        next_actions: 'Contract 3 new TikTok creators for August content batch.',
      },
      {
        id: 'chan-4',
        channel_name: 'Experimental Channels (LinkedIn / Pinterest)',
        role: 'EXPERIMENTAL',
        priority: 'TEST',
        objective: 'Test B2B corporate gifting and executive accessory bundles.',
        audience: 'IT Directors, HR Managers, Corporate Gift Buyers',
        budget_allocation_pct: 10,
        current_status: 'PLANNED',
        owner: 'Kaelen Voss',
        approach: 'LinkedIn Sponsored Content targeting HR decision makers with co-branded gear options.',
        next_actions: 'Prepare corporate gifting landing page and PDF catalog.',
      },
    ],

    budget: {
      client_media_spend_range: '$25,000 – $50,000 / month',
      currency: 'USD',
      flexibility: 'PERFORMANCE-DEPENDENT',
      note: 'Client media spend paid directly to ad platforms (Meta/Google). Excludes Magniar retainer fees.',
      allocations: [
        { channel_name: 'Meta Ads', percentage: 40, estimated_amount: '$14,000 / mo' },
        { channel_name: 'Google Ads', percentage: 35, estimated_amount: '$12,250 / mo' },
        { channel_name: 'TikTok Ads', percentage: 15, estimated_amount: '$5,250 / mo' },
        { channel_name: 'Testing Sandbox', percentage: 10, estimated_amount: '$3,500 / mo' },
      ],
    },

    funnel: [
      {
        stage: 'DISCOVERY',
        audience: 'Cold Broad Audiences (US 25-44)',
        channels: ['Meta Ads', 'TikTok Spark Ads'],
        message: 'Reinvent your daily carry with weatherproof technical design.',
        offer: '15% Off First Order Bundle',
        creative: 'Dynamic UGC Hook Reels & Product Stress Tests',
        landing_experience: 'Category Collection Page + Instant Cart Drawer',
        measurement: 'Cost Per 3-Sec View, CTR, Hook Rate',
      },
      {
        stage: 'INTEREST',
        audience: 'Engaged Viewers & Site Visitors (0-14 days)',
        channels: ['Meta Retargeting', 'Google PMax'],
        message: 'Built to withstand 10,000 daily commutes. Lifetime guaranteed.',
        offer: 'Free Express Shipping + Gift Bag',
        creative: '3D Feature Callout Videos & Customer Review Grid',
        landing_experience: 'Dedicated Bestseller Product Detail Pages',
        measurement: 'Add to Cart Rate, Outbound CVR',
      },
      {
        stage: 'CONSIDERATION',
        audience: 'Cart Abandoners & High Intent Visitors',
        channels: ['Google Branded Search', 'Klaviyo Email', 'Meta DPA'],
        message: 'Your cart is reserved. Complete your order today.',
        offer: 'Bonus Accessory with Purchase',
        creative: 'Dynamic Product Ads (DPA) + 5-Star Review Overlays',
        landing_experience: 'Pre-filled Checkout Page with One-Click Pay',
        measurement: 'Checkout Completion Rate, CPA',
      },
      {
        stage: 'CONVERSION',
        audience: 'Checkout Initiators',
        channels: ['SMS', 'Email Flow', 'Search Retargeting'],
        message: 'Final notification: Your shipping discount expires in 4 hours.',
        offer: 'Instant $10 Credit',
        creative: 'Clean High-Urgency Text Card',
        landing_experience: 'Direct Checkout Portal',
        measurement: 'Purchase Conversion Rate',
      },
      {
        stage: 'RETENTION',
        audience: 'Existing Customers (30+ days post-purchase)',
        channels: ['Email VIP Flow', 'Meta Custom Audience Upsell'],
        message: 'Expand your collection: Introducing the Modular Tech Pouch.',
        offer: 'VIP Early Access + 20% Member Discount',
        creative: 'Style Combination Lookbooks',
        landing_experience: 'VIP Club Portal',
        measurement: '30-Day Repeat Purchase Rate, LTV',
      },
    ],

    messaging: {
      core_message: 'Technical precision engineered for your everyday hustle.',
      supporting_messages: [
        'Weatherproof recycled fabrics that outlast traditional nylon.',
        'Organized compartments tailored for 16-inch laptops and peripherals.',
        'Backed by Magniar-certified lifetime product warranty.',
      ],
      proof_points: [
        'Over 14,000 verified 5-star customer reviews',
        'Mil-spec water resistance testing certified',
        'Free 30-day wear trial with free returns',
      ],
      offer: '15% Off Welcome Bundle + Lifetime Warranty Included',
      cta: 'Shop The Collection →',
      objection_handling: 'Risk-free 30-day trial with instant pre-paid return label inside every box.',
    },

    creative: {
      themes: ['Product Durability Stress Test', 'Daily Commute EDC', 'Comparison vs Cheap Retail', 'Unboxing Joy'],
      angles: [
        {
          id: 'ang-1',
          number: '01',
          title: 'Problem / Solution',
          description: 'Show messy backpack vs perfectly organized Northstar Tech Carry system.',
        },
        {
          id: 'ang-2',
          number: '02',
          title: 'Product Stress Test',
          description: 'Pour water & scratch textiles on camera to demonstrate mil-spec resilience.',
        },
        {
          id: 'ang-3',
          number: '03',
          title: 'Social Proof Showcase',
          description: 'Montage of 5 real customers reading their 5-star review highlights.',
        },
        {
          id: 'ang-4',
          number: '04',
          title: 'Side-by-Side Comparison',
          description: 'Direct comparison against traditional $120 retail bags highlighting stitches & zipper quality.',
        },
      ],
      formats: ['Vertical 9:16 Video', '1:1 Square Carousel', 'Single Image Lifestyle', 'Dynamic Product Overlay'],
      testing_approach: 'Bi-weekly 3x3 Dynamic Creative Tests (3 hooks x 3 visual body variations) isolated in sandbox ad sets.',
    },

    experiments: [
      {
        id: 'exp-1',
        name: 'CREATIVE ANGLE TEST — PRODUCT DEMONSTRATION',
        hypothesis:
          'Demonstration-led video creative showing waterproof testing will improve qualified conversion intent compared with static product messaging.',
        channel: 'Meta Ads',
        variable: 'Creative Angle (Demo vs Static)',
        expected_outcome: '+18% Click-to-Cart CVR and lower Cost Per Add to Cart.',
        priority: 'HIGH IMPACT',
        status: 'RUNNING',
        start_date: 'Aug 01, 2026',
        end_date: 'Aug 15, 2026',
        owner: 'Marcus Vance',
      },
      {
        id: 'exp-2',
        name: 'LANDING PAGE SPEED & ONE-CLICK CHECKOUT',
        hypothesis:
          'Replacing standard collection page links with instant Slide-Out Cart drawer on ad clicks will reduce bounce rate.',
        channel: 'All Channels',
        variable: 'Landing Page Flow',
        expected_outcome: '+12% Purchase CVR improvement.',
        priority: 'HIGH IMPACT',
        status: 'PLANNED',
        start_date: 'Aug 18, 2026',
        end_date: 'Aug 30, 2026',
        owner: 'Devon Vance',
      },
      {
        id: 'exp-3',
        name: 'TIKTOK SPARK ADS VS NON-SPARK CREATOR ADS',
        hypothesis:
          'Boosting organic creator Spark Posts will generate 25% higher engagement than dark post uploads.',
        channel: 'TikTok Ads',
        variable: 'Ad Post Format',
        expected_outcome: 'Lower CPM and higher ROAS.',
        priority: 'MEDIUM IMPACT',
        status: 'PLANNED',
        owner: 'Elena Rostova',
      },
    ],

    hypotheses: [
      {
        id: 'hyp-1',
        hypothesis:
          'If we increase the proportion of demonstration-led creative, then qualified conversion rate will improve because product utility becomes immediately apparent.',
        reasoning: 'Heatmap analysis shows users bounce when they cannot inspect interior pocket layouts.',
      },
      {
        id: 'hyp-2',
        hypothesis:
          'If we consolidate Meta campaigns from 8 down to 2 CBO structures, then Meta algorithms will optimize spend faster across winning ad creatives.',
        reasoning: 'Current low-budget ad sets are trapped in the learning phase.',
      },
    ],

    recommendations: [
      {
        id: 'rec-1',
        title: 'CONSOLIDATE META CAMPAIGN STRUCTURE',
        description: 'Reduce active Meta campaigns from 8 down to 1 Main Scaling CBO + 1 Sandbox Testing campaign.',
        reason: 'Current structure fragments learning data across low-volume ad sets.',
        expected_impact: 'Improved signal concentration and clearer testing feedback loops.',
        effort: 'LOW',
        priority: 'HIGH',
        owner: 'Elena Rostova',
        status: 'APPROVED',
      },
      {
        id: 'rec-2',
        title: 'IMPLEMENT SERVER-SIDE CAPI VIA STAPE.IO',
        description: 'Deploy Server-Side Meta CAPI and Enhanced Conversions on Shopify domain.',
        reason: 'iOS 14.5 signal loss is causing 22% under-reporting of conversions in Meta Ads Manager.',
        expected_impact: 'Higher attribution accuracy and lower calculated CPA.',
        effort: 'MEDIUM',
        priority: 'HIGH',
        owner: 'Devon Vance',
        status: 'IMPLEMENTING',
      },
      {
        id: 'rec-3',
        title: 'LAUNCH CORPORATE GIFTING LANDING PAGE',
        description: 'Build dedicated B2B co-branded ordering page for holiday gift orders.',
        reason: 'Inbound requests indicate untapped revenue in corporate holiday bulk orders.',
        expected_impact: 'Add $45k+ in high-margin bulk B2B revenue in Q4.',
        effort: 'MEDIUM',
        priority: 'MEDIUM',
        owner: 'Kaelen Voss',
        status: 'PROPOSED',
      },
    ],

    roadmap: [
      {
        phase_number: 'PHASE 01',
        title: 'FOUNDATION & TRACKING AUDIT',
        description: 'Fix attribution tracking, consolidate campaign architecture, and build creative testing sandbox.',
        start_date: 'Jul 10, 2026',
        end_date: 'Jul 25, 2026',
        status: 'COMPLETED',
        objectives: ['Validate Server-Side CAPI tracking', 'Consolidate Meta campaign structures'],
        deliverables: ['Tracking Audit Report', 'New CBO Campaign Structure Live'],
      },
      {
        phase_number: 'PHASE 02',
        title: 'CREATIVE ITERATION & TESTING SPRINTS',
        description: 'Launch bi-weekly 3x3 Dynamic Creative Tests across Meta and TikTok to find core winning angles.',
        start_date: 'Jul 26, 2026',
        end_date: 'Aug 20, 2026',
        status: 'IN PROGRESS',
        objectives: ['Validate 3 product demonstration creative angles', 'Expand TikTok creator content pipeline'],
        deliverables: ['Creative Testing Matrix v1', '6 Winning Creative Assets'],
      },
      {
        phase_number: 'PHASE 03',
        title: 'SCALING & CHANNEL EXPANSION',
        description: 'Scale daily spend on winning creatives by 25% weekly while scaling Google PMax asset groups.',
        start_date: 'Aug 21, 2026',
        end_date: 'Sep 15, 2026',
        status: 'NOT STARTED',
        objectives: ['Scale monthly media budget to $50k', 'Launch B2B corporate gifting pilot'],
        deliverables: ['PMax Asset Upgrade', 'Q3 Performance Scaling Report'],
      },
      {
        phase_number: 'PHASE 04',
        title: 'OPTIMIZATION & RETENTION INTEGRATION',
        description: 'Optimize post-purchase email flows and refine LTV repeat buyer campaigns for Q4 prep.',
        start_date: 'Sep 16, 2026',
        end_date: 'Sep 30, 2026',
        status: 'NOT STARTED',
        objectives: ['Improve 30-day repeat purchase rate to 18%', 'Finalize Q4 Black Friday / Cyber Monday Strategy'],
        deliverables: ['Q4 Growth Strategy Blueprint', 'LTV Retention Optimization'],
      },
    ],

    dependencies: [
      {
        id: 'dep-1',
        name: 'Client Creative Asset Approval (Aug Content Batch)',
        owner: 'Maya Chen (Client CMO)',
        status: 'COMPLETED',
        due_date: 'Aug 05, 2026',
      },
      {
        id: 'dep-2',
        name: 'Shopify Storefront App API Permissions for CAPI',
        owner: 'Client Tech Team',
        status: 'READY',
        due_date: 'Aug 12, 2026',
      },
      {
        id: 'dep-3',
        name: 'Product Inventory Restock (Everyday Backpack Charcoal)',
        owner: 'Client Supply Chain',
        status: 'PENDING',
        due_date: 'Aug 22, 2026',
      },
    ],

    risks: [
      {
        id: 'risk-1',
        risk: 'Attribution Tracking Discrepancy',
        probability: 'MEDIUM',
        impact: 'HIGH',
        mitigation: 'Implement Stape.io Server-Side CAPI and use First-Party GA4 UTM tracking as primary source of truth.',
        owner: 'Devon Vance',
        status: 'MITIGATED',
      },
      {
        id: 'risk-2',
        risk: 'Ad Fatigue on Primary Meta Winners',
        probability: 'HIGH',
        impact: 'MEDIUM',
        mitigation: 'Enforce strict 14-day creative refresh cycle with 3 new hook variations per sprint.',
        owner: 'Marcus Vance',
        status: 'OPEN',
      },
      {
        id: 'risk-3',
        risk: 'Inventory Stockouts on Top-Selling SKU during scaling sprint',
        probability: 'MEDIUM',
        impact: 'CRITICAL',
        mitigation: 'Establish automated inventory threshold triggers to shift ad budget to secondary SKUs if stock < 200 units.',
        owner: 'Kaelen Voss',
        status: 'OPEN',
      },
    ],

    assumptions: [
      'Ad platform policy guidelines remain stable without unexpected ad account restrictions.',
      'Client creative production capacity remains available to produce 4 video assets per month.',
      'Client product inventory levels can support up to 30% month-over-month order volume growth.',
    ],

    measurement_framework: [
      {
        id: 'ms-1',
        metric: 'Blended ROAS (Return on Ad Spend)',
        type: 'BUSINESS KPI',
        definition: 'Total DTC Net Revenue divided by Total Ad Spend across Meta + Google + TikTok.',
        source: 'Shopify + Meta + Google + TikTok',
        target: '> 3.2x Blended ROAS',
        frequency: 'Daily & Weekly',
        owner: 'Kaelen Voss',
        status: 'DEMO',
      },
      {
        id: 'ms-2',
        metric: 'Customer Acquisition Cost (CAC)',
        type: 'BUSINESS KPI',
        definition: 'Total Paid Media Spend divided by Total New Customers acquired.',
        source: 'Blended First-Party Data',
        target: '< $38.00 per customer',
        frequency: 'Weekly',
        owner: 'Elena Rostova',
        status: 'DEMO',
      },
      {
        id: 'ms-3',
        metric: 'Meta Ad Account ROAS',
        type: 'CHANNEL KPI',
        definition: 'Meta 7-Day Click / 1-Day View attributed revenue divided by Meta Spend.',
        source: 'Meta Ads Manager CAPI',
        target: '> 2.6x Meta ROAS',
        frequency: 'Daily',
        owner: 'Elena Rostova',
        status: 'NOT CONNECTED',
      },
      {
        id: 'ms-4',
        metric: 'Creative Hook Rate (3-Sec View / Impression)',
        type: 'CAMPAIGN KPI',
        definition: 'Percentage of users who watch at least 3 seconds of video ad content.',
        source: 'Meta & TikTok Video Analytics',
        target: '> 35% Hook Rate',
        frequency: 'Per Ad Creative',
        owner: 'Marcus Vance',
        status: 'NOT CONNECTED',
      },
    ],

    data_sources: [
      { name: 'Meta Ads API', category: 'Paid Channel', status: 'DEMO / MOCK' },
      { name: 'Google Ads API', category: 'Paid Channel', status: 'DEMO / MOCK' },
      { name: 'TikTok Ads API', category: 'Paid Channel', status: 'DEMO / MOCK' },
      { name: 'Shopify Storefront API', category: 'Ecommerce Platform', status: 'DEMO / MOCK' },
      { name: 'Google Analytics 4 (GA4)', category: 'Analytics', status: 'DEMO / MOCK' },
    ],

    approval: {
      status: 'APPROVED',
      internal_review: {
        reviewer: 'Kaelen Voss (Strategy Director)',
        date: 'Jul 12, 2026',
        comment: 'Strategy objectives aligned with client Q3 growth goals. Approved for client presentation.',
        status: 'APPROVED',
      },
      client_review: {
        status: 'APPROVED',
        sent_date: 'Jul 14, 2026',
        comment: 'Maya Chen approved strategy on behalf of Northstar Commerce executive board.',
      },
    },

    version_history: [
      {
        version: 'v1.4',
        is_current: true,
        date: 'Aug 08, 2026',
        author: 'Kaelen Voss',
        summary: 'Updated budget allocation and added TikTok Spark Ads channel testing plan.',
        status: 'ACTIVE',
      },
      {
        version: 'v1.3',
        is_current: false,
        date: 'Aug 02, 2026',
        author: 'Elena Rostova',
        summary: 'Revised audience targeting criteria and added Server-Side CAPI implementation risk.',
        status: 'SUPERSEDED',
      },
      {
        version: 'v1.2',
        is_current: false,
        date: 'Jul 21, 2026',
        author: 'Marcus Vance',
        summary: 'Expanded creative testing angles and added 3x3 Dynamic Creative Test framework.',
        status: 'SUPERSEDED',
      },
      {
        version: 'v1.0',
        is_current: false,
        date: 'Jul 10, 2026',
        author: 'Kaelen Voss',
        summary: 'Initial Q3 Strategy Draft created and submitted for executive approval.',
        status: 'SUPERSEDED',
      },
    ],

    activities: [
      {
        id: 'act-str-1',
        title: 'Strategy Version v1.4 Released',
        description: 'Budget reallocation complete; updated TikTok Spark Ads testing scope.',
        timestamp: 'Aug 08, 2026',
        author: 'Kaelen Voss',
      },
      {
        id: 'act-str-2',
        title: 'Recommendation Approved',
        description: 'Consolidate Meta Campaign Structure recommendation marked APPROVED by client CMO.',
        timestamp: 'Aug 03, 2026',
        author: 'Maya Chen',
      },
      {
        id: 'act-str-3',
        title: 'Experiment CREATIVE ANGLE TEST Started',
        description: 'Launched Meta Dynamic Creative Sandbox test with 3 video hook variations.',
        timestamp: 'Aug 01, 2026',
        author: 'Marcus Vance',
      },
      {
        id: 'act-str-4',
        title: 'Strategy Approved by Client',
        description: 'Maya Chen approved initial Q3 Growth Acquisition Strategy.',
        timestamp: 'Jul 15, 2026',
        author: 'Maya Chen',
      },
    ],

    notes: [
      {
        id: 'note-str-1',
        author: 'Kaelen Voss',
        text: 'Client requested keeping total monthly media spend capped at $50k until CAPI tracking verification is complete.',
        created_at: 'Aug 05, 2026',
      },
      {
        id: 'note-str-2',
        author: 'Marcus Vance',
        text: 'Creator batch #2 looks very strong. Founder story video hook #3 had 42% hook rate in initial test run.',
        created_at: 'Aug 02, 2026',
      },
    ],
  },

  {
    id: 'MG-STR-2026-015',
    name: 'Omni-Channel Brand Scale Strategy',
    strategy_type: 'GROWTH',
    status: 'IN REVIEW',
    health: 'ATTENTION',
    version: 'v1.1',
    is_current: true,

    client_id: 'MG-CL-2026-002',
    client_business_name: 'Atlas Health Systems',
    project_id: 'MG-PRJ-2026-002',
    project_name: 'Patient Portal Platform Redesign',

    strategy_lead: 'Elena Rostova (Strategy)',
    contributors: ['Devon Vance (Tech Lead)', 'Kaelen Voss (Growth Director)'],
    approvers: ['Kaelen Voss'],
    client_stakeholders: ['Dr. Aris Vance (Chief Medical Officer)', 'Sarah Jenkins (VP Ops)'],

    created_at: 'Aug 01, 2026',
    last_updated: 'Aug 06, 2026',
    next_review_date: 'Sep 05, 2026',

    description:
      'Strategic framework for patient portal engagement, Telehealth adoption, and HIPAA-compliant digital acquisition.',
    executive_summary:
      'Atlas Health Systems is transitioning to an integrated digital care platform. This strategy outlines HIPAA-compliant patient acquisition and retention funnels across Google Search and localized care networks.',

    business_context: {
      business_model: 'Professional Services',
      industry: 'Healthcare & Telehealth',
      primary_market: 'United States (East Coast)',
      secondary_markets: [],
      countries: ['USA'],
      languages: ['English', 'Spanish'],
      currency: 'USD',
      product_service: 'Specialty Healthcare Clinics & Telehealth Portal',
      business_maturity: 'Established Health System ($50M+ Revenue)',
      growth_stage: 'Digital Transformation & Patient Retention Expansion',
      current_situation:
        'Patient acquisition relies heavily on physician referrals. Digital acquisition is fragmented with low portal registration conversion.',
      strategic_problem:
        'Patient onboarding friction is high, resulting in 35% drop-off during portal account creation.',
      strategic_opportunity:
        'Streamline digital booking and launch HIPAA-compliant localized search campaigns targeting high-intent specialty care terms.',
    },

    objectives: [
      {
        id: 'obj-at-1',
        number: '01',
        name: 'Streamline Patient Onboarding Flow',
        description: 'Reduce portal setup steps from 7 down to 3, increasing registration completion rate.',
        priority: 'PRIMARY',
        status: 'IN PROGRESS',
        owner: 'Devon Vance',
        measurement_target: {
          metric_name: 'Portal Signup CVR',
          target_value: '> 65% Completion',
          status: 'NOT CONNECTED',
        },
      },
      {
        id: 'obj-at-2',
        number: '02',
        name: 'Capture High-Intent Specialty Search',
        description: 'Deploy targeted Google Search campaigns for regional specialty cardiology and telehealth services.',
        priority: 'HIGH',
        status: 'IN PROGRESS',
        owner: 'Elena Rostova',
        measurement_target: {
          metric_name: 'Qualified Appointment Volume',
          target_value: '+ 250 Bookings / mo',
          status: 'NOT CONNECTED',
        },
      },
    ],

    audience: {
      primary_audience: {
        name: 'Patients Seeking Specialty Care & Telehealth',
        age_range: '30 – 65 years old',
        geography: 'Regional Metro Areas (Boston, NY, Philadelphia)',
        gender: 'All',
        interests: 'Healthcare, Wellness, Preventive Care, Telemedicine',
        behavior: 'Prefers online scheduling and digital prescription refills',
        buying_intent: 'High immediate need for specialty physician consultations',
        pain_points: 'Long phone hold times and complicated medical portal log-ins',
        needs: 'Fast 24/7 online appointment booking and mobile medical record access',
        motivations: 'Quality of care, convenience, trusted medical reputation',
        barriers: 'Privacy concerns and insurance verification confusion',
        use_case: 'Booking virtual specialist appointments and viewing lab results',
      },
      customer_problem: 'Patients want instant online booking but abandon complex registration forms.',
      primary_motivators: ['Trust', 'Convenience', 'Speed', 'Product quality'],
      primary_objections: ['Lack of trust', 'Complexity', 'Privacy/HIPAA concerns'],
    },

    positioning: {
      market_position: 'Premier Integrated Specialty Health & Telehealth Provider',
      core_value_proposition: 'World-class specialty care, accessible in seconds from any device.',
      key_differentiators: [
        'Same-day virtual specialist consultations',
        'HIPAA-bank-grade encrypted patient portal',
        'Direct integration with major health insurance networks',
      ],
      proof_points: ['Top 10 Rated Regional Healthcare System', 'Over 200 Board-Certified Specialists'],
      competitive_advantage: 'Seamless hybrid in-person and digital care coordination.',
      brand_promise: 'Compassionate medical care powered by modern digital access.',
      competitors: [
        {
          id: 'comp-at-1',
          name: 'Metro Care Health',
          category: 'Regional Hospital Network',
          strength: 'Large physical footprint',
          weakness: 'Legacy clunky portal software',
          strategic_implication: 'Position Atlas as the frictionless, instant digital alternative.',
        },
      ],
    },

    channels: [
      {
        id: 'chan-at-1',
        channel_name: 'Google Health Search Ads',
        role: 'ACQUISITION',
        priority: 'CORE',
        objective: 'Capture high-intent searches for regional specialty care and virtual appointments.',
        audience: 'Searchers in target zip codes seeking cardiologists, neurologists, telehealth',
        budget_allocation_pct: 60,
        current_status: 'ACTIVE',
        owner: 'Elena Rostova',
        approach: 'HIPAA-compliant ad copy emphasizing same-day booking availability.',
      },
      {
        id: 'chan-at-2',
        channel_name: 'Localized SEO & Google Business Profiles',
        role: 'AWARENESS',
        priority: 'CORE',
        objective: 'Dominate regional local pack map rankings for clinic locations.',
        audience: 'Local residents seeking near-me medical clinics',
        budget_allocation_pct: 25,
        current_status: 'ACTIVE',
        owner: 'Elena Rostova',
        approach: 'Optimize 14 Google Business listings with verified doctor profiles.',
      },
      {
        id: 'chan-at-3',
        channel_name: 'Patient Email & SMS Portal Reminders',
        role: 'RETENTION',
        priority: 'SUPPORT',
        objective: 'Drive annual wellness checkups and prescription refill portal usage.',
        audience: 'Existing registered patient database',
        budget_allocation_pct: 15,
        current_status: 'PLANNED',
        owner: 'Devon Vance',
        approach: 'HIPAA-compliant automated notifications.',
      },
    ],

    budget: {
      client_media_spend_range: '$15,000 – $30,000 / month',
      currency: 'USD',
      flexibility: 'FIXED',
      note: 'Client media spend paid directly to search platforms.',
      allocations: [
        { channel_name: 'Google Ads', percentage: 60, estimated_amount: '$12,000 / mo' },
        { channel_name: 'Local SEO & Listings', percentage: 25, estimated_amount: '$5,000 / mo' },
        { channel_name: 'Retention Messaging', percentage: 15, estimated_amount: '$3,000 / mo' },
      ],
    },

    funnel: [
      {
        stage: 'DISCOVERY',
        audience: 'Patients searching for specialty symptoms or doctor names',
        channels: ['Google Search', 'Google Maps Local Pack'],
        message: 'Connect with a board-certified specialist today.',
        offer: 'Same-Day Virtual Consultation',
        creative: 'Clean medical trust badges and verified doctor reviews',
        landing_experience: 'Specialty Doctor Directory Page',
        measurement: 'Cost Per Impression, Search Impression Share',
      },
      {
        stage: 'CONVERSION',
        audience: 'High intent appointment bookers',
        channels: ['Atlas Online Booking Portal'],
        message: '3 simple steps to schedule your virtual visit.',
        offer: 'Instant Insurance Verification',
        creative: '3-step visual calendar interface',
        landing_experience: 'Seamless Patient Booking Form',
        measurement: 'Completed Appointment Rate',
      },
    ],

    messaging: {
      core_message: 'Specialty healthcare engineered around your busy life.',
      supporting_messages: [
        'Book online in under 60 seconds with instant insurance verification.',
        'Access lab results and specialist notes 24/7 on your phone.',
      ],
      proof_points: ['200+ Board Certified Specialists', '4.9 Star Patient Satisfaction Rating'],
      offer: 'Same-Day Virtual Specialist Consultations Available',
      cta: 'Find A Doctor & Book Online →',
      objection_handling: 'Bank-grade 256-bit HIPAA encryption protects your medical records.',
    },

    creative: {
      themes: ['Physician Expertise', 'Frictionless Mobile Booking', 'Patient Success Stories'],
      angles: [
        {
          id: 'ang-at-1',
          number: '01',
          title: 'Doctor Spotlight',
          description: '30-second introduction from head of cardiology explaining virtual visits.',
        },
      ],
      formats: ['Search Ad Headlines', 'Mobile Responsive Banners', 'Local Maps Pin Cards'],
      testing_approach: 'A/B testing ad copy emphasizing "Same Day Booking" vs "Board Certified Care".',
    },

    experiments: [
      {
        id: 'exp-at-1',
        name: 'GUEST APPOINTMENT BOOKING VS FORCED PORTAL SIGNUP',
        hypothesis: 'Allowing patients to select appointment slot before creating account will increase completion.',
        channel: 'Booking Portal',
        variable: 'Onboarding Flow Sequence',
        expected_outcome: '+30% conversion rate on booking funnel.',
        priority: 'HIGH IMPACT',
        status: 'PLANNED',
        owner: 'Devon Vance',
      },
    ],

    hypotheses: [
      {
        id: 'hyp-at-1',
        hypothesis: 'Removing upfront password creation during scheduling will double completed bookings.',
        reasoning: 'Form tracking indicates 40% drop-off at password creation step.',
      },
    ],

    recommendations: [
      {
        id: 'rec-at-1',
        title: 'ENABLE ONE-CLICK INSURANCE CARD PHOTO UPLOAD',
        description: 'Allow patients to photograph insurance card instead of typing policy numbers manually.',
        reason: 'Typing 16-digit policy numbers causes severe mobile drop-off.',
        expected_impact: '+15% mobile booking conversion.',
        effort: 'LOW',
        priority: 'HIGH',
        owner: 'Devon Vance',
        status: 'APPROVED',
      },
    ],

    roadmap: [
      {
        phase_number: 'PHASE 01',
        title: 'PORTAL UX OPTIMIZATION & SEARCH LAUNCH',
        description: 'Redesign booking wizard and launch targeted Google Search campaigns.',
        start_date: 'Aug 01, 2026',
        end_date: 'Aug 30, 2026',
        status: 'IN PROGRESS',
        objectives: ['Deploy 3-step booking wizard', 'Launch Cardiology Google Search campaigns'],
        deliverables: ['Updated Booking Portal', 'Google Search Campaign Setup'],
      },
    ],

    dependencies: [
      {
        id: 'dep-at-1',
        name: 'HIPAA Compliance Officer Legal Sign-off',
        owner: 'Sarah Jenkins',
        status: 'READY',
        due_date: 'Aug 10, 2026',
      },
    ],

    risks: [
      {
        id: 'risk-at-1',
        risk: 'HIPAA Data Privacy Breach on Ad Pixel Data',
        probability: 'LOW',
        impact: 'CRITICAL',
        mitigation: 'Strictly prohibit conversion pixels on pages containing patient health diagnoses or PHI.',
        owner: 'Devon Vance',
        status: 'MITIGATED',
      },
    ],

    assumptions: [
      'Clinics maintain open appointment calendar slots for digital patients.',
    ],

    measurement_framework: [
      {
        id: 'ms-at-1',
        metric: 'Cost Per Appointment Booked',
        type: 'BUSINESS KPI',
        definition: 'Total Ad Spend divided by verified completed patient appointments.',
        source: 'Google Ads + Portal Database',
        target: '< $65.00 per booking',
        frequency: 'Weekly',
        owner: 'Elena Rostova',
        status: 'DEMO',
      },
    ],

    data_sources: [
      { name: 'Google Ads API', category: 'Paid Channel', status: 'DEMO / MOCK' },
      { name: 'Epic EHR Patient API', category: 'Medical Portal', status: 'DEMO / MOCK' },
    ],

    approval: {
      status: 'INTERNAL REVIEW',
      internal_review: {
        reviewer: 'Kaelen Voss (Strategy Director)',
        date: 'Aug 06, 2026',
        comment: 'Under internal review for HIPAA compliance check.',
        status: 'IN REVIEW',
      },
      client_review: {
        status: 'NOT SENT',
      },
    },

    version_history: [
      {
        version: 'v1.1',
        is_current: true,
        date: 'Aug 06, 2026',
        author: 'Elena Rostova',
        summary: 'Updated HIPAA data compliance guidelines and search channel budget.',
        status: 'IN REVIEW',
      },
      {
        version: 'v1.0',
        is_current: false,
        date: 'Aug 01, 2026',
        author: 'Elena Rostova',
        summary: 'Initial strategy draft for Atlas Health System redesign.',
        status: 'SUPERSEDED',
      },
    ],

    activities: [
      {
        id: 'act-at-1',
        title: 'Strategy Version v1.1 Submitted for Review',
        description: 'Submitted to Kaelen Voss for internal agency review.',
        timestamp: 'Aug 06, 2026',
        author: 'Elena Rostova',
      },
    ],

    notes: [
      {
        id: 'note-at-1',
        author: 'Elena Rostova',
        text: 'Must confirm with Dr. Aris Vance which cardiology clinic locations have available open appointment slots in September.',
        created_at: 'Aug 04, 2026',
      },
    ],
  },

  {
    id: 'MG-STR-2026-016',
    name: 'B2B Enterprise Pipeline Growth Strategy',
    strategy_type: 'B2B',
    status: 'ACTIVE',
    health: 'ON TRACK',
    version: 'v2.0',
    is_current: true,

    client_id: 'MG-CL-2026-003',
    client_business_name: 'Vertex Industrial',
    project_id: 'MG-PRJ-2026-003',
    project_name: 'Enterprise Commerce Portal & CRM Sync',

    strategy_lead: 'Kaelen Voss (Strategy Lead)',
    contributors: ['Devon Vance (Tech Lead)'],
    approvers: ['Kaelen Voss', 'Marcus Vance'],
    client_stakeholders: ['Robert Vance (CEO)', 'David Miller (VP Sales)'],

    created_at: 'May 15, 2026',
    last_updated: 'Jul 28, 2026',
    next_review_date: 'Aug 25, 2026',

    description:
      'Account-Based Marketing (ABM) and LinkedIn demand generation framework targeting industrial enterprise buyers.',
    executive_summary:
      'Vertex Industrial requires a modernized B2B pipeline engine. This strategy integrates ABM targeted advertising on LinkedIn with custom HubSpot lead scoring to acquire high-value industrial equipment contracts.',

    business_context: {
      business_model: 'B2B',
      industry: 'Industrial Equipment & Manufacturing Supplies',
      primary_market: 'North America',
      secondary_markets: ['Mexico'],
      countries: ['USA', 'Canada', 'Mexico'],
      languages: ['English', 'Spanish'],
      currency: 'USD',
      product_service: 'Heavy Automation Machinery & Component Replacements',
      business_maturity: 'Mature B2B Enterprise ($100M+ Revenue)',
      growth_stage: 'Digital Sales Enablement & E-Commerce Portal Launch',
      current_situation:
        'Sales pipeline relies on manual field sales reps. E-commerce portal adoption among existing accounts is low.',
      strategic_problem:
        'Long 9-month deal cycles without digital lead nurturing result in lost pipeline opportunities.',
      strategic_opportunity:
        'Target VP Engineering and Procurement decision makers with interactive ROI calculators and automated LinkedIn ABM campaigns.',
    },

    objectives: [
      {
        id: 'obj-vx-1',
        number: '01',
        name: 'Generate Qualified Pipeline Opportunities',
        description: 'Acquire 40 verified enterprise sales demo requests per quarter via LinkedIn ABM and Search.',
        priority: 'PRIMARY',
        status: 'ON TRACK',
        owner: 'Kaelen Voss',
        measurement_target: {
          metric_name: 'Pipeline Value Generated',
          target_value: '> $1.5M Qualified Pipeline / Qtr',
          status: 'NOT CONNECTED',
        },
      },
    ],

    audience: {
      primary_audience: {
        name: 'VP Engineering & Industrial Procurement Managers',
        age_range: '35 – 55 years old',
        geography: 'Industrial Hubs (Midwest US, Texas, Ontario)',
        gender: 'All',
        interests: 'Industrial Automation, Supply Chain Efficiency, Manufacturing Tech',
        behavior: 'Researching technical specifications on LinkedIn and Google Search',
        buying_intent: 'High contract value ($50k–$500k order potential)',
        pain_points: 'Equipment downtime costs $10k/hr; existing vendor ordering is manual',
        needs: 'Instant digital quotes, guaranteed 24-hr parts replacement',
        motivations: 'Operational uptime, risk reduction, cost containment',
        barriers: 'Strict corporate procurement approval procedures',
        use_case: 'Sourcing automation parts and requesting custom machinery quotes',
      },
      customer_problem: 'Industrial buyers cannot easily calculate ROI or get instant digital specs online.',
      primary_motivators: ['Trust', 'Speed', 'Product quality', 'Price-to-value'],
      primary_objections: ['High switching cost', 'Complexity', 'Lack of trust'],
    },

    positioning: {
      market_position: 'Premium Industrial Automation Partner',
      core_value_proposition: 'Zero-downtime industrial automation with 24-hour guaranteed component delivery.',
      key_differentiators: [
        'Proprietary IoT health monitoring on all machinery',
        'Direct ERP integration for automated re-ordering',
        'Dedicated 24/7 industrial engineer support',
      ],
      proof_points: ['Serving 45% of Fortune 500 Manufacturers', '99.8% On-Time Parts Delivery'],
      competitive_advantage: 'Seamless B2B portal ordering paired with enterprise field support.',
      brand_promise: 'Maximum plant uptime, guaranteed.',
      competitors: [
        {
          id: 'comp-vx-1',
          name: 'Global Heavy Supply',
          category: 'Legacy B2B Distributor',
          strength: 'Established relationships',
          weakness: 'No online portal, paper catalog ordering',
          strategic_implication: 'Emphasize instant 60-second online portal ordering and automated PO creation.',
        },
      ],
    },

    channels: [
      {
        id: 'chan-vx-1',
        channel_name: 'LinkedIn ABM & InMail Ads',
        role: 'ACQUISITION',
        priority: 'CORE',
        objective: 'Target matched accounts lists of Fortune 1000 manufacturing plants.',
        audience: 'Job Titles: VP Engineering, Plant Manager, Procurement Director',
        budget_allocation_pct: 50,
        current_status: 'ACTIVE',
        owner: 'Kaelen Voss',
        approach: 'Lead Gen Forms with downloadable "2026 Industrial Automation Whitepaper".',
      },
      {
        id: 'chan-vx-2',
        channel_name: 'Google B2B Search Ads',
        role: 'CONVERSION',
        priority: 'CORE',
        objective: 'Capture high-intent machinery model keywords.',
        audience: 'Search intent: Industrial replacement parts and automation suppliers',
        budget_allocation_pct: 35,
        current_status: 'ACTIVE',
        owner: 'Kaelen Voss',
        approach: 'Exact match product specs targeting.',
      },
      {
        id: 'chan-vx-3',
        channel_name: 'HubSpot Email Nurture Sequences',
        role: 'RETENTION',
        priority: 'SUPPORT',
        objective: 'Nurture enterprise leads over 90-day sales cycle.',
        audience: 'Inbound whitepaper leads',
        budget_allocation_pct: 15,
        current_status: 'ACTIVE',
        owner: 'Devon Vance',
        approach: 'Drip sequence highlighting case studies and customer ROI.',
      },
    ],

    budget: {
      client_media_spend_range: '$30,000 – $60,000 / month',
      currency: 'USD',
      flexibility: 'PERFORMANCE-DEPENDENT',
      note: 'Client media spend paid to LinkedIn and Google Ads.',
      allocations: [
        { channel_name: 'LinkedIn ABM', percentage: 50, estimated_amount: '$20,000 / mo' },
        { channel_name: 'Google B2B Search', percentage: 35, estimated_amount: '$14,000 / mo' },
        { channel_name: 'Email & CRM Automation', percentage: 15, estimated_amount: '$6,000 / mo' },
      ],
    },

    funnel: [
      {
        stage: 'DISCOVERY',
        audience: 'Targeted Account VP Engineers on LinkedIn',
        channels: ['LinkedIn Lead Gen Ads'],
        message: 'Calculate your plant downtime risk in 2 minutes.',
        offer: '2026 Industrial Automation ROI Calculator',
        creative: 'Technical whitepaper cover & ROI graph preview',
        landing_experience: 'LinkedIn In-App Lead Form',
        measurement: 'Cost Per Lead, Lead Form Fill CVR',
      },
      {
        stage: 'CONSIDERATION',
        audience: 'MQL Leads in HubSpot',
        channels: ['HubSpot Drip', 'Sales Rep Follow-up'],
        message: 'See how Vertex reduced plant downtime by 40% for GE Appliances.',
        offer: 'Personalized Plant Audit Consultation',
        creative: 'Video Case Study featuring GE Plant Director',
        landing_experience: 'Customized Audit Request Landing Page',
        measurement: 'MQL to SQL Conversion Rate',
      },
    ],

    messaging: {
      core_message: 'Next-generation industrial automation with guaranteed zero-downtime support.',
      supporting_messages: [
        'Instant digital portal quotes save 3 days of procurement back-and-forth.',
        'Direct ERP integration with SAP, Oracle, and NetSuite.',
      ],
      proof_points: ['Trusted by 45% of Fortune 500 Manufacturers', '99.8% On-time delivery rating'],
      offer: 'Request Free Industrial Automation Audit & Live Portal Demo',
      cta: 'Schedule Executive Demo →',
      objection_handling: 'Dedicated migration engineer handles full ERP setup in under 5 business days.',
    },

    creative: {
      themes: ['Downtime Risk Reduction', 'Industrial ROI', 'Tech Specifications'],
      angles: [
        {
          id: 'ang-vx-1',
          number: '01',
          title: 'ROI Calculator Callout',
          description: 'Highlight real cost savings achieved by switching to Vertex automated re-ordering.',
        },
      ],
      formats: ['Document Carousels', 'Single Image Specs', 'Lead Gen Form Banners'],
      testing_approach: 'Test Job Title messaging: VP Engineering vs Purchasing Director.',
    },

    experiments: [
      {
        id: 'exp-vx-1',
        name: 'LINKEDIN DOCUMENT CAROUSEL VS SINGLE IMAGE ADS',
        hypothesis: 'Interactive 5-page PDF document carousels will generate 30% lower CPL.',
        channel: 'LinkedIn Ads',
        variable: 'Ad Format',
        expected_outcome: 'Lower CPL and higher lead quality score.',
        priority: 'HIGH IMPACT',
        status: 'WINNER',
        owner: 'Kaelen Voss',
      },
    ],

    hypotheses: [
      {
        id: 'hyp-vx-1',
        hypothesis: 'Targeting Plant Managers with downtime cost messaging yields 2x higher lead form completions than targeting C-Suite.',
        reasoning: 'Plant Managers feel daily operational pain directly.',
      },
    ],

    recommendations: [
      {
        id: 'rec-vx-1',
        title: 'INTEGRATE HUBSPOT LEAD SCORING WITH LINKEDIN API',
        description: 'Auto-sync high-scoring SQL leads back to LinkedIn as custom conversion offline events.',
        reason: 'Improve LinkedIn algorithm optimization towards closed deals.',
        expected_impact: '20% increase in SQL lead density.',
        effort: 'MEDIUM',
        priority: 'HIGH',
        owner: 'Devon Vance',
        status: 'APPROVED',
      },
    ],

    roadmap: [
      {
        phase_number: 'PHASE 01',
        title: 'ABM ACCOUNT LIST & LINKEDIN SETUP',
        description: 'Build target list of 2,500 manufacturing accounts and launch LinkedIn ABM campaigns.',
        start_date: 'May 15, 2026',
        end_date: 'Jun 15, 2026',
        status: 'COMPLETED',
        objectives: ['Match 2,500 enterprise accounts on LinkedIn', 'Launch Downtime ROI Whitepaper'],
        deliverables: ['Target Account Master List', 'LinkedIn ABM Live'],
      },
      {
        phase_number: 'PHASE 02',
        title: 'HUBSPOT DEMAND NURTURE & SALES SYNC',
        description: 'Deploy automated 5-part email nurture sequence and CRM lead scoring.',
        start_date: 'Jun 16, 2026',
        end_date: 'Jul 30, 2026',
        status: 'COMPLETED',
        objectives: ['Automate lead routing to sales team', 'Achieve $1M+ in qualified pipeline'],
        deliverables: ['HubSpot Sequence Live', 'Q2 Pipeline Report'],
      },
    ],

    dependencies: [
      {
        id: 'dep-vx-1',
        name: 'HubSpot API Key Access',
        owner: 'David Miller',
        status: 'COMPLETED',
        due_date: 'May 20, 2026',
      },
    ],

    risks: [
      {
        id: 'risk-vx-1',
        risk: 'Long Sales Cycles (6-9 Months) Obscuring Ad Attribution',
        probability: 'HIGH',
        impact: 'MEDIUM',
        mitigation: 'Track First-Touch and Lead Creation milestones in HubSpot CRM.',
        owner: 'Kaelen Voss',
        status: 'ACCEPTED',
      },
    ],

    assumptions: [
      'Vertex sales team contacts inbound demo requests within 4 business hours.',
    ],

    measurement_framework: [
      {
        id: 'ms-vx-1',
        metric: 'Cost Per Qualified B2B Sales Demo',
        type: 'BUSINESS KPI',
        definition: 'Total LinkedIn + Search spend divided by confirmed sales demos held.',
        source: 'LinkedIn + HubSpot CRM',
        target: '< $450.00 per demo',
        frequency: 'Monthly',
        owner: 'Kaelen Voss',
        status: 'DEMO',
      },
    ],

    data_sources: [
      { name: 'LinkedIn Ads API', category: 'Paid Channel', status: 'DEMO / MOCK' },
      { name: 'HubSpot CRM API', category: 'CRM & Marketing', status: 'DEMO / MOCK' },
    ],

    approval: {
      status: 'APPROVED',
      internal_review: {
        reviewer: 'Kaelen Voss',
        date: 'May 18, 2026',
        comment: 'Strategy verified with client sales leadership.',
        status: 'APPROVED',
      },
      client_review: {
        status: 'APPROVED',
        sent_date: 'May 20, 2026',
        comment: 'Robert Vance approved v2.0 for execution.',
      },
    },

    version_history: [
      {
        version: 'v2.0',
        is_current: true,
        date: 'Jul 28, 2026',
        author: 'Kaelen Voss',
        summary: 'Updated campaign strategy following positive Q2 pipeline results.',
        status: 'ACTIVE',
      },
      {
        version: 'v1.0',
        is_current: false,
        date: 'May 15, 2026',
        author: 'Kaelen Voss',
        summary: 'Initial B2B strategy draft.',
        status: 'SUPERSEDED',
      },
    ],

    activities: [
      {
        id: 'act-vx-1',
        title: 'Strategy Version v2.0 Published',
        description: 'Updated pipeline goals for Q3/Q4.',
        timestamp: 'Jul 28, 2026',
        author: 'Kaelen Voss',
      },
    ],

    notes: [
      {
        id: 'note-vx-1',
        author: 'Kaelen Voss',
        text: 'LinkedIn Lead Gen forms are converting at 14.2% (industry benchmark is 8%). Keep document carousel as main lead magnet.',
        created_at: 'Jul 20, 2026',
      },
    ],
  },
];
