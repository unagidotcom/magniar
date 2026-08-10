import React, { useState } from 'react';
import { COLOR_TOKENS } from '../../data/tokens';
import { ColorToken } from '../../types/design-system';
import { Copy, Check, Eye, AlertTriangle, ShieldCheck, Info } from 'lucide-react';

export const ColorSystemSection: React.FC = () => {
  const [copiedVar, setCopiedVar] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleCopy = (text: string, varName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedVar(varName);
    setTimeout(() => setCopiedVar(null), 2000);
  };

  const categories = [
    { id: 'all', label: 'All Tokens' },
    { id: 'base', label: 'Base & Canvas' },
    { id: 'surface', label: 'Surfaces' },
    { id: 'text', label: 'Typography' },
    { id: 'border', label: 'Borders' },
    { id: 'accent', label: 'Electric Blue Signal' },
    { id: 'semantic', label: 'Semantic Data' },
  ];

  const filteredTokens = selectedCategory === 'all' 
    ? COLOR_TOKENS 
    : COLOR_TOKENS.filter(t => t.category === selectedCategory);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="space-y-2">
        <div className="font-mono text-xs uppercase tracking-wider text-[#0099FF] flex items-center gap-2">
          <span>01 / COLOR SYSTEM & SIGNAL BEHAVIOR</span>
          <span className="h-[1px] flex-1 bg-white/10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">
          Restrained Dark Palette & Electric Blue Signal
        </h2>
        <p className="text-sm text-[#8D949E] max-w-3xl leading-relaxed">
          The Magniar palette is anchored by near-black canvases (#050505) and cool charcoal surfaces (#0A0C0F). Electric Blue (#0099FF) is strictly reserved as an active signal, highlight, or status indicator—never as a dominant background fill.
        </p>
      </div>

      {/* Signal Rule Banner */}
      <div className="rounded-xl border border-[#0099FF]/30 bg-[#0A0C0F] p-6 space-y-4">
        <div className="flex items-center gap-2 text-white font-medium text-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0099FF] animate-magniar-pulse" />
          <span>CRITICAL BEHAVIORAL RULE: ELECTRIC BLUE IS A SIGNAL</span>
        </div>
        <p className="text-xs text-[#8D949E] leading-relaxed">
          The majority of the interface remains black, charcoal, white, and gray. Electric blue attracts intentional user focus when an element is active, selected, performing, or requires action.
        </p>

        {/* Live Good vs Bad Signal Demonstration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* GOOD DEMO */}
          <div className="p-4 rounded-lg bg-[#050505] border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#10B981]">
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> MAGNIAR STANDARD (DO)</span>
              <span>10% ACCENT SIGNAL</span>
            </div>
            <div className="p-3 rounded-md bg-[#0A0C0F] border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-white">ROAS Metric Tracking</p>
                <p className="text-[10px] text-[#8D949E]">Updated 2m ago</p>
              </div>
              <span className="font-mono text-xs text-[#0099FF] bg-[#0099FF]/10 px-2 py-1 rounded border border-[#0099FF]/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0099FF] animate-magniar-pulse" />
                4.82x
              </span>
            </div>
            <p className="text-[11px] text-[#8D949E]">Clean charcoal surface with electric blue applied strictly to the active metric value.</p>
          </div>

          {/* BAD DEMO */}
          <div className="p-4 rounded-lg bg-[#050505] border border-red-500/20 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-red-400">
              <span className="flex items-center gap-1.5"><AlertTriangle className="h-3.5 w-3.5" /> BANNED CLICHÉ (DON'T)</span>
              <span>100% OVERUSED BLUE</span>
            </div>
            <div className="p-3 rounded-md bg-[#0099FF] text-black font-medium text-xs flex items-center justify-between shadow-[0_0_20px_rgba(0,153,255,0.8)]">
              <span>ROAS Metric Tracking</span>
              <span>4.82x</span>
            </div>
            <p className="text-[11px] text-[#8D949E]">Drowning the entire container in bright blue creates visual fatigue and destroys contrast.</p>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-md font-mono text-xs transition-colors border ${
              selectedCategory === cat.id
                ? 'bg-[#0099FF]/20 text-[#0099FF] border-[#0099FF]/50'
                : 'bg-[#0A0C0F] text-[#8D949E] border-white/10 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Color Tokens Swatch Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTokens.map((token: ColorToken) => (
          <div
            key={token.variable}
            className="group rounded-xl border border-white/10 bg-[#0A0C0F] p-4 space-y-3 hover:border-[#0099FF]/40 transition-all duration-150"
          >
            {/* Color Visual Block */}
            <div 
              className="h-20 w-full rounded-lg border border-white/10 relative flex items-end justify-between p-3"
              style={{ backgroundColor: token.hex }}
            >
              <span className={`font-mono text-[11px] px-2 py-0.5 rounded backdrop-blur-md ${
                token.hex === '#F5F7FA' ? 'bg-black/80 text-white' : 'bg-black/70 text-white border border-white/10'
              }`}>
                {token.hex}
              </span>

              {token.contrastRatioOnBg && (
                <span className="font-mono text-[10px] bg-black/80 text-[#8D949E] px-2 py-0.5 rounded border border-white/10">
                  {token.contrastRatioOnBg}
                </span>
              )}
            </div>

            {/* Token Info */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-white">{token.name}</h4>
                <button
                  onClick={() => handleCopy(token.hex, token.variable)}
                  className="text-[#8D949E] hover:text-[#0099FF] transition-colors p-1"
                  title="Copy Hex Value"
                >
                  {copiedVar === token.variable ? (
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>

              <div className="font-mono text-[11px] text-[#0099FF]">{token.variable}</div>
              <p className="text-xs text-[#8D949E] leading-relaxed pt-1">{token.description}</p>
            </div>

            {/* Usage Role */}
            <div className="pt-2 border-t border-white/5 font-mono text-[10px] text-[#5A626E]">
              <span className="text-white/40">USAGE:</span> {token.usageRole}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
