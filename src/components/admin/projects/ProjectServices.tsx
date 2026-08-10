import React from 'react';
import { Project, ProjectServiceItem, ProjectServiceStatus } from '../../../types/projects';
import { Briefcase, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface ProjectServicesProps {
  project: Project;
}

export const ProjectServices: React.FC<ProjectServicesProps> = ({ project }) => {
  const getServiceStatusBadge = (status: ProjectServiceStatus) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold rounded-[2px] text-[10px] uppercase">
            ACTIVE
          </span>
        );
      case 'PLANNED':
        return (
          <span className="px-2 py-0.5 bg-[#0099FF]/10 border border-[#0099FF]/30 text-[#0099FF] font-bold rounded-[2px] text-[10px] uppercase">
            PLANNED
          </span>
        );
      case 'PAUSED':
        return (
          <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold rounded-[2px] text-[10px] uppercase">
            PAUSED
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="px-2 py-0.5 bg-purple-500/10 border border-purple-500/30 text-purple-300 font-bold rounded-[2px] text-[10px] uppercase">
            COMPLETED
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="px-2 py-0.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold rounded-[2px] text-[10px] uppercase">
            CANCELLED
          </span>
        );
    }
  };

  return (
    <div className="p-4 bg-[#0A0A0C] border border-white/10 rounded-[2px] font-mono text-xs space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <h3 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[#0099FF]" />
            <span>PROJECT SERVICES ({project.services.length})</span>
          </h3>
          <p className="text-white/50 text-[11px] mt-0.5">
            Functional disciplines and service components executed under this engagement.
          </p>
        </div>
      </div>

      {/* Services List Table / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {project.services.map((srv) => (
          <div
            key={srv.id}
            className="p-3.5 bg-[#050505] border border-white/10 rounded-[2px] space-y-2 hover:border-white/20 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="font-bold text-white text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0099FF]" />
                {srv.service_name}
              </div>
              {getServiceStatusBadge(srv.status)}
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-white/5 text-white/60">
              <div>
                <span className="text-white/40 block text-[9px] uppercase">Assigned Team:</span>
                <span className="text-white">{srv.owner}</span>
              </div>
              <div>
                <span className="text-white/40 block text-[9px] uppercase">Start Date:</span>
                <span className="text-white">{srv.started_at}</span>
              </div>
            </div>

            {srv.notes && (
              <p className="text-[11px] text-white/50 bg-white/5 p-2 rounded-[2px]">
                {srv.notes}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
