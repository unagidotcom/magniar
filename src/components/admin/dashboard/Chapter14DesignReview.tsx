import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

export const Chapter14DesignReview: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const reviewPoints = [
    {
      q: '1. Why is this an operations dashboard rather than a generic analytics dashboard?',
      a: 'The Magniar Admin Dashboard is designed for daily team execution rather than passive reporting. It directly answers what needs immediate operator attention (urgent intakes, overdue invoices, approaching project SLAs, proposal approvals), organizing workflow from Action -> Context -> Analytics.',
    },
    {
      q: '2. What appears above the fold and why?',
      a: 'Above the fold sits the Page Header, Quick Actions, the ATTENTION REQUIRED panel, and the Business Overview metric cards. This ensures that when an operator logs in, their immediate visual focus is on items needing critical action without needing to scroll past giant hero banners or marketing graphs.',
    },
    {
      q: '3. How does Attention Required work?',
      a: 'Attention Required aggregates prioritized action items across all operational modules (intakes, billing, project milestones, proposals). Items are sorted by urgency (URGENT > HIGH > NORMAL > LOW) and provide direct single-click action buttons ([REVIEW →], [VIEW →]) that open inspection drawers.',
    },
    {
      q: '4. How are Requests separated from Clients and Projects?',
      a: 'Requests represent raw inbound lead/intake submissions prior to qualification. Once qualified, a Request converts into a Client entity and an associated Project. Keeping them separate prevents database pollution and maintains clear sales/discovery pipeline boundaries.',
    },
    {
      q: '5. Why are marketing KPIs NOT in the top-level dashboard?',
      a: 'Top-level Admin Dashboard tracks agency health (revenue, active client retainers, active projects, SLA adherence). Client marketing KPIs (Meta ROAS, Google CPC, TikTok CTR) belong inside specific Client -> Project -> Strategy campaign reporting views so top-level business operations remain uncluttered.',
    },
    {
      q: '6. How is financial information represented?',
      a: 'Financial metrics track Magniar agency retainer revenue, outstanding client invoices, overdue balances, and settled wire/ACH payments. It strictly distinguishes agency revenue from client media spend/ad budgets to eliminate financial ambiguity.',
    },
    {
      q: '7. How will dashboard data eventually derive from Supabase?',
      a: 'In production, the dashboard will execute aggregated SQL views over Supabase tables (`requests`, `clients`, `projects`, `invoices`, `payments`, `activities`). A structured service layer (`dashboardService`) handles this aggregation without binding UI components directly to database queries.',
    },
    {
      q: '8. How does the dashboard avoid duplicating database entities?',
      a: 'The dashboard never stores duplicate "dashboard entities". It functions purely as a read-only view layer that queries and aggregates existing primary records (Requests, Clients, Projects, Invoices).',
    },
    {
      q: '9. How does the interface behave on mobile (390px)?',
      a: 'On mobile, desktop grids collapse into structured 2-column metric cards and single-column attention stacks. Complex tables adapt with horizontal touch scrolling, and pipeline stages stack vertically while maintaining 44px minimum touch targets.',
    },
    {
      q: '10. Which data is currently mock-only?',
      a: 'All records, pipeline counts, retainer figures, and activity feed entries are prototype demo data clearly badged with `DEMO DATA` to ensure absolute compliance with Magniar system safety standards.',
    },
  ];

  return (
    <section className="bg-[#0A0A0C] border border-white/10 rounded-[2px] p-5 space-y-4 font-mono">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left cursor-pointer group"
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#0099FF]" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider group-hover:text-[#0099FF] transition-colors">
            CHAPTER 14 — ARCHITECTURAL DESIGN REVIEW (10 CORE QUESTIONS)
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-white/50 bg-white/5 px-2 py-0.5 rounded-[2px] border border-white/10">
            {isOpen ? 'COLLAPSE ARCHITECTURE DOCS' : 'EXPAND ARCHITECTURE DOCS'}
          </span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-[#0099FF]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-white/40" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="pt-3 border-t border-white/10 space-y-3.5 text-xs">
          {reviewPoints.map((item, i) => (
            <div key={i} className="p-3 bg-[#050505] border border-white/5 rounded-[2px] space-y-1">
              <div className="font-semibold text-white/90">{item.q}</div>
              <p className="text-white/60 text-[11px] leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
