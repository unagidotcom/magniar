import React from 'react';
import { X, ExternalLink, ArrowRight } from 'lucide-react';
import { AdminStatusBadge } from './AdminStatusBadge';

interface AdminDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  status?: string;
  children: React.ReactNode;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
}

export const AdminDrawer: React.FC<AdminDrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  status,
  children,
  primaryActionLabel,
  onPrimaryAction,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs animate-in fade-in">
      <div
        className="bg-[#0A0A0C] border-l border-white/10 w-full max-w-xl h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-start justify-between gap-4 bg-[#050505]">
          <div className="space-y-1.5 flex-1 pr-2">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="text-xl font-display font-semibold text-white tracking-tight">
                {title}
              </h3>
              {status && <AdminStatusBadge status={status} size="sm" />}
            </div>
            {subtitle && (
              <p className="text-xs font-mono text-white/50 leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white rounded-[2px] transition-colors border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {children}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 bg-[#050505] flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-mono text-xs rounded-[2px] border border-white/10 transition-colors"
          >
            Close Panel
          </button>

          {primaryActionLabel && onPrimaryAction && (
            <button
              onClick={onPrimaryAction}
              className="px-4 py-2 bg-[#0099FF] hover:bg-[#0088EE] text-white font-mono text-xs font-medium rounded-[2px] flex items-center gap-2 transition-colors"
            >
              <span>{primaryActionLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
