"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlatformIcon } from "@/components/platform-icon";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { postApi } from "@/lib/services";
import type { ApiPost } from "@/types/api";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarPage() {
  const { workspace } = useAuth();
  const today = new Date();
  const [monthOffset, setMonthOffset] = React.useState(0);
  const [posts, setPosts] = React.useState<ApiPost[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!workspace) return;
    setLoading(true);
    postApi
      .list({ workspaceId: workspace._id, limit: 200 })
      .then((all) =>
        setPosts(all.filter((p) => ["scheduled", "published", "failed", "publishing"].includes(p.status)))
      )
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [workspace]);

  const viewDate = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();

  const cells = [
    ...Array.from({ length: startDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const eventsByDay = React.useMemo(() => {
    const map = new Map<number, ApiPost[]>();
    for (const post of posts) {
      const at = post.scheduledAt || post.publishedAt;
      if (!at) continue;
      const d = new Date(at);
      if (d.getFullYear() !== year || d.getMonth() !== month) continue;
      const list = map.get(d.getDate()) ?? [];
      list.push(post);
      map.set(d.getDate(), list);
    }
    return map;
  }, [posts, year, month]);

  const monthLabel = viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const isCurrentMonth = monthOffset === 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Content Calendar</h2>
          <p className="text-sm text-muted-foreground">Plan and visualize your posting schedule.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/create-post">
            <Plus className="size-4" /> New Post
          </Link>
        </Button>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            {monthLabel}
            {loading && <Loader2 className="size-4 animate-spin text-muted-foreground" />}
          </h3>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="size-8" onClick={() => setMonthOffset((v) => v - 1)}>
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8"
              onClick={() => setMonthOffset(0)}
              disabled={isCurrentMonth}
            >
              Today
            </Button>
            <Button variant="outline" size="icon" className="size-8" onClick={() => setMonthOffset((v) => v + 1)}>
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px overflow-hidden rounded-xl border border-border bg-border text-center">
          {weekdays.map((d) => (
            <div key={d} className="bg-muted/50 py-2 text-xs font-medium text-muted-foreground">
              {d}
            </div>
          ))}
          {cells.map((day, i) => {
            const dayEvents = day ? eventsByDay.get(day) ?? [] : [];
            const isToday = isCurrentMonth && day === today.getDate();
            return (
              <div
                key={i}
                className={cn(
                  "min-h-24 bg-card p-1.5 text-left sm:min-h-28",
                  !day && "bg-muted/20"
                )}
              >
                {day && (
                  <>
                    <span
                      className={cn(
                        "flex size-6 items-center justify-center rounded-full text-xs",
                        isToday && "bg-primary font-semibold text-primary-foreground"
                      )}
                    >
                      {day}
                    </span>
                    <div className="mt-1 space-y-1">
                      {dayEvents.slice(0, 2).map((post) => (
                        <div
                          key={post._id}
                          className={cn(
                            "flex items-center gap-1 truncate rounded-md px-1.5 py-1 text-[10px] sm:text-xs",
                            post.status === "failed"
                              ? "bg-destructive/15 text-destructive"
                              : post.status === "scheduled"
                                ? "bg-muted"
                                : post.status === "publishing"
                                  ? "bg-primary/10 text-primary"
                                  : "bg-emerald-500/10 text-emerald-600"
                          )}
                        >
                          <PlatformIcon platform={post.platforms[0] ?? "instagram"} className="size-3.5 shrink-0 text-[8px]" />
                          <span className="truncate">
                            {post.status === "failed" ? "Failed: " : post.status === "scheduled" ? "Scheduled: " : ""}
                            {post.content || "(No caption)"}
                          </span>
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <p className="px-1 text-[10px] text-muted-foreground">+{dayEvents.length - 2} more</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
