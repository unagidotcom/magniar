import React, { useState } from 'react';
import { Project, ProjectScopeItem, ScopeType } from '../../../types/projects';
import { Check, X, Clock, Plus, Layers } from 'lucide-react';

interface ProjectScopeProps {
  project: Project;
  onAddScopeItem: (scopeItem: Omit<ProjectScopeItem, 'id'>) => void;
}

export const ProjectScope: React.FC<ProjectScopeProps> = ({ project, onAddScopeItem }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<ScopeType>('IN_SCOPE');

  const inScope = project.scope.filter((s) => s.type === 'IN_SCOPE');
  const outOfScope = project.scope.filter((s) => s.type === 'OUT_OF_SCOPE');
  const pendingScope = project.scope.filter((s) => s.type === 'PENDING_APPROVAL');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddScopeItem({ name, description, type });
    setName('');
    setDescription('');
    setType('IN_SCOPE');
    setModalOpen(false);
  };

  return (
    <div className="p-4 bg-[#0A0A0C] border border-white/10 rounded-[2px] font-mono text-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <h3 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#0099FF]" />
            <span>PROJECT SCOPE & BOUNDARIES</span>
          </h3>
          <p className="text-white/50 text-[11px] mt-0.5">
            Contractual and operational deliverables included, excluded, or pending proposal approval.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-2.5 py-1.5 bg-[#0099FF]/10 hover:bg-[#0099FF]/20 text-[#0099FF] border border-[#0099FF]/30 rounded-[2px] font-bold text-[11px] flex items-center gap-1 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Add Scope Item</span>
        </button>
      </div>

      {/* 3 Scope Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* IN SCOPE */}
        <div className="space-y-2">
          <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-[11px] flex items-center justify-between rounded-[2px]">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              IN SCOPE ({inScope.length})
            </span>
            <span className="text-[9px] uppercase">Active Delivery</span>
          </div>

          <div className="space-y-2">
            {inScope.length === 0 ? (
              <div className="p-3 text-white/40 text-[11px] text-center border border-white/5 rounded-[2px]">
                No items added to In Scope.
              </div>
            ) : (
              inScope.map((item) => (
                <div key={item.id} className="p-3 bg-[#050505] border border-white/10 rounded-[2px] space-y-1">
                  <div className="font-bold text-white text-xs">{item.name}</div>
                  <p className="text-white/60 text-[11px]">{item.description}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* OUT OF SCOPE */}
        <div className="space-y-2">
          <div className="p-2 bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold text-[11px] flex items-center justify-between rounded-[2px]">
            <span className="flex items-center gap-1.5">
              <X className="w-4 h-4" />
              OUT OF SCOPE ({outOfScope.length})
            </span>
            <span className="text-[9px] uppercase">Excluded</span>
          </div>

          <div className="space-y-2">
            {outOfScope.length === 0 ? (
              <div className="p-3 text-white/40 text-[11px] text-center border border-white/5 rounded-[2px]">
                No items marked Out of Scope.
              </div>
            ) : (
              outOfScope.map((item) => (
                <div key={item.id} className="p-3 bg-[#050505] border border-white/10 rounded-[2px] space-y-1">
                  <div className="font-bold text-white/80 text-xs line-through decoration-rose-500/50">{item.name}</div>
                  <p className="text-white/50 text-[11px]">{item.description}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* PENDING APPROVAL */}
        <div className="space-y-2">
          <div className="p-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-[11px] flex items-center justify-between rounded-[2px]">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              PENDING APPROVAL ({pendingScope.length})
            </span>
            <span className="text-[9px] uppercase">Proposed</span>
          </div>

          <div className="space-y-2">
            {pendingScope.length === 0 ? (
              <div className="p-3 text-white/40 text-[11px] text-center border border-white/5 rounded-[2px]">
                No pending scope proposals.
              </div>
            ) : (
              pendingScope.map((item) => (
                <div key={item.id} className="p-3 bg-[#050505] border border-white/10 rounded-[2px] space-y-1">
                  <div className="font-bold text-amber-300 text-xs">{item.name}</div>
                  <p className="text-white/60 text-[11px]">{item.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Add Scope Item Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0A0A0C] border border-white/20 rounded-[2px] p-6 max-w-md w-full font-mono text-xs space-y-4">
            <h3 className="font-bold text-white text-sm">Add Project Scope Item</h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] text-white/50 uppercase">Scope Item Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. TikTok Shop Integration & Feed Sync"
                  className="w-full bg-[#050505] border border-white/10 rounded-[2px] p-2 text-white text-xs focus:outline-none focus:border-[#0099FF]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-white/50 uppercase">Scope Classification *</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as ScopeType)}
                  className="w-full bg-[#050505] border border-white/10 rounded-[2px] p-2 text-white text-xs focus:outline-none focus:border-[#0099FF]"
                >
                  <option value="IN_SCOPE">IN SCOPE (Active Delivery)</option>
                  <option value="OUT_OF_SCOPE">OUT OF SCOPE (Excluded)</option>
                  <option value="PENDING_APPROVAL">PENDING APPROVAL (Proposed)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-white/50 uppercase">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide scope boundary details and notes..."
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
                  Add Scope Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
