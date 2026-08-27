import React, { useState } from 'react';
import { COLOR_TOKENS, TYPOGRAPHY_SCALE, SPACING_TOKENS, RADIUS_TOKENS, MOTION_TOKENS } from '../../data/tokens';
import { Code, Copy, Check, Download, FileJson, Code2 } from 'lucide-react';

export const TokensExporterSection: React.FC = () => {
  const [activeFormat, setActiveFormat] = useState<'json' | 'css' | 'tailwind'>('json');
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const tokenJsonObject = {
    $schema: 'https://magniar.com/schemas/design-tokens-v1.json',
    meta: {
      system: 'MAGNIAR DESIGN FOUNDATION',
      version: '1.0.0',
      chapter: '01',
      updatedAt: '2026-08-08'
    },
    colors: COLOR_TOKENS,
    typography: TYPOGRAPHY_SCALE,
    spacing: SPACING_TOKENS,
    radii: RADIUS_TOKENS,
    motion: MOTION_TOKENS
  };

  const cssVariablesString = `:root {
  /* Magniar Color Tokens */
  --magniar-bg: #050505;
  --magniar-surface: #0A0C0F;
  --magniar-surface-elevated: #101318;
  --magniar-text-primary: #F5F7FA;
  --magniar-text-secondary: #8D949E;
  --magniar-text-muted: #5A626E;
  --magniar-border: rgba(255, 255, 255, 0.08);
  --magniar-border-active: rgba(184, 154, 114, 0.40);
  --magniar-accent: #B89A72;
  --magniar-accent-glow: rgba(184, 154, 114, 0.15);
  --magniar-success: #10B981;
  --magniar-warning: #F59E0B;
  --magniar-error: #EF4444;

  /* Typography Fonts */
  --font-geist: 'Geist', sans-serif;
  --font-geist-mono: 'Geist Mono', monospace;

  /* Spacing Tokens */
  --space-0-5: 2px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;
  --space-32: 128px;

  /* Radius Tokens */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 20px;

  /* Motion Timings */
  --motion-micro: 150ms cubic-bezier(0.16, 1, 0.3, 1);
  --motion-standard: 300ms cubic-bezier(0.2, 0, 0, 1);
  --motion-large: 700ms cubic-bezier(0.16, 1, 0.3, 1);
  --motion-ambient: 2.5s ease-in-out infinite;
}`;

  const tailwindConfigString = `/* Tailwind CSS v4 Theme Import */
@import "tailwindcss";

@theme {
  --color-magniar-bg: #050505;
  --color-magniar-surface: #0A0C0F;
  --color-magniar-surface-elevated: #101318;
  --color-magniar-accent: #B89A72;
  --color-magniar-text-primary: #F5F7FA;
  --color-magniar-text-secondary: #8D949E;
  
  --font-sans: 'Geist', sans-serif;
  --font-mono: 'Geist Mono', monospace;
  
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 20px;
}`;

  const getActiveCodeText = () => {
    if (activeFormat === 'json') return JSON.stringify(tokenJsonObject, null, 2);
    if (activeFormat === 'css') return cssVariablesString;
    return tailwindConfigString;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getActiveCodeText());
    setCopiedFormat(activeFormat);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(tokenJsonObject, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'magniar-design-tokens.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="space-y-2">
        <div className="font-mono text-xs uppercase tracking-wider text-[#B89A72] flex items-center gap-2">
          <span>09 / DESIGN TOKEN ENGINE & EXPORTER</span>
          <span className="h-[1px] flex-1 bg-white/10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">
          Structured Tokens Export Engine
        </h2>
        <p className="text-sm text-[#8D949E] max-w-3xl leading-relaxed">
          Export the complete Magniar Chapter 01 token specification in JSON, CSS Variables, or Tailwind CSS v4 format for seamless integration into future development chapters.
        </p>
      </div>

      {/* Code Viewer Container */}
      <div className="rounded-xl border border-white/10 bg-[#0A0C0F] overflow-hidden">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 p-4 bg-[#050505]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveFormat('json')}
              className={`px-3 py-1.5 rounded-md font-mono text-xs transition-colors flex items-center gap-1.5 border ${
                activeFormat === 'json'
                  ? 'bg-[#B89A72]/20 text-[#B89A72] border-[#B89A72]/40'
                  : 'bg-[#0A0C0F] text-[#8D949E] border-white/10 hover:text-white'
              }`}
            >
              <FileJson className="h-3.5 w-3.5" />
              <span>JSON Tokens</span>
            </button>

            <button
              onClick={() => setActiveFormat('css')}
              className={`px-3 py-1.5 rounded-md font-mono text-xs transition-colors flex items-center gap-1.5 border ${
                activeFormat === 'css'
                  ? 'bg-[#B89A72]/20 text-[#B89A72] border-[#B89A72]/40'
                  : 'bg-[#0A0C0F] text-[#8D949E] border-white/10 hover:text-white'
              }`}
            >
              <Code className="h-3.5 w-3.5" />
              <span>CSS Variables</span>
            </button>

            <button
              onClick={() => setActiveFormat('tailwind')}
              className={`px-3 py-1.5 rounded-md font-mono text-xs transition-colors flex items-center gap-1.5 border ${
                activeFormat === 'tailwind'
                  ? 'bg-[#B89A72]/20 text-[#B89A72] border-[#B89A72]/40'
                  : 'bg-[#0A0C0F] text-[#8D949E] border-white/10 hover:text-white'
              }`}
            >
              <Code className="h-3.5 w-3.5 text-[#B89A72]" />
              <span>Tailwind v4 Theme</span>
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadJson}
              className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-white hover:bg-white/10 transition-colors flex items-center gap-1.5"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download .json</span>
            </button>

            <button
              onClick={handleCopyCode}
              className="px-3 py-1.5 rounded-md bg-[#B89A72] text-black text-xs font-medium hover:bg-[#C8AA82] transition-colors flex items-center gap-1.5"
            >
              {copiedFormat === activeFormat ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>COPIED!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>COPY CODE</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-4 bg-[#050505] overflow-x-auto max-h-[500px]">
          <pre className="font-mono text-xs text-[#8D949E] leading-relaxed">
            <code>{getActiveCodeText()}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
