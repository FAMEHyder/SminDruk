import { SocialPost } from "@/types";

export const dashboardStats = [
  { label: "Total Followers", value: "128.4K", change: "+4.2%", trend: "up" as const, icon: "Users" },
  { label: "Engagement Rate", value: "6.8%", change: "+1.1%", trend: "up" as const, icon: "Heart" },
  { label: "Scheduled Posts", value: "34", change: "+8", trend: "up" as const, icon: "CalendarClock" },
  { label: "Reach This Week", value: "842K", change: "-2.4%", trend: "down" as const, icon: "Eye" },
];

export const engagementData = [
  { day: "Mon", engagement: 2400, reach: 8200 },
  { day: "Tue", engagement: 1980, reach: 7100 },
  { day: "Wed", engagement: 3200, reach: 9800 },
  { day: "Thu", engagement: 2780, reach: 8900 },
  { day: "Fri", engagement: 4100, reach: 12400 },
  { day: "Sat", engagement: 3650, reach: 11200 },
  { day: "Sun", engagement: 2950, reach: 9600 },
];

export const platformBreakdown = [
  { platform: "Instagram", value: 38, color: "#E4405F" },
  { platform: "Facebook", value: 24, color: "#1877F2" },
  { platform: "LinkedIn", value: 18, color: "#0A66C2" },
  { platform: "X", value: 12, color: "#71717a" },
  { platform: "TikTok", value: 8, color: "#18181b" },
];

export const recentPosts: SocialPost[] = [
  {
    id: "p1",
    platform: "instagram",
    content: "Cozy season just got a glow-up ✨ Our new Matcha Latte is here — creamy, earthy, and made for slow mornings.",
    status: "published",
    publishedAt: "2026-07-12T09:00:00Z",
    engagement: { likes: 842, comments: 56, shares: 21 },
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "p2",
    platform: "linkedin",
    content: "We're hiring! Join our growing product team and help shape the future of social media management.",
    status: "scheduled",
    scheduledAt: "2026-07-15T14:00:00Z",
  },
  {
    id: "p3",
    platform: "x",
    content: "Big announcement coming this week 👀 Stay tuned.",
    status: "draft",
  },
  {
    id: "p4",
    platform: "facebook",
    content: "Our summer sale ends tonight! Don't miss up to 40% off site-wide.",
    status: "published",
    publishedAt: "2026-07-10T18:00:00Z",
    engagement: { likes: 312, comments: 24, shares: 45 },
  },
  {
    id: "p5",
    platform: "tiktok",
    content: "POV: your feed just got 10x more aesthetic 🎬",
    status: "failed",
  },
];

export const upcomingPosts = [
  { id: "u1", title: "Product launch teaser", platform: "instagram" as const, date: "Jul 15", time: "9:00 AM" },
  { id: "u2", title: "Weekly team hiring post", platform: "linkedin" as const, date: "Jul 15", time: "2:00 PM" },
  { id: "u3", title: "Customer testimonial reel", platform: "tiktok" as const, date: "Jul 16", time: "11:30 AM" },
  { id: "u4", title: "Behind the scenes carousel", platform: "instagram" as const, date: "Jul 17", time: "10:00 AM" },
  { id: "u5", title: "Flash sale announcement", platform: "facebook" as const, date: "Jul 18", time: "8:00 AM" },
];
