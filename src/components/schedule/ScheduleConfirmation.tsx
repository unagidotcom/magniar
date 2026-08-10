import React from 'react';
import { CheckCircle2, Calendar, Clock, Globe, Video, Download, RefreshCw, XCircle, ArrowLeft } from 'lucide-react';

interface ScheduleConfirmationProps {
  selectedDate: string;
  selectedTime: string;
  selectedTimezone: string;
  prospect: {
    name: string;
    email: string;
    company: string;
  };
  onReset?: () => void;
}

export const ScheduleConfirmation: React.FC<ScheduleConfirmationProps> = ({
  selectedDate,
  selectedTime,
  selectedTimezone,
  prospect,
  onReset,
}) => {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
      {/* Success Hero Header */}
      <div className="p-8 bg-[#080B10] border-2 border-[#0099FF] space-y-4 text-center sm:text-left relative overflow-hidden shadow-[0_0_50px_rgba(0,153,255,0.15)]">
        <div className="w-12 h-12 bg-[#0099FF]/10 border border-[#0099FF]/40 rounded-full flex items-center justify-center text-[#0099FF] mx-auto sm:mx-0">
          <CheckCircle2 className="w-6 h-6" />
        </div>

        <div className="space-y-1">
          <span className="font-mono text-xs text-[#0099FF] uppercase tracking-widest font-bold block">
            [ SCHEDULE CONFIRMED ]
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            MEETING CONFIRMED.
          </h2>
          <p className="text-sm sm:text-base text-[#8D949E]">
            Your discovery conversation has been scheduled.
          </p>
        </div>
      </div>

      {/* Confirmed Details Block */}
      <div className="p-6 sm:p-8 bg-[#050505] border border-white/10 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-xs border-b border-white/10 pb-6">
          <div className="space-y-1">
            <span className="text-[#8D949E] text-[10px] uppercase block">PROSPECT</span>
            <span className="text-white font-bold text-sm block">{prospect.name}</span>
            <span className="text-[#8D949E] block">{prospect.email}</span>
            {prospect.company && <span className="text-[#0099FF] block">{prospect.company}</span>}
          </div>

          <div className="space-y-1">
            <span className="text-[#8D949E] text-[10px] uppercase block">MEETING TYPE</span>
            <span className="text-white font-bold text-sm block">DISCOVERY CALL</span>
            <span className="text-[#0099FF] block">30 MINUTES DURATION</span>
            <span className="text-[#8D949E] text-[10px] block">REQUEST ID: REQ-2026-8812</span>
          </div>
        </div>

        {/* Date, Time, Timezone */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-3 bg-[#080B10] border border-white/10 space-y-1">
            <div className="text-[#8D949E] text-[10px] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#0099FF]" />
              <span>DATE</span>
            </div>
            <div className="text-white font-bold">{selectedDate}</div>
          </div>

          <div className="p-3 bg-[#080B10] border border-white/10 space-y-1">
            <div className="text-[#8D949E] text-[10px] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#0099FF]" />
              <span>TIME</span>
            </div>
            <div className="text-white font-bold">{selectedTime}</div>
          </div>

          <div className="p-3 bg-[#080B10] border border-white/10 space-y-1">
            <div className="text-[#8D949E] text-[10px] flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#0099FF]" />
              <span>TIMEZONE</span>
            </div>
            <div className="text-white font-bold truncate">{selectedTimezone}</div>
          </div>
        </div>

        {/* Virtual Meeting URL Placeholder */}
        <div className="p-4 bg-[#080B10] border border-white/10 space-y-2">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-[#8D949E] flex items-center gap-2">
              <Video className="w-4 h-4 text-[#0099FF]" />
              CONFIRMED VIDEO LINK:
            </span>
            <span className="text-[10px] text-[#0099FF]">SECURE ROOM</span>
          </div>
          <div className="font-mono text-xs text-white bg-[#050505] p-2.5 border border-white/10 select-all">
            https://meet.magniar.com/disc-98213-apex
          </div>
        </div>

        {/* Calendar Export Actions */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => alert('Calendar event export simulated.')}
            className="px-5 py-2.5 bg-white/5 border border-white/15 text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer flex-1"
          >
            <Calendar className="w-4 h-4 text-[#0099FF]" />
            <span>ADD TO GOOGLE CALENDAR</span>
          </button>

          <button
            type="button"
            onClick={() => alert('.ics download simulated.')}
            className="px-5 py-2.5 bg-white/5 border border-white/15 text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer flex-1"
          >
            <Download className="w-4 h-4 text-[#0099FF]" />
            <span>DOWNLOAD .ICS FILE</span>
          </button>
        </div>

        {/* Reschedule / Cancel actions */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-[#8D949E]">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => alert('Reschedule flow placeholder.')}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3 text-[#0099FF]" />
              <span>RESCHEDULE</span>
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => alert('Cancel flow placeholder.')}
              className="hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <XCircle className="w-3 h-3 text-red-400" />
              <span>CANCEL MEETING</span>
            </button>
          </div>

          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="text-[#0099FF] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>BACK TO SCHEDULING DEMO</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
