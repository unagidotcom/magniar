import React, { useState } from 'react';
import { ShieldCheck, ChevronDown, ChevronUp, Layers, CheckCircle2, AlertTriangle, Cpu, Crosshair } from 'lucide-react';

export const CampaignDesignReview: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const principles = [
    {
      num: '01',
      title: 'OPERATIONAL CAMPAIGN LAYER',
      desc: 'Campaigns represent execution of approved Strategies. They map to channels, ad groups, creatives, and landing pages with strict relationship hierarchy.',
    },
    {
      num: '02',
      title: 'NO ORPHAN CAMPAIGNS',
      desc: 'Every campaign strictly requires a parent Client, Project, Strategy, and Channel. Loose, floating, or standalone campaigns are rejected by architecture.',
    },
    {
      num: '03',
      title: 'NO FAKE ROAS / CPA METRICS',
      desc: 'No fabricated ROAS, CPA, or CTR numbers are rendered in UI. Unconnected data sources explicitly display "PERFORMANCE DATA NOT CONNECTED" with connection hooks.',
    },
    {
      num: '04',
      title: 'DEMO DATA FINANCIAL TRANSPARENCY',
      desc: 'All campaign media budgets represent client media spend (not Magniar service fees) and are explicitly flagged with "DEMO DATA" labels.',
    },
    {
      num: '05',
      title: 'MULTI-PLATFORM MAPPING ARCHITECTURE',
      desc: 'Internal Magniar campaign entities can map to single or multi-platform campaigns (e.g. Meta, Google, TikTok) without forcing 1:1 assumptions.',
    },
    {
      num: '06',
      title: 'LAUNCH CHECKLIST & GO-LIVE GATES',
      desc: 'Campaigns cannot launch without passing go-live checklist requirements: Strategy approval, Budget sign-off, UTM verification, Landing page check, and Event CAPI tracking.',
    },
    {
      num: '07',
      title: 'CREATIVE ANGLE MATRIX',
      desc: 'Creatives are classified by strategic marketing angles (e.g. Founder, UGC, Social Proof, Comparison) to measure messaging effectiveness.',
    },
    {
      num: '08',
      title: 'LANDING PAGE QUALITY ASSURANCE',
      desc: 'Integrated LP checks for message match, mobile readiness, page load speed, and event tracking before ads traffic is directed.',
    },
    {
      num: '09',
      title: 'UTM & CONVERSION INTEGRITY',
      desc: 'Standardized UTM parameter generation (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`) and server-side CAPI pixel verification.',
    },
    {
      num: '10',
      title: 'A/B EXPERIMENTATION ENGINE',
      desc: 'Structured hypothesis-driven experiments tracking variable, control, variant, and channel status to scale winning assets.',
    },
    {
      num: '11',
      title: 'HEALTH & BLOCKER ESCALATION',
      desc: 'Real-time campaign health (ON TRACK, ATTENTION, AT RISK, BLOCKED) with explicit blocker reasons and owner escalation.',
    },
    {
      num: '12',
      title: 'RESPONSIVE DENSE OPERATIONAL SHELL',
      desc: 'High-density dark interface using monospace IDs (`MG-CMP-2026-014`), electric blue signal elements, and zero decorative card clutter.',
    },
  ];

  return (
    <div className="bg-[#0A0A0A] border border-white/10 rounded-sm overflow-hidden font-mono">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-[#0099FF]/10 border border-[#0099FF]/30 text-[#0099FF] rounded-[2px]">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider text-white uppercase">
                CHAPTER 20 — CAMPAIGN & CHANNEL OPERATIONS ARCHITECTURE REVIEW
              </span>
              <span className="text-[10px] bg-[#0099FF]/10 text-[#0099FF] border border-[#0099FF]/30 px-2 py-0.5 rounded-[2px]">
                12 PRINCIPLES
              </span>
            </div>
            <p className="text-[11px] text-white/50 mt-0.5">
              Click to view structural guidelines for campaign execution, ad groups, creative matrix, and operational hierarchy.
            </p>
          </div>
        </div>

        <div className="text-white/40">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-5 border-t border-white/10 bg-[#050505] space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {principles.map((p) => (
              <div key={p.num} className="bg-[#0D0D0D] border border-white/10 p-4 rounded-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#0099FF] bg-[#0099FF]/10 border border-[#0099FF]/30 px-1.5 py-0.5 rounded-[2px] font-bold">
                    PRINCIPLE {p.num}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0099FF]" />
                </div>
                <h4 className="text-xs font-bold text-white tracking-wide">{p.title}</h4>
                <p className="text-[11px] text-white/60 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-4 bg-[#0A0A0A] border border-[#0099FF]/30 rounded-sm flex items-start gap-3">
            <Cpu className="w-5 h-5 text-[#0099FF] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                SYSTEM VERIFICATION & DATA INTEGRITY NOTICE
              </span>
              <p className="text-[11px] text-white/70 leading-relaxed">
                Chapter 20 campaign operations system strictly isolates client media spend from internal agency service fees. All performance widgets display explicit status warnings when live ad server APIs are unconnected rather than generating simulated ROAS/CPA values.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
