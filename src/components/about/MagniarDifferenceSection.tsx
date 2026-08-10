import React from 'react';
import { MAGNIAR_DIFFERENTIATORS } from '../../data/aboutData';
import { ShieldCheck, ArrowRight } from 'lucide-react';

interface MagniarDifferenceSectionProps {
  onStartProject?: () => void;
}

export const MagniarDifferenceSection: React.FC<MagniarDifferenceSectionProps> = ({
  onStartProject,
}) => {
  return (
    <section className="py-20 sm:py-28 border-b border-white/10 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="font-mono text-xs text-[#0099FF] tracking-[0.2em] uppercase font-semibold block">
            [ 12 — THE MAGNIAR DIFFERENCE ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F7FA] uppercase leading-tight">
            WHY AMBITIOUS BRANDS <br />
            <span className="text-[#0099FF]">CHOOSE MAGNIAR.</span>
          </h2>
          <p className="text-base text-[#8D949E] leading-relaxed">
            Five concise structural differences that separate our connected growth partner model from traditional ad agencies and IT outsourcing firms.
          </p>
        </div>

        {/* 5 DIFFERENTIATORS LIST */}
        <div className="space-y-4 mb-12">
          {MAGNIAR_DIFFERENTIATORS.map((diff) => (
            <div
              key={diff.number}
              className="p-6 bg-[#080B10] border border-white/10 hover:border-[#0099FF]/50 transition-all group grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
            >
              <div className="md:col-span-1 font-mono text-xl font-bold text-[#0099FF]">
                {diff.number}
              </div>

              <div className="md:col-span-4 space-y-1">
                <h3 className="text-lg font-bold text-white uppercase group-hover:text-[#0099FF] transition-colors">
                  {diff.title}
                </h3>
                <span className="font-mono text-xs text-[#0099FF] block">
                  {diff.shortDesc}
                </span>
              </div>

              <div className="md:col-span-7 text-xs sm:text-sm text-[#8D949E] leading-relaxed font-sans">
                {diff.detail}
              </div>
            </div>
          ))}
        </div>

        {/* FACTUAL INTEGRITY BOX */}
        <div className="p-6 bg-[#0A0D12] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#0099FF] shrink-0" />
            <span className="text-[#8D949E]">
              FACTUAL INTEGRITY: We build our reputation on verifiable technical execution and unit economics—never fabricated client stats, inflated revenue badges, or fake award logos.
            </span>
          </div>

          <button
            onClick={onStartProject}
            className="px-5 py-2.5 bg-[#0099FF] text-white font-bold uppercase tracking-wider hover:bg-[#0088EE] transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>START A PROJECT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
