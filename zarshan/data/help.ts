import { HelpCategory } from "@/types";

export const helpCategories: HelpCategory[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: "Rocket",
    description: "Set up your account and connect your first social profiles.",
    articleCount: 12,
    articles: [
      { title: "Creating your Zarshan account", slug: "creating-your-account" },
      { title: "Connecting your first social account", slug: "connecting-social-account" },
      { title: "A tour of your dashboard", slug: "dashboard-tour" },
      { title: "Inviting your team", slug: "inviting-your-team" },
    ],
  },
  {
    id: "scheduling",
    title: "Content Scheduling",
    icon: "CalendarClock",
    description: "Everything about planning, queueing, and publishing posts.",
    articleCount: 18,
    articles: [
      { title: "Creating your first post", slug: "creating-first-post" },
      { title: "Using the visual content calendar", slug: "using-content-calendar" },
      { title: "Bulk scheduling with CSV upload", slug: "bulk-scheduling-csv" },
      { title: "Best-time-to-post recommendations", slug: "best-time-to-post" },
    ],
  },
  {
    id: "analytics",
    title: "Analytics & Reporting",
    icon: "BarChart3",
    description: "Understand performance and build custom reports.",
    articleCount: 9,
    articles: [
      { title: "Understanding your analytics dashboard", slug: "understanding-analytics" },
      { title: "Building a custom report", slug: "building-custom-report" },
      { title: "Exporting & scheduling PDF reports", slug: "exporting-reports" },
    ],
  },
  {
    id: "ai-tools",
    title: "AI Tools",
    icon: "Sparkles",
    description: "Get the most out of the AI caption, hashtag & idea generators.",
    articleCount: 7,
    articles: [
      { title: "Using the AI caption generator", slug: "ai-caption-generator" },
      { title: "Customizing your AI brand voice", slug: "ai-brand-voice" },
      { title: "AI content ideas explained", slug: "ai-content-ideas" },
    ],
  },
  {
    id: "team",
    title: "Team & Permissions",
    icon: "Users",
    description: "Manage roles, approvals, and collaboration settings.",
    articleCount: 11,
    articles: [
      { title: "Setting up approval workflows", slug: "approval-workflows" },
      { title: "Managing roles & permissions", slug: "roles-permissions" },
      { title: "Creating client workspaces", slug: "client-workspaces" },
    ],
  },
  {
    id: "billing",
    title: "Billing & Account",
    icon: "CreditCard",
    description: "Manage your subscription, invoices, and account settings.",
    articleCount: 10,
    articles: [
      { title: "Changing your plan", slug: "changing-your-plan" },
      { title: "Updating payment methods", slug: "updating-payment-methods" },
      { title: "Downloading past invoices", slug: "downloading-invoices" },
    ],
  },
];
