import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

interface ContactProjectCTAProps {
  onStartProject?: () => void;
}

export const ContactProjectCTA: React.FC<ContactProjectCTAProps> = ({ onStartProject }) => {
  return (
    <section className="py-20 sm:py-28 bg-[#080B10] relative overflow-hidden border-b border-white/10">
      {/* Visual Accent Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-14 bg-[#050505] border-2 border-[#0099FF] relative overflow-hidden shadow-[0_0_50px_rgba(0,153,255,0.15)] text-center sm:text-left">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0099FF]/10 text-[#0099FF] border border-[#0099FF]/30 font-mono text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>[ 03 — PRIMARY QUALIFICATION CROSSOVER ]</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-[0.95]">
              LOOKING TO WORK <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#0099FF] to-[#0099FF]">
                WITH MAGNIAR?
              </span>
            </h2>

            <p className="text-base sm:text-xl text-[#F5F7FA] font-light leading-relaxed max-w-2xl">
              Tell us about your business, goals and what you want to build. Our structured discovery intake captures your technical requirements and growth benchmarks.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onStartProject}
                className="px-8 py-4 bg-[#0099FF] text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#0088EE] transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(0,153,255,0.3)] cursor-pointer group"
              >
                <span>START A PROJECT</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center gap-2 font-mono text-xs text-[#8D949E]">
                <ShieldCheck className="w-4 h-4 text-[#0099FF]" />
                <span>QUALIFIED INTAKE • 5 MIN ESTIMATED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
