import React from 'react';
import { CASE_STUDIES_DATA } from '../../data/workData';
import { WorkCard } from './WorkCard';
import { TechnicalLabel } from '../common/TechnicalLabel';
import { ArrowRight } from 'lucide-react';
import { MagniarButton } from '../common/MagniarButton';

interface WorkSectionProps {
  onExploreFullWork: () => void;
  onSelectCaseStudy: (slug: string) => void;
}

export function WorkSection({ onExploreFullWork, onSelectCaseStudy }: WorkSectionProps) {
  // Show top 3 featured case studies
  const featuredCaseStudies = CASE_STUDIES_DATA.slice(0, 3);

  return (
    <section id="work" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-t border-white/10 bg-[#050505] text-[#F5F7FA] relative overflow-hidden">
      {/* Background Accent Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-white/10 pb-8">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-3">
              <TechnicalLabel text="CLIENT PROOF & OUTCOMES" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#0099FF]" />
              <span className="font-sans text-xs text-slate-400 uppercase tracking-wider font-semibold">
                CASE STUDIES & RESULTS
              </span>
            </div>

            <h2 className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.08]">
              SELECTED WORK. <br />
              <span className="text-[#0099FF]">REAL BUSINESSES.</span>
            </h2>

            <p className="text-lg text-slate-300 font-normal leading-relaxed">
              A selection of businesses we've helped across acquisition, commerce, development and intelligence. Clear objectives, disciplined execution, and transparent metrics.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
            <MagniarButton variant="primary" size="lg" onClick={onExploreFullWork}>
              VIEW ALL CASE STUDIES →
            </MagniarButton>
          </div>
        </div>

        {/* Featured Case Study Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featuredCaseStudies.map((cs, idx) => (
            <WorkCard
              key={cs.id}
              caseStudy={cs}
              onSelect={onSelectCaseStudy}
              featuredLayout={idx === 0}
            />
          ))}
        </div>

        {/* Footer Summary Strip */}
        <div className="p-6 bg-[#080B10] border border-white/10 rounded-[2px] flex flex-wrap items-center justify-between gap-4 font-sans text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#0099FF]" />
            <span className="text-slate-200 font-medium text-sm">Disciplined execution across E-Commerce, DTC, B2B SaaS, and Omnichannel Retail.</span>
          </div>

          <button
            onClick={onExploreFullWork}
            className="text-[#0099FF] hover:underline flex items-center gap-1.5 font-semibold uppercase tracking-wider cursor-pointer text-xs"
          >
            <span>EXPLORE CASE STUDY INDEX</span>
            <ArrowRight className="w-4 h-4 text-[#0099FF]" />
          </button>
        </div>
      </div>
    </section>
  );
}


