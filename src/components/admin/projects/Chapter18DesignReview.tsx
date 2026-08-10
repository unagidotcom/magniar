import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Layers, CheckCircle, HelpCircle } from 'lucide-react';

export const Chapter18DesignReview: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#0A0A0C] border border-[#0099FF]/30 rounded-[2px] overflow-hidden font-mono text-xs mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between bg-[#0099FF]/5 hover:bg-[#0099FF]/10 text-left transition-colors cursor-pointer border-b border-[#0099FF]/20"
      >
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-[#0099FF]/20 border border-[#0099FF]/40 rounded-[2px] text-[#0099FF]">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="text-white font-bold tracking-wide flex items-center gap-2">
              <span>CHAPTER 18 — ARCHITECTURAL DESIGN REVIEW & OPERATIONAL MODEL</span>
              <span className="text-[10px] bg-[#0099FF]/20 text-[#0099FF] px-1.5 py-0.5 rounded-[2px] border border-[#0099FF]/30">
                ACTIVE PROJECTS
              </span>
            </div>
            <p className="text-white/50 text-[11px] mt-0.5">
              Comprehensive architectural breakdown comparing Clients, Projects, Services, Budgets, and Lineage.
            </p>
          </div>
        </div>
        <div className="text-[#0099FF] flex items-center gap-1 text-[11px] font-semibold">
          <span>{isOpen ? 'COLLAPSE REVIEW' : 'EXPAND DESIGN REVIEW (12 POINTS)'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-5 space-y-6 text-white/80 text-xs leading-relaxed bg-[#050505]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Q1 */}
            <div className="p-3.5 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-1.5">
              <div className="text-[#0099FF] font-bold text-[11px] flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                1. Client vs. Project Distinction
              </div>
              <p className="text-white/60 text-[11px]">
                A <strong className="text-white">Client</strong> represents the overarching commercial contract and business relationship (e.g. Northstar Commerce). A <strong className="text-white">Project</strong> is a discrete operational engagement with clear timelines, deliverables, scope, and team assignment.
              </p>
            </div>

            {/* Q2 */}
            <div className="p-3.5 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-1.5">
              <div className="text-[#0099FF] font-bold text-[11px] flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                2. Project vs. Service
              </div>
              <p className="text-white/60 text-[11px]">
                A <strong className="text-white">Project</strong> is an overarching workstream (e.g. Q3 Paid Acquisition System). A <strong className="text-white">Service</strong> is a specific functional discipline executed within that project (e.g., Meta Ads, Google Ads, Creative Strategy). One project combines multiple services.
              </p>
            </div>

            {/* Q3 */}
            <div className="p-3.5 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-1.5">
              <div className="text-[#0099FF] font-bold text-[11px] flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                3. One Client → Multiple Projects
              </div>
              <p className="text-white/60 text-[11px]">
                A single Client can run multiple concurrent or sequential projects without duplicating client records (e.g. Northstar Commerce simultaneously runs "Q3 Paid Acquisition" and "Shopify Plus CRO").
              </p>
            </div>

            {/* Q4 */}
            <div className="p-3.5 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-1.5">
              <div className="text-[#0099FF] font-bold text-[11px] flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                4. Project Status vs. Client Status
              </div>
              <p className="text-white/60 text-[11px]">
                <strong className="text-white">Client Status</strong> tracks the overall retained account contract (e.g., ACTIVE). A individual <strong className="text-white">Project Status</strong> (e.g. PAUSED or COMPLETED) does not force the entire client record to change status.
              </p>
            </div>

            {/* Q5 */}
            <div className="p-3.5 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-1.5">
              <div className="text-[#0099FF] font-bold text-[11px] flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                5. Project Health vs. Client Health
              </div>
              <p className="text-white/60 text-[11px]">
                <strong className="text-white">Client Health</strong> is executive relationship state. <strong className="text-white">Project Health</strong> (ON TRACK, ATTENTION, AT RISK, BLOCKED) tracks delivery execution. A healthy client account may have a specific project temporarily marked ATTENTION due to creative delays.
              </p>
            </div>

            {/* Q6 */}
            <div className="p-3.5 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-1.5">
              <div className="text-[#0099FF] font-bold text-[11px] flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                6. Project Lead vs. Client Contact
              </div>
              <p className="text-white/60 text-[11px]">
                <strong className="text-white">Project Lead</strong> (e.g. Kaelen Voss) is internal Magniar staff assigned to lead execution. <strong className="text-white">Client Contact</strong> (e.g. Maya Chen, CMO) is the client stakeholder receiving deliverables.
              </p>
            </div>

            {/* Q7 */}
            <div className="p-3.5 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-1.5">
              <div className="text-[#0099FF] font-bold text-[11px] flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                7. Service Fee vs. Media Budget
              </div>
              <p className="text-white/60 text-[11px]">
                <strong className="text-white">Service Fee</strong> (e.g. $8,500/mo) is direct revenue paid to Magniar for agency work. <strong className="text-white">Media Budget</strong> (e.g. $25k–$50k/mo) is client ad spend paid directly to ad platforms (Meta/Google) and is NEVER Magniar revenue.
              </p>
            </div>

            {/* Q8 */}
            <div className="p-3.5 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-1.5">
              <div className="text-[#0099FF] font-bold text-[11px] flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                8. Lineage Retention (Request → Prospect → Client → Project)
              </div>
              <p className="text-white/60 text-[11px]">
                Each project preserves foreign key references back to its origin: Request <code className="text-[#0099FF]">MG-REQ-2026-081</code> → Prospect <code className="text-[#0099FF]">MG-PR-2026-014</code> → Client <code className="text-[#0099FF]">MG-CL-2026-008</code> → Project <code className="text-[#0099FF]">MG-PRJ-2026-014</code>.
              </p>
            </div>

            {/* Q9 */}
            <div className="p-3.5 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-1.5">
              <div className="text-[#0099FF] font-bold text-[11px] flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                9. Future Strategy Module Attachment
              </div>
              <p className="text-white/60 text-[11px]">
                Projects feature a dedicated "Current Strategy" card housing strategy metadata and link hooks, ready to attach full strategic blueprints in future chapters.
              </p>
            </div>

            {/* Q10 */}
            <div className="p-3.5 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-1.5">
              <div className="text-[#0099FF] font-bold text-[11px] flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                10. Future KPI & Data Source Attachment
              </div>
              <p className="text-white/60 text-[11px]">
                Rather than fabricating unverified live performance numbers, projects render an explicit "PLATFORM DATA NOT CONNECTED" prototype state with configuration triggers for Meta/Google APIs.
              </p>
            </div>

            {/* Q11 */}
            <div className="p-3.5 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-1.5">
              <div className="text-[#0099FF] font-bold text-[11px] flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                11. Future Client Portal Exposure
              </div>
              <p className="text-white/60 text-[11px]">
                Data model separates <code className="text-emerald-400">CLIENT_VISIBLE</code> deliverables and milestones from strictly <code className="text-amber-400">INTERNAL</code> notes and staff communications.
              </p>
            </div>

            {/* Q12 */}
            <div className="p-3.5 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-1.5">
              <div className="text-[#0099FF] font-bold text-[11px] flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                12. Mock/Demo Data Labeling
              </div>
              <p className="text-white/60 text-[11px]">
                All financial figures, progress percentages, and simulated platform connections are explicitly marked with prominent <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1 py-0.5 rounded-[2px]">DEMO DATA</span> indicators.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
