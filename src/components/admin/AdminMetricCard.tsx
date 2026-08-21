import React from 'react';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';

interface AdminMetricCardProps {
  label: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  sublabel?: string;
  isDemoData?: boolean;
}

export const AdminMetricCard: React.FC<AdminMetricCardProps> = ({
  label,
  value,
  change,
  isPositive = true,
  sublabel,
  isDemoData = true,
}) => {
  return (
    <div className="bg-[#0A0A0C] border border-white/10 rounded-[2px] p-4 sm:p-5 space-y-3 relative group hover:border-white/20 transition-colors min-w-0 overflow-hidden">
      <div className="flex items-center justify-between gap-2 min-w-0">
        <span className="font-mono text-[11px] text-white/50 tracking-wider uppercase font-medium truncate">
          {label}
        </span>
        {isDemoData && (
          <span
            className="font-mono text-[9px] text-amber-400/80 bg-amber-400/10 border border-amber-400/20 px-1.5 py-0.5 rounded-[2px] uppercase"
            title="Simulated operating system demo metric"
          >
            DEMO DATA
          </span>
        )}
      </div>

      <div className="flex flex-col xl:flex-row xl:items-baseline xl:justify-between gap-2 pt-1 min-w-0">
        <div className="text-xl sm:text-2xl lg:text-[1.625rem] font-display font-semibold text-white tracking-tight min-w-0 break-words">
          {value}
        </div>
        {change && (
          <div
            className={`flex items-center gap-1 font-mono text-xs min-w-0 ${
              isPositive ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
            <span className="truncate">{change}</span>
          </div>
        )}
      </div>

      {sublabel && (
        <div className="font-mono text-[11px] text-white/40 pt-1 border-t border-white/[0.05] flex items-center justify-between gap-2 min-w-0">
          <span className="truncate">{sublabel}</span>
          <Info className="w-3 h-3 text-white/20 group-hover:text-white/40 transition-colors" />
        </div>
      )}
    </div>
  );
};
