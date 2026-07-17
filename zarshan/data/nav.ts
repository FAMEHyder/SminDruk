import { NavGroup } from "@/types";

export const mainNav: NavGroup[] = [
  {
    label: "Product",
    columns: [
      {
        heading: "Core Features",
        links: [
          {
            label: "Content Scheduling",
            href: "/features#scheduling",
            description: "Plan and auto-publish across every platform",
            icon: "CalendarClock",
          },
          {
            label: "Analytics",
            href: "/features#analytics",
            description: "Track performance with real-time reports",
            icon: "BarChart3",
          },
          {
            label: "Social Inbox",
            href: "/features#inbox",
            description: "Reply to every DM & comment in one place",
            icon: "Inbox",
          },
          {
            label: "Team Collaboration",
            href: "/features#collaboration",
            description: "Approvals, roles, and shared calendars",
            icon: "Users",
          },
        ],
      },
      {
        heading: "Automate & Create",
        links: [
          {
            label: "AI Assistant",
            href: "/features#ai-assistant",
            description: "Generate captions, hashtags & ideas instantly",
            icon: "Sparkles",
            badge: "AI",
          },
          {
            label: "Automation",
            href: "/features#automation",
            description: "Rules & workflows that run themselves",
            icon: "Workflow",
          },
          {
            label: "Media Library",
            href: "/features#media-library",
            description: "Organize every asset in one place",
            icon: "Image",
          },
          {
            label: "Integrations",
            href: "/integrations",
            description: "Connect Canva, Drive, Slack & more",
            icon: "Plug",
          },
        ],
      },
    ],
  },
  {
    label: "Solutions",
    columns: [
      {
        heading: "By audience",
        links: [
          {
            label: "For Creators",
            href: "/solutions#creators",
            description: "Grow your personal brand faster",
            icon: "Star",
          },
          {
            label: "For Businesses",
            href: "/solutions#businesses",
            description: "Consistent posting, better ROI",
            icon: "Building2",
          },
          {
            label: "For Agencies",
            href: "/solutions#agencies",
            description: "Manage every client from one hub",
            icon: "Briefcase",
          },
          {
            label: "For Enterprises",
            href: "/solutions#enterprises",
            description: "Scale securely across teams & brands",
            icon: "Landmark",
          },
        ],
      },
    ],
  },
  {
    label: "AI Features",
    href: "/ai-features",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "Resources",
    columns: [
      {
        heading: "Learn",
        links: [
          { label: "Blog", href: "/blog", description: "Tips, trends & guides", icon: "Newspaper" },
          { label: "Help Center", href: "/help", description: "Docs, guides & tutorials", icon: "LifeBuoy" },
          { label: "FAQ", href: "/faq", description: "Quick answers to common questions", icon: "CircleHelp" },
        ],
      },
      {
        heading: "Company",
        links: [
          { label: "About Us", href: "/about", description: "Our story, mission & team", icon: "Info" },
          { label: "Contact", href: "/contact", description: "Talk to our team", icon: "Mail" },
          { label: "Integrations", href: "/integrations", description: "All supported platforms", icon: "Plug" },
        ],
      },
    ],
  },
];

export const footerNav = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "AI Features", href: "/ai-features" },
      { label: "Integrations", href: "/integrations" },
      { label: "Pricing", href: "/pricing" },
      { label: "Solutions", href: "/solutions" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/about#careers" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "FAQ", href: "/faq" },
      { label: "Blog", href: "/blog" },
      { label: "API Docs", href: "/help" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Security", href: "/security" },
    ],
  },
];
