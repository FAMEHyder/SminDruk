import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/motion/fade-in";
import { Icon } from "@/components/icon";
import { aiFeatures } from "@/data/ai-features";

export function AiShowcase() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <FadeIn>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase">
              <Sparkles className="size-3.5" /> AI-Powered
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Let AI handle the busywork, you focus on strategy
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Generate captions, hashtags, content ideas, rewrites, and translations — all trained
              on your brand voice, ready in seconds.
            </p>
            <Button className="mt-6" asChild>
              <Link href="/ai-features">
                Explore AI Features <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {aiFeatures.slice(0, 4).map((f) => (
              <FadeInItem key={f.slug}>
                <div className="h-full rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-lg">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon name={f.icon} className="size-5" />
                  </span>
                  <h3 className="mt-4 text-sm font-semibold">{f.title}</h3>
                  <p className="mt-1.5 text-xs text-muted-foreground">{f.description}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </Container>
    </section>
  );
}
