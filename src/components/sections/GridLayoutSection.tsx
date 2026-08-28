import React, { useState } from 'react';
import { Grid, Maximize, Smartphone, Tablet, Monitor, Check } from 'lucide-react';

export const GridLayoutSection: React.FC = () => {
  const [selectedGridStyle, setSelectedGridStyle] = useState<'standard' | 'dense' | 'none'>('standard');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="space-y-2">
        <div className="font-mono text-xs uppercase tracking-wider text-[#B89A72] flex items-center gap-2">
          <span>03 / GRID, LAYOUT & CONTAINER SYSTEM</span>
          <span className="h-[1px] flex-1 bg-white/10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">
          Subtle Technical Grid & 1440px Container Architecture
        </h2>
        <p className="text-sm text-[#8D949E] max-w-3xl leading-relaxed">
          The Magniar grid forms a subtle coordinate system beneath the interface. Content is constrained to a 1440px desktop maximum with responsive gutters to guarantee optimal line length and visual rhythm.
        </p>
      </div>

      {/* Container Visualizer */}
      <div className="rounded-xl border border-white/10 bg-[#0A0C0F] p-6 space-y-4">
        <div className="flex items-center justify-between font-mono text-xs text-[#8D949E]">
          <span className="flex items-center gap-2 text-white">
            <Maximize className="h-4 w-4 text-[#B89A72]" />
            1440PX CONTAINER SPECIFICATION VISUALIZER
          </span>
          <span className="text-[#B89A72]">MAX_WIDTH: 1440PX</span>
        </div>

        {/* Container Graphic Box */}
        <div className="relative overflow-hidden rounded-lg border border-[#B89A72]/30 bg-[#050505] p-4 text-center">
          {/* Simulated Grid Overlay Inside Graphic Box */}
          {selectedGridStyle !== 'none' && (
            <div className={`absolute inset-0 opacity-40 pointer-events-none ${
              selectedGridStyle === 'dense' ? 'magniar-grid-pattern-dense' : 'magniar-grid-pattern'
            }`} />
          )}

          <div className="relative z-10 mx-auto max-w-[1440px] rounded border border-dashed border-[#B89A72]/60 bg-[#0A0C0F]/80 p-8 space-y-2">
            <div className="font-mono text-xs text-[#B89A72] font-semibold">
              MAX CONTENT CONTAINER BOUNDARY (1440px)
            </div>
            <p className="text-xs text-[#8D949E] max-w-xl mx-auto">
              Large text blocks and data tables never stretch indefinitely across ultra-wide monitors. Content aligns strictly to the 1440px boundary with 64px horizontal desktop padding.
            </p>
          </div>
        </div>

        {/* Interactive Grid Style Controls */}
        <div className="flex items-center justify-between pt-2">
          <span className="font-mono text-xs text-[#5A626E]">TOGGLE INLINE GRID STYLE:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedGridStyle('standard')}
              className={`px-3 py-1 rounded text-xs font-mono border transition-colors ${
                selectedGridStyle === 'standard'
                  ? 'bg-[#B89A72]/20 text-[#B89A72] border-[#B89A72]/40'
                  : 'bg-[#050505] text-[#8D949E] border-white/10'
              }`}
            >
              Standard (40px)
            </button>
            <button
              onClick={() => setSelectedGridStyle('dense')}
              className={`px-3 py-1 rounded text-xs font-mono border transition-colors ${
                selectedGridStyle === 'dense'
                  ? 'bg-[#B89A72]/20 text-[#B89A72] border-[#B89A72]/40'
                  : 'bg-[#050505] text-[#8D949E] border-white/10'
              }`}
            >
              Dense (20px)
            </button>
            <button
              onClick={() => setSelectedGridStyle('none')}
              className={`px-3 py-1 rounded text-xs font-mono border transition-colors ${
                selectedGridStyle === 'none'
                  ? 'bg-[#B89A72]/20 text-[#B89A72] border-[#B89A72]/40'
                  : 'bg-[#050505] text-[#8D949E] border-white/10'
              }`}
            >
              Hidden
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Breakpoint Matrix */}
      <div className="space-y-4">
        <div className="font-mono text-xs text-[#5A626E] uppercase tracking-wider">
          RESPONSIVE BREAKPOINT & GUTTER SPECIFICATION
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border border-white/10 bg-[#0A0C0F] p-4 space-y-2">
            <div className="flex items-center justify-between font-mono text-xs text-[#8D949E]">
              <span className="flex items-center gap-1.5"><Smartphone className="h-4 w-4 text-[#B89A72]" /> Mobile</span>
              <span className="text-white">375px+</span>
            </div>
            <div className="text-xs text-[#8D949E] font-mono">Padding: 16px (1.0rem)</div>
            <p className="text-[11px] text-[#5A626E]">Single-column stacked hierarchy, 44px minimum touch targets.</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#0A0C0F] p-4 space-y-2">
            <div className="flex items-center justify-between font-mono text-xs text-[#8D949E]">
              <span className="flex items-center gap-1.5"><Tablet className="h-4 w-4 text-[#B89A72]" /> Tablet</span>
              <span className="text-white">768px+</span>
            </div>
            <div className="text-xs text-[#8D949E] font-mono">Padding: 32px (2.0rem)</div>
            <p className="text-[11px] text-[#5A626E]">2-column card layouts, sticky filter headers.</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#0A0C0F] p-4 space-y-2">
            <div className="flex items-center justify-between font-mono text-xs text-[#8D949E]">
              <span className="flex items-center gap-1.5"><Monitor className="h-4 w-4 text-[#B89A72]" /> Laptop</span>
              <span className="text-white">1024px+</span>
            </div>
            <div className="text-xs text-[#8D949E] font-mono">Padding: 48px (3.0rem)</div>
            <p className="text-[11px] text-[#5A626E]">3-column grid layouts, persistent sidebars.</p>
          </div>

          <div className="rounded-xl border border-[#B89A72]/30 bg-[#0A0C0F] p-4 space-y-2">
            <div className="flex items-center justify-between font-mono text-xs text-[#B89A72]">
              <span className="flex items-center gap-1.5"><Monitor className="h-4 w-4" /> Desktop Target</span>
              <span className="text-white font-bold">1440px</span>
            </div>
            <div className="text-xs text-white font-mono">Padding: 64px (4.0rem)</div>
            <p className="text-[11px] text-[#8D949E]">Primary Magniar target. Full bento grids, complex data views.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
