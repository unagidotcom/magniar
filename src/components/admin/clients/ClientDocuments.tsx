import React from 'react';
import { ClientDocument } from '../../../types/clients';
import { FileText, Download, Lock, Eye, Plus } from 'lucide-react';

interface ClientDocumentsProps {
  documents: ClientDocument[];
  onTriggerToast: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
}

export const ClientDocuments: React.FC<ClientDocumentsProps> = ({ documents, onTriggerToast }) => {
  return (
    <div className="space-y-4 font-mono text-xs">
      <div className="bg-[#0A0A0C] p-4 border border-white/10 rounded-[2px] flex items-center justify-between">
        <div>
          <h3 className="font-bold text-white text-sm uppercase">CLIENT DOCUMENTS & ASSETS</h3>
          <p className="text-white/40 text-[11px] mt-0.5">
            Executed Master Service Agreements, strategy briefs, audits, and brand assets.
          </p>
        </div>
        <button
          onClick={() => onTriggerToast('info', 'Document Upload', 'Document upload system ready in storage module.')}
          className="px-3 py-2 bg-white/5 hover:bg-white/10 text-white font-bold rounded-[2px] border border-white/10 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      <div className="bg-[#0A0A0C] border border-white/10 rounded-[2px] divide-y divide-white/5">
        {documents.map((doc) => (
          <div key={doc.id} className="p-4 flex items-center justify-between gap-4 hover:bg-white/[0.02]">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-[2px] bg-[#0099FF]/10 border border-[#0099FF]/30 text-[#0099FF] flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="min-w-0 space-y-0.5">
                <div className="font-bold text-white text-xs truncate">{doc.name}</div>
                <div className="text-[10px] text-white/40 flex items-center gap-2">
                  <span>Type: {doc.type}</span>
                  <span>•</span>
                  <span>Size: {doc.size}</span>
                  <span>•</span>
                  <span>Uploaded: {doc.uploaded_at}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {doc.visibility === 'CLIENT_VISIBLE' ? (
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold rounded-[2px] flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>CLIENT VISIBLE</span>
                </span>
              ) : (
                <span className="px-2 py-0.5 bg-white/10 text-white/50 border border-white/20 text-[9px] font-bold rounded-[2px] flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>INTERNAL ONLY</span>
                </span>
              )}

              <button
                onClick={() => onTriggerToast('success', 'Document Download', `Downloading ${doc.name}...`)}
                className="p-1.5 text-white/40 hover:text-white hover:bg-white/10 rounded-[2px] transition-colors"
                title="Download Document"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
