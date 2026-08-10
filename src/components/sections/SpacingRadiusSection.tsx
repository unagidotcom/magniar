import React, { useState } from 'react';
import { SPACING_TOKENS, RADIUS_TOKENS } from '../../data/tokens';
import { SpacingToken, RadiusToken } from '../../types/design-system';
import { Maximize2, Calculator, Layers } from 'lucide-react';

export const SpacingRadiusSection: React.FC = () => {
  // Nested radius calculator state
  const [outerRadius, setOuterRadius] = useState<number>(14);
  const [padding, setPadding] = useState<number>(16);

  const calculatedInnerRadius = Math.max(0, outerRadius - padding);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="space-y-2">
        <div className="font-mono text-xs uppercase tracking-wider text-[#0099FF] flex items-center gap-2">
          <span>04 / SPACING, RADIUS & ELEVATION SYSTEM</span>
          <span className="h-[1px] flex-1 bg-white/10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">
          Formal Spacing Scale & Mathematical Corner Geometry
        </h2>
        <p className="text-sm text-[#8D949E] max-w-3xl leading-relaxed">
          Magniar favors generous negative space as an intentional design element. Corner radii are strictly capped between 6px and 14px (with 20px reserved for floating overlays) to avoid cartoonish SaaS pill trends.
        </p>
      </div>

      {/* Spacing Scale Visualizer */}
      <div className="space-y-4">
        <div className="font-mono text-xs text-[#5A626E] uppercase tracking-wider">
          SPACING TOKEN SCALE & PIXEL METRICS
        </div>

        <div className="rounded-xl border border-white/10 bg-[#0A0C0F] p-4 sm:p-6 space-y-3">
          {SPACING_TOKENS.map((token: SpacingToken) => (
            <div key={token.name} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors">
              <div className="w-48 font-mono text-xs flex items-center gap-2">
                <span className="text-[#0099FF] font-semibold">{token.pxValue}px</span>
                <span className="text-white/30">|</span>
                <span className="text-white">{token.token}</span>
                <span className="text-[#5A626E] text-[10px]">({token.remValue})</span>
              </div>

              {/* Visual Width Bar */}
              <div className="flex-1 max-w-xs h-3 bg-[#050505] rounded overflow-hidden border border-white/10 flex items-center px-0.5">
                <div 
                  className="h-2 bg-[#0099FF] rounded-sm transition-all"
                  style={{ width: `${Math.min(100, (token.pxValue / 128) * 100)}%` }}
                />
              </div>

              <div className="text-xs text-[#8D949E] font-mono sm:text-right w-64">
                {token.usage}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Radius Scale & Interactive Nested Radius Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radius Tokens */}
        <div className="space-y-4">
          <div className="font-mono text-xs text-[#5A626E] uppercase tracking-wider">
            CORNER RADIUS SPECIFICATION
          </div>

          <div className="space-y-3">
            {RADIUS_TOKENS.map((rad: RadiusToken) => (
              <div key={rad.name} className="rounded-xl border border-white/10 bg-[#0A0C0F] p-4 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium text-white">{rad.name}</h4>
                    <span className="font-mono text-xs text-[#0099FF] bg-[#0099FF]/10 px-2 py-0.5 rounded border border-[#0099FF]/30">
                      {rad.pxValue}px
                    </span>
                  </div>
                  <p className="text-xs text-[#8D949E]">{rad.usage}</p>
                </div>

                {/* Radius Visual Preview Box */}
                <div 
                  className="h-12 w-12 shrink-0 bg-[#0099FF]/10 border border-[#0099FF] flex items-center justify-center font-mono text-[10px] text-[#0099FF]"
                  style={{ borderRadius: `${rad.pxValue}px` }}
                >
                  {rad.pxValue}px
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Nested Radius Calculator */}
        <div className="space-y-4">
          <div className="font-mono text-xs text-[#0099FF] uppercase tracking-wider flex items-center gap-2">
            <Calculator className="h-3.5 w-3.5" />
            <span>NESTED CORNER RADIUS MATHEMATICAL CALCULATOR</span>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#0A0C0F] p-6 space-y-6">
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-white">Rule: Inner Radius = Outer Radius - Padding</h4>
              <p className="text-xs text-[#8D949E]">
                Prevents awkward gaps between nested containers by maintaining optically parallel curves.
              </p>
            </div>

            {/* Slider Controls */}
            <div className="space-y-4 font-mono text-xs">
              <div className="space-y-1">
                <div className="flex justify-between text-[#8D949E]">
                  <span>OUTER CONTAINER RADIUS:</span>
                  <span className="text-white font-bold">{outerRadius}px</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="24"
                  value={outerRadius}
                  onChange={(e) => setOuterRadius(Number(e.target.value))}
                  className="w-full accent-[#0099FF]"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[#8D949E]">
                  <span>INNER PADDING DISTANCE:</span>
                  <span className="text-white font-bold">{padding}px</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="24"
                  value={padding}
                  onChange={(e) => setPadding(Number(e.target.value))}
                  className="w-full accent-[#0099FF]"
                />
              </div>
            </div>

            {/* Live Visual Simulation */}
            <div className="pt-2">
              <div className="font-mono text-[11px] text-[#0099FF] mb-2 flex justify-between">
                <span>CALCULATED INNER RADIUS: {calculatedInnerRadius}px</span>
                <span>{calculatedInnerRadius === 0 ? 'SHARP (0px)' : 'PARALLEL CURVE'}</span>
              </div>

              {/* Outer Container Box */}
              <div 
                className="w-full bg-[#050505] border border-[#0099FF]/60 flex items-center justify-center transition-all duration-150"
                style={{ 
                  borderRadius: `${outerRadius}px`,
                  padding: `${padding}px`
                }}
              >
                {/* Inner Container Box */}
                <div 
                  className="w-full h-20 bg-[#101318] border border-white/20 flex items-center justify-center font-mono text-xs text-white transition-all duration-150"
                  style={{ borderRadius: `${calculatedInnerRadius}px` }}
                >
                  Inner Card ({calculatedInnerRadius}px radius)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
