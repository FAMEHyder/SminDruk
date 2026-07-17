import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/motion/fade-in";
import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";
import { Feature } from "@/types";

const images: Record<string, string> = {
  scheduling: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1200&auto=format&fit=crop",
  analytics: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
  collaboration: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop",
  "ai-assistant": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
  inbox: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=1200&auto=format&fit=crop",
  automation: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=1200&auto=format&fit=crop",
  "media-library": "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1200&auto=format&fit=crop",
  integrations: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
};

export function FeatureDetail({ feature, index }: { feature: Feature; index: number }) {
  const reversed = index % 2 === 1;

  return (
    <section
      id={feature.slug}
      className={cn("py-14 sm:py-20", index % 2 === 0 ? "bg-transparent" : "bg-muted/30")}
    >
      <Container>
        <div
          className={cn(
            "grid grid-cols-1 items-center gap-12 lg:grid-cols-2",
            reversed && "lg:[direction:rtl]"
          )}
        >
          <FadeIn className="lg:[direction:ltr]">
            <img
              src={images[feature.slug]}
              alt={feature.title}
              className="aspect-video w-full rounded-2xl border border-border object-cover shadow-lg"
            />
          </FadeIn>

          <FadeIn delay={0.1} className="lg:[direction:ltr]">
            <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon name={feature.icon} className="size-6" />
            </span>
            <h2 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">{feature.title}</h2>
            <p className="mt-3 text-base text-muted-foreground">{feature.description}</p>

            {feature.bullets && (
              <ul className="mt-6 space-y-3">
                {feature.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 text-sm text-foreground/90">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
