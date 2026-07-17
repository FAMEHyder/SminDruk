import { SolutionAudience } from "@/types";

export const solutionAudiences: SolutionAudience[] = [
  {
    id: "creators",
    label: "Creators",
    icon: "Star",
    headline: "Grow your personal brand without the burnout",
    description:
      "Plan a month of content in an afternoon, get AI help writing captions, and see exactly what's driving your growth — all from your phone.",
    painPoints: [
      "Spending hours every week on captions & hashtags",
      "Posting inconsistently and losing momentum",
      "No clear picture of what content actually performs",
    ],
    benefits: [
      { title: "AI content co-pilot", description: "Draft captions, hashtags & ideas in seconds.", icon: "Sparkles" },
      { title: "Mobile-first scheduling", description: "Plan and publish from anywhere.", icon: "Smartphone" },
      { title: "Growth analytics", description: "See exactly what's driving followers & engagement.", icon: "TrendingUp" },
    ],
  },
  {
    id: "businesses",
    label: "Businesses",
    icon: "Building2",
    headline: "Turn social media into a reliable growth channel",
    description:
      "Keep every platform on-brand and on-schedule, prove ROI to leadership, and free your marketing team from manual busywork.",
    painPoints: [
      "Inconsistent posting across multiple platforms",
      "Hard to prove social media ROI to leadership",
      "Marketing team spends too much time on manual tasks",
    ],
    benefits: [
      { title: "Unified calendar", description: "Every platform, one shared content calendar.", icon: "CalendarClock" },
      { title: "Executive reporting", description: "Beautiful reports leadership actually reads.", icon: "BarChart3" },
      { title: "Automation rules", description: "Automate repetitive publishing tasks.", icon: "Workflow" },
    ],
  },
  {
    id: "agencies",
    label: "Agencies",
    icon: "Briefcase",
    headline: "Manage every client from a single command center",
    description:
      "Separate workspaces, white-label reports, and streamlined approvals make it easy to scale your client roster without scaling headcount.",
    painPoints: [
      "Juggling logins and tools across many clients",
      "Approval back-and-forth slows everything down",
      "Clients want branded reports, not spreadsheets",
    ],
    benefits: [
      { title: "Client workspaces", description: "Fully separated calendars, assets & permissions.", icon: "FolderKanban" },
      { title: "White-label reports", description: "Branded PDF & shareable client reports.", icon: "FileBarChart" },
      { title: "Approval workflows", description: "Get sign-off fast with structured review steps.", icon: "CheckCircle2" },
    ],
  },
  {
    id: "enterprises",
    label: "Enterprises",
    icon: "Landmark",
    headline: "Scale social media securely across every team & brand",
    description:
      "Advanced permissions, SSO, and audit logs give enterprise teams the governance they need without slowing down publishing velocity.",
    painPoints: [
      "Multiple brands and regional teams need governance",
      "Security & compliance requirements are non-negotiable",
      "Need visibility across dozens of team members",
    ],
    benefits: [
      { title: "Enterprise security", description: "SSO, audit logs & granular permissions.", icon: "ShieldCheck" },
      { title: "Multi-brand management", description: "Keep every regional brand organized.", icon: "Layers" },
      { title: "Dedicated support", description: "A named account manager & onboarding team.", icon: "Headset" },
    ],
  },
];
