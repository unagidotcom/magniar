import React, { useState } from 'react';
import { Project, ProjectStatus, ProjectHealth } from '../../../types/projects';
import { X, ShieldAlert, CheckCircle2, PauseCircle, AlertTriangle, AlertCircle } from 'lucide-react';

interface UpdateStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  onUpdateStatus: (
    newStatus: ProjectStatus,
    newHealth: ProjectHealth,
    notes: string,
    progressPercent?: number
  ) => void;
}

export const UpdateStatusModal: React.FC<UpdateStatusModalProps> = ({
  isOpen,
  onClose,
  project,
  onUpdateStatus,
}) => {
  const [status, setStatus] = useState<ProjectStatus>(project.status);
  const [health, setHealth] = useState<ProjectHealth>(project.health);
  const [progressPercent, setProgressPercent] = useState<number>(project.progress_percent);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStatus(status, health, notes, progressPercent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm font-mono text-xs">
      <div className="bg-[#0A0A0C] border border-white/20 rounded-[2px] p-6 max-w-lg w-full space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#0099FF]" />
            <h2 className="text-white font-bold text-sm uppercase">UPDATE PROJECT STATUS & HEALTH</h2>
          </div>
          <button onClick={onClose} className="p-1 text-white/50 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] text-white/50 uppercase">Project Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                className="w-full bg-[#050505] border border-white/10 rounded-[2px] p-2 text-white focus:outline-none focus:border-[#0099FF]"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="PAUSED">PAUSED</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-white/50 uppercase">Health Metric</label>
              <select
                value={health}
                onChange={(e) => setHealth(e.target.value as ProjectHealth)}
                className="w-full bg-[#050505] border border-white/10 rounded-[2px] p-2 text-white focus:outline-none focus:border-[#0099FF]"
              >
                <option value="ON_TRACK">ON TRACK (Green)</option>
                <option value="AT_RISK">AT RISK (Yellow)</option>
                <option value="DELAYED">DELAYED (Red)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] text-white/50 uppercase">
              <span>Overall Progress Completion</span>
              <span className="text-white font-bold">{progressPercent}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={progressPercent}
              onChange={(e) => setProgressPercent(Number(e.target.value))}
              className="w-full accent-[#0099FF]"
            />
          </div>

          {/* Conditional Guidance Note */}
          {status === 'PAUSED' && (
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded text-amber-300 text-[11px] flex items-center gap-2">
              <PauseCircle className="w-4 h-4 shrink-0" />
              <span>Provide explicit pause justification (e.g., client budget hold, pending asset delivery).</span>
            </div>
          )}

          {status === 'COMPLETED' && (
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded text-emerald-300 text-[11px] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Project will mark all milestones closed and transition client contract to completed status.</span>
            </div>
          )}

          {health === 'AT_RISK' && (
            <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 rounded text-rose-300 text-[11px] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Requires immediate risk mitigation notes for senior agency review.</span>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] text-white/50 uppercase">Status Transition Notes / Reason</label>
            <textarea
              rows={3}
              required
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Record operational details for this status change..."
              className="w-full bg-[#050505] border border-white/10 rounded-[2px] p-2 text-white focus:outline-none focus:border-[#0099FF]"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-[2px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#0099FF] hover:bg-[#0099FF]/90 text-white font-bold rounded-[2px]"
            >
              Confirm Status Change
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
