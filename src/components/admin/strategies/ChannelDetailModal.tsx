import React from 'react';
import { X, Radio, DollarSign, Target, Sparkles, AlertTriangle, ArrowRight } from 'lucide-react';
import { StrategyChannelItem } from '../../../types/strategies';

interface ChannelDetailModalProps {
  channel: StrategyChannelItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ChannelDetailModal: React.FC<ChannelDetailModalProps> = ({
  channel,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !channel) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[#0A0A0A] border border-white/10 rounded-lg w-full max-w-xl my-8 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#0F0F0F]">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-[#0099FF]" />
            <h3 className="font-display font-bold text-white text-base tracking-wide uppercase">
              {channel.channel_name}
            </h3>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-sm">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3 bg-[#121212] border border-white/10 rounded font-mono text-xs">
            <div>
              <span className="text-white/40 block text-[10px] uppercase">ROLE</span>
              <span className="text-white font-semibold">{channel.role}</span>
            </div>
            <div>
              <span className="text-white/40 block text-[10px] uppercase">PRIORITY</span>
              <span className="text-[#0099FF] font-semibold">{channel.priority}</span>
            </div>
            <div>
              <span className="text-white/40 block text-[10px] uppercase">BUDGET ALLOCATION</span>
              <span className="text-white font-semibold">{channel.budget_allocation_pct}%</span>
            </div>
            <div>
              <span className="text-white/40 block text-[10px] uppercase">STATUS</span>
              <span className="text-emerald-400 font-semibold">{channel.current_status}</span>
            </div>
          </div>

          {/* Objective */}
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-white/50 tracking-wider block">CHANNEL OBJECTIVE</span>
            <p className="text-white bg-[#141414] p-3 border border-white/5 rounded text-xs leading-relaxed">
              {channel.objective}
            </p>
          </div>

          {/* Target Audience */}
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-white/50 tracking-wider block">TARGET AUDIENCE</span>
            <p className="text-white/80 bg-[#141414] p-3 border border-white/5 rounded text-xs">
              {channel.audience}
            </p>
          </div>

          {/* Strategic Approach */}
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-white/50 tracking-wider block">STRATEGIC APPROACH</span>
            <p className="text-white/80 bg-[#141414] p-3 border border-white/5 rounded text-xs leading-relaxed">
              {channel.approach}
            </p>
          </div>

          {/* Testing Plan & Creative Requirements */}
          {channel.testing_plan && (
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase text-white/50 tracking-wider block">TESTING PLAN</span>
              <p className="text-white/80 bg-[#141414] p-3 border border-white/5 rounded text-xs">
                {channel.testing_plan}
              </p>
            </div>
          )}

          {channel.creative_requirements && (
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase text-white/50 tracking-wider block">CREATIVE REQUIREMENTS</span>
              <p className="text-white/80 bg-[#141414] p-3 border border-white/5 rounded text-xs">
                {channel.creative_requirements}
              </p>
            </div>
          )}

          {/* Risks & Next Actions */}
          {channel.risks && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded text-xs text-amber-200 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
              <div>
                <span className="font-mono text-[10px] uppercase text-amber-400 block font-bold">CHANNEL RISK</span>
                <span>{channel.risks}</span>
              </div>
            </div>
          )}

          {channel.next_actions && (
            <div className="p-3 bg-[#0099FF]/10 border border-[#0099FF]/30 rounded text-xs text-white flex items-start gap-2">
              <ArrowRight className="w-4 h-4 shrink-0 mt-0.5 text-[#0099FF]" />
              <div>
                <span className="font-mono text-[10px] uppercase text-[#0099FF] block font-bold">NEXT ACTION</span>
                <span>{channel.next_actions}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/10 flex justify-between items-center bg-[#0F0F0F]">
          <span className="text-[10px] font-mono text-white/40">DEMO DATA — MEDIA SPEND</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-mono uppercase transition-colors"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
