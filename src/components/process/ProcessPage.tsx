import React, { useState } from 'react';
import { ProcessStageId } from '../../types/process';
import { PROCESS_STAGES } from '../../data/processData';
import { GrowthLoopCanvas } from './GrowthLoopCanvas';
import { ProcessStageDetail } from './ProcessStageDetail';
import { EngagementModel } from './EngagementModel';
import { ProcessExample } from './ProcessExample';
import { MagniarButton } from '../common/MagniarButton';
import { RefreshCw, ArrowRight, Layers, ShieldCheck, HelpCircle, CheckCircle2 } from 'lucide-react';

interface ProcessPageProps {
  onStartProject?: () => void;
  onExploreCapabilities?: () => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({
  onStartProject,
  onExploreCapabilities,
}) => {
  const [activeStageId, setActiveStageId] = useState<ProcessStageId>('discover');

  const activeStage = PROCESS_STAGES.find((s) => s.id === activeStageId) || PROCESS_STAGES[0];

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F7FA] font-sans antialiased space-y-16 sm:space-y-24 py-12 sm:py-20">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-12 space-y-16">
        {/* 01 / HERO HEADER */}
        <section className="space-y-6 border-b border-white/10 pb-12 relative">
          <div className="flex items-center gap-3 font-mono text-xs text-[#0099FF] font-semibold tracking-[0.2em] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#0099FF] shadow-[0_0_10px_#0099FF] animate-pulse" />
            <span>OPERATING METHODOLOGY</span>
          </div>

          <h1 className="font-mono text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.08] max-w-4xl">
            BUILDING GROWTH IS AN ITERATIVE SYSTEM.
          </h1>

          <p className="text-base sm:text-lg text-[#8D949E] font-sans max-w-3xl leading-relaxed">
            We start by understanding the business, identify where growth is constrained, build the right systems, launch with discipline, and continuously optimize around what the data tells us.
          </p>

          {/* QUICK HERO SUMMARY METRICS */}
          <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl font-mono text-xs">
            <div className="p-3.5 bg-[#0A0D12] border border-white/10 rounded-[2px] space-y-1">
              <span className="text-[#0099FF] font-bold block">8 STAGES</span>
              <span className="text-[#8D949E] text-[11px]">Iterative Execution Loop</span>
            </div>
            <div className="p-3.5 bg-[#0A0D12] border border-white/10 rounded-[2px] space-y-1">
              <span className="text-[#0099FF] font-bold block">0% GUESSWORK</span>
              <span className="text-[#8D949E] text-[11px]">Diagnostic & Data Driven</span>
            </div>
            <div className="p-3.5 bg-[#0A0D12] border border-white/10 rounded-[2px] space-y-1">
              <span className="text-[#0099FF] font-bold block">COLLABORATIVE</span>
              <span className="text-[#8D949E] text-[11px]">Clear Client + Magniar Roles</span>
            </div>
            <div className="p-3.5 bg-[#0A0D12] border border-white/10 rounded-[2px] space-y-1">
              <span className="text-[#0099FF] font-bold block">CONTINUOUS</span>
              <span className="text-[#8D949E] text-[11px]">Scale Feeds to Discover</span>
            </div>
          </div>
        </section>

        {/* 02 / INTERACTIVE GROWTH LOOP CANVAS */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-xs text-[#0099FF] font-bold tracking-widest uppercase block">
                02 / THE GROWTH LOOP ENGINE
              </span>
              <h2 className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight">
                SELECT A STAGE TO INSPECT METHODOLOGY
              </h2>
            </div>
            <div className="font-mono text-xs text-[#8D949E]">
              STAGE {activeStage.number} OF 08 ACTIVE
            </div>
          </div>

          <GrowthLoopCanvas
            activeStageId={activeStageId}
            onSelectStage={setActiveStageId}
          />
        </section>

        {/* 03 / STAGE DEEP DIVE SPECIFICATION */}
        <section className="space-y-6">
          <ProcessStageDetail
            stage={activeStage}
            onExploreCapabilities={onExploreCapabilities}
          />
        </section>

        {/* 04 / PROCESS + CAPABILITIES CONNECTION MAP */}
        <section className="bg-[#0A0D12] border border-white/10 rounded-[2px] p-6 sm:p-8 space-y-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 font-mono text-xs text-[#0099FF] font-semibold tracking-widest uppercase">
              <Layers className="w-3.5 h-3.5" />
              <span>CAPABILITIES INTEGRATION MATRIX</span>
            </div>
            <h3 className="font-mono text-xl sm:text-2xl font-bold text-white tracking-tight">
              HOW CAPABILITIES ENTER THE GROWTH PROCESS
            </h3>
            <p className="text-xs sm:text-sm text-[#8D949E]">
              Magniar capabilities are not sold as static packages. Based on Stage 02 DIAGNOSE, specific capabilities enter the pipeline precisely where bottlenecks are identified.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                id: 'performance',
                title: 'PERFORMANCE MARKETING',
                stageEntry: 'Stage 02 Diagnose → Stage 04 Build',
                role: 'Ad account auditing, creative testing matrices, media buying and budget scaling across Meta, Google & TikTok.',
              },
              {
                id: 'commerce',
                title: 'DIGITAL COMMERCE',
                stageEntry: 'Stage 02 Diagnose → Stage 04 Build',
                role: 'Custom Shopify/WooCommerce storefront builds, checkout friction removal, and AOV/bundle optimization.',
              },
              {
                id: 'technology',
                title: 'GROWTH INFRASTRUCTURE',
                stageEntry: 'Stage 01 Discover → Stage 04 Build',
                role: 'Server-Side GTM, custom React/Next.js landing pages, API integrations, and analytics infrastructure.',
              },
              {
                id: 'intelligence',
                title: 'AI & DATA STRATEGY',
                stageEntry: 'Stage 03 Strategize → Stage 07 Optimize',
                role: 'Predictive LTV models, automated bid tuning, AI creative workflows, and real-time attribution data.',
              },
            ].map((cap) => (
              <div key={cap.id} className="p-4 bg-[#050505] border border-white/10 rounded-[2px] space-y-3">
                <div className="font-mono text-xs font-bold text-[#0099FF] tracking-wider uppercase">
                  {cap.title}
                </div>
                <div className="font-mono text-[10px] text-[#8D949E] px-2 py-0.5 bg-white/5 border border-white/10 rounded-[2px] inline-block">
                  {cap.stageEntry}
                </div>
                <p className="text-xs text-[#F5F7FA] leading-relaxed">
                  {cap.role}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 05 / ENGAGEMENT MODELS */}
        <section>
          <EngagementModel onStartProject={onStartProject} />
        </section>

        {/* 06 / CASE ILLUSTRATION EXAMPLE */}
        <section>
          <ProcessExample />
        </section>

        {/* 07 / PROCESS CTA SECTION */}
        <section className="bg-gradient-to-r from-[#0A0D12] via-[#080B10] to-[#0A0D12] border border-[#0099FF]/40 rounded-[2px] p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(#0099FF_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

          <div className="space-y-4 max-w-3xl mx-auto relative z-10">
            <div className="font-mono text-xs text-[#0099FF] font-bold tracking-[0.2em] uppercase">
              READY TO BUILD WHAT GROWS?
            </div>
            <h2 className="font-mono text-2xl sm:text-4xl font-bold text-white tracking-tight">
              TELL US WHERE YOU ARE, WHERE YOU WANT TO GO, AND WHAT IS GETTING IN THE WAY.
            </h2>
            <p className="text-sm sm:text-base text-[#8D949E] font-sans">
              Initiate a diagnostic conversation with Magniar. No generic sales pitches—pure business understanding and bottleneck isolation.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 relative z-10 pt-2">
            <button
              onClick={onStartProject}
              className="px-6 py-3.5 bg-[#0099FF] hover:bg-[#0088EE] text-white font-mono text-xs font-bold rounded-[2px] transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(0,153,255,0.35)]"
            >
              <span>START A PROJECT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreCapabilities}
              className="px-6 py-3.5 bg-[#050505] hover:bg-[#10141D] text-[#8D949E] hover:text-white font-mono text-xs font-bold rounded-[2px] border border-white/10 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>EXPLORE CAPABILITIES</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
