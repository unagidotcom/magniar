import React from 'react';
import { User, LogOut, ShieldCheck, Key, Settings, X } from 'lucide-react';

interface AdminUserMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSignOut: () => void;
  onOpenSettings: () => void;
}

export const AdminUserMenu: React.FC<AdminUserMenuProps> = ({
  isOpen,
  onClose,
  onSignOut,
  onOpenSettings,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="absolute right-0 top-12 z-50 w-64 bg-[#0A0A0C] border border-white/10 rounded-[2px] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2"
      onClick={(e) => e.stopPropagation()}
    >
      {/* User Info Header */}
      <div className="p-4 bg-[#050505] border-b border-white/10 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] text-[#0099FF] bg-[#0099FF]/10 border border-[#0099FF]/20 px-1.5 py-0.5 rounded-[2px]">
            SUPER ADMIN
          </span>
          <button onClick={onClose} className="text-white/40 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
        <div>
          <h4 className="text-sm font-display font-semibold text-white">
            Kaelen Voss
          </h4>
          <p className="text-xs font-mono text-white/50 truncate">
            admin@magniar.com
          </p>
        </div>
      </div>

      {/* Menu Actions */}
      <div className="p-2 space-y-1">
        <button
          onClick={() => {
            onOpenSettings();
            onClose();
          }}
          className="w-full p-2.5 hover:bg-white/5 rounded-[2px] text-xs font-mono text-white/80 hover:text-white flex items-center gap-2.5 transition-colors"
        >
          <Settings className="w-4 h-4 text-white/40" />
          <span>System Preferences</span>
        </button>

        <button
          onClick={() => {
            onOpenSettings();
            onClose();
          }}
          className="w-full p-2.5 hover:bg-white/5 rounded-[2px] text-xs font-mono text-white/80 hover:text-white flex items-center gap-2.5 transition-colors"
        >
          <ShieldCheck className="w-4 h-4 text-white/40" />
          <span>Security & API Keys</span>
        </button>

        <div className="my-1 border-t border-white/10" />

        <button
          onClick={() => {
            onSignOut();
            onClose();
          }}
          className="w-full p-2.5 hover:bg-rose-500/10 rounded-[2px] text-xs font-mono text-rose-400 flex items-center gap-2.5 transition-colors"
        >
          <LogOut className="w-4 h-4 text-rose-400" />
          <span>Sign Out of Admin OS</span>
        </button>
      </div>
    </div>
  );
};
