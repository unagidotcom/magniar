import React from 'react';
import { Project } from '../../../types/projects';
import { Users, User, Shield, Mail, Phone, Building2 } from 'lucide-react';

interface ProjectTeamProps {
  project: Project;
}

export const ProjectTeam: React.FC<ProjectTeamProps> = ({ project }) => {
  return (
    <div className="p-4 bg-[#0A0A0C] border border-white/10 rounded-[2px] font-mono text-xs space-y-4">
      {/* Header */}
      <div className="border-b border-white/10 pb-3">
        <h3 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
          <Users className="w-4 h-4 text-[#0099FF]" />
          <span>PROJECT TEAM & CLIENT CONTACTS</span>
        </h3>
        <p className="text-white/50 text-[11px] mt-0.5">
          Internal Magniar delivery team assigned alongside primary client stakeholders.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Internal Magniar Team */}
        <div className="space-y-3">
          <div className="text-[10px] text-[#0099FF] uppercase font-bold tracking-wider flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            <span>INTERNAL MAGNIAR STAFF ({project.team.length})</span>
          </div>

          <div className="space-y-2">
            {project.team.map((member) => (
              <div
                key={member.id}
                className="p-3 bg-[#050505] border border-white/10 rounded-[2px] flex items-center justify-between"
              >
                <div className="space-y-0.5">
                  <div className="font-bold text-white text-xs">{member.name}</div>
                  <div className="text-[10px] text-white/40">{member.role}</div>
                </div>

                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="p-1.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded border border-white/10"
                    title={`Email ${member.name}`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Primary Client Contact */}
        <div className="space-y-3">
          <div className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5" />
            <span>PRIMARY CLIENT CONTACT (STAKEHOLDER)</span>
          </div>

          <div className="p-4 bg-[#050505] border border-emerald-500/30 rounded-[2px] space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-bold text-white text-sm">{project.client_contact.name}</h4>
                <p className="text-[#0099FF] text-xs font-semibold">{project.client_contact.role}</p>
                <p className="text-white/40 text-[10px]">{project.client_business_name}</p>
              </div>

              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[9px] font-bold border border-emerald-500/40 rounded">
                CLIENT SPONSOR
              </span>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs">
              <a
                href={`mailto:${project.client_contact.email}`}
                className="flex items-center gap-2 text-white/80 hover:text-[#0099FF] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-white/40" />
                <span>{project.client_contact.email}</span>
              </a>

              {project.client_contact.phone && (
                <a
                  href={`tel:${project.client_contact.phone}`}
                  className="flex items-center gap-2 text-white/80 hover:text-[#0099FF] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-white/40" />
                  <span>{project.client_contact.phone}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
