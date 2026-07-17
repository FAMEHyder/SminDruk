"use client";

import * as React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { FadeInStagger, FadeInItem } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import { pricingPlans } from "@/data/pricing";

export function PricingTable({ compact = false }: { compact?: boolean }) {
  const [yearly, setYearly] = React.useState(true);
  const plans = compact
    ? pricingPlans.filter((p) => ["free", "professional", "agency"].includes(p.id))
    : pricingPlans;

  return (
    <div>
      <div className="flex items-center justify-center gap-3">
        <span className={cn("text-sm font-medium", !yearly && "text-foreground", yearly && "text-muted-foreground")}>
          Monthly
        </span>
        <Switch checked={yearly} onCheckedChange={setYearly} aria-label="Toggle yearly billing" />
        <span className={cn("flex items-center gap-2 text-sm font-medium", yearly && "text-foreground", !yearly && "text-muted-foreground")}>
          Yearly
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">Save 20%</span>
        </span>
      </div>

      <FadeInStagger
        className={cn(
          "mt-10 grid grid-cols-1 gap-5",
          compact ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-5"
        )}
      >
        {plans.map((plan) => {
          const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;
          return (
            <FadeInItem key={plan.id}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border p-6",
                  plan.isPopular ? "border-primary bg-primary/5 shadow-lg" : "border-border bg-card"
                )}
              >
                {plan.isPopular && (
                  <span className="absolute top-0 right-6 -translate-y-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>

                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold tracking-tight">{formatPrice(price)}</span>
                  {price > 0 && <span className="text-sm text-muted-foreground">/mo</span>}
                </div>
                {price === -1 && <p className="mt-1 text-xs text-muted-foreground">Tailored pricing for your team</p>}

                <Button className="mt-6" variant={plan.isPopular ? "default" : "outline"} asChild>
                  <Link href={plan.id === "enterprise" ? "/contact" : "/register"}>{plan.cta}</Link>
                </Button>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-foreground/90">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInItem>
          );
        })}
      </FadeInStagger>
    </div>
  );
}
