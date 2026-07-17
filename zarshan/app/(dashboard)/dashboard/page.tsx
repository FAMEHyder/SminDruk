"use client";

import * as React from "react";
import Link from "next/link";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { ArrowRight, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/stat-card";
import { PostRow } from "@/components/dashboard/post-row";
import { PlatformIcon } from "@/components/platform-icon";
import { EmptyState } from "@/components/ui/state-blocks";
import { engagementData, platformBreakdown } from "@/data/dashboard";
import { useAuth } from "@/lib/auth-context";
import { postApi } from "@/lib/services";
import type { ApiPost, ApiPostStats } from "@/types/api";
import type { SocialPost } from "@/types";

function toSocialPost(post: ApiPost): SocialPost {
  const media = Array.isArray(post.media) ? post.media : [];
  const firstMedia = typeof media[0] === "object" ? media[0] : undefined;

  return {
    id: post._id,
    platform: post.platforms[0] ?? "instagram",
    content: post.content || "(No caption)",
    status: post.status === "publishing" ? "scheduled" : (post.status as SocialPost["status"]),
    scheduledAt: post.scheduledAt,
    publishedAt: post.publishedAt,
    image: firstMedia?.url,
  };
}

const emptyStats: ApiPostStats = {
  total: 0,
  published: 0,
  scheduled: 0,
  drafts: 0,
  failed: 0,
  liveLinks: 0,
};

export default function DashboardOverviewPage() {
  const { user, workspace } = useAuth();
  const [posts, setPosts] = React.useState<ApiPost[]>([]);
  const [stats, setStats] = React.useState<ApiPostStats>(emptyStats);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!workspace) return;
    setLoading(true);
    Promise.all([
      postApi.stats(workspace._id),
      postApi.list({ workspaceId: workspace._id, limit: 50 }),
    ])
      .then(([statsData, postsData]) => {
        setStats(statsData);
        setPosts(postsData);
      })
      .catch(() => {
        setStats(emptyStats);
        setPosts([]);
      })
      .finally(() => setLoading(false));
  }, [workspace]);

  const statCards = [
    { label: "Total Posts", value: String(stats.total), icon: "FileText" },
    { label: "Published", value: String(stats.published), icon: "CircleCheckBig" },
    { label: "Scheduled", value: String(stats.scheduled), icon: "CalendarClock" },
    { label: "Drafts / Failed", value: `${stats.drafts} / ${stats.failed}`, icon: "FileClock", trend: "down" as const },
    {
      label: "Live on Facebook",
      value: String(stats.liveLinks),
      icon: "ExternalLink",
      href: "/dashboard/published-links",
    },
  ];

  const recentPosts = React.useMemo(
    () =>
      [...posts]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)
        .map(toSocialPost),
    [posts]
  );

  const upcomingPosts = React.useMemo(
    () =>
      posts
        .filter((p) => p.status === "scheduled" && p.scheduledAt)
        .sort((a, b) => new Date(a.scheduledAt!).getTime() - new Date(b.scheduledAt!).getTime())
        .slice(0, 5)
        .map((p) => ({
          id: p._id,
          title: p.content || "(No caption)",
          platform: p.platforms[0] ?? "instagram",
          date: new Date(p.scheduledAt!).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          time: new Date(p.scheduledAt!).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
        })),
    [posts]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Welcome back, {user?.firstName ?? "there"} 👋</h2>
          <p className="text-sm text-muted-foreground">
            {workspace ? `Here's what's happening in ${workspace.name}.` : "Setting up your workspace..."}
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/create-post">
            <Plus className="size-4" /> Create Post
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {statCards.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Engagement Overview</h3>
            <Link href="/dashboard/analytics" className="flex items-center gap-1 text-sm text-primary">
              View report <ArrowRight className="size-3.5" />
            </Link>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Illustrative until your connected accounts start publishing and reporting live engagement.
          </p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={engagementData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="engFill2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid var(--color-border)",
                    backgroundColor: "var(--color-popover)",
                    fontSize: 12,
                  }}
                />
                <Area type="monotone" dataKey="engagement" stroke="var(--color-primary)" strokeWidth={2} fill="url(#engFill2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-semibold">Platform Breakdown</h3>
          <div className="mt-4 space-y-3">
            {platformBreakdown.map((p) => (
              <div key={p.platform}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{p.platform}</span>
                  <span className="font-medium">{p.value}%</span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${p.value}%`, backgroundColor: p.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Recent Posts</h3>
            <Link href="/dashboard/calendar" className="flex items-center gap-1 text-sm text-primary">
              View all <ArrowRight className="size-3.5" />
            </Link>
          </div>
          <div className="mt-2">
            {loading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="size-5 animate-spin text-muted-foreground" />
              </div>
            ) : recentPosts.length > 0 ? (
              recentPosts.map((post) => <PostRow key={post.id} post={post} />)
            ) : (
              <EmptyState title="No posts yet" description="Create your first post to see it here." />
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-semibold">Upcoming</h3>
          <div className="mt-3 space-y-3">
            {upcomingPosts.length > 0 ? (
              upcomingPosts.map((post) => (
                <div key={post.id} className="flex items-center gap-3 rounded-xl border border-border p-3">
                  <PlatformIcon platform={post.platform} className="size-8" />
                  <div className="flex-1">
                    <p className="truncate text-sm font-medium">{post.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {post.date} · {post.time}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="py-6 text-center text-sm text-muted-foreground">Nothing scheduled yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
