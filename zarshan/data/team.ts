import { TeamMember, CompanyValue, Stat } from "@/types";

export const teamMembers: TeamMember[] = [
  {
    id: "m1",
    name: "Zara Shan",
    role: "Co-Founder & CEO",
    avatar: "https://i.pravatar.cc/200?img=44",
    bio: "Previously led growth at two social-first startups. Obsessed with helping creators build sustainable businesses.",
    social: { x: "#", linkedin: "#" },
  },
  {
    id: "m2",
    name: "Rehan Malik",
    role: "Co-Founder & CTO",
    avatar: "https://i.pravatar.cc/200?img=13",
    bio: "10+ years building scalable infrastructure. Formerly staff engineer at a Fortune 500 media company.",
    social: { x: "#", linkedin: "#" },
  },
  {
    id: "m3",
    name: "Lena Fischer",
    role: "Head of Product",
    avatar: "https://i.pravatar.cc/200?img=48",
    bio: "Design-led product leader passionate about turning complex workflows into delightful experiences.",
    social: { linkedin: "#" },
  },
  {
    id: "m4",
    name: "Tariq Hassan",
    role: "Head of Engineering",
    avatar: "https://i.pravatar.cc/200?img=33",
    bio: "Leads the platform team behind Zarshan's real-time publishing and analytics infrastructure.",
    social: { linkedin: "#" },
  },
  {
    id: "m5",
    name: "Nadia Petrova",
    role: "Head of Customer Success",
    avatar: "https://i.pravatar.cc/200?img=29",
    bio: "Ensures every creator, business, and agency gets the most value out of Zarshan every day.",
    social: { x: "#" },
  },
  {
    id: "m6",
    name: "Jordan Wells",
    role: "Head of Marketing",
    avatar: "https://i.pravatar.cc/200?img=56",
    bio: "Builds Zarshan's brand voice and tells the stories of the creators and teams we serve.",
    social: { x: "#", linkedin: "#" },
  },
];

export const companyValues: CompanyValue[] = [
  {
    title: "Creator-first",
    description: "Every decision starts with what helps creators and teams do their best work.",
    icon: "Heart",
  },
  {
    title: "Radical simplicity",
    description: "We remove complexity relentlessly so social media management feels effortless.",
    icon: "Feather",
  },
  {
    title: "Move with speed",
    description: "We ship fast, learn faster, and never let perfect be the enemy of good.",
    icon: "Zap",
  },
  {
    title: "Own the outcome",
    description: "We measure success by our customers' growth, not vanity metrics.",
    icon: "Target",
  },
];

export const companyStats: Stat[] = [
  { label: "Active teams", value: "28,000+" },
  { label: "Posts scheduled monthly", value: "6.4M" },
  { label: "Countries served", value: "120+" },
  { label: "Founded", value: "2021" },
];
