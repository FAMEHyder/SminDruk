"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CalendarClock, Loader2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/lib/auth-context";
import { connectedPageApi, mediaApi } from "@/lib/services";
import { ApiRequestError } from "@/lib/api";
import type { ApiMedia } from "@/types/api";

const ALL_CATEGORIES = "__all__";

export default function BulkPostPage() {
  const router = useRouter();
  const { workspace } = useAuth();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [secretKey, setSecretKey] = React.useState("");
  const [fromPage, setFromPage] = React.useState("1");
  const [toPage, setToPage] = React.useState("1");
  const [category, setCategory] = React.useState(ALL_CATEGORIES);
  const [content, setContent] = React.useState("");
  const [postType, setPostType] = React.useState<"text" | "photo" | "video">("text");
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [maxPage, setMaxPage] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const [categories, setCategories] = React.useState<string[]>([]);
  const [media, setMedia] = React.useState<ApiMedia | null>(null);
  const [loadingMeta, setLoadingMeta] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);

  React.useEffect(() => {
    setLoadingMeta(true);
    connectedPageApi
      .trendingMeta()
      .then((data) => {
        setMaxPage(data.maxPageNumber);
        setTotalPages(data.totalPages);
        setCategories(data.categories);
        if (data.maxPageNumber > 0) {
          setFromPage("1");
          setToPage(String(data.maxPageNumber));
        }
      })
      .catch(() => {
        setMaxPage(0);
        setTotalPages(0);
        setCategories([]);
      })
      .finally(() => setLoadingMeta(false));
  }, []);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !workspace) return;
    setUploading(true);
    try {
      const uploaded = await mediaApi.upload(workspace._id, file);
      setMedia(uploaded);
      setPostType(uploaded.fileType === "video" ? "video" : "photo");
      toast.success("Media uploaded!");
    } catch (error) {
      const message = error instanceof ApiRequestError ? error.message : "Upload failed.";
      toast.error(message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(mode: "now" | "schedule") {
    if (!workspace) {
      toast.error("Workspace not ready yet.");
      return;
    }
    if (!secretKey.trim()) {
      toast.error("Create a secret key to identify and fetch these posts later.");
      return;
    }
    if (!content.trim()) {
      toast.error("Write your post content first.");
      return;
    }

    const from = Number(fromPage);
    const to = Number(toPage);
    if (Number.isNaN(from) || Number.isNaN(to) || from < 1 || to < from) {
      toast.error("Enter a valid page number range.");
      return;
    }

    let scheduledAt: string | undefined;
    if (mode === "schedule") {
      if (!date || !time) {
        toast.error("Pick a date and time to schedule.");
        return;
      }
      const [year, month, day] = date.split("-").map(Number);
      const [hours, minutes] = time.split(":").map(Number);
      scheduledAt = new Date(year, month - 1, day, hours, minutes).toISOString();
    }

    const selectedCategory = category === ALL_CATEGORIES ? undefined : category;

    setSubmitting(true);
    try {
      await connectedPageApi.bulkPost({
        workspaceId: workspace._id,
        secretKey: secretKey.trim(),
        content,
        fromPage: from,
        toPage: to,
        category: selectedCategory,
        postType: media ? postType : "text",
        scheduledAt,
        mediaId: media?._id,
      });

      if (mode === "schedule") {
        toast.success("Bulk post scheduled!");
      } else {
        toast.success(`Bulk post published to trending pages ${from}–${to}!`);
      }

      router.push("/dashboard/get-posts");
    } catch (error) {
      const message = error instanceof ApiRequestError ? error.message : "Could not publish bulk post.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Bulk Post</h2>
        <p className="text-sm text-muted-foreground">
          Post to all trending-dataset pages in your selected page number range — not just your own connected pages.
          Normal manage-account pages are never included.
        </p>
      </div>

      {loadingMeta ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" /> Loading trending dataset...
        </div>
      ) : maxPage === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-8 text-center">
          <p className="text-sm text-muted-foreground">
            No trending pages in the dataset yet. Connect Facebook with the trending option first.
          </p>
          <Button asChild className="mt-4" variant="outline">
            <Link href="/dashboard/connect-channels">Connect Channels</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
            <div>
              <Label htmlFor="secret-key">Create secret key</Label>
              <Input
                id="secret-key"
                className="mt-2"
                placeholder="e.g. my-campaign-2026"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Use this key on Get Post Links to fetch all published post URLs.
              </p>
            </div>

            <div>
              <Label>Page category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-2 w-full">
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL_CATEGORIES}>All categories</SelectItem>
                  {categories.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="mt-1 text-xs text-muted-foreground">
                Filter trending pages by Facebook page category, or choose all.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="from-page">Select page number from</Label>
                <Input
                  id="from-page"
                  type="number"
                  min={1}
                  max={maxPage}
                  className="mt-2"
                  value={fromPage}
                  onChange={(e) => setFromPage(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="to-page">Select page number to</Label>
                <Input
                  id="to-page"
                  type="number"
                  min={1}
                  max={maxPage}
                  className="mt-2"
                  value={toPage}
                  onChange={(e) => setToPage(e.target.value)}
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Trending dataset: {totalPages} total pages · numbers 1 to {maxPage}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
            <div>
              <Label htmlFor="content">Post content</Label>
              <Textarea
                id="content"
                rows={5}
                className="mt-2"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post..."
                maxLength={2200}
              />
            </div>

            <input ref={fileInputRef} type="file" accept="image/*,video/*" className="hidden" onChange={handleFileChange} />

            {media && (
              <div className="relative inline-block">
                {media.fileType === "image" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={media.url} alt={media.fileName} className="size-24 rounded-lg object-cover" />
                ) : (
                  <video src={media.url} className="size-24 rounded-lg object-cover" />
                )}
                <button
                  type="button"
                  onClick={() => setMedia(null)}
                  className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground"
                >
                  <X className="size-3" />
                </button>
              </div>
            )}

            <Button type="button" variant="outline" size="sm" disabled={uploading} onClick={() => fileInputRef.current?.click()}>
              {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
              {uploading ? "Uploading..." : "Add photo/video"}
            </Button>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
            <Label>Schedule for later (optional)</Label>
            <div className="grid grid-cols-2 gap-3">
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <Button onClick={() => handleSubmit("schedule")} disabled={submitting} className="flex-1">
                {submitting ? <Loader2 className="size-4 animate-spin" /> : <CalendarClock className="size-4" />}
                Schedule Post
              </Button>
              <Button variant="outline" onClick={() => handleSubmit("now")} disabled={submitting} className="flex-1">
                Publish Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
