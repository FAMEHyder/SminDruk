"use client";

import * as React from "react";
import { ExternalLink, KeyRound, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { connectedPageApi } from "@/lib/services";
import { ApiRequestError } from "@/lib/api";
import type { ApiSecretKeyPost } from "@/types/api";

export default function GetPostsPage() {
  const [secretKey, setSecretKey] = React.useState("");
  const [posts, setPosts] = React.useState<ApiSecretKeyPost[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [searched, setSearched] = React.useState(false);

  async function handleFetch(e: React.FormEvent) {
    e.preventDefault();
    if (!secretKey.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const data = await connectedPageApi.fetchPostsBySecretKey(secretKey.trim());
      setPosts(data);
    } catch (error) {
      setPosts([]);
      const message = error instanceof ApiRequestError ? error.message : "Could not fetch posts.";
      console.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Get Post Links</h2>
        <p className="text-sm text-muted-foreground">
          Enter your secret key to fetch all Facebook post links saved from bulk posts.
        </p>
      </div>

      <form onSubmit={handleFetch} className="rounded-2xl border border-border bg-card p-5 space-y-4">
        <div>
          <Label htmlFor="fetch-secret-key">Secret key</Label>
          <div className="mt-2 flex gap-2">
            <Input
              id="fetch-secret-key"
              placeholder="Enter the secret key you created"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
            />
            <Button type="submit" disabled={loading || !secretKey.trim()}>
              {loading ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />}
              Fetch
            </Button>
          </div>
        </div>
      </form>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : searched && posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center">
          <KeyRound className="mx-auto size-8 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">No posts found for this secret key.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post._id} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-start gap-3">
                <Avatar className="size-10">
                  <AvatarImage src={post.pageDp} />
                  <AvatarFallback>{post.pageName?.[0] ?? "P"}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium">{post.pageName}</p>
                    {post.pageNumber != null && (
                      <span className="text-xs text-muted-foreground">Page #{post.pageNumber}</span>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {new Date(post.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm">{post.postContent || "(No caption)"}</p>
                  {post.postLink && (
                    <a
                      href={post.postLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                    >
                      Open on Facebook
                      <ExternalLink className="size-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
