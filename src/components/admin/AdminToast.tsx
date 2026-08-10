import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}

interface AdminToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const AdminToast: React.FC<AdminToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => onDismiss(toast.id)} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: () => void }> = ({
  toast,
  onDismiss,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div
      className={`pointer-events-auto p-4 rounded-[2px] border shadow-2xl backdrop-blur-md flex items-start gap-3 transition-all animate-in fade-in slide-in-from-bottom-2 ${
        isSuccess
          ? 'bg-[#0A0A0C]/95 border-emerald-500/40 text-emerald-400'
          : isError
          ? 'bg-[#0A0A0C]/95 border-rose-500/40 text-rose-400'
          : 'bg-[#0A0A0C]/95 border-[#0099FF]/40 text-[#0099FF]'
      }`}
    >
      {isSuccess && <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />}
      {isError && <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
      {!isSuccess && !isError && <Info className="w-4 h-4 shrink-0 mt-0.5" />}

      <div className="flex-1 space-y-0.5">
        <h4 className="text-xs font-mono font-medium text-white uppercase tracking-wider">
          {toast.title}
        </h4>
        {toast.message && (
          <p className="text-[11px] font-mono text-white/70 leading-relaxed">
            {toast.message}
          </p>
        )}
      </div>

      <button
        onClick={onDismiss}
        className="text-white/40 hover:text-white transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
