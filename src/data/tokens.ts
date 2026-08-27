import {
  ColorToken,
  TypographyScaleItem,
  SpacingToken,
  RadiusToken,
  MotionToken,
  MicroTypographyItem,
  SignalMotifItem,
  DoDontRule
} from '../types/design-system';

export const COLOR_TOKENS: ColorToken[] = [
  {
    name: 'Base Background',
    variable: '--magniar-bg',
    hex: '#050505',
    rgb: '5, 5, 5',
    description: 'Near-black foundational canvas for the entire Magniar product ecosystem.',
    category: 'base',
    contrastRatioOnBg: '1:1',
    usageRole: 'Root page backdrop, global canvas surface.'
  },
  {
    name: 'Primary Surface',
    variable: '--magniar-surface',
    hex: '#0A0C0F',
    rgb: '10, 12, 15',
    description: 'Slightly elevated dark surface with cool tint (<5% HSB saturation).',
    category: 'surface',
    contrastRatioOnBg: '1.08:1',
    usageRole: 'Cards, panels, content blocks, baseline containers.'
  },
  {
    name: 'Elevated Surface',
    variable: '--magniar-surface-elevated',
    hex: '#101318',
    rgb: '16, 19, 24',
    description: 'Secondary elevated layer for active cards, flyouts, and modals.',
    category: 'surface',
    contrastRatioOnBg: '1.16:1',
    usageRole: 'Hovered cards, dropdowns, floating widgets, sticky headers.'
  },
  {
    name: 'Primary Text',
    variable: '--magniar-text-primary',
    hex: '#F5F7FA',
    rgb: '245, 247, 250',
    description: 'High-contrast crisp off-white for main headlines and body text.',
    category: 'text',
    contrastRatioOnBg: '18.2:1 (Passes WCAG AAA)',
    usageRole: 'Display headlines, primary body content, active tab text.'
  },
  {
    name: 'Secondary Text',
    variable: '--magniar-text-secondary',
    hex: '#8D949E',
    rgb: '141, 148, 158',
    description: 'Refined neutral gray for supporting descriptions and subheadings.',
    category: 'text',
    contrastRatioOnBg: '6.4:1 (Passes WCAG AA)',
    usageRole: 'Subtitles, field labels, metadata, secondary body.'
  },
  {
    name: 'Muted Text',
    variable: '--magniar-text-muted',
    hex: '#5A626E',
    rgb: '90, 98, 110',
    description: 'Restrained technical gray for timestamps, code comments, and grid ticks.',
    category: 'text',
    contrastRatioOnBg: '3.8:1 (Technical/Muted UI)',
    usageRole: 'Technical micro-labels, coordinate numbers, disabled states.'
  },
  {
    name: 'Subtle Border',
    variable: '--magniar-border',
    hex: 'rgba(255, 255, 255, 0.08)',
    rgb: '255, 255, 255, 0.08',
    description: '1px hairline border providing quiet structural separation.',
    category: 'border',
    usageRole: 'Default card outlines, table dividers, panel borders.'
  },
  {
    name: 'Active Border',
    variable: '--magniar-border-active',
    hex: 'rgba(184, 154, 114, 0.40)',
    rgb: '184, 154, 114, 0.40',
    description: 'Champagne gold border state for focus, active, or selected containers.',
    category: 'border',
    usageRole: 'Input focus, active card border, selected tab indicator.'
  },
  {
    name: 'Champagne Gold Accent',
    variable: '--magniar-accent',
    hex: '#B89A72',
    rgb: '184, 154, 114',
    description: 'High-precision performance signal color. Used strictly as a signal.',
    category: 'accent',
    contrastRatioOnBg: '6.2:1 (Passes WCAG AA)',
    usageRole: 'Status signals, trend growth arrows, primary action emphasis, live indicators.'
  },
  {
    name: 'Accent Glow / Muted',
    variable: '--magniar-accent-glow',
    hex: 'rgba(184, 154, 114, 0.15)',
    rgb: '184, 154, 114, 0.15',
    description: 'Restrained volumetric aura around active elements and live badges.',
    category: 'accent',
    usageRole: 'Subtle glow behind active status dots, metric highlight halos.'
  },
  {
    name: 'Semantic Success',
    variable: '--magniar-success',
    hex: '#10B981',
    rgb: '16, 185, 129',
    description: 'Restrained emerald green for verified statuses and upward metrics.',
    category: 'semantic',
    usageRole: 'Verified integrations, positive growth metrics.'
  },
  {
    name: 'Semantic Warning',
    variable: '--magniar-warning',
    hex: '#F59E0B',
    rgb: '245, 158, 11',
    description: 'Restrained amber for pending states or threshold alerts.',
    category: 'semantic',
    usageRole: 'Threshold warnings, pending syncing operations.'
  },
  {
    name: 'Semantic Error',
    variable: '--magniar-error',
    hex: '#EF4444',
    rgb: '239, 68, 68',
    description: 'Controlled red for system errors and drop metrics.',
    category: 'semantic',
    usageRole: 'API connection failures, negative metric alerts.'
  }
];

export const TYPOGRAPHY_SCALE: TypographyScaleItem[] = [
  {
    token: 'DISPLAY_XL',
    name: 'Display XL',
    clampValue: 'clamp(4rem, 8vw, 9rem)',
    fallbackSize: '64px - 144px',
    weight: 'Weight 600 (SemiBold)',
    letterSpacing: '-0.04em',
    sampleText: 'Growth Engineered.',
    usageContext: 'Primary high-impact hero key statements.'
  },
  {
    token: 'DISPLAY',
    name: 'Display',
    clampValue: 'clamp(3.5rem, 6vw, 7rem)',
    fallbackSize: '56px - 112px',
    weight: 'Weight 600 (SemiBold)',
    letterSpacing: '-0.03em',
    sampleText: 'Performance Without Guesswork.',
    usageContext: 'Major section display headings and cover statements.'
  },
  {
    token: 'H1',
    name: 'Heading 1',
    clampValue: 'clamp(3rem, 5vw, 5.5rem)',
    fallbackSize: '48px - 88px',
    weight: 'Weight 600 (SemiBold)',
    letterSpacing: '-0.025em',
    sampleText: 'Intelligence as an Operating System',
    usageContext: 'Primary page titles and core module headers.'
  },
  {
    token: 'H2',
    name: 'Heading 2',
    clampValue: 'clamp(2.5rem, 4vw, 4.5rem)',
    fallbackSize: '40px - 72px',
    weight: 'Weight 500 (Medium)',
    letterSpacing: '-0.02em',
    sampleText: 'Unified Commerce Intelligence',
    usageContext: 'Sub-system headings and key feature section titles.'
  },
  {
    token: 'H3',
    name: 'Heading 3',
    clampValue: 'clamp(1.75rem, 2.2vw, 2.25rem)',
    fallbackSize: '28px - 36px',
    weight: 'Weight 500 (Medium)',
    letterSpacing: '0em',
    sampleText: 'Multi-Channel Attribution Engine',
    usageContext: 'Card titles, widget headers, modular section labels.'
  },
  {
    token: 'BODY_LARGE',
    name: 'Body Large',
    clampValue: '1.3125rem (21px)',
    fallbackSize: '21px',
    weight: 'Weight 400 (Regular)',
    letterSpacing: '0em',
    sampleText: 'Magniar constructs scalable growth infrastructure combining custom web platforms with real-time performance analytics.',
    usageContext: 'Lead paragraphs, introductory narrative text.'
  },
  {
    token: 'BODY',
    name: 'Body Standard',
    clampValue: '1.0625rem (17px)',
    fallbackSize: '17px',
    weight: 'Weight 400 (Regular)',
    letterSpacing: '0em',
    sampleText: 'Every campaign metric is ingested, normalized, and evaluated against target ROAS thresholds in real time.',
    usageContext: 'Standard UI text, documentation, portal content, descriptive paragraphs.'
  },
  {
    token: 'SMALL',
    name: 'Small Text',
    clampValue: '0.9375rem (15px)',
    fallbackSize: '15px',
    weight: 'Weight 400 / 500',
    letterSpacing: '0em',
    sampleText: 'Last synchronized 2 minutes ago across 14 connected ad accounts.',
    usageContext: 'Button labels, table data cells, supporting annotations.'
  },
  {
    token: 'MICRO',
    name: 'Micro Technical',
    clampValue: '0.8125rem (13px)',
    fallbackSize: '13px',
    weight: 'Weight 500 (Geist Mono)',
    letterSpacing: '+0.04em (Uppercase only)',
    sampleText: '01 / PERFORMANCE MARKETING ENGINE — STATUS: OPERATIONAL',
    usageContext: 'Technical category eyebrows, coordinate markers, and system status badges. Do not use as the main admin body font.'
  }
];

export const SPACING_TOKENS: SpacingToken[] = [
  { name: 'Micro 2', token: 'space-0.5', pxValue: 2, remValue: '0.125rem', usage: 'Hairline adjustments, micro badge padding.' },
  { name: 'Micro 4', token: 'space-1', pxValue: 4, remValue: '0.25rem', usage: 'Icon to text gaps, status dot offsets.' },
  { name: 'Tight 8', token: 'space-2', pxValue: 8, remValue: '0.5rem', usage: 'Tag internal padding, compact list gaps.' },
  { name: 'Standard 12', token: 'space-3', pxValue: 12, remValue: '0.75rem', usage: 'Input field vertical padding, small gaps.' },
  { name: 'Base 16', token: 'space-4', pxValue: 16, remValue: '1.0rem', usage: 'Minimum container inner padding, standard card gutters.' },
  { name: 'Medium 24', token: 'space-6', pxValue: 24, remValue: '1.5rem', usage: 'Card inner padding, button horizontal padding (2x).' },
  { name: 'Large 32', token: 'space-8', pxValue: 32, remValue: '2.0rem', usage: 'Section component gaps, widget separation.' },
  { name: 'XL 48', token: 'space-12', pxValue: 48, remValue: '3.0rem', usage: 'Major card padding, feature module spacing.' },
  { name: '2XL 64', token: 'space-16', pxValue: 64, remValue: '4.0rem', usage: 'Standard page section vertical gutters.' },
  { name: '3XL 96', token: 'space-24', pxValue: 96, remValue: '6.0rem', usage: 'Hero section vertical margins, major chapter spacing.' },
  { name: '4XL 128', token: 'space-32', pxValue: 128, remValue: '8.0rem', usage: 'Generous negative space breaks for editorial impact.' }
];

export const RADIUS_TOKENS: RadiusToken[] = [
  {
    name: 'Small',
    token: 'radius-sm',
    pxValue: 6,
    remValue: '0.375rem',
    usage: 'Badges, micro pills, tooltip containers, inner controls.',
    mathematicalRule: 'Used for nested elements with padding <= 8px.'
  },
  {
    name: 'Medium',
    token: 'radius-md',
    pxValue: 10,
    remValue: '0.625rem',
    usage: 'Buttons, form input fields, standard card inner elements.',
    mathematicalRule: 'Outer radius (14px) - Padding (16px) = Inner radius (6-10px).'
  },
  {
    name: 'Large',
    token: 'radius-lg',
    pxValue: 14,
    remValue: '0.875rem',
    usage: 'Standard cards, dashboard widgets, modal dialog containers.',
    mathematicalRule: 'Standard surface container radius cap.'
  },
  {
    name: 'Special / Floating',
    token: 'radius-xl',
    pxValue: 20,
    remValue: '1.25rem',
    usage: 'Elevated floating hero information panels, major glass overlays.',
    mathematicalRule: 'Reserved exclusively for floating high-visibility modules.'
  }
];

export const MOTION_TOKENS: MotionToken[] = [
  {
    token: 'motion-micro',
    name: 'Micro Interaction',
    duration: '150ms – 200ms',
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    usage: 'Button hover feedback, icon rotation, link underline transitions.'
  },
  {
    token: 'motion-standard',
    name: 'Standard Transition',
    duration: '250ms – 400ms',
    easing: 'cubic-bezier(0.2, 0, 0, 1)',
    usage: 'Card state changes, accordion expansion, tab switching, filter reveal.'
  },
  {
    token: 'motion-large',
    name: 'Large Entrance / Shift',
    duration: '500ms – 800ms',
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    usage: 'Modal flyout, data chart line assembly, major section reveal.'
  },
  {
    token: 'motion-ambient',
    name: 'Ambient System Signal',
    duration: '3.0s – 12.0s',
    easing: 'ease-in-out (infinite linear/sine)',
    usage: 'Magniar Signal pulse, subtle grid coordinate glow, system status radar.'
  }
];

export const MICRO_TYPOGRAPHY_EXAMPLES: MicroTypographyItem[] = [
  {
    category: 'System Identifier',
    codeSnippet: '<span class="font-mono text-[11px] text-[#5A626E] tracking-[0.08em] uppercase">01 / PERFORMANCE MARKETING</span>',
    renderedText: '01 / PERFORMANCE MARKETING',
    context: 'Precedes major section headings to provide structural order.'
  },
  {
    category: 'Status Indicator',
    codeSnippet: '<span class="font-mono text-[11px] text-[#B89A72] tracking-wider uppercase flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-[#B89A72] animate-magniar-pulse"></span>● OPERATIONAL</span>',
    renderedText: '● OPERATIONAL',
    context: 'Indicates active API status or live data pipeline state.'
  },
  {
    category: 'Live Signal Timestamp',
    codeSnippet: '<span class="font-mono text-[11px] text-[#8D949E] tracking-wider">LIVE SIGNAL — UPDATED 02:17 AGO</span>',
    renderedText: 'LIVE SIGNAL — UPDATED 02:17 AGO',
    context: 'Annotates real-time performance metrics and client portal widgets.'
  },
  {
    category: 'Coordinate System Marker',
    codeSnippet: '<span class="font-mono text-[10px] text-[#5A626E] select-none">[ SYS_GRID // 1440.08 ]</span>',
    renderedText: '[ SYS_GRID // 1440.08 ]',
    context: 'Appears subtly in background grid intersections.'
  }
];

export const SIGNAL_MOTIFS: SignalMotifItem[] = [
  {
    id: 'signal-dot',
    title: 'Precision Pulse Dot',
    asciiVariant: '●',
    description: 'Champagne gold dot with subtle volumetric glow. Used to signify live data, operational system health, and active tabs.',
    componentType: 'dot'
  },
  {
    id: 'signal-vector',
    title: 'Vector Signal Line',
    asciiVariant: '┄┄┄┄●────────',
    description: 'Minimal hairline vector connecting text context to real-time status points.',
    componentType: 'line'
  },
  {
    id: 'signal-badge',
    title: 'System Live Badge',
    asciiVariant: '[ SYSTEM / LIVE ]',
    description: 'Mono-spaced bordered tag framing active system nodes.',
    componentType: 'badge'
  },
  {
    id: 'signal-scan',
    title: 'Subtle Scan Beam',
    asciiVariant: '━━━━█━━━━',
    description: 'Slow 3-second horizontal light accent along top card borders during active data recalculations.',
    componentType: 'scan'
  }
];

export const DO_DONT_RULES: DoDontRule[] = [
  {
    id: 1,
    category: 'Color & FX',
    ruleTitle: 'Restrained Champagne Gold Signal',
    doText: 'Use champagne gold (#B89A72) exclusively as an active signal, focal accent, or status indicator on dark charcoal surfaces.',
    dontText: 'Do not create giant gold or purple gradients, multi-colored neon glowing backgrounds, or vibrant gold canvas cards.',
    doVisualNote: '#050505 surface with 1px hairline border + subtle 1.5px #B89A72 status indicator dot.',
    dontVisualNote: 'Purple-to-gold gradient background with bright neon glowing drop-shadows.'
  },
  {
    id: 2,
    category: 'Typography',
    ruleTitle: 'Magniar Three-Font System',
    doText: 'Use Manrope for brand display and headings, Inter for product UI/body text, and Geist Mono only for technical identifiers, code, and compact system badges.',
    dontText: 'Do not use cyberpunk novelty fonts, excessive letter spacing on every sentence, tiny admin body copy, or ALL-CAPS hero paragraphs.',
    doVisualNote: 'Clean headline "Growth Engineered." in Manrope semi-bold with 17px+ readable body copy.',
    dontVisualNote: 'G R O W T H  S Y S T E M  E N G I N E E R E D in futuristic block lettering.'
  },
  {
    id: 3,
    category: 'Container & Depth',
    ruleTitle: 'Flat Surface Contrast over Drop Shadows',
    doText: 'Establish hierarchy through surface contrast (#050505 bg -> #0A0C0F surface -> #101318 elevated) and 1px hairline borders.',
    dontText: 'Do not use massive blurry black drop shadows, 3D floating tilted card stacks, or heavy glassmorphism on every box.',
    doVisualNote: '#0A0C0F card with 1px border rgba(255,255,255,0.08).',
    dontVisualNote: 'Glassmorphic card with 0.5 opacity blur, 50px blurry shadow, and glowing cyan outer border.'
  },
  {
    id: 4,
    category: 'Corner Radius',
    ruleTitle: 'Restrained Geometry (6px - 14px)',
    doText: 'Apply 14px radius for cards, 10px for buttons/inputs, 6px for inner badges. Match inner corner radius (Outer - Padding = Inner).',
    dontText: 'Do not use 30px–50px pill corners for standard rectangular cards or mix sharp corners inside huge round containers.',
    doVisualNote: 'Card radius 14px with inner badge radius 6px.',
    dontVisualNote: 'Card radius 36px with inner button radius 36px.'
  },
  {
    id: 5,
    category: 'Motion',
    ruleTitle: '90% Clarity / 10% Motion',
    doText: 'Use fast micro-interactions (150-250ms) for feedback and slow ambient pulses (3-6s) for status indicators.',
    dontText: 'Do not animate every element on scroll, make text fly in from offscreen, or use distracting 3D spinning artifacts.',
    doVisualNote: 'Subtle border color shift on hover.',
    dontVisualNote: 'Card spins 360 degrees, grows 1.2x, and flashes rainbow colors on mouse hover.'
  }
];
