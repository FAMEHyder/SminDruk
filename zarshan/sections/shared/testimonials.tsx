"use client";

import { Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeInStagger, FadeInItem } from "@/components/motion/fade-in";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlatformIcon } from "@/components/platform-icon";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section className="bg-muted/30 py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Loved by teams everywhere"
          title="Don't just take our word for it"
          description="See why creators, businesses, and agencies choose Zarshan every day."
        />

        <FadeInStagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <FadeInItem key={t.id}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="size-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                  {t.platform && <PlatformIcon platform={t.platform} className="size-6" />}
                </div>
                <p className="mt-4 flex-1 text-sm text-foreground/90">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3">
                  <Avatar className="size-9">
                    <AvatarImage src={t.avatar} />
                    <AvatarFallback>{t.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
              </div>
            </FadeInItem>
          ))}
        </FadeInStagger>
      </Container>
    </section>
  );
}
