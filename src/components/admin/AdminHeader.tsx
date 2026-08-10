import React, { useState } from 'react';
import { Menu, Search, Bell, ChevronRight, Sparkles, User, Globe } from 'lucide-react';
import { CommandPalette } from './CommandPalette';
import { NotificationCenter } from './NotificationCenter';
import { AdminUserMenu } from './AdminUserMenu';
import { MockNotification } from '../../data/adminMockData';

interface AdminHeaderProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onMobileMenuToggle: () => void;
  notifications: MockNotification[];
  onMarkAllNotificationsRead: () => void;
  onNotificationClick: (notif: MockNotification) => void;
  onSignOut: () => void;
  onReturnToPublicSite?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  currentRoute,
  onNavigate,
  onMobileMenuToggle,
  notifications,
  onMarkAllNotificationsRead,
  onNotificationClick,
  onSignOut,
  onReturnToPublicSite,
}) => {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const routeFormatted = currentRoute.toUpperCase().replace(/-/g, ' ');

  return (
    <header className="h-16 border-b border-white/10 bg-[#050505] sticky top-0 z-20 px-4 md:px-8 flex items-center justify-between gap-4">
      {/* Left Breadcrumbs & Mobile Menu */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenuToggle}
          className="p-2 text-white/60 hover:text-white lg:hidden border border-white/10 rounded-[2px]"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 font-mono text-xs text-white/50">
          <span className="text-[#0099FF] font-medium">ADMIN</span>
          <ChevronRight className="w-3.5 h-3.5 text-white/30" />
          <span className="text-white font-medium tracking-wide">
            {routeFormatted}
          </span>
        </div>
      </div>

      {/* Right Tools & Menus */}
      <div className="flex items-center gap-3 relative">
        {/* Public Website Switcher */}
        {onReturnToPublicSite && (
          <button
            onClick={onReturnToPublicSite}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 rounded-[2px] font-mono text-xs transition-colors"
            title="Return to Magniar Marketing Website"
          >
            <Globe className="w-3.5 h-3.5 text-[#0099FF]" />
            <span>Public Site</span>
          </button>
        )}

        {/* Command Palette Trigger */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="hidden md:flex items-center gap-3 px-3 py-1.5 bg-white/[0.03] hover:bg-white/[0.08] text-white/50 hover:text-white border border-white/10 rounded-[2px] font-mono text-xs transition-colors"
        >
          <Search className="w-3.5 h-3.5 text-white/40" />
          <span>Quick command search...</span>
          <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded-[2px] text-white/40">
            Ctrl+K
          </span>
        </button>

        {/* Search button on small screens */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="md:hidden p-2 text-white/60 hover:text-white border border-white/10 rounded-[2px]"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setUserMenuOpen(false);
            }}
            className="p-2 text-white/60 hover:text-white border border-white/10 rounded-[2px] transition-colors relative"
            title="System Activity"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#0099FF] text-white font-mono text-[9px] font-bold rounded-full flex items-center justify-center border border-[#050505]">
                {unreadCount}
              </span>
            )}
          </button>

          <NotificationCenter
            isOpen={notificationsOpen}
            onClose={() => setNotificationsOpen(false)}
            notifications={notifications}
            onMarkAllRead={onMarkAllNotificationsRead}
            onNotificationClick={(notif) => {
              onNotificationClick(notif);
              setNotificationsOpen(false);
            }}
          />
        </div>

        {/* User Menu Button */}
        <div className="relative">
          <button
            onClick={() => {
              setUserMenuOpen(!userMenuOpen);
              setNotificationsOpen(false);
            }}
            className="flex items-center gap-2 pl-2 pr-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-[2px] transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-[#0099FF]/20 border border-[#0099FF]/40 text-[#0099FF] font-mono text-[10px] font-bold flex items-center justify-center">
              KV
            </div>
            <span className="hidden sm:inline-block font-mono text-xs text-white/80">
              KVoss
            </span>
          </button>

          <AdminUserMenu
            isOpen={userMenuOpen}
            onClose={() => setUserMenuOpen(false)}
            onSignOut={onSignOut}
            onOpenSettings={() => onNavigate('settings')}
          />
        </div>
      </div>

      {/* Command Palette Overlay */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={onNavigate}
      />
    </header>
  );
};
