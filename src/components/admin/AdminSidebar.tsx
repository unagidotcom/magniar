import React from 'react';
import {
  LayoutDashboard,
  Inbox,
  Users,
  FileText,
  Settings,
  LogOut,
  X,
} from 'lucide-react';
import { AdminDisplayProfile, initialsForName } from '../../services/adminProfileService';

interface AdminSidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  openRequestsCount?: number;
  onSignOut: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
  adminProfile: AdminDisplayProfile;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentRoute,
  onNavigate,
  openRequestsCount = 7,
  onSignOut,
  mobileOpen,
  onMobileClose,
  adminProfile,
}) => {
  const sections = [
    {
      groupLabel: 'OVERVIEW',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      ],
    },
    {
      groupLabel: 'WORKFLOW',
      items: [
        {
          id: 'requests',
          label: 'Requests Queue',
          icon: Inbox,
          badge: openRequestsCount > 0 ? `${openRequestsCount} NEW` : undefined,
          badgeColor: 'bg-[#0099FF]/20 text-[#0099FF]',
        },
        { id: 'clients', label: 'Clients Directory', icon: Users },
      ],
    },
    {
      groupLabel: 'FINANCE',
      items: [
        { id: 'invoices', label: 'Invoices & Billing', icon: FileText },
      ],
    },
    {
      groupLabel: 'SYSTEM',
      items: [
        { id: 'settings', label: 'System Settings', icon: Settings },
      ],
    },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-[#050505] text-white">
      {/* Top Header */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold tracking-widest text-base text-white">
              MAGNIAR
            </span>
            <span className="font-mono text-[9px] text-[#0099FF] bg-[#0099FF]/10 border border-[#0099FF]/30 px-1.5 py-0.5 rounded-[2px] font-semibold">
              OS v2.4
            </span>
          </div>
          <p className="font-mono text-[10px] text-white/40 uppercase tracking-wider">
            OPERATING SYSTEM ADMIN
          </p>
        </div>

        {/* Mobile close button */}
        <button
          onClick={onMobileClose}
          className="lg:hidden p-1 text-white/40 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {sections.map((sec) => (
          <div key={sec.groupLabel} className="space-y-1">
            <div className="px-3 pb-1 font-mono text-[10px] text-white/30 tracking-widest uppercase font-semibold">
              {sec.groupLabel}
            </div>
            {sec.items.map((item) => {
              const Icon = item.icon;
              const isActive = currentRoute === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    onMobileClose();
                  }}
                  className={`w-full px-3 py-2.5 rounded-[2px] font-mono text-xs flex items-center justify-between transition-all group ${
                    isActive
                      ? 'bg-white/10 text-white font-medium border-l-2 border-[#0099FF] pl-2.5'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? 'text-[#0099FF]' : 'text-white/40 group-hover:text-white/80'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded-[2px] font-bold ${
                        item.badgeColor || 'bg-white/10 text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* User Footer Profile */}
      <div className="p-4 border-t border-white/10 bg-[#08080A] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#0099FF]/20 border border-[#0099FF]/40 flex items-center justify-center font-mono text-xs font-bold text-[#0099FF] shrink-0">
              {initialsForName(adminProfile.displayName)}
            </div>
            <div className="min-w-0 space-y-0.5">
              <div className="font-display text-xs font-semibold text-white truncate">
                {adminProfile.displayName}
              </div>
              <div className="font-mono text-[10px] text-white/40 truncate">
                {adminProfile.roleLabel}
              </div>
            </div>
          </div>

          <button
            onClick={onSignOut}
            className="p-2 text-white/40 hover:text-rose-400 hover:bg-rose-500/10 rounded-[2px] transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block lg:w-64 shrink-0 border-r border-white/10 h-screen sticky top-0 self-start z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onMobileClose}
          />
          <div className="relative w-72 max-w-xs h-full z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
