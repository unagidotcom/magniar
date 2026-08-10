import React from 'react';
import { ChevronRight, Filter, RefreshCw } from 'lucide-react';
import { PipelineStageCount } from '../../../services/dashboardService';

interface RequestPipelineProps {
  stages: PipelineStageCount[];
  selectedStage: string | null;
  onSelectStage: (stage: string | null) => void;
}

export const RequestPipeline: React.FC<RequestPipelineProps> = ({
  stages,
  selectedStage,
  onSelectStage,
}) => {
  return (
    <section className="bg-[#0A0A0C] border border-white/10 rounded-[2px] p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#0099FF]" />
          <h3 className="text-xs font-mono font-medium text-white uppercase tracking-wider">
            REQUEST PIPELINE STAGES
          </h3>
          {selectedStage && (
            <button
              onClick={() => onSelectStage(null)}
              className="text-[10px] font-mono text-[#0099FF] bg-[#0099FF]/10 border border-[#0099FF]/30 px-2 py-0.5 rounded-[2px] hover:bg-[#0099FF]/20 transition-colors flex items-center gap-1"
            >
              <span>FILTERING: {selectedStage}</span>
              <span>(CLEAR ✕)</span>
            </button>
          )}
        </div>

        <span className="font-mono text-[9px] text-amber-400 bg-amber-400/10 border border-amber-400/20 px-1.5 py-0.5 rounded-[2px] uppercase self-start sm:self-auto">
          DEMO DATA
        </span>
      </div>

      {/* Pipeline Stepped Track */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {stages.map((st, idx) => {
          const isSelected = selectedStage === st.stage;
          return (
            <button
              key={st.stage}
              onClick={() => onSelectStage(isSelected ? null : st.stage)}
              className={`p-3 rounded-[2px] border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#0099FF]/15 border-[#0099FF] text-white shadow-lg'
                  : 'bg-[#050505] border-white/10 hover:border-white/30 text-white/70 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between gap-1 pb-1">
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider">
                  0{idx + 1} • {st.stage}
                </span>
                {idx < stages.length - 1 && (
                  <ChevronRight className="w-3 h-3 text-white/20 hidden lg:block" />
                )}
              </div>

              <div className="flex items-baseline justify-between pt-1">
                <span className="font-mono text-xs font-medium text-white/80">
                  {st.label}
                </span>
                <span
                  className={`font-mono text-lg font-bold ${
                    isSelected ? 'text-[#0099FF]' : 'text-white'
                  }`}
                >
                  {st.count}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
