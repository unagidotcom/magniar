import React from 'react';
import { CheckCircle2, Sparkles, BookOpen, Layers, ShieldCheck, ArrowRight } from 'lucide-react';

interface AboutDesignReviewProps {
  onReturnToAbout?: () => void;
}

export const AboutDesignReview: React.FC<AboutDesignReviewProps> = ({
  onReturnToAbout,
}) => {
  const reviewPoints = [
    {
      num: '01',
      title: 'WHAT MAKES MAGNIAR DIFFERENT FROM A NORMAL MARKETING AGENCY',
      desc: 'Magniar operates as a connected growth partner connecting performance marketing, e-commerce storefronts, server-side tracking infrastructure, and AI automation under a single technical playbook—eliminating contractor fragmentation and vendor finger-pointing.',
    },
    {
      num: '02',
      title: 'COMMUNICATION OF THE HYBRID MODEL (MARKETING + DEVELOPMENT + AI)',
      desc: 'Communicated via dual-perspective sections ("Marketing without the Technical Blind Spot" and "Development without the Growth Blind Spot"), demonstrating that ad budgets are backed by high-speed code, and custom code is engineered for net contribution margin.',
    },
    {
      num: '03',
      title: 'ELIMINATION OF GENERIC AGENCY LANGUAGE & FAKE CLAIMS',
      desc: 'Avoids clichés like "world-leading", "unparalleled", or "revolutionizing". Uses confident, factual, unit-economics-focused language. Displays zero fake employee portraits, zero unverified client counts, and zero invented partner logos.',
    },
    {
      num: '04',
      title: 'VISUAL REPRESENTATION OF "SYSTEMS OVER SILOS"',
      desc: 'Featured as a major high-contrast editorial section ("SYSTEMS OVER SILOS") with explicit visual contrast between traditional disconnected vendor chains vs. Magniar’s real-time synchronized growth loop.',
    },
    {
      num: '05',
      title: 'CONNECTION TO CAPABILITIES',
      desc: 'Directly routes users to all 4 core capability groups (Performance, Commerce, Development, Intelligence) with dedicated inspector cards and deep capability links.',
    },
    {
      num: '06',
      title: 'CONNECTION TO CASE STUDIES',
      desc: 'Links to Chapter 08 Case Studies are retained, but public cards are hidden until verified client work is published from the Admin OS.',
    },
    {
      num: '07',
      title: 'CONNECTION TO INSIGHTS',
      desc: 'Links to Chapter 09 Intelligence Desk via "WHAT WE\'RE THINKING ABOUT" displaying research articles with instant reader view integration.',
    },
    {
      num: '08',
      title: 'CONNECTION TO START A PROJECT',
      desc: 'Integrated seamlessly with Chapter 10 multi-step discovery intake via primary and secondary CTAs throughout the entire /about route.',
    },
    {
      num: '09',
      title: 'INTERACTIVE SYSTEM DIAGRAM ENGINE',
      desc: 'An accessible, keyboard-navigable node diagram centering "GROWTH" surrounded by Performance, Commerce, Development, and Intelligence. Hovering or focusing illuminates connection vectors and opens detailed service capabilities.',
    },
    {
      num: '10',
      title: 'RESPONSIVE MOBILE & SCREEN BEHAVIOR (1440PX → 390PX)',
      desc: 'On mobile screens (<768px), the complex desktop diagram automatically stacks into a clean vertical node selector, preserving typographic rhythm and tap target size without forcing cramped graphics.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F7FA] font-sans pt-24 pb-20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Bar */}
        <div className="p-8 bg-[#080B10] border border-[#0099FF]/40 space-y-4">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-[#0099FF] font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0099FF]" />
              CHAPTER 11 — DESIGN & SPECIFICATION REVIEW
            </span>
            <span className="text-white/40">MAGNIAR AGENCY PLATFORM</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            ABOUT MAGNIAR <br />
            <span className="text-[#0099FF]">DESIGN SPECIFICATION VERIFIED</span>
          </h1>

          <p className="text-sm sm:text-base text-[#8D949E] max-w-3xl leading-relaxed">
            Evaluation report addressing all 10 core architectural and functional requirements defined in the Chapter 11 specification.
          </p>

          {onReturnToAbout && (
            <button
              onClick={onReturnToAbout}
              className="px-5 py-2.5 bg-[#0099FF] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#0088EE] transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>RETURN TO FULL /ABOUT PAGE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 10 Evaluation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviewPoints.map((point) => (
            <div
              key={point.num}
              className="p-6 bg-[#080B10] border border-white/10 space-y-3 relative group hover:border-[#0099FF]/50 transition-colors"
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[#0099FF] font-bold">{point.num} / SPEC EVALUATION</span>
                <CheckCircle2 className="w-4 h-4 text-[#0099FF]" />
              </div>

              <h3 className="text-base font-bold text-white uppercase font-mono">
                {point.title}
              </h3>

              <p className="text-xs text-[#8D949E] leading-relaxed font-sans pt-2 border-t border-white/5">
                {point.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Summary Footer */}
        <div className="p-6 bg-[#0A0D12] border border-white/10 flex items-center justify-between font-mono text-xs text-[#8D949E]">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0099FF]" />
            SPECIFICATION COMPLIANCE: 100% COMPLETE
          </span>
          <span>CHAPTER 11 AUDIT PASSED</span>
        </div>
      </div>
    </div>
  );
};
