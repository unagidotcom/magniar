import React, { useState } from 'react';
import { Project, ProjectDeliverable, DeliverableStatus } from '../../../types/projects';
import { CheckSquare, Plus, Clock, FileText } from 'lucide-react';

interface ProjectDeliverablesProps {
  project: Project;
  onAddDeliverable: (deliverable: Omit<ProjectDeliverable, 'id'>) => void;
  onUpdateDeliverableStatus: (deliverableId: string, status: DeliverableStatus) => void;
}

export const ProjectDeliverables: React.FC<ProjectDeliverablesProps> = ({
  project,
  onAddDeliverable,
  onUpdateDeliverableStatus,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [owner, setOwner] = useState(project.project_lead);
  const [description, setDescription] = useState('');

  const getDeliverableStatusBadge = (status: DeliverableStatus) => {
    switch (status) {
      case 'COMPLETED':
      case 'APPROVED':
        return (
          <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold rounded-[2px] text-[10px] uppercase">
            ✓ {status}
          </span>
        );
      case 'IN_PROGRESS':
      case 'IN_REVIEW':
        return (
          <span className="px-2 py-0.5 bg-[#0099FF]/10 border border-[#0099FF]/30 text-[#0099FF] font-bold rounded-[2px] text-[10px] uppercase">
            {status.replace('_', ' ')}
          </span>
        );
      case 'DRAFT':
      case 'PLANNED':
        return (
          <span className="px-2 py-0.5 bg-white/10 border border-white/20 text-white/60 font-bold rounded-[2px] text-[10px] uppercase">
            {status}
          </span>
        );
      case 'BLOCKED':
        return (
          <span className="px-2 py-0.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold rounded-[2px] text-[10px] uppercase">
            BLOCKED
          </span>
        );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddDeliverable({
      name,
      due_date: dueDate || 'TBD',
      owner,
      description,
      status: 'PLANNED',
    });
    setName('');
    setDueDate('');
    setDescription('');
    setModalOpen(false);
  };

  return (
    <div className="p-4 bg-[#0A0A0C] border border-white/10 rounded-[2px] font-mono text-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <h3 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-[#0099FF]" />
            <span>PROJECT DELIVERABLES ({project.deliverables.length})</span>
          </h3>
          <p className="text-white/50 text-[11px] mt-0.5">
            Formal reports, strategy decks, tracking architectures, and creative packages.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-2.5 py-1.5 bg-[#0099FF]/10 hover:bg-[#0099FF]/20 text-[#0099FF] border border-[#0099FF]/30 rounded-[2px] font-bold text-[11px] flex items-center gap-1 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Add Deliverable</span>
        </button>
      </div>

      {/* Deliverables Grid */}
      <div className="space-y-2">
        {project.deliverables.length === 0 ? (
          <div className="p-4 text-center text-white/40 border border-white/5 rounded-[2px]">
            No deliverables registered. Click "+ Add Deliverable" to define work artifacts.
          </div>
        ) : (
          project.deliverables.map((del) => (
            <div
              key={del.id}
              className="p-3.5 bg-[#050505] border border-white/10 rounded-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-white/20 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-[#0099FF]" />
                  <span className="font-bold text-white text-xs">{del.name}</span>
                  {getDeliverableStatusBadge(del.status)}
                </div>
                {del.description && (
                  <p className="text-white/60 text-[11px] pl-5">{del.description}</p>
                )}
                <div className="text-[10px] text-white/40 pl-5">
                  Due: {del.due_date} • Assigned: {del.owner}
                </div>
              </div>

              {/* Status Selector */}
              <div className="flex items-center gap-1 shrink-0 self-end sm:self-center">
                <select
                  value={del.status}
                  onChange={(e) =>
                    onUpdateDeliverableStatus(del.id, e.target.value as DeliverableStatus)
                  }
                  className="bg-[#0A0A0C] border border-white/10 text-white font-mono text-[11px] rounded-[2px] p-1.5 focus:outline-none focus:border-[#0099FF]"
                >
                  <option value="DRAFT">DRAFT</option>
                  <option value="PLANNED">PLANNED</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="IN_REVIEW">IN REVIEW</option>
                  <option value="APPROVED">APPROVED</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="BLOCKED">BLOCKED</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Deliverable Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0A0A0C] border border-white/20 rounded-[2px] p-6 max-w-md w-full font-mono text-xs space-y-4">
            <h3 className="font-bold text-white text-sm">Add Project Deliverable</h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] text-white/50 uppercase">Deliverable Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Q3 Multi-channel Performance Deck"
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
                    placeholder="e.g. Sep 05, 2026"
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
                  placeholder="Brief summary of deliverable requirements..."
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
                  Add Deliverable
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
