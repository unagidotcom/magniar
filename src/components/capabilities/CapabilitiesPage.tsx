import React, { useState } from 'react';
import { CAPABILITY_PILLARS } from '../../data/capabilitiesData';
import { CapabilityPillarId } from '../../types/capabilities';
import { TechnicalLabel } from '../common/TechnicalLabel';
import { MagniarButton } from '../common/MagniarButton';
import { ServiceDetailCard } from './ServiceDetailCard';
import { ConnectedCapabilityMap } from './ConnectedCapabilityMap';
import { Sparkles, ArrowRight, Layers, HelpCircle, Check, Search, Filter } from 'lucide-react';

interface CapabilitiesPageProps {
  onStartProject?: () => void;
  onSeeHowWeWork?: () => void;
  onDiscussService?: (serviceTitle: string) => void;
}

export const CapabilitiesPage: React.FC<CapabilitiesPageProps> = ({
  onStartProject,
  onSeeHowWeWork,
  onDiscussService,
}) => {
  const [activeTab, setActiveTab] = useState<CapabilityPillarId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const performancePillar = CAPABILITY_PILLARS.find((p) => p.id === 'performance')!;
  const commercePillar = CAPABILITY_PILLARS.find((p) => p.id === 'commerce')!;
  const devPillar = CAPABILITY_PILLARS.find((p) => p.id === 'development')!;
  const intelligencePillar = CAPABILITY_PILLARS.find((p) => p.id === 'intelligence')!;

  return (
    <div className="bg-[#050505] text-[#F5F7FA] font-sans min-h-screen pb-20 space-y-16">
      
      {/* SECTION 01 — HERO HEADER */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-12 border-b border-white/10 overflow-hidden bg-[#07090D]">
        {/* Background Architectural Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-20" />

        <div className="relative z-10 max-w-[1440px] mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <TechnicalLabel text="SYSTEM SPECIFICATION / CAPABILITIES" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89A72]" />
            <span className="font-mono text-[10px] text-[#5A626E] tracking-widest uppercase">
              MAGNIAR AGENCY CORE
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05] max-w-5xl">
            GROWTH DOESN'T HAPPEN <br />
            <span className="text-[#B89A72]">IN ONE CHANNEL.</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#8D949E] font-light max-w-3xl leading-relaxed">
            We connect performance marketing, commerce, development and intelligence into systems designed around your business.
          </p>

          {/* Core Pillar Quick Stats Bar */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs border-t border-white/10">
            <div className="p-3 bg-[#030508] border border-white/10 rounded-[2px] space-y-1">
              <div className="text-[#B89A72] font-bold">01 / PERFORMANCE</div>
              <div className="text-[10px] text-[#8D949E]">Paid Acquisition & Demand</div>
            </div>
            <div className="p-3 bg-[#030508] border border-white/10 rounded-[2px] space-y-1">
              <div className="text-[#B89A72] font-bold">02 / COMMERCE</div>
              <div className="text-[10px] text-[#8D949E]">Storefronts & Marketplaces</div>
            </div>
            <div className="p-3 bg-[#030508] border border-white/10 rounded-[2px] space-y-1">
              <div className="text-[#B89A72] font-bold">03 / DEVELOPMENT</div>
              <div className="text-[10px] text-[#8D949E]">Web Systems & Tracking</div>
            </div>
            <div className="p-3 bg-[#030508] border border-white/10 rounded-[2px] space-y-1">
              <div className="text-[#B89A72] font-bold">04 / INTELLIGENCE</div>
              <div className="text-[10px] text-[#8D949E]">AI & Unified Analytics</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02 — FOUR CAPABILITY OVERVIEW FILTER BAR */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-[2px] bg-[#0A0D12] border border-white/10">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="text-[#8D949E] uppercase tracking-wider mr-2 flex items-center gap-1.5 font-semibold">
              <Filter className="w-3.5 h-3.5 text-[#B89A72]" />
              <span>FILTER DISCIPLINE:</span>
            </span>

            {[
              { id: 'all', label: 'ALL CAPABILITIES' },
              { id: 'performance', label: '01 / PERFORMANCE' },
              { id: 'commerce', label: '02 / COMMERCE' },
              { id: 'development', label: '03 / DEVELOPMENT' },
              { id: 'intelligence', label: '04 / INTELLIGENCE' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as CapabilityPillarId | 'all')}
                className={`px-3 py-1.5 rounded-[2px] border transition-all cursor-pointer text-[11px] font-semibold tracking-wider ${
                  activeTab === tab.id
                    ? 'bg-[#B89A72] text-white border-[#B89A72] shadow-[0_0_12px_rgba(184,154,114,0.4)]'
                    : 'bg-[#05070A] text-[#8D949E] border-white/10 hover:text-white hover:border-white/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Quick Service Search */}
          <div className="relative flex items-center min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-[#8D949E] absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter services or platforms..."
              className="w-full bg-[#030508] border border-white/10 focus:border-[#B89A72] rounded-[2px] pl-8 pr-3 py-1.5 text-xs text-white placeholder-[#5A626E] font-mono outline-none"
            />
          </div>
        </div>
      </section>

      {/* SECTION 03 — PERFORMANCE DEEP DIVE */}
      {(activeTab === 'all' || activeTab === 'performance') && (
        <section id="capabilities-performance" className="px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto space-y-8">
          <div className="p-6 rounded-[2px] bg-[#0A0D12] border-l-4 border-l-[#B89A72] border-white/10 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
              <span className="text-[#B89A72] font-bold tracking-widest uppercase">
                {performancePillar.numberLabel}
              </span>
              <span className="text-[#8D949E]">ACQUISITION & DEMAND GENERATION</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              {performancePillar.statement}
            </h2>
            <p className="text-xs sm:text-sm text-[#8D949E] font-sans font-light leading-relaxed max-w-3xl">
              {performancePillar.description}
            </p>

            {/* Platforms Bar */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2 font-mono text-xs text-[#8D949E]">
              <span className="text-[#5A626E] font-bold">PLATFORMS:</span>
              {performancePillar.platforms.map((p) => (
                <span key={p} className="px-2 py-0.5 rounded bg-[#030508] border border-white/10 text-white">
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {performancePillar.services
              .filter((s) => !searchQuery || s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((service) => (
                <ServiceDetailCard
                  key={service.id}
                  service={service}
                  onDiscussService={onDiscussService}
                />
              ))}
          </div>
        </section>
      )}

      {/* SECTION 04 — COMMERCE DEEP DIVE */}
      {(activeTab === 'all' || activeTab === 'commerce') && (
        <section id="capabilities-commerce" className="px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto space-y-8">
          <div className="p-6 rounded-[2px] bg-[#0A0D12] border-l-4 border-l-[#B89A72] border-white/10 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
              <span className="text-[#B89A72] font-bold tracking-widest uppercase">
                {commercePillar.numberLabel}
              </span>
              <span className="text-[#8D949E]">DIGITAL STOREFRONTS & MARKETPLACES</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              {commercePillar.statement}
            </h2>
            <p className="text-xs sm:text-sm text-[#8D949E] font-sans font-light leading-relaxed max-w-3xl">
              {commercePillar.description}
            </p>

            {/* Structured Platform Display (No Logo Wall — Clean Typographic Badges) */}
            <div className="pt-3 border-t border-white/10 space-y-2">
              <div className="font-mono text-[10px] text-[#5A626E] font-bold uppercase tracking-wider">
                SUPPORTED E-COMMERCE ENGINES & MARKETPLACES:
              </div>
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                {commercePillar.platforms.map((p) => (
                  <span key={p} className="px-3 py-1 rounded-[2px] bg-[#030508] border border-white/10 text-[#F5F7FA] font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B89A72]" />
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commercePillar.services
              .filter((s) => !searchQuery || s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((service) => (
                <ServiceDetailCard
                  key={service.id}
                  service={service}
                  onDiscussService={onDiscussService}
                />
              ))}
          </div>
        </section>
      )}

      {/* SECTION 05 — DEVELOPMENT DEEP DIVE */}
      {(activeTab === 'all' || activeTab === 'development') && (
        <section id="capabilities-development" className="px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto space-y-8">
          <div className="p-6 rounded-[2px] bg-[#0A0D12] border-l-4 border-l-[#B89A72] border-white/10 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
              <span className="text-[#B89A72] font-bold tracking-widest uppercase">
                {devPillar.numberLabel}
              </span>
              <span className="text-[#8D949E]">WEB SYSTEMS, TRACKING & AUTOMATION</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              {devPillar.statement}
            </h2>
            <p className="text-xs sm:text-sm text-[#8D949E] font-sans font-light leading-relaxed max-w-3xl">
              {devPillar.description}
            </p>

            {/* Development Core Positioning Callout */}
            <div className="p-4 rounded-[2px] bg-[#030508] border border-[#B89A72]/40 font-mono text-xs text-[#F5F7FA] space-y-1">
              <span className="text-[#B89A72] font-bold uppercase tracking-wider">DEVELOPMENT PHILOSOPHY: </span>
              <span className="text-[#8D949E] font-sans">
                Magniar does not build technology simply because it can. Technology should solve a business problem and directly support marketing efficiency and conversion velocity.
              </span>
            </div>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {devPillar.services
              .filter((s) => !searchQuery || s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((service) => (
                <ServiceDetailCard
                  key={service.id}
                  service={service}
                  onDiscussService={onDiscussService}
                />
              ))}
          </div>
        </section>
      )}

      {/* SECTION 06 — INTELLIGENCE DEEP DIVE */}
      {(activeTab === 'all' || activeTab === 'intelligence') && (
        <section id="capabilities-intelligence" className="px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto space-y-8">
          <div className="p-6 rounded-[2px] bg-[#0A0D12] border-l-4 border-l-[#B89A72] border-white/10 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
              <span className="text-[#B89A72] font-bold tracking-widest uppercase">
                {intelligencePillar.numberLabel}
              </span>
              <span className="text-[#8D949E]">AI, DATA & STRATEGIC ADVISORY</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              {intelligencePillar.statement}
            </h2>
            <p className="text-xs sm:text-sm text-[#8D949E] font-sans font-light leading-relaxed max-w-3xl">
              {intelligencePillar.description}
            </p>

            {/* AI Core Positioning Statement */}
            <div className="p-4 rounded-[2px] bg-[#030508] border border-[#B89A72]/40 font-mono text-xs text-[#F5F7FA] space-y-1">
              <span className="text-[#B89A72] font-bold uppercase tracking-wider">AI POSITIONING: </span>
              <span className="text-[#8D949E] font-sans">
                Magniar is not an AI SaaS company selling subscriptions. AI is an integrated capability within our broader growth system, applied to streamline operational workflows and decision-making.
              </span>
            </div>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {intelligencePillar.services
              .filter((s) => !searchQuery || s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((service) => (
                <ServiceDetailCard
                  key={service.id}
                  service={service}
                  onDiscussService={onDiscussService}
                />
              ))}
          </div>
        </section>
      )}

      {/* SECTION 07 & 08 — CONNECTED CAPABILITY MODEL & BUSINESS JOURNEY */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto">
        <ConnectedCapabilityMap
          activePillar={activeTab === 'all' ? 'performance' : activeTab}
          onSelectPillar={(pillarId) => setActiveTab(pillarId)}
        />
      </section>

      {/* SECTION 10 — CAPABILITIES DISCOVERY CTA */}
      <section className="px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto">
        <div className="p-8 sm:p-12 rounded-[2px] bg-[#0A0D12] border border-[#B89A72]/50 space-y-6 relative overflow-hidden text-center sm:text-left">
          {/* Subtle Ambient Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#B89A72]/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex items-center justify-center sm:justify-start gap-2 font-mono text-xs text-[#B89A72]">
              <HelpCircle className="w-4 h-4 text-[#B89A72]" />
              <span className="font-bold tracking-widest uppercase">DISCOVERY & SCOPE ASSESSMENTS</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              NOT SURE WHICH CAPABILITY YOU NEED?
            </h2>

            <p className="text-sm sm:text-base text-[#8D949E] font-light leading-relaxed">
              That's exactly what the discovery process is for. You don't need to know which channel or service to buy before contacting Magniar. We audit your growth bottlenecks and configure the exact system required.
            </p>
          </div>

          <div className="relative z-10 pt-4 flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <a href="#start" onClick={onStartProject}>
              <MagniarButton variant="primary" size="lg">
                START A PROJECT →
              </MagniarButton>
            </a>

            <a
              href="#process"
              onClick={onSeeHowWeWork}
              className="px-6 py-3 rounded-[2px] bg-[#030508] hover:bg-white/10 text-[#F5F7FA] border border-white/10 font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer flex items-center gap-2"
            >
              <span>SEE HOW WE WORK</span>
              <ArrowRight className="w-4 h-4 text-[#B89A72]" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
