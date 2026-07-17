"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { PageHero } from "@/sections/features/page-hero";
import { BlogCard } from "@/sections/blog/blog-card";
import { CtaSection } from "@/sections/shared/cta-section";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FadeInStagger, FadeInItem } from "@/components/motion/fade-in";
import { EmptyState } from "@/components/ui/state-blocks";
import { blogPosts, blogCategories } from "@/data/blog";

export default function BlogPage() {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState("All");

  const featured = blogPosts.filter((p) => p.featured);

  const filtered = blogPosts.filter((post) => {
    const matchesCategory = category === "All" || post.category === category;
    const matchesQuery =
      query.trim() === "" ||
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Insights, trends & guides for social media teams"
        description="Strategy, AI, analytics, and product updates from the Zarshan team."
      />

      <section className="pb-14">
        <Container>
          <FadeInStagger className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {featured.map((post) => (
              <FadeInItem key={post.slug}>
                <BlogCard post={post} />
              </FadeInItem>
            ))}
          </FadeInStagger>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {blogCategories.map((cat) => (
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
            <div className="relative w-full sm:w-64">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                className="pl-9"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          {filtered.length > 0 ? (
            <FadeInStagger className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post) => (
                <FadeInItem key={post.slug}>
                  <BlogCard post={post} />
                </FadeInItem>
              ))}
            </FadeInStagger>
          ) : (
            <EmptyState
              className="mt-10"
              title="No articles found"
              description="Try adjusting your search or filter to find what you're looking for."
            />
          )}
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
