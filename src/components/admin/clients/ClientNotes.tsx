import React, { useState } from 'react';
import { ClientNote } from '../../../types/clients';
import { Lock, Plus, MessageSquare, ShieldAlert } from 'lucide-react';

interface ClientNotesProps {
  notes: ClientNote[];
  onAddNote: (text: string) => void;
}

export const ClientNotes: React.FC<ClientNotesProps> = ({ notes, onAddNote }) => {
  const [noteText, setNoteText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    onAddNote(noteText);
    setNoteText('');
  };

  return (
    <div className="space-y-4 font-mono text-xs">
      <div className="bg-[#0A0A0C] p-4 border border-white/10 rounded-[2px] flex items-center justify-between">
        <div>
          <h3 className="font-bold text-white text-sm uppercase flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-400" />
            <span>INTERNAL ACCOUNT NOTES (MAGNIAR PRIVATE)</span>
          </h3>
          <p className="text-white/40 text-[11px] mt-0.5">
            Internal team briefing, communication preferences, and confidential strategic notes.
          </p>
        </div>
        <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold text-[10px] rounded-[2px]">
          NEVER VISIBLE IN CLIENT PORTAL
        </span>
      </div>

      {/* Add note form */}
      <form onSubmit={handleSubmit} className="p-4 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-3">
        <div>
          <label className="block text-[10px] text-white/40 uppercase mb-1">Appended Internal Note</label>
          <textarea
            rows={3}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Log internal feedback, team preferences, budget constraints, or account notes..."
            className="w-full bg-[#050505] border border-white/10 rounded-[2px] p-3 text-white focus:outline-none focus:border-[#0099FF] text-xs"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!noteText.trim()}
            className="px-4 py-2 bg-[#0099FF] hover:bg-[#0099FF]/80 disabled:opacity-40 text-white font-bold rounded-[2px]"
          >
            + Append Internal Note
          </button>
        </div>
      </form>

      {/* Notes list */}
      <div className="space-y-3">
        {notes.map((nt) => (
          <div key={nt.id} className="p-4 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-2">
            <div className="flex items-center justify-between text-[10px] text-white/40 border-b border-white/5 pb-2">
              <span className="text-white/80 font-bold">{nt.author}</span>
              <span>{nt.created_at}</span>
            </div>
            <p className="text-white/80 text-xs leading-relaxed">{nt.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
