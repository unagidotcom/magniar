import React from 'react';
import { Plus, RefreshCw, Filter, Download } from 'lucide-react';

interface AdminPageHeaderProps {
  title: string;
  subtitle: string;
  moduleCode?: string;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  showRefresh?: boolean;
  onRefresh?: () => void;
  children?: React.ReactNode;
}

export const AdminPageHeader: React.FC<AdminPageHeaderProps> = ({
  title,
  subtitle,
  moduleCode,
  primaryActionLabel,
  onPrimaryAction,
  secondaryActionLabel,
  onSecondaryAction,
  showRefresh = true,
  onRefresh,
  children,
}) => {
  return (
    <div className="border-b border-white/10 pb-6 mb-8 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            {moduleCode && (
              <span className="font-mono text-[11px] text-[#0099FF] bg-[#0099FF]/10 border border-[#0099FF]/20 px-2 py-0.5 rounded-[2px]">
                {moduleCode}
              </span>
            )}
            <h1 className="text-2xl md:text-3xl font-display tracking-tight text-white font-semibold">
              {title}
            </h1>
          </div>
          <p className="text-xs md:text-sm text-white/50 font-mono leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {showRefresh && (
            <button
              onClick={onRefresh}
              className="p-2 bg-white/[0.03] hover:bg-white/[0.08] text-white/60 hover:text-white border border-white/10 rounded-[2px] transition-colors text-xs font-mono flex items-center gap-1.5"
              title="Refresh Module State"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}

          {secondaryActionLabel && (
            <button
              onClick={onSecondaryAction}
              className="px-3 py-2 bg-white/[0.03] hover:bg-white/[0.08] text-white/80 hover:text-white border border-white/10 rounded-[2px] transition-colors text-xs font-mono flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{secondaryActionLabel}</span>
            </button>
          )}

          {primaryActionLabel && (
            <button
              onClick={onPrimaryAction}
              className="px-4 py-2 bg-[#0099FF] hover:bg-[#0088EE] text-white rounded-[2px] font-mono text-xs font-medium tracking-wide transition-colors flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>{primaryActionLabel}</span>
            </button>
          )}
        </div>
      </div>

      {children && <div className="pt-2">{children}</div>}
    </div>
  );
};
