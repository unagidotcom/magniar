import React, { useState } from 'react';
import { TYPOGRAPHY_SCALE, MICRO_TYPOGRAPHY_EXAMPLES } from '../../data/tokens';
import { TypographyScaleItem } from '../../types/design-system';
import { Copy, Check, Type, Terminal, RefreshCw } from 'lucide-react';

export const TypographySection: React.FC = () => {
  const [customText, setCustomText] = useState<string>('Growth Engineered.');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopySnippet = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Section Header */}
      <div className="space-y-2">
        <div className="font-mono text-xs uppercase tracking-wider text-[#0099FF] flex items-center gap-2">
          <span>02 / TYPOGRAPHY & MICRO-LANGUAGE</span>
          <span className="h-[1px] flex-1 bg-white/10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">
          Geist Font System & Micro Technical Typography
        </h2>
        <p className="text-sm text-[#8D949E] max-w-3xl leading-relaxed">
          Geist provides modern editorial precision for headlines and body content, while Geist Mono powers micro technical labels, status indicators, and coordinate system markers.
        </p>
      </div>

      {/* Interactive Sample Text Input */}
      <div className="rounded-xl border border-white/10 bg-[#0A0C0F] p-4 sm:p-6 space-y-3">
        <div className="flex items-center justify-between">
          <label className="font-mono text-xs text-[#8D949E] flex items-center gap-2">
            <Type className="h-3.5 w-3.5 text-[#0099FF]" />
            TEST CUSTOM TEXT ACCROSS TYPOGRAPHY SCALE:
          </label>
          <button
            onClick={() => setCustomText('Growth Engineered.')}
            className="font-mono text-[10px] text-[#5A626E] hover:text-[#0099FF] flex items-center gap-1"
          >
            <RefreshCw className="h-3 w-3" /> RESET DEFAULT
          </button>
        </div>
        <input
          type="text"
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          className="w-full rounded-lg bg-[#050505] border border-white/10 px-4 py-2.5 text-white font-medium focus:border-[#0099FF] focus:outline-none transition-colors"
          placeholder="Enter custom preview text..."
        />
      </div>

      {/* Typography Scale Render List */}
      <div className="space-y-4">
        <div className="font-mono text-xs text-[#5A626E] uppercase tracking-wider">
          RESPONSIVE TYPOGRAPHY SCALE (GEIST SANS)
        </div>

        {TYPOGRAPHY_SCALE.map((item: TypographyScaleItem) => (
          <div
            key={item.token}
            className="rounded-xl border border-white/10 bg-[#0A0C0F] p-5 sm:p-6 space-y-4 hover:border-white/20 transition-colors"
          >
            {/* Header Token Info */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#0099FF] bg-[#0099FF]/10 px-2 py-0.5 rounded border border-[#0099FF]/20">
                  {item.token}
                </span>
                <h3 className="text-sm font-medium text-white">{item.name}</h3>
              </div>

              <div className="flex items-center gap-3 font-mono text-[11px] text-[#8D949E]">
                <span>{item.clampValue}</span>
                <span className="text-white/20">|</span>
                <span>{item.weight}</span>
              </div>
            </div>

            {/* Live Render Preview */}
            <div className="py-2 overflow-x-auto">
              <div 
                className="text-white font-semibold tracking-tight leading-tight"
                style={{ fontSize: item.clampValue }}
              >
                {customText || item.sampleText}
              </div>
            </div>

            {/* Context & Rule */}
            <div className="pt-2 font-mono text-[11px] text-[#5A626E] flex items-center justify-between">
              <span>USAGE: {item.usageContext}</span>
              <span>TRACKING: {item.letterSpacing}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Micro Typography Technical Language */}
      <div className="space-y-4 pt-4">
        <div className="font-mono text-xs text-[#0099FF] uppercase tracking-wider flex items-center gap-2">
          <span>MICRO TECHNICAL TYPOGRAPHY LANGUAGE (GEIST MONO)</span>
          <span className="h-[1px] flex-1 bg-white/10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MICRO_TYPOGRAPHY_EXAMPLES.map((micro, idx) => (
            <div
              key={micro.category}
              className="rounded-xl border border-white/10 bg-[#0A0C0F] p-5 space-y-3"
            >
              <div className="flex items-center justify-between font-mono text-xs text-[#8D949E]">
                <span>{micro.category}</span>
                <button
                  onClick={() => handleCopySnippet(micro.codeSnippet, idx)}
                  className="text-[#8D949E] hover:text-[#0099FF] flex items-center gap-1 text-[11px]"
                >
                  {copiedIndex === idx ? (
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  <span>{copiedIndex === idx ? 'COPIED' : 'HTML'}</span>
                </button>
              </div>

              {/* Rendered Result */}
              <div className="p-3 rounded-lg bg-[#050505] border border-white/10 flex items-center min-h-[48px]">
                <div dangerouslySetInnerHTML={{ __html: micro.codeSnippet }} />
              </div>

              <p className="text-xs text-[#5A626E] font-mono">{micro.context}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
