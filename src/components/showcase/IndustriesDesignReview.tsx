import React from 'react';
import { BookOpen, CheckCircle2, ShieldCheck, Layers, Cpu, Globe, Database, Smartphone } from 'lucide-react';

export const IndustriesDesignReview: React.FC = () => {
  const REVIEW_QUESTIONS = [
    {
      q: '1. How industry differs from business model.',
      a: 'Industry represents the macro domain market sector (e.g., Fashion, Professional Services, Healthcare). Business model represents how the business monetizes and operates structurally (e.g., DTC e-commerce, B2B sales-led, Marketplace, Subscription, Hybrid Retail). A company in the apparel industry could be a DTC brand, a marketplace seller, or a B2B wholesale firm. Magniar decouples these so growth strategies match operational reality.',
    },
    {
      q: '2. How industry differs from platform.',
      a: 'Industry is what the client sells and to whom. Platforms (e.g., Shopify, Amazon, Google Ads, Meta, LinkedIn, WooCommerce, TikTok Shop) are the execution environments and acquisition channels where operations take place. Platforms are tools in the growth system; they are not business categories.',
    },
    {
      q: '3. How the user explores their business type.',
      a: 'The user interacts with the Business Ecosystem Explorer network map or selector tabs. Selecting their business category (e.g., E-Commerce, B2B, DTC, Startups) updates node relationships in real-time, displaying how Magniar connects their specific business to tailored growth needs, required capabilities, and platform channels.',
    },
    {
      q: '4. How capabilities change depending on the business.',
      a: 'Different business types require different capability weights. For example, an E-Commerce brand requires heavy Performance Marketing (35%) and Digital Commerce (35%), whereas a B2B enterprise firm requires high Search/LinkedIn Performance (40%), custom Web & CRM Development (35%), and AI Lead Scoring (25%) without needing an e-commerce cart.',
    },
    {
      q: '5. How this connects to Chapter 05 (Capabilities).',
      a: 'Chapter 05 established WHAT Magniar does (Performance, Commerce, Development, Intelligence). Chapter 07 demonstrates how those four pillars are dynamically assembled around specific business types rather than sold as rigid standalone packages.',
    },
    {
      q: '6. How this connects to Chapter 06 (Process).',
      a: 'Chapter 06 established HOW Magniar works (Discover → Diagnose → Strategize → Build → Launch → Measure → Optimize → Scale). Chapter 07 shows that while the growth solution is completely customized to the business type, the rigorous 8-stage engineering process remains 100% consistent.',
    },
    {
      q: '7. How this will connect to Case Studies.',
      a: 'Chapter 07 prepares the data architecture for dynamic Case Study filtering across 8 schema dimensions (Industry, Business Model, Platform, Capability, Service, Budget, Geography, Engagement). It strictly avoids generating synthetic client numbers or fake testimonials.',
    },
    {
      q: '8. How this can eventually be powered by Supabase / Cloud Databases.',
      a: 'The frontend data structures (`IndustryCategory`, `BusinessModel`, `PlatformItem`, `CaseStudySchemaRef`) are normalized relational models ready for Supabase or Firestore tables. Future CMS endpoints will allow adding new business categories or mapping real case studies without frontend code edits.',
    },
    {
      q: '9. How the mobile experience works.',
      a: 'On mobile viewports (390px / 768px), the complex radial network visualizer gracefully degrades into touch-optimized expandable business cards, responsive pill filters, and clean stacked ecosystem lists, ensuring zero loss of information or clarity.',
    },
    {
      q: '10. Why this feels like Magniar rather than a generic agency website.',
      a: 'Generic agency websites display predictable 3x3 grids of stock photos labeled "Retail", "Healthcare", "SaaS". Magniar treats business categorization as an architectural network system, using dark technical precision, editorial typography, and interactive node relationships.',
    },
  ];

  return (
    <div className="w-full bg-[#080A0D] border border-white/10 rounded-[2px] p-6 lg:p-10 font-sans space-y-8">
      {/* Header */}
      <div className="border-b border-white/10 pb-6 space-y-2">
        <div className="flex items-center gap-2 font-mono text-xs text-[#B89A72]">
          <BookOpen className="w-4 h-4 text-[#B89A72]" />
          <span>CHAPTER 07 DESIGN REVIEW — INDUSTRIES / BUSINESS TYPES</span>
        </div>
        <h2 className="font-mono text-2xl lg:text-3xl font-bold text-white">
          Architectural Specification & Review Criteria
        </h2>
        <p className="text-sm text-[#8D949E] max-w-3xl">
          Comprehensive verification answering the 10 core architectural requirements for Chapter 07.
        </p>
      </div>

      {/* Review Questions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {REVIEW_QUESTIONS.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#050608] border border-white/10 p-5 rounded-[2px] space-y-2.5 font-sans relative"
          >
            <div className="flex items-center gap-2 font-mono text-xs text-[#B89A72] font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B89A72]" />
              <span>REQUIREMENT 0{idx + 1}</span>
            </div>
            <h3 className="font-mono text-sm font-bold text-white border-b border-white/5 pb-2">
              {item.q}
            </h3>
            <p className="text-xs text-[#8D949E] leading-relaxed">
              {item.a}
            </p>
          </div>
        ))}
      </div>

      {/* Verification Footer */}
      <div className="bg-[#0A0D12] border border-white/10 p-4 rounded-[2px] flex items-center justify-between text-xs font-mono text-[#5A626E]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#B89A72]" />
          <span>CHAPTER 07 INDUSTRIES PROTOCOL VERIFIED</span>
        </div>
        <span>SPECIFICATION COMPLETE</span>
      </div>
    </div>
  );
};
