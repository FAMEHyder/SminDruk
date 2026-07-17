import { BlogPost } from "@/types";

export const blogCategories = [
  "All",
  "Strategy",
  "AI & Automation",
  "Analytics",
  "Product Updates",
  "Case Studies",
];

export const blogPosts: BlogPost[] = [
  {
    slug: "2027-social-media-trends",
    title: "10 Social Media Trends Every Brand Needs to Know in 2027",
    excerpt:
      "From AI-generated content to short-form everything — here's what's shaping social strategy this year.",
    content:
      "Social media never stands still, and 2027 is no exception. In this deep dive, we break down the ten biggest shifts brands need to prepare for, from platform algorithm changes to the rise of AI co-creation. \n\nFirst, short-form video continues to dominate discovery across every major platform. Brands that consistently publish native, platform-tailored video are seeing 3-4x more reach than those repurposing the same clip everywhere.\n\nSecond, AI-assisted content creation has moved from novelty to necessity. Teams using AI to draft first versions of captions, hashtags, and ideas ship more content, more consistently, without sacrificing brand voice.\n\nThird, social commerce keeps expanding — shoppable posts, in-app checkout, and creator affiliate programs are now baseline expectations rather than experiments.\n\nWe'll also cover community-led growth, the return of long-form on unexpected platforms, and why analytics literacy is now a core marketing skill.",
    category: "Strategy",
    author: { name: "Jordan Wells", avatar: "https://i.pravatar.cc/100?img=56", role: "Head of Marketing" },
    coverImage: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1200&auto=format&fit=crop",
    publishedAt: "2027-01-14",
    readTime: "7 min read",
    featured: true,
    tags: ["Trends", "Strategy", "2027"],
  },
  {
    slug: "ai-captions-that-convert",
    title: "How to Write AI Captions That Actually Convert",
    excerpt:
      "AI can draft your captions in seconds — here's how to prompt and edit them so they still sound like you.",
    content:
      "AI caption tools are only as good as the input you give them. In this guide, we walk through the exact prompting framework our top customers use to get captions that sound authentically on-brand, every time.\n\nStart with context: audience, platform, and goal. Then give the AI a real example of your brand voice. Finally, always do a 10-second human pass before publishing — tighten the hook, adjust slang, and make sure the call-to-action matches your campaign.",
    category: "AI & Automation",
    author: { name: "Lena Fischer", avatar: "https://i.pravatar.cc/100?img=48", role: "Head of Product" },
    coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
    publishedAt: "2027-01-08",
    readTime: "5 min read",
    featured: true,
    tags: ["AI", "Captions", "Copywriting"],
  },
  {
    slug: "reading-your-analytics-dashboard",
    title: "The Only 5 Metrics You Need to Check Every Week",
    excerpt:
      "Stop drowning in dashboards. These five metrics tell you almost everything about your social performance.",
    content:
      "Reach, engagement rate, follower growth rate, save rate, and click-through rate. That's it — those five numbers, tracked weekly, will tell you more than fifty vanity metrics combined.\n\nIn this article we explain how to interpret each metric, what a 'good' benchmark looks like by platform, and how to build a five-minute weekly reporting habit your whole team will actually stick to.",
    category: "Analytics",
    author: { name: "Tariq Hassan", avatar: "https://i.pravatar.cc/100?img=33", role: "Head of Engineering" },
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    publishedAt: "2026-12-22",
    readTime: "6 min read",
    tags: ["Analytics", "Reporting"],
  },
  {
    slug: "zarshan-social-inbox-launch",
    title: "Introducing Social Inbox: One Place for Every DM and Comment",
    excerpt:
      "Our biggest product launch yet brings every conversation across every platform into a single unified inbox.",
    content:
      "We're thrilled to announce Social Inbox, the most requested feature from our community. Now you can view, filter, and reply to every comment and direct message across Facebook, Instagram, LinkedIn, X, TikTok, and Pinterest — without switching tabs.\n\nSocial Inbox includes sentiment tagging, saved replies, and team assignment so nothing falls through the cracks, even at scale.",
    category: "Product Updates",
    author: { name: "Rehan Malik", avatar: "https://i.pravatar.cc/100?img=13", role: "Co-Founder & CTO" },
    coverImage: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=1200&auto=format&fit=crop",
    publishedAt: "2026-12-10",
    readTime: "4 min read",
    tags: ["Product", "Inbox", "Launch"],
  },
  {
    slug: "nova-agency-case-study",
    title: "How Nova Digital Agency Scaled to 40+ Clients With Zarshan",
    excerpt:
      "A look inside how one agency consolidated five tools into one and cut client onboarding time by 70%.",
    content:
      "Nova Digital Agency was juggling five different tools to manage 40+ client social accounts. After switching to Zarshan's Agency plan, they consolidated everything into one workspace, cut onboarding time by 70%, and grew their client base by 35% within six months — all while keeping their same team size.\n\nRead the full breakdown of their workflow, from white-labeled reporting to approval automation.",
    category: "Case Studies",
    author: { name: "Nadia Petrova", avatar: "https://i.pravatar.cc/100?img=29", role: "Head of Customer Success" },
    coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
    publishedAt: "2026-11-29",
    readTime: "8 min read",
    tags: ["Case Study", "Agency"],
  },
  {
    slug: "content-calendar-templates",
    title: "5 Content Calendar Templates You Can Steal Today",
    excerpt:
      "Skip the blank page. These five ready-made calendar structures work for creators, businesses, and agencies alike.",
    content:
      "A great content calendar removes decision fatigue. In this post we share five templates — the 'pillar rotation', the '80/20 value-to-promo mix', the 'weekly theme' calendar, the 'campaign sprint' calendar, and the 'evergreen recycler' — plus how to set each one up directly inside Zarshan.",
    category: "Strategy",
    author: { name: "Zara Shan", avatar: "https://i.pravatar.cc/100?img=44", role: "Co-Founder & CEO" },
    coverImage: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1200&auto=format&fit=crop",
    publishedAt: "2026-11-15",
    readTime: "6 min read",
    tags: ["Calendar", "Templates", "Planning"],
  },
];
