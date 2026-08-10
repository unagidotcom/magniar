export interface SpecChapter {
  id: number;
  title: string;
  sectionCode: string;
  content: string;
  keyTakeaways: string[];
}

export const SPECIFICATION_CHAPTERS: SpecChapter[] = [
  {
    id: 1,
    title: 'Brand Architecture & Positioning',
    sectionCode: '01 — UNDERSTAND THE BRAND',
    content: `Magniar is a global growth agency combining performance marketing, web development, e-commerce engineering, and AI growth strategy into a unified operating system.

The long-term Magniar product architecture connects three distinct interfaces:
1. Public Marketing Platform: Positions Magniar as a premier growth consultancy.
2. Client Growth Portal: Serves as the client's private performance command center.
3. Internal Admin Operating System: Functions as Magniar's internal execution platform.

All three environments share this single visual foundation to ensure absolute brand coherence.`,
    keyTakeaways: [
      'Magniar understands growth as an engineering system.',
      'One unified design system connects Public, Portal, and Admin.',
      'Reflects technical authority, performance intelligence, and modern commerce.'
    ]
  },
  {
    id: 2,
    title: 'Core Brand Personality & Feeling',
    sectionCode: '02 — CORE BRAND FEELING',
    content: `The visual personality of Magniar balances three archetypes:
• Premium Technology Company
• Growth Consultancy
• Performance Intelligence Platform

Characteristics:
Sophisticated, technical, analytical, confident, international, precise, modern, restrained, high-performance.

Primary Brand Narrative: "Magniar understands growth as a system."
The interface must communicate engineering rigor, never superficial marketing flash.`,
    keyTakeaways: [
      'Restrained technical aesthetic over loud marketing gimmicks.',
      'Focus on clarity, data density, and spatial composure.',
      'Communicates certainty and analytical depth.'
    ]
  },
  {
    id: 3,
    title: 'Visual DNA & System Character',
    sectionCode: '03 — VISUAL DNA',
    content: `Preserved Visual Pillars:
• Near-black backgrounds (#050505) for high spatial depth
• Crisp off-white typography (#F5F7FA) for legibility
• Electric blue (#0099FF) reserved strictly as a signal accent
• Technical grid overlays providing structural coordinate context
• Micro-typography and mono-spaced labels for technical character
• Floating data visualization widgets with restrained glow
• Generous negative space and disciplined alignment`,
    keyTakeaways: [
      'Preserve dark mode depth without generic pitch-black flatness.',
      'Subtle technical details elevate standard layouts.',
      'Minimal interface components with high optical precision.'
    ]
  },
  {
    id: 4,
    title: 'Anti-Slop Boundaries & Banned Patterns',
    sectionCode: '04 — DO NOT MAKE IT GENERIC',
    content: `Banned Visual Clichés:
× No purple AI gradients or multi-colored neon glows
× No massive floating 3D glass spheres or decorative artifacts
× No excessive glassmorphism applied to every container
× No hyper-rounded 40px pill cards
× No distracting scroll animations or flying text
× No fake client logos, fabricated metrics, or false testimonials
× No Bloomberg terminal clutter on public marketing surfaces`,
    keyTakeaways: [
      'Reject generic AI SaaS templates.',
      'Zero fake data or fabricated case studies.',
      'Every visual element must serve comprehension or trust.'
    ]
  },
  {
    id: 5,
    title: 'Color Architecture & Behavior',
    sectionCode: '05 & 06 — COLOR SYSTEM',
    content: `Base Colors:
• Base Canvas: #050505 (hsl 0, 0%, 2%)
• Primary Surface: #0A0C0F (hsl 216, 20%, 5%)
• Elevated Surface: #101318 (hsl 218, 20%, 8%)
• Primary Text: #F5F7FA (18.2:1 contrast ratio on bg)
• Secondary Text: #8D949E (6.4:1 contrast ratio)
• Muted Text: #5A626E (3.8:1 contrast ratio)
• Hairline Border: rgba(255, 255, 255, 0.08)
• Active Accent Border: rgba(0, 153, 255, 0.40)
• Electric Blue Signal Accent: #0099FF

Color Behavior Rule: Electric Blue is a SIGNAL, not a paint bucket. It represents active states, live performance, key metrics, and interaction focus. The majority of the UI remains black, charcoal, and gray.`,
    keyTakeaways: [
      '<5% HSB saturation on charcoal surfaces for organic depth.',
      'Electric blue is strictly a signal and highlight tone.',
      'Semantic green/amber/red used sparingly for data states.'
    ]
  },
  {
    id: 6,
    title: 'Typography System & Scaling Scale',
    sectionCode: '07 & 08 — TYPOGRAPHY',
    content: `Font Families:
• Primary Body & Headlines: Geist Sans
• Micro-labels & Technical Code: Geist Mono

Fluid Scale:
• DISPLAY XL: clamp(4rem, 8vw, 9rem)
• DISPLAY: clamp(3.5rem, 6vw, 7rem)
• H1: clamp(3rem, 5vw, 5.5rem)
• H2: clamp(2.5rem, 4vw, 4.5rem)
• H3: clamp(1.5rem, 2vw, 2rem)
• BODY LARGE: 1.25rem (20px)
• BODY STANDARD: 1.0rem (16px)
• SMALL: 0.875rem (14px)
• MICRO: 0.6875rem (11px, Geist Mono, Uppercase +0.06em tracking)`,
    keyTakeaways: [
      'Geist Sans and Geist Mono provide technical precision.',
      'Fluid clamp scale ensures responsive editorial balance.',
      'Strict hierarchy prevents heading level skipping.'
    ]
  },
  {
    id: 7,
    title: 'Micro Typography Language',
    sectionCode: '10 — MICRO TYPOGRAPHY',
    content: `Micro-typography introduces structure and technical character across all interfaces.

Examples:
• 01 / PERFORMANCE MARKETING
• 02 / COMMERCE INTELLIGENCE
• CAPABILITY ENGINE
• ● OPERATIONAL
• LIVE SIGNAL — UPDATED 02:17 AGO
• [ SYS_GRID // 1440.08 ]

Rules:
Must be used sparingly as category eyebrows or status annotations. Never convert full sentences to uppercase or mono-space.`,
    keyTakeaways: [
      'Mono-spaced uppercase eyebrows establish technical context.',
      'Provides subtle editorial order without visual noise.',
      'Never overused on standard paragraphs.'
    ]
  },
  {
    id: 8,
    title: 'Grid & Coordinate System',
    sectionCode: '11 — GRID SYSTEM',
    content: `The grid is an underlying technical coordinate system that can be toggled or rendered subtly behind hero sections, case studies, and dashboard widgets.

Specification:
• 40px x 40px grid spacing (standard) / 20px (dense)
• Hairline stroke: 1px rgba(255, 255, 255, 0.03)
• Optional coordinate crosshairs (+) at key structural intersections
• Aligns perfectly with container horizontal padding and card edges`,
    keyTakeaways: [
      'Subtle low-contrast grid creates architectural depth.',
      'Responsive alignment with container padding.',
      'Functions as a subtle coordinate system, not graph paper.'
    ]
  },
  {
    id: 9,
    title: 'Container & Spacing Scale',
    sectionCode: '12 & 13 — CONTAINER & SPACING',
    content: `Container Max-Width: 1440px with responsive horizontal padding (16px mobile, 32px tablet, 64px desktop).

Spacing Scale Tokens:
• 2px (space-0.5) / 4px (space-1) / 8px (space-2) / 12px (space-3)
• 16px (space-4) / 24px (space-6) / 32px (space-8)
• 48px (space-12) / 64px (space-16) / 96px (space-24) / 128px (space-32)

Padding Rule: Container outer padding must always equal or exceed the inner padding between its child elements. Minimum container padding is 16px.`,
    keyTakeaways: [
      '1440px desktop container target.',
      'Strict mathematical spacing tokens.',
      'Generous negative space is an intentional design element.'
    ]
  },
  {
    id: 10,
    title: 'Borders, Corner Radii & Elevation',
    sectionCode: '14, 15 & 16 — BORDER, RADIUS & ELEVATION',
    content: `Borders:
• Default: 1px hairline rgba(255, 255, 255, 0.08)
• Active Focus: 1px rgba(0, 153, 255, 0.40)

Corner Radii:
• SMALL (6px): Badges, tooltips, inner chips
• MEDIUM (10px): Buttons, form inputs, inner controls
• LARGE (14px): Cards, dashboard widgets, modals
• SPECIAL (20px): Floating hero overlays

Nested Corner Radius Math:
Inner Corner Radius = Outer Corner Radius - Distance Between The Two (Padding).
Example: 14px outer radius with 8px padding -> 6px inner radius.`,
    keyTakeaways: [
      '1px hairline borders define structural separation.',
      'Cap card radii at 14px to avoid cartoonish roundness.',
      'Nested radius math keeps corner curves optically parallel.'
    ]
  },
  {
    id: 11,
    title: 'Glass Effects & Motion Philosophy',
    sectionCode: '17, 22 & 23 — GLASS & MOTION',
    content: `Glass Specification:
• Background: rgba(10, 12, 15, 0.75)
• Backdrop Filter: blur(12px)
• Border: 1px solid rgba(255, 255, 255, 0.08)
• Usage: Navigation overlay, floating metrics, modal dialogs.

Motion Philosophy: 90% Clarity / 10% Motion.
Motion exists solely to communicate state changes or reinforce hierarchy.

Motion Timings:
• MICRO (150ms-200ms): Button hovers, state feedback.
• STANDARD (250ms-400ms): Accordions, card state transitions, tab swaps.
• LARGE (500ms-800ms): Modal flyouts, chart line assembly.
• AMBIENT (3s-12s): Magniar Signal pulse, system status scan.`,
    keyTakeaways: [
      'Selective high-precision glass effects.',
      'Motion is subtle, fast, and purposeful.',
      'Ambient loops operate slowly without visual restlessness.'
    ]
  },
  {
    id: 12,
    title: 'Data Visualization & Magniar Signal',
    sectionCode: '18 & 19 — DATA VIZ & SIGNAL MOTIF',
    content: `Data Visualization Primitives:
• KPI stat displays (e.g. $124,820 with ↑ 18.4% status tag)
• Sparklines with subtle blue gradient fill
• Performance status indicators (e.g. ● OPERATIONAL)
• Analytical storytelling visuals

Magniar Signal Motif Variations:
1. Precision Pulse Dot: ● (#0099FF with 2.5s gentle aura pulse)
2. Vector Signal Line: ┄┄┄┄●────────
3. System Live Badge: [ SYSTEM / LIVE ]
4. Border Scan Beam: 3-second horizontal accent beam during syncs`,
    keyTakeaways: [
      'Data visualization is storytelling, not Bloomberg terminal noise.',
      'Magniar Signal provides a recurring visual heartbeat.',
      'Consistent status tags across all three product tiers.'
    ]
  }
];
