import React from 'react';
import { ArrowDownRight, ArrowRight, Sparkles } from 'lucide-react';

interface AboutCTAProps {
  onStartProject?: () => void;
  onExploreWork?: () => void;
}

export const AboutCTA: React.FC<AboutCTAProps> = ({
  onStartProject,
  onExploreWork,
}) => {
  return (
    <section className="py-24 sm:py-32 bg-[#050505] relative overflow-hidden border-b border-white/10">
      {/* Background Sub-grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#B89A72]/10 text-[#B89A72] border border-[#B89A72]/30 font-mono text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DISCOVERY INTAKE READY</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight leading-[0.95]">
            READY TO BUILD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#B89A72] to-[#B89A72]">
              WHAT'S NEXT?
            </span>
          </h2>

          <p className="text-base sm:text-xl text-[#8D949E] leading-relaxed max-w-2xl mx-auto font-normal">
            Tell us what you're building, where growth is currently constrained, and what you want to change.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onStartProject}
              className="px-8 py-4 bg-[#B89A72] text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#8F714D] transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(184,154,114,0.3)] cursor-pointer group"
            >
              <span>START A PROJECT</span>
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={onExploreWork}
              className="px-8 py-4 bg-white/5 border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-white/10 hover:border-white/40 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>EXPLORE OUR WORK</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
