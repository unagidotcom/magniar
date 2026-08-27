import React, { useEffect, useState } from 'react';
import { HomepageClient, listHomepageClients } from '../../services/homepageClientService';
import { Building2 } from 'lucide-react';
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
    <section className="w-full bg-[#FFFFFF] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-[1180px]">
        <div className="border-y border-[#D9DEE5] py-8 text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#B89A72]">
            Trusted by growing brands
          </span>

          {clients.length > 0 ? (
            <div className="mx-auto mt-7 grid max-w-[1040px] grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
              {clients.map((item) => (
                <a
                  key={item.id}
                  href={item.website || undefined}
                  target={item.website ? '_blank' : undefined}
                  rel={item.website ? 'noreferrer' : undefined}
                  aria-label={item.website ? `Open ${item.business_name} website` : item.business_name}
                  className="group flex h-[92px] items-center justify-center rounded-[16px] bg-[#F5F7FA] px-6 transition-all hover:-translate-y-0.5 hover:bg-[#F4EFE8]"
                >
                  <ClientLogo
                    name={item.business_name}
                    logoUrl={item.logo_url}
                    className="flex h-full w-full items-center justify-center px-3"
                    imageClassName="max-h-12 max-w-full object-contain opacity-90 [filter:brightness(0)]"
                    fallbackClassName="flex items-center gap-2 text-[#0B0D0F]"
                  />
                </a>
              ))}
            </div>
          ) : (
            <div className="mx-auto mt-7 grid max-w-[760px] grid-cols-1 gap-5 rounded-[16px] border border-[#D9DEE5] bg-[#F5F7FA] p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h3 className="font-heading text-xl font-semibold text-[#0B0D0F]">
                  Published client logos will appear here.
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#68717C]">
                  Add a client in Admin OS, include a logo URL, and keep homepage visibility enabled to publish it here.
                </p>
              </div>
              <div className="flex h-16 w-28 items-center justify-center rounded-[12px] bg-[#F4EFE8] text-[#B89A72]">
                <Building2 className="h-6 w-6" />
              </div>
            </div>
          )}

          <div className="mx-auto mt-8 grid max-w-[780px] grid-cols-1 divide-y divide-[#D9DEE5] text-center sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="py-4 sm:py-0">
              <strong className="block font-heading text-2xl font-semibold text-[#0B0D0F]">{clients.length}</strong>
              <span className="text-xs text-[#68717C]">Published clients</span>
            </div>
            <div className="py-4 sm:py-0">
              <strong className="block font-heading text-2xl font-semibold text-[#0B0D0F]">Live</strong>
              <span className="text-xs text-[#68717C]">Admin-managed logos</span>
            </div>
            <div className="py-4 sm:py-0">
              <strong className="block font-heading text-2xl font-semibold text-[#0B0D0F]">On</strong>
              <span className="text-xs text-[#68717C]">Homepage visibility</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
