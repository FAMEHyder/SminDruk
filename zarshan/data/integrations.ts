import { Integration } from "@/types";

export const integrations: Integration[] = [
  {
    id: "facebook",
    name: "Facebook",
    category: "social",
    icon: "Facebook",
    color: "#1877F2",
    description: "Schedule posts, Reels, and Stories to Pages and Groups.",
  },
  {
    id: "instagram",
    name: "Instagram",
    category: "social",
    icon: "Instagram",
    color: "#E4405F",
    description: "Publish feed posts, Reels, Stories, and Carousels.",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    category: "social",
    icon: "Linkedin",
    color: "#0A66C2",
    description: "Post to personal profiles and company pages.",
  },
  {
    id: "x",
    name: "X (Twitter)",
    category: "social",
    icon: "Twitter",
    color: "#000000",
    description: "Schedule threads, single posts, and media tweets.",
  },
  {
    id: "tiktok",
    name: "TikTok",
    category: "social",
    icon: "Music2",
    color: "#000000",
    description: "Directly publish short-form videos to TikTok.",
  },
  {
    id: "pinterest",
    name: "Pinterest",
    category: "social",
    icon: "Pinterest",
    color: "#E60023",
    description: "Schedule Pins and manage boards effortlessly.",
  },
  {
    id: "canva",
    name: "Canva",
    category: "design",
    icon: "Palette",
    color: "#00C4CC",
    description: "Design and import graphics without leaving Zarshan.",
  },
  {
    id: "google-drive",
    name: "Google Drive",
    category: "storage",
    icon: "HardDrive",
    color: "#0F9D58",
    description: "Import media directly from your Drive folders.",
  },
  {
    id: "slack",
    name: "Slack",
    category: "productivity",
    icon: "Slack",
    color: "#4A154B",
    description: "Get approval requests and alerts inside Slack.",
  },
];

export const integrationCategories = [
  { id: "all", label: "All" },
  { id: "social", label: "Social Networks" },
  { id: "design", label: "Design" },
  { id: "storage", label: "Storage" },
  { id: "productivity", label: "Productivity" },
];
