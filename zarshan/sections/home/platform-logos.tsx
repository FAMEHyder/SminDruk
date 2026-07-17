import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeInStagger, FadeInItem } from "@/components/motion/fade-in";
import { PlatformIcon } from "@/components/platform-icon";
import { Platform } from "@/types";

const platforms: { id: Platform; label: string }[] = [
  { id: "facebook", label: "Facebook" },
  { id: "instagram", label: "Instagram" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "x", label: "X (Twitter)" },
  { id: "tiktok", label: "TikTok" },
  { id: "pinterest", label: "Pinterest" },
  { id: "youtube", label: "YouTube" },
  { id: "threads", label: "Threads" },
];

export function PlatformLogos() {
  return (
    <section className="py-20 sm:py-24">
      <Container className="flex flex-col items-center">
        <SectionHeading
          eyebrow="Everywhere your audience is"
          title="Publish to every major platform"
          description="Connect once, publish everywhere — Zarshan keeps every network in sync."
        />
        <FadeInStagger className="mt-12 grid w-full grid-cols-4 gap-6 sm:grid-cols-8">
          {platforms.map((p) => (
            <FadeInItem key={p.id} className="flex flex-col items-center gap-2">
              <PlatformIcon platform={p.id} className="size-12 text-base shadow-sm" />
              <span className="text-xs text-muted-foreground">{p.label}</span>
            </FadeInItem>
          ))}
        </FadeInStagger>
      </Container>
    </section>
  );
}
