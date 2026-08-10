import React, { useState } from 'react';
import { Project, ProjectType, ProjectPhase, ProjectPriority } from '../../../types/projects';
import { X, Briefcase, Plus, Trash2 } from 'lucide-react';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  clientsList: { id: string; name: string }[];
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  clientsList,
}) => {
  const [selectedClientId, setSelectedClientId] = useState(
    clientsList.length > 0 ? clientsList[0].id : 'MG-CL-2026-008'
  );
  const [name, setName] = useState('');
  const [projectType, setProjectType] = useState<ProjectType>('PERFORMANCE');
  const [priority, setPriority] = useState<ProjectPriority>('NORMAL');
  const [projectLead, setProjectLead] = useState('Kaelen Voss (Growth Team)');
  const [startDate, setStartDate] = useState('Aug 15, 2026');
  const [targetEndDate, setTargetEndDate] = useState('Nov 30, 2026');
  const [description, setDescription] = useState('');
  const [primaryObjective, setPrimaryObjective] = useState('');

  // Contact
  const [clientContactName, setClientContactName] = useState('Maya Chen');
  const [clientContactRole, setClientContactRole] = useState('CMO');
  const [clientContactEmail, setClientContactEmail] = useState('maya@client.com');

  // Commercial
  const [monthlyServiceFee, setMonthlyServiceFee] = useState('$8,500 / mo');
  const [mediaBudget, setMediaBudget] = useState('$25,000 / mo');
  const [billingModel, setBillingModel] = useState('MONTHLY RETAINER');

  // Scope
  const [scopeInputs, setScopeInputs] = useState<string[]>([
    'Paid acquisition strategy and channel management',
    'Bi-weekly creative iteration testing sprints',
  ]);
  const [newScopeText, setNewScopeText] = useState('');

  if (!isOpen) return null;

  const handleAddScope = () => {
    if (!newScopeText.trim()) return;
    setScopeInputs((prev) => [...prev, newScopeText.trim()]);
    setNewScopeText('');
  };

  const handleRemoveScope = (idx: number) => {
    setScopeInputs((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const chosenClient = clientsList.find((c) => c.id === selectedClientId);
    const clientBusinessName = chosenClient ? chosenClient.name : 'Selected Client';

    const formattedScope = scopeInputs.map((s) => ({
      name: s,
      description: 'Scope deliverable item',
      type: 'IN_SCOPE' as const,
    }));

    onSubmit({
      name,
      client_id: selectedClientId,
      client_business_name: clientBusinessName,
      project_type: projectType,
      priority,
      status: 'ACTIVE',
      health: 'ON_TRACK',
      project_lead: projectLead,
      start_date: startDate,
      target_end_date: targetEndDate,
      current_phase: 'PLANNING' as ProjectPhase,
      progress_percent: 10,
      description,
      primary_objective: primaryObjective,
      next_action: {
        title: 'Project kickoff & strategy alignment',
        due_date: 'Aug 20, 2026',
        owner: projectLead,
      },
      client_contact: {
        name: clientContactName,
        role: clientContactRole,
        email: clientContactEmail,
      },
      team: [
        { id: `tm-lead-${Date.now()}`, name: projectLead, role: 'Project Lead' },
        { id: `tm-[#0099FF]-${Date.now()}`, name: 'Magniar Performance Team', role: 'Execution' },
      ],
      services: [
        {
          id: `srv-init-${Date.now()}`,
          service_name: `${projectType} Service`,
          status: 'ACTIVE',
          owner: projectLead,
          started_at: startDate,
        },
      ],
      scope: formattedScope,
      commercial: {
        monthly_service_fee: monthlyServiceFee,
        media_budget: mediaBudget,
        billing_model: billingModel,
      },
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm font-mono text-xs overflow-y-auto">
      <div className="bg-[#0A0A0C] border border-white/20 rounded-[2px] p-6 max-w-2xl w-full my-8 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#0099FF]" />
            <h2 className="text-white font-bold text-sm uppercase">REGISTER NEW ACTIVE PROJECT</h2>
          </div>
          <button onClick={onClose} className="p-1 text-white/50 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Client Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] text-white/50 uppercase">Associated Client *</label>
              <select
                value={selectedClientId}
                onChange={(e) => setSelectedClientId(e.target.value)}
                className="w-full bg-[#050505] border border-white/10 rounded-[2px] p-2 text-white focus:outline-none focus:border-[#0099FF]"
              >
                {clientsList.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.id})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-white/50 uppercase">Project Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Q3 Omni-Channel Scale Strategy"
                className="w-full bg-[#050505] border border-white/10 rounded-[2px] p-2 text-white focus:outline-none focus:border-[#0099FF]"
              />
            </div>
          </div>

          {/* Type, Priority, Lead */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] text-white/50 uppercase">Project Type</label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value as ProjectType)}
                className="w-full bg-[#050505] border border-white/10 rounded-[2px] p-2 text-white focus:outline-none focus:border-[#0099FF]"
              >
                <option value="PERFORMANCE">PERFORMANCE</option>
                <option value="COMMERCE">COMMERCE</option>
                <option value="DEVELOPMENT">DEVELOPMENT</option>
                <option value="STRATEGY">STRATEGY</option>
                <option value="AI STRATEGY">AI STRATEGY</option>
                <option value="CRO">CRO</option>
                <option value="ANALYTICS">ANALYTICS</option>
                <option value="MARKETPLACE">MARKETPLACE</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-white/50 uppercase">Priority</label>
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

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] text-white/50 uppercase">Start Date</label>
              <input
                type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-[#050505] border border-white/10 rounded-[2px] p-2 text-white focus:outline-none focus:border-[#0099FF]"
              />
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
          </div>

          {/* Description & Objective */}
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[10px] text-white/50 uppercase">Project Description</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="High-level operational overview of deliverables..."
                className="w-full bg-[#050505] border border-white/10 rounded-[2px] p-2 text-white focus:outline-none focus:border-[#0099FF]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-[#0099FF] uppercase font-bold">Primary Strategic Objective</label>
              <input
                type="text"
                value={primaryObjective}
                onChange={(e) => setPrimaryObjective(e.target.value)}
                placeholder="e.g. Scale ROAS by 25% while expanding into Google PMax"
                className="w-full bg-[#050505] border border-[#0099FF]/30 rounded-[2px] p-2 text-white focus:outline-none focus:border-[#0099FF]"
              />
            </div>
          </div>

          {/* Commercial Financials */}
          <div className="p-3 bg-[#050505] border border-white/10 rounded-[2px] space-y-2">
            <div className="text-[10px] text-[#0099FF] font-bold uppercase">Commercial Configuration</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <label className="text-[9px] text-white/40 uppercase block">Magniar Service Retainer</label>
                <input
                  type="text"
                  value={monthlyServiceFee}
                  onChange={(e) => setMonthlyServiceFee(e.target.value)}
                  className="w-full bg-[#0A0A0C] border border-white/10 rounded p-1.5 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-[9px] text-amber-300 uppercase block">Client Media Budget</label>
                <input
                  type="text"
                  value={mediaBudget}
                  onChange={(e) => setMediaBudget(e.target.value)}
                  className="w-full bg-[#0A0A0C] border border-amber-500/30 rounded p-1.5 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-[9px] text-white/40 uppercase block">Billing Model</label>
                <input
                  type="text"
                  value={billingModel}
                  onChange={(e) => setBillingModel(e.target.value)}
                  className="w-full bg-[#0A0A0C] border border-white/10 rounded p-1.5 text-white text-xs"
                />
              </div>
            </div>
          </div>

          {/* Scope items builder */}
          <div className="space-y-2">
            <label className="text-[10px] text-white/50 uppercase block">Key Scope Items</label>

            <div className="space-y-1.5">
              {scopeInputs.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-[#050505] border border-white/10 rounded text-xs text-white">
                  <span>✓ {item}</span>
                  <button type="button" onClick={() => handleRemoveScope(idx)} className="text-rose-400 hover:text-rose-300 p-1">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-1">
              <input
                type="text"
                value={newScopeText}
                onChange={(e) => setNewScopeText(e.target.value)}
                placeholder="Add another deliverable item..."
                className="flex-1 bg-[#050505] border border-white/10 rounded-[2px] p-1.5 text-white text-xs focus:outline-none focus:border-[#0099FF]"
              />
              <button
                type="button"
                onClick={handleAddScope}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded font-bold text-xs"
              >
                + Add Scope
              </button>
            </div>
          </div>

          {/* Modal Footer */}
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
              className="px-5 py-2 bg-[#0099FF] hover:bg-[#0099FF]/90 text-white font-bold rounded-[2px] shadow-sm"
            >
              Create Active Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
