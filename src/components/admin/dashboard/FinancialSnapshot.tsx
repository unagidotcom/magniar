import React from 'react';
import { DollarSign, FileText, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { FinancialSummary, RevenueDataPoint } from '../../../services/dashboardService';
import { RevenueTrendChart } from './RevenueTrendChart';

interface FinancialSnapshotProps {
  financial: FinancialSummary;
  trendData: RevenueDataPoint[];
}

export const FinancialSnapshot: React.FC<FinancialSnapshotProps> = ({
  financial,
  trendData,
}) => {
  return (
    <div className="bg-[#0A0A0C] border border-white/10 rounded-[2px] p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs font-mono font-medium text-white uppercase tracking-wider">
            FINANCIAL & SETTLEMENT SNAPSHOT
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] text-white/40 uppercase">
            AGENCY RETAINERS (EXCLUDES CLIENT MEDIA SPEND)
          </span>
          <span className="font-mono text-[9px] text-amber-400 bg-amber-400/10 border border-amber-400/20 px-1.5 py-0.5 rounded-[2px] uppercase">
            DEMO DATA
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-[#050505] border border-white/5 rounded-[2px] space-y-1">
          <span className="font-mono text-[10px] text-white/40 uppercase">
            MONTHLY REVENUE
          </span>
          <div className="text-base font-display font-semibold text-white">
            {financial.monthlyRevenue}
          </div>
          <div className="font-mono text-[10px] text-emerald-400">
            {financial.revenueGrowth} vs prev mo
          </div>
        </div>

        <div className="p-3 bg-[#050505] border border-white/5 rounded-[2px] space-y-1">
          <span className="font-mono text-[10px] text-white/40 uppercase">
            OUTSTANDING
          </span>
          <div className="text-base font-display font-semibold text-amber-300">
            {financial.outstandingInvoices}
          </div>
          <div className="font-mono text-[10px] text-white/40">
            4 Unsettled Invoices
          </div>
        </div>

        <div className="p-3 bg-[#050505] border border-white/5 rounded-[2px] space-y-1">
          <span className="font-mono text-[10px] text-white/40 uppercase">
            OVERDUE
          </span>
          <div className="text-base font-display font-semibold text-rose-400">
            {financial.overdueInvoices}
          </div>
          <div className="font-mono text-[10px] text-rose-400/80">
            1 Invoice &gt;7 Days
          </div>
        </div>

        <div className="p-3 bg-[#050505] border border-white/5 rounded-[2px] space-y-1">
          <span className="font-mono text-[10px] text-white/40 uppercase">
            PAID THIS MONTH
          </span>
          <div className="text-base font-display font-semibold text-emerald-400">
            {financial.paidThisMonth}
          </div>
          <div className="font-mono text-[10px] text-white/40">
            Wire / ACH Settled
          </div>
        </div>
      </div>

      {/* Revenue Trend Line Chart */}
      <RevenueTrendChart data={trendData} />
    </div>
  );
};
