import React, { useState } from 'react';
import { TimeSlot } from '../../data/contactData';
import { Calendar, Clock, Globe, ArrowRight, User, Mail, Building2, CheckCircle2 } from 'lucide-react';

interface ScheduleSummaryProps {
  selectedDate: string;
  selectedSlot: TimeSlot | null;
  selectedTimezone: string;
  onConfirm: (prospectInfo: { name: string; email: string; company: string }) => void;
  isConfirming?: boolean;
}

export const ScheduleSummary: React.FC<ScheduleSummaryProps> = ({
  selectedDate,
  selectedSlot,
  selectedTimezone,
  onConfirm,
  isConfirming = false,
}) => {
  const [prospect, setProspect] = useState({
    name: 'Sarah Vance',
    email: 'sarah@apexcommerce.com',
    company: 'Apex Commerce',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSlot && prospect.name && prospect.email) {
      onConfirm(prospect);
    }
  };

  const formatDateDisplay = (dateStr: string) => {
    // e.g. 2026-08-11 -> Tuesday, August 11, 2026
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const year = parts[0];
      const day = parseInt(parts[2], 10);
      return `August ${day}, ${year}`;
    }
    return dateStr;
  };

  return (
    <div className="p-6 sm:p-8 bg-[#080B10] border border-white/10 space-y-6">
      <div className="pb-4 border-b border-white/10 space-y-1">
        <span className="font-mono text-xs text-[#0099FF] uppercase font-bold tracking-widest block">
          [ MEETING SUMMARY ]
        </span>
        <h3 className="text-xl font-bold text-white uppercase">
          DISCOVERY CONVERSATION
        </h3>
      </div>

      {/* Selected Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
        <div className="p-3 bg-[#050505] border border-white/10 space-y-1">
          <div className="text-[#8D949E] text-[10px] flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#0099FF]" />
            <span>DATE</span>
          </div>
          <div className="text-white font-bold">
            {formatDateDisplay(selectedDate)}
          </div>
        </div>

        <div className="p-3 bg-[#050505] border border-white/10 space-y-1">
          <div className="text-[#8D949E] text-[10px] flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#0099FF]" />
            <span>TIME & DURATION</span>
          </div>
          <div className="text-white font-bold">
            {selectedSlot ? `${selectedSlot.time12} (30 MIN)` : 'SELECT TIME'}
          </div>
        </div>

        <div className="p-3 bg-[#050505] border border-white/10 space-y-1">
          <div className="text-[#8D949E] text-[10px] flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#0099FF]" />
            <span>TIMEZONE</span>
          </div>
          <div className="text-white font-bold truncate">
            {selectedTimezone}
          </div>
        </div>
      </div>

      {/* Prospect Details Form */}
      <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-white/10">
        <span className="font-mono text-xs text-white uppercase font-bold block">
          PROSPECT DETAILS
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="block font-mono text-[10px] text-[#8D949E] uppercase flex items-center gap-1">
              <User className="w-3 h-3 text-[#0099FF]" />
              NAME
            </label>
            <input
              type="text"
              required
              value={prospect.name}
              onChange={(e) => setProspect({ ...prospect, name: e.target.value })}
              className="w-full px-3 py-2 bg-[#050505] border border-white/15 focus:border-[#0099FF] text-white text-xs font-sans focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-mono text-[10px] text-[#8D949E] uppercase flex items-center gap-1">
              <Mail className="w-3 h-3 text-[#0099FF]" />
              EMAIL
            </label>
            <input
              type="email"
              required
              value={prospect.email}
              onChange={(e) => setProspect({ ...prospect, email: e.target.value })}
              className="w-full px-3 py-2 bg-[#050505] border border-white/15 focus:border-[#0099FF] text-white text-xs font-sans focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-mono text-[10px] text-[#8D949E] uppercase flex items-center gap-1">
              <Building2 className="w-3 h-3 text-[#0099FF]" />
              COMPANY
            </label>
            <input
              type="text"
              value={prospect.company}
              onChange={(e) => setProspect({ ...prospect, company: e.target.value })}
              className="w-full px-3 py-2 bg-[#050505] border border-white/15 focus:border-[#0099FF] text-white text-xs font-sans focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={!selectedSlot || isConfirming}
            className="w-full py-4 bg-[#0099FF] text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#0088EE] disabled:opacity-40 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,153,255,0.25)]"
          >
            {isConfirming ? (
              <span>CONFIRMING SCHEDULE...</span>
            ) : (
              <>
                <span>CONFIRM MEETING</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
