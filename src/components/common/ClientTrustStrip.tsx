import React, { useEffect, useState } from 'react';
import { TechnicalLabel } from './TechnicalLabel';
import { HomepageClient, listHomepageClients } from '../../services/homepageClientService';
import { ExternalLink, Building2 } from 'lucide-react';
import { ClientLogo } from './ClientLogo';

export const ClientTrustStrip: React.FC = () => {
  const [clients, setClients] = useState<HomepageClient[]>([]);

  useEffect(() => {
    let isMounted = true;

    listHomepageClients().then((rows) => {
      if (isMounted) {
        setClients(rows);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="w-full bg-[#030508] border-y border-white/10 py-20 sm:py-24 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-10 space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <TechnicalLabel text="CLIENT TRUST" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#0099FF]" />
              <span className="font-sans text-xs text-slate-400 uppercase tracking-wider font-semibold">
                PUBLISHED FROM ADMIN OS
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.08]">
              Trusted by businesses building what comes next.
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg">
            Client names and logos shown here are controlled from the Admin OS client directory.
          </p>
        </div>

        {clients.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {clients.map((item) => (
              <a
                key={item.id}
                href={item.website || undefined}
                target={item.website ? '_blank' : undefined}
                rel={item.website ? 'noreferrer' : undefined}
                className="p-5 bg-[#080B10] border border-white/10 hover:border-[#0099FF]/40 transition-all rounded-[2px] group min-h-[172px] flex flex-col justify-between"
              >
                <ClientLogo name={item.business_name} logoUrl={item.logo_url} />

                <div className="space-y-2 pt-5">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-heading text-base font-bold text-slate-100 group-hover:text-[#0099FF] transition-colors leading-tight">
                      {item.business_name}
                    </span>
                    {item.website && <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-[#0099FF] shrink-0" />}
                  </div>
                  <span className="font-sans text-sm text-slate-400 font-medium block">
                    {item.homepage_label || item.industry}
                  </span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="p-8 sm:p-10 bg-[#080B10] border border-white/10 rounded-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="font-heading text-2xl font-bold text-white">
                Published client logos will appear here.
              </h3>
              <p className="text-sm text-slate-400 max-w-2xl">
                Add a client in Admin OS, include a logo URL, and keep homepage visibility enabled to publish it here.
              </p>
            </div>
            <div className="h-16 w-32 bg-[#050505] border border-white/10 rounded-[2px] flex items-center justify-center text-[#0099FF]">
              <Building2 className="w-6 h-6" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
