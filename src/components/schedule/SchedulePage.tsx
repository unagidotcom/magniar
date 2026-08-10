import React, { useState } from 'react';
import { ScheduleHero } from './ScheduleHero';
import { ScheduleCalendar } from './ScheduleCalendar';
import { TimeSlotList } from './TimeSlotList';
import { TimezoneSelector } from './TimezoneSelector';
import { ScheduleSummary } from './ScheduleSummary';
import { ScheduleConfirmation } from './ScheduleConfirmation';
import { TimeSlot, TIMEZONE_OPTIONS } from '../../data/contactData';
import { ShieldCheck, Info } from 'lucide-react';

export const SchedulePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-11');
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>({
    id: 'slot-2',
    time24: '10:30',
    time12: '10:30 AM',
    available: true,
  });
  const [selectedTimezone, setSelectedTimezone] = useState<string>('Asia/Kolkata');
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [prospectInfo, setProspectInfo] = useState({
    name: 'Sarah Vance',
    email: 'sarah@apexcommerce.com',
    company: 'Apex Commerce',
  });

  const handleConfirmMeeting = (prospectData: { name: string; email: string; company: string }) => {
    setProspectInfo(prospectData);
    setIsConfirmed(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setIsConfirmed(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F7FA] font-sans antialiased">
      {/* Schedule Hero */}
      <ScheduleHero />

      {/* Main Scheduling Canvas */}
      <div className="py-12 sm:py-20 border-b border-white/10 bg-[#080B10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isConfirmed ? (
            <ScheduleConfirmation
              selectedDate={selectedDate}
              selectedTime={selectedSlot?.time12 || '10:30 AM'}
              selectedTimezone={selectedTimezone}
              prospect={prospectInfo}
              onReset={handleReset}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Calendar, Time Slots & Timezone */}
              <div className="lg:col-span-7 space-y-8 p-6 sm:p-8 bg-[#050505] border border-white/10">
                {/* Protocol Note */}
                <div className="p-4 bg-[#0A0D12] border border-[#0099FF]/30 text-xs font-mono text-[#8D949E] flex items-start gap-3">
                  <Info className="w-4 h-4 text-[#0099FF] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-bold block">CONTROLLED ACCESS SCHEDULING</span>
                    <span>This page is accessible via invitation or qualified project submission. All sessions are 30-minute structured discovery conversations.</span>
                  </div>
                </div>

                {/* 1. Timezone Selector */}
                <TimezoneSelector
                  selectedTimezone={selectedTimezone}
                  onSelectTimezone={setSelectedTimezone}
                />

                {/* 2. Date Selection */}
                <ScheduleCalendar
                  selectedDate={selectedDate}
                  onSelectDate={(date) => {
                    setSelectedDate(date);
                    setSelectedSlot(null);
                  }}
                />

                {/* 3. Time Slots */}
                <TimeSlotList
                  selectedSlotId={selectedSlot?.id || null}
                  onSelectSlot={(slot) => setSelectedSlot(slot)}
                />
              </div>

              {/* Right Column: Meeting Summary & Prospect Info */}
              <div className="lg:col-span-5 sticky top-24">
                <ScheduleSummary
                  selectedDate={selectedDate}
                  selectedSlot={selectedSlot}
                  selectedTimezone={selectedTimezone}
                  onConfirm={handleConfirmMeeting}
                />

                <div className="mt-4 p-4 bg-[#050505] border border-white/10 flex items-center gap-3 font-mono text-[11px] text-[#8D949E]">
                  <ShieldCheck className="w-4 h-4 text-[#0099FF] shrink-0" />
                  <span>SYNCHRONIZED WITH MAGNIAR ENGINE • NO OPEN PUBLIC CALENDARS</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
