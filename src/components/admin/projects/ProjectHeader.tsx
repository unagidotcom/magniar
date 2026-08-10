import React from 'react';
import { Project, ProjectStatus, ProjectHealth } from '../../../types/projects';
import {
  ArrowLeft,
  Building2,
  Edit,
  RefreshCw,
  Plus,
  Archive,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';

interface ProjectHeaderProps {
  project: Project;
  onBack: () => void;
  onOpenClient: (clientId: string) => void;
  onEdit: () => void;
  onUpdateStatus: () => void;
  onAddTask: () => void;
  onArchive: () => void;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  project,
  onBack,
  onOpenClient,
  onEdit,
  onUpdateStatus,
  onAddTask,
  onArchive,
}) => {
  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case 'ACTIVE':
      case 'IN_PROGRESS':
        return (
          <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 font-bold rounded-[2px] uppercase text-xs">
            {status.replace('_', ' ')}
          </span>
        );
      case 'PLANNING':
      case 'ONBOARDING':
        return (
          <span className="px-2.5 py-1 bg-[#0099FF]/10 border border-[#0099FF]/40 text-[#0099FF] font-bold rounded-[2px] uppercase text-xs">
            {status}
          </span>
        );
      case 'AT_RISK':
        return (
          <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/40 text-amber-400 font-bold rounded-[2px] uppercase text-xs">
            AT RISK
          </span>
        );
      case 'PAUSED':
        return (
          <span className="px-2.5 py-1 bg-white/10 border border-white/30 text-white/80 font-bold rounded-[2px] uppercase text-xs">
            PAUSED
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="px-2.5 py-1 bg-purple-500/10 border border-purple-500/40 text-purple-300 font-bold rounded-[2px] uppercase text-xs">
            COMPLETED
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 bg-white/10 border border-white/20 text-white/70 font-bold rounded-[2px] uppercase text-xs">
            {status}
          </span>
        );
    }
  };

  const getHealthBadge = (health: ProjectHealth) => {
    switch (health) {
      case 'ON_TRACK':
        return (
          <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold rounded-[2px] text-[11px]">
            ● HEALTH: ON TRACK
          </span>
        );
      case 'ATTENTION':
        return (
          <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold rounded-[2px] text-[11px]">
            ▲ HEALTH: ATTENTION
          </span>
        );
      case 'AT_RISK':
        return (
          <span className="px-2 py-0.5 bg-rose-500/10 text-rose-400 border border-rose-500/30 font-bold rounded-[2px] text-[11px]">
            ⚠️ HEALTH: AT RISK
          </span>
        );
      case 'BLOCKED':
        return (
          <span className="px-2 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold rounded-[2px] text-[11px]">
            🚫 HEALTH: BLOCKED
          </span>
        );
    }
  };

  return (
    <div className="bg-[#0A0A0C] border border-white/10 rounded-[2px] p-5 font-mono text-xs space-y-4">
      {/* Top Nav Row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors group text-xs"
        >
          <ArrowLeft className="w-4 h-4 text-[#0099FF] group-hover:-translate-x-0.5 transition-transform" />
          <span>← Back to Active Projects Directory</span>
        </button>

        <div className="flex items-center gap-2 text-[11px]">
          <span className="text-white/40">PROJECT LINEAGE:</span>
          {project.source_request_id && (
            <span className="px-1.5 py-0.5 bg-white/5 border border-white/10 text-white/70 rounded">
              Req: {project.source_request_id}
            </span>
          )}
          {project.source_prospect_id && (
            <span className="px-1.5 py-0.5 bg-white/5 border border-white/10 text-white/70 rounded">
              Prospect: {project.source_prospect_id}
            </span>
          )}
          <span className="px-1.5 py-0.5 bg-[#0099FF]/10 text-[#0099FF] border border-[#0099FF]/30 rounded font-bold">
            Client: {project.client_id}
          </span>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2 border-t border-white/10">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 bg-[#0099FF]/20 text-[#0099FF] border border-[#0099FF]/40 font-bold rounded-[2px] text-xs">
              {project.id}
            </span>
            <span className="px-2 py-0.5 bg-white/5 text-white/80 border border-white/10 font-bold rounded-[2px] text-xs">
              {project.project_type}
            </span>
            {getStatusBadge(project.status)}
            {getHealthBadge(project.health)}
          </div>

          <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide">
            {project.name}
          </h1>

          {/* Client Relationship Bar */}
          <div className="flex items-center gap-3 pt-0.5">
            <div className="flex items-center gap-2 text-white/70 text-xs">
              <Building2 className="w-4 h-4 text-[#0099FF]" />
              <span>Client Relationship:</span>
              <strong className="text-white font-bold">{project.client_business_name}</strong>
            </div>

            <button
              onClick={() => onOpenClient(project.client_id)}
              className="px-2 py-1 bg-[#0099FF]/10 hover:bg-[#0099FF]/20 text-[#0099FF] border border-[#0099FF]/30 rounded-[2px] text-[11px] font-bold flex items-center gap-1 transition-colors"
            >
              <span>VIEW CLIENT 360</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={onUpdateStatus}
            className="px-3 py-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-[2px] font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#0099FF]" />
            <span>Update Status</span>
          </button>

          <button
            onClick={onEdit}
            className="px-3 py-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-[2px] font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <Edit className="w-3.5 h-3.5" />
            <span>Edit Project</span>
          </button>

          <button
            onClick={onAddTask}
            className="px-3 py-2 bg-[#0099FF] hover:bg-[#0099FF]/90 text-white rounded-[2px] font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Task</span>
          </button>

          <button
            onClick={onArchive}
            className="p-2 text-white/40 hover:text-rose-400 hover:bg-rose-500/10 border border-white/10 rounded-[2px] transition-colors"
            title="Archive Project"
          >
            <Archive className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
