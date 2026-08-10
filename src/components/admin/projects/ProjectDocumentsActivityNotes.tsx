import React, { useState } from 'react';
import { Project, ProjectDocument, ProjectActivity, ProjectNote } from '../../../types/projects';
import { FileText, Download, History, MessageSquare, Lock, Eye, Plus, Send, Shield } from 'lucide-react';

interface ProjectDocumentsActivityNotesProps {
  project: Project;
  onAddNote: (text: string, author: string) => void;
}

export const ProjectDocumentsActivityNotes: React.FC<ProjectDocumentsActivityNotesProps> = ({
  project,
  onAddNote,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'DOCUMENTS' | 'ACTIVITY' | 'NOTES'>('DOCUMENTS');
  const [newNoteText, setNewNoteText] = useState('');

  const handleNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    onAddNote(newNoteText, 'Kaelen Voss (Staff)');
    setNewNoteText('');
  };

  return (
    <div className="p-4 bg-[#0A0A0C] border border-white/10 rounded-[2px] font-mono text-xs space-y-4">
      {/* Tab Switcher Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-3 gap-2">
        <div className="flex items-center gap-1 bg-[#050505] p-1 border border-white/10 rounded-[2px]">
          <button
            onClick={() => setActiveSubTab('DOCUMENTS')}
            className={`px-3 py-1.5 font-bold rounded-[2px] text-[11px] flex items-center gap-1.5 transition-colors ${
              activeSubTab === 'DOCUMENTS'
                ? 'bg-[#0099FF] text-white'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>PROJECT DOCUMENTS ({project.documents.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('ACTIVITY')}
            className={`px-3 py-1.5 font-bold rounded-[2px] text-[11px] flex items-center gap-1.5 transition-colors ${
              activeSubTab === 'ACTIVITY'
                ? 'bg-[#0099FF] text-white'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>ACTIVITY AUDIT LOG ({project.activities.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('NOTES')}
            className={`px-3 py-1.5 font-bold rounded-[2px] text-[11px] flex items-center gap-1.5 transition-colors ${
              activeSubTab === 'NOTES'
                ? 'bg-[#0099FF] text-white'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>INTERNAL NOTES ({project.notes.length})</span>
          </button>
        </div>

        <div className="text-[10px] text-white/40 flex items-center gap-1">
          <Shield className="w-3.5 h-3.5 text-[#0099FF]" />
          <span>ROLE-BASED ACCESS ENFORCED</span>
        </div>
      </div>

      {/* Tab 1: Documents */}
      {activeSubTab === 'DOCUMENTS' && (
        <div className="space-y-3">
          <p className="text-white/50 text-[11px]">
            Contracts, briefs, reports, and strategic assets linked to this project.
          </p>

          <div className="space-y-2">
            {project.documents.length === 0 ? (
              <div className="p-4 text-center text-white/40 border border-white/5 rounded-[2px]">
                No files uploaded to this project repository.
              </div>
            ) : (
              project.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3 bg-[#050505] border border-white/10 rounded-[2px] flex items-center justify-between gap-3 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 border border-white/10 rounded text-[#0099FF]">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs">{doc.name}</div>
                      <div className="text-[10px] text-white/40">
                        Uploaded {doc.uploaded_at} • {doc.size}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {doc.visibility === 'CLIENT_VISIBLE' ? (
                      <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-bold rounded flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        CLIENT VISIBLE
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[9px] font-bold rounded flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        INTERNAL ONLY
                      </span>
                    )}

                    <button
                      type="button"
                      className="p-1.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded border border-white/10"
                      title="Download Document"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Activity Audit Log */}
      {activeSubTab === 'ACTIVITY' && (
        <div className="space-y-3">
          <p className="text-white/50 text-[11px]">
            Chronological audit trail of project state changes, completions, and milestone updates.
          </p>

          <div className="space-y-2 border-l border-white/10 pl-4 ml-2">
            {project.activities.length === 0 ? (
              <div className="p-3 text-white/40 text-[11px]">No activity history recorded.</div>
            ) : (
              project.activities.map((act) => (
                <div key={act.id} className="relative space-y-1 py-1">
                  <div className="absolute -left-[21px] top-2 w-2.5 h-2.5 rounded-full bg-[#0099FF] border-2 border-[#0A0A0C]" />
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-white">{act.title}</span>
                    <span className="text-[10px] text-white/40">{act.timestamp}</span>
                  </div>
                  <p className="text-white/60 text-[11px]">{act.description}</p>
                  <div className="text-[10px] text-white/40">By: {act.author}</div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Internal Notes */}
      {activeSubTab === 'NOTES' && (
        <div className="space-y-4">
          <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-[2px] text-amber-300 text-[11px] flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 shrink-0" />
            <span>Internal team communications. Never exposed to external client portals.</span>
          </div>

          {/* Add Note Form */}
          <form onSubmit={handleNoteSubmit} className="space-y-2">
            <textarea
              rows={2}
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              placeholder="Type an internal team note, reminder, or operational update..."
              className="w-full bg-[#050505] border border-white/10 rounded-[2px] p-2.5 text-white text-xs focus:outline-none focus:border-[#0099FF]"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-3 py-1.5 bg-[#0099FF] hover:bg-[#0099FF]/90 text-white rounded-[2px] font-bold text-xs flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Internal Note</span>
              </button>
            </div>
          </form>

          {/* Notes List */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            {project.notes.length === 0 ? (
              <div className="p-3 text-center text-white/40 border border-white/5 rounded-[2px]">
                No internal notes recorded yet.
              </div>
            ) : (
              project.notes.map((nt) => (
                <div key={nt.id} className="p-3 bg-[#050505] border border-white/10 rounded-[2px] space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-white/40">
                    <span className="font-bold text-[#0099FF]">{nt.author}</span>
                    <span>{nt.created_at}</span>
                  </div>
                  <p className="text-white/80 text-[11px] leading-relaxed">{nt.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
