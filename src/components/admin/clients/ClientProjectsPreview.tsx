import React, { useState } from 'react';
import { ClientProjectPreview } from '../../../types/clients';
import { NewProjectModalPlaceholder } from './NewProjectModalPlaceholder';
import { Briefcase, ArrowUpRight, Plus, Layers, Clock } from 'lucide-react';

interface ClientProjectsPreviewProps {
  projects: ClientProjectPreview[];
}

export const ClientProjectsPreview: React.FC<ClientProjectsPreviewProps> = ({ projects }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProjectName, setSelectedProjectName] = useState<string | undefined>(undefined);

  const handleOpenProject = (projectName?: string) => {
    setSelectedProjectName(projectName);
    setModalOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="px-2 py-0.5 rounded-[2px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-semibold">
            ACTIVE
          </span>
        );
      case 'IN_PROGRESS':
        return (
          <span className="px-2 py-0.5 rounded-[2px] bg-[#0099FF]/10 text-[#0099FF] border border-[#0099FF]/30 text-[10px] font-mono font-semibold">
            IN PROGRESS
          </span>
        );
      case 'PLANNING':
        return (
          <span className="px-2 py-0.5 rounded-[2px] bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-mono font-semibold">
            PLANNING
          </span>
        );
      case 'PAUSED':
        return (
          <span className="px-2 py-0.5 rounded-[2px] bg-white/10 text-white/60 border border-white/20 text-[10px] font-mono font-semibold">
            PAUSED
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-[2px] bg-white/5 text-white/50 border border-white/10 text-[10px] font-mono font-semibold">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-4 font-mono text-xs">
      <div className="bg-[#0A0A0C] p-4 border border-white/10 rounded-[2px] flex items-center justify-between">
        <div>
          <h3 className="font-bold text-white text-sm uppercase">ACTIVE CLIENT PROJECTS</h3>
          <p className="text-white/40 text-[11px] mt-0.5">
            Specific engagements, sprints, and campaigns linked to this client.
          </p>
        </div>
        <button
          onClick={() => handleOpenProject()}
          className="px-3 py-2 bg-[#0099FF] hover:bg-[#0099FF]/80 text-white font-bold rounded-[2px] flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>+ New Project</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="p-8 bg-[#0A0A0C] border border-white/10 rounded-[2px] text-center space-y-3">
          <Briefcase className="w-8 h-8 text-white/20 mx-auto" />
          <p className="text-white/60">No active projects registered for this client yet.</p>
          <button
            onClick={() => handleOpenProject()}
            className="px-3 py-1.5 bg-[#0099FF] text-white font-bold rounded-[2px]"
          >
            + Create First Project
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="p-4 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-3 hover:border-white/20 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#0099FF] bg-[#0099FF]/10 px-1.5 py-0.5 rounded-[2px] border border-[#0099FF]/30 font-bold">
                      {proj.id}
                    </span>
                    <span className="text-[10px] text-white/40 uppercase">{proj.category}</span>
                  </div>
                  <h4 className="font-bold text-white text-sm">{proj.name}</h4>
                </div>
                <div>{getStatusBadge(proj.status)}</div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-white/50">
                  <span>Sprint Completion</span>
                  <span className="font-bold text-white">{proj.progress_percent}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0099FF] transition-all duration-300"
                    style={{ width: `${proj.progress_percent}%` }}
                  />
                </div>
              </div>

              {/* Footer row */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="text-white/40 text-[10px]">Platforms:</span>
                  <div className="flex flex-wrap gap-1">
                    {proj.platforms.map((plat) => (
                      <span
                        key={plat}
                        className="px-1.5 py-0.5 bg-white/5 text-white/70 border border-white/10 rounded-[2px] text-[10px]"
                      >
                        {plat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-white/50 text-[11px]">Owner: <strong className="text-white">{proj.owner}</strong></span>
                  <button
                    onClick={() => handleOpenProject(proj.name)}
                    className="text-[#0099FF] hover:underline font-bold text-xs flex items-center gap-1"
                  >
                    <span>View Project →</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <NewProjectModalPlaceholder
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        projectName={selectedProjectName}
      />
    </div>
  );
};
