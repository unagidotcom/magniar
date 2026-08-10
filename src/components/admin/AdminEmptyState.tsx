import React from 'react';
import { Database, Plus } from 'lucide-react';

interface AdminEmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const AdminEmptyState: React.FC<AdminEmptyStateProps> = ({
  title = 'No Records Found',
  description = 'There are no active records in this view or filter set.',
  actionLabel,
  onAction,
}) => {
  return (
    <div className="bg-[#0A0A0C] border border-white/10 rounded-[2px] p-12 text-center space-y-4">
      <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto text-white/40">
        <Database className="w-6 h-6" />
      </div>
      <div className="space-y-1 max-w-sm mx-auto">
        <h3 className="text-sm font-mono font-medium text-white uppercase tracking-wider">
          {title}
        </h3>
        <p className="text-xs text-white/50 font-mono leading-relaxed">
          {description}
        </p>
      </div>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white font-mono text-xs rounded-[2px] inline-flex items-center gap-2 border border-white/10 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
};
