import React, { useState } from 'react';
import { Project, ProjectPriority } from '../../../types/projects';
import { X, Edit3 } from 'lucide-react';

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  onSave: (updates: Partial<Project>) => void;
}

export const EditProjectModal: React.FC<EditProjectModalProps> = ({
  isOpen,
  onClose,
  project,
  onSave,
}) => {
  const [name, setName] = useState(project.name);
  const [priority, setPriority] = useState<ProjectPriority>(project.priority);
  const [projectLead, setProjectLead] = useState(project.project_lead);
  const [targetEndDate, setTargetEndDate] = useState(project.target_end_date);
  const [description, setDescription] = useState(project.description);
  const [primaryObjective, setPrimaryObjective] = useState(project.primary_objective || '');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      priority,
      project_lead: projectLead,
      target_end_date: targetEndDate,
      description,
      primary_objective: primaryObjective,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm font-mono text-xs">
      <div className="bg-[#0A0A0C] border border-white/20 rounded-[2px] p-6 max-w-lg w-full space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-[#0099FF]" />
            <h2 className="text-white font-bold text-sm uppercase">EDIT PROJECT METADATA</h2>
          </div>
          <button onClick={onClose} className="p-1 text-white/50 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] text-white/50 uppercase">Project Title</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#050505] border border-white/10 rounded-[2px] p-2 text-white focus:outline-none focus:border-[#0099FF]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] text-white/50 uppercase">Priority Level</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as ProjectPriority)}
                className="w-full bg-[#050505] border border-white/10 rounded-[2px] p-2 text-white focus:outline-none focus:border-[#0099FF]"
              >
                <option value="LOW">LOW</option>
                <option value="NORMAL">NORMAL</option>
                <option value="HIGH">HIGH</option>
                <option value="CRITICAL">CRITICAL</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-white/50 uppercase">Project Lead</label>
              <input
                type="text"
                value={projectLead}
                onChange={(e) => setProjectLead(e.target.value)}
                className="w-full bg-[#050505] border border-white/10 rounded-[2px] p-2 text-white focus:outline-none focus:border-[#0099FF]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-white/50 uppercase">Target Completion Date</label>
            <input
              type="text"
              value={targetEndDate}
              onChange={(e) => setTargetEndDate(e.target.value)}
              className="w-full bg-[#050505] border border-white/10 rounded-[2px] p-2 text-white focus:outline-none focus:border-[#0099FF]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-white/50 uppercase">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#050505] border border-white/10 rounded-[2px] p-2 text-white focus:outline-none focus:border-[#0099FF]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-[#0099FF] uppercase font-bold">Primary Strategic Objective</label>
            <input
              type="text"
              value={primaryObjective}
              onChange={(e) => setPrimaryObjective(e.target.value)}
              className="w-full bg-[#050505] border border-[#0099FF]/30 rounded-[2px] p-2 text-white focus:outline-none focus:border-[#0099FF]"
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
