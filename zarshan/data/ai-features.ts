import { AIFeature } from "@/types";

export const aiFeatures: AIFeature[] = [
  {
    slug: "caption-generator",
    icon: "MessageSquareText",
    title: "AI Caption Generator",
    description:
      "Generate scroll-stopping captions in your brand voice for any platform in seconds.",
    example: {
      input: "New matcha latte launch, cozy autumn vibes, coffee shop",
      output:
        "Cozy season just got a glow-up ✨ Our new Matcha Latte is here — creamy, earthy, and made for slow mornings. Come warm up with us today.",
    },
  },
  {
    slug: "hashtag-generator",
    icon: "Hash",
    title: "AI Hashtag Generator",
    description:
      "Get trending, relevant hashtags tailored to your content and niche instantly.",
    example: {
      input: "Fitness brand launching new resistance bands",
      output:
        "#ResistanceBands #HomeGymEssentials #FitnessGear #StrengthTraining #WorkoutMotivation",
    },
  },
  {
    slug: "content-ideas",
    icon: "Lightbulb",
    title: "AI Content Ideas",
    description:
      "Never run out of ideas — get a month of on-brand content concepts in one click.",
    example: {
      input: "Skincare brand, targeting Gen Z, Instagram Reels",
      output:
        "1) 'Get Ready With Me' skincare routine 2) Ingredient myth-busting 3) Before/after glow-up 4) Staff skincare shelfies",
    },
  },
  {
    slug: "rewrite-tool",
    icon: "Wand2",
    title: "AI Rewrite Tool",
    description:
      "Repurpose one caption into ten — adjust tone, length, and platform instantly.",
    example: {
      input: "Make this more casual and shorter for TikTok",
      output: "ok but why is this SO good 😭 you need this in your life rn",
    },
  },
  {
    slug: "translation",
    icon: "Languages",
    title: "AI Translation",
    description:
      "Reach global audiences with instant, natural-sounding translations for every post.",
    example: {
      input: "Translate to Spanish: 'Our summer sale ends tonight!'",
      output: "¡Nuestra oferta de verano termina esta noche!",
    },
  },
];

export const aiStats = [
  { label: "Captions generated", value: "48M+" },
  { label: "Avg. time saved per post", value: "6.2 min" },
  { label: "Languages supported", value: "40+" },
  { label: "Engagement lift reported", value: "32%" },
];
