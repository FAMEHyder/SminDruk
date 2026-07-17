import { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/sections/features/page-hero";
import { ContactForm } from "@/sections/contact/contact-form";
import { FaqSection } from "@/sections/shared/faq-section";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/motion/fade-in";
import { FacebookIcon, InstagramIcon, LinkedinIcon, XIcon } from "@/components/brand-icons";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Zarshan team — sales, support, or general inquiries.",
};

const socialLinks = [
  { icon: XIcon, href: SITE.social.x, label: "X" },
  { icon: InstagramIcon, href: SITE.social.instagram, label: "Instagram" },
  { icon: LinkedinIcon, href: SITE.social.linkedin, label: "LinkedIn" },
  { icon: FacebookIcon, href: SITE.social.facebook, label: "Facebook" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We'd love to hear from you"
        description="Questions about pricing, features, or partnerships? Our team typically replies within 24 hours."
      />

      <section className="pb-20 sm:pb-24">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          <FadeIn className="lg:col-span-3">
            <ContactForm />
          </FadeIn>

          <FadeIn delay={0.1} className="space-y-5 lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Mail className="size-5" />
              </span>
              <p className="mt-4 text-sm font-semibold">Email us</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Support: {SITE.supportEmail}
                <br />
                Sales: {SITE.salesEmail}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Phone className="size-5" />
              </span>
              <p className="mt-4 text-sm font-semibold">Call us</p>
              <p className="mt-1 text-sm text-muted-foreground">+1 (415) 555-0198</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MapPin className="size-5" />
              </span>
              <p className="mt-4 text-sm font-semibold">Visit us</p>
              <p className="mt-1 text-sm text-muted-foreground">{SITE.address}</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-sm font-semibold">Follow us</p>
              <div className="mt-3 flex items-center gap-2">
                {socialLinks.map((s) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <s.icon className="size-4" />
                  </Link>
                ))}
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24">
        <Container>
          <FadeIn className="overflow-hidden rounded-2xl border border-border">
            <iframe
              title="Zarshan HQ Map"
              src="https://www.google.com/maps?q=San+Francisco&output=embed"
              className="h-80 w-full"
              loading="lazy"
            />
          </FadeIn>
        </Container>
      </section>

      <FaqSection limit={4} />
    </>
  );
}
