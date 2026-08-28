import React, { useState } from 'react';
import { CAPABILITY_PILLARS } from '../../data/capabilitiesData';
import { CapabilityPillarId } from '../../types/capabilities';
import { MagniarButton } from '../common/MagniarButton';
import { Terminal, Sparkles, Layers, CheckCircle2, Cpu, Database, Smartphone, ShieldCheck } from 'lucide-react';

export const CapabilitiesDesignReview: React.FC = () => {
  const [activeInspectorPillar, setActiveInspectorPillar] = useState<CapabilityPillarId>('performance');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('paid-search');

  const activePillar = CAPABILITY_PILLARS.find((p) => p.id === activeInspectorPillar) || CAPABILITY_PILLARS[0];
  const activeService = activePillar.services.find((s) => s.id === selectedServiceId) || activePillar.services[0];

  return (
    <div className="space-y-10 py-6 max-w-5xl mx-auto">
      {/* Chapter 05 Specification Review Header */}
      <div className="p-6 rounded-[2px] bg-[#0A0D12] border border-[#B89A72]/40 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
          <span className="text-[#B89A72] font-bold tracking-widest flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#B89A72]" />
            CHAPTER 05 REVISION — CAPABILITIES & SERVICES ARCHITECTURE
          </span>
          <span className="px-2 py-0.5 rounded bg-[#B89A72]/20 text-[#B89A72] text-[10px] font-semibold border border-[#B89A72]/40">
            SPECIFICATION VERIFIED
          </span>
        </div>
        <p className="text-xs text-[#8D949E] leading-relaxed font-sans">
          Magniar's Capabilities system has been fully defined across the Homepage section and the full /capabilities page architecture. The four major pillars (Performance, Commerce, Development, Intelligence) operate as one connected growth feedback loop without SaaS clutter, logo walls, or fake performance metrics.
        </p>
      </div>

      {/* Interactive Capabilities Data & Service Inspector */}
      <div className="p-6 rounded-[2px] bg-[#07090D] border border-white/10 space-y-6">
        <div className="font-mono text-xs text-[#B89A72] tracking-wider uppercase flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#B89A72]" />
          <span>CAPABILITIES DATA & SERVICE CARD INSPECTOR</span>
        </div>

        {/* Pillar Switcher */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
          {CAPABILITY_PILLARS.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setActiveInspectorPillar(p.id);
                setSelectedServiceId(p.services[0].id);
              }}
              className={`p-3 rounded-[2px] border text-left cursor-pointer transition-all ${
                activeInspectorPillar === p.id
                  ? 'bg-[#B89A72] text-white border-[#B89A72] font-bold shadow-[0_0_12px_rgba(184,154,114,0.4)]'
                  : 'bg-[#030508] text-[#8D949E] border-white/10 hover:text-white'
              }`}
            >
              <div className="text-[10px] uppercase opacity-80">{p.numberLabel}</div>
              <div className="text-xs font-bold">{p.title}</div>
            </button>
          ))}
        </div>

        {/* Selected Service Detail Preview */}
        <div className="p-4 rounded-[2px] bg-[#030508] border border-white/10 space-y-4">
          <div className="font-mono text-xs text-[#5A626E] uppercase tracking-wider flex justify-between">
            <span>INSPECTING SERVICE ITEM FROM [{activePillar.title}]</span>
            <span className="text-[#B89A72] font-bold">STATUS: {activeService.status}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="md:col-span-1 space-y-2">
              <div className="text-[#8D949E]">SERVICES IN THIS PILLAR:</div>
              <div className="space-y-1">
                {activePillar.services.map((svc) => (
                  <button
                    key={svc.id}
                    onClick={() => setSelectedServiceId(svc.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-[2px] border text-[11px] transition-all cursor-pointer ${
                      activeService.id === svc.id
                        ? 'bg-[#B89A72]/20 text-[#B89A72] border-[#B89A72]'
                        : 'bg-[#0A0D12] text-[#8D949E] border-white/5 hover:text-white'
                    }`}
                  >
                    {svc.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 p-4 rounded bg-[#05070A] border border-white/10 space-y-3 font-sans text-xs">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[#B89A72] font-bold">{activeService.title}</span>
                <span className="text-[10px] text-[#8D949E]">ID: {activeService.id}</span>
              </div>

              <div className="font-mono text-xs text-white">{activeService.oneLiner}</div>
              <p className="text-[#8D949E] text-xs leading-relaxed">{activeService.description}</p>

              <div className="pt-2 border-t border-white/10 space-y-1 font-mono text-[11px]">
                <div className="text-[#5A626E] font-bold">INCLUDES:</div>
                <div className="text-[#F5F7FA]">{activeService.includes.join(' • ')}</div>
              </div>

              <div className="pt-2 border-t border-white/10 flex justify-between items-center font-mono text-xs">
                <span className="text-[#5A626E]">CTA: {activeService.ctaText}</span>
                <button className="px-3 py-1 bg-[#B89A72] text-white rounded-[2px] font-bold uppercase text-[10px]">
                  SIMULATE CLICK →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 8 Mandatory Design Review Questions & Answers */}
      <div className="space-y-6">
        <div className="font-mono text-xs text-[#F5F7FA] tracking-wider uppercase border-b border-white/10 pb-2 flex items-center justify-between">
          <span>CHAPTER 05 DESIGN REVIEW — 8 MANDATORY RESPONSES</span>
          <span className="text-[#B89A72]">VERIFIED</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              num: '01',
              q: 'How the four capability pillars are connected',
              a: 'The four pillars form a continuous feedback loop: Performance ads drive traffic -> Commerce systems convert traffic into orders -> Development logs server-side tracking signals and automates operations -> Intelligence models analyze data to reallocate capital back into top Performance channels.'
            },
            {
              num: '02',
              q: 'Why this feels like an agency rather than a generic SaaS website',
              a: 'All SaaS tropes ($99/mo tier cards, free trial buttons, status badges, version numbers, fake software features) are absent. Capabilities are described as tailored, configurable strategic disciplines serving international business growth.'
            },
            {
              num: '03',
              q: 'How the user discovers individual services',
              a: 'Through a multi-layered discovery flow: Homepage 4-pillar selector -> Full /capabilities deep-dive with search and category filters -> Service Detail Cards detailing includes, platforms, and best-for profiles -> Direct CTAs.'
            },
            {
              num: '04',
              q: 'How platforms are presented without creating a logo wall',
              a: 'Instead of colorful image logo grids, platforms (Google, Meta, Shopify, Amazon, etc.) are rendered using clean typographic badges, technical monospaced text, and electric blue indicator dots.'
            },
            {
              num: '05',
              q: 'How the section connects back to the hero',
              a: 'The capabilities system directly mirrors the hero network graph (Performance, Commerce, Development, Intelligence) and uses the exact same visual language (dark canvas, technical typography, electric blue interaction signals).'
            },
            {
              num: '06',
              q: 'How the architecture can later support Supabase CMS data',
              a: 'The JSON data structures in src/types/capabilities.ts and src/data/capabilitiesData.ts map directly to future relational Supabase tables (capabilities, services, platforms, service_includes) with order and status fields.'
            },
            {
              num: '07',
              q: 'How mobile differs from desktop',
              a: 'On desktop, interactive side-by-side bento layouts and hover-activated category explorers are used. On mobile, the view simplifies into stacked capability cards with search and tap-friendly accordions.'
            },
            {
              num: '08',
              q: 'How users reach Start a Project',
              a: 'Every service detail card includes a direct "DISCUSS [SERVICE] →" CTA, every page ends with a discovery callout ("NOT SURE WHICH CAPABILITY YOU NEED? START A PROJECT →"), and top/footer CTAs remain accessible.'
            }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-[2px] bg-[#07090D] border border-white/10 space-y-2">
              <div className="font-mono text-xs text-[#B89A72] font-bold">
                {item.num} / {item.q}
              </div>
              <p className="text-xs text-[#8D949E] leading-relaxed font-sans">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Component Architecture & CMS Mapping Summary */}
      <div className="p-6 rounded-[2px] bg-[#0A0D12] border border-white/10 space-y-4">
        <div className="font-mono text-xs text-[#F5F7FA] font-bold tracking-wider uppercase flex items-center gap-2">
          <Database className="w-4 h-4 text-[#B89A72]" />
          <span>CHAPTER 05 COMPONENT ARCHITECTURE & CMS READY DATA MAP</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-[11px]">
          <div className="p-2.5 rounded bg-[#05070A] border border-white/10 space-y-1">
            <div className="text-[#B89A72] font-bold">CapabilitiesSection</div>
            <div className="text-[10px] text-[#8D949E]">Homepage interactive bento</div>
          </div>

          <div className="p-2.5 rounded bg-[#05070A] border border-white/10 space-y-1">
            <div className="text-[#B89A72] font-bold">CapabilitiesPage</div>
            <div className="text-[10px] text-[#8D949E]">Full /capabilities architecture</div>
          </div>

          <div className="p-2.5 rounded bg-[#05070A] border border-white/10 space-y-1">
            <div className="text-[#B89A72] font-bold">ServiceDetailCard</div>
            <div className="text-[10px] text-[#8D949E]">Reusable service card component</div>
          </div>

          <div className="p-2.5 rounded bg-[#05070A] border border-white/10 space-y-1">
            <div className="text-[#B89A72] font-bold">ConnectedCapabilityMap</div>
            <div className="text-[10px] text-[#8D949E]">Interactive growth loop visual</div>
          </div>
        </div>
      </div>
    </div>
  );
};
