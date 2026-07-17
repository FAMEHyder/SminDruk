import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/motion/fade-in";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-20%] left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>
      <Container className="flex flex-col items-center text-center">
        <FadeIn>
          <span className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase">
            {eyebrow}
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{description}</p>
        </FadeIn>
      </Container>
    </section>
  );
}
