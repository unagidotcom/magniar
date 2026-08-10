import React, { useState } from 'react';
import { Project, ProjectPlatform } from '../../../types/projects';
import { Cpu, Link2, CheckCircle2, AlertTriangle, Shield, ExternalLink, RefreshCw } from 'lucide-react';

interface ProjectStrategyPlatformsProps {
  project: Project;
  onTriggerToast?: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
}

export const ProjectStrategyPlatforms: React.FC<ProjectStrategyPlatformsProps> = ({
  project,
  onTriggerToast,
}) => {
  const [connectingPlatform, setConnectingPlatform] = useState<string | null>(null);

  const handleSimulateConnection = (platformName: string) => {
    setConnectingPlatform(platformName);
    setTimeout(() => {
      setConnectingPlatform(null);
      if (onTriggerToast) {
        onTriggerToast(
          'info',
          'Platform API Configuration',
          `Selected ${platformName} API authorization dialog. In production, OAuth token flow will link advertising metrics.`
        );
      }
    }, 600);
  };

  return (
    <div className="space-y-4 font-mono text-xs">
      {/* Strategy Card */}
      <div className="p-4 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <h3 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#0099FF]" />
            <span>ATTACHED STRATEGY MODULE</span>
          </h3>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
            STRATEGY READY
          </span>
        </div>

        {project.strategy ? (
          <div className="p-3 bg-[#050505] border border-white/10 rounded-[2px] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-xs">{project.strategy.title}</span>
              <span className="text-[10px] text-white/40">Updated: {project.strategy.last_updated}</span>
            </div>
            <p className="text-white/70 text-[11px]">{project.strategy.description}</p>
            <div className="pt-1 text-[10px] text-[#0099FF] flex items-center gap-1 font-semibold">
              <span>View Full Growth Blueprint Architecture →</span>
            </div>
          </div>
        ) : (
          <div className="p-3 bg-[#050505] border border-white/5 rounded-[2px] text-white/40 text-[11px] text-center">
            No formal growth strategy brief attached. Click to link or draft a strategic blueprint.
          </div>
        )}
      </div>

      {/* Connected Platforms & Data Sources */}
      <div className="p-4 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              <Link2 className="w-4 h-4 text-[#0099FF]" />
              <span>PLATFORMS & DATA SOURCES INTEGRATION</span>
            </h3>
            <p className="text-white/50 text-[11px] mt-0.5">
              Advertising channels, analytics instances, and e-commerce platforms connected to this project.
            </p>
          </div>

          <span className="text-[9px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/40 font-bold uppercase">
            PROTOTYPE INTEGRATION STATE
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {project.platforms.map((plat) => (
            <div
              key={plat.name}
              className="p-3 bg-[#050505] border border-white/10 rounded-[2px] flex items-center justify-between gap-2"
            >
              <div className="space-y-0.5">
                <div className="font-bold text-white text-xs">{plat.name}</div>
                <div className="text-[9px] text-white/40 uppercase">{plat.category}</div>
              </div>

              {plat.status === 'CONNECTED' ? (
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold rounded uppercase flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  LINKED
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => handleSimulateConnection(plat.name)}
                  disabled={connectingPlatform === plat.name}
                  className="px-2 py-0.5 bg-[#0099FF]/10 hover:bg-[#0099FF]/20 text-[#0099FF] border border-[#0099FF]/30 text-[9px] font-bold rounded uppercase transition-colors"
                >
                  {connectingPlatform === plat.name ? 'CONNECTING...' : 'CONNECT'}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Prototype API Notice */}
        <div className="p-3 bg-[#050505] border border-white/10 rounded-[2px] text-white/60 text-[11px] flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-300 uppercase text-[10px] block">LIVE METRICS & API CONNECTIONS:</strong>
            Rather than fabricating unverified ad account KPIs, platform APIs (Meta Ads, Google Ads, GA4) require OAuth token authorization to pull real-time spend and conversion data.
          </div>
        </div>
      </div>
    </div>
  );
};
