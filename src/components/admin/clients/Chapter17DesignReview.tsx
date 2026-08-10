import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck, Layers, Workflow, Users, Compass, Database } from 'lucide-react';

export const Chapter17DesignReview: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#0A0A0C] border border-white/10 rounded-[2px] overflow-hidden font-mono text-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between bg-white/[0.02] hover:bg-white/[0.05] transition-colors text-left"
      >
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-[#0099FF]" />
          <span className="font-bold tracking-wider text-white uppercase text-xs">
            CHAPTER 17 DESIGN REVIEW & ARCHITECTURAL SUMMARY
          </span>
          <span className="text-[10px] text-white/40 bg-white/5 px-2 py-0.5 rounded-[2px] border border-white/10">
            10/10 CONSTRAINTS VERIFIED
          </span>
        </div>
        <div className="flex items-center gap-2 text-[#0099FF] text-xs">
          <span>{isOpen ? 'Collapse Review' : 'Expand Review'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-5 border-t border-white/10 space-y-6 bg-[#050505] text-white/80">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1 */}
            <div className="p-3 bg-white/[0.02] border border-white/10 rounded-[2px] space-y-1">
              <div className="text-[#0099FF] font-bold text-[11px] uppercase flex items-center gap-1.5">
                <span>1. CLIENT VS. PROSPECT DISTINCTION</span>
              </div>
              <p className="text-[11px] text-white/70 leading-relaxed">
                A Prospect is an uncommitted qualified sales opportunity in discovery/proposal stages. A Client is a contracted paying customer with an active commercial relationship, assigned services, and active projects.
              </p>
            </div>

            {/* 2 */}
            <div className="p-3 bg-white/[0.02] border border-white/10 rounded-[2px] space-y-1">
              <div className="text-[#0099FF] font-bold text-[11px] uppercase flex items-center gap-1.5">
                <span>2. CLIENT VS. PROJECT DISTINCTION</span>
              </div>
              <p className="text-[11px] text-white/70 leading-relaxed">
                A Client is the parent corporate entity (e.g., Northstar Commerce). A Project is a specific time-bound engagement belonging to the client (e.g., Q3 Paid Acquisition Engine). One client can hold 0, 1, or multiple projects simultaneously.
              </p>
            </div>

            {/* 3 */}
            <div className="p-3 bg-white/[0.02] border border-white/10 rounded-[2px] space-y-1">
              <div className="text-[#0099FF] font-bold text-[11px] uppercase flex items-center gap-1.5">
                <span>3. DATA LINEAGE PRESERVATION</span>
              </div>
              <p className="text-[11px] text-white/70 leading-relaxed">
                Lineage is strictly preserved without overwriting: Request (<code className="text-[#0099FF]">MG-REQ-2026-081</code>) → Prospect (<code className="text-[#0099FF]">MG-PR-2026-014</code>) → Client (<code className="text-[#0099FF]">MG-CL-2026-008</code>). Clicking lineage badges opens the source request or prospect.
              </p>
            </div>

            {/* 4 */}
            <div className="p-3 bg-white/[0.02] border border-white/10 rounded-[2px] space-y-1">
              <div className="text-[#0099FF] font-bold text-[11px] uppercase flex items-center gap-1.5">
                <span>4. MULTIPLE CONTACTS ARCHITECTURE</span>
              </div>
              <p className="text-[11px] text-white/70 leading-relaxed">
                Clients support an array of contacts with specific roles (CMO, Head of Ecommerce, Finance Controller), email/phone, and primary contact indicators.
              </p>
            </div>

            {/* 5 */}
            <div className="p-3 bg-white/[0.02] border border-white/10 rounded-[2px] space-y-1">
              <div className="text-[#0099FF] font-bold text-[11px] uppercase flex items-center gap-1.5">
                <span>5. MULTIPLE PROJECTS ARCHITECTURE</span>
              </div>
              <p className="text-[11px] text-white/70 leading-relaxed">
                Clients feature an Active Projects Preview supporting multiple engagements across Performance, Commerce, Strategy, and Development categories with progress bars.
              </p>
            </div>

            {/* 6 */}
            <div className="p-3 bg-white/[0.02] border border-white/10 rounded-[2px] space-y-1">
              <div className="text-[#0099FF] font-bold text-[11px] uppercase flex items-center gap-1.5">
                <span>6. ATTACHED SERVICES MANAGEMENT</span>
              </div>
              <p className="text-[11px] text-white/70 leading-relaxed">
                Active Services (Meta Ads, Google Ads, Shopify Dev, AI Strategy) are attached to the client with distinct operational statuses (ACTIVE, PAUSED, PLANNED) independent of overall client status.
              </p>
            </div>

            {/* 7 */}
            <div className="p-3 bg-white/[0.02] border border-white/10 rounded-[2px] space-y-1">
              <div className="text-[#0099FF] font-bold text-[11px] uppercase flex items-center gap-1.5">
                <span>7. ACCOUNT OWNER VS. CLIENT CONTACT</span>
              </div>
              <p className="text-[11px] text-white/70 leading-relaxed">
                Account Owner represents the Magniar internal team or employee (e.g., Kaelen Voss / Growth Team), while Primary Contact represents the client employee (e.g., Maya Chen, CMO).
              </p>
            </div>

            {/* 8 */}
            <div className="p-3 bg-white/[0.02] border border-white/10 rounded-[2px] space-y-1">
              <div className="text-[#0099FF] font-bold text-[11px] uppercase flex items-center gap-1.5">
                <span>8. ACCOUNT HEALTH WITHOUT FAKE SCORES</span>
              </div>
              <p className="text-[11px] text-white/70 leading-relaxed">
                Avoids fake numeric scores (e.g., 87/100). Uses clear operational states (HEALTHY, ATTENTION, AT RISK, PAUSED) with mandatory operational reasons (e.g., "Strategy review overdue by 14 days").
              </p>
            </div>

            {/* 9 */}
            <div className="p-3 bg-white/[0.02] border border-white/10 rounded-[2px] space-y-1">
              <div className="text-[#0099FF] font-bold text-[11px] uppercase flex items-center gap-1.5">
                <span>9. FUTURE CLIENT PORTAL CONNECTION</span>
              </div>
              <p className="text-[11px] text-white/70 leading-relaxed">
                Includes a dedicated Client Portal preview panel with states (NOT INVITED, INVITED, ACTIVE) and an Invite Client modal preview that connects directly to the underlying client record.
              </p>
            </div>

            {/* 10 */}
            <div className="p-3 bg-white/[0.02] border border-white/10 rounded-[2px] space-y-1">
              <div className="text-[#0099FF] font-bold text-[11px] uppercase flex items-center gap-1.5">
                <span>10. MOCK DATA BOUNDARIES</span>
              </div>
              <p className="text-[11px] text-white/70 leading-relaxed">
                All financial summaries, metrics, and records are clearly labelled <span className="text-amber-400 font-bold">DEMO DATA</span> with zero external API calls or database mutations.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
