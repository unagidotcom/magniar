import React, { useState, useEffect } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { DashboardPage } from './dashboard/DashboardPage';
import { ClientsPage } from './clients/ClientsPage';
import { InvoicesPage } from './invoices/InvoicesPage';
import { SettingsPage } from './settings/SettingsPage';
import { AdminModulePlaceholder } from './AdminModulePlaceholder';
import { AdminLogin } from './AdminLogin';
import { AdminToast, ToastMessage } from './AdminToast';
import { MockNotification } from '../../data/adminMockData';
import { supabase, isSupabaseConfigured, checkIsUserAdmin } from '../../lib/supabase';
import { listProjectRequests } from '../../services/projectRequestService';

interface AdminShellProps {
  onReturnToPublicSite?: () => void;
  initialRoute?: string;
  initialAuthStatus?: boolean;
  simulatedState?: 'normal' | 'skeleton' | 'empty' | 'error';
}

export const AdminShell: React.FC<AdminShellProps> = ({
  onReturnToPublicSite,
  initialRoute = 'dashboard',
  initialAuthStatus = false,
  simulatedState = 'normal',
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAuthStatus);
  const [isCheckingSession, setIsCheckingSession] = useState<boolean>(isSupabaseConfigured);
  const [currentRoute, setCurrentRoute] = useState<string>(initialRoute);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<MockNotification[]>([]);
  const [openRequestsCount, setOpenRequestsCount] = useState<number>(0);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Check Supabase session on mount & subscribe to auth changes
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setIsCheckingSession(false);
      return;
    }

    let isMounted = true;

    // Verify existing active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!isMounted) return;
      if (session?.user) {
        checkIsUserAdmin(
          session.user.id,
          session.user.email,
          session.user.user_metadata,
          session.user.app_metadata
        )
          .then((isAdmin) => {
            if (isMounted) {
              setIsAuthenticated(isAdmin);
              setIsCheckingSession(false);
              if (!isAdmin) {
                void supabase.auth.signOut();
              }
            }
          })
          .catch(() => {
            if (isMounted) {
              setIsAuthenticated(false);
              setIsCheckingSession(false);
            }
          });
      } else {
        setIsAuthenticated(false);
        setIsCheckingSession(false);
      }
    });

    // Auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        checkIsUserAdmin(
          session.user.id,
          session.user.email,
          session.user.user_metadata,
          session.user.app_metadata
        ).then(
          (isAdmin) => {
            if (isMounted) {
              setIsAuthenticated(isAdmin);
              setIsCheckingSession(false);
              if (!isAdmin) {
                void supabase.auth.signOut();
              }
            }
          }
        );
      } else {
        if (isMounted) {
          setIsAuthenticated(false);
          setIsCheckingSession(false);
        }
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setCurrentRoute(initialRoute);
  }, [initialRoute]);

  useEffect(() => {
    if (!isAuthenticated) {
      setOpenRequestsCount(0);
      return;
    }

    listProjectRequests()
      .then((rows) => {
        setOpenRequestsCount(rows.filter((row) => row.status === 'NEW').length);
      })
      .catch((err) => {
        console.error('Open request count load failed:', err);
        setOpenRequestsCount(0);
      });
  }, [isAuthenticated, currentRoute]);

  // Sync URL history state
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isAuthenticated) {
        if (!window.location.pathname.startsWith('/admin') || window.location.pathname === '/admin/login') {
          window.history.pushState({}, '', '/admin');
        }
      } else {
        if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
          window.history.pushState({}, '', '/admin/login');
        }
      }
    }
  }, [isAuthenticated]);

  // Toast trigger helper
  const triggerToast = (type: 'success' | 'info' | 'error', title: string, message?: string) => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      type,
      title,
      message,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    triggerToast('info', 'Notifications Read', 'All system notifications marked as read.');
  };

  const handleNotificationClick = (notif: MockNotification) => {
    setCurrentRoute(notif.route_target);
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, is_read: true } : n))
    );
    triggerToast('info', 'Navigated from Activity Log', `Opened ${notif.route_target} view.`);
  };

  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setIsAuthenticated(false);
    triggerToast('info', 'Signed Out', 'Admin session terminated safely.');
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/admin/login');
    }
  };

  // Loading indicator during session check
  if (isCheckingSession) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#F5F7FA] flex items-center justify-center font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#0099FF] animate-ping" />
          <span className="text-[#8D949E] uppercase tracking-widest">
            VERIFYING ADMINISTRATOR SESSION...
          </span>
        </div>
      </div>
    );
  }

  // Unauthenticated -> Show AdminLogin screen (/admin/login)
  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={() => {
          setIsAuthenticated(true);
          setCurrentRoute('dashboard');
          if (typeof window !== 'undefined') {
            window.history.pushState({}, '', '/admin');
          }
          triggerToast('success', 'Authenticated Successfully', 'Welcome to Magniar Operating System.');
        }}
        onReturnToPublicSite={onReturnToPublicSite}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F7FA] flex flex-col lg:flex-row antialiased selection:bg-[#0099FF] selection:text-white font-mono">
      {/* Sidebar */}
      <AdminSidebar
        currentRoute={currentRoute}
        onNavigate={(r) => setCurrentRoute(r)}
        openRequestsCount={openRequestsCount}
        onSignOut={handleSignOut}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main App Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Header */}
        <AdminHeader
          currentRoute={currentRoute}
          onNavigate={(r) => setCurrentRoute(r)}
          onMobileMenuToggle={() => setMobileSidebarOpen(true)}
          notifications={notifications}
          onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
          onNotificationClick={handleNotificationClick}
          onSignOut={handleSignOut}
          onReturnToPublicSite={onReturnToPublicSite}
        />

        {/* View Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
          {currentRoute === 'dashboard' ? (
            <DashboardPage
              onNavigate={(r) => setCurrentRoute(r)}
              onTriggerToast={triggerToast}
              simulatedState={simulatedState}
            />
          ) : currentRoute === 'clients' ? (
            <ClientsPage
              onNavigate={(r) => setCurrentRoute(r)}
              onTriggerToast={triggerToast}
              simulatedState={simulatedState}
            />
          ) : currentRoute === 'invoices' ? (
            <InvoicesPage
              onNavigate={(r) => setCurrentRoute(r)}
              onTriggerToast={triggerToast}
              simulatedState={simulatedState}
            />
          ) : currentRoute === 'settings' ? (
            <SettingsPage
              onTriggerToast={triggerToast}
              simulatedState={simulatedState}
            />
          ) : (
            <AdminModulePlaceholder
              route={currentRoute}
              onNavigate={(r) => setCurrentRoute(r)}
              onTriggerToast={triggerToast}
              simulatedState={simulatedState}
            />
          )}
        </main>
      </div>

      {/* Toast Overlay */}
      <AdminToast toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
};
