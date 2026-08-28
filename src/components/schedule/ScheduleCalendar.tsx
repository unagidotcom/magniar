import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

export interface CalendarDay {
  dateString: string; // YYYY-MM-DD
  dayNumber: number;
  dayName: string; // Mon, Tue, etc.
  monthName: string; // Aug, Sep
  isAvailable: boolean;
  isToday?: boolean;
}

interface ScheduleCalendarProps {
  selectedDate: string;
  onSelectDate: (dateString: string) => void;
}

export const ScheduleCalendar: React.FC<ScheduleCalendarProps> = ({
  selectedDate,
  onSelectDate,
}) => {
  // Generate sample upcoming business days for August 2026
  const sampleDays: CalendarDay[] = [
    { dateString: '2026-08-10', dayNumber: 10, dayName: 'MON', monthName: 'AUG', isAvailable: true },
    { dateString: '2026-08-11', dayNumber: 11, dayName: 'TUE', monthName: 'AUG', isAvailable: true },
    { dateString: '2026-08-12', dayNumber: 12, dayName: 'WED', monthName: 'AUG', isAvailable: true },
    { dateString: '2026-08-13', dayNumber: 13, dayName: 'THU', monthName: 'AUG', isAvailable: true },
    { dateString: '2026-08-14', dayNumber: 14, dayName: 'FRI', monthName: 'AUG', isAvailable: true },
    { dateString: '2026-08-17', dayNumber: 17, dayName: 'MON', monthName: 'AUG', isAvailable: true },
    { dateString: '2026-08-18', dayNumber: 18, dayName: 'TUE', monthName: 'AUG', isAvailable: true },
    { dateString: '2026-08-19', dayNumber: 19, dayName: 'WED', monthName: 'AUG', isAvailable: true },
    { dateString: '2026-08-20', dayNumber: 20, dayName: 'THU', monthName: 'AUG', isAvailable: true },
    { dateString: '2026-08-21', dayNumber: 21, dayName: 'FRI', monthName: 'AUG', isAvailable: true },
  ];

  return (
    <div className="space-y-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between font-mono text-xs pb-3 border-b border-white/10">
        <span className="text-white font-bold flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-[#B89A72]" />
          <span>AUGUST 2026</span>
        </span>
        <div className="flex items-center gap-1 text-white/40">
          <button
            type="button"
            className="p-1 hover:text-white transition-colors cursor-not-allowed opacity-50"
            disabled
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-[10px] text-[#B89A72]">UPCOMING 2 WEEKS</span>
          <button
            type="button"
            className="p-1 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid of Dates (Desktop & Mobile Responsive Grid) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {sampleDays.map((day) => {
          const isSelected = selectedDate === day.dateString;

          return (
            <button
              key={day.dateString}
              type="button"
              onClick={() => onSelectDate(day.dateString)}
              className={`p-3 border text-left font-mono transition-all cursor-pointer flex flex-col justify-between h-20 ${
                isSelected
                  ? 'bg-[#B89A72] border-[#B89A72] text-white shadow-[0_0_20px_rgba(184,154,114,0.3)]'
                  : 'bg-[#080B10] border-white/10 text-white hover:border-[#B89A72]/50 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] opacity-80">
                <span>{day.dayName}</span>
                <span>{day.monthName}</span>
              </div>

              <div className="text-xl font-bold font-sans tracking-tight">
                {day.dayNumber}
              </div>

              <div className="text-[9px] uppercase tracking-wider font-semibold">
                {isSelected ? 'SELECTED' : 'AVAILABLE'}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
