import Link from "next/link";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down";
  icon: string;
  href?: string;
}

export function StatCard({ label, value, change = "", trend = "up", icon, href }: StatCardProps) {
  const content = (
    <>
      <div className="flex items-center justify-between">
        <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon name={icon} className="size-5" />
        </span>
        {change ? (
          <span
            className={cn(
              "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
              trend === "up" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
            )}
          >
            {trend === "up" ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
            {change}
          </span>
        ) : null}
      </div>
      <p className="mt-4 text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent/30"
      >
        {content}
      </Link>
    );
  }

  return <div className="rounded-2xl border border-border bg-card p-5">{content}</div>;
}
