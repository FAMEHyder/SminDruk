import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { helpCategories } from "@/data/help";

export function generateStaticParams() {
  return helpCategories.flatMap((cat) => cat.articles.map((a) => ({ slug: a.slug })));
}

export default async function HelpArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = helpCategories.find((cat) => cat.articles.some((a) => a.slug === slug));
  const article = category?.articles.find((a) => a.slug === slug);

  if (!article || !category) notFound();

  return (
    <section className="py-16 sm:py-20">
      <Container className="mx-auto max-w-2xl">
        <FadeIn>
          <Button variant="ghost" size="sm" className="-ml-2" asChild>
            <Link href="/help">
              <ArrowLeft className="size-4" /> Back to Help Center
            </Link>
          </Button>

          <span className="mt-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon name={category.icon} className="size-6" />
          </span>
          <p className="mt-4 text-sm font-medium text-primary">{category.title}</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-balance">{article.title}</h1>

          <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none space-y-4 text-foreground/90">
            <p>
              This article walks you through everything you need to know about &ldquo;{article.title}&rdquo;.
              Our full documentation includes step-by-step instructions, screenshots, and video
              walkthroughs to help you get the most out of Zarshan.
            </p>
            <p>
              Need more help? Reach out to our support team any time from the Contact page, or
              browse related articles in the {category.title} category.
            </p>
          </div>

          <Button className="mt-8" asChild>
            <Link href="/contact">Contact Support</Link>
          </Button>
        </FadeIn>
      </Container>
    </section>
  );
}
