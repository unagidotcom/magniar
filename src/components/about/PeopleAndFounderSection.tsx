import React from 'react';
import { FOUNDER_PLACEHOLDER } from '../../data/aboutData';
import { User, ShieldAlert, Lock, Code2 } from 'lucide-react';

export const PeopleAndFounderSection: React.FC = () => {
  const founder = FOUNDER_PLACEHOLDER;

  return (
    <section className="py-20 sm:py-28 border-b border-white/10 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <span className="font-mono text-xs text-[#B89A72] tracking-[0.2em] uppercase font-semibold block">
            [ 10 — LEADERSHIP & TEAM ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F7FA] uppercase">
            THE PEOPLE <span className="text-[#B89A72]">BEHIND MAGNIAR</span>
          </h2>
          <p className="text-base text-[#8D949E] leading-relaxed">
            We hold an absolute standard of transparency. We do not display stock photos, fabricate employee rosters, or invent fake partner bios.
          </p>
        </div>

        {/* TEAM PLACEHOLDER SYSTEM DISPLAY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Team Status Card */}
          <div className="lg:col-span-7 p-8 bg-[#080B10] border border-white/15 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 font-mono text-xs">
              <span className="text-[#B89A72] font-bold flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#B89A72]" />
                TRANSPARENCY GUARANTEE
              </span>
              <span className="text-[#8D949E]">VERIFIED PROFILES ONLY</span>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-white uppercase font-mono">
                TEAM PROFILES & FOUNDER SPOTLIGHT
              </h3>
              <p className="text-sm text-[#8D949E] leading-relaxed">
                Magniar operates as a disciplined, senior-led growth and engineering collective. Complete individual leadership profiles, founder bio, and technical team spotlights will be published as verified records upon official client onboarding rollout.
              </p>
            </div>

            <div className="p-4 bg-[#050505] border border-white/10 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-white">
                <span className="text-[#8D949E]">TEAM STATUS:</span>
                <span className="text-[#B89A72] font-bold">ACTIVE & DISTRIBUTED</span>
              </div>
              <div className="flex items-center justify-between text-[#8D949E]">
                <span>SENIOR MEDIA BUYERS & ENGINEERS:</span>
                <span className="text-white">ONBOARDED</span>
              </div>
              <div className="flex items-center justify-between text-[#8D949E]">
                <span>CMS FOUNDER PROFILE RECORD:</span>
                <span className="text-white">PREPARED FOR BINDING</span>
              </div>
            </div>
          </div>

          {/* Right Column: Founder CMS Record Container (Placeholder structure ready for real binding) */}
          <div className="lg:col-span-5 p-8 bg-[#080B10] border border-dashed border-white/20 relative space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 font-mono text-xs">
              <span className="text-white/40 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5" />
                FOUNDER RECORD
              </span>
              <span className="text-xs px-2 py-0.5 bg-white/5 border border-white/10 text-[#8D949E]">
                RECORD ID: {founder.id}
              </span>
            </div>

            <div className="flex flex-col items-center text-center py-6 space-y-4">
              <div className="w-24 h-24 rounded-full bg-[#050505] border border-white/15 flex items-center justify-center text-white/30">
                <User className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <span className="font-mono text-xs text-[#B89A72] font-bold block">
                  {founder.name || '[ FOUNDER NAME PLACEHOLDER ]'}
                </span>
                <span className="font-mono text-xs text-[#8D949E] block">
                  {founder.role || 'Managing Director & Growth Architect'}
                </span>
              </div>

              <p className="text-xs text-[#8D949E] font-mono leading-relaxed max-w-sm">
                {founder.bio || 'Founder biography and personal statement will populate dynamically from the administrative CMS once verified.'}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-[#8D949E]">
              <span className="flex items-center gap-1.5">
                <Code2 className="w-3 h-3 text-[#B89A72]" />
                CMS READY
              </span>
              <span>NO ARTIFICIAL STOCK PHOTOS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
