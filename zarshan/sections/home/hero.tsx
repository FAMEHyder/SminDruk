"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const avatars = [
  "https://i.pravatar.cc/80?img=47",
  "https://i.pravatar.cc/80?img=12",
  "https://i.pravatar.cc/80?img=32",
  "https://i.pravatar.cc/80?img=51",
];

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-10%] left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="bg-grid-pattern absolute inset-0 opacity-[0.03]" />
      </div>

      <Container className="flex flex-col items-center pt-20 pb-16 text-center sm:pt-28 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-4 py-1.5 text-sm text-muted-foreground"
        >
          <Star className="size-3.5 fill-primary text-primary" />
          Rated 4.9/5 by 28,000+ teams
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl"
        >
          Manage every social platform
          <span className="block bg-gradient-to-r from-primary via-fuchsia-500 to-primary bg-clip-text text-transparent">
            from one beautiful dashboard
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 max-w-2xl text-lg text-muted-foreground"
        >
          Zarshan helps creators, businesses, and agencies plan, create, schedule, and analyze
          content across every platform — powered by AI, built for teams.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button size="lg" asChild className="h-12 px-7 text-base">
            <Link href="/register">
              Start Free Trial <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="h-12 px-7 text-base">
            <Link href="#demo">
              <PlayCircle className="mr-1 size-4" /> Watch Demo
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 flex items-center gap-3"
        >
          <div className="flex -space-x-2">
            {avatars.map((src) => (
              <Avatar key={src} className="size-8 border-2 border-background">
                <AvatarImage src={src} />
                <AvatarFallback>Z</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Join <span className="font-semibold text-foreground">28,000+</span> teams already growing with Zarshan
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 w-full max-w-5xl"
        >
          <div className="relative rounded-2xl border border-border bg-card/60 p-2 shadow-2xl backdrop-blur">
            <div className="flex items-center gap-1.5 border-b border-border px-3 py-2.5">
              <span className="size-2.5 rounded-full bg-red-400" />
              <span className="size-2.5 rounded-full bg-yellow-400" />
              <span className="size-2.5 rounded-full bg-green-400" />
            </div>
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop"
              alt="Zarshan dashboard preview"
              className="aspect-video w-full rounded-b-xl object-cover"
            />
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
