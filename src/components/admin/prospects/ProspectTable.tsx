import React from 'react';
import { Prospect } from '../../../types/prospects';
import { AdminStatusBadge } from '../AdminStatusBadge';
import { Eye, ExternalLink, UserCheck, Clock, Layers } from 'lucide-react';

interface ProspectTableProps {
  prospects: Prospect[];
  onOpenProspect: (prospect: Prospect) => void;
  onOpenSourceRequest?: (requestCode: string) => void;
}

export const ProspectTable: React.FC<ProspectTableProps> = ({
  prospects,
  onOpenProspect,
  onOpenSourceRequest,
}) => {
  return (
    <div className="bg-[#0A0A0C] border border-white/10 rounded-[2px] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead className="bg-[#050505] border-b border-white/10 text-white/40 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-3.5">Prospect ID / Contact</th>
              <th className="p-3.5">Business</th>
              <th className="p-3.5">Type / Model</th>
              <th className="p-3.5">Opportunity (Media vs Fee)</th>
              <th className="p-3.5">Services</th>
              <th className="p-3.5">Est. Contract</th>
              <th className="p-3.5">Stage</th>
              <th className="p-3.5">Owner</th>
              <th className="p-3.5">Next Action</th>
              <th className="p-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.05]">
            {prospects.map((pro) => (
              <tr
                key={pro.id}
                onClick={() => onOpenProspect(pro)}
                className="hover:bg-white/[0.02] cursor-pointer transition-colors group"
              >
                {/* ID & Contact */}
                <td className="p-3.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-[#0099FF] group-hover:underline">
                      {pro.id}
                    </span>
                    {pro.source_request_code && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOpenSourceRequest) onOpenSourceRequest(pro.source_request_code!);
                        }}
                        className="text-[9px] text-white/40 hover:text-white bg-white/5 border border-white/10 px-1 py-0.5 rounded"
                        title={`Source Request: ${pro.source_request_code}`}
                      >
                        {pro.source_request_code}
                      </button>
                    )}
                  </div>
                  <div className="text-white font-medium mt-0.5">{pro.contact_name}</div>
                  <div className="text-[11px] text-white/40 truncate max-w-[140px]">{pro.email}</div>
                </td>

                {/* Business */}
                <td className="p-3.5">
                  <div className="text-white font-medium">{pro.business_name}</div>
                  {pro.website && (
                    <a
                      href={pro.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[11px] text-[#0099FF] hover:underline inline-flex items-center gap-1 mt-0.5"
                    >
                      <span>{pro.website.replace('https://', '')}</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </td>

                {/* Business Type */}
                <td className="p-3.5">
                  <div className="text-white/80 font-medium">{pro.industry}</div>
                  <div className="text-[10px] text-white/40">{pro.business_model}</div>
                </td>

                {/* Opportunity breakdown */}
                <td className="p-3.5">
                  <div className="text-white/90">
                    <span className="text-[10px] text-white/40 uppercase block">MEDIA</span>
                    <span>{pro.opportunity.media_budget}</span>
                  </div>
                  <div className="text-emerald-400 font-semibold mt-0.5">
                    <span className="text-[10px] text-emerald-500/70 uppercase block">FEE</span>
                    <span>{pro.opportunity.service_fee}</span>
                  </div>
                </td>

                {/* Services */}
                <td className="p-3.5 max-w-[180px]">
                  <div className="flex flex-wrap gap-1">
                    {pro.services.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="text-[9px] px-1.5 py-0.5 bg-white/5 text-white/80 border border-white/10 rounded-[2px]"
                      >
                        {s}
                      </span>
                    ))}
                    {pro.services.length > 3 && (
                      <span className="text-[9px] px-1.5 py-0.5 bg-white/5 text-white/40 border border-white/10 rounded-[2px]">
                        +{pro.services.length - 3}
                      </span>
                    )}
                  </div>
                </td>

                {/* Est Value */}
                <td className="p-3.5 font-bold text-emerald-400">
                  {pro.opportunity.estimated_contract_value}
                </td>

                {/* Stage */}
                <td className="p-3.5">
                  <AdminStatusBadge status={pro.stage} />
                </td>

                {/* Owner */}
                <td className="p-3.5 text-white/80">
                  <div className="flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-[#0099FF]" />
                    <span>{pro.owner}</span>
                  </div>
                </td>

                {/* Next Action */}
                <td className="p-3.5 max-w-[160px]">
                  <div className="text-amber-300 text-[11px] font-medium truncate">
                    {pro.next_action.title}
                  </div>
                  <div className="text-[10px] text-white/40 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    <span>{pro.next_action.due_date}</span>
                  </div>
                </td>

                {/* Action */}
                <td className="p-3.5 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenProspect(pro);
                    }}
                    className="px-2.5 py-1 bg-[#0099FF]/10 hover:bg-[#0099FF]/20 text-[#0099FF] rounded-[2px] border border-[#0099FF]/30 text-[11px] inline-flex items-center gap-1 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
