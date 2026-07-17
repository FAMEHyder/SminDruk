"use client";

import * as React from "react";
import Link from "next/link";
import { ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth-context";
import { postApi } from "@/lib/services";
import type { ApiPagePost } from "@/types/api";

function getPostCaption(item: ApiPagePost) {
  if (item.postContent?.trim()) return item.postContent;
  if (item.post && typeof item.post === "object" && item.post.content) return item.post.content;
  return "(No caption)";
}

export default function PublishedLinksPage() {
  const { workspace } = useAuth();
  const [links, setLinks] = React.useState<ApiPagePost[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!workspace) return;
    setLoading(true);
    postApi
      .pageLinks(workspace._id)
      .then(setLinks)
      .catch(() => setLinks([]))
      .finally(() => setLoading(false));
  }, [workspace]);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Published Post Links</h2>
          <p className="text-sm text-muted-foreground">
            Every Facebook page post with its live link, grouped by page.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/dashboard">Back to Overview</Link>
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : links.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
          <p className="text-sm text-muted-foreground">No published Facebook links yet.</p>
          <Button asChild className="mt-4">
            <Link href="/dashboard/create-post">Create a post</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {links.map((item) => (
            <div key={item._id} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-start gap-3">
                <Avatar className="size-10">
                  <AvatarFallback>{item.pageName[0]}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium">{item.pageName}</p>
                    <span className="text-xs text-muted-foreground">
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm text-foreground/90">{getPostCaption(item)}</p>
                  {item.postLink ? (
                    <a
                      href={item.postLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                    >
                      Open on Facebook
                      <ExternalLink className="size-3.5" />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
