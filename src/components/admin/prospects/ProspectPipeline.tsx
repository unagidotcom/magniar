import React from 'react';
import { ProspectStage } from '../../../types/prospects';

interface ProspectPipelineProps {
  stageCounts: Record<ProspectStage, number>;
  activeStageFilter: string;
  onSelectStage: (stage: string) => void;
}

export const ProspectPipeline: React.FC<ProspectPipelineProps> = ({
  stageCounts,
  activeStageFilter,
  onSelectStage,
}) => {
  const stages: { key: ProspectStage; label: string; color: string }[] = [
    { key: 'QUALIFIED', label: 'QUALIFIED', color: 'text-sky-400 border-sky-500/30 bg-sky-500/10' },
    { key: 'DISCOVERY', label: 'DISCOVERY', color: 'text-[#0099FF] border-[#0099FF]/30 bg-[#0099FF]/10' },
    { key: 'PROPOSAL', label: 'PROPOSAL', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
    { key: 'NEGOTIATION', label: 'NEGOTIATION', color: 'text-purple-400 border-purple-500/30 bg-purple-500/10' },
    { key: 'WON', label: 'WON', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
    { key: 'LOST', label: 'LOST', color: 'text-rose-400 border-rose-500/30 bg-rose-500/10' },
  ];

  return (
    <div className="p-4 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-3">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest font-semibold">
          COMMERCIAL OPPORTUNITY PIPELINE
        </span>
        {activeStageFilter !== 'ALL' && (
          <button
            onClick={() => onSelectStage('ALL')}
            className="text-[10px] font-mono text-[#0099FF] hover:underline"
          >
            Clear Pipeline Filter
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {stages.map((st) => {
          const count = stageCounts[st.key] || 0;
          const isSelected = activeStageFilter === st.key;

          return (
            <button
              key={st.key}
              onClick={() => onSelectStage(isSelected ? 'ALL' : st.key)}
              className={`p-3 rounded-[2px] border transition-all text-left flex flex-col justify-between ${
                isSelected
                  ? 'bg-white/10 border-[#0099FF] ring-1 ring-[#0099FF]'
                  : 'bg-[#050505] border-white/10 hover:border-white/20 hover:bg-white/[0.02]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-white/50 tracking-wider">
                  {st.label}
                </span>
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${st.color}`}>
                  {count}
                </span>
              </div>
              <div className="mt-2 text-xl font-display font-semibold text-white">
                {count}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
