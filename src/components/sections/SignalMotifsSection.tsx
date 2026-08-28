import React, { useState } from 'react';
import { SIGNAL_MOTIFS } from '../../data/tokens';
import { Radio, Sparkles, Terminal, Activity } from 'lucide-react';

export const SignalMotifsSection: React.FC = () => {
  const [activeMotif, setActiveMotif] = useState<string>('signal-dot');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="space-y-2">
        <div className="font-mono text-xs uppercase tracking-wider text-[#B89A72] flex items-center gap-2">
          <span>07 / MAGNIAR SIGNAL MOTIF VARIATIONS</span>
          <span className="h-[1px] flex-1 bg-white/10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">
          The Magniar Signal Language
        </h2>
        <p className="text-sm text-[#8D949E] max-w-3xl leading-relaxed">
          The Magniar Signal is a recurring visual heartbeat signifying active status, intelligence, and system execution. It reinforces the brand promise across public marketing, client portal, and admin environments.
        </p>
      </div>

      {/* Motif Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SIGNAL_MOTIFS.map((motif) => (
          <div
            key={motif.id}
            onClick={() => setActiveMotif(motif.id)}
            className={`cursor-pointer rounded-xl border p-5 space-y-4 transition-all duration-200 ${
              activeMotif === motif.id
                ? 'bg-[#0A0C0F] border-[#B89A72] shadow-[0_0_20px_rgba(184,154,114,0.15)]'
                : 'bg-[#0A0C0F] border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-white font-medium">{motif.title}</span>
              <span className="text-[#B89A72] bg-[#B89A72]/10 px-2 py-0.5 rounded border border-[#B89A72]/20">
                {motif.asciiVariant}
              </span>
            </div>

            <p className="text-xs text-[#8D949E] leading-relaxed">{motif.description}</p>

            {/* Live Interactive Render Box */}
            <div className="p-4 rounded-lg bg-[#050505] border border-white/10 flex items-center justify-center min-h-[64px] relative overflow-hidden">
              {motif.componentType === 'dot' && (
                <div className="flex items-center gap-2 font-mono text-xs text-white">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B89A72] animate-magniar-pulse" />
                  <span>● OPERATIONAL SYSTEM NODE</span>
                </div>
              )}

              {motif.componentType === 'line' && (
                <div className="w-full flex items-center gap-2 font-mono text-xs text-[#8D949E]">
                  <span className="text-white/20">┄┄┄┄</span>
                  <span className="w-2 h-2 rounded-full bg-[#B89A72] animate-magniar-pulse" />
                  <span className="h-[1px] flex-1 bg-[#B89A72]/40" />
                  <span className="text-[#B89A72] text-[10px]">LIVE REVENUE PIPELINE</span>
                </div>
              )}

              {motif.componentType === 'badge' && (
                <div className="inline-flex items-center gap-2 rounded border border-[#B89A72]/40 bg-[#B89A72]/10 px-3 py-1 font-mono text-xs text-[#B89A72]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B89A72] animate-magniar-pulse" />
                  <span>[ SYSTEM / LIVE INTEL ]</span>
                </div>
              )}

              {motif.componentType === 'scan' && (
                <div className="w-full space-y-1">
                  <div className="h-1 w-full bg-[#0A0C0F] rounded overflow-hidden relative">
                    <div className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-[#B89A72] to-transparent animate-signal-scan" />
                  </div>
                  <div className="flex justify-between font-mono text-[10px] text-[#5A626E]">
                    <span>RECALCULATING ATTRIBUTION</span>
                    <span className="text-[#B89A72]">SYNC_BEAM_ACTIVE</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
