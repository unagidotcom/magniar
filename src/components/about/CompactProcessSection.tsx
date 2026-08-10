import React from 'react';
import { COMPACT_PROCESS_STEPS } from '../../data/aboutData';
import { ArrowRight, Workflow } from 'lucide-react';

interface CompactProcessSectionProps {
  onSeeProcess?: () => void;
}

export const CompactProcessSection: React.FC<CompactProcessSectionProps> = ({
  onSeeProcess,
}) => {
  return (
    <section className="py-20 sm:py-24 border-b border-white/10 bg-[#080B10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-mono text-xs text-[#0099FF] tracking-[0.2em] uppercase font-semibold block mb-2">
              [ 09 — OPERATIONAL CADENCE ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F7FA] uppercase">
              HOW WE <span className="text-[#0099FF]">WORK</span>
            </h2>
          </div>

          <button
            onClick={onSeeProcess}
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#0099FF] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#0088EE] transition-all cursor-pointer self-start md:self-auto"
          >
            <span>SEE FULL PROCESS METHODOLOGY</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 5-Step Compact Horizontal Process Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {COMPACT_PROCESS_STEPS.map((step) => (
            <div
              key={step.step}
              className="p-5 bg-[#050505] border border-white/10 hover:border-[#0099FF]/40 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[#0099FF] font-bold">{step.step}</span>
                  <Workflow className="w-3.5 h-3.5 text-white/20" />
                </div>
                <h3 className="text-base font-bold text-white uppercase font-mono">
                  {step.title}
                </h3>
                <p className="text-xs text-[#8D949E] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
