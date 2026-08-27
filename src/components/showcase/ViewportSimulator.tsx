import React, { useState } from 'react';
import { ViewportMode } from '../../types/navigation';
import { Monitor, Laptop, Tablet, Smartphone, Eye, Check, RefreshCw } from 'lucide-react';

interface ViewportSimulatorProps {
  currentViewport: ViewportMode;
  onViewportChange: (mode: ViewportMode) => void;
  children: React.ReactNode;
}

export const ViewportSimulator: React.FC<ViewportSimulatorProps> = ({
  currentViewport,
  onViewportChange,
  children
}) => {
  const modes: { id: ViewportMode; label: string; width: string; icon: any }[] = [
    { id: '1440px', label: '1440px Desktop', width: '100%', icon: Monitor },
    { id: '1024px', label: '1024px Laptop', width: '1024px', icon: Laptop },
    { id: '768px', label: '768px Tablet', width: '768px', icon: Tablet },
    { id: '390px', label: '390px Mobile', width: '390px', icon: Smartphone },
  ];

  return (
    <div className="w-full space-y-4">
      {/* Top Viewport Mode Switcher Toolbar */}
      <div className="bg-[#0A0C0F] border border-white/10 p-3 rounded-[2px] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="text-[#B89A72] font-semibold flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span>RESPONSIVE VIEWPORT TESTER:</span>
          </span>
          <span className="text-white/40">|</span>
          <span className="text-[#F5F7FA] font-mono">{currentViewport} VIEWPORT</span>
        </div>

        {/* Viewport Selector Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {modes.map((m) => {
            const Icon = m.icon;
            const isActive = currentViewport === m.id;
            return (
              <button
                key={m.id}
                onClick={() => onViewportChange(m.id)}
                className={`
                  px-3 py-1.5 rounded-[2px] flex items-center gap-2 font-mono text-[11px] transition-all cursor-pointer
                  ${isActive
                    ? 'bg-[#B89A72] text-white font-semibold shadow-[0_0_12px_rgba(184,154,114,0.3)]'
                    : 'bg-[#050505] text-[#8D949E] border border-white/10 hover:text-white hover:border-white/20'
                  }
                `}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Frame Container */}
      <div className="w-full bg-[#030303] p-2 sm:p-6 rounded-[2px] border border-white/10 flex justify-center items-center overflow-x-auto min-h-[600px]">
        <div
          style={{ width: modes.find((m) => m.id === currentViewport)?.width || '100%' }}
          className="transition-all duration-300 ease-out bg-[#050505] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.9)] rounded-[2px] overflow-hidden relative min-h-[600px]"
        >
          {/* Top Frame Status Header when constrained */}
          {currentViewport !== '1440px' && (
            <div className="bg-[#0A0C0F] px-4 py-2 border-b border-white/10 flex items-center justify-between font-mono text-[10px] text-[#5A626E]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B89A72]" />
                <span>SIMULATED VIEWPORT: {currentViewport}</span>
              </div>
              <span>MAGNIAR SHELL ENVIRONMENT</span>
            </div>
          )}

          {/* Render Actual Shell Content */}
          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  );
};
