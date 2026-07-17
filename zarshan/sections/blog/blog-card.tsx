import Link from "next/link";
import { Clock } from "lucide-react";
import { BlogPost } from "@/types";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg",
        featured && "sm:col-span-2 sm:flex-row"
      )}
    >
      <div className={cn("overflow-hidden", featured ? "sm:w-1/2" : "")}>
        <img
          src={post.coverImage}
          alt={post.title}
          className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className={cn("flex flex-1 flex-col p-6", featured && "sm:w-1/2")}>
        <span className="w-fit rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
          {post.category}
        </span>
        <h3 className={cn("mt-3 font-semibold text-balance", featured ? "text-2xl" : "text-lg")}>
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
        <div className="mt-4 flex items-center gap-3 border-t border-border pt-4 text-xs text-muted-foreground">
          <img src={post.author.avatar} alt={post.author.name} className="size-6 rounded-full" />
          <span className="font-medium text-foreground">{post.author.name}</span>
          <span>·</span>
          <span>{formatDate(post.publishedAt, { month: "short", day: "numeric", year: undefined })}</span>
          <span className="ml-auto flex items-center gap-1">
            <Clock className="size-3" /> {post.readTime}
          </span>
        </div>
      </div>
    </Link>
  );
}
