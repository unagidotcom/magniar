import React from 'react';
import { Globe2, Building2, Check, ArrowUpRight } from 'lucide-react';

interface TargetMarketSectionProps {
  onStartProject?: () => void;
}

export const TargetMarketSection: React.FC<TargetMarketSectionProps> = ({
  onStartProject,
}) => {
  const targetProfiles = [
    {
      title: 'FOUNDER-LED BUSINESSES',
      desc: 'Ambitious founders requiring direct growth alignment without agency bureaucracy.',
    },
    {
      title: 'GROWING E-COMMERCE & DTC',
      desc: 'Brands looking to scale customer acquisition while preserving contribution margins.',
    },
    {
      title: 'SMALL & MID-SIZED ENTERPRISES',
      desc: 'Mid-market companies replacing fragmented vendor stacks with one connected growth partner.',
    },
    {
      title: 'B2B & TECH COMPANIES',
      desc: 'High-ACV software & services companies seeking qualified pipeline & account targeting.',
    },
    {
      title: 'INTERNATIONAL EXPANDERS',
      desc: 'Businesses expanding storefronts, feeds, and paid campaigns into new global territories.',
    },
    {
      title: 'COMMERCE MODERNIZERS',
      desc: 'Companies migrating legacy sites to high-speed headless or Shopify/WooCommerce architectures.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 border-b border-white/10 bg-[#080B10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Target Focus */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="font-mono text-xs text-[#B89A72] tracking-[0.2em] uppercase font-semibold block">
                [ 05 — TARGET AUDIENCE & FOCUS ]
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F7FA] uppercase leading-tight">
                BUILT FOR BUSINESSES <br />
                <span className="text-[#B89A72]">THAT ARE READY TO MOVE.</span>
              </h2>
              <p className="text-base text-[#8D949E] leading-relaxed">
                We partner with decision-makers who value speed, technical accountability, and unified growth execution over vanity reports.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {targetProfiles.map((item, idx) => (
                <div key={idx} className="p-4 bg-[#050505] border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 font-mono text-xs text-white font-bold">
                    <Check className="w-3.5 h-3.5 text-[#B89A72] shrink-0" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs text-[#8D949E] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: International & Global Reach */}
          <div className="lg:col-span-5 bg-[#050505] border border-white/15 p-6 sm:p-8 space-y-6 relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 font-mono text-xs">
              <span className="text-[#B89A72] font-bold flex items-center gap-2 uppercase">
                <Globe2 className="w-4 h-4 text-[#B89A72]" />
                GLOBAL REACH
              </span>
              <span className="text-[#8D949E]">CROSS-BORDER READY</span>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white uppercase font-mono">
                LOCAL CONTEXT. <br />
                GLOBAL REACH.
              </h3>
              <p className="text-sm text-[#8D949E] leading-relaxed">
                Magniar operates seamlessly across global markets, platform rules, and cross-border currency feeds—delivering campaign strategies adapted to international consumer behavior.
              </p>
            </div>

            {/* Factual Geographic & Currency Matrix */}
            <div className="p-4 bg-[#0A0D12] border border-white/10 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-white">
                <span className="text-[#8D949E]">AMERICAS & EUROPE</span>
                <span className="text-[#B89A72] font-bold">USD / EUR / GBP</span>
              </div>
              <div className="flex items-center justify-between text-white">
                <span className="text-[#8D949E]">ASIA PACIFIC & LATAM</span>
                <span className="text-[#B89A72] font-bold">MULTI-CURRENCY</span>
              </div>
              <div className="flex items-center justify-between text-white">
                <span className="text-[#8D949E]">CROSS-BORDER SELLING</span>
                <span className="text-[#B89A72] font-bold">FEEDS & TAX SYNC</span>
              </div>
            </div>

            <p className="text-xs text-[#8D949E] font-mono italic">
              * Note: We operate as a distributed global team and build remote-first client workflows without maintaining unnecessary brick-and-mortar overhead.
            </p>

            <button
              onClick={onStartProject}
              className="w-full py-3 bg-[#B89A72] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#8F714D] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>DISCUSS YOUR MARKET EXPANSION</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
