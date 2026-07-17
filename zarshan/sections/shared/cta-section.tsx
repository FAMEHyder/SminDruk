import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";

export function CtaSection() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <FadeIn className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-fuchsia-600 to-purple-700 px-6 py-16 text-center sm:px-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent_60%)]" />
          <h2 className="relative text-3xl font-semibold tracking-tight text-white text-balance sm:text-4xl">
            Ready to simplify your social media management?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-white/85">
            Join 28,000+ creators, businesses, and agencies growing faster with Zarshan. No credit card required.
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" variant="secondary" className="h-12 px-7 text-base" asChild>
              <Link href="/register">
                Start Free Trial <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 border-white/30 bg-transparent px-7 text-base text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link href="/contact">Talk to Sales</Link>
            </Button>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
