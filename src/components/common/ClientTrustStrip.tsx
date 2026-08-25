import React, { useEffect, useState } from 'react';
import { HomepageClient, listHomepageClients } from '../../services/homepageClientService';
import { Building2, ExternalLink } from 'lucide-react';
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
    <section className="w-full bg-[#F5F0E8] px-4 py-16 sm:px-6 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid grid-cols-1 gap-8 border-y border-[#D8CDBF] py-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#877969]">Client trust</span>
            <h2 className="mt-3 max-w-[680px] font-heading text-[2rem] font-semibold leading-tight text-[#1F241F] sm:text-[2.55rem]">
              Trusted by businesses building what comes next.
            </h2>
          </div>

          <p className="max-w-[520px] text-sm leading-6 text-[#5D5A50] lg:col-span-5 lg:justify-self-end">
            Client names and logos shown here are controlled from the Admin OS client directory.
          </p>
        </div>

        {clients.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {clients.map((item, index) => (
              <a
                key={item.id}
                href={item.website || undefined}
                target={item.website ? '_blank' : undefined}
                rel={item.website ? 'noreferrer' : undefined}
                className={`group min-h-[168px] rounded-[8px] border border-[#D8CDBF] p-5 transition-transform hover:-translate-y-0.5 ${index % 2 === 0 ? 'bg-[#FFF9EE]' : 'bg-[#E7DDCF]'}`}
              >
                <ClientLogo name={item.business_name} logoUrl={item.logo_url} />

                <div className="space-y-2 pt-5">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-heading text-base font-semibold leading-tight text-[#1F241F]">
                      {item.business_name}
                    </span>
                    {item.website && <ExternalLink className="h-4 w-4 shrink-0 text-[#877969] transition-colors group-hover:text-[#1F241F]" />}
                  </div>
                  <span className="block text-sm font-medium text-[#5D5A50]">
                    {item.homepage_label || item.industry}
                  </span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 rounded-[8px] border border-[#D8CDBF] bg-[#FFF9EE] p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h3 className="font-heading text-xl font-semibold text-[#1F241F]">
                Published client logos will appear here.
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5D5A50]">
                Add a client in Admin OS, include a logo URL, and keep homepage visibility enabled to publish it here.
              </p>
            </div>
            <div className="flex h-16 w-28 items-center justify-center rounded-[8px] bg-[#E0EBDD] text-[#1F241F]">
              <Building2 className="h-6 w-6" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
