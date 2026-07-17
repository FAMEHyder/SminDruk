"use client";

import * as React from "react";
import { PageHero } from "@/sections/features/page-hero";
import { CtaSection } from "@/sections/shared/cta-section";
import { Container } from "@/components/ui/container";
import { FadeInStagger, FadeInItem } from "@/components/motion/fade-in";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { integrations, integrationCategories } from "@/data/integrations";

export default function IntegrationsPage() {
  const [category, setCategory] = React.useState("all");

  const filtered =
    category === "all" ? integrations : integrations.filter((i) => i.category === category);

  return (
    <>
      <PageHero
        eyebrow="Integrations"
        title="Connect every platform and tool you rely on"
        description="Native integrations with every major social network, plus the design, storage, and productivity tools your team already uses."
      />

      <section className="pb-20 sm:pb-24">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {integrationCategories.map((cat) => (
              <Button
                key={cat.id}
                size="sm"
                variant={category === cat.id ? "default" : "outline"}
                className="rounded-full"
                onClick={() => setCategory(cat.id)}
              >
                {cat.label}
              </Button>
            ))}
          </div>

          <FadeInStagger className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((integration) => (
              <FadeInItem key={integration.id}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <span
                      className="flex size-12 items-center justify-center rounded-xl text-white"
                      style={{ backgroundColor: integration.color }}
                    >
                      <Icon name={integration.icon} className="size-6" />
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-xs font-medium capitalize",
                        "bg-muted text-muted-foreground"
                      )}
                    >
                      {integration.category}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{integration.name}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{integration.description}</p>
                  <Button variant="ghost" size="sm" className="mt-4 w-fit px-0 text-primary hover:bg-transparent hover:text-primary">
                    Learn more →
                  </Button>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
