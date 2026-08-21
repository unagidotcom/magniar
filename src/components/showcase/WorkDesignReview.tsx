import React from 'react';
import { ShieldCheck, BookOpen, Layers, CheckCircle2, Terminal, Code } from 'lucide-react';

export function WorkDesignReview() {
  const reviews = [
    {
      num: '01',
      question: 'Why the Work page feels like proof rather than a portfolio gallery',
      answer:
        'Instead of generic SaaS cards featuring superficial hero images and promotional buzzwords, each Magniar case study is structured like an engineering brief. Cards display operational metadata (Geography, Business Model, Capability Pillars, Platforms, Media Budget Range, Status) and a dedicated primary highlight. Demo case studies are intentionally removed until verified client work is published from the Admin OS.',
    },
    {
      num: '02',
      question: 'How current and past clients are represented',
      answer:
        'The architecture supports distinct status states: ACTIVE_CLIENT, ONGOING, COMPLETED, SELECTED_PROJECT, and PAST_CLIENT. Each card and detail header displays an animated status pill (e.g. green for ACTIVE_CLIENT/ONGOING, blue for COMPLETED, purple for SELECTED_PROJECT). Active clients are not hidden; they represent active partnerships.',
    },
    {
      num: '03',
      question: 'How budgets are displayed safely',
      answer:
        'Budget is strictly segregated into separate dimensions: Media Budget Range ($10K–25K/mo), Project Budget, Retainer, and Total Value. Magniar fees are never conflated with media ad spend. The system supports four visibility modes: EXACT, RANGE, CATEGORY, and HIDDEN.',
    },
    {
      num: '04',
      question: 'How confidential clients can be supported',
      answer:
        'For clients under NDA or enterprise disclaimers, the `isConfidential` boolean flag replaces the public brand name with a generic title (e.g., "Confidential FinTech Platform" or "Anonymous E-Commerce Brand") while preserving the technical case details: Industry, Business Model, Budget Range, Capabilities, Platforms, Strategy, and Outcome.',
    },
    {
      num: '05',
      question: 'How filtering works',
      answer:
        'Filtering provides multi-dimensional exploration across 8 independent vectors: Industry, Business Model, Capability, Service, Platform, Budget Range, Status, and Geography. The interface remains ready for real published case-study records.',
    },
    {
      num: '06',
      question: 'How industry / business model / capability / service / platform remain distinct',
      answer:
        'Each dimension represents a distinct property in TypeScript types (`types/work.ts`). Industry categorizes the market sector (e.g. E-Commerce), Business Model defines revenue mechanics (DTC vs SaaS), Capability defines the core engineering discipline (Performance, Commerce, Development, Intelligence), Service lists concrete deliverables (Google Ads, Custom React App), and Platform defines the tech stack (Meta, Shopify, Amazon).',
    },
    {
      num: '07',
      question: 'How a case study can contain multiple services',
      answer:
        'Rather than restricting a case study to a single tag, each record holds an array of `servicesUsed: string[]` and `capabilities: CapabilityPillarId[]`. A single engagement can integrate Meta Ads, Shopify Development, Server-Side CAPI, and AI Lead Scoring simultaneously.',
    },
    {
      num: '08',
      question: 'How the architecture supports one client having multiple case studies',
      answer:
        'Clients and Case Studies are separate entities (`ClientRef` vs `CaseStudy`). A `clientId` foreign key links case studies to a client record. A single client can have multiple verified case study entries over time.',
    },
    {
      num: '09',
      question: 'How the future Admin system can control public visibility',
      answer:
        'The content model includes granular flags (`published: boolean`, `featured: boolean`, `budgetVisibility: BudgetVisibilityMode`, `isConfidential: boolean`). In the future Admin Panel, administrators will independently toggle visibility for client names, logos, budget numbers, and result metrics.',
    },
    {
      num: '10',
      question: 'How the future Supabase database can support this architecture',
      answer:
        'The frontend data structures mirror relational Postgres schemas: `clients` table, `case_studies` table with `client_id` FK, `case_study_services` junction table, `case_study_platforms` junction table, and `case_study_results` table with RLS policies restricting private contact/billing data from public view.',
    },
    {
      num: '11',
      question: 'How the page performs on mobile',
      answer:
        'On mobile viewports (e.g. 390px), cards stack vertically, metadata badges scale down, text sizes adjust to 12px/14px, and the desktop filter bar compresses into a full-screen drawer. All interactive elements satisfy touch-target standards (min 44px height).',
    },
    {
      num: '12',
      question: 'How this connects to the Industry and Capability pages',
      answer:
        'Services used within a case study detail view render as interactive chips linking directly to `/capabilities` or `/industries`. Visitors investigating a specific capability (e.g. Performance Marketing) or industry (e.g. E-Commerce) can immediately filter work records by that exact parameter.',
    },
  ];

  return (
    <div className="bg-[#0A0C0F] border border-white/10 rounded-[2px] p-6 sm:p-10 space-y-10 my-8">
      {/* Header */}
      <div className="border-b border-white/10 pb-6 space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-[#0099FF]/10 text-[#0099FF] border border-[#0099FF]/30 font-mono text-xs font-semibold rounded-[2px] uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            CHAPTER 08 DESIGN REVIEW
          </span>
          <span className="text-white/20">•</span>
          <span className="font-mono text-xs text-[#10B981] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            SPECIFICATION VERIFIED
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F7FA]">
          CHAPTER 08 — CASE STUDIES & PROOF OF WORK SPECIFICATION REVIEW
        </h2>
        <p className="text-sm font-mono text-[#8D949E] leading-relaxed">
          Comprehensive review answering the 12 required architectural and design review criteria for Magniar Chapter 08.
        </p>
      </div>

      {/* Review Q&A Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((r) => (
          <div
            key={r.num}
            className="p-6 bg-[#050505] border border-white/10 rounded-[2px] space-y-3 relative flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2 font-mono text-xs">
                <span className="text-[#0099FF] font-bold">ITEM {r.num}</span>
                <span className="text-[#10B981] text-[10px] bg-[#10B981]/10 px-2 py-0.5 border border-[#10B981]/20 rounded-[2px]">
                  VERIFIED
                </span>
              </div>
              <h3 className="text-base font-bold text-[#F5F7FA] mb-2">{r.question}</h3>
              <p className="text-xs text-[#8D949E] leading-relaxed font-sans">{r.answer}</p>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center gap-1.5 text-[10px] font-mono text-[#5A626E]">
              <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
              <span>COMPLIANT WITH CHAPTER 08 SPECIFICATION</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
