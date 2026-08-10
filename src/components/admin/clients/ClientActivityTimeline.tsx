import React from 'react';
import { ClientActivity } from '../../../types/clients';
import { Activity, Calendar, User, Clock, CheckCircle2, FileText, Layers, MessageSquare } from 'lucide-react';

interface ClientActivityTimelineProps {
  activities: ClientActivity[];
}

export const ClientActivityTimeline: React.FC<ClientActivityTimelineProps> = ({ activities }) => {
  return (
    <div className="space-y-4 font-mono text-xs">
      <div className="bg-[#0A0A0C] p-4 border border-white/10 rounded-[2px]">
        <h3 className="font-bold text-white text-sm uppercase">CLIENT ENGAGEMENT TIMELINE</h3>
        <p className="text-white/40 text-[11px] mt-0.5">
          Chronological audit log of account milestones, service activations, and strategic reviews.
        </p>
      </div>

      <div className="bg-[#0A0A0C] border border-white/10 rounded-[2px] p-5">
        <div className="relative pl-6 border-l border-white/10 space-y-6">
          {activities.map((act) => (
            <div key={act.id} className="relative group">
              {/* Dot icon */}
              <div className="absolute -left-[31px] top-0 w-3 h-3 rounded-full bg-[#0099FF] border-2 border-[#050505]" />

              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-bold text-white text-xs">{act.title}</h4>
                  <span className="text-[10px] text-white/40 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-white/30" />
                    <span>{act.timestamp}</span>
                  </span>
                </div>
                <p className="text-white/70 leading-relaxed text-xs">{act.description}</p>
                <div className="text-[10px] text-white/40">
                  Logged by: <span className="text-white/80 font-semibold">{act.author}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
