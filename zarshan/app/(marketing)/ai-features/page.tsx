import { Metadata } from "next";
import { PageHero } from "@/sections/features/page-hero";
import { AiExampleCard } from "@/sections/ai-features/example-card";
import { CtaSection } from "@/sections/shared/cta-section";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/motion/fade-in";
import { aiFeatures, aiStats } from "@/data/ai-features";

export const metadata: Metadata = {
  title: "AI Features",
  description:
    "Explore Zarshan's AI Assistant — caption generator, hashtag generator, content ideas, rewrite tool, and translation.",
};

export default function AiFeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="AI Features"
        title="Your AI co-pilot for social media content"
        description="Write faster, brainstorm smarter, and repurpose content across languages — all trained on your brand voice."
      />

      <section className="pb-10">
        <Container>
          <FadeIn className="grid grid-cols-2 gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-4">
            {aiStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-semibold sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </FadeIn>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {aiFeatures.map((feature, i) => (
              <AiExampleCard key={feature.slug} feature={feature} index={i} />
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
