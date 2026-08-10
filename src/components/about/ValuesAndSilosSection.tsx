import React from 'react';
import { VALUE_PRINCIPLES } from '../../data/aboutData';
import { Network, ShieldCheck } from 'lucide-react';

export const ValuesAndSilosSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 border-b border-white/10 bg-[#080B10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* MAJOR EDITORIAL HERO: SYSTEMS OVER SILOS */}
        <div className="p-8 sm:p-14 bg-[#050505] border-2 border-[#0099FF] relative overflow-hidden mb-20 shadow-[0_0_50px_rgba(0,153,255,0.15)]">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Network className="w-80 h-80 text-[#0099FF]" />
          </div>

          <div className="max-w-4xl space-y-6 relative z-10">
            <span className="font-mono text-xs text-[#0099FF] tracking-[0.2em] uppercase font-bold block flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0099FF] animate-ping" />
              [ 11 — CORE DIFFERENTIATING BELIEF ]
            </span>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight leading-[0.95]">
              SYSTEMS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0099FF] via-white to-[#0099FF]">
                OVER SILOS.
              </span>
            </h2>

            <p className="text-lg sm:text-2xl text-[#F5F7FA] font-light leading-relaxed max-w-3xl">
              Marketing, commerce, technology and intelligence shouldn't operate as separate departments when the customer experiences them as one system.
            </p>

            <div className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-6 font-mono text-xs text-[#8D949E]">
              <span className="flex items-center gap-2 text-white font-bold">
                <ShieldCheck className="w-4 h-4 text-[#0099FF]" />
                ONE CONNECTED TEAM
              </span>
              <span>•</span>
              <span>ONE UNIFIED PLAYBOOK</span>
              <span>•</span>
              <span>ZERO VENDOR FINGER-POINTING</span>
            </div>
          </div>
        </div>

        {/* VALUES & PRINCIPLES GRID */}
        <div className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="font-mono text-xs text-[#0099FF] tracking-[0.2em] uppercase font-semibold block">
              [ OPERATING VALUES ]
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold text-white uppercase">
              OUR GUIDING STANDARDS
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUE_PRINCIPLES.map((value, i) => (
              <div
                key={value.id}
                className="p-6 bg-[#050505] border border-white/10 hover:border-[#0099FF]/50 transition-colors group space-y-3"
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[#0099FF] font-bold">0{i + 1} / VALUE</span>
                  <span className="text-white/20">MAGNIAR</span>
                </div>
                <h4 className="text-lg font-bold text-white uppercase group-hover:text-[#0099FF] transition-colors">
                  {value.title}
                </h4>
                <p className="text-xs font-mono text-[#0099FF] uppercase">
                  {value.subtitle}
                </p>
                <p className="text-xs text-[#8D949E] leading-relaxed pt-2 border-t border-white/5">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
