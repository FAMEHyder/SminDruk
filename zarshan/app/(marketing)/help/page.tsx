"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, LifeBuoy, Search } from "lucide-react";
import { CtaSection } from "@/sections/shared/cta-section";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { FadeInStagger, FadeInItem } from "@/components/motion/fade-in";
import { Icon } from "@/components/icon";
import { helpCategories } from "@/data/help";

export default function HelpCenterPage() {
  const [query, setQuery] = React.useState("");

  const filtered = helpCategories
    .map((cat) => ({
      ...cat,
      articles: cat.articles.filter((a) => a.title.toLowerCase().includes(query.toLowerCase())),
    }))
    .filter((cat) => query.trim() === "" || cat.articles.length > 0);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-transparent py-20 sm:py-28">
        <Container className="flex flex-col items-center text-center">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <LifeBuoy className="size-7" />
          </span>
          <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            How can we help you today?
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Search our documentation, guides, and tutorials — or browse by category below.
          </p>
          <div className="relative mt-8 w-full max-w-xl">
            <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for articles, guides, tutorials..."
              className="h-12 pl-11"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24">
        <Container>
          <FadeInStagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((cat) => (
              <FadeInItem key={cat.id}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon name={cat.icon} className="size-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{cat.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{cat.description}</p>

                  <ul className="mt-4 flex-1 space-y-2">
                    {cat.articles.slice(0, 4).map((article) => (
                      <li key={article.slug}>
                        <Link
                          href={`/help/${article.slug}`}
                          className="flex items-center gap-1.5 text-sm text-foreground/80 hover:text-primary"
                        >
                          <ArrowRight className="size-3.5 shrink-0" /> {article.title}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-4 text-xs text-muted-foreground">{cat.articleCount} articles</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
