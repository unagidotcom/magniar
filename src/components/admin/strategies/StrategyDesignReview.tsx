import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Sparkles, ShieldCheck } from 'lucide-react';

export const StrategyDesignReview: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const reviewPoints = [
    {
      num: '01',
      title: 'Strategy vs Project',
      answer:
        'A Project represents the engagement boundary and delivery operational container. A Strategy is the strategic growth plan and tactical direction driving that engagement. A Project executes; a Strategy directs.',
    },
    {
      num: '02',
      title: 'Strategy & Client Relationship',
      answer:
        'A Strategy belongs directly to a Project, which in turn belongs to a Client (Client → Project → Strategy). This hierarchy ensures strategic initiatives map cleanly to business entities.',
    },
    {
      num: '03',
      title: 'Multiple Strategies Per Project',
      answer:
        'A single project can contain multiple strategic plans over time (e.g., Q3 Growth Strategy, Q4 Holiday Strategy, AI Expansion Strategy). One strategy remains CURRENT/ACTIVE while older strategies transition to ARCHIVED or SUPERSEDED.',
    },
    {
      num: '04',
      title: 'Current vs Archived Strategy',
      answer:
        'The Current Strategy represents active operational direction for campaigns. Archived strategies maintain historical continuity so previous hypotheses, budget allocations, and creative angles are never lost.',
    },
    {
      num: '05',
      title: 'Strategic Objectives vs Business Goals',
      answer:
        'Business goals are client-level targets (e.g. "Increase ecommerce revenue by 30%"). Strategic objectives describe Magniar\'s actionable execution path (e.g. "Build scalable paid acquisition with controlled CAC growth").',
    },
    {
      num: '06',
      title: 'Channel Strategy Integration',
      answer:
        'Each ad channel (Meta, Google, TikTok, LinkedIn) acts as an independent strategic unit with its own role, priority, budget allocation, audience focus, and testing approach.',
    },
    {
      num: '07',
      title: 'Media Budget vs Magniar Service Fees',
      answer:
        'Budget allocation in this system strictly refers to Client Media Spend paid directly to ad networks (Meta/Google). It is completely separate from Magniar management fees or service retainers.',
    },
    {
      num: '08',
      title: 'Experiments & Strategy',
      answer:
        'Experiments validate or disprove strategic hypotheses before scaling daily spend. They test specific variables (angles, landing pages, audiences) to de-risk growth.',
    },
    {
      num: '09',
      title: 'Recommendations & Strategy',
      answer:
        'Recommendations are actionable strategic adjustments proposed by Magniar strategists. Once approved by the client or internal team, recommendations trigger roadmap phases.',
    },
    {
      num: '10',
      title: 'Strategy Versioning & Historical Context',
      answer:
        'Creating a new strategy version (v1.4 → v1.5) preserves past revisions instead of destructively overwriting data. Teams can review exactly what changed between iterations.',
    },
    {
      num: '11',
      title: 'Future Campaign System Connection',
      answer:
        'In future chapters, Channels inside a Strategy will directly spawn Campaigns, Ad Sets/Groups, and Creative Assets in the platform management suite.',
    },
    {
      num: '12',
      title: 'Future KPI System Connection',
      answer:
        'Measurement targets in Chapter 19 are structural placeholders. In future chapters, ROAS, CAC, and CVR metrics will sync live via server-side API connectors.',
    },
    {
      num: '13',
      title: 'Future Reporting System Connection',
      answer:
        'Strategy roadmaps and experiment outcomes will automatically feed client monthly performance summaries and quarterly review decks.',
    },
    {
      num: '14',
      title: 'Future Client Portal Visibility',
      answer:
        'Approved executive summaries, roadmaps, and approved recommendations will be published to the Client Portal for transparent client collaboration.',
    },
    {
      num: '15',
      title: 'Demo Data Transparency',
      answer:
        'All client media spend figures, ROAS targets, and campaign metrics in Chapter 19 are explicitly marked as DEMO DATA. No actual ad network APIs or billing charges occur.',
    },
  ];

  return (
    <div className="bg-[#080808] border border-white/10 rounded-lg overflow-hidden my-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-3.5 bg-[#0D0D0D] hover:bg-[#121212] flex items-center justify-between transition-colors border-b border-white/5 text-left"
      >
        <div className="flex items-center gap-3">
          <BookOpen className="w-4 h-4 text-[#0099FF]" />
          <div>
            <span className="font-display font-bold text-white text-xs tracking-wider uppercase block">
              CHAPTER 19 ARCHITECTURAL DESIGN REVIEW (15 CORE PRINCIPLES)
            </span>
            <span className="text-[10px] text-white/50 font-mono">
              Click to view structural specification and strategy principles
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-[#0099FF] bg-[#0099FF]/10 border border-[#0099FF]/30 px-2 py-0.5 rounded">
            CHAPTER 19 VERIFIED
          </span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-white/60" />
          ) : (
            <ChevronDown className="w-4 h-4 text-white/60" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="p-5 space-y-4 bg-[#0A0A0A]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {reviewPoints.map((pt) => (
              <div
                key={pt.num}
                className="p-3 bg-[#111111] border border-white/5 rounded space-y-1 hover:border-[#0099FF]/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#0099FF] bg-[#0099FF]/10 px-1.5 py-0.5 rounded font-bold">
                    {pt.num}
                  </span>
                  <span className="text-[9px] font-mono text-white/30 uppercase">PRINCIPLE</span>
                </div>
                <h4 className="text-xs font-semibold text-white tracking-wide">{pt.title}</h4>
                <p className="text-[11px] text-white/60 leading-relaxed">{pt.answer}</p>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/40 font-mono">
            <span>MAGNIAR OS v2.4 — CHAPTER 19 STRATEGY ARCHITECTURE</span>
            <span className="text-[#0099FF]">FRONTEND UX PROTOTYPE</span>
          </div>
        </div>
      )}
    </div>
  );
};
