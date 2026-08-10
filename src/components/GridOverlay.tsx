import React, { useState, useEffect } from 'react';

interface GridOverlayProps {
  enabled: boolean;
  dense: boolean;
}

export const GridOverlay: React.FC<GridOverlayProps> = ({ enabled, dense }) => {
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };

    if (enabled) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {/* Background Grid Pattern */}
      <div 
        className={`absolute inset-0 ${
          dense ? 'magniar-grid-pattern-dense' : 'magniar-grid-pattern'
        } opacity-70`}
      />

      {/* Center Guideline */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#0099FF]/10 pointer-events-none" />

      {/* Coordinate HUD Tag */}
      <div className="fixed bottom-4 right-4 z-50 bg-[#0A0C0F]/90 border border-white/10 px-3 py-1.5 rounded-md text-[10px] font-mono text-[#8D949E] backdrop-blur-md flex items-center gap-3">
        <span className="flex items-center gap-1.5 text-[#0099FF]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0099FF] animate-magniar-pulse" />
          GRID_ACTIVE
        </span>
        <span className="text-white/20">|</span>
        <span>X: {coords.x}px</span>
        <span>Y: {coords.y}px</span>
        <span className="text-white/20">|</span>
        <span className="text-[#5A626E]">SYS_1440_BOUND</span>
      </div>
    </div>
  );
};
