import React from 'react';
import { Briefcase, Eye } from 'lucide-react';
import { MockProject } from '../../../data/adminMockData';
import { AdminStatusBadge } from '../AdminStatusBadge';

interface ActiveProjectsCardProps {
  projects: MockProject[];
  onInspectProject: (project: MockProject) => void;
  onNavigateToProjects: () => void;
}

export const ActiveProjectsCard: React.FC<ActiveProjectsCardProps> = ({
  projects,
  onInspectProject,
}) => {
  return (
    <div className="bg-[#0A0A0C] border border-white/10 rounded-[2px] p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs font-mono font-medium text-white uppercase tracking-wider">
            ACTIVE ENGINEERING & GROWTH PROJECTS
          </h3>
        </div>

        <span className="text-[10px] font-mono text-white/40 uppercase">Pending production migration</span>
      </div>

      {projects.length === 0 ? (
        <div className="p-6 bg-[#050505] border border-white/5 rounded-[2px] text-xs font-mono text-white/50">
          No live project records connected yet.
        </div>
      ) : (
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead className="bg-[#050505] border-b border-white/10 text-white/40 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-3">Project Name</th>
              <th className="p-3">Client</th>
              <th className="p-3">Pillar</th>
              <th className="p-3">Status</th>
              <th className="p-3">Lead Engineer</th>
              <th className="p-3">Target Completion</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.05]">
            {projects.map((proj) => (
              <tr
                key={proj.id}
                className="hover:bg-white/[0.02] transition-colors cursor-pointer group"
                onClick={() => onInspectProject(proj)}
              >
                <td className="p-3 text-white font-medium group-hover:text-[#0099FF] transition-colors">
                  {proj.name}
                </td>
                <td className="p-3 text-white/70">{proj.client_name}</td>
                <td className="p-3 text-white/50 text-[11px]">{proj.pillar}</td>
                <td className="p-3">
                  <AdminStatusBadge status={proj.status} size="sm" />
                </td>
                <td className="p-3 text-white/80 text-[11px]">{proj.lead_engineer}</td>
                <td className="p-3 text-white/50 text-[11px]">{proj.target_completion}</td>
                <td className="p-3 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onInspectProject(proj);
                    }}
                    className="p-1.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-[2px] border border-white/10"
                    title="Inspect Details"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
};
