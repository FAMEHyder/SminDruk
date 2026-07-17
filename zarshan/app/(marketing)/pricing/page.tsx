import { Metadata } from "next";
import { PageHero } from "@/sections/features/page-hero";
import { PricingTable } from "@/sections/shared/pricing-table";
import { FaqSection } from "@/sections/shared/faq-section";
import { CtaSection } from "@/sections/shared/cta-section";
import { Container } from "@/components/ui/container";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/ui/section-heading";
import { pricingFaqs } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for creators, businesses, and agencies. Start free, upgrade any time.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Plans for every stage of growth"
        description="Start for free, no credit card required. Upgrade any time as your team and platforms grow."
      />

      <section className="pb-20 sm:pb-24">
        <Container>
          <PricingTable />
        </Container>
      </section>

      <section className="pb-20 sm:pb-24">
        <Container className="mx-auto max-w-3xl">
          <SectionHeading title="Pricing questions" align="left" className="items-start text-left" />
          <div className="mt-8">
            <Accordion type="single" collapsible>
              {pricingFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`pf-${i}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </section>

      <FaqSection limit={4} />
      <CtaSection />
    </>
  );
}
