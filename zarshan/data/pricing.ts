import { PricingPlan } from "@/types";

export const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Get started with the basics",
    monthlyPrice: 0,
    yearlyPrice: 0,
    cta: "Start for Free",
    limits: { accounts: "3 social accounts", posts: "30 posts / month", users: "1 user" },
    features: [
      "3 connected social accounts",
      "30 scheduled posts per month",
      "Basic analytics",
      "Media library (1GB)",
      "Mobile app access",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    tagline: "For solo creators & freelancers",
    monthlyPrice: 15,
    yearlyPrice: 12,
    cta: "Start Free Trial",
    limits: { accounts: "8 social accounts", posts: "Unlimited posts", users: "1 user" },
    features: [
      "8 connected social accounts",
      "Unlimited scheduled posts",
      "AI caption & hashtag generator",
      "Standard analytics & reports",
      "Media library (25GB)",
      "Best-time-to-post suggestions",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    tagline: "For growing businesses",
    monthlyPrice: 39,
    yearlyPrice: 32,
    isPopular: true,
    cta: "Start Free Trial",
    limits: { accounts: "20 social accounts", posts: "Unlimited posts", users: "5 users" },
    features: [
      "20 connected social accounts",
      "Unlimited scheduled posts",
      "Full AI content suite",
      "Advanced analytics & custom reports",
      "Social inbox & unified DMs",
      "Team collaboration (5 seats)",
      "Approval workflows",
      "Media library (250GB)",
    ],
  },
  {
    id: "agency",
    name: "Agency",
    tagline: "For agencies managing multiple clients",
    monthlyPrice: 89,
    yearlyPrice: 74,
    cta: "Start Free Trial",
    limits: { accounts: "50 social accounts", posts: "Unlimited posts", users: "15 users" },
    features: [
      "50 connected social accounts",
      "Unlimited client workspaces",
      "White-label client reports",
      "Advanced approval workflows",
      "Team collaboration (15 seats)",
      "Priority support",
      "Media library (1TB)",
      "Custom branded dashboard",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For large teams & organizations",
    monthlyPrice: -1,
    yearlyPrice: -1,
    cta: "Contact Sales",
    limits: { accounts: "Unlimited", posts: "Unlimited posts", users: "Unlimited users" },
    features: [
      "Unlimited social accounts",
      "Unlimited team members",
      "Dedicated account manager",
      "Custom onboarding & training",
      "Advanced security & SSO",
      "Custom API rate limits",
      "99.9% uptime SLA",
      "24/7 priority support",
    ],
  },
];

export const pricingFaqs = [
  {
    question: "Can I switch plans at any time?",
    answer:
      "Yes. You can upgrade or downgrade your plan at any time from your billing settings. Changes take effect immediately and we prorate any difference.",
  },
  {
    question: "Is there a free trial on paid plans?",
    answer:
      "Every paid plan comes with a 14-day free trial, no credit card required. You can cancel anytime before the trial ends.",
  },
  {
    question: "What happens if I exceed my plan limits?",
    answer:
      "We'll notify you as you approach your limits. You can upgrade instantly, or continue on your current plan — we never cut off scheduled posts.",
  },
  {
    question: "Do you offer discounts for nonprofits or students?",
    answer:
      "Yes! We offer 30% off any paid plan for registered nonprofits and students. Contact our sales team to get verified.",
  },
];
