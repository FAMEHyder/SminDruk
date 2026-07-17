import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/icon";
import { FadeIn } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils";
import { AIFeature } from "@/types";

export function AiExampleCard({ feature, index }: { feature: AIFeature; index: number }) {
  return (
    <FadeIn delay={index * 0.05}>
      <div className={cn("h-full rounded-2xl border border-border bg-card p-6")}>
        <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon name={feature.icon} className="size-5" />
        </span>
        <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>

        {feature.example && (
          <div className="mt-5 space-y-2 rounded-xl bg-muted/50 p-4">
            <div className="flex items-start gap-2 text-xs">
              <span className="mt-0.5 shrink-0 rounded bg-muted px-1.5 py-0.5 font-medium text-muted-foreground">
                Input
              </span>
              <span className="text-muted-foreground">{feature.example.input}</span>
            </div>
            <div className="flex items-start gap-2 text-xs">
              <span className="mt-0.5 shrink-0 rounded bg-primary/10 px-1.5 py-0.5 font-medium text-primary">
                Output
              </span>
              <span className="text-foreground/90">{feature.example.output}</span>
            </div>
          </div>
        )}

        <button className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
          Try it now <ArrowRight className="size-3.5" />
        </button>
      </div>
    </FadeIn>
  );
}
