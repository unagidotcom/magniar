import type { BlogPost } from "../lib/wordpress";

export const FALLBACK_POSTS: BlogPost[] = [
  {
    id: "premium-acquisition",
    title: "The Cookieless Acquisition Stack for 2026",
    excerpt:
      "With cookie tracking fading fast, top brands are migrating toward first‑party, server-side measurement and higher-signal optimization loops.",
    content:
      "With standard digital cookie tracking almost entirely deprecated, top performance brands have migrated their architectures toward first-party server-side tagging. We review critical setup templates for Meta Conversions API and Google PMax nodes.",
    authorName: "Liam Cross (Lead Architect)",
    createdAt: new Date("2026-05-18T10:00:00Z"),
    link: "#blog-insights",
  },
  {
    id: "lighthouse-commerce",
    title: "Designing 99/100 Lighthouse Speed-Packs",
    excerpt:
      "Speed directly impacts conversion. Headless builds with clean React and tight server response targets unlock premium UX and SEO wins.",
    content:
      "Speed directly corresponds to landing conversion percentage. Traditional multi-megabyte builders introduce massive visual layout shift obstacles. Creating custom, headless frameworks built with clean React code reduces initial server response to <200ms.",
    authorName: "Sarah Thorne (Head of Dev)",
    createdAt: new Date("2026-05-16T14:30:00Z"),
    link: "#blog-insights",
  },
];

