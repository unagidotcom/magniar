import React from 'react';
import { Project, ProjectStatus, ProjectHealth } from '../../../types/projects';
import { Briefcase, ArrowUpRight, Calendar, User, Clock, AlertTriangle, Layers } from 'lucide-react';

interface ProjectTableProps {
  projects: Project[];
  onOpenProject: (project: Project) => void;
  onOpenClient?: (clientId: string) => void;
}

export const ProjectTable: React.FC<ProjectTableProps> = ({
  projects,
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
      case 'AT_RISK':
        return (
          <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold rounded-[2px] uppercase">
            AT RISK
          </span>
        );
      case 'PAUSED':
        return (
          <span className="px-2 py-0.5 bg-white/10 border border-white/20 text-white/70 text-[10px] font-bold rounded-[2px] uppercase">
            PAUSED
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="px-2 py-0.5 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[10px] font-bold rounded-[2px] uppercase">
            COMPLETED
          </span>
        );
      case 'CANCELLED':
      case 'ARCHIVED':
        return (
          <span className="px-2 py-0.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[10px] font-bold rounded-[2px] uppercase">
            {status}
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

  const getHealthBadge = (health: ProjectHealth) => {
    switch (health) {
      case 'ON_TRACK':
        return <span className="text-emerald-400 font-bold">● ON TRACK</span>;
      case 'ATTENTION':
        return <span className="text-amber-400 font-bold">▲ ATTENTION</span>;
      case 'AT_RISK':
        return <span className="text-rose-400 font-bold">⚠️ AT RISK</span>;
      case 'BLOCKED':
        return <span className="text-rose-500 font-bold">🚫 BLOCKED</span>;
      default:
        return <span className="text-white/40">● NORMAL</span>;
    }
  };

  return (
    <div className="bg-[#0A0A0C] border border-white/10 rounded-[2px] overflow-x-auto font-mono text-xs">
      <table className="w-full text-left border-collapse min-w-[1100px]">
        <thead>
          <tr className="border-b border-white/10 bg-[#050505] text-white/40 text-[10px] uppercase tracking-wider font-semibold">
            <th className="p-3.5 pl-4">PROJECT ID / NAME</th>
            <th className="p-3.5">CLIENT</th>
            <th className="p-3.5">TYPE</th>
            <th className="p-3.5">SERVICES</th>
            <th className="p-3.5">OWNER</th>
            <th className="p-3.5">STATUS / HEALTH</th>
            <th className="p-3.5">TIMELINE & PHASE</th>
            <th className="p-3.5">BUDGET SUMMARY</th>
            <th className="p-3.5">NEXT ACTION</th>
            <th className="p-3.5 text-right pr-4">ACTION</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 text-white/80">
          {projects.map((prj) => (
            <tr
              key={prj.id}
              onClick={() => onOpenProject(prj)}
              className="hover:bg-white/[0.02] transition-colors cursor-pointer group"
            >
              {/* Project ID & Name */}
              <td className="p-3.5 pl-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white group-hover:text-[#0099FF] transition-colors text-xs">
                      {prj.name}
                    </span>
                    {prj.priority === 'CRITICAL' && (
                      <span className="text-[9px] bg-rose-500/20 text-rose-400 px-1 py-0.2 rounded border border-rose-500/30">
                        CRITICAL
                      </span>
                    )}
                    {prj.priority === 'HIGH' && (
                      <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1 py-0.2 rounded border border-amber-500/30">
                        HIGH
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-white/40">
                    <code className="text-[#0099FF]">{prj.id}</code>
                    {prj.source_prospect_id && (
                      <span>• Lineage: {prj.source_prospect_id}</span>
                    )}
                  </div>
                </div>
              </td>

              {/* Client */}
              <td className="p-3.5">
                <div className="space-y-0.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenClient) onOpenClient(prj.client_id);
                      else onOpenProject(prj);
                    }}
                    className="font-medium text-white hover:text-[#0099FF] underline-offset-2 hover:underline text-xs text-left"
                  >
                    {prj.client_business_name}
                  </button>
                  <div className="text-[10px] text-white/40">{prj.client_id}</div>
                </div>
              </td>

              {/* Type */}
              <td className="p-3.5">
                <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-white/80 text-[10px] font-semibold rounded-[2px]">
                  {prj.project_type}
                </span>
              </td>

              {/* Services */}
              <td className="p-3.5">
                <div className="flex flex-wrap gap-1 max-w-[160px]">
                  {prj.services.slice(0, 2).map((srv) => (
                    <span
                      key={srv.id}
                      className="px-1.5 py-0.5 bg-[#0099FF]/10 text-[#0099FF] border border-[#0099FF]/20 text-[9px] rounded-[2px]"
                    >
                      {srv.service_name}
                    </span>
                  ))}
                  {prj.services.length > 2 && (
                    <span className="text-[9px] text-white/40 self-center">
                      +{prj.services.length - 2} more
                    </span>
                  )}
                </div>
              </td>

              {/* Owner */}
              <td className="p-3.5">
                <div className="text-xs text-white/90">{prj.project_lead}</div>
              </td>

              {/* Status / Health */}
              <td className="p-3.5">
                <div className="space-y-1">
                  <div>{getStatusBadge(prj.status)}</div>
                  <div className="text-[10px]">{getHealthBadge(prj.health)}</div>
                </div>
              </td>

              {/* Timeline & Phase */}
              <td className="p-3.5">
                <div className="space-y-1">
                  <div className="text-xs text-white/90">
                    {prj.start_date} → {prj.target_end_date}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-white/50">
                    <span className="text-white/40">Phase:</span>
                    <span className="text-[#0099FF] uppercase font-semibold">
                      {prj.current_phase}
                    </span>
                    <span>({prj.progress_percent}%)</span>
                  </div>
                </div>
              </td>

              {/* Budget */}
              <td className="p-3.5">
                <div className="space-y-0.5">
                  <div className="font-bold text-white text-xs">
                    {prj.commercial.monthly_service_fee || prj.commercial.project_fee || 'Retainer'}
                  </div>
                  {prj.commercial.media_budget && (
                    <div className="text-[9px] text-white/50">
                      Ad Spend: {prj.commercial.media_budget}
                    </div>
                  )}
                  <span className="inline-block text-[8px] bg-amber-500/20 text-amber-300 px-1 py-0.2 rounded border border-amber-500/30">
                    DEMO DATA
                  </span>
                </div>
              </td>

              {/* Next Action */}
              <td className="p-3.5 max-w-[180px]">
                <div className="space-y-0.5">
                  <div className="text-xs font-medium text-white truncate" title={prj.next_action.title}>
                    {prj.next_action.title}
                  </div>
                  <div className="text-[10px] text-white/40">
                    Due {prj.next_action.due_date} ({prj.next_action.owner})
                  </div>
                </div>
              </td>

              {/* Action */}
              <td className="p-3.5 text-right pr-4">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenProject(prj);
                  }}
                  className="px-2.5 py-1.5 bg-[#0099FF]/10 hover:bg-[#0099FF]/20 text-[#0099FF] border border-[#0099FF]/30 rounded-[2px] text-[11px] font-semibold inline-flex items-center gap-1 transition-colors"
                >
                  <span>360 VIEW</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
