export interface ServiceItem {
  id: string;
  title: string;
  category: "marketing" | "marketplace" | "development";
  description: string;
  longDescription?: string;
  iconName: string; // Map to Lucide icons
  stat?: string;
  statLabel?: string;
}

export interface PlatformTrustItem {
  name: string;
  iconName: string;
  category: "Ads" | "Marketplace" | "Development";
  colorClass: string;
  description: string;
}

export interface CaseStudy {
  id: string;
  brandName: string;
  logoText: string;
  category: string;
  tagline: string;
  metrics: {
    roas: string;
    revenue: string;
    conversion: string;
  };
  narrative: string;
  chartData: number[]; // simple trend line heights for standard render
  accentColor: string; // Hex or tailwind color class
  image: string; // descriptive placeholder details
}

export interface ProcessStep {
  number: number;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  duration: string;
}

export interface ShowcaseWebsite {
  id: string;
  title: string;
  type: "Ecommerce" | "Corporate" | "Web3 Platform";
  urlName: string;
  metrics: string;
  features: string[];
  mockData: {
    heroTitle: string;
    tagline: string;
    productPrice?: string;
    activeUsers?: string;
    conversionRate?: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  review: string;
  avatarSeed: string; // for high end UI avatars
  rating: number;
}

export interface HandledClient {
  id: string;
  name: string;
  serviceType: string;
  focus: string;
  spend?: number; // in USD budget
  spendLabel?: string;
  description: string;
  category: "lead-generation" | "e-commerce";
}
