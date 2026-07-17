"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { TrendingUp } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { engagementData, dashboardStats } from "@/data/dashboard";

export function AnalyticsPreview() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Know what's working"
          title="Analytics that actually tell a story"
          description="Track growth, engagement, and reach across every platform in real time."
        />

        <FadeIn className="mt-12 overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
          <div className="grid grid-cols-2 gap-4 border-b border-border p-6 sm:grid-cols-4">
            {dashboardStats.map((stat) => (
              <div key={stat.label}>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="text-2xl font-semibold">{stat.value}</span>
                  <span
                    className={
                      stat.trend === "up"
                        ? "flex items-center text-xs font-medium text-emerald-500"
                        : "flex items-center text-xs font-medium text-red-500"
                    }
                  >
                    <TrendingUp className={stat.trend === "down" ? "size-3 rotate-180" : "size-3"} />
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="h-72 p-4 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={engagementData} margin={{ top: 20, right: 16, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="engagementFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="reachFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid var(--color-border)",
                    backgroundColor: "var(--color-popover)",
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="reach"
                  stroke="#a855f7"
                  strokeWidth={2}
                  fill="url(#reachFill)"
                />
                <Area
                  type="monotone"
                  dataKey="engagement"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  fill="url(#engagementFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
