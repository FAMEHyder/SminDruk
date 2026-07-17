import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { PricingTable } from "@/sections/shared/pricing-table";

export function PricingPreview() {
  return (
    <section className="py-20 sm:py-24" id="pricing">
      <Container className="flex flex-col items-center">
        <SectionHeading
          eyebrow="Simple, transparent pricing"
          title="Plans that grow with you"
          description="Start for free. Upgrade any time as your team and platforms grow."
        />
        <div className="mt-12 w-full">
          <PricingTable compact />
        </div>
        <Button variant="outline" className="mt-10" asChild>
          <Link href="/pricing">
            Compare all plans <ArrowRight className="ml-1 size-4" />
          </Link>
        </Button>
      </Container>
    </section>
  );
}
