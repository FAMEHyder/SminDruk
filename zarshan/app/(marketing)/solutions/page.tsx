"use client";

import * as React from "react";
import { X } from "lucide-react";
import { PageHero } from "@/sections/features/page-hero";
import { CtaSection } from "@/sections/shared/cta-section";
import { Container } from "@/components/ui/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/motion/fade-in";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { solutionAudiences } from "@/data/solutions";

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Built for every kind of social media team"
        description="Whether you're a solo creator or a global enterprise, Zarshan adapts to how you work."
      />

      <section className="pb-20 sm:pb-24">
        <Container>
          <Tabs defaultValue={solutionAudiences[0].id} className="w-full">
            <TabsList className="mx-auto grid w-full max-w-2xl grid-cols-2 gap-1 sm:grid-cols-4">
              {solutionAudiences.map((a) => (
                <TabsTrigger key={a.id} value={a.id} id={a.id}>
                  <Icon name={a.icon} className="mr-1.5 size-4" />
                  {a.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {solutionAudiences.map((audience) => (
              <TabsContent key={audience.id} value={audience.id} className="mt-12">
                <FadeIn className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                  <div>
                    <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon name={audience.icon} className="size-6" />
                    </span>
                    <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance">
                      {audience.headline}
                    </h2>
                    <p className="mt-4 text-base text-muted-foreground">{audience.description}</p>

                    <div className="mt-6 space-y-2.5">
                      <p className="text-sm font-semibold text-foreground">Common challenges:</p>
                      {audience.painPoints.map((pain) => (
                        <div key={pain} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <X className="mt-0.5 size-4 shrink-0 text-destructive/70" />
                          {pain}
                        </div>
                      ))}
                    </div>

                    <Button className="mt-7" asChild>
                      <Link href="/register">Get Started as a {audience.label.slice(0, -1)}</Link>
                    </Button>
                  </div>

                  <FadeInStagger className="grid gap-4">
                    {audience.benefits.map((benefit) => (
                      <FadeInItem key={benefit.title}>
                        <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
                          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Icon name={benefit.icon} className="size-5" />
                          </span>
                          <div>
                            <p className="text-sm font-semibold">{benefit.title}</p>
                            <p className="mt-1 text-sm text-muted-foreground">{benefit.description}</p>
                          </div>
                        </div>
                      </FadeInItem>
                    ))}
                  </FadeInStagger>
                </FadeIn>
              </TabsContent>
            ))}
          </Tabs>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
