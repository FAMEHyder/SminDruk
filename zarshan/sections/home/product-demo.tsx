"use client";

import * as React from "react";
import { PlayCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabs = [
  {
    value: "calendar",
    label: "Calendar",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1400&auto=format&fit=crop",
    description: "Drag, drop, and plan weeks of content on one visual calendar.",
  },
  {
    value: "analytics",
    label: "Analytics",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop",
    description: "Track performance across every network with real-time analytics.",
  },
  {
    value: "inbox",
    label: "Social Inbox",
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=1400&auto=format&fit=crop",
    description: "Reply to every comment and DM from a single unified inbox.",
  },
  {
    value: "ai",
    label: "AI Assistant",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1400&auto=format&fit=crop",
    description: "Generate captions, hashtags, and ideas in your brand voice.",
  },
];

export function ProductDemo() {
  return (
    <section className="py-20 sm:py-24" id="demo">
      <Container className="flex flex-col items-center">
        <SectionHeading
          eyebrow="See it in action"
          title="A tour of your new command center"
          description="Every tool you need to plan, create, and grow — designed to feel effortless."
        />

        <Tabs defaultValue="calendar" className="mt-12 w-full">
          <TabsList className="mx-auto grid w-full max-w-2xl grid-cols-2 gap-1 sm:grid-cols-4">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-8">
              <FadeIn className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
                <img src={tab.image} alt={tab.label} className="aspect-video w-full object-cover" />
                <button className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity hover:opacity-100">
                  <PlayCircle className="size-14 text-white" />
                </button>
                <div className="border-t border-border bg-card p-5 text-center text-sm text-muted-foreground">
                  {tab.description}
                </div>
              </FadeIn>
            </TabsContent>
          ))}
        </Tabs>
      </Container>
    </section>
  );
}
