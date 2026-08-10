import React from 'react';
import { X, Briefcase, Compass, ArrowRight } from 'lucide-react';

interface NewProjectModalPlaceholderProps {
  isOpen: boolean;
  onClose: () => void;
  projectName?: string;
}

export const NewProjectModalPlaceholder: React.FC<NewProjectModalPlaceholderProps> = ({
  isOpen,
  onClose,
  projectName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0A0A0C] border border-[#0099FF]/40 rounded-[2px] w-full max-w-md p-6 space-y-5 font-mono text-xs text-white relative">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[#0099FF]" />
            <h3 className="font-bold text-sm text-white uppercase">PROJECT MANAGEMENT MODULE</h3>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 py-2 text-center">
          <div className="w-12 h-12 rounded-full bg-[#0099FF]/10 border border-[#0099FF]/30 text-[#0099FF] flex items-center justify-center mx-auto">
            <Compass className="w-6 h-6 animate-pulse" />
          </div>
          <h4 className="font-bold text-base text-white">CHAPTER COMING NEXT</h4>
          <p className="text-white/70 leading-relaxed text-xs">
            {projectName
              ? `Selected Project: "${projectName}".`
              : 'The dedicated Projects Management System module will be introduced in the upcoming Chapter.'}
          </p>
          <div className="p-3 bg-[#050505] border border-white/10 rounded-[2px] text-[11px] text-white/50 text-left">
            Active engagements are linked to client 360° records and track milestones, deliverables, platform builds, and sprint progress.
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#0099FF] hover:bg-[#0099FF]/80 text-white font-bold rounded-[2px]"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};
