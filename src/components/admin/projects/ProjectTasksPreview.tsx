import React, { useState } from 'react';
import { Project, ProjectTaskPreview } from '../../../types/projects';
import { CheckSquare, Plus, Clock, User } from 'lucide-react';

interface ProjectTasksPreviewProps {
  project: Project;
  onAddTask: (task: Omit<ProjectTaskPreview, 'id'>) => void;
}

export const ProjectTasksPreview: React.FC<ProjectTasksPreviewProps> = ({
  project,
  onAddTask,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [owner, setOwner] = useState(project.project_lead);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask({
      title,
      due_date: dueDate || 'TBD',
      owner,
      notes,
      status: 'OPEN',
    });
    setTitle('');
    setDueDate('');
    setNotes('');
    setModalOpen(false);
  };

  return (
    <div className="p-4 bg-[#0A0A0C] border border-white/10 rounded-[2px] font-mono text-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <h3 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-[#0099FF]" />
            <span>OPEN TASKS PREVIEW ({project.open_tasks.length})</span>
          </h3>
          <p className="text-white/50 text-[11px] mt-0.5">
            Operational action items requiring team execution or client review.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-2.5 py-1.5 bg-[#0099FF]/10 hover:bg-[#0099FF]/20 text-[#0099FF] border border-[#0099FF]/30 rounded-[2px] font-bold text-[11px] flex items-center gap-1 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Add Task</span>
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-2">
        {project.open_tasks.length === 0 ? (
          <div className="p-4 text-center text-white/40 border border-white/5 rounded-[2px]">
            No open tasks recorded. Click "+ Add Task" to queue an operational item.
          </div>
        ) : (
          project.open_tasks.map((tsk) => (
            <div
              key={tsk.id}
              className="p-3 bg-[#050505] border border-white/10 rounded-[2px] flex items-start justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="font-bold text-white text-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#0099FF]" />
                  {tsk.title}
                </div>
                {tsk.notes && <p className="text-white/60 text-[11px] pl-4">{tsk.notes}</p>}
                <div className="text-[10px] text-white/40 pl-4">
                  Due: {tsk.due_date} • Owner: {tsk.owner}
                </div>
              </div>

              <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-white/70 text-[10px] font-bold rounded shrink-0">
                {tsk.status}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Add Task Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0A0A0C] border border-white/20 rounded-[2px] p-6 max-w-md w-full font-mono text-xs space-y-4">
            <h3 className="font-bold text-white text-sm">Add Project Task</h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] text-white/50 uppercase">Task Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Audit Google Merchant Center feed diagnostics"
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
                    placeholder="e.g. Aug 18, 2026"
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
                <label className="text-[10px] text-white/50 uppercase">Notes / Instructions</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Additional context or links..."
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
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
