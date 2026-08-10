import React, { useState } from 'react';
import { SPECIFICATION_CHAPTERS } from '../../data/specifications';
import { BookOpen, Search, Copy, Check, FileText } from 'lucide-react';

export const FullSpecificationSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const filteredChapters = SPECIFICATION_CHAPTERS.filter(ch =>
    ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ch.sectionCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ch.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyAllSpec = () => {
    const fullText = SPECIFICATION_CHAPTERS.map(ch => 
      `### ${ch.sectionCode}: ${ch.title}\n\n${ch.content}\n\nKey Takeaways:\n${ch.keyTakeaways.map(k => `- ${k}`).join('\n')}\n`
    ).join('\n---\n\n');

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="space-y-2">
        <div className="font-mono text-xs uppercase tracking-wider text-[#0099FF] flex items-center gap-2">
          <span>10 / FULL SPECIFICATION DOCUMENT READER</span>
          <span className="h-[1px] flex-1 bg-white/10" />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white">
            Magniar Design Foundation Specification Document
          </h2>

          <button
            onClick={handleCopyAllSpec}
            className="px-3.5 py-2 rounded-lg bg-[#0099FF] text-black text-xs font-medium hover:bg-[#33AFFF] transition-colors flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>FULL SPECIFICATION COPIED</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>COPY ENTIRE SPECIFICATION</span>
              </>
            )}
          </button>
        </div>
        <p className="text-sm text-[#8D949E] max-w-3xl leading-relaxed">
          Complete authoritative text output documenting all 20 output sections for Chapter 01 Design Foundation.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8D949E]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter specification chapters, tokens, or rules..."
          className="w-full rounded-xl bg-[#0A0C0F] border border-white/10 pl-10 pr-4 py-3 text-sm text-white focus:border-[#0099FF] focus:outline-none transition-colors"
        />
      </div>

      {/* Chapters Document Rendering */}
      <div className="space-y-6">
        {filteredChapters.map((chapter) => (
          <div
            key={chapter.id}
            className="rounded-xl border border-white/10 bg-[#0A0C0F] p-6 space-y-4 hover:border-white/20 transition-colors"
          >
            <div className="flex items-center gap-3 border-b border-white/5 pb-3">
              <span className="font-mono text-xs text-[#0099FF] bg-[#0099FF]/10 px-2 py-0.5 rounded border border-[#0099FF]/20">
                {chapter.sectionCode}
              </span>
              <h3 className="text-lg font-semibold text-white">{chapter.title}</h3>
            </div>

            <p className="text-xs sm:text-sm text-[#8D949E] leading-relaxed whitespace-pre-line">
              {chapter.content}
            </p>

            <div className="pt-2 border-t border-white/5 space-y-2">
              <span className="font-mono text-[11px] text-[#0099FF]">KEY SPECIFICATION DIRECTIVES:</span>
              <ul className="space-y-1">
                {chapter.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="text-xs text-[#F5F7FA] font-mono flex items-start gap-2">
                    <span className="text-[#0099FF]">•</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
