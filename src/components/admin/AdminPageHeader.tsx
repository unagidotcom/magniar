import React from 'react';
import { Plus, RefreshCw, Download } from 'lucide-react';

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
  actions?: React.ReactNode;
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
  actions,
  children,
}) => {
  return (
    <div className="border-b border-white/10 pb-4 mb-6 space-y-3">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 min-w-0">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2.5 min-w-0 flex-nowrap">
            {moduleCode && (
              <span className="font-mono text-[10px] text-[#0099FF] bg-[#0099FF]/10 border border-[#0099FF]/20 px-2 py-0.5 rounded-[2px] whitespace-nowrap shrink-0">
                {moduleCode}
              </span>
            )}
            <h1 className="text-xl md:text-2xl font-display tracking-tight text-white font-semibold truncate">
              {title}
            </h1>
          </div>
          <p className="text-[11px] md:text-xs text-white/50 font-mono leading-relaxed truncate">
            {subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-nowrap shrink-0 overflow-x-auto max-w-full">
          {actions}

          {showRefresh && (
            <button
              onClick={onRefresh}
              disabled={!onRefresh}
              className="p-2 bg-white/[0.03] hover:bg-white/[0.08] disabled:opacity-40 disabled:cursor-not-allowed text-white/60 hover:text-white border border-white/10 rounded-[2px] transition-colors text-xs font-mono flex items-center gap-1.5 shrink-0"
              title="Refresh Module State"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}

          {secondaryActionLabel && (
            <button
              onClick={onSecondaryAction}
              className="px-3 py-2 bg-white/[0.03] hover:bg-white/[0.08] text-white/80 hover:text-white border border-white/10 rounded-[2px] transition-colors text-xs font-mono flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{secondaryActionLabel}</span>
            </button>
          )}

          {primaryActionLabel && (
            <button
              onClick={onPrimaryAction}
              className="px-3.5 py-2 bg-[#0099FF] hover:bg-[#0088EE] text-white rounded-[2px] font-mono text-xs font-medium tracking-wide transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap shrink-0"
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
