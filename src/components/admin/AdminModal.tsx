import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  confirmVariant?: 'primary' | 'danger';
  onConfirm?: () => void;
  children?: React.ReactNode;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  confirmLabel = 'Confirm Action',
  confirmVariant = 'primary',
  onConfirm,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div
        className="bg-[#0A0A0C] border border-white/10 rounded-[2px] max-w-lg w-full p-6 space-y-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <h3 className="text-lg font-display font-semibold text-white tracking-tight flex items-center gap-2">
              {confirmVariant === 'danger' && (
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
              )}
              <span>{title}</span>
            </h3>
            {description && (
              <p className="text-xs font-mono text-white/50 leading-relaxed">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 text-white/40 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {children && <div className="space-y-4">{children}</div>}

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white font-mono text-xs rounded-[2px] transition-colors border border-white/10"
          >
            Cancel
          </button>
          {onConfirm && (
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`px-4 py-2 font-mono text-xs font-medium rounded-[2px] transition-colors ${
                confirmVariant === 'danger'
                  ? 'bg-rose-600 hover:bg-rose-500 text-white'
                  : 'bg-[#0099FF] hover:bg-[#0088EE] text-white'
              }`}
            >
              {confirmLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
