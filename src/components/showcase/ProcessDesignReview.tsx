import React from 'react';
import { BookOpen, CheckCircle2, RefreshCw, Layers, ShieldCheck, Database, Smartphone, Users, Zap } from 'lucide-react';

export const ProcessDesignReview: React.FC = () => {
  return (
    <div className="bg-[#0A0D12] border border-[#0099FF]/40 rounded-[2px] p-6 sm:p-10 space-y-10 text-xs font-mono text-[#8D949E] relative overflow-hidden shadow-2xl">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-6 space-y-3">
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-[#0099FF]" />
          <span className="text-[#0099FF] font-bold tracking-widest text-sm uppercase">
            CHAPTER 06 DESIGN & ARCHITECTURE REVIEW
          </span>
          <span className="px-2 py-0.5 bg-[#0099FF]/10 text-[#0099FF] border border-[#0099FF]/30 text-[10px] rounded-[2px]">
            SPECIFICATION VERIFIED
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          MAGNIAR OPERATING METHODOLOGY & GROWTH PROCESS (CHAPTER 06)
        </h2>

        <p className="text-xs text-[#8D949E] font-sans leading-relaxed max-w-3xl">
          Comprehensive analysis addressing the 8 mandatory architectural questions defined in the Chapter 06 specification, explaining how Magniar positions process as a disciplined operating system rather than generic consulting.
        </p>
      </div>

      {/* 8 MANDATORY SPECIFICATION QUESTIONS & ANSWERS */}
      <div className="space-y-8">
        {/* Q1: NOT A GENERIC AGENCY TIMELINE */}
        <div className="p-5 bg-[#050505] border border-white/10 rounded-[2px] space-y-3">
          <div className="flex items-center gap-2 text-[#0099FF] font-bold text-sm">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>1. WHY THIS IS NOT A GENERIC AGENCY TIMELINE</span>
          </div>
          <p className="text-xs text-[#F5F7FA] font-sans leading-relaxed">
            Generic agency timelines present process as a linear 4-step arrow diagram ("Idea → Launch → Success") or stock consulting circles. Magniar presents a <strong>non-linear, 8-stage operational feedback engine</strong>. The layout emphasizes commercial unit economics, bottleneck diagnostic, CAPI tracking verification, and server telemetry—moving far beyond superficial agency promises.
          </p>
        </div>

        {/* Q2: STRATEGIC APPROACH */}
        <div className="p-5 bg-[#050505] border border-white/10 rounded-[2px] space-y-3">
          <div className="flex items-center gap-2 text-[#0099FF] font-bold text-sm">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>2. HOW THE PROCESS COMMUNICATES MAGNIAR'S STRATEGIC APPROACH</span>
          </div>
          <p className="text-xs text-[#F5F7FA] font-sans leading-relaxed">
            Stage 01 DISCOVER and Stage 02 DIAGNOSE strictly precede any recommendation or tactical execution. The process explicitly rejects "turning on ads and hoping." It forces diagnosis across acquisition, conversion, tracking, creative, product, and economics before prescribing solutions.
          </p>
        </div>

        {/* Q3: CONNECTION WITH THE FOUR CAPABILITIES */}
        <div className="p-5 bg-[#050505] border border-white/10 rounded-[2px] space-y-3">
          <div className="flex items-center gap-2 text-[#0099FF] font-bold text-sm">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>3. HOW THE PROCESS CONNECTS WITH THE FOUR CAPABILITIES</span>
          </div>
          <p className="text-xs text-[#F5F7FA] font-sans leading-relaxed">
            Chapter 05 established WHAT Magniar builds (Performance, Commerce, Infrastructure, Intelligence). Chapter 06 establishes WHEN and HOW they attach. During Stage 02 DIAGNOSE, bottlenecks are mapped to specific capabilities, assembling a bespoke growth stack rather than forcing all capabilities on every client.
          </p>
        </div>

        {/* Q4: CONTINUOUS OPTIMIZATION LOOP */}
        <div className="p-5 bg-[#050505] border border-white/10 rounded-[2px] space-y-3">
          <div className="flex items-center gap-2 text-[#0099FF] font-bold text-sm">
            <RefreshCw className="w-4 h-4 shrink-0 text-[#0099FF]" />
            <span>4. HOW THE LOOP COMMUNICATES CONTINUOUS OPTIMIZATION</span>
          </div>
          <p className="text-xs text-[#F5F7FA] font-sans leading-relaxed">
            When Stage 08 SCALE is reached, the visual line vector explicitly loops back into Stage 01 DISCOVER. Scaling is not an endpoint—it generates new customer cohorts, market signals, and data vectors that feed the next strategic iteration cycle.
          </p>
        </div>

        {/* Q5: CLIENT PARTICIPATION */}
        <div className="p-5 bg-[#050505] border border-white/10 rounded-[2px] space-y-3">
          <div className="flex items-center gap-2 text-[#0099FF] font-bold text-sm">
            <Users className="w-4 h-4 shrink-0" />
            <span>5. HOW CLIENTS PARTICIPATE (COLLABORATIVE MODEL)</span>
          </div>
          <p className="text-xs text-[#F5F7FA] font-sans leading-relaxed">
            Every stage incorporates a dedicated <strong>Collaborative Responsibility Matrix</strong> distinguishing Magniar Execution (auditing, engineering, CAPI, bidding) from Client Participation (commercial context, product margins, brand approvals, inventory readiness).
          </p>
        </div>

        {/* Q6: ENGAGEMENT MODELS */}
        <div className="p-5 bg-[#050505] border border-white/10 rounded-[2px] space-y-3">
          <div className="flex items-center gap-2 text-[#0099FF] font-bold text-sm">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>6. HOW ENGAGEMENT MODELS FIT INTO THE PROCESS</span>
          </div>
          <p className="text-xs text-[#F5F7FA] font-sans leading-relaxed">
            Four engagement archetypes are provided: Growth Partnership, Project Build, Strategy & Audit, and Ongoing Optimization. Each archetype maps to specific stages of the loop (e.g. Strategy focuses on Stages 01–03, while Growth Partnership operates the full 01–08 loop).
          </p>
        </div>

        {/* Q7: MOBILE RESPONSIVENESS & INTERACTION */}
        <div className="p-5 bg-[#050505] border border-white/10 rounded-[2px] space-y-3">
          <div className="flex items-center gap-2 text-[#0099FF] font-bold text-sm">
            <Smartphone className="w-4 h-4 shrink-0" />
            <span>7. HOW THE EXPERIENCE WORKS ON MOBILE (390px)</span>
          </div>
          <p className="text-xs text-[#F5F7FA] font-sans leading-relaxed">
            On mobile screens (390px / 768px), the 8 stages collapse into an accessible, tap-to-expand vertical sequence with instant detail cards, avoiding hover dependencies or squeezed horizontal layouts.
          </p>
        </div>

        {/* Q8: CLIENT PORTAL & FUTURE CMS INTEGRATION */}
        <div className="p-5 bg-[#050505] border border-white/10 rounded-[2px] space-y-3">
          <div className="flex items-center gap-2 text-[#0099FF] font-bold text-sm">
            <Database className="w-4 h-4 shrink-0" />
            <span>8. HOW THE PROCESS CONNECTS TO FUTURE CLIENT PORTAL / CMS</span>
          </div>
          <p className="text-xs text-[#F5F7FA] font-sans leading-relaxed">
            The process data is modeled cleanly as structured JSON (`process_stage`, `stage_number`, `name`, `includes`, `output`, `roles`, `capability_links`), enabling seamless future binding to Supabase or the Client Portal to show live project status per client.
          </p>
        </div>
      </div>
    </div>
  );
};
