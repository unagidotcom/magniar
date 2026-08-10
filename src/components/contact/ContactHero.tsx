import React from 'react';
import { ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react';

interface ContactHeroProps {
  onStartProject?: () => void;
}

export const ContactHero: React.FC<ContactHeroProps> = ({ onStartProject }) => {
  return (
    <section className="pt-24 sm:pt-32 pb-16 border-b border-white/10 bg-[#050505] relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl space-y-6">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0099FF]/10 border border-[#0099FF]/30 text-[#0099FF] font-mono text-xs font-semibold uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>GENERAL COMMUNICATIONS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-[0.95]">
            LET'S <span className="text-[#0099FF]">TALK.</span>
          </h1>

          <p className="text-lg sm:text-2xl text-[#8D949E] font-light leading-relaxed max-w-3xl">
            Have a question, partnership idea, or something else you want to discuss? Send us a note.
          </p>

          {/* Qualification distinction callout banner */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#080B10] border border-white/10">
            <div className="space-y-1">
              <span className="font-mono text-xs text-[#0099FF] uppercase font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0099FF]" />
                FOR GROWTH ENGAGEMENTS & CUSTOM SYSTEMS
              </span>
              <p className="text-xs text-[#8D949E]">
                Looking to partner with Magniar for performance marketing, commerce, or engineering?
              </p>
            </div>

            <button
              onClick={onStartProject}
              className="px-5 py-2.5 bg-[#0099FF] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#0088EE] transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-[0_0_20px_rgba(0,153,255,0.2)]"
            >
              <span>START A PROJECT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
