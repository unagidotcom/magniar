import React from 'react';
import { CONTACT_OTHER_WAYS } from '../../data/contactData';
import { Mail, Clock, Globe, Phone } from 'lucide-react';

export const ContactOtherWays: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mail':
        return <Mail className="w-5 h-5 text-[#B89A72]" />;
      case 'Clock':
        return <Clock className="w-5 h-5 text-[#B89A72]" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-[#B89A72]" />;
      case 'Phone':
        return <Phone className="w-5 h-5 text-[#B89A72]" />;
      default:
        return <Globe className="w-5 h-5 text-[#B89A72]" />;
    }
  };

  return (
    <section className="py-16 sm:py-24 border-b border-white/10 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <span className="font-mono text-xs text-[#B89A72] tracking-[0.2em] uppercase font-semibold block mb-2">
              [ 02 — OTHER WAYS TO CONNECT ]
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white uppercase tracking-tight">
              DIRECTORY & ACCESS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CONTACT_OTHER_WAYS.map((way, idx) => (
              <div
                key={idx}
                className="p-6 bg-[#080B10] border border-white/10 space-y-3 hover:border-[#B89A72]/40 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#B89A72] font-bold tracking-wider uppercase">
                    0{idx + 1} / {way.label}
                  </span>
                  {getIcon(way.iconName)}
                </div>

                <div className="text-base font-bold text-white font-mono">
                  {way.value}
                </div>

                {way.subValue && (
                  <p className="text-xs text-[#8D949E] font-sans">
                    {way.subValue}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
