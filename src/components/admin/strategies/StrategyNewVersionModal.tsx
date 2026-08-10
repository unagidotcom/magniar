import React, { useState } from 'react';
import { X, Layers, AlertCircle } from 'lucide-react';
import { Strategy } from '../../../types/strategies';

interface StrategyNewVersionModalProps {
  strategy: Strategy;
  isOpen: boolean;
  onClose: () => void;
  onCreateVersion: (summary: string) => void;
}

export const StrategyNewVersionModal: React.FC<StrategyNewVersionModalProps> = ({
  strategy,
  isOpen,
  onClose,
  onCreateVersion,
}) => {
  const [summary, setSummary] = useState('');

  if (!isOpen) return null;

  // Calculate next version
  const currentVer = strategy.version;
  const match = currentVer.match(/v(\d+)\.(\d+)/);
  let nextVer = 'v1.1';
  if (match) {
    const major = parseInt(match[1], 10);
    const minor = parseInt(match[2], 10) + 1;
    nextVer = `v${major}.${minor}`;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateVersion(summary.trim() || `Updated strategy details for version ${nextVer}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#0A0A0A] border border-white/10 rounded-lg w-full max-w-md overflow-hidden shadow-2xl">
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-[#0F0F0F]">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#0099FF]" />
            <h3 className="font-display font-bold text-white text-sm tracking-wide uppercase">
              CREATE NEW STRATEGY VERSION
            </h3>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="p-3 bg-[#0099FF]/10 border border-[#0099FF]/30 rounded text-xs text-white/80 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-white/50 font-mono">CURRENT VERSION:</span>
              <span className="font-mono text-white/70 bg-white/10 px-2 py-0.5 rounded">{currentVer}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/50 font-mono">NEW VERSION:</span>
              <span className="font-mono text-[#0099FF] bg-[#0099FF]/20 px-2 py-0.5 rounded font-bold">{nextVer}</span>
            </div>
            <p className="text-[11px] text-white/60">
              Creating a new version preserves historical context. Previous versions will remain available in Version History and will NOT be overwritten.
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase text-white/70 tracking-wider">
              CHANGE SUMMARY / RELEASE NOTES
            </label>
            <textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Describe what changed in this version (e.g. Budget reallocation, revised audience targets)..."
              required
              className="w-full bg-[#141414] border border-white/10 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#0099FF] transition-colors"
            />
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 border border-white/10 rounded text-xs font-mono uppercase text-white/70 hover:text-white"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={!summary.trim()}
              className="px-4 py-1.5 bg-[#0099FF] text-black font-semibold rounded text-xs font-mono uppercase hover:bg-[#0099FF]/90 disabled:opacity-50"
            >
              PUBLISH VERSION {nextVer}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
