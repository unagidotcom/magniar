import React from 'react';
import { ViewportMode } from '../../types/navigation';
import { Sliders, Monitor, Shield, Layout, Database, AlertTriangle, Layers, Lock, Unlock, Sparkles } from 'lucide-react';

interface AdminDevControlPanelProps {
  currentViewport: ViewportMode;
  onViewportChange: (viewport: ViewportMode) => void;
  activeView: 'admin-shell' | 'ch13-review';
  onViewChange: (view: 'admin-shell' | 'ch13-review') => void;
  authStatus: boolean;
  onAuthStatusToggle: () => void;
  selectedRoute: string;
  onRouteChange: (route: string) => void;
  simulatedState: 'normal' | 'skeleton' | 'empty' | 'error';
  onSimulatedStateChange: (state: 'normal' | 'skeleton' | 'empty' | 'error') => void;
}

export const AdminDevControlPanel: React.FC<AdminDevControlPanelProps> = ({
  currentViewport,
  onViewportChange,
  activeView,
  onViewChange,
  authStatus,
  onAuthStatusToggle,
  selectedRoute,
  onRouteChange,
  simulatedState,
  onSimulatedStateChange,
}) => {
  const viewports: ViewportMode[] = ['1440px', '1280px', '1024px', '768px', '390px'];
  const routes = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'requests', label: 'Requests' },
    { id: 'prospects', label: 'Prospects' },
    { id: 'clients', label: 'Clients' },
    { id: 'projects', label: 'Projects' },
    { id: 'campaigns', label: 'Campaigns' },
    { id: 'invoices', label: 'Invoices' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <div className="bg-[#0A0A0C] border-b border-white/10 p-4 font-mono text-xs text-white space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left Title & Review Toggle */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-[#0099FF]">
            <Sliders className="w-4 h-4" />
            <span className="uppercase tracking-wider">CH13 ADMIN DEV PANEL</span>
          </div>

          <div className="flex items-center bg-[#050505] p-1 border border-white/10 rounded-[2px] gap-1">
            <button
              onClick={() => onViewChange('admin-shell')}
              className={`px-2.5 py-1 rounded-[2px] transition-colors flex items-center gap-1.5 ${
                activeView === 'admin-shell'
                  ? 'bg-[#0099FF] text-white font-semibold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              <span>Admin App Shell</span>
            </button>

            <button
              onClick={() => onViewChange('ch13-review')}
              className={`px-2.5 py-1 rounded-[2px] transition-colors flex items-center gap-1.5 ${
                activeView === 'ch13-review'
                  ? 'bg-[#0099FF] text-white font-semibold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Design Review</span>
            </button>
          </div>
        </div>

        {/* Viewport Modes */}
        <div className="flex items-center gap-2">
          <span className="text-white/40 flex items-center gap-1">
            <Monitor className="w-3.5 h-3.5" />
            <span>Viewport:</span>
          </span>
          <div className="flex items-center bg-[#050505] p-1 border border-white/10 rounded-[2px] gap-1">
            {viewports.map((vp) => (
              <button
                key={vp}
                onClick={() => onViewportChange(vp)}
                className={`px-2 py-0.5 text-[11px] rounded-[2px] transition-colors ${
                  currentViewport === vp
                    ? 'bg-white/20 text-white font-bold'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                {vp}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Controls: Auth Toggle, Route Switcher, Component States */}
      {activeView === 'admin-shell' && (
        <div className="pt-3 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
          {/* Auth State Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-white/40">Auth State:</span>
            <button
              onClick={onAuthStatusToggle}
              className={`px-2.5 py-1 border rounded-[2px] flex items-center gap-1.5 font-bold transition-colors ${
                authStatus
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
              }`}
            >
              {authStatus ? (
                <>
                  <Unlock className="w-3.5 h-3.5" />
                  <span>AUTHENTICATED (SIGNED IN)</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>UNAUTHENTICATED (/admin/login)</span>
                </>
              )}
            </button>
          </div>

          {/* Route Switcher */}
          {authStatus && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-white/40">Simulate Sub-Route:</span>
              <div className="flex items-center bg-[#050505] p-1 border border-white/10 rounded-[2px] gap-1 flex-wrap">
                {routes.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => onRouteChange(r.id)}
                    className={`px-2 py-0.5 text-[11px] rounded-[2px] transition-colors ${
                      selectedRoute === r.id
                        ? 'bg-[#0099FF] text-white font-semibold'
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* UI State Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-white/40">UI State:</span>
            <div className="flex items-center bg-[#050505] p-1 border border-white/10 rounded-[2px] gap-1">
              <button
                onClick={() => onSimulatedStateChange('normal')}
                className={`px-2 py-0.5 text-[11px] rounded-[2px] ${
                  simulatedState === 'normal'
                    ? 'bg-white/20 text-white font-bold'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                Normal
              </button>
              <button
                onClick={() => onSimulatedStateChange('skeleton')}
                className={`px-2 py-0.5 text-[11px] rounded-[2px] ${
                  simulatedState === 'skeleton'
                    ? 'bg-white/20 text-white font-bold'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                Skeleton
              </button>
              <button
                onClick={() => onSimulatedStateChange('empty')}
                className={`px-2 py-0.5 text-[11px] rounded-[2px] ${
                  simulatedState === 'empty'
                    ? 'bg-white/20 text-white font-bold'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                Empty
              </button>
              <button
                onClick={() => onSimulatedStateChange('error')}
                className={`px-2 py-0.5 text-[11px] rounded-[2px] ${
                  simulatedState === 'error'
                    ? 'bg-[#0099FF] text-white font-bold'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                Error
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
