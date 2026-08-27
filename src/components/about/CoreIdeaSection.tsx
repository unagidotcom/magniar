import React from 'react';
import { ArrowRight, Layers } from 'lucide-react';

interface CoreIdeaSectionProps {
  onSeeCapabilities?: () => void;
}

export const CoreIdeaSection: React.FC<CoreIdeaSectionProps> = ({
  onSeeCapabilities,
}) => {
  const steps = [
    {
      num: '01',
      label: 'TRAFFIC',
      title: 'A campaign can bring traffic.',
      desc: 'Paid media generates high-intent visits across Google, Meta, TikTok, and search.',
    },
    {
      num: '02',
      label: 'CONVERSION',
      title: 'A website can convert it.',
      desc: 'Optimized speed, UX clarity, and responsive architecture transform visitors into buyers.',
    },
    {
      num: '03',
      label: 'FULFILLMENT',
      title: 'A commerce system can fulfill it.',
      desc: 'Shopify, marketplaces, inventory APIs, and logistics workflows complete the loop.',
    },
    {
      num: '04',
      label: 'ATTRIBUTION',
      title: 'Data can explain what happened.',
      desc: 'First-party server tracking and multi-touch attribution expose real contribution margins.',
    },
    {
      num: '05',
      label: 'INTELLIGENCE',
      title: 'AI can make the system intelligent.',
      desc: 'Automated creative testing, LLM workflows, and predictive modeling accelerate decisions.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 border-b border-white/10 bg-[#080B10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="font-mono text-xs text-[#B89A72] tracking-[0.2em] uppercase font-semibold block">
            [ 01 — THE CENTRAL PHILOSOPHY ]
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F5F7FA] uppercase leading-tight">
            MARKETING DOESN'T <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5F7FA] to-[#B89A72]">
              EXIST IN ISOLATION.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#8D949E] leading-relaxed">
            Growth happens when performance acquisition, digital commerce, technical infrastructure, and data intelligence operate as a singular, synchronized system.
          </p>
        </div>

        {/* 5-Step Connected Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className="p-6 bg-[#050505] border border-white/10 relative flex flex-col justify-between hover:border-[#B89A72]/50 transition-colors group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[#B89A72] font-bold">{step.num}</span>
                  <span className="text-[#8D949E] text-[10px] uppercase tracking-wider">{step.label}</span>
                </div>
                <h3 className="text-base font-bold text-[#F5F7FA] group-hover:text-[#B89A72] transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-[#8D949E] leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-[#B89A72]">
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Highlight Banner */}
        <div className="mt-12 p-6 sm:p-8 bg-gradient-to-r from-[#B89A72]/10 via-transparent to-transparent border border-[#B89A72]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <Layers className="w-6 h-6 text-[#B89A72] shrink-0 mt-1" />
            <div>
              <h4 className="text-lg font-bold text-white uppercase font-mono">
                THE SYNERGY EFFECT
              </h4>
              <p className="text-sm text-[#8D949E] mt-1 max-w-2xl">
                When acquisition ads match store speed, server analytics feed conversion algorithms, and AI automates creative optimization—growth compounds systematically.
              </p>
            </div>
          </div>

          <button
            onClick={onSeeCapabilities}
            className="px-5 py-3 bg-[#B89A72] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#8F714D] transition-all flex items-center gap-2 whitespace-nowrap self-start sm:self-center cursor-pointer"
          >
            <span>EXPLORE DISCIPLINES</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
