import { FAQItem } from "@/types";

export const faqCategories = [
  "General",
  "Billing",
  "Features",
  "Security",
  "Integrations",
];

export const faqs: FAQItem[] = [
  {
    id: "f1",
    category: "General",
    question: "What is Zarshan?",
    answer:
      "Zarshan is an all-in-one social media management platform that lets you plan, create, schedule, and analyze content across every major social network from a single dashboard.",
  },
  {
    id: "f2",
    category: "General",
    question: "Which social platforms does Zarshan support?",
    answer:
      "Zarshan supports Facebook, Instagram, LinkedIn, X (Twitter), TikTok, and Pinterest, with more platforms added regularly.",
  },
  {
    id: "f3",
    category: "Billing",
    question: "Do you offer a free plan?",
    answer:
      "Yes, our Free plan includes 3 connected accounts and 30 scheduled posts per month — no credit card required.",
  },
  {
    id: "f4",
    category: "Billing",
    question: "Can I cancel my subscription anytime?",
    answer:
      "Absolutely. You can cancel your subscription at any time from your account settings with no cancellation fees.",
  },
  {
    id: "f5",
    category: "Billing",
    question: "Do you offer annual billing discounts?",
    answer:
      "Yes, switching to yearly billing saves you up to 20% compared to monthly pricing on every paid plan.",
  },
  {
    id: "f6",
    category: "Features",
    question: "Does Zarshan have an AI writing assistant?",
    answer:
      "Yes. Zarshan includes an AI Assistant that generates captions, hashtags, content ideas, rewrites, and translations tailored to your brand voice.",
  },
  {
    id: "f7",
    category: "Features",
    question: "Can multiple team members collaborate on the same account?",
    answer:
      "Yes, our Professional plan and above support team collaboration with custom roles, approval workflows, and shared calendars.",
  },
  {
    id: "f8",
    category: "Security",
    question: "Is my data secure with Zarshan?",
    answer:
      "We use bank-grade encryption in transit and at rest, and never store your social passwords — all connections use official OAuth APIs.",
  },
  {
    id: "f9",
    category: "Security",
    question: "Do you offer Single Sign-On (SSO)?",
    answer:
      "SSO is available on our Enterprise plan, along with advanced security controls and audit logs.",
  },
  {
    id: "f10",
    category: "Integrations",
    question: "Can I import designs directly from Canva?",
    answer:
      "Yes, our native Canva integration lets you design and import graphics without ever leaving Zarshan.",
  },
  {
    id: "f11",
    category: "Integrations",
    question: "Does Zarshan integrate with Slack?",
    answer:
      "Yes, connect Slack to receive approval requests, publishing alerts, and inbox notifications directly in your workspace.",
  },
  {
    id: "f12",
    category: "General",
    question: "Is there a mobile app?",
    answer:
      "Yes, Zarshan is available on iOS and Android so you can schedule, approve, and respond to messages on the go.",
  },
];
