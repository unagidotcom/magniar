import React, { useState, useEffect } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { DashboardPage } from './dashboard/DashboardPage';
import { ClientsPage } from './clients/ClientsPage';
import { InvoicesPage } from './invoices/InvoicesPage';
import { SettingsPage } from './settings/SettingsPage';
import { WebsitesPage } from './websites/WebsitesPage';
import { AdminModulePlaceholder } from './AdminModulePlaceholder';
import { AdminLogin } from './AdminLogin';
import { AdminToast, ToastMessage } from './AdminToast';
import { MockNotification } from '../../data/adminMockData';
import { supabase, isSupabaseConfigured, checkIsUserAdmin } from '../../lib/supabase';
import { listProjectRequests } from '../../services/projectRequestService';
import {
  AdminDisplayProfile,
  defaultAdminDisplayProfile,
  getCurrentAdminDisplayProfile,
} from '../../services/adminProfileService';

const ADMIN_ROUTES = new Set([
  'dashboard',
  'requests',
  'prospects',
  'clients',
  'websites',
  'projects',
  'campaigns',
  'strategies',
  'proposals',
  'invoices',
  'payments',
  'reports',
  'content',
  'team',
  'settings',
]);

const routeFromAdminPath = (fallback = 'dashboard') => {
  if (typeof window === 'undefined') return fallback;

  const [, adminSegment, routeSegment] = window.location.pathname.split('/');
  if (adminSegment !== 'admin') return fallback;
  if (!routeSegment || routeSegment === 'login') return fallback;

  return ADMIN_ROUTES.has(routeSegment) ? routeSegment : fallback;
};

const pathForAdminRoute = (route: string) => (route === 'dashboard' ? '/admin' : `/admin/${route}`);

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
  const [currentRoute, setCurrentRoute] = useState<string>(() => routeFromAdminPath(initialRoute));
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<MockNotification[]>([]);
  const [openRequestsCount, setOpenRequestsCount] = useState<number>(0);
  const [adminProfile, setAdminProfile] = useState<AdminDisplayProfile>(defaultAdminDisplayProfile);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [adminDataRevision, setAdminDataRevision] = useState<number>(0);

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
    setCurrentRoute(routeFromAdminPath(initialRoute));
  }, [initialRoute]);

  useEffect(() => {
    const handleAdminPopState = () => {
      if (window.location.pathname.startsWith('/admin')) {
        setCurrentRoute(routeFromAdminPath('dashboard'));
      }
    };

    window.addEventListener('popstate', handleAdminPopState);
    return () => window.removeEventListener('popstate', handleAdminPopState);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      setOpenRequestsCount(0);
      setAdminProfile(defaultAdminDisplayProfile);
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

    getCurrentAdminDisplayProfile()
      .then(setAdminProfile)
      .catch((err) => {
        console.error('Admin display profile load failed:', err);
        setAdminProfile(defaultAdminDisplayProfile);
      });
  }, [isAuthenticated, currentRoute]);

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

  const handleNavigate = (route: string) => {
    const nextRoute = ADMIN_ROUTES.has(route) ? route : 'dashboard';
    setCurrentRoute(nextRoute);

    if (typeof window !== 'undefined' && isAuthenticated) {
      const nextPath = pathForAdminRoute(nextRoute);
      if (window.location.pathname !== nextPath) {
        window.history.pushState({}, '', nextPath);
      }
    }
  };

  const handleNotificationClick = (notif: MockNotification) => {
    handleNavigate(notif.route_target);
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

  const handleAdminDataChanged = () => {
    setAdminDataRevision((revision) => revision + 1);
  };

  // Sync URL history state
  useEffect(() => {
    if (isCheckingSession) return;

    if (typeof window !== 'undefined') {
      if (isAuthenticated) {
        if (!window.location.pathname.startsWith('/admin') || window.location.pathname === '/admin/login') {
          window.history.replaceState({}, '', pathForAdminRoute(currentRoute));
        }
      } else if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.history.replaceState({}, '', '/admin/login');
      }
    }
  }, [isAuthenticated, currentRoute, isCheckingSession]);

  // Loading indicator during session check
  if (isCheckingSession) {
    return (
      <div className="magniar-admin-shell min-h-screen bg-[#050505] text-[#F5F7FA] flex items-center justify-center text-xs">
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
          const routeAfterLogin = routeFromAdminPath('dashboard');
          setCurrentRoute(routeAfterLogin);
          if (typeof window !== 'undefined') {
            window.history.replaceState({}, '', pathForAdminRoute(routeAfterLogin));
          }
          triggerToast('success', 'Authenticated Successfully', 'Welcome to Magniar Operating System.');
        }}
        onReturnToPublicSite={onReturnToPublicSite}
      />
    );
  }

  return (
    <div className="magniar-admin-shell min-h-screen bg-[#050505] text-[#F5F7FA] flex flex-col lg:flex-row antialiased selection:bg-[#0099FF] selection:text-white">
      {/* Sidebar */}
      <AdminSidebar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        openRequestsCount={openRequestsCount}
        onSignOut={handleSignOut}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
        adminProfile={adminProfile}
      />

      {/* Main App Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Header */}
        <AdminHeader
          currentRoute={currentRoute}
          onNavigate={handleNavigate}
          onMobileMenuToggle={() => setMobileSidebarOpen(true)}
          notifications={notifications}
          onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
          onNotificationClick={handleNotificationClick}
          onSignOut={handleSignOut}
          onReturnToPublicSite={onReturnToPublicSite}
          adminProfile={adminProfile}
        />

        {/* View Content */}
        <main className="flex-1 min-w-0 overflow-x-hidden p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
          {currentRoute === 'dashboard' ? (
            <DashboardPage
              onNavigate={handleNavigate}
              onTriggerToast={triggerToast}
              simulatedState={simulatedState}
              refreshKey={adminDataRevision}
            />
          ) : currentRoute === 'clients' ? (
            <ClientsPage
              onNavigate={handleNavigate}
              onTriggerToast={triggerToast}
              simulatedState={simulatedState}
            />
          ) : currentRoute === 'websites' ? (
            <WebsitesPage
              onNavigate={handleNavigate}
              onTriggerToast={triggerToast}
              simulatedState={simulatedState}
            />
          ) : currentRoute === 'invoices' ? (
            <InvoicesPage
              onNavigate={handleNavigate}
              onTriggerToast={triggerToast}
              simulatedState={simulatedState}
              onLedgerChange={handleAdminDataChanged}
            />
          ) : currentRoute === 'settings' ? (
            <SettingsPage
              onTriggerToast={triggerToast}
              simulatedState={simulatedState}
              adminProfile={adminProfile}
              onAdminProfileChange={setAdminProfile}
            />
          ) : (
            <AdminModulePlaceholder
              route={currentRoute}
              onNavigate={handleNavigate}
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
