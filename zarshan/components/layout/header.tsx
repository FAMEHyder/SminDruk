"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";

import { Logo } from "@/components/logo";
import { Icon } from "@/components/icon";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { mainNav } from "@/data/nav";
import { NAV_CTA } from "@/constants/site";

export function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-transparent transition-all",
        scrolled
          ? "border-border/60 bg-background/80 backdrop-blur-lg supports-backdrop-filter:bg-background/60"
          : "bg-background/40"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setOpenMenu(null)}>
          {mainNav.map((item) => (
            <div key={item.label} className="relative" onMouseEnter={() => setOpenMenu(item.label)}>
              {item.href ? (
                <Link
                  href={item.href}
                  className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                  aria-expanded={openMenu === item.label}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "size-3.5 transition-transform",
                      openMenu === item.label && "rotate-180"
                    )}
                  />
                </button>
              )}

              <AnimatePresence>
                {item.columns && openMenu === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className={cn(
                      "absolute top-full left-1/2 z-50 mt-2 -translate-x-1/2 rounded-2xl border border-border bg-popover p-2 shadow-xl",
                      item.columns.length > 1 ? "w-[560px]" : "w-72"
                    )}
                  >
                    <div className={cn("grid gap-1", item.columns.length > 1 && "grid-cols-2 gap-4")}>
                      {item.columns.map((col) => (
                        <div key={col.heading} className="space-y-1 p-2">
                          <p className="px-2 pb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                            {col.heading}
                          </p>
                          {col.links.map((link) => (
                            <Link
                              key={link.label}
                              href={link.href}
                              className="group flex items-start gap-3 rounded-xl p-2 transition-colors hover:bg-accent"
                            >
                              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                <Icon name={link.icon ?? "Circle"} className="size-4.5" />
                              </span>
                              <span>
                                <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                                  {link.label}
                                  {link.badge && (
                                    <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                                      {link.badge}
                                    </span>
                                  )}
                                </span>
                                {link.description && (
                                  <span className="text-xs text-muted-foreground">{link.description}</span>
                                )}
                              </span>
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <Button variant="ghost" asChild>
            <Link href={NAV_CTA.login}>Log in</Link>
          </Button>
          <Button asChild>
            <Link href={NAV_CTA.signup}>Start Free Trial</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border bg-background lg:hidden"
          >
            <div className="max-h-[80vh] overflow-y-auto px-4 py-4 sm:px-6">
              <MobileNavAccordion />
              <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
                <Button variant="outline" asChild>
                  <Link href={NAV_CTA.login}>Log in</Link>
                </Button>
                <Button asChild>
                  <Link href={NAV_CTA.signup}>Start Free Trial</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileNavAccordion() {
  const [open, setOpen] = React.useState<string | null>(null);

  return (
    <div className="flex flex-col gap-1">
      {mainNav.map((item) => {
        if (!item.columns) {
          return (
            <Link
              key={item.label}
              href={item.href ?? "#"}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent"
            >
              {item.label}
            </Link>
          );
        }

        const isOpen = open === item.label;
        return (
          <div key={item.label}>
            <button
              className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent"
              onClick={() => setOpen(isOpen ? null : item.label)}
            >
              {item.label}
              <ChevronDown className={cn("size-4 transition-transform", isOpen && "rotate-180")} />
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden pl-3"
                >
                  {item.columns.map((col) => (
                    <div key={col.heading} className="py-1.5">
                      <p className="px-3 py-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                        {col.heading}
                      </p>
                      {col.links.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground/90 hover:bg-accent"
                        >
                          <Icon name={link.icon ?? "Circle"} className="size-4 text-muted-foreground" />
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
