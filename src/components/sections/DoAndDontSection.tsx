import React, { useState } from 'react';
import { DO_DONT_RULES } from '../../data/tokens';
import { DoDontRule } from '../../types/design-system';
import { ShieldCheck, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

export const DoAndDontSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', 'Color & FX', 'Typography', 'Container & Depth', 'Corner Radius', 'Motion'];

  const filteredRules = activeCategory === 'all'
    ? DO_DONT_RULES
    : DO_DONT_RULES.filter(r => r.category === activeCategory);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="space-y-2">
        <div className="font-mono text-xs uppercase tracking-wider text-[#B89A72] flex items-center gap-2">
          <span>08 / DESIGN DO & DON'T SPECIFICATION</span>
          <span className="h-[1px] flex-1 bg-white/10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">
          Magniar Quality Standard vs Banned AI Template Clichés
        </h2>
        <p className="text-sm text-[#8D949E] max-w-3xl leading-relaxed">
          Every component and layout choice must be evaluated against this strict quality boundary to eliminate low-effort "AI Slop" patterns, purple gradients, excessive glassmorphism, and cartoonish pill radii.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-md font-mono text-xs transition-colors border ${
              activeCategory === cat
                ? 'bg-[#B89A72]/20 text-[#B89A72] border-[#B89A72]/40'
                : 'bg-[#0A0C0F] text-[#8D949E] border-white/10 hover:text-white'
            }`}
          >
            {cat === 'all' ? 'All Rules' : cat}
          </button>
        ))}
      </div>

      {/* Rules Visual Grid */}
      <div className="space-y-6">
        {filteredRules.map((rule: DoDontRule) => (
          <div key={rule.id} className="rounded-xl border border-white/10 bg-[#0A0C0F] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="font-mono text-xs text-[#B89A72] bg-[#B89A72]/10 px-2 py-0.5 rounded border border-[#B89A72]/20">
                RULE #{rule.id} // {rule.category.toUpperCase()}
              </span>
              <h3 className="text-sm font-medium text-white">{rule.ruleTitle}</h3>
            </div>

            {/* Side-By-Side Visual Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* DO SIDE */}
              <div className="rounded-lg bg-[#050505] border border-emerald-500/30 p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <CheckCircle2 className="h-4 w-4" /> MAGNIAR STANDARD (DO)
                  </span>
                  <span className="text-[10px] bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    PASSED
                  </span>
                </div>
                <p className="text-xs text-white leading-relaxed">{rule.doText}</p>
                <div className="p-3 rounded bg-[#0A0C0F] border border-white/10 font-mono text-[11px] text-[#8D949E]">
                  <span className="text-white/40 block mb-1">VISUAL BEHAVIOR:</span>
                  {rule.doVisualNote}
                </div>
              </div>

              {/* DON'T SIDE */}
              <div className="rounded-lg bg-[#050505] border border-red-500/30 p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-red-400">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <XCircle className="h-4 w-4" /> BANNED CLICHÉ (DON'T)
                  </span>
                  <span className="text-[10px] bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20">
                    REJECTED
                  </span>
                </div>
                <p className="text-xs text-white leading-relaxed">{rule.dontText}</p>
                <div className="p-3 rounded bg-red-950/20 border border-red-500/20 font-mono text-[11px] text-red-300">
                  <span className="text-red-400/60 block mb-1">REJECTED PATTERN:</span>
                  {rule.dontVisualNote}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
