import React from 'react';
import { DashboardPage } from './dashboard/DashboardPage';

interface AdminDashboardPlaceholderProps {
  onNavigate: (route: string) => void;
  onTriggerToast: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
  simulatedState?: 'normal' | 'skeleton' | 'empty' | 'error';
}

export const AdminDashboardPlaceholder: React.FC<AdminDashboardPlaceholderProps> = (props) => {
  return <DashboardPage {...props} />;
};
