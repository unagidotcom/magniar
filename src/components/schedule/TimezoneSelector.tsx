import React from 'react';
import { TIMEZONE_OPTIONS, TimezoneOption } from '../../data/contactData';
import { Globe } from 'lucide-react';

interface TimezoneSelectorProps {
  selectedTimezone: string;
  onSelectTimezone: (tz: string) => void;
}

export const TimezoneSelector: React.FC<TimezoneSelectorProps> = ({
  selectedTimezone,
  onSelectTimezone,
}) => {
  const currentTzObj = TIMEZONE_OPTIONS.find((t) => t.value === selectedTimezone) || TIMEZONE_OPTIONS[0];

  return (
    <div className="space-y-2">
      <label htmlFor="tz-select" className="flex items-center gap-2 font-mono text-xs text-white uppercase font-bold">
        <Globe className="w-3.5 h-3.5 text-[#0099FF]" />
        <span>TIMEZONE ({currentTzObj.offset})</span>
      </label>

      <div className="relative">
        <select
          id="tz-select"
          value={selectedTimezone}
          onChange={(e) => onSelectTimezone(e.target.value)}
          className="w-full px-4 py-3 bg-[#080B10] border border-white/15 focus:border-[#0099FF] text-white text-xs sm:text-sm font-mono focus:outline-none transition-colors cursor-pointer appearance-none pr-10"
        >
          {TIMEZONE_OPTIONS.map((tz: TimezoneOption) => (
            <option key={tz.value} value={tz.value} className="bg-[#050505] text-white">
              {tz.label} ({tz.offset})
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/40 text-xs font-mono">
          ▼
        </div>
      </div>
    </div>
  );
};
