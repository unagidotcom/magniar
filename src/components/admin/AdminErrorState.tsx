import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface AdminErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const AdminErrorState: React.FC<AdminErrorStateProps> = ({
  title = 'System View Error',
  message = 'Unable to render operational module data. Please refresh or verify admin access level.',
  onRetry,
}) => {
  return (
    <div className="bg-rose-950/20 border border-rose-500/30 rounded-[2px] p-8 text-center space-y-4">
      <div className="w-10 h-10 bg-rose-500/10 border border-rose-500/20 rounded-full flex items-center justify-center mx-auto text-rose-400">
        <AlertTriangle className="w-5 h-5" />
      </div>
      <div className="space-y-1 max-w-md mx-auto">
        <h3 className="text-sm font-mono font-medium text-rose-300 uppercase tracking-wider">
          {title}
        </h3>
        <p className="text-xs text-rose-200/70 font-mono leading-relaxed">
          {message}
        </p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 font-mono text-xs rounded-[2px] inline-flex items-center gap-2 border border-rose-500/30 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reload View State</span>
        </button>
      )}
    </div>
  );
};
