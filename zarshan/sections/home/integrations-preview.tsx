import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { FadeInStagger, FadeInItem } from "@/components/motion/fade-in";
import { Icon } from "@/components/icon";
import { integrations } from "@/data/integrations";

export function IntegrationsPreview() {
  return (
    <section className="py-20 sm:py-24">
      <Container className="flex flex-col items-center">
        <SectionHeading
          eyebrow="Connect your stack"
          title="Works with the tools you already use"
          description="Native integrations with every major social network, plus Canva, Drive, and Slack."
        />

        <FadeInStagger className="mt-12 grid w-full grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-5">
          {integrations.slice(0, 10).map((integration) => (
            <FadeInItem key={integration.id}>
              <div className="flex flex-col items-center gap-2.5 rounded-2xl border border-border bg-card p-5 text-center transition-all hover:-translate-y-1 hover:shadow-md">
                <span
                  className="flex size-11 items-center justify-center rounded-xl text-white"
                  style={{ backgroundColor: integration.color }}
                >
                  <Icon name={integration.icon} className="size-5" />
                </span>
                <span className="text-xs font-medium text-foreground">{integration.name}</span>
              </div>
            </FadeInItem>
          ))}
        </FadeInStagger>

        <Button variant="outline" className="mt-10" asChild>
          <Link href="/integrations">
            View all integrations <ArrowRight className="ml-1 size-4" />
          </Link>
        </Button>
      </Container>
    </section>
  );
}
