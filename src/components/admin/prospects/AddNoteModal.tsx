import React, { useState } from 'react';
import { AdminModal } from '../AdminModal';

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  prospectId: string;
  businessName: string;
  onSaveNote: (noteText: string, visibility: 'INTERNAL' | 'PUBLIC') => void;
}

export const AddNoteModal: React.FC<AddNoteModalProps> = ({
  isOpen,
  onClose,
  prospectId,
  businessName,
  onSaveNote,
}) => {
  const [noteText, setNoteText] = useState('');
  const [visibility, setVisibility] = useState<'INTERNAL' | 'PUBLIC'>('INTERNAL');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    onSaveNote(noteText.trim(), visibility);
    setNoteText('');
    onClose();
  };

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title="ADD STRATEGY / ACTIVITY NOTE"
      subtitle={`Append internal record to timeline for ${prospectId} (${businessName}).`}
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
        <div>
          <label className="block text-white/70 mb-1 font-semibold">Note Content *</label>
          <textarea
            rows={4}
            required
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Type note details (e.g. Discovery call feedback, ad account audit findings, client board decision...)"
            className="w-full p-2.5 bg-[#050505] border border-white/10 rounded-[2px] text-white focus:outline-none focus:border-[#0099FF] resize-none text-xs"
          />
        </div>

        <div>
          <label className="block text-white/70 mb-1 font-semibold">Visibility</label>
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value as 'INTERNAL' | 'PUBLIC')}
            className="w-full p-2 bg-[#050505] border border-white/10 rounded-[2px] text-white focus:outline-none"
          >
            <option value="INTERNAL">INTERNAL (Private to Magniar Team)</option>
            <option value="PUBLIC font-mono">PUBLIC (Visible in future Client Portal)</option>
          </select>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-[2px] border border-white/10"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-[#0099FF] hover:bg-[#0099FF]/90 text-white font-semibold rounded-[2px] shadow-lg shadow-[#0099FF]/20"
          >
            Save Note
          </button>
        </div>
      </form>
    </AdminModal>
  );
};
