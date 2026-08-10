import React, { useState } from 'react';
import { Project, ProjectMilestone, MilestoneStatus, ProjectPhase } from '../../../types/projects';
import { Calendar, CheckCircle2, Clock, Plus, Flag, AlertTriangle } from 'lucide-react';

interface ProjectTimelineProps {
  project: Project;
  onAddMilestone: (milestone: Omit<ProjectMilestone, 'id'>) => void;
  onUpdateMilestoneStatus: (milestoneId: string, status: MilestoneStatus) => void;
}

const PHASES: ProjectPhase[] = [
  'DISCOVERY',
  'PLANNING',
  'ONBOARDING',
  'IMPLEMENTATION',
  'LAUNCH',
  'OPTIMIZATION',
  'REVIEW',
  'COMPLETION',
];

export const ProjectTimeline: React.FC<ProjectTimelineProps> = ({
  project,
  onAddMilestone,
  onUpdateMilestoneStatus,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [owner, setOwner] = useState(project.project_lead);
  const [description, setDescription] = useState('');

  const currentPhaseIndex = PHASES.indexOf(project.current_phase);

  const getMilestoneBadge = (status: MilestoneStatus) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold rounded-[2px] text-[10px] uppercase">
            ✓ COMPLETED
          </span>
        );
      case 'IN_PROGRESS':
        return (
          <span className="px-2 py-0.5 bg-[#0099FF]/10 border border-[#0099FF]/30 text-[#0099FF] font-bold rounded-[2px] text-[10px] uppercase">
            IN PROGRESS
          </span>
        );
      case 'UPCOMING':
        return (
          <span className="px-2 py-0.5 bg-white/10 border border-white/20 text-white/60 font-bold rounded-[2px] text-[10px] uppercase">
            UPCOMING
          </span>
        );
      case 'BLOCKED':
        return (
          <span className="px-2 py-0.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold rounded-[2px] text-[10px] uppercase">
            ⚠️ BLOCKED
          </span>
        );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddMilestone({
      name,
      due_date: dueDate || 'TBD',
      owner,
      description,
      status: 'UPCOMING',
    });
    setName('');
    setDueDate('');
    setDescription('');
    setModalOpen(false);
  };

  return (
    <div className="p-4 bg-[#0A0A0C] border border-white/10 rounded-[2px] font-mono text-xs space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <h3 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#0099FF]" />
            <span>PROJECT TIMELINE & MILESTONES</span>
          </h3>
          <p className="text-white/50 text-[11px] mt-0.5">
            Phase progression from kickoff through completion with milestone verification points.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-2.5 py-1.5 bg-[#0099FF]/10 hover:bg-[#0099FF]/20 text-[#0099FF] border border-[#0099FF]/30 rounded-[2px] font-bold text-[11px] flex items-center gap-1 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Add Milestone</span>
        </button>
      </div>

      {/* Phase Tracker (Horizontal Desktop, Vertical Mobile) */}
      <div className="space-y-2">
        <div className="text-[10px] text-white/40 uppercase font-semibold">
          PROJECT DELIVERY PHASES (CURRENT PHASE: <strong className="text-[#0099FF]">{project.current_phase}</strong>)
        </div>

        {/* Desktop Step Bar */}
        <div className="hidden lg:flex items-center justify-between gap-1 bg-[#050505] p-3 border border-white/10 rounded-[2px]">
          {PHASES.map((p, idx) => {
            const isCurrent = p === project.current_phase;
            const isDone = idx < currentPhaseIndex;

            return (
              <div key={p} className="flex-1 text-center relative group">
                <div
                  className={`py-1.5 px-1 rounded-[2px] text-[10px] font-bold border transition-colors ${
                    isCurrent
                      ? 'bg-[#0099FF] text-white border-[#0099FF]'
                      : isDone
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-white/5 text-white/40 border-white/5'
                  }`}
                >
                  {isDone ? '✓ ' : ''}{p}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Step Bar */}
        <div className="lg:hidden flex flex-wrap gap-1.5 bg-[#050505] p-3 border border-white/10 rounded-[2px]">
          {PHASES.map((p, idx) => {
            const isCurrent = p === project.current_phase;
            const isDone = idx < currentPhaseIndex;

            return (
              <span
                key={p}
                className={`px-2 py-1 rounded text-[10px] font-bold border ${
                  isCurrent
                    ? 'bg-[#0099FF] text-white border-[#0099FF]'
                    : isDone
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-white/5 text-white/40 border-white/5'
                }`}
              >
                {isDone ? '✓ ' : ''}{p}
              </span>
            );
          })}
        </div>
      </div>

      {/* Milestones List */}
      <div className="space-y-3">
        <div className="text-[10px] text-white/40 uppercase font-semibold">
          DELIVERY MILESTONES ({project.milestones.length})
        </div>

        <div className="space-y-2">
          {project.milestones.length === 0 ? (
            <div className="p-4 text-center text-white/40 border border-white/5 rounded-[2px]">
              No milestones defined yet. Click "+ Add Milestone" above to create one.
            </div>
          ) : (
            project.milestones.map((ms) => (
              <div
                key={ms.id}
                className="p-3.5 bg-[#050505] border border-white/10 rounded-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-white/20 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Flag className="w-3.5 h-3.5 text-[#0099FF]" />
                    <span className="font-bold text-white text-xs">{ms.name}</span>
                    {getMilestoneBadge(ms.status)}
                  </div>
                  <p className="text-white/60 text-[11px] pl-5">{ms.description}</p>
                  <div className="text-[10px] text-white/40 pl-5">
                    Due Date: {ms.due_date} • Owner: {ms.owner}
                    {ms.completed_at && ` • Completed: ${ms.completed_at}`}
                  </div>
                </div>

                {/* Status Toggle Quick Buttons */}
                <div className="flex items-center gap-1 shrink-0 self-end sm:self-center">
                  {ms.status !== 'COMPLETED' && (
                    <button
                      onClick={() => onUpdateMilestoneStatus(ms.id, 'COMPLETED')}
                      className="px-2 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-[10px] font-bold"
                    >
                      Mark Done
                    </button>
                  )}
                  {ms.status !== 'IN_PROGRESS' && ms.status !== 'COMPLETED' && (
                    <button
                      onClick={() => onUpdateMilestoneStatus(ms.id, 'IN_PROGRESS')}
                      className="px-2 py-1 bg-[#0099FF]/10 hover:bg-[#0099FF]/20 text-[#0099FF] border border-[#0099FF]/30 rounded text-[10px] font-bold"
                    >
                      Start
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Milestone Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0A0A0C] border border-white/20 rounded-[2px] p-6 max-w-md w-full font-mono text-xs space-y-4">
            <h3 className="font-bold text-white text-sm">Create Delivery Milestone</h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] text-white/50 uppercase">Milestone Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Q3 Multi-channel Creative Test Launch"
                  className="w-full bg-[#050505] border border-white/10 rounded-[2px] p-2 text-white text-xs focus:outline-none focus:border-[#0099FF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] text-white/50 uppercase">Due Date</label>
                  <input
                    type="text"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    placeholder="e.g. Sep 15, 2026"
                    className="w-full bg-[#050505] border border-white/10 rounded-[2px] p-2 text-white text-xs focus:outline-none focus:border-[#0099FF]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-white/50 uppercase">Owner</label>
                  <input
                    type="text"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                    className="w-full bg-[#050505] border border-white/10 rounded-[2px] p-2 text-white text-xs focus:outline-none focus:border-[#0099FF]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-white/50 uppercase">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Key milestone objectives and success criteria..."
                  className="w-full bg-[#050505] border border-white/10 rounded-[2px] p-2 text-white text-xs focus:outline-none focus:border-[#0099FF]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-[2px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#0099FF] hover:bg-[#0099FF]/90 text-white rounded-[2px] font-bold"
                >
                  Add Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
