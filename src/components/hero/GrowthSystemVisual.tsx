import React, { useState, useEffect, useRef, useMemo } from 'react';
import { HeroInteractionConfig, QuadrantId, PlatformNode } from '../../types/heroInteraction';

interface GrowthSystemVisualProps {
  config?: HeroInteractionConfig;
  onConfigChange?: (newConfig: Partial<HeroInteractionConfig>) => void;
  className?: string;
}

// Complete capability & platform nodes matching Magniar agency ecosystem
const ALL_NODES: PlatformNode[] = [
  // PERFORMANCE
  { id: 'google', name: 'GOOGLE ADS', quadrant: 'performance', technicalRole: 'PAID ACQUISITION & SEARCH', isCore: true },
  { id: 'meta', name: 'META ADS', quadrant: 'performance', technicalRole: 'PAID SOCIAL & RETARGETING', isCore: true },
  { id: 'tiktok', name: 'TIKTOK ADS', quadrant: 'performance', technicalRole: 'SHORT-FORM PERFORMANCE', isCore: false },
  { id: 'linkedin', name: 'LINKEDIN', quadrant: 'performance', technicalRole: 'B2B PERFORMANCE MARKETING', isCore: false },
  { id: 'native', name: 'NATIVE ADS', quadrant: 'performance', technicalRole: 'CONTENT DISCOVERY & NATIVE', isCore: false },

  // COMMERCE
  { id: 'shopify', name: 'SHOPIFY', quadrant: 'commerce', technicalRole: 'STOREFRONT & HEADLESS COMMERCE', isCore: true },
  { id: 'amazon', name: 'AMAZON', quadrant: 'commerce', technicalRole: 'MARKETPLACE & SPONSORED ADS', isCore: true },
  { id: 'walmart', name: 'WALMART', quadrant: 'commerce', technicalRole: 'RETAIL MEDIA NETWORK', isCore: false },
  { id: 'etsy', name: 'ETSY & SHOP', quadrant: 'commerce', technicalRole: 'MULTI-CHANNEL RETAIL', isCore: false },

  // DEVELOPMENT
  { id: 'websites', name: 'WEBSITES & APPS', quadrant: 'development', technicalRole: 'HIGH-PERFORMANCE FRONTENDS', isCore: true },
  { id: 'tracking', name: 'TRACKING & CAPI', quadrant: 'development', technicalRole: 'SERVER-SIDE ATTRIBUTION PIPELINES', isCore: true },
  { id: 'automation', name: 'AUTOMATION & APIS', quadrant: 'development', technicalRole: 'CUSTOM WORKFLOW INTEGRATIONS', isCore: false },

  // INTELLIGENCE
  { id: 'aistrategy', name: 'AI STRATEGY', quadrant: 'intelligence', technicalRole: 'PROPRIETARY AGENTS & AUTOMATION', isCore: true },
  { id: 'datapipelines', name: 'DATA & ANALYTICS', quadrant: 'intelligence', technicalRole: 'UNIFIED METRICS & LTV MODELING', isCore: true },
  { id: 'growthstrategy', name: 'GROWTH STRATEGY', quadrant: 'intelligence', technicalRole: 'CRO & SYSTEM OPTIMIZATION', isCore: false },
];

export const GrowthSystemVisual: React.FC<GrowthSystemVisualProps> = ({
  config = {
    motionActive: true,
    reducedMotion: false,
    density: 'MEDIUM',
    signalActivity: 'MEDIUM',
    cursorResponse: true,
    simulatedPreset: 'NONE',
  },
  onConfigChange,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Interaction State
  const [activeCategory, setActiveCategory] = useState<QuadrantId>(null);
  const [hoveredNode, setHoveredNode] = useState<PlatformNode | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0, relX: 0.5, relY: 0.5 });
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [signalStep, setSignalStep] = useState<number>(0);

  // Filter nodes based on density config (reduce density by 30-40% for clean breathing room)
  const visibleNodes = useMemo(() => {
    if (config.density === 'LOW') {
      return ALL_NODES.filter((n) => n.isCore);
    }
    if (config.density === 'MEDIUM') {
      return ALL_NODES.filter((n) => n.isCore || n.id === 'tiktok' || n.id === 'automation' || n.id === 'growthstrategy');
    }
    return ALL_NODES; // HIGH
  }, [config.density]);

  // Sync with preset simulation modes
  useEffect(() => {
    const preset = config.simulatedPreset;
    if (preset === 'NODE_HOVER' || preset === 'GOOGLE_HOVER') {
      const gNode = ALL_NODES.find((n) => n.id === 'google') || null;
      setHoveredNode(gNode);
      setActiveCategory('performance');
    } else if (preset === 'CATEGORY_FOCUS' || preset === 'PERFORMANCE_FOCUS') {
      setActiveCategory('performance');
      setHoveredNode(null);
    } else if (preset === 'COMMERCE_FOCUS') {
      setActiveCategory('commerce');
      setHoveredNode(null);
    } else if (preset === 'INTELLIGENCE_FOCUS') {
      setActiveCategory('intelligence');
      setHoveredNode(null);
    } else if (preset === 'DEVELOPMENT_FOCUS') {
      setActiveCategory('development');
      setHoveredNode(null);
    } else if (preset === 'CURSOR_NEAR' || preset === 'CURSOR_PROXIMITY') {
      setIsHovering(true);
      setCursorPos({ x: 180, y: 160, relX: 0.35, relY: 0.35 });
      setActiveCategory('performance');
    } else if (preset === 'MOBILE_TAP') {
      setActiveCategory('commerce');
      setHoveredNode(null);
    } else if (preset === 'IDLE_1440' || preset === 'NONE') {
      setActiveCategory(null);
      setHoveredNode(null);
      setIsHovering(false);
    }
  }, [config.simulatedPreset]);

  // Signal Flow Pulse Timer
  useEffect(() => {
    if (!config.motionActive || config.reducedMotion) return;

    const intervalMs =
      config.signalActivity === 'HIGH' ? 1400 : config.signalActivity === 'LOW' ? 3800 : 2400;

    const timer = setInterval(() => {
      setSignalStep((prev) => (prev + 1) % 4);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [config.motionActive, config.reducedMotion, config.signalActivity]);

  // Cursor Proximity & Parallax Mouse Move Handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !config.cursorResponse || config.reducedMotion) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const relX = Math.max(0, Math.min(1, x / rect.width));
    const relY = Math.max(0, Math.min(1, y / rect.height));

    setCursorPos({ x, y, relX, relY });
    setIsHovering(true);

    // Calculate cursor proximity to platform nodes for automatic dynamic hover
    const cursorPercentX = relX * 100;
    const cursorPercentY = relY * 100;

    let closestNode: PlatformNode | null = null;
    let minDistance = 14; // % distance threshold for proximity detection

    visibleNodes.forEach((node) => {
      const pos = nodePositions[node.id];
      if (pos) {
        const dx = pos.x - cursorPercentX;
        const dy = pos.y - cursorPercentY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDistance) {
          minDistance = dist;
          closestNode = node;
        }
      }
    });

    if (closestNode) {
      setHoveredNode(closestNode);
      setActiveCategory(closestNode.quadrant);
    } else if (hoveredNode) {
      // Clear hovered node if moved away
      setHoveredNode(null);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (!config.simulatedPreset || config.simulatedPreset === 'NONE') {
      setActiveCategory(null);
      setHoveredNode(null);
    }
  };

  // Restrained Responsive Parallax Translation & 3D Tilt
  const parallaxX = config.cursorResponse && !config.reducedMotion && isHovering ? (cursorPos.relX - 0.5) * 20 : 0;
  const parallaxY = config.cursorResponse && !config.reducedMotion && isHovering ? (cursorPos.relY - 0.5) * 20 : 0;

  // Category Focus Helpers
  const isCategoryActive = (cat: QuadrantId) => {
    if (activeCategory) return activeCategory === cat;
    if (hoveredNode) return hoveredNode.quadrant === cat;
    return false;
  };

  const isCategoryDimmed = (cat: QuadrantId) => {
    if (!activeCategory && !hoveredNode) return false;
    return !isCategoryActive(cat);
  };

  // Node Positions Map (Normalized % coordinates for asymmetrical network composition)
  const nodePositions: Record<string, { x: number; y: number }> = {
    // Categories
    cat_performance: { x: 22, y: 30 },
    cat_intelligence: { x: 50, y: 16 },
    cat_commerce: { x: 78, y: 30 },
    cat_development: { x: 50, y: 84 },
    center_magniar: { x: 50, y: 50 },

    // Performance Platform Nodes
    google: { x: 8, y: 22 },
    meta: { x: 10, y: 40 },
    tiktok: { x: 28, y: 18 },
    linkedin: { x: 32, y: 38 },
    native: { x: 6, y: 32 },

    // Commerce Platform Nodes
    shopify: { x: 92, y: 22 },
    amazon: { x: 90, y: 40 },
    walmart: { x: 72, y: 18 },
    etsy: { x: 68, y: 38 },

    // Development Nodes
    websites: { x: 26, y: 88 },
    tracking: { x: 50, y: 94 },
    automation: { x: 74, y: 88 },

    // Intelligence Nodes
    aistrategy: { x: 36, y: 10 },
    datapipelines: { x: 64, y: 10 },
    growthstrategy: { x: 50, y: 6 },
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full select-none transition-all duration-200 ease-out ${className}`}
      style={{
        perspective: '1200px',
      }}
    >
      {/* Subtle Proximity Radial Ambient Signal Field */}
      <div
        className={`absolute w-80 h-80 rounded-full bg-[#B89A72]/15 blur-[100px] pointer-events-none transition-all duration-500 ${
          isHovering || activeCategory ? 'opacity-100 scale-100' : 'opacity-20 scale-75'
        }`}
        style={{
          left: `${cursorPos.relX * 100}%`,
          top: `${cursorPos.relY * 100}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Top Technical Role Signal Indicator (Clean, non-SaaS inline text) */}
      <div className="h-8 mb-2 flex items-center justify-between text-xs px-2 font-sans rounded bg-[#0A0D12]/80 border border-white/5 backdrop-blur-sm">
        {hoveredNode ? (
          <div className="flex items-center gap-2 text-[#B89A72] animate-fadeIn">
            <span className="w-2 h-2 rounded-full bg-[#B89A72] animate-ping" />
            <span className="font-heading font-bold tracking-wider text-xs uppercase">{hoveredNode.name}</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-200 font-sans font-medium text-xs">{hoveredNode.technicalRole}</span>
          </div>
        ) : activeCategory ? (
          <div className="flex items-center gap-2 text-[#B89A72]">
            <span className="w-2 h-2 rounded-full bg-[#B89A72]" />
            <span className="font-heading font-bold tracking-wider text-xs uppercase">CATEGORY FOCUS: {activeCategory.toUpperCase()}</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300 font-sans text-xs">CONNECTED TO MAGNIAR GROWTH SYSTEM</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-[#B89A72]/60 animate-pulse" />
            <span className="font-sans font-semibold tracking-wider uppercase text-xs">INTERACTIVE SYSTEM NETWORK — HOVER / MOVE CURSOR</span>
          </div>
        )}
      </div>

      {/* DESKTOP & TABLET EDITORIAL NETWORK CANVAS (>= 768px) WITH 3D LAYER PERSPECTIVE */}
      <div 
        className="hidden sm:block relative w-full h-[460px] sm:h-[500px] rounded-[2px] bg-[#050505]/70 border border-white/10 overflow-hidden transition-transform duration-200 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${parallaxY * -0.5}deg) rotateY(${parallaxX * 0.5}deg)`,
        }}
      >
        
        {/* SVG Network Lines Layer (Base Z-Layer) */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none z-0 transition-transform duration-200"
          style={{ transform: 'translateZ(0px)' }}
        >
          <defs>
            {/* Linear Electric Blue Signal Glow Filter */}
            <filter id="blue-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            {/* Signal Pulse Gradient */}
            <linearGradient id="signal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B89A72" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#B89A72" stopOpacity="1" />
              <stop offset="100%" stopColor="#B89A72" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* 1. Category to Center Connections */}
          {(['performance', 'intelligence', 'commerce', 'development'] as const).map((cat) => {
            const catPos = nodePositions[`cat_${cat}`];
            const centerPos = nodePositions['center_magniar'];
            const isActive = isCategoryActive(cat);
            const isDimmed = isCategoryDimmed(cat);

            return (
              <g key={`link_center_${cat}`}>
                {/* Connection Line */}
                <line
                  x1={`${catPos.x}%`}
                  y1={`${catPos.y}%`}
                  x2={`${centerPos.x}%`}
                  y2={`${centerPos.y}%`}
                  stroke={isActive ? '#B89A72' : 'rgba(255, 255, 255, 0.15)'}
                  strokeWidth={isActive ? 2 : 1}
                  strokeDasharray={isActive ? 'none' : '3 3'}
                  opacity={isDimmed ? 0.2 : 1}
                  className="transition-all duration-300"
                  filter={isActive ? 'url(#blue-glow)' : undefined}
                />

                {/* Signal Pulses moving along line */}
                {config.motionActive && !config.reducedMotion && (isActive || signalStep === (cat === 'performance' ? 0 : cat === 'commerce' ? 1 : cat === 'development' ? 2 : 3)) && (
                  <circle
                    r="3"
                    fill="#B89A72"
                    filter="url(#blue-glow)"
                    className="animate-pulse"
                  >
                    <animateMotion
                      path={`M ${catPos.x * 5} ${catPos.y * 5} L ${centerPos.x * 5} ${centerPos.y * 5}`}
                      dur={config.signalActivity === 'HIGH' ? '1.2s' : '2.2s'}
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
            );
          })}

          {/* 2. Platform Nodes to Parent Category Connections */}
          {visibleNodes.map((node) => {
            const nodePos = nodePositions[node.id];
            const catPos = nodePositions[`cat_${node.quadrant}`];
            if (!nodePos || !catPos) return null;

            const isNodeHovered = hoveredNode?.id === node.id;
            const isCatActive = isCategoryActive(node.quadrant);
            const isDimmed = isCategoryDimmed(node.quadrant);

            return (
              <line
                key={`link_node_${node.id}`}
                x1={`${nodePos.x}%`}
                y1={`${nodePos.y}%`}
                x2={`${catPos.x}%`}
                y2={`${catPos.y}%`}
                stroke={isNodeHovered || isCatActive ? '#B89A72' : 'rgba(255, 255, 255, 0.1)'}
                strokeWidth={isNodeHovered ? 2 : 1}
                opacity={isDimmed ? 0.15 : isNodeHovered ? 1 : 0.6}
                className="transition-all duration-300"
              />
            );
          })}

          {/* 3. Subtle Cross-System Strategic Interlinks (Faint background lines) */}
          <line x1="50%" y1="16%" x2="22%" y2="30%" stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="2 4" />
          <line x1="50%" y1="16%" x2="78%" y2="30%" stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="2 4" />
          <line x1="22%" y1="30%" x2="50%" y2="84%" stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="2 4" />
          <line x1="78%" y1="30%" x2="50%" y2="84%" stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="2 4" />
        </svg>

        {/* DOM HTML Layer: Central Landmark, Categories & Nodes with Z-Translate Parallax */}

        {/* CENTRAL MAGNIAR HUB (Editorial Typographic Landmark) */}
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 text-center z-20 cursor-pointer group transition-transform duration-300"
          style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%) translateZ(25px)' }}
          onClick={() => setActiveCategory(null)}
        >
          {/* Subtle Central Crosshair Pulse */}
          <div className="relative inline-flex items-center justify-center p-3">
            <span className={`absolute w-4 h-4 rounded-full bg-[#B89A72] ${config.motionActive && !config.reducedMotion ? 'animate-ping opacity-50' : 'opacity-0'}`} />
            <span className="w-3 h-3 rounded-full bg-[#B89A72] shadow-[0_0_16px_#B89A72]" />
          </div>

          <div className="mt-1 font-heading font-extrabold tracking-[0.2em] text-base sm:text-lg text-white uppercase group-hover:text-[#B89A72] transition-colors">
            MAGNIAR
          </div>
          <div className="font-sans text-[10px] tracking-[0.25em] text-[#B89A72] uppercase font-bold">
            GROWTH SYSTEM
          </div>
        </div>

        {/* CATEGORY HEADINGS (Visually Prominent Landmarks) */}
        {[
          { id: 'performance', label: 'PERFORMANCE', pos: nodePositions.cat_performance, align: 'items-start' },
          { id: 'intelligence', label: 'INTELLIGENCE', pos: nodePositions.cat_intelligence, align: 'items-center' },
          { id: 'commerce', label: 'COMMERCE', pos: nodePositions.cat_commerce, align: 'items-end' },
          { id: 'development', label: 'DEVELOPMENT', pos: nodePositions.cat_development, align: 'items-center' },
        ].map((cat) => {
          const isActive = isCategoryActive(cat.id as QuadrantId);
          const isDimmed = isCategoryDimmed(cat.id as QuadrantId);

          return (
            <div
              key={cat.id}
              tabIndex={0}
              role="button"
              aria-label={`Focus ${cat.label} Category`}
              onClick={() => setActiveCategory((prev) => (prev === cat.id ? null : (cat.id as QuadrantId)))}
              onKeyDown={(e) => e.key === 'Enter' && setActiveCategory((prev) => (prev === cat.id ? null : (cat.id as QuadrantId)))}
              onMouseEnter={() => setActiveCategory(cat.id as QuadrantId)}
              className={`absolute cursor-pointer z-20 flex flex-col ${cat.align} transition-all duration-300 outline-none p-2 -m-2`}
              style={{
                left: `${cat.pos.x}%`,
                top: `${cat.pos.y}%`,
                transform: `translate(-50%, -50%) translateZ(${isActive ? '35px' : '20px'})`,
              }}
            >
              <div
                className={`font-heading text-xs sm:text-sm font-extrabold tracking-[0.18em] uppercase transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'text-[#B89A72] scale-110 shadow-[0_0_20px_rgba(184,154,114,0.4)]'
                    : isDimmed
                    ? 'text-slate-600 opacity-35'
                    : 'text-slate-100 hover:text-[#B89A72]'
                }`}
              >
                <span className={`w-2 h-2 rounded-full transition-all ${isActive ? 'bg-[#B89A72] shadow-[0_0_8px_#B89A72]' : 'bg-white/40'}`} />
                <span>{cat.label}</span>
              </div>
            </div>
          );
        })}

        {/* INDIVIDUAL PLATFORM NODES (With Padded Hit Area and 3D Z-Depth) */}
        {visibleNodes.map((node) => {
          const pos = nodePositions[node.id];
          if (!pos) return null;

          const isHovered = hoveredNode?.id === node.id;
          const isCatActive = isCategoryActive(node.quadrant);
          const isDimmed = isCategoryDimmed(node.quadrant);

          return (
            <div
              key={node.id}
              onMouseEnter={() => {
                setHoveredNode(node);
                setActiveCategory(node.quadrant);
              }}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => {
                setHoveredNode(node);
                setActiveCategory(node.quadrant);
              }}
              className={`absolute z-30 cursor-pointer p-2.5 -m-2.5 flex items-center gap-2 transition-all duration-200 ${
                isDimmed ? 'opacity-25' : 'opacity-100'
              }`}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: `translate(-50%, -50%) translateZ(${isHovered ? '45px' : isCatActive ? '30px' : '15px'})`,
              }}
            >
              {/* Node Dot */}
              <span
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  isHovered
                    ? 'bg-[#B89A72] scale-150 shadow-[0_0_12px_#B89A72]'
                    : isCatActive
                    ? 'bg-[#B89A72]'
                    : 'bg-white/60'
                }`}
              />

              {/* Node Label */}
              <span
                className={`font-sans text-xs tracking-wider transition-all duration-200 whitespace-nowrap ${
                  isHovered
                    ? 'text-[#B89A72] font-bold text-xs scale-105'
                    : isCatActive
                    ? 'text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {node.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* MOBILE PIPELINE NETWORK VIEW (< 768px, Clean Vertical Architecture) */}
      <div className="sm:hidden space-y-4 py-2">
        <div className="text-[10px] text-[#8D949E] font-mono uppercase tracking-widest text-center border-b border-white/10 pb-2">
          TAP ANY CATEGORY TO SEE GROWTH PIPELINE
        </div>

        <div className="space-y-3 font-mono text-xs">
          
          {/* 1. INTELLIGENCE */}
          <div
            onClick={() => setActiveCategory(activeCategory === 'intelligence' ? null : 'intelligence')}
            className={`p-3 rounded-[2px] border transition-all cursor-pointer ${
              activeCategory === 'intelligence'
                ? 'border-[#B89A72] bg-[#B89A72]/10 text-white'
                : 'border-white/10 bg-[#07090D] text-[#8D949E]'
            }`}
          >
            <div className="flex items-center justify-between text-[#B89A72] font-bold tracking-wider uppercase mb-1.5">
              <span>● INTELLIGENCE</span>
              {activeCategory === 'intelligence' && <span className="text-[9px] text-[#B89A72]">FOCUSED</span>}
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-white/80">
              <span>AI STRATEGY</span>
              <span>•</span>
              <span>DATA & ANALYTICS</span>
              <span>•</span>
              <span>GROWTH MODELING</span>
            </div>
          </div>

          <div className="flex justify-center">
            <span className="text-[#B89A72] text-xs">↓</span>
          </div>

          {/* 2. PERFORMANCE */}
          <div
            onClick={() => setActiveCategory(activeCategory === 'performance' ? null : 'performance')}
            className={`p-3 rounded-[2px] border transition-all cursor-pointer ${
              activeCategory === 'performance'
                ? 'border-[#B89A72] bg-[#B89A72]/10 text-white'
                : 'border-white/10 bg-[#07090D] text-[#8D949E]'
            }`}
          >
            <div className="flex items-center justify-between text-[#B89A72] font-bold tracking-wider uppercase mb-1.5">
              <span>● PERFORMANCE</span>
              {activeCategory === 'performance' && <span className="text-[9px] text-[#B89A72]">FOCUSED</span>}
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-white/80">
              <span>GOOGLE</span>
              <span>•</span>
              <span>META</span>
              <span>•</span>
              <span>TIKTOK</span>
              <span>•</span>
              <span>LINKEDIN</span>
            </div>
          </div>

          <div className="flex justify-center">
            <span className="text-[#B89A72] text-xs">↓</span>
          </div>

          {/* CENTRAL MAGNIAR HUB MOBILE */}
          <div className="p-3 rounded-[2px] border border-[#B89A72]/40 bg-[#B89A72]/10 text-center space-y-0.5">
            <div className="font-bold text-white tracking-widest text-sm uppercase">MAGNIAR</div>
            <div className="text-[10px] text-[#B89A72] font-semibold tracking-widest uppercase">GROWTH SYSTEM</div>
          </div>

          <div className="flex justify-center">
            <span className="text-[#B89A72] text-xs">↓</span>
          </div>

          {/* 3. COMMERCE */}
          <div
            onClick={() => setActiveCategory(activeCategory === 'commerce' ? null : 'commerce')}
            className={`p-3 rounded-[2px] border transition-all cursor-pointer ${
              activeCategory === 'commerce'
                ? 'border-[#B89A72] bg-[#B89A72]/10 text-white'
                : 'border-white/10 bg-[#07090D] text-[#8D949E]'
            }`}
          >
            <div className="flex items-center justify-between text-[#B89A72] font-bold tracking-wider uppercase mb-1.5">
              <span>● COMMERCE</span>
              {activeCategory === 'commerce' && <span className="text-[9px] text-[#B89A72]">FOCUSED</span>}
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-white/80">
              <span>SHOPIFY</span>
              <span>•</span>
              <span>AMAZON</span>
              <span>•</span>
              <span>WALMART</span>
              <span>•</span>
              <span>ETSY</span>
            </div>
          </div>

          <div className="flex justify-center">
            <span className="text-[#B89A72] text-xs">↓</span>
          </div>

          {/* 4. DEVELOPMENT */}
          <div
            onClick={() => setActiveCategory(activeCategory === 'development' ? null : 'development')}
            className={`p-3 rounded-[2px] border transition-all cursor-pointer ${
              activeCategory === 'development'
                ? 'border-[#B89A72] bg-[#B89A72]/10 text-white'
                : 'border-white/10 bg-[#07090D] text-[#8D949E]'
            }`}
          >
            <div className="flex items-center justify-between text-[#B89A72] font-bold tracking-wider uppercase mb-1.5">
              <span>● DEVELOPMENT</span>
              {activeCategory === 'development' && <span className="text-[9px] text-[#B89A72]">FOCUSED</span>}
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-white/80">
              <span>WEBSITES & APPS</span>
              <span>•</span>
              <span>TRACKING & CAPI</span>
              <span>•</span>
              <span>AUTOMATION</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
