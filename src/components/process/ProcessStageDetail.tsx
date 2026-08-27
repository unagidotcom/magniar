import React from 'react';
import { ProcessStage } from '../../types/process';
import { Check, ShieldCheck, UserCheck, Layers, ArrowUpRight, HelpCircle, PackageCheck } from 'lucide-react';

interface ProcessStageDetailProps {
  stage: ProcessStage;
  onExploreCapabilities?: () => void;
}

export const ProcessStageDetail: React.FC<ProcessStageDetailProps> = ({
  stage,
  onExploreCapabilities,
}) => {
  return (
    <div className="bg-[#0A0D12] border border-white/10 rounded-[2px] p-5 sm:p-8 space-y-8 relative overflow-hidden">
      {/* BACKGROUND ACCENT LIGHT */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#B89A72]/5 rounded-full blur-3xl pointer-events-none" />

      {/* TOP HEADER BLOCK */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-white/10 pb-6 relative z-10">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#B89A72] tracking-wider">
              {stage.number}
            </span>
            <span className="text-white/20 text-xl">/</span>
            <h3 className="font-mono text-xl sm:text-2xl font-bold text-white tracking-wide">
              {stage.name}
            </h3>
            <span className="px-2.5 py-0.5 rounded-[2px] bg-[#B89A72]/10 border border-[#B89A72]/30 font-mono text-[10px] text-[#B89A72] font-semibold uppercase tracking-wider">
              STAGE {stage.number} OF 08
            </span>
          </div>

          <div className="font-mono text-xs sm:text-sm text-[#B89A72] font-semibold tracking-wider uppercase">
            {stage.tagline}
          </div>

          <p className="text-sm sm:text-base text-[#F5F7FA] font-sans leading-relaxed pt-1">
            {stage.fullDescription}
          </p>
        </div>

        {/* OUTPUT DELIVERABLE CARD */}
        <div className="w-full md:w-72 bg-[#050505] border border-[#B89A72]/40 rounded-[2px] p-4 space-y-2 shrink-0">
          <div className="flex items-center gap-2 text-[#B89A72] font-mono text-[10px] font-bold tracking-widest uppercase">
            <PackageCheck className="w-4 h-4 text-[#B89A72]" />
            <span>STAGE OUTPUT DELIVERABLE</span>
          </div>
          <div className="font-mono text-xs font-bold text-white tracking-wide border-t border-white/10 pt-2">
            {stage.output}
          </div>
          <div className="text-[11px] text-[#8D949E] font-mono">
            Tangible, client-accessible output generated during Stage {stage.number}.
          </div>
        </div>
      </div>

      {/* 2-COLUMN MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        {/* LEFT COLUMN: WHAT IT INCLUDES & QUESTIONS ANSWERED */}
        <div className="space-y-6">
          {/* WHAT IT INCLUDES */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold text-[#F5F7FA] tracking-widest uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#B89A72] rounded-full" />
              <span>CORE ACTIVITIES & INCLUSIONS</span>
            </h4>
            <div className="bg-[#050505] border border-white/10 rounded-[2px] p-4 space-y-2.5">
              {stage.includes.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#F5F7FA]">
                  <Check className="w-4 h-4 text-[#B89A72] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* QUESTIONS ANSWERED */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold text-[#F5F7FA] tracking-widest uppercase flex items-center gap-2">
              <HelpCircle className="w-3.5 h-3.5 text-[#B89A72]" />
              <span>CORE COMMERCIAL QUESTIONS ANSWERED</span>
            </h4>
            <div className="bg-[#050505] border border-white/10 rounded-[2px] p-4 space-y-2.5">
              {stage.questionsAnswered.map((q, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#8D949E]">
                  <span className="font-mono text-[#B89A72] font-bold">Q{idx + 1}.</span>
                  <span className="text-[#F5F7FA]">{q}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: RESPONSIBILITY MATRIX (MAGNIAR VS CLIENT) */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold text-[#F5F7FA] tracking-widest uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#B89A72] rounded-full" />
              <span>COLLABORATIVE RESPONSIBILITY MODEL</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* MAGNIAR ROLE */}
              <div className="bg-[#050505] border border-[#B89A72]/30 rounded-[2px] p-4 space-y-3">
                <div className="flex items-center gap-2 text-[#B89A72] font-mono text-[11px] font-bold tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>MAGNIAR EXECUTION</span>
                </div>
                <ul className="space-y-2 text-xs text-[#8D949E]">
                  {stage.magniarRole.map((role, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#B89A72] font-mono">▸</span>
                      <span className="text-[#F5F7FA]">{role}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CLIENT ROLE */}
              <div className="bg-[#050505] border border-white/10 rounded-[2px] p-4 space-y-3">
                <div className="flex items-center gap-2 text-white font-mono text-[11px] font-bold tracking-wider">
                  <UserCheck className="w-4 h-4 text-[#8D949E]" />
                  <span>CLIENT PARTICIPATION</span>
                </div>
                <ul className="space-y-2 text-xs text-[#8D949E]">
                  {stage.clientRole.map((role, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-white/40 font-mono">▸</span>
                      <span className="text-[#F5F7FA]">{role}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* CAPABILITIES ATTACHMENT MAP */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-mono text-xs font-bold text-[#F5F7FA] tracking-widest uppercase flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#B89A72]" />
                <span>CONNECTED CAPABILITIES AT THIS STAGE</span>
              </h4>
              {onExploreCapabilities && (
                <button
                  onClick={onExploreCapabilities}
                  className="font-mono text-[10px] text-[#B89A72] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>ALL CAPABILITIES</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {stage.capabilityLinks.map((cap) => (
                <div
                  key={cap.capabilityId}
                  className="p-3 bg-[#050505] border border-white/10 rounded-[2px] space-y-1 hover:border-[#B89A72]/40 transition-colors"
                >
                  <div className="font-mono text-[10px] font-bold text-[#B89A72] tracking-wider uppercase">
                    {cap.capabilityName}
                  </div>
                  <div className="text-[11px] text-[#8D949E] line-clamp-2">
                    {cap.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
