import { AtSign } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
  TiktokIcon,
  PinterestIcon,
  YoutubeIcon,
  ThreadsIcon,
  BlueskyIcon,
  MastodonIcon,
  GoogleBusinessIcon,
} from "@/components/brand-icons";
import { Platform } from "@/types";
import { cn } from "@/lib/utils";

const platformMap: Record<Platform, { icon: React.ComponentType<{ className?: string }>; color: string }> = {
  facebook: { icon: FacebookIcon, color: "#1877F2" },
  instagram: { icon: InstagramIcon, color: "#E4405F" },
  linkedin: { icon: LinkedinIcon, color: "#0A66C2" },
  x: { icon: XIcon, color: "#0f172a" },
  tiktok: { icon: TiktokIcon, color: "#000000" },
  pinterest: { icon: PinterestIcon, color: "#E60023" },
  youtube: { icon: YoutubeIcon, color: "#FF0000" },
  threads: { icon: ThreadsIcon, color: "#000000" },
  bluesky: { icon: BlueskyIcon, color: "#1185FE" },
  mastodon: { icon: MastodonIcon, color: "#6364FF" },
  google_business: { icon: GoogleBusinessIcon, color: "#4285F4" },
};

export function PlatformIcon({ platform, className }: { platform: Platform; className?: string }) {
  const entry = platformMap[platform];
  const IconCmp = entry?.icon ?? AtSign;
  return (
    <span
      className={cn("flex size-7 items-center justify-center rounded-full text-white", className)}
      style={{ backgroundColor: entry?.color ?? "#666" }}
    >
      <IconCmp className="size-3.5" />
    </span>
  );
}
