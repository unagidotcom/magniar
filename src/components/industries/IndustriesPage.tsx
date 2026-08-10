import React, { useState } from 'react';
import { INDUSTRY_CATEGORIES, CAPABILITY_PULL_MAP } from '../../data/industriesData';
import { IndustryCategoryId } from '../../types/industries';
import { IndustryNetworkExplorer } from './IndustryNetworkExplorer';
import { MagniarButton } from '../common/MagniarButton';
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  Zap,
  ShieldAlert,
  Sliders,
  Globe,
  Building,
  TrendingUp,
  ShoppingBag,
  ExternalLink,
  Info,
} from 'lucide-react';

interface IndustriesPageProps {
  onStartProject?: () => void;
  onSeeHowWeWork?: () => void;
  onExploreCapabilities?: () => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({
  onStartProject,
  onSeeHowWeWork,
  onExploreCapabilities,
}) => {
  const [activeExplorerId, setActiveExplorerId] = useState<IndustryCategoryId>('ecommerce');
  const [caseStudyFilterIndustry, setCaseStudyFilterIndustry] = useState<string>('all');

  return (
    <div className="w-full bg-[#050505] text-[#F5F7FA] font-sans">
      {/* SECTION 01 / HERO */}
      <section className="relative py-20 lg:py-28 border-b border-white/10 bg-[linear-gradient(180deg,#0A0D12_0%,#050505_100%)] overflow-hidden">
        {/* Technical Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 relative z-10 space-y-8">
          <div className="space-y-4 max-w-4xl">
            <div className="flex items-center gap-2 font-mono text-xs text-[#0099FF] tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-[#0099FF] animate-pulse" />
              <span>TARGET INDUSTRIES & BUSINESS TYPES</span>
            </div>

            <h1 className="font-mono text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F5F7FA] leading-[1.08]">
              GROWTH LOOKS DIFFERENT <br />
              <span className="text-[#0099FF]">FROM BUSINESS TO BUSINESS.</span>
            </h1>

            <p className="text-base sm:text-xl text-[#8D949E] leading-relaxed font-sans max-w-3xl">
              We build around the economics, customers, technology and goals of the business — not around a fixed service package.
            </p>
          </div>

          {/* Positioning Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-4xl font-mono text-xs text-[#8D949E]">
            <div className="flex items-start gap-2 bg-[#0A0D12] border border-white/10 p-4 rounded-[2px]">
              <Globe className="w-4 h-4 text-[#0099FF] shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-bold block mb-1">GLOBAL REACH</span>
                <span>Small to mid-sized ambitious businesses worldwide.</span>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-[#0A0D12] border border-white/10 p-4 rounded-[2px]">
              <TrendingUp className="w-4 h-4 text-[#0099FF] shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-bold block mb-1">NO PRE-REQUISITE KNOWLEDGE</span>
                <span>You don't need to know which exact service you need first.</span>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-[#0A0D12] border border-white/10 p-4 rounded-[2px]">
              <Building className="w-4 h-4 text-[#0099FF] shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-bold block mb-1">SYSTEM ASSEMBLY</span>
                <span>Adapting performance, commerce, tech & AI to your model.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02 / BUSINESS ECOSYSTEM SELECTOR */}
      <section className="py-16 sm:py-20 border-b border-white/10 bg-[#050505]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs text-[#0099FF] tracking-widest uppercase block mb-1">
                SECTION 02 / INTERACTIVE ECOSYSTEM
              </span>
              <h2 className="font-mono text-2xl sm:text-3xl font-bold text-white">
                Explore Your Business Type Relationships
              </h2>
            </div>
            <span className="font-mono text-xs text-[#5A626E]">
              BUSINESS → MODEL → CAPABILITIES → PLATFORMS
            </span>
          </div>

          <IndustryNetworkExplorer
            initialCategoryId={activeExplorerId}
            onSelectCategory={setActiveExplorerId}
          />
        </div>
      </section>

      {/* SECTIONS 03 - 11 / ALL 9 DEEP-DIVE INDUSTRY CATEGORIES */}
      <section className="py-16 sm:py-24 border-b border-white/10 bg-[#080A0D]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 space-y-16">
          <div className="space-y-2 border-b border-white/10 pb-6">
            <span className="font-mono text-xs text-[#0099FF] tracking-widest uppercase block">
              SECTIONS 03–11 / ARCHITECTURAL DEEP-DIVES
            </span>
            <h2 className="font-mono text-3xl sm:text-4xl font-bold text-white">
              The 9 Business Categories We Serve
            </h2>
            <p className="text-sm text-[#8D949E] max-w-2xl">
              Each category represents a distinct set of unit economics, platform ecosystems, and acquisition workflows.
            </p>
          </div>

          {/* Grid of All 9 Categories */}
          <div className="space-y-12">
            {INDUSTRY_CATEGORIES.map((cat, idx) => (
              <div
                key={cat.id}
                id={`industry-${cat.id}`}
                className="bg-[#050608] border border-white/10 rounded-[2px] p-6 sm:p-8 space-y-6 relative overflow-hidden group hover:border-white/20 transition-all"
              >
                {/* Header Row */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-white/10 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[#0099FF] font-bold">
                        SECTION 0{idx + 3} / {cat.numberLabel}
                      </span>
                      <span className="font-mono text-[10px] text-[#5A626E] border border-white/10 px-2 py-0.5 rounded-[2px]">
                        {cat.businessStageOrType}
                      </span>
                    </div>
                    <h3 className="font-mono text-2xl font-bold text-white">
                      {cat.title}
                    </h3>
                  </div>

                  <span className="font-mono text-xs text-[#8D949E] italic max-w-md">
                    "{cat.tagline}"
                  </span>
                </div>

                {/* Core Description & Needs */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-5 space-y-4">
                    <p className="text-sm text-[#F5F7FA] leading-relaxed font-sans">
                      {cat.description}
                    </p>

                    <div className="space-y-2">
                      <span className="font-mono text-[10px] text-[#5A626E] uppercase tracking-wider block">
                        SUPPORTED BUSINESS MODELS
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.businessModels.map((bm, i) => (
                          <span
                            key={i}
                            className="font-mono text-xs bg-[#0A0D12] text-white border border-white/10 px-2.5 py-1 rounded-[2px]"
                          >
                            {bm}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Growth Needs & Capabilities */}
                  <div className="lg:col-span-7 bg-[#0A0D12] border border-white/10 p-5 rounded-[2px] space-y-4">
                    <div>
                      <span className="font-mono text-[10px] text-[#5A626E] uppercase tracking-wider block mb-2">
                        COMMON GROWTH NEEDS
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-[#8D949E]">
                        {cat.commonGrowthNeeds.map((need, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#0099FF] shrink-0" />
                            <span className="text-[#F5F7FA]">{need}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-3">
                      <span className="font-mono text-[10px] text-[#5A626E] uppercase tracking-wider block mb-2">
                        RELEVANT PLATFORMS & CHANNELS
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {cat.platforms.map((p, i) => (
                          <span
                            key={i}
                            className="font-mono text-[11px] text-[#8D949E] bg-[#050608] border border-white/10 px-2.5 py-1 rounded-[2px]"
                          >
                            {p.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action Row for Industry */}
                <div className="border-t border-white/10 pt-4 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                  <div className="flex items-center gap-2 text-[#5A626E]">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>AUTHENTIC DATA POLICY: NO SYNTHETIC CASE STUDIES</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={onStartProject}
                      className="text-[#0099FF] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      <span>EXPLORE {cat.title.toUpperCase()} GROWTH →</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 12 / HOW MAGNIAR ADAPTS MATRIX */}
      <section className="py-16 sm:py-20 border-b border-white/10 bg-[#050505]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 space-y-8">
          <div className="space-y-2">
            <span className="font-mono text-xs text-[#0099FF] tracking-widest uppercase block">
              SECTION 12 / ADAPTATION ARCHITECTURE
            </span>
            <h2 className="font-mono text-2xl sm:text-3xl font-bold text-white">
              How Capability Mix Shifts by Business Type
            </h2>
            <p className="text-sm text-[#8D949E] max-w-2xl font-sans">
              Business type does not dictate a single fixed service. Magniar shifts the balance of Performance, Commerce, Development, and Intelligence based on client unit economics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAPABILITY_PULL_MAP.map((item, idx) => (
              <div key={idx} className="bg-[#080A0D] border border-white/10 p-5 rounded-[2px] space-y-4 font-mono">
                <div className="border-b border-white/10 pb-3">
                  <span className="text-[10px] text-[#5A626E] block">CONFIG 0{idx + 1}</span>
                  <span className="text-base font-bold text-white">{item.business}</span>
                </div>

                <div className="space-y-3 text-xs">
                  {item.mix.map((m, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-white font-semibold">{m.pillar}</span>
                        <span className="text-[#0099FF] font-bold">{m.weight}</span>
                      </div>
                      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#0099FF]"
                          style={{ width: m.weight }}
                        />
                      </div>
                      <span className="text-[10px] text-[#8D949E] block truncate">{m.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 13 / RELEVANT WORK / FUTURE CASE STUDY CONNECTION ARCHITECTURE */}
      <section className="py-16 sm:py-20 border-b border-white/10 bg-[#080A0D]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 space-y-8">
          <div className="space-y-2 border-b border-white/10 pb-6">
            <span className="font-mono text-xs text-[#0099FF] tracking-widest uppercase block">
              SECTION 13 / CASE STUDY CONNECTION ARCHITECTURE
            </span>
            <h2 className="font-mono text-2xl sm:text-3xl font-bold text-white">
              Multi-Dimensional Case Study Schema
            </h2>
            <p className="text-sm text-[#8D949E] max-w-2xl font-sans">
              Our upcoming Case Study system allows clients to filter verified work across 8 dimensions: Industry, Business Model, Platform, Capability, Service, Budget Range, Geography, and Status.
            </p>
          </div>

          {/* Filter Architecture Preview */}
          <div className="bg-[#050608] border border-white/10 p-6 rounded-[2px] space-y-6 font-mono text-xs">
            <div className="flex items-center gap-2 text-[#0099FF] font-bold">
              <Sliders className="w-4 h-4 text-[#0099FF]" />
              <span>SCHEMA ARCHITECTURE PREVIEW (FUTURE RELATIONAL INDEX)</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-center">
              <div className="bg-[#0A0D12] border border-white/10 p-3 rounded-[2px]">
                <span className="text-[#5A626E] text-[10px] block">DIMENSION 01</span>
                <span className="text-white font-bold block mt-1">INDUSTRY</span>
              </div>
              <div className="bg-[#0A0D12] border border-white/10 p-3 rounded-[2px]">
                <span className="text-[#5A626E] text-[10px] block">DIMENSION 02</span>
                <span className="text-white font-bold block mt-1">BUSINESS MODEL</span>
              </div>
              <div className="bg-[#0A0D12] border border-white/10 p-3 rounded-[2px]">
                <span className="text-[#5A626E] text-[10px] block">DIMENSION 03</span>
                <span className="text-white font-bold block mt-1">PLATFORM</span>
              </div>
              <div className="bg-[#0A0D12] border border-white/10 p-3 rounded-[2px]">
                <span className="text-[#5A626E] text-[10px] block">DIMENSION 04</span>
                <span className="text-white font-bold block mt-1">CAPABILITY</span>
              </div>
              <div className="bg-[#0A0D12] border border-white/10 p-3 rounded-[2px]">
                <span className="text-[#5A626E] text-[10px] block">DIMENSION 05</span>
                <span className="text-white font-bold block mt-1">SERVICE</span>
              </div>
              <div className="bg-[#0A0D12] border border-white/10 p-3 rounded-[2px]">
                <span className="text-[#5A626E] text-[10px] block">DIMENSION 06</span>
                <span className="text-white font-bold block mt-1">BUDGET RANGE</span>
              </div>
              <div className="bg-[#0A0D12] border border-white/10 p-3 rounded-[2px]">
                <span className="text-[#5A626E] text-[10px] block">DIMENSION 07</span>
                <span className="text-white font-bold block mt-1">GEOGRAPHY</span>
              </div>
              <div className="bg-[#0A0D12] border border-white/10 p-3 rounded-[2px]">
                <span className="text-[#5A626E] text-[10px] block">DIMENSION 08</span>
                <span className="text-white font-bold block mt-1">ENGAGEMENT</span>
              </div>
            </div>

            {/* Notice regarding zero synthetic data */}
            <div className="bg-[#0A0D12] border border-white/10 p-4 rounded-[2px] flex items-start gap-3 text-[#8D949E] font-sans">
              <Info className="w-5 h-5 text-[#0099FF] shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-semibold font-mono text-xs block">
                  AUTHENTIC DATA STANDARDS: NO SYNTHETIC CASE STUDIES
                </span>
                <p className="text-xs mt-1">
                  Magniar strictly rejects fabricated metrics or synthetic client stories. Case studies will be dynamically populated as verified client engagements complete NDA clearance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 14 / CTA: IF YOU DON'T SEE YOUR BUSINESS HERE */}
      <section className="py-20 lg:py-28 bg-[#050505]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
          <div className="bg-[#0A0D12] border border-white/10 rounded-[2px] p-8 lg:p-16 space-y-8 text-center max-w-4xl mx-auto">
            <span className="font-mono text-xs text-[#0099FF] tracking-widest uppercase font-semibold block">
              SECTION 14 / INITIATE DISCOVERY
            </span>

            <h2 className="font-mono text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              IF YOU DON'T SEE YOUR <br />
              <span className="text-[#0099FF]">EXACT BUSINESS TYPE HERE</span>
            </h2>

            <p className="text-base sm:text-lg text-[#8D949E] font-sans max-w-2xl mx-auto">
              That does not mean we cannot help. We assemble custom growth engines around complex, hybrid, or emerging business models. Tell us what you're building.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <MagniarButton
                variant="primary"
                size="lg"
                onClick={onStartProject || (() => alert('Initiating Start a Project Intake...'))}
              >
                START A PROJECT →
              </MagniarButton>

              <MagniarButton
                variant="secondary"
                size="lg"
                onClick={onSeeHowWeWork}
              >
                SEE HOW WE WORK
              </MagniarButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
