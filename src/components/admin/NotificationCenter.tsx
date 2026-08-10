import React from 'react';
import { Bell, CheckCircle2, AlertTriangle, Shield, Check, X } from 'lucide-react';
import { MockNotification } from '../../data/adminMockData';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: MockNotification[];
  onMarkAllRead: () => void;
  onNotificationClick: (notif: MockNotification) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onNotificationClick,
}) => {
  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <div
      className="absolute right-0 top-12 z-50 w-80 sm:w-96 bg-[#0A0A0C] border border-white/10 rounded-[2px] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-[#050505] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#0099FF]" />
          <h4 className="text-xs font-mono font-medium text-white uppercase tracking-wider">
            System Activity Log
          </h4>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.5 bg-[#0099FF]/20 text-[#0099FF] text-[10px] font-mono rounded-[2px]">
              {unreadCount} NEW
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllRead}
              className="text-[10px] font-mono text-white/50 hover:text-white transition-colors flex items-center gap-1"
            >
              <Check className="w-3 h-3" />
              <span>Read All</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-white/[0.05]">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-xs font-mono text-white/40">
            No active system notifications.
          </div>
        ) : (
          notifications.map((notif) => (
            <button
              key={notif.id}
              onClick={() => {
                onNotificationClick(notif);
                onClose();
              }}
              className={`w-full p-4 text-left transition-colors flex items-start gap-3 hover:bg-white/5 ${
                !notif.is_read ? 'bg-white/[0.02]' : 'opacity-60'
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {notif.type === 'REQUEST' && (
                  <Bell className="w-4 h-4 text-[#0099FF]" />
                )}
                {notif.type === 'INVOICE' && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                )}
                {notif.type === 'PROJECT' && (
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                )}
                {notif.type === 'SECURITY' && (
                  <Shield className="w-4 h-4 text-rose-400" />
                )}
              </div>

              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h5 className="text-xs font-mono font-medium text-white truncate">
                    {notif.title}
                  </h5>
                  <span className="text-[10px] font-mono text-white/40 shrink-0">
                    {notif.timestamp}
                  </span>
                </div>
                <p className="text-[11px] font-mono text-white/60 line-clamp-2 leading-relaxed">
                  {notif.message}
                </p>
              </div>
            </button>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-3 bg-[#050505] border-t border-white/10 text-center">
        <span className="text-[10px] font-mono text-white/40">
          OPERATING SYSTEM NOTIFICATIONS ACTIVE
        </span>
      </div>
    </div>
  );
};
