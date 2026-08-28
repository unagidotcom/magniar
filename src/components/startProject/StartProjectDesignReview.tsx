import React from 'react';
import {
  BookOpen,
  CheckCircle2,
  FileText,
  ShieldCheck,
  UserCheck,
  DollarSign,
  Inbox,
  ArrowRight,
  Smartphone,
  CreditCard,
  Layout,
  Workflow,
  Sparkles,
  Layers,
} from 'lucide-react';

export const StartProjectDesignReview: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Title Header */}
      <div className="border-b border-white/10 pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-[#B89A72]/10 border border-[#B89A72]/30 font-mono text-xs font-semibold text-[#B89A72] uppercase tracking-widest">
          <BookOpen className="w-3.5 h-3.5" />
          <span>CHAPTER 10 DESIGN REVIEW & ARCHITECTURAL SPECIFICATION</span>
        </div>
        <h1 className="font-mono text-3xl sm:text-4xl font-bold text-[#F5F7FA] uppercase tracking-tight">
          MAGNIAR START A PROJECT / DISCOVERY ARCHITECTURE
        </h1>
        <p className="font-sans text-sm text-[#8D949E] leading-relaxed max-w-3xl">
          Comprehensive review answering the 11 key design, qualification, workflow, and technical architecture questions for Chapter 10.
        </p>
      </div>

      {/* 11 REVIEW POINTS GRID */}
      <div className="space-y-6 font-mono text-xs">
        {/* POINT 01 */}
        <div className="bg-[#0A0C0F] border border-white/10 p-6 rounded-[2px] space-y-3">
          <div className="flex items-center gap-2 text-[#B89A72] font-bold text-sm">
            <span className="px-2 py-0.5 rounded-[2px] bg-[#B89A72]/20 border border-[#B89A72]/40">
              01
            </span>
            <h3>WHY THIS IS MORE THAN A CONTACT FORM</h3>
          </div>
          <p className="font-sans text-xs text-[#8D949E] leading-relaxed">
            Standard contact forms collect unstructured raw text ("Name, Email, Message") resulting in low-quality leads and repetitive back-and-forth emails. Magniar's <span className="text-[#F5F7FA]">Start a Project</span> experience is a structured strategic intake engine that extracts company scale, tech stack, marketing channels, operational blockers, and desired outcomes. It establishes an authoritative, high-touch peer tone from the first click, signaling to enterprise founders and marketing VPs that they are engaging with a serious growth partner rather than a transactional vendor.
          </p>
        </div>

        {/* POINT 02 */}
        <div className="bg-[#0A0C0F] border border-white/10 p-6 rounded-[2px] space-y-3">
          <div className="flex items-center gap-2 text-[#B89A72] font-bold text-sm">
            <span className="px-2 py-0.5 rounded-[2px] bg-[#B89A72]/20 border border-[#B89A72]/40">
              02
            </span>
            <h3>HOW THE PROGRESSIVE FORM REDUCES COGNITIVE LOAD</h3>
          </div>
          <p className="font-sans text-xs text-[#8D949E] leading-relaxed">
            Filling out a single page containing 25+ open fields creates extreme form fatigue and high drop-off rates. Magniar breaks the qualification funnel into 6 distinct, logical screens with clear visual feedback: <span className="text-[#F5F7FA]">01 Contact → 02 Business → 03 Needs → 04 System → 05 Budget → 06 Final</span>. Each step asks one core question set with interactive pill toggles, expandable category drawers, clear progress indicators (<span className="text-[#B89A72]">01 / 07</span>), and fluid forward/back navigation, keeping the user calm and focused.
          </p>
        </div>

        {/* POINT 03 */}
        <div className="bg-[#0A0C0F] border border-white/10 p-6 rounded-[2px] space-y-3">
          <div className="flex items-center gap-2 text-[#B89A72] font-bold text-sm">
            <span className="px-2 py-0.5 rounded-[2px] bg-[#B89A72]/20 border border-[#B89A72]/40">
              03
            </span>
            <h3>HOW THE FORM QUALIFIES PROSPECTS</h3>
          </div>
          <p className="font-sans text-xs text-[#8D949E] leading-relaxed">
            Qualification occurs naturally without feeling judgmental or invasive. By capturing business run-rate (<span className="text-[#F5F7FA]">$1M–$5M</span>), monthly media ad spend (<span className="text-[#F5F7FA]">$10K–$25K</span>), current growth management (<span className="text-[#F5F7FA]">Internal team vs Agency</span>), and specific blockers (<span className="text-[#F5F7FA]">CPA, CRO, Tracking</span>), Magniar automatically categorizes incoming inquiries by enterprise priority before scheduling human discovery time.
          </p>
        </div>

        {/* POINT 04 */}
        <div className="bg-[#0A0C0F] border border-white/10 p-6 rounded-[2px] space-y-3">
          <div className="flex items-center gap-2 text-[#B89A72] font-bold text-sm">
            <span className="px-2 py-0.5 rounded-[2px] bg-[#B89A72]/20 border border-[#B89A72]/40">
              04
            </span>
            <h3>HOW "NOT SURE" IS HANDLED</h3>
          </div>
          <p className="font-sans text-xs text-[#8D949E] leading-relaxed">
            Non-technical or overloaded executives often don't know whether they need Meta Ads, CRO, Server-side GTM, or AI workflows. When the user selects <span className="text-[#B89A72]">"NOT SURE YET"</span>, the system immediately presents a supportive reassurance notice: <span className="text-[#F5F7FA]">"THAT'S OK! You don't need to know which service you need. Tell us what you're trying to achieve in the next steps and we'll help identify where to start."</span> This removes friction and prevents user frustration.
          </p>
        </div>

        {/* POINT 05 */}
        <div className="bg-[#0A0C0F] border border-white/10 p-6 rounded-[2px] space-y-3">
          <div className="flex items-center gap-2 text-[#B89A72] font-bold text-sm">
            <span className="px-2 py-0.5 rounded-[2px] bg-[#B89A72]/20 border border-[#B89A72]/40">
              05
            </span>
            <h3>HOW BUDGET IS SEPARATED FROM SERVICE FEES</h3>
          </div>
          <p className="font-sans text-xs text-[#8D949E] leading-relaxed">
            Mixing media ad spend (paid directly to ad platforms) with Magniar's agency retainer or project fees causes confusion. Step 05 explicitly separates:
            <br />
            1. <span className="text-[#B89A72] font-bold">MONTHLY MEDIA AD SPEND</span> (Platform deployment: e.g. $10K–$25K/mo to Google/Meta)
            <br />
            2. <span className="text-[#F5F7FA] font-bold">PROJECT / SERVICE BUDGET</span> (Magniar scope: e.g. $5K–$10K retainer or build fee)
            <br />
            This prevents pricing misalignments downstream in proposals and invoicing.
          </p>
        </div>

        {/* POINT 06 */}
        <div className="bg-[#0A0C0F] border border-white/10 p-6 rounded-[2px] space-y-3">
          <div className="flex items-center gap-2 text-[#B89A72] font-bold text-sm">
            <span className="px-2 py-0.5 rounded-[2px] bg-[#B89A72]/20 border border-[#B89A72]/40">
              06
            </span>
            <h3>HOW THE REQUEST WILL EVENTUALLY ENTER ADMIN</h3>
          </div>
          <p className="font-sans text-xs text-[#8D949E] leading-relaxed">
            The form outputs a cleanly typed <span className="text-[#F5F7FA]">ProjectRequestRecord</span> payload assigned a unique reference ID (<span className="text-[#B89A72]">MG-XXXXXX</span>). In future chapters, this JSON payload will post to the Admin Inbox endpoint, rendering an executive dashboard card with instant filtering by industry, budget tier, and status (<span className="text-[#F5F7FA]">NEW → REVIEWING → QUALIFIED → DISCOVERY</span>).
          </p>
        </div>

        {/* POINT 07 */}
        <div className="bg-[#0A0C0F] border border-white/10 p-6 rounded-[2px] space-y-3">
          <div className="flex items-center gap-2 text-[#B89A72] font-bold text-sm">
            <span className="px-2 py-0.5 rounded-[2px] bg-[#B89A72]/20 border border-[#B89A72]/40">
              07
            </span>
            <h3>HOW A REQUEST BECOMES A PROSPECT AND EVENTUALLY A CLIENT</h3>
          </div>
          <p className="font-sans text-xs text-[#8D949E] leading-relaxed">
            Submitting a discovery request does <span className="text-[#F5F7FA]">NOT</span> automatically create a client account or send an invoice. The lifecycle follows strict strategic boundaries:
            <br />
            <span className="text-[#B89A72]">REQUEST</span> (MG-XXXXXX) → <span className="text-[#B89A72]">QUALIFICATION</span> → <span className="text-[#B89A72]">PROSPECT RECORD</span> → <span className="text-[#B89A72]">STRATEGY PROPOSAL</span> → <span className="text-[#B89A72]">CONTRACT SIGNATURE</span> → <span className="text-[#B89A72]">CLIENT ACCOUNT CREATION</span>.
          </p>
        </div>

        {/* POINT 08 */}
        <div className="bg-[#0A0C0F] border border-white/10 p-6 rounded-[2px] space-y-3">
          <div className="flex items-center gap-2 text-[#B89A72] font-bold text-sm">
            <span className="px-2 py-0.5 rounded-[2px] bg-[#B89A72]/20 border border-[#B89A72]/40">
              08
            </span>
            <h3>HOW THIS CAN EVENTUALLY CONNECT TO PROPOSALS</h3>
          </div>
          <p className="font-sans text-xs text-[#8D949E] leading-relaxed">
            Because the intake captures exact channels (Meta, Shopify, AI Strategy), challenges, and goals, the future Magniar Proposal Generator will auto-populate scope items, deliverables, and timeline milestones directly from the request ID, cutting proposal assembly time from days to minutes.
          </p>
        </div>

        {/* POINT 09 */}
        <div className="bg-[#0A0C0F] border border-white/10 p-6 rounded-[2px] space-y-3">
          <div className="flex items-center gap-2 text-[#B89A72] font-bold text-sm">
            <span className="px-2 py-0.5 rounded-[2px] bg-[#B89A72]/20 border border-[#B89A72]/40">
              09
            </span>
            <h3>HOW THIS CAN EVENTUALLY CONNECT TO PAYMENTS</h3>
          </div>
          <p className="font-sans text-xs text-[#8D949E] leading-relaxed">
            Once a proposal is approved by the prospect, the service budget fields ($5K–$10K retainer or project fee) map directly into Stripe / invoicing billing schedules, binding the initial request parameters to payment milestones and contract retainers.
          </p>
        </div>

        {/* POINT 10 */}
        <div className="bg-[#0A0C0F] border border-white/10 p-6 rounded-[2px] space-y-3">
          <div className="flex items-center gap-2 text-[#B89A72] font-bold text-sm">
            <span className="px-2 py-0.5 rounded-[2px] bg-[#B89A72]/20 border border-[#B89A72]/40">
              10
            </span>
            <h3>HOW THIS CAN EVENTUALLY CONNECT TO THE CLIENT PORTAL</h3>
          </div>
          <p className="font-sans text-xs text-[#8D949E] leading-relaxed">
            Upon contract activation, the client's original goals (<span className="text-[#F5F7FA]">e.g. Lower CPA, ROAS &gt; 2.5x</span>) and current platforms become the primary KPI benchmark widgets rendered in their dedicated Magniar Client Portal dashboard.
          </p>
        </div>

        {/* POINT 11 */}
        <div className="bg-[#0A0C0F] border border-white/10 p-6 rounded-[2px] space-y-3">
          <div className="flex items-center gap-2 text-[#B89A72] font-bold text-sm">
            <span className="px-2 py-0.5 rounded-[2px] bg-[#B89A72]/20 border border-[#B89A72]/40">
              11
            </span>
            <h3>HOW MOBILE DIFFERS FROM DESKTOP</h3>
          </div>
          <p className="font-sans text-xs text-[#8D949E] leading-relaxed">
            On desktop (1440px / 1280px), the interface features a dual-column layout with a persistent <span className="text-[#B89A72]">"WHAT HAPPENS NEXT"</span> side panel. On mobile (390px / 375px), the layout smoothly collapses into a single-column flow with full 44px+ touch targets, single-tap pill options, accessible bottom action controls (<span className="text-[#F5F7FA]">BACK / CONTINUE →</span>), and sticky top step indicator lines to prevent zoom shifts or horizontal scrolling.
          </p>
        </div>
      </div>
    </div>
  );
};
