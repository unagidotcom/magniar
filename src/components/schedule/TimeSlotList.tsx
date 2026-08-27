import React from 'react';
import { DEMO_TIME_SLOTS, TimeSlot } from '../../data/contactData';
import { Clock } from 'lucide-react';

interface TimeSlotListProps {
  selectedSlotId: string | null;
  onSelectSlot: (slot: TimeSlot) => void;
}

export const TimeSlotList: React.FC<TimeSlotListProps> = ({
  selectedSlotId,
  onSelectSlot,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between font-mono text-xs">
        <span className="text-white font-bold flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#B89A72]" />
          <span>SELECT START TIME</span>
        </span>
        <span className="text-[#8D949E] text-[10px]">30 MIN DURATION</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {DEMO_TIME_SLOTS.map((slot) => {
          const isSelected = selectedSlotId === slot.id;

          return (
            <button
              key={slot.id}
              type="button"
              disabled={!slot.available}
              onClick={() => slot.available && onSelectSlot(slot)}
              className={`py-3 px-4 border font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                !slot.available
                  ? 'bg-white/5 border-white/5 text-white/20 cursor-not-allowed line-through'
                  : isSelected
                  ? 'bg-[#B89A72] border-[#B89A72] text-white shadow-[0_0_20px_rgba(184,154,114,0.3)]'
                  : 'bg-[#080B10] border-white/10 text-white hover:border-[#B89A72]/50 hover:bg-white/5'
              }`}
            >
              <span>{slot.time12}</span>
              <span className="text-[10px] opacity-70">
                {isSelected ? '✓' : slot.available ? 'OPEN' : 'BUSY'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
