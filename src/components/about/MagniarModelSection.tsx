import React, { useState } from 'react';
import { DISCIPLINE_NODES } from '../../data/aboutData';
import { DisciplineNode } from '../../types/about';
import { ArrowUpRight, CheckCircle2, Zap } from 'lucide-react';

interface MagniarModelSectionProps {
  onSelectDiscipline?: (disciplineId: string) => void;
}

export const MagniarModelSection: React.FC<MagniarModelSectionProps> = ({
  onSelectDiscipline,
}) => {
  const [activeDiscipline, setActiveDiscipline] = useState<string | null>('performance');

  const selectedNode = DISCIPLINE_NODES.find((d) => d.id === activeDiscipline) || DISCIPLINE_NODES[0];

  return (
    <section className="py-20 sm:py-28 border-b border-white/10 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-xs text-[#B89A72] tracking-[0.2em] uppercase font-semibold block mb-2">
              [ 02 — THE MAGNIAR MODEL ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F7FA] uppercase">
              THE CONNECTED <br />
              <span className="text-[#B89A72]">GROWTH ARCHITECTURE</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#8D949E] max-w-xl font-mono">
            Hover or tap any discipline node below to inspect how Performance, Commerce, Development, and Intelligence route directly into unified business growth.
          </p>
        </div>

        {/* DESKTOP / TABLET INTERACTIVE DIAGRAM (hidden on small mobile, stacked on mobile) */}
        <div className="hidden md:block mb-16">
          <div className="p-8 sm:p-12 bg-[#080B10] border border-white/15 relative overflow-hidden">
            {/* Background Diagram Grid & Circular Rings */}
            <div className="absolute inset-0 bg-[radial-gradient(#B89A72_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-white/10 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-white/5 pointer-events-none" />

            {/* Central Node: GROWTH */}
            <div className="relative z-20 min-h-[440px] flex items-center justify-center">
              {/* Central Box */}
              <div
                className={`px-8 py-6 rounded-[2px] bg-[#050505] border-2 transition-all text-center shadow-2xl relative ${
                  activeDiscipline
                    ? 'border-[#B89A72] shadow-[0_0_40px_rgba(184,154,114,0.25)]'
                    : 'border-white/20'
                }`}
              >
                <span className="font-mono text-[10px] text-[#B89A72] tracking-widest uppercase block mb-1">
                  CORE OUTCOME
                </span>
                <span className="text-2xl font-extrabold tracking-tight text-white uppercase block">
                  GROWTH
                </span>
                <span className="text-[11px] font-mono text-[#8D949E] mt-1 block">
                  Profit • LTV • Scaling
                </span>
              </div>

              {/* Node 1: PERFORMANCE (TOP) */}
              <button
                type="button"
                onClick={() => setActiveDiscipline('performance')}
                onMouseEnter={() => setActiveDiscipline('performance')}
                onFocus={() => setActiveDiscipline('performance')}
                aria-label="Performance Discipline Node"
                className={`absolute top-0 left-1/2 -translate-x-1/2 px-6 py-4 border font-mono text-left transition-all z-30 cursor-pointer ${
                  activeDiscipline === 'performance'
                    ? 'bg-[#B89A72] border-white text-white shadow-[0_0_25px_rgba(184,154,114,0.4)] scale-105'
                    : 'bg-[#0A0D12] border-white/20 text-[#8D949E] hover:border-white/50 hover:text-white'
                }`}
              >
                <span className="text-[10px] block opacity-80">01 / DISCIPLINE</span>
                <span className="font-bold text-sm block">PERFORMANCE</span>
                <span className="text-[10px] block opacity-80 mt-0.5">Paid Acquisition</span>
              </button>

              {/* Node 2: COMMERCE (LEFT) */}
              <button
                type="button"
                onClick={() => setActiveDiscipline('commerce')}
                onMouseEnter={() => setActiveDiscipline('commerce')}
                onFocus={() => setActiveDiscipline('commerce')}
                aria-label="Commerce Discipline Node"
                className={`absolute left-0 top-1/2 -translate-y-1/2 px-6 py-4 border font-mono text-left transition-all z-30 cursor-pointer ${
                  activeDiscipline === 'commerce'
                    ? 'bg-[#B89A72] border-white text-white shadow-[0_0_25px_rgba(184,154,114,0.4)] scale-105'
                    : 'bg-[#0A0D12] border-white/20 text-[#8D949E] hover:border-white/50 hover:text-white'
                }`}
              >
                <span className="text-[10px] block opacity-80">02 / DISCIPLINE</span>
                <span className="font-bold text-sm block">COMMERCE</span>
                <span className="text-[10px] block opacity-80 mt-0.5">Storefronts & Feeds</span>
              </button>

              {/* Node 3: DEVELOPMENT (RIGHT) */}
              <button
                type="button"
                onClick={() => setActiveDiscipline('development')}
                onMouseEnter={() => setActiveDiscipline('development')}
                onFocus={() => setActiveDiscipline('development')}
                aria-label="Development Discipline Node"
                className={`absolute right-0 top-1/2 -translate-y-1/2 px-6 py-4 border font-mono text-left transition-all z-30 cursor-pointer ${
                  activeDiscipline === 'development'
                    ? 'bg-[#B89A72] border-white text-white shadow-[0_0_25px_rgba(184,154,114,0.4)] scale-105'
                    : 'bg-[#0A0D12] border-white/20 text-[#8D949E] hover:border-white/50 hover:text-white'
                }`}
              >
                <span className="text-[10px] block opacity-80">03 / DISCIPLINE</span>
                <span className="font-bold text-sm block">DEVELOPMENT</span>
                <span className="text-[10px] block opacity-80 mt-0.5">Tracking & Infrastructure</span>
              </button>

              {/* Node 4: INTELLIGENCE (BOTTOM) */}
              <button
                type="button"
                onClick={() => setActiveDiscipline('intelligence')}
                onMouseEnter={() => setActiveDiscipline('intelligence')}
                onFocus={() => setActiveDiscipline('intelligence')}
                aria-label="Intelligence Discipline Node"
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 px-6 py-4 border font-mono text-left transition-all z-30 cursor-pointer ${
                  activeDiscipline === 'intelligence'
                    ? 'bg-[#B89A72] border-white text-white shadow-[0_0_25px_rgba(184,154,114,0.4)] scale-105'
                    : 'bg-[#0A0D12] border-white/20 text-[#8D949E] hover:border-white/50 hover:text-white'
                }`}
              >
                <span className="text-[10px] block opacity-80">04 / DISCIPLINE</span>
                <span className="font-bold text-sm block">INTELLIGENCE</span>
                <span className="text-[10px] block opacity-80 mt-0.5">AI & Analytics</span>
              </button>

              {/* Connecting SVG Axis Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" aria-hidden="true">
                {/* Vertical axis line */}
                <line
                  x1="50%"
                  y1="10%"
                  x2="50%"
                  y2="90%"
                  stroke={
                    activeDiscipline === 'performance' || activeDiscipline === 'intelligence'
                      ? '#B89A72'
                      : 'rgba(255,255,255,0.15)'
                  }
                  strokeWidth={
                    activeDiscipline === 'performance' || activeDiscipline === 'intelligence' ? '2' : '1'
                  }
                  strokeDasharray={
                    activeDiscipline === 'performance' || activeDiscipline === 'intelligence' ? 'none' : '4 4'
                  }
                />

                {/* Horizontal axis line */}
                <line
                  x1="10%"
                  y1="50%"
                  x2="90%"
                  y2="50%"
                  stroke={
                    activeDiscipline === 'commerce' || activeDiscipline === 'development'
                      ? '#B89A72'
                      : 'rgba(255,255,255,0.15)'
                  }
                  strokeWidth={
                    activeDiscipline === 'commerce' || activeDiscipline === 'development' ? '2' : '1'
                  }
                  strokeDasharray={
                    activeDiscipline === 'commerce' || activeDiscipline === 'development' ? 'none' : '4 4'
                  }
                />
              </svg>
            </div>
          </div>
        </div>

        {/* MOBILE STACKED INTERACTIVE NODE SELECTOR (<768px) */}
        <div className="md:hidden space-y-3 mb-8">
          <div className="text-center p-4 bg-[#080B10] border border-[#B89A72]/40 rounded-[2px]">
            <span className="text-xs font-mono text-[#B89A72] block">CENTRAL OUTCOME</span>
            <span className="text-xl font-bold text-white uppercase">UNIFIED GROWTH ENGINE</span>
          </div>

          <div className="grid grid-cols-2 gap-2 font-mono text-xs">
            {DISCIPLINE_NODES.map((node) => (
              <button
                key={node.id}
                onClick={() => setActiveDiscipline(node.id)}
                className={`p-3 border text-left cursor-pointer transition-colors ${
                  activeDiscipline === node.id
                    ? 'bg-[#B89A72] border-white text-white font-bold'
                    : 'bg-[#0A0D12] border-white/10 text-[#8D949E]'
                }`}
              >
                <span className="block text-[10px] opacity-80">{node.numberLabel}</span>
                <span className="block text-xs uppercase font-bold">{node.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* SELECTED DISCIPLINE DETAIL CARD */}
        <div className="p-6 sm:p-8 bg-[#080B10] border border-[#B89A72]/40 relative">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-6 mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="text-[#B89A72] font-bold">{selectedNode.numberLabel} / DISCIPLINE INSPECTOR</span>
                <span className="text-white/30">•</span>
                <span className="text-[#8D949E] uppercase">{selectedNode.tagline}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">
                {selectedNode.title}
              </h3>
            </div>

            <a
              href={selectedNode.href}
              onClick={(e) => {
                e.preventDefault();
                if (onSelectDiscipline) onSelectDiscipline(selectedNode.id);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#B89A72] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#8F714D] transition-all cursor-pointer self-start lg:self-auto"
            >
              <span>VIEW {selectedNode.title} CAPABILITIES</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <p className="text-base text-[#F5F7FA] leading-relaxed">
                {selectedNode.description}
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-[#B89A72]">
                <Zap className="w-4 h-4" />
                <span>DIRECTLY CONNECTED TO:</span>
                <span className="text-white uppercase font-bold">
                  {selectedNode.connections.join(' • ')}
                </span>
              </div>
            </div>

            <div className="lg:col-span-7">
              <span className="font-mono text-xs text-[#8D949E] uppercase tracking-wider block mb-3">
                CORE OPERATIONAL CAPABILITIES INCLUDED:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
                {selectedNode.capabilities.map((cap, i) => (
                  <div key={i} className="p-2.5 bg-[#050505] border border-white/10 flex items-center gap-2 text-white">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B89A72] shrink-0" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
