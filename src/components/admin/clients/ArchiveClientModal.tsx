import React from 'react';
import { X, Archive, AlertTriangle } from 'lucide-react';

interface ArchiveClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmArchive: () => void;
  clientBusinessName: string;
}

export const ArchiveClientModal: React.FC<ArchiveClientModalProps> = ({
  isOpen,
  onClose,
  onConfirmArchive,
  clientBusinessName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 font-mono text-xs text-white">
      <div className="bg-[#0A0A0C] border border-rose-500/40 rounded-[2px] w-full max-w-md p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Archive className="w-4 h-4 text-rose-400" />
            <h3 className="font-bold text-sm text-white uppercase">ARCHIVE CLIENT RECORD</h3>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          <p className="text-white/80 leading-relaxed">
            Are you sure you want to archive <strong className="text-white">{clientBusinessName}</strong>?
          </p>

          <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-[2px] text-[11px] text-rose-300 space-y-1">
            <span className="font-bold block">NON-DESTRUCTIVE ARCHIVAL:</span>
            <p>
              The record will be flagged as ARCHIVED. All historical lineage (Requests, Prospects, Documents, and Activity Logs) will remain preserved for audit compliance.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-[2px] border border-white/10"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirmArchive();
              onClose();
            }}
            className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-[2px]"
          >
            Archive Client
          </button>
        </div>
      </div>
    </div>
  );
};
