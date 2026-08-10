import React, { useState } from 'react';
import { PLATFORM_ITEMS } from '../../data/aboutData';
import { Layers, Server } from 'lucide-react';

export const PlatformMatrix: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Paid Acquisition', 'Commerce & Storefronts', 'Marketplaces & Social'];

  const filteredPlatforms = selectedCategory === 'All'
    ? PLATFORM_ITEMS
    : PLATFORM_ITEMS.filter((p) => p.category === selectedCategory);

  return (
    <section className="py-20 sm:py-28 border-b border-white/10 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-mono text-xs text-[#0099FF] tracking-[0.2em] uppercase font-semibold block mb-2">
              [ 06 — PLATFORM ECOSYSTEM ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F7FA] uppercase">
              DEEP PLATFORM <br />
              <span className="text-[#0099FF]">FAMILIARITY</span>
            </h2>
          </div>
          <p className="text-sm text-[#8D949E] max-w-md font-mono">
            A restrained ecosystem matrix. We hold direct technical proficiency across major ad networks, commerce engines, and global marketplace channels.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 border transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0099FF] border-white text-white font-bold'
                  : 'bg-[#0A0D12] border-white/10 text-[#8D949E] hover:text-white hover:border-white/30'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Compact Typography Platform Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlatforms.map((item) => (
            <div
              key={item.id}
              className="p-5 bg-[#080B10] border border-white/10 hover:border-[#0099FF]/50 transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="text-[#0099FF] font-semibold">{item.category}</span>
                  <span className="text-[#8D949E] flex items-center gap-1">
                    <Server className="w-3 h-3 text-white/30" />
                    {item.region}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white uppercase group-hover:text-[#0099FF] transition-colors">
                  {item.name}
                </h3>

                <p className="text-xs text-[#8D949E] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between font-mono text-[10px]">
                <span className="text-[#8D949E]">TECH PROTOCOL</span>
                <span className="px-2 py-0.5 bg-white/5 text-[#0099FF] border border-white/10 font-bold">
                  {item.techTag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between font-mono text-xs text-[#8D949E]">
          <span className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#0099FF]" />
            NO RIGID CHANNEL FAVORITISM
          </span>
          <span>PLATFORM SELECTION IS GOVERNED BY UNIT ECONOMICS</span>
        </div>
      </div>
    </section>
  );
};
