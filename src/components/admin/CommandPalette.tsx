import React, { useState, useEffect } from 'react';
import { Search, X, LayoutDashboard, Inbox, Users, Globe, FileText, Settings, ShieldAlert, ArrowRight } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
  onActionTriggered?: (actionName: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onActionTriggered,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // handled in parent or toggle
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const commands = [
    { id: 'dash', label: 'Go to Dashboard', icon: LayoutDashboard, category: 'NAVIGATE', route: 'dashboard' },
    { id: 'reqs', label: 'Go to Requests Queue', icon: Inbox, category: 'NAVIGATE', route: 'requests' },
    { id: 'clis', label: 'Go to Clients Directory', icon: Users, category: 'NAVIGATE', route: 'clients' },
    { id: 'webs', label: 'Go to Websites', icon: Globe, category: 'NAVIGATE', route: 'websites' },
    { id: 'invs', label: 'Go to Invoices & Ledger', icon: FileText, category: 'NAVIGATE', route: 'invoices' },
    { id: 'sett', label: 'Go to System Settings', icon: Settings, category: 'NAVIGATE', route: 'settings' },
    { id: 'create-inv', label: 'Generate Draft Invoice', icon: FileText, category: 'ACTIONS', action: 'New Invoice' },
    { id: 'clear-notif', label: 'Mark All Notifications as Read', icon: ShieldAlert, category: 'ACTIONS', action: 'Clear Notifications' },
  ];

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[#0A0A0C] border border-white/10 rounded-[2px] max-w-xl w-full shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-[#050505]">
          <Search className="w-5 h-5 text-white/40 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search route... (e.g., Requests, Invoices)"
            className="w-full bg-transparent text-white font-mono text-sm placeholder:text-white/30 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-white/40 hover:text-white text-xs font-mono border border-white/10 px-1.5 rounded-[2px]"
          >
            ESC
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-white/[0.03]">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs font-mono text-white/40">
              No matching commands found.
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.route) onNavigate(item.route);
                    if (item.action && onActionTriggered) onActionTriggered(item.action);
                    onClose();
                  }}
                  className="w-full p-3 hover:bg-white/5 rounded-[2px] flex items-center justify-between text-left transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-white/40 group-hover:text-[#0099FF] transition-colors" />
                    <span className="text-xs font-mono text-white/80 group-hover:text-white">
                      {item.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/60 transition-colors" />
                  </div>
                </button>
              );
            })
          )}
        </div>

        <div className="p-3 bg-[#050505] border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
          <span>MAGNIAR OS COMMAND ENGINE</span>
          <span>PRESS [ESC] TO CLOSE</span>
        </div>
      </div>
    </div>
  );
};
