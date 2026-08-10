import React from 'react';
import { Activity, Bell, CheckCircle2, FileText, Sparkles, ArrowRight } from 'lucide-react';
import { ActivityLogItem } from '../../../services/dashboardService';

interface ActivityFeedProps {
  activities: ActivityLogItem[];
  onActivityClick: (act: ActivityLogItem) => void;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities,
  onActivityClick,
}) => {
  const getIcon = (type: ActivityLogItem['type']) => {
    switch (type) {
      case 'NEW_REQUEST':
        return <Bell className="w-4 h-4 text-[#0099FF]" />;
      case 'PROJECT_UPDATED':
        return <Activity className="w-4 h-4 text-purple-400" />;
      case 'INVOICE_PAID':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'PROPOSAL_SENT':
        return <FileText className="w-4 h-4 text-amber-400" />;
      case 'STRATEGY_APPROVED':
        return <Sparkles className="w-4 h-4 text-[#0099FF]" />;
    }
  };

  return (
    <div className="bg-[#0A0A0C] border border-white/10 rounded-[2px] p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#0099FF]" />
          <h3 className="text-xs font-mono font-medium text-white uppercase tracking-wider">
            RECENT OPERATIONAL ACTIVITY LOG
          </h3>
        </div>

        <span className="font-mono text-[9px] text-amber-400 bg-amber-400/10 border border-amber-400/20 px-1.5 py-0.5 rounded-[2px] uppercase">
          DEMO DATA
        </span>
      </div>

      <div className="space-y-2 divide-y divide-white/[0.04]">
        {activities.map((act) => (
          <div
            key={act.id}
            onClick={() => onActivityClick(act)}
            className="pt-2.5 first:pt-0 flex items-start gap-3 hover:bg-white/[0.02] p-2 rounded-[2px] transition-colors cursor-pointer group"
          >
            <div className="shrink-0 mt-0.5 p-1 bg-white/5 border border-white/10 rounded-[2px]">
              {getIcon(act.type)}
            </div>

            <div className="flex-1 min-w-0 space-y-0.5">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-mono font-medium text-white group-hover:text-[#0099FF] transition-colors truncate">
                  {act.title}
                </h4>
                <span className="font-mono text-[10px] text-white/40 shrink-0">
                  {act.timestamp}
                </span>
              </div>
              <p className="text-[11px] font-mono text-white/60 truncate">
                {act.entityName}
              </p>
              <div className="text-[10px] font-mono text-white/40">
                Actor: {act.actor}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
