import { Metadata } from "next";
import { PageHero } from "@/sections/features/page-hero";
import { CtaSection } from "@/sections/shared/cta-section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/motion/fade-in";
import { Icon } from "@/components/icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { teamMembers, companyValues, companyStats } from "@/data/team";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Zarshan's story, mission, vision, values, and the team building the future of social media management.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="We're building the future of social media management"
        description="Zarshan started with a simple idea: managing social media shouldn't feel like a full-time job."
      />

      <section className="pb-14">
        <Container>
          <FadeIn className="grid grid-cols-2 gap-6 rounded-2xl border border-border bg-card p-8 sm:grid-cols-4">
            {companyStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-semibold sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </FadeIn>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <FadeIn>
            <span className="text-sm font-semibold tracking-wide text-primary uppercase">Our Story</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Founded by creators, for creators
            </h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
              <p>
                Zarshan was founded in 2021 after our co-founders spent years personally juggling
                spreadsheets, scattered apps, and endless browser tabs just to keep their brands
                consistent across social media.
              </p>
              <p>
                What started as an internal tool for a small content team quickly grew into a
                platform used by over 28,000 creators, businesses, and agencies across 120+
                countries — all united by the belief that social media management should feel
                effortless, not exhausting.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
              alt="Zarshan team"
              className="aspect-video w-full rounded-2xl border border-border object-cover shadow-lg"
            />
          </FadeIn>
        </Container>
      </section>

      <section className="bg-muted/30 py-14 sm:py-20">
        <Container className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <FadeIn className="rounded-2xl border border-border bg-card p-8">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon name="Target" className="size-5" />
            </span>
            <h3 className="mt-5 text-xl font-semibold">Our Mission</h3>
            <p className="mt-2 text-muted-foreground">
              To give every creator, business, and agency the tools to grow their audience and
              their business, without the busywork getting in the way.
            </p>
          </FadeIn>
          <FadeIn delay={0.1} className="rounded-2xl border border-border bg-card p-8">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon name="Telescope" className="size-5" />
            </span>
            <h3 className="mt-5 text-xl font-semibold">Our Vision</h3>
            <p className="mt-2 text-muted-foreground">
              A world where anyone, anywhere, can build a thriving audience across social media —
              powered by intelligent, intuitive tools.
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading eyebrow="What we believe" title="Our values" />
          <FadeInStagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {companyValues.map((value) => (
              <FadeInItem key={value.title}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 text-center">
                  <span className="mx-auto flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon name={value.icon} className="size-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </Container>
      </section>

      <section className="bg-muted/30 py-14 sm:py-20" id="careers">
        <Container>
          <SectionHeading eyebrow="Meet the team" title="The people building Zarshan" />
          <FadeInStagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <FadeInItem key={member.id}>
                <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center">
                  <Avatar className="size-20">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <h3 className="mt-4 text-base font-semibold">{member.name}</h3>
                  <p className="text-sm text-primary">{member.role}</p>
                  {member.bio && <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>}
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
