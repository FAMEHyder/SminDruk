"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { PageHero } from "@/sections/features/page-hero";
import { CtaSection } from "@/sections/shared/cta-section";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FadeIn } from "@/components/motion/fade-in";
import { EmptyState } from "@/components/ui/state-blocks";
import { faqs, faqCategories } from "@/data/faq";

export default function FaqPage() {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState("All");

  const filtered = faqs.filter((faq) => {
    const matchesCategory = category === "All" || faq.category === category;
    const matchesQuery =
      query.trim() === "" ||
      faq.question.toLowerCase().includes(query.toLowerCase()) ||
      faq.answer.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Everything you need to know about Zarshan. Can't find your answer? Reach out to our team."
      />

      <section className="pb-20 sm:pb-24">
        <Container className="mx-auto max-w-3xl">
          <div className="relative">
            <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search frequently asked questions..."
              className="h-12 pl-11"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {["All", ...faqCategories].map((cat) => (
              <Button
                key={cat}
                size="sm"
                variant={category === cat ? "default" : "outline"}
                className="rounded-full"
                onClick={() => setCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          <FadeIn className="mt-10">
            {filtered.length > 0 ? (
              <Accordion type="single" collapsible>
                {filtered.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left text-base font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <EmptyState
                title="No matching questions"
                description="Try a different search term or browse another category."
              />
            )}
          </FadeIn>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
