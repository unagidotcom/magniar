import React, { useState } from 'react';
import { INDUSTRY_CATEGORIES } from '../../data/industriesData';
import { IndustryCategoryId, IndustryCategory } from '../../types/industries';
import { CapabilityPillarId } from '../../types/capabilities';
import { Layers, ArrowRight, Zap, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';

interface IndustryNetworkExplorerProps {
  initialCategoryId?: IndustryCategoryId;
  onSelectCategory?: (id: IndustryCategoryId) => void;
  compact?: boolean;
}

export const IndustryNetworkExplorer: React.FC<IndustryNetworkExplorerProps> = ({
  initialCategoryId = 'ecommerce',
  onSelectCategory,
  compact = false,
}) => {
  const [selectedId, setSelectedId] = useState<IndustryCategoryId>(initialCategoryId);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const selectedCategory: IndustryCategory =
    INDUSTRY_CATEGORIES.find((c) => c.id === selectedId) || INDUSTRY_CATEGORIES[0];

  const handleCategoryChange = (id: IndustryCategoryId) => {
    setSelectedId(id);
    if (onSelectCategory) onSelectCategory(id);
  };

  const getCapabilityBadgeColor = (pillar: CapabilityPillarId) => {
    switch (pillar) {
      case 'performance':
        return 'text-[#B89A72] bg-[#B89A72]/10 border-[#B89A72]/30';
      case 'commerce':
        return 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/30';
      case 'development':
        return 'text-[#8B5CF6] bg-[#8B5CF6]/10 border-[#8B5CF6]/30';
      case 'intelligence':
        return 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/30';
      default:
        return 'text-white/80 bg-white/5 border-white/10';
    }
  };

  return (
    <div className="w-full bg-[#080A0D] border border-white/10 rounded-[2px] p-4 sm:p-6 lg:p-8 font-sans space-y-8">
      {/* Top Header & Context Description */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs text-[#B89A72]">
            <span className="w-2 h-2 rounded-full bg-[#B89A72] animate-pulse" />
            <span>INTERACTIVE BUSINESS ECOSYSTEM</span>
          </div>
          <h3 className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-[#F5F7FA]">
            Select Your Business Architecture
          </h3>
          <p className="text-sm text-[#8D949E] max-w-2xl font-sans">
            Explore how Magniar map business type to custom growth models, capability combinations, and integrated platform stacks.
          </p>
        </div>

        {/* Selected Category Label Badge */}
        <div className="font-mono text-xs text-right bg-[#0A0D12] border border-white/10 px-4 py-2.5 rounded-[2px] hidden sm:block">
          <span className="text-[#5A626E] uppercase block text-[10px]">CURRENTLY EXPLORING</span>
          <span className="text-[#B89A72] font-bold text-sm">{selectedCategory.title.toUpperCase()}</span>
        </div>
      </div>

      {/* Primary Category Selector Bar (Pill Tabs) */}
      <div className="space-y-3">
        <div className="font-mono text-[11px] text-[#8D949E] uppercase tracking-wider flex items-center justify-between">
          <span>01 / SELECT BUSINESS CATEGORY</span>
          <span className="text-[10px] text-[#5A626E]">{INDUSTRY_CATEGORIES.length} ARCHITECTURAL CATEGORIES</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {INDUSTRY_CATEGORIES.map((cat) => {
            const isSelected = cat.id === selectedId;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`
                  px-3.5 py-2 rounded-[2px] font-mono text-xs tracking-wider transition-all cursor-pointer flex items-center gap-2 border select-none
                  ${
                    isSelected
                      ? 'bg-[#B89A72] text-white border-[#B89A72] font-semibold shadow-[0_0_15px_rgba(184,154,114,0.4)]'
                      : 'bg-[#0A0D12] text-[#8D949E] hover:text-white border-white/10 hover:border-white/20'
                  }
                `}
              >
                <span>{cat.title}</span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Ecosystem Network Canvas & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT / CENTER: Interactive Network Diagram (SVG Node Visualization) */}
        <div className="lg:col-span-7 bg-[#050608] border border-white/10 rounded-[2px] p-5 relative overflow-hidden min-h-[420px] flex flex-col justify-between">
          {/* Subtle Grid Lines Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          {/* Node Relationship Map Title */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
            <span className="font-mono text-[10px] text-[#5A626E] tracking-widest uppercase flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#B89A72]" />
              BUSINESS ECOSYSTEM NETWORK MAP
            </span>
            <span className="font-mono text-[10px] text-[#B89A72] border border-[#B89A72]/30 px-2 py-0.5 rounded-[2px]">
              ADAPTIVE MODEL
            </span>
          </div>

          {/* Central Network SVG Visualizer */}
          <div className="relative z-10 my-6 flex-1 flex items-center justify-center">
            <div className="w-full max-w-lg relative py-4">
              {/* Central Primary Business Node */}
              <div className="mx-auto w-48 bg-[#0A0D12] border-2 border-[#B89A72] rounded-[2px] p-3 text-center shadow-[0_0_25px_rgba(184,154,114,0.25)] relative z-20">
                <span className="font-mono text-[9px] text-[#B89A72] tracking-widest uppercase block mb-1">
                  BUSINESS CORE
                </span>
                <span className="font-mono text-sm font-bold text-white uppercase tracking-wider block">
                  {selectedCategory.title}
                </span>
                <span className="font-mono text-[10px] text-[#8D949E] block mt-0.5">
                  ({selectedCategory.businessStageOrType})
                </span>
              </div>

              {/* Connecting SVG Lines */}
              <svg className="w-full h-44 absolute inset-0 pointer-events-none z-10 overflow-visible" viewBox="0 0 500 180">
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#B89A72" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#B89A72" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                {/* Lines connecting center (250, 40) to branch nodes */}
                <line x1="250" y1="40" x2="80" y2="140" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="250" y1="40" x2="200" y2="140" stroke="url(#lineGrad)" strokeWidth="1.5" />
                <line x1="250" y1="40" x2="310" y2="140" stroke="url(#lineGrad)" strokeWidth="1.5" />
                <line x1="250" y1="40" x2="420" y2="140" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="3 3" />

                {/* Animated Signal Pulse Dots */}
                <circle cx="165" cy="90" r="3" fill="#B89A72" className="animate-ping" />
                <circle cx="280" cy="90" r="3" fill="#B89A72" className="animate-ping" />
              </svg>

              {/* Branching Category Nodes (Bottom Tier) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-28 relative z-20">
                <div
                  onMouseEnter={() => setHoveredNode('models')}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`bg-[#0A0D12] border p-2.5 rounded-[2px] transition-all cursor-default ${
                    hoveredNode === 'models' ? 'border-[#B89A72] bg-[#B89A72]/10' : 'border-white/10'
                  }`}
                >
                  <span className="font-mono text-[9px] text-[#5A626E] uppercase block">DIMENSION 01</span>
                  <span className="font-mono text-xs font-semibold text-white block truncate">
                    BUSINESS MODEL
                  </span>
                  <span className="text-[10px] text-[#8D949E] block mt-1 truncate">
                    {selectedCategory.businessModels[0] || 'DTC / E-Com'}
                  </span>
                </div>

                <div
                  onMouseEnter={() => setHoveredNode('needs')}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`bg-[#0A0D12] border p-2.5 rounded-[2px] transition-all cursor-default ${
                    hoveredNode === 'needs' ? 'border-[#B89A72] bg-[#B89A72]/10' : 'border-white/10'
                  }`}
                >
                  <span className="font-mono text-[9px] text-[#5A626E] uppercase block">DIMENSION 02</span>
                  <span className="font-mono text-xs font-semibold text-white block truncate">
                    GROWTH NEEDS
                  </span>
                  <span className="text-[10px] text-[#8D949E] block mt-1 truncate">
                    {selectedCategory.commonGrowthNeeds.length} Key Needs
                  </span>
                </div>

                <div
                  onMouseEnter={() => setHoveredNode('capabilities')}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`bg-[#0A0D12] border p-2.5 rounded-[2px] transition-all cursor-default ${
                    hoveredNode === 'capabilities' ? 'border-[#B89A72] bg-[#B89A72]/10' : 'border-white/10'
                  }`}
                >
                  <span className="font-mono text-[9px] text-[#5A626E] uppercase block">DIMENSION 03</span>
                  <span className="font-mono text-xs font-semibold text-white block truncate">
                    CAPABILITIES
                  </span>
                  <span className="text-[10px] text-[#B89A72] block mt-1 truncate font-mono">
                    {selectedCategory.primaryCapabilities.length} Pillars
                  </span>
                </div>

                <div
                  onMouseEnter={() => setHoveredNode('platforms')}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`bg-[#0A0D12] border p-2.5 rounded-[2px] transition-all cursor-default ${
                    hoveredNode === 'platforms' ? 'border-[#B89A72] bg-[#B89A72]/10' : 'border-white/10'
                  }`}
                >
                  <span className="font-mono text-[9px] text-[#5A626E] uppercase block">DIMENSION 04</span>
                  <span className="font-mono text-xs font-semibold text-white block truncate">
                    PLATFORMS
                  </span>
                  <span className="text-[10px] text-[#8D949E] block mt-1 truncate">
                    {selectedCategory.platforms.length} Integrated
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Network Status Bar */}
          <div className="relative z-10 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-[#5A626E]">
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3 text-[#B89A72]" />
              <span>DYNAMIC SYSTEM ASSEMBLY ACTIVE</span>
            </div>
            <span>SOLUTION TAILORED TO CLIENT ECONOMICS</span>
          </div>
        </div>

        {/* RIGHT: Detailed Breakdown for Selected Business Category */}
        <div className="lg:col-span-5 space-y-5 bg-[#0A0D12] border border-white/10 rounded-[2px] p-5">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[11px] text-[#B89A72] font-semibold tracking-wider">
                {selectedCategory.numberLabel}
              </span>
              <span className="font-mono text-[10px] text-[#5A626E] border border-white/10 px-2 py-0.5 rounded-[2px]">
                {selectedCategory.businessStageOrType}
              </span>
            </div>
            <h4 className="font-mono text-lg font-bold text-white tracking-tight">
              {selectedCategory.title}
            </h4>
            <p className="text-xs text-[#8D949E] mt-1 italic">
              "{selectedCategory.tagline}"
            </p>
            <p className="text-xs text-[#F5F7FA] mt-2.5 leading-relaxed font-sans border-l-2 border-[#B89A72] pl-3 py-0.5">
              {selectedCategory.description}
            </p>
          </div>

          {/* Business Models Supported */}
          <div className="space-y-1.5 border-t border-white/10 pt-3">
            <span className="font-mono text-[10px] text-[#5A626E] uppercase tracking-wider block">
              SUPPORTED BUSINESS MODELS
            </span>
            <div className="flex flex-wrap gap-1.5">
              {selectedCategory.businessModels.map((bm, i) => (
                <span
                  key={i}
                  className="font-mono text-[11px] bg-white/[0.04] text-white border border-white/10 px-2.5 py-1 rounded-[2px]"
                >
                  {bm}
                </span>
              ))}
            </div>
          </div>

          {/* Common Growth Needs */}
          <div className="space-y-1.5 border-t border-white/10 pt-3">
            <span className="font-mono text-[10px] text-[#5A626E] uppercase tracking-wider block">
              TYPICAL GROWTH NEEDS
            </span>
            <ul className="space-y-1 font-sans text-xs text-[#8D949E]">
              {selectedCategory.commonGrowthNeeds.slice(0, 4).map((need, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B89A72] shrink-0 mt-0.5" />
                  <span className="text-[#F5F7FA]">{need}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Primary Capabilities Required */}
          <div className="space-y-1.5 border-t border-white/10 pt-3">
            <span className="font-mono text-[10px] text-[#5A626E] uppercase tracking-wider block">
              REQUIRED MAGNIAR CAPABILITIES
            </span>
            <div className="flex flex-wrap gap-1.5">
              {selectedCategory.primaryCapabilities.map((pillar) => (
                <span
                  key={pillar}
                  className={`font-mono text-[10px] px-2.5 py-1 rounded-[2px] border font-bold uppercase tracking-wider ${getCapabilityBadgeColor(
                    pillar
                  )}`}
                >
                  {pillar}
                </span>
              ))}
            </div>
          </div>

          {/* Key Integrated Platforms */}
          <div className="space-y-1.5 border-t border-white/10 pt-3">
            <span className="font-mono text-[10px] text-[#5A626E] uppercase tracking-wider block">
              RELEVANT PLATFORMS & CHANNELS
            </span>
            <div className="flex flex-wrap gap-1.5">
              {selectedCategory.platforms.map((p, i) => (
                <span
                  key={i}
                  className="font-mono text-[10px] text-[#8D949E] bg-[#050608] border border-white/10 px-2 py-0.5 rounded-[2px] flex items-center gap-1"
                >
                  <span className="w-1 h-1 rounded-full bg-[#B89A72]" />
                  <span>{p.name}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Authentic Case Study Status */}
          <div className="border-t border-white/10 pt-3 flex items-center justify-between text-[11px] font-mono">
            <div className="flex items-center gap-1.5 text-[#5A626E]">
              <ShieldAlert className="w-3.5 h-3.5 text-[#5A626E]" />
              <span>CASE STUDIES:</span>
            </div>
            {selectedCategory.hasRealCaseStudy ? (
              <span className="text-[#10B981] font-semibold">1 RELEVANT PROJECT</span>
            ) : (
              <span className="text-[#8D949E]">REAL CLIENT DATA COMING SOON</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
