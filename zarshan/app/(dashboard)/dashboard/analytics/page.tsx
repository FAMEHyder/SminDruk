"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatCard } from "@/components/dashboard/stat-card";
import { engagementData, platformBreakdown } from "@/data/dashboard";
import { PlatformIcon } from "@/components/platform-icon";
import { EmptyState } from "@/components/ui/state-blocks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/lib/auth-context";
import { analyticsApi, postApi } from "@/lib/services";
import type { ApiAnalyticsTotals, ApiPost } from "@/types/api";

export default function AnalyticsPage() {
  const { workspace } = useAuth();
  const [range, setRange] = React.useState<"daily" | "weekly" | "monthly">("daily");
  const [totals, setTotals] = React.useState<ApiAnalyticsTotals | null>(null);
  const [posts, setPosts] = React.useState<ApiPost[]>([]);

  React.useEffect(() => {
    if (!workspace) return;
    analyticsApi
      .report({ workspaceId: workspace._id, period: range })
      .then((res) => setTotals(res.totals))
      .catch(() => setTotals(null));
    postApi
      .list({ workspaceId: workspace._id, status: "published", limit: 20 })
      .then(setPosts)
      .catch(() => setPosts([]));
  }, [workspace, range]);

  const stats = React.useMemo(
    () => [
      { label: "Total Reach", value: (totals?.reach ?? 0).toLocaleString(), change: "", trend: "up" as const, icon: "Eye" },
      { label: "Total Engagement", value: (((totals?.likes ?? 0) + (totals?.comments ?? 0) + (totals?.shares ?? 0))).toLocaleString(), change: "", trend: "up" as const, icon: "Heart" },
      { label: "Impressions", value: (totals?.impressions ?? 0).toLocaleString(), change: "", trend: "up" as const, icon: "TrendingUp" },
      { label: "Published Posts", value: String(posts.length), change: "", trend: "up" as const, icon: "Send" },
    ],
    [totals, posts.length]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Analytics</h2>
          <p className="text-sm text-muted-foreground">Track your performance across every platform.</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={range} onValueChange={(v) => setRange(v as typeof range)}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="size-4" /> Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 lg:col-span-2">
          <h3 className="font-semibold">Reach & Engagement</h3>
          <p className="text-xs text-muted-foreground">
            Illustrative trend — will reflect real numbers once <code>/api/v1/analytics</code> is populated by a
            platform-insights sync job.
          </p>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={engagementData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="reachA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="engA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid var(--color-border)",
                    backgroundColor: "var(--color-popover)",
                    fontSize: 12,
                  }}
                />
                <Area type="monotone" dataKey="reach" stroke="#a855f7" strokeWidth={2} fill="url(#reachA)" />
                <Area type="monotone" dataKey="engagement" stroke="var(--color-primary)" strokeWidth={2} fill="url(#engA)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-semibold">Audience by Platform</h3>
          <div className="mt-2 flex h-56 items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={platformBreakdown}
                  dataKey="value"
                  nameKey="platform"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={2}
                >
                  {platformBreakdown.map((entry) => (
                    <Cell key={entry.platform} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid var(--color-border)",
                    backgroundColor: "var(--color-popover)",
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            {platformBreakdown.map((p) => (
              <div key={p.platform} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="size-2 rounded-full" style={{ backgroundColor: p.color }} />
                {p.platform}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="font-semibold">Weekly Engagement by Day</h3>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={engagementData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid var(--color-border)",
                  backgroundColor: "var(--color-popover)",
                  fontSize: 12,
                }}
              />
              <Bar dataKey="engagement" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="font-semibold">Published Posts</h3>
        {posts.length > 0 ? (
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Post</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Published</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post._id}>
                  <TableCell className="max-w-xs truncate">{post.content || "(No caption)"}</TableCell>
                  <TableCell>
                    <PlatformIcon platform={post.platforms[0] ?? "instagram"} className="size-6" />
                  </TableCell>
                  <TableCell>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <EmptyState title="No published posts yet" description="Publish a post to see it appear here." />
        )}
      </div>
    </div>
  );
}
