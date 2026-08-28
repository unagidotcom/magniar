import React from 'react';
import { Calendar, Clock, ShieldCheck } from 'lucide-react';

export const ScheduleHero: React.FC = () => {
  return (
    <section className="pt-24 sm:pt-32 pb-12 border-b border-white/10 bg-[#050505] relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#B89A72]/10 border border-[#B89A72]/30 text-[#B89A72] font-mono text-xs font-semibold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            <span>QUALIFIED PROSPECT SCHEDULING INVITATION</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-[0.95]">
            LET'S FIND <span className="text-[#B89A72]">A TIME.</span>
          </h1>

          <p className="text-lg sm:text-2xl text-[#8D949E] font-light leading-relaxed max-w-3xl">
            Choose a time that works for you.
          </p>

          {/* Call Details Card */}
          <div className="p-6 bg-[#080B10] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3 font-mono text-xs text-[#B89A72] font-bold">
                <Clock className="w-4 h-4" />
                <span>DISCOVERY CALL • 30 MINUTES</span>
              </div>
              <p className="text-xs sm:text-sm text-[#8D949E] max-w-2xl leading-relaxed">
                An initial conversation to understand the business, goals, constraints and potential next steps.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] text-[#8D949E] shrink-0 border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-6">
              <ShieldCheck className="w-4 h-4 text-[#B89A72]" />
              <span>INVITATION ONLY PROTOCOL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
