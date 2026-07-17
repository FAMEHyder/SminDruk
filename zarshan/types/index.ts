export type Platform =
  | "facebook"
  | "instagram"
  | "linkedin"
  | "x"
  | "tiktok"
  | "pinterest"
  | "youtube"
  | "threads"
  | "bluesky"
  | "mastodon"
  | "google_business";

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  icon?: string;
  badge?: string;
}

export interface NavGroup {
  label: string;
  href?: string;
  columns?: NavColumn[];
  links?: NavLink[];
}

export interface NavColumn {
  heading: string;
  links: NavLink[];
}

export interface Feature {
  slug: string;
  icon: string;
  title: string;
  description: string;
  bullets?: string[];
  image?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  yearlyPrice: number;
  isPopular?: boolean;
  cta: string;
  features: string[];
  limits?: {
    accounts: string;
    posts: string;
    users: string;
  };
}

export interface Integration {
  id: string;
  name: string;
  category: "social" | "design" | "storage" | "productivity";
  icon: string;
  description: string;
  color: string;
}

export interface AIFeature {
  slug: string;
  icon: string;
  title: string;
  description: string;
  example?: {
    input: string;
    output: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
  platform?: Platform;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio?: string;
  social?: {
    x?: string;
    linkedin?: string;
  };
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  coverImage: string;
  publishedAt: string;
  readTime: string;
  featured?: boolean;
  tags: string[];
}

export interface SolutionAudience {
  id: string;
  label: string;
  icon: string;
  headline: string;
  description: string;
  painPoints: string[];
  benefits: { title: string; description: string; icon: string }[];
}

export interface HelpCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  articleCount: number;
  articles: { title: string; slug: string }[];
}

export interface CompanyValue {
  title: string;
  description: string;
  icon: string;
}

export interface Stat {
  label: string;
  value: string;
  suffix?: string;
}

export interface SocialPost {
  id: string;
  platform: Platform;
  content: string;
  status: "draft" | "scheduled" | "published" | "failed";
  scheduledAt?: string;
  publishedAt?: string;
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
  };
  image?: string;
}
