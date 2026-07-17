import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/brand-icons";
import { Logo } from "@/components/logo";
import { footerNav } from "@/data/nav";
import { SITE } from "@/constants/site";

const socialIcons = [
  { icon: FacebookIcon, href: SITE.social.facebook, label: "Facebook" },
  { icon: InstagramIcon, href: SITE.social.instagram, label: "Instagram" },
  { icon: XIcon, href: SITE.social.x, label: "X" },
  { icon: LinkedinIcon, href: SITE.social.linkedin, label: "LinkedIn" },
  { icon: YoutubeIcon, href: SITE.social.youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">{SITE.description}</p>
            <div className="mt-5 flex items-center gap-2">
              {socialIcons.map((s) => (
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

          {footerNav.map((col) => (
            <div key={col.heading}>
              <p className="text-sm font-semibold text-foreground">{col.heading}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">Made with care for creators everywhere.</p>
        </div>
      </div>
    </footer>
  );
}
