import React from 'react';
import { Calendar, Clock, FileText, CheckSquare, MessageSquare } from 'lucide-react';
import { UpcomingEvent } from '../../../services/dashboardService';

interface UpcomingListProps {
  events: UpcomingEvent[];
}

export const UpcomingList: React.FC<UpcomingListProps> = ({ events }) => {
  return (
    <div className="bg-[#0A0A0C] border border-white/10 rounded-[2px] p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#0099FF]" />
          <h3 className="text-xs font-mono font-medium text-white uppercase tracking-wider">
            UPCOMING AGENDA & MILESTONES
          </h3>
        </div>

        <span className="font-mono text-[9px] text-amber-400 bg-amber-400/10 border border-amber-400/20 px-1.5 py-0.5 rounded-[2px] uppercase">
          DEMO DATA
        </span>
      </div>

      <div className="space-y-2.5">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="p-3 bg-[#050505] border border-white/5 rounded-[2px] flex items-center gap-3.5"
          >
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-[2px] flex flex-col items-center justify-center shrink-0 font-mono text-center">
              <span className="text-[10px] text-[#0099FF] font-bold uppercase leading-none">
                {evt.dayLabel}
              </span>
              <span className="text-[9px] text-white/40 pt-0.5 leading-none">
                {evt.time}
              </span>
            </div>

            <div className="flex-1 min-w-0 space-y-0.5">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-display font-semibold text-white truncate">
                  {evt.title}
                </h4>
                <span className="font-mono text-[9px] text-white/40 uppercase bg-white/5 px-1.5 py-0.5 rounded-[2px] shrink-0">
                  {evt.type}
                </span>
              </div>
              <p className="text-[11px] font-mono text-white/50 truncate">
                {evt.clientName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
