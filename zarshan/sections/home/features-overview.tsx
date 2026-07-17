import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeInStagger, FadeInItem } from "@/components/motion/fade-in";
import { Icon } from "@/components/icon";
import { features } from "@/data/features";

export function FeaturesOverview() {
  return (
    <section className="py-20 sm:py-24" id="features">
      <Container>
        <SectionHeading
          eyebrow="Everything in one place"
          title="One platform for your entire social workflow"
          description="From planning to publishing to reporting — Zarshan replaces your entire stack of social media tools."
        />

        <FadeInStagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FadeInItem key={feature.slug}>
              <Link
                href={`/features#${feature.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon name={feature.icon} className="size-5" />
                  </span>
                  <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </Link>
            </FadeInItem>
          ))}
        </FadeInStagger>
      </Container>
    </section>
  );
}
