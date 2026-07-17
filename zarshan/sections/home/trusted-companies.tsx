import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/motion/fade-in";
import { trustedCompanies } from "@/data/testimonials";

export function TrustedCompanies() {
  return (
    <section className="border-y border-border/60 bg-muted/30 py-10">
      <Container>
        <FadeIn className="flex flex-col items-center gap-6">
          <p className="text-sm font-medium text-muted-foreground">
            Trusted by growing teams around the world
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-80">
            {trustedCompanies.map((name) => (
              <span key={name} className="text-lg font-semibold tracking-tight text-foreground/70">
                {name}
              </span>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
