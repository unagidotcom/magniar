import React, { useState } from 'react';
import { ENGAGEMENT_MODELS } from '../../data/processData';
import { EngagementModelItem } from '../../types/process';
import { Check, Shield, Layers, HelpCircle, ArrowRight } from 'lucide-react';

interface EngagementModelProps {
  onStartProject?: () => void;
}

export const EngagementModel: React.FC<EngagementModelProps> = ({ onStartProject }) => {
  const [selectedModel, setSelectedModel] = useState<string>('growth-partnership');

  return (
    <div className="space-y-8">
      {/* SECTION TITLE HEADER */}
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2 font-mono text-xs text-[#0099FF] font-semibold tracking-widest uppercase">
          <Layers className="w-3.5 h-3.5" />
          <span>FLEXIBLE ENGAGEMENT ARCHITECTURE</span>
        </div>
        <h2 className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight">
          ENGAGEMENT MODELS MATCHED TO COMMERCIAL STAGE
        </h2>
        <p className="text-sm sm:text-base text-[#8D949E] leading-relaxed">
          We do not force clients into rigid one-size-fits-all packages. Engagements are assembled around business maturity, immediate bottleneck scope, and commercial objectives.
        </p>
      </div>

      {/* MODEL SELECTOR CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ENGAGEMENT_MODELS.map((model) => {
          const isSelected = selectedModel === model.id;

          return (
            <div
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              className={`
                p-5 rounded-[2px] border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 relative group
                ${isSelected
                  ? 'bg-[#0A0D12] border-[#0099FF] shadow-[0_0_25px_rgba(0,153,255,0.2)]'
                  : 'bg-[#050505] border-white/10 hover:border-white/30'
                }
              `}
            >
              {/* TOP SIGNAL BADGE */}
              {isSelected && (
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-0.5 bg-[#0099FF]/10 border border-[#0099FF]/40 rounded-[2px] font-mono text-[9px] text-[#0099FF] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0099FF] animate-pulse" />
                  <span>ACTIVE VIEW</span>
                </div>
              )}

              <div className="space-y-2">
                <div className="font-mono text-[10px] text-[#0099FF] font-bold tracking-widest uppercase">
                  {model.subtitle}
                </div>
                <h3 className="font-mono text-base font-bold text-white tracking-wide">
                  {model.title}
                </h3>
                <p className="text-xs text-[#8D949E] leading-relaxed">
                  {model.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3 font-mono text-[11px]">
                <div>
                  <span className="text-[#8D949E] block text-[9px] uppercase tracking-wider">BEST SUITED FOR:</span>
                  <span className="text-[#F5F7FA] font-medium">{model.bestFor}</span>
                </div>

                <div>
                  <span className="text-[#8D949E] block text-[9px] uppercase tracking-wider">COMMERCIAL STRUCTURE:</span>
                  <span className="text-[#0099FF] font-semibold">{model.structure}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* SELECTED MODEL DELIVERABLES DEEP DIVE */}
      {(() => {
        const activeItem = ENGAGEMENT_MODELS.find((m) => m.id === selectedModel) || ENGAGEMENT_MODELS[0];
        return (
          <div className="bg-[#0A0D12] border border-white/10 rounded-[2px] p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-3">
              <div>
                <span className="font-mono text-xs text-[#0099FF] font-bold tracking-widest uppercase block">
                  DELIVERABLE SPECIFICATION
                </span>
                <span className="font-mono text-lg font-bold text-white">
                  {activeItem.title} — TYPICAL SCOPE
                </span>
              </div>

              {onStartProject && (
                <button
                  onClick={onStartProject}
                  className="px-4 py-2 bg-[#0099FF] text-white font-mono text-xs font-bold rounded-[2px] hover:bg-[#0088EE] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>DISCUSS {activeItem.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {activeItem.typicalDeliverables.map((deliv, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#F5F7FA] p-2.5 bg-[#050505] border border-white/5 rounded-[2px]">
                  <Check className="w-4 h-4 text-[#0099FF] shrink-0 mt-0.5" />
                  <span>{deliv}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })()}
    </div>
  );
};
