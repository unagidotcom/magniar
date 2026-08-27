import React from 'react';
import { 
  Palette, 
  Type, 
  Grid, 
  Maximize2, 
  Activity, 
  BarChart3, 
  Radio, 
  CheckCircle2, 
  Code, 
  BookOpen,
  Sparkles
} from 'lucide-react';
import { SectionTab } from '../types/design-system';

interface SidebarNavProps {
  activeTab: SectionTab;
  setActiveTab: (tab: SectionTab) => void;
}

interface NavItem {
  id: SectionTab;
  code: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', code: '00', label: 'System Overview', icon: Sparkles },
  { id: 'colors', code: '01', label: 'Color System & Signals', icon: Palette, badge: '13 Tokens' },
  { id: 'typography', code: '02', label: 'Typography & Micro', icon: Type, badge: '9 Sizes' },
  { id: 'grid-layout', code: '03', label: 'Grid & Containers', icon: Grid, badge: '1440px' },
  { id: 'spacing-radius', code: '04', label: 'Spacing & Radii', icon: Maximize2, badge: 'Tokens' },
  { id: 'motion', code: '05', label: 'Motion Physics', icon: Activity, badge: '4 Timings' },
  { id: 'dataviz', code: '06', label: 'Data Viz Language', icon: BarChart3 },
  { id: 'signals', code: '07', label: 'Magniar Signal Motifs', icon: Radio, badge: '● LIVE' },
  { id: 'dodont', code: '08', label: 'Design Do / Don\'t Rules', icon: CheckCircle2, badge: '5 Core' },
  { id: 'exporter', code: '09', label: 'JSON Token Exporter', icon: Code },
  { id: 'full-spec', code: '10', label: 'Full Specification', icon: BookOpen, badge: '20 Output' },
];

export const SidebarNav: React.FC<SidebarNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-full lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-white/10 bg-[#050505] p-3 lg:p-4">
      <div className="mb-3 px-2 font-mono text-[10px] uppercase text-[#5A626E] tracking-wider flex items-center justify-between">
        <span>NAVIGATION // FOUNDATION</span>
        <span className="text-[#B89A72]">● v1.0</span>
      </div>

      <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center justify-between w-full min-w-[200px] lg:min-w-0 px-3 py-2.5 rounded-lg text-left transition-all duration-150 border ${
                isActive
                  ? 'bg-[#0A0C0F] text-white border-[#B89A72]/40 shadow-[0_0_15px_rgba(184,154,114,0.1)]'
                  : 'text-[#8D949E] border-transparent hover:text-white hover:bg-white/5 hover:border-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={`font-mono text-[11px] ${isActive ? 'text-[#B89A72]' : 'text-[#5A626E]'}`}>
                  {item.code}
                </span>
                <Icon className={`h-4 w-4 ${isActive ? 'text-[#B89A72]' : 'text-[#8D949E]'}`} />
                <span className="text-xs font-medium tracking-tight whitespace-nowrap">{item.label}</span>
              </div>

              {item.badge && (
                <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded border ${
                  isActive 
                    ? 'bg-[#B89A72]/20 text-[#B89A72] border-[#B89A72]/30'
                    : 'bg-white/5 text-[#5A626E] border-white/5'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info Box */}
      <div className="hidden lg:block mt-8 p-3 rounded-lg bg-[#0A0C0F] border border-white/5 text-[11px] font-mono text-[#8D949E]">
        <div className="flex items-center gap-2 text-[#B89A72] mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B89A72] animate-magniar-pulse" />
          <span>CHAPTER 01 APPROVED</span>
        </div>
        <p className="text-[#5A626E] text-[10px] leading-relaxed">
          Design Foundation Phase. No product pages, hero sections, or business logic. Ready for Chapter 02.
        </p>
      </div>
    </aside>
  );
};
