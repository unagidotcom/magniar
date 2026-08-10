import React from 'react';
import { Project } from '../../../types/projects';
import { Target, Info, Calendar, User, ShieldAlert, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface ProjectOverviewProps {
  project: Project;
}

export const ProjectOverview: React.FC<ProjectOverviewProps> = ({ project }) => {
  return (
    <div className="space-y-4 font-mono text-xs">
      {/* Overview Metadata Grid */}
      <div className="p-4 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <h3 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
            <Info className="w-4 h-4 text-[#0099FF]" />
            <span>PROJECT OVERVIEW & OPERATIONAL SUMMARY</span>
          </h3>
          <span className="text-[10px] text-white/40">ID: {project.id}</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="p-2.5 bg-[#050505] border border-white/5 rounded-[2px] space-y-1">
            <span className="text-white/40 text-[10px] uppercase block">Project Lead:</span>
            <span className="text-white font-bold">{project.project_lead}</span>
          </div>

          <div className="p-2.5 bg-[#050505] border border-white/5 rounded-[2px] space-y-1">
            <span className="text-white/40 text-[10px] uppercase block">Current Phase:</span>
            <span className="text-[#0099FF] font-bold uppercase">{project.current_phase}</span>
          </div>

          <div className="p-2.5 bg-[#050505] border border-white/5 rounded-[2px] space-y-1">
            <span className="text-white/40 text-[10px] uppercase block">Timeline:</span>
            <span className="text-white/90">{project.start_date} → {project.target_end_date}</span>
          </div>

          <div className="p-2.5 bg-[#050505] border border-white/5 rounded-[2px] space-y-1">
            <span className="text-white/40 text-[10px] uppercase block">Priority:</span>
            <span className={`font-bold uppercase ${
              project.priority === 'CRITICAL' ? 'text-rose-400' :
              project.priority === 'HIGH' ? 'text-amber-400' : 'text-white'
            }`}>
              {project.priority}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5 pt-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/60">OPERATIONAL DELIVERY PROGRESS:</span>
            <span className="text-white font-bold">{project.progress_percent}% COMPLETE</span>
          </div>
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#0099FF] h-full transition-all duration-500 rounded-full"
              style={{ width: `${project.progress_percent}%` }}
            />
          </div>
          <div className="text-[10px] text-white/40 text-right">
            Calculated from milestone achievements & sprint deliverables
          </div>
        </div>

        {/* Description & Objective */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-white/10">
          <div className="space-y-1.5">
            <div className="text-[10px] text-white/40 uppercase font-semibold">PROJECT DESCRIPTION</div>
            <p className="text-white/80 leading-relaxed bg-[#050505] p-3 border border-white/5 rounded-[2px]">
              {project.description}
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="text-[10px] text-[#0099FF] uppercase font-semibold flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5" />
              <span>PRIMARY STRATEGIC OBJECTIVE</span>
            </div>
            <p className="text-white/90 leading-relaxed bg-[#0099FF]/5 p-3 border border-[#0099FF]/20 rounded-[2px]">
              {project.primary_objective}
            </p>
          </div>
        </div>
      </div>

      {/* Health & Blockers Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Next Action Prominent Box */}
        <div className="p-4 bg-[#0099FF]/10 border border-[#0099FF]/30 rounded-[2px] space-y-2">
          <div className="text-[10px] text-[#0099FF] uppercase font-bold tracking-wider">
            NEXT ACTION REQUIRED
          </div>
          <div className="text-white font-bold text-sm">
            {project.next_action.title}
          </div>
          <div className="flex items-center justify-between text-xs text-white/60 pt-1 border-t border-[#0099FF]/20">
            <span>Due Date: <strong className="text-white">{project.next_action.due_date}</strong></span>
            <span>Assigned: <strong className="text-white">{project.next_action.owner}</strong></span>
          </div>
        </div>

        {/* Active Blockers Box */}
        <div className="p-4 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-2">
          <div className="text-[10px] text-white/40 uppercase font-bold tracking-wider flex items-center justify-between">
            <span>ACTIVE BLOCKERS ({project.blockers.length})</span>
            {project.health_reason && (
              <span className="text-amber-400 font-normal">Health: {project.health}</span>
            )}
          </div>

          {project.blockers.length === 0 ? (
            <div className="p-2.5 bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2 rounded-[2px]">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>NO ACTIVE BLOCKERS REPORTED. DELIVERY RUNNING SMOOTHLY.</span>
            </div>
          ) : (
            <div className="space-y-2">
              {project.blockers.map((blk) => (
                <div key={blk.id} className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-[2px] space-y-1">
                  <div className="flex items-center justify-between font-bold text-amber-300 text-xs">
                    <span className="flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      {blk.title}
                    </span>
                    <span className="text-[10px] uppercase bg-amber-500/20 px-1.5 py-0.5 rounded text-amber-300">
                      {blk.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-white/70 text-[11px]">{blk.description}</p>
                  <div className="text-[10px] text-white/40 flex justify-between">
                    <span>Owner: {blk.owner}</span>
                    <span>Waiting since: {blk.waiting_since}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
