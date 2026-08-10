import React from 'react';
import { AdminMetricCard } from '../AdminMetricCard';
import { FinancialSummary } from '../../../services/dashboardService';

interface BusinessMetricsProps {
  financial: FinancialSummary;
  openRequestsCount: number;
}

export const BusinessMetrics: React.FC<BusinessMetricsProps> = ({
  financial,
  openRequestsCount,
}) => {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-mono font-medium text-white/50 uppercase tracking-wider">
          BUSINESS OVERVIEW (AGENCY OPERATIONAL METRICS)
        </h2>
        <span className="font-mono text-[9px] text-amber-400 bg-amber-400/10 border border-amber-400/20 px-1.5 py-0.5 rounded-[2px] uppercase">
          DEMO DATA
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <AdminMetricCard
          label="ACTIVE CLIENTS"
          value={18}
          change="+2 this mo"
          isPositive={true}
          sublabel="100% Retention"
          isDemoData={true}
        />
        <AdminMetricCard
          label="ACTIVE PROJECTS"
          value={24}
          change="SLA On Track"
          isPositive={true}
          sublabel="4 Pillars Live"
          isDemoData={true}
        />
        <AdminMetricCard
          label="OPEN REQUESTS"
          value={openRequestsCount}
          change="7 Intake Queue"
          isPositive={true}
          sublabel="Avg Response: 4.2h"
          isDemoData={true}
        />
        <AdminMetricCard
          label="PROPOSALS"
          value={3}
          change="$1.2M ACV"
          isPositive={true}
          sublabel="Discovery Phase"
          isDemoData={true}
        />
        <AdminMetricCard
          label="OUTSTANDING"
          value={financial.outstandingInvoices}
          change={financial.overdueInvoices}
          isPositive={false}
          sublabel="Ledger Balance"
          isDemoData={true}
        />
        <AdminMetricCard
          label="MONTHLY REVENUE"
          value={financial.monthlyRevenue}
          change={financial.revenueGrowth}
          isPositive={true}
          sublabel="August MRR"
          isDemoData={true}
        />
      </div>
    </section>
  );
};
