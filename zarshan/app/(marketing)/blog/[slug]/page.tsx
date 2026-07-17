import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { Clock, Link2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/motion/fade-in";
import { BlogCard } from "@/sections/blog/blog-card";
import { CtaSection } from "@/sections/shared/cta-section";
import { Button } from "@/components/ui/button";
import { FacebookIcon, LinkedinIcon } from "@/components/brand-icons";
import { formatDate } from "@/lib/format";
import { blogPosts } from "@/data/blog";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);
  const relatedFallback = related.length > 0 ? related : blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <article className="py-16 sm:py-20">
        <Container className="mx-auto max-w-3xl">
          <FadeIn>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {post.category}
            </span>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            <div className="mt-6 flex items-center gap-3">
              <img src={post.author.avatar} alt={post.author.name} className="size-11 rounded-full" />
              <div>
                <p className="text-sm font-medium">{post.author.name}</p>
                <p className="text-xs text-muted-foreground">{post.author.role}</p>
              </div>
              <span className="mx-2 text-muted-foreground">·</span>
              <p className="text-xs text-muted-foreground">{formatDate(post.publishedAt)}</p>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="size-3" /> {post.readTime}
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <img
              src={post.coverImage}
              alt={post.title}
              className="mt-8 aspect-video w-full rounded-2xl border border-border object-cover"
            />
          </FadeIn>

          <FadeIn delay={0.15} className="prose prose-neutral dark:prose-invert mt-8 max-w-none">
            {post.content.split("\n\n").map((para, i) => (
              <p key={i} className="mb-4 leading-relaxed text-foreground/90">
                {para}
              </p>
            ))}
          </FadeIn>

          <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-border pt-6">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 border-t border-border pt-6">
            <span className="text-sm font-medium text-foreground">Share:</span>
            <Button size="icon" variant="outline" className="size-9 rounded-full">
              <FacebookIcon className="size-4" />
            </Button>
            <Button size="icon" variant="outline" className="size-9 rounded-full">
              <LinkedinIcon className="size-4" />
            </Button>
            <Button size="icon" variant="outline" className="size-9 rounded-full">
              <Link2 className="size-4" />
            </Button>
          </div>
        </Container>
      </article>

      <section className="border-t border-border bg-muted/30 py-16 sm:py-20">
        <Container>
          <h2 className="text-2xl font-semibold">Related articles</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {relatedFallback.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link href="/blog">Back to Blog</Link>
            </Button>
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
