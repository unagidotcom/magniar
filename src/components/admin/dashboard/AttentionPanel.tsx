import React from 'react';
import { AlertCircle, Clock, ArrowRight, ShieldAlert } from 'lucide-react';
import { AttentionItem } from '../../../services/dashboardService';

interface AttentionPanelProps {
  items: AttentionItem[];
  onActionClick: (item: AttentionItem) => void;
}

export const AttentionPanel: React.FC<AttentionPanelProps> = ({
  items,
  onActionClick,
}) => {
  // Sort by urgency: URGENT -> HIGH -> NORMAL -> LOW
  const priorityOrder = { URGENT: 1, HIGH: 2, NORMAL: 3, LOW: 4 };
  const sortedItems = [...items].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <h2 className="text-xs font-mono font-medium text-white uppercase tracking-wider">
            ATTENTION REQUIRED
          </h2>
          <span className="font-mono text-[10px] text-rose-400 bg-rose-500/10 border border-rose-500/20 px-1.5 py-0.5 rounded-[2px] font-semibold">
            {items.length} ACTION ITEMS
          </span>
        </div>

      </div>

      {sortedItems.length === 0 ? (
        <div className="p-6 bg-[#0A0A0C] border border-white/10 rounded-[2px] text-xs font-mono text-white/50">
          No urgent live action items.
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {sortedItems.map((item) => (
          <div
            key={item.id}
            className={`p-4 bg-[#0A0A0C] border rounded-[2px] space-y-3 relative group transition-all hover:border-white/30 flex flex-col justify-between ${
              item.priority === 'URGENT'
                ? 'border-rose-500/30'
                : item.priority === 'HIGH'
                ? 'border-amber-500/30'
                : 'border-white/10'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className={`px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase rounded-[2px] border ${item.badgeStyle}`}>
                  {item.badgeText}
                </span>

                <span className="font-mono text-[9px] text-white/40 uppercase">
                  {item.priority}
                </span>
              </div>

              <div>
                <h3 className="font-display font-semibold text-sm text-white group-hover:text-[#0099FF] transition-colors">
                  {item.entityName}
                </h3>
                <p className="font-mono text-[11px] text-white/60 leading-snug pt-0.5">
                  {item.title}
                </p>
              </div>

              <div className="font-mono text-[10px] text-white/40 pt-1 border-t border-white/[0.05] truncate">
                {item.meta}
              </div>
            </div>

            <button
              onClick={() => onActionClick(item)}
              className="w-full py-1.5 bg-white/5 hover:bg-[#0099FF] text-white/80 hover:text-white font-mono text-[11px] font-medium rounded-[2px] border border-white/10 hover:border-[#0099FF] flex items-center justify-center gap-1.5 transition-all mt-2 cursor-pointer"
            >
              <span>{item.actionText}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
      )}
    </section>
  );
};
