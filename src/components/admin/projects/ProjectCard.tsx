import React from 'react';
import { Project, ProjectStatus } from '../../../types/projects';
import { ArrowUpRight, Calendar, User, CheckCircle2, Clock } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onOpenProject: (project: Project) => void;
  onOpenClient?: (clientId: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenProject,
  onOpenClient,
}) => {
  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case 'ACTIVE':
      case 'IN_PROGRESS':
        return (
          <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold rounded-[2px] uppercase">
            {status.replace('_', ' ')}
          </span>
        );
      case 'PLANNING':
      case 'ONBOARDING':
        return (
          <span className="px-2 py-0.5 bg-[#0099FF]/10 border border-[#0099FF]/30 text-[#0099FF] text-[10px] font-bold rounded-[2px] uppercase">
            {status}
          </span>
        );
      case 'PAUSED':
        return (
          <span className="px-2 py-0.5 bg-white/10 border border-white/20 text-white/70 text-[10px] font-bold rounded-[2px] uppercase">
            PAUSED
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 bg-white/10 border border-white/20 text-white/70 text-[10px] font-bold rounded-[2px] uppercase">
            {status}
          </span>
        );
    }
  };

  return (
    <div
      onClick={() => onOpenProject(project)}
      className="p-4 bg-[#0A0A0C] border border-white/10 rounded-[2px] font-mono text-xs space-y-3 cursor-pointer hover:border-white/30 transition-all"
    >
      {/* Top Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-0.5">
          <div className="text-[10px] text-[#0099FF] font-bold flex items-center gap-2">
            <span>{project.id}</span>
            <span className="px-1.5 py-0.2 bg-white/5 border border-white/10 text-white/70 rounded text-[9px]">
              {project.project_type}
            </span>
          </div>
          <h3 className="font-bold text-white text-sm">{project.name}</h3>
        </div>
        <div>{getStatusBadge(project.status)}</div>
      </div>

      {/* Client Subhead */}
      <div className="p-2 bg-[#050505] border border-white/5 rounded-[2px] flex items-center justify-between">
        <div className="text-white/60 text-[11px]">
          Client: <strong className="text-white">{project.client_business_name}</strong>
        </div>
        {onOpenClient && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenClient(project.client_id);
            }}
            className="text-[10px] text-[#0099FF] hover:underline"
          >
            View Client →
          </button>
        )}
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div>
          <span className="text-white/40 block text-[9px] uppercase">Owner:</span>
          <span className="text-white">{project.project_lead}</span>
        </div>
        <div>
          <span className="text-white/40 block text-[9px] uppercase">Phase:</span>
          <span className="text-[#0099FF] font-bold">{project.current_phase} ({project.progress_percent}%)</span>
        </div>
        <div>
          <span className="text-white/40 block text-[9px] uppercase">Timeline:</span>
          <span className="text-white/80">{project.start_date} → {project.target_end_date}</span>
        </div>
        <div>
          <span className="text-white/40 block text-[9px] uppercase">Fee / Budget:</span>
          <span className="text-white/80">{project.commercial.monthly_service_fee || project.commercial.project_fee || 'Retainer'}</span>
        </div>
      </div>

      {/* Next Action */}
      <div className="p-2.5 bg-[#0099FF]/5 border border-[#0099FF]/20 rounded-[2px] space-y-1">
        <div className="text-[9px] text-[#0099FF] uppercase font-bold">Next Action:</div>
        <div className="text-white text-xs font-medium">{project.next_action.title}</div>
        <div className="text-[10px] text-white/40">Due {project.next_action.due_date} • {project.next_action.owner}</div>
      </div>

      {/* Footer CTA */}
      <div className="flex items-center justify-between pt-1 text-[11px]">
        <div className="flex gap-1">
          {project.services.slice(0, 3).map((s) => (
            <span key={s.id} className="text-[9px] px-1.5 py-0.5 bg-white/5 text-white/60 border border-white/10 rounded">
              {s.service_name}
            </span>
          ))}
        </div>

        <span className="text-[#0099FF] font-bold flex items-center gap-1">
          <span>Project 360</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
