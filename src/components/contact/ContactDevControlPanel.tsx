import React from 'react';
import { ViewportMode } from '../../types/navigation';
import { Monitor, Tablet, Smartphone, Sparkles, Navigation, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

interface ContactDevControlPanelProps {
  currentViewport: ViewportMode;
  onViewportChange: (vp: ViewportMode) => void;
  activeView: 'contact' | 'schedule' | 'ch12-review';
  onViewChange: (view: 'contact' | 'schedule' | 'ch12-review') => void;
  forceErrorDemo?: boolean;
  onToggleErrorDemo?: () => void;
}

export const ContactDevControlPanel: React.FC<ContactDevControlPanelProps> = ({
  currentViewport,
  onViewportChange,
  activeView,
  onViewChange,
  forceErrorDemo = false,
  onToggleErrorDemo,
}) => {
  return (
    <div className="bg-[#0A0D12] border-b border-white/10 p-3 text-xs font-mono text-[#8D949E] flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="text-[#B89A72] font-bold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          CH 12 CONVERSION DEV CONTROL
        </span>
        <span className="text-white/20">|</span>

        {/* View Switcher */}
        <div className="flex items-center gap-1 bg-[#050505] p-1 border border-white/10 rounded-[2px]">
          <button
            onClick={() => onViewChange('contact')}
            className={`px-2.5 py-1 rounded-[2px] transition-colors cursor-pointer ${
              activeView === 'contact' ? 'bg-[#B89A72] text-white font-bold' : 'hover:text-white'
            }`}
          >
            /contact
          </button>
          <button
            onClick={() => onViewChange('schedule')}
            className={`px-2.5 py-1 rounded-[2px] transition-colors cursor-pointer ${
              activeView === 'schedule' ? 'bg-[#B89A72] text-white font-bold' : 'hover:text-white'
            }`}
          >
            /schedule/demo
          </button>
          <button
            onClick={() => onViewChange('ch12-review')}
            className={`px-2.5 py-1 rounded-[2px] transition-colors cursor-pointer ${
              activeView === 'ch12-review' ? 'bg-[#B89A72] text-white font-bold' : 'hover:text-white'
            }`}
          >
            CH 12 Review
          </button>
        </div>

        {/* Form Error State Toggle for /contact */}
        {activeView === 'contact' && onToggleErrorDemo && (
          <button
            onClick={onToggleErrorDemo}
            className={`px-2 py-0.5 border text-[10px] rounded-[2px] flex items-center gap-1 cursor-pointer transition-colors ${
              forceErrorDemo
                ? 'bg-red-950/80 border-red-500 text-red-300 font-bold'
                : 'bg-white/5 border-white/10 hover:border-white/20 text-[#8D949E]'
            }`}
          >
            <AlertTriangle className="w-3 h-3" />
            <span>{forceErrorDemo ? 'FORCE ERROR: ON' : 'SIMULATE ERROR'}</span>
          </button>
        )}
      </div>

      {/* Viewport Width Switcher */}
      <div className="flex items-center gap-1 bg-[#050505] p-1 border border-white/10 rounded-[2px]">
        <button
          onClick={() => onViewportChange('1440px')}
          className={`px-2 py-0.5 rounded-[2px] transition-colors ${
            currentViewport === '1440px' ? 'bg-[#B89A72] text-white font-bold' : 'hover:text-white'
          }`}
        >
          <Monitor className="w-3 h-3 inline mr-1" />
          1440
        </button>
        <button
          onClick={() => onViewportChange('1280px')}
          className={`px-2 py-0.5 rounded-[2px] transition-colors ${
            currentViewport === '1280px' ? 'bg-[#B89A72] text-white font-bold' : 'hover:text-white'
          }`}
        >
          1280
        </button>
        <button
          onClick={() => onViewportChange('1024px')}
          className={`px-2 py-0.5 rounded-[2px] transition-colors ${
            currentViewport === '1024px' ? 'bg-[#B89A72] text-white font-bold' : 'hover:text-white'
          }`}
        >
          1024
        </button>
        <button
          onClick={() => onViewportChange('768px')}
          className={`px-2 py-0.5 rounded-[2px] transition-colors ${
            currentViewport === '768px' ? 'bg-[#B89A72] text-white font-bold' : 'hover:text-white'
          }`}
        >
          <Tablet className="w-3 h-3 inline mr-1" />
          768
        </button>
        <button
          onClick={() => onViewportChange('390px')}
          className={`px-2 py-0.5 rounded-[2px] transition-colors ${
            currentViewport === '390px' ? 'bg-[#B89A72] text-white font-bold' : 'hover:text-white'
          }`}
        >
          <Smartphone className="w-3 h-3 inline mr-1" />
          390
        </button>
      </div>
    </div>
  );
};
