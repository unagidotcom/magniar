import React from 'react';
import { Inbox, Eye, ArrowRight } from 'lucide-react';
import { MockRequest } from '../../../data/adminMockData';
import { AdminStatusBadge } from '../AdminStatusBadge';

interface RecentRequestsTableProps {
  requests: MockRequest[];
  selectedStage: string | null;
  onInspectRequest: (req: MockRequest) => void;
  onNavigateToRequests: () => void;
}

export const RecentRequestsTable: React.FC<RecentRequestsTableProps> = ({
  requests,
  selectedStage,
  onInspectRequest,
  onNavigateToRequests,
}) => {
  const filtered = selectedStage
    ? requests.filter((r) => r.status === selectedStage)
    : requests;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Inbox className="w-4 h-4 text-[#0099FF]" />
          <h2 className="text-xs font-mono font-medium text-white uppercase tracking-wider">
            RECENT INTAKE REQUESTS
          </h2>
          {selectedStage && (
            <span className="font-mono text-[10px] text-[#0099FF] bg-[#0099FF]/10 border border-[#0099FF]/30 px-2 py-0.5 rounded-[2px]">
              FILTERED BY: {selectedStage} ({filtered.length})
            </span>
          )}
        </div>

        <button
          onClick={onNavigateToRequests}
          className="text-xs font-mono text-[#0099FF] hover:underline flex items-center gap-1"
        >
          <span>View All Queue ({requests.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="bg-[#0A0A0C] border border-white/10 rounded-[2px] overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-8 text-center space-y-2">
            <p className="font-mono text-xs text-white/50">
              No recent requests matching status stage "{selectedStage}".
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#050505] border-b border-white/10 text-white/40 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5">Request</th>
                  <th className="p-3.5">Business</th>
                  <th className="p-3.5">Type</th>
                  <th className="p-3.5">Services</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {filtered.map((req) => (
                  <tr
                    key={req.id}
                    className="hover:bg-white/[0.02] transition-colors cursor-pointer group"
                    onClick={() => onInspectRequest(req)}
                  >
                    <td className="p-3.5 text-[#0099FF] font-medium font-mono">
                      {req.code}
                    </td>
                    <td className="p-3.5">
                      <div className="text-white font-medium group-hover:text-[#0099FF] transition-colors">
                        {req.company}
                      </div>
                      <div className="text-[10px] text-white/40">
                        {req.client_name}
                      </div>
                    </td>
                    <td className="p-3.5 text-white/60 text-[11px]">
                      {req.industry}
                    </td>
                    <td className="p-3.5 text-white/80 max-w-xs truncate text-[11px]">
                      {req.subject}
                    </td>
                    <td className="p-3.5">
                      <AdminStatusBadge status={req.status} size="sm" />
                    </td>
                    <td className="p-3.5 text-white/50 text-[11px]">
                      {req.created_at.split(' ')[0]}
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onInspectRequest(req);
                        }}
                        className="px-2.5 py-1 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white rounded-[2px] border border-white/10 text-[10px] inline-flex items-center gap-1 transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        <span>VIEW →</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};
