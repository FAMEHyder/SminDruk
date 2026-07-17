"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import {
  CalendarClock,
  Check,
  Image as ImageIcon,
  Loader2,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { PlatformIcon } from "@/components/platform-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Platform } from "@/types";
import { useAuth } from "@/lib/auth-context";
import { aiApi, mediaApi, postApi, socialAccountApi } from "@/lib/services";
import { ApiRequestError } from "@/lib/api";
import type { ApiMedia, ApiSocialAccount } from "@/types/api";

type ChannelFilter = "all" | Platform;

const channelOptions: { id: ChannelFilter; label: string; live: boolean }[] = [
  { id: "all", label: "All Channels", live: true },
  { id: "facebook", label: "Facebook", live: true },
  { id: "instagram", label: "Instagram", live: false },
  { id: "x", label: "X", live: false },
];

export default function CreatePostPage() {
  const router = useRouter();
  const { workspace, user } = useAuth();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [channelFilter, setChannelFilter] = React.useState<ChannelFilter>("facebook");
  const [accounts, setAccounts] = React.useState<ApiSocialAccount[]>([]);
  const [loadingAccounts, setLoadingAccounts] = React.useState(false);
  const [selectedPageIds, setSelectedPageIds] = React.useState<string[]>([]);
  const [content, setContent] = React.useState("");
  const [generating, setGenerating] = React.useState(false);
  const [scheduling, setScheduling] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [media, setMedia] = React.useState<ApiMedia[]>([]);
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");

  const facebookPages = React.useMemo(
    () => accounts.filter((account) => account.platform === "facebook" && account.status === "connected"),
    [accounts]
  );

  const showFacebookPages =
    channelFilter === "all" || channelFilter === "facebook";

  React.useEffect(() => {
    if (!workspace) return;
    setLoadingAccounts(true);
    socialAccountApi
      .list(workspace._id)
      .then((data) => setAccounts(data))
      .catch(() => setAccounts([]))
      .finally(() => setLoadingAccounts(false));
  }, [workspace]);

  React.useEffect(() => {
    setSelectedPageIds((prev) => prev.filter((id) => facebookPages.some((page) => page._id === id)));
  }, [facebookPages]);

  const allPagesSelected =
    facebookPages.length > 0 && selectedPageIds.length === facebookPages.length;

  function getSelectedPlatforms(): Platform[] {
    if (channelFilter === "all") return ["facebook"];
    return [channelFilter];
  }

  function togglePage(id: string) {
    setSelectedPageIds((prev) =>
      prev.includes(id) ? prev.filter((pageId) => pageId !== id) : [...prev, id]
    );
  }

  function toggleAllPages() {
    if (allPagesSelected) {
      setSelectedPageIds([]);
    } else {
      setSelectedPageIds(facebookPages.map((page) => page._id));
    }
  }

  async function handleAiGenerate() {
    setGenerating(true);
    try {
      const result = await aiApi.caption({
        prompt: content || "Write an engaging social media post for our brand.",
        platform: channelFilter === "all" ? "Facebook" : channelFilter,
      });
      setContent(result.caption);
      toast.success("AI caption generated!");
    } catch (error) {
      const message = error instanceof ApiRequestError ? error.message : "Could not generate a caption right now.";
      toast.error(message);
    } finally {
      setGenerating(false);
    }
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !workspace) return;
    setUploading(true);
    try {
      const uploaded = await mediaApi.upload(workspace._id, file);
      setMedia((prev) => [...prev, uploaded]);
      toast.success("Media uploaded!");
    } catch (error) {
      const message = error instanceof ApiRequestError ? error.message : "Upload failed.";
      toast.error(message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function removeMedia(id: string) {
    setMedia((prev) => prev.filter((m) => m._id !== id));
  }

  function validateBeforeSubmit(mode: "now" | "schedule" | "draft") {
    if (!workspace) {
      toast.error("No workspace found yet. Please wait a moment and try again.");
      return false;
    }
    if (mode !== "draft" && content.trim() === "") {
      toast.error("Write your post content first.");
      return false;
    }
    if (mode !== "draft") {
      const platforms = getSelectedPlatforms();
      if (platforms.includes("facebook") && selectedPageIds.length === 0) {
        toast.error("Select at least one Facebook page to publish.");
        return false;
      }
      if (channelFilter !== "all" && channelFilter !== "facebook") {
        toast.info("Only Facebook publishing is live right now.");
        return false;
      }
    }
    if (mode === "schedule" && (!date || !time)) {
      toast.error("Pick a date and time to schedule this post.");
      return false;
    }
    return true;
  }

  async function handleSchedule(mode: "now" | "schedule" | "draft") {
    if (!validateBeforeSubmit(mode)) return;

    const platforms = getSelectedPlatforms();
    let scheduledAt: string | undefined;
    if (mode === "schedule") {
      const [year, month, day] = date.split("-").map(Number);
      const [hours, minutes] = time.split(":").map(Number);
      scheduledAt = new Date(year, month - 1, day, hours, minutes).toISOString();
    }

    setScheduling(true);
    try {
      const post = await postApi.create({
        workspaceId: workspace!._id,
        type: media.length > 0 ? (media[0].fileType === "video" ? "video" : "image") : "text",
        content,
        platforms,
        mediaIds: media.map((m) => m._id),
        socialAccountIds: platforms.includes("facebook") ? selectedPageIds : undefined,
        scheduledAt,
        status: mode === "draft" ? "draft" : mode === "schedule" ? "scheduled" : "draft",
      });

      if (mode === "now") {
        await postApi.publishNow(post._id);
        toast.success(
          selectedPageIds.length > 1
            ? `Post published to ${selectedPageIds.length} Facebook pages!`
            : "Post published to Facebook!"
        );
      } else if (mode === "schedule") {
        toast.success("Post scheduled successfully!");
      } else {
        toast.info("Saved as draft.");
      }

      setContent("");
      setMedia([]);
      setDate("");
      setTime("");
      setSelectedPageIds([]);
      router.push("/dashboard/calendar");
    } catch (error) {
      const message = error instanceof ApiRequestError ? error.message : "Could not save this post.";
      toast.error(message);
    } finally {
      setScheduling(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Create Post</h2>
        <p className="text-sm text-muted-foreground">
          Choose your channels, select Facebook pages, and publish now or schedule for later.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-border bg-card p-5">
            <Label>Select channel</Label>
            <div className="mt-3 flex flex-wrap gap-2">
              {channelOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    if (!option.live && option.id !== "all") {
                      toast.info(`${option.label} is coming soon.`);
                      return;
                    }
                    setChannelFilter(option.id);
                  }}
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors",
                    channelFilter === option.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:bg-accent"
                  )}
                >
                  {option.id !== "all" && <PlatformIcon platform={option.id} className="size-4 text-[10px]" />}
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {showFacebookPages && (
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <Label>Facebook pages</Label>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Select one page, multiple pages, or all pages to publish this post.
                  </p>
                </div>
                {facebookPages.length > 0 && (
                  <Button variant="outline" size="sm" onClick={toggleAllPages}>
                    {allPagesSelected ? "Deselect all" : "Select all"}
                  </Button>
                )}
              </div>

              {loadingAccounts ? (
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" /> Loading connected pages...
                </div>
              ) : facebookPages.length === 0 ? (
                <div className="mt-4 rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">
                  No Facebook pages connected yet.{" "}
                  <Link href="/dashboard/connect-channels" className="text-primary underline">
                    Connect Facebook
                  </Link>
                </div>
              ) : (
                <div className="mt-4 space-y-2">
                  {facebookPages.map((page) => {
                    const checked = selectedPageIds.includes(page._id);
                    return (
                      <label
                        key={page._id}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-colors",
                          checked ? "border-primary bg-primary/5" : "border-border"
                        )}
                      >
                        <Checkbox checked={checked} onCheckedChange={() => togglePage(page._id)} />
                        <Avatar className="size-9">
                          <AvatarImage src={page.avatar} />
                          <AvatarFallback>{page.accountName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{page.accountName}</p>
                          {page.category && (
                            <p className="text-xs text-muted-foreground">{page.category}</p>
                          )}
                        </div>
                        {checked && <Check className="size-4 text-primary" />}
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <Label htmlFor="content">Post content</Label>
              <Button size="sm" variant="outline" onClick={handleAiGenerate} disabled={generating}>
                {generating ? <Loader2 className="size-3.5 animate-spin" /> : <Sparkles className="size-3.5" />}
                {generating ? "Generating..." : "AI Assist"}
              </Button>
            </div>
            <Textarea
              id="content"
              rows={6}
              className="mt-3"
              placeholder="What would you like to share today?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={2200}
            />
            <p className="mt-2 text-right text-xs text-muted-foreground">{content.length} / 2200 characters</p>

            <input ref={fileInputRef} type="file" accept="image/*,video/*" className="hidden" onChange={handleFileChange} />

            {media.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {media.map((m) => (
                  <div key={m._id} className="relative">
                    {m.fileType === "image" ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={m.url} alt={m.fileName} className="size-20 rounded-lg object-cover" />
                    ) : (
                      <video src={m.url} className="size-20 rounded-lg object-cover" />
                    )}
                    <button
                      onClick={() => removeMedia(m._id)}
                      className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 flex items-center gap-2 rounded-xl border border-dashed border-border p-6 text-center">
              <div className="flex w-full flex-col items-center gap-2 text-muted-foreground">
                <Upload className="size-6" />
                <p className="text-sm">Drag & drop images or videos, or click to upload</p>
                <Button
                  size="sm"
                  variant="outline"
                  type="button"
                  disabled={uploading}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {uploading ? <Loader2 className="size-4 animate-spin" /> : <ImageIcon className="size-4" />}
                  {uploading ? "Uploading..." : "Browse Media Library"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="font-semibold">Preview</p>
            <div className="mt-3 rounded-xl border border-border p-4">
              <div className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user?.avatar || "https://i.pravatar.cc/60?img=47"}
                  alt=""
                  className="size-8 rounded-full"
                />
                <div>
                  <p className="text-xs font-semibold">{workspace?.name ?? "Your workspace"}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {selectedPageIds.length > 0
                      ? `${selectedPageIds.length} Facebook page${selectedPageIds.length > 1 ? "s" : ""} selected`
                      : "No pages selected"}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm text-foreground/90">
                {content || "Your post preview will appear here as you type..."}
              </p>
              {media[0]?.fileType === "image" && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={media[0].url} alt="" className="mt-3 max-h-40 w-full rounded-lg object-cover" />
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <Label htmlFor="schedule-date">Schedule for later</Label>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Input id="schedule-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>

            <div className="mt-5 flex flex-col gap-2">
              <Button onClick={() => handleSchedule("schedule")} disabled={scheduling}>
                {scheduling ? <Loader2 className="size-4 animate-spin" /> : <CalendarClock className="size-4" />}
                Schedule Post
              </Button>
              <Button variant="outline" onClick={() => handleSchedule("now")} disabled={scheduling}>
                Publish Now
              </Button>
              <Button variant="ghost" onClick={() => handleSchedule("draft")} disabled={scheduling}>
                Save as Draft
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
