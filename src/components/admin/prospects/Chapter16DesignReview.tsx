import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const Chapter16DesignReview: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const reviewQuestions = [
    {
      title: '1. How Request differs from Prospect',
      content:
        'A Request (e.g. MG-REQ-2026-081) represents an unverified raw inbound inquiry submitted via /start-a-project or contact form. A Prospect (e.g. MG-PR-2026-014) represents a verified, qualified commercial opportunity that Magniar is actively scoping, estimating, and negotiating.',
    },
    {
      title: '2. How Prospect differs from Client',
      content:
        'A Prospect is an opportunity still in the sales pipeline (Discovery, Proposal, Negotiation). A Client (e.g. MG-CL-2026-008) is a converted partner that has signed commercial terms/MSA and is paying a active monthly retainer or project fee.',
    },
    {
      title: '3. How the original Request remains linked',
      content:
        'The Prospect object maintains an immutable reference to source_request_code (e.g. MG-REQ-2026-081) and source_request_date. Clicking "VIEW ORIGINAL REQUEST →" in the Prospect header opens the underlying Request record without data duplication.',
    },
    {
      title: '4. How opportunity value differs from advertising budget',
      content:
        'Media Budget ($30k-$50k/mo) represents the client\'s ad spend paid directly to ad platforms (Meta/Google). Magniar Service Fee ($8k/mo) and Contract Value ($96k) represent actual agency revenue for strategy, media buying, and engineering.',
    },
    {
      title: '5. How qualification works',
      content:
        'Qualification uses practical fit dimensions (Budget Fit, Service Fit, Timeline Fit, Decision Maker, Strategic Fit) evaluated as CONFIRMED, LIKELY, UNKNOWN, or CONCERN alongside a clear "Why Magniar?" justification, rather than arbitrary non-transparent lead scores.',
    },
    {
      title: '6. How the sales pipeline works',
      content:
        'Opportunities move sequentially through horizontal pipeline stages: QUALIFIED (25%) → DISCOVERY (40%) → PROPOSAL (65%) → NEGOTIATION (80%) → WON (100%) or LOST/NOT A FIT (0%). Changing stages dynamically updates internal probability and timeline feeds.',
    },
    {
      title: '7. How Prospect → Client conversion works',
      content:
        'Clicking "CONVERT TO CLIENT" opens a confirmation modal verifying data lineage (Request → Prospect → Client). Upon confirmation, the stage updates to WON (100%), generates Client ID (e.g. MG-CL-2026-008), triggers a success toast, and logs a conversion activity item.',
    },
    {
      title: '8. How lost opportunities are handled',
      content:
        'Marking an opportunity as lost requires selecting a primary reason (PRICE, TIMING, NO BUDGET, CHOOSE COMPETITOR, NOT A FIT, NO RESPONSE, PROJECT CANCELLED, OTHER) and entering an internal note. Distinguishes LOST (competitive loss) from NOT A FIT (below agency minimums).',
    },
    {
      title: '9. How mobile CRM works',
      content:
        'On mobile displays (<768px), dense multi-column desktop tables transform into compact Prospect Cards featuring stage indicators, company header, opportunity values, owner badges, and a direct "Inspect" action button for clean touch usability.',
    },
    {
      title: '10. Which parts are mock-only',
      content:
        'All data is held in frontend memory via prospectService and mockProspectsData. Email/Call triggers display prototype toasts or modals ("Coming Soon"). No external database (Supabase) or email API (Resend/SendGrid) is connected in this chapter.',
    },
  ];

  return (
    <div className="p-5 bg-[#0A0A0C] border border-[#0099FF]/30 rounded-[2px] space-y-4 font-mono text-xs">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer select-none"
      >
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#0099FF]" />
          <div>
            <h3 className="font-display font-bold text-white text-sm tracking-wider uppercase">
              CHAPTER 16 — DESIGN & ARCHITECTURE REVIEW
            </h3>
            <p className="text-[11px] text-white/50">
              Technical specifications for Prospects CRM & Opportunity Workspace
            </p>
          </div>
        </div>

        <button className="p-1.5 text-white/60 hover:text-white bg-white/5 rounded border border-white/10">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isOpen && (
        <div className="pt-3 border-t border-white/10 space-y-3 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {reviewQuestions.map((q, idx) => (
              <div
                key={idx}
                className="p-3 bg-[#050505] border border-white/10 rounded-[2px] space-y-1 text-[11px]"
              >
                <div className="font-semibold text-[#0099FF] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                  <span>{q.title}</span>
                </div>
                <p className="text-white/70 leading-relaxed pl-5">{q.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
