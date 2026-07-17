import { icons, LucideProps, HelpCircle } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
  TiktokIcon,
  PinterestIcon,
  YoutubeIcon,
  SlackIcon,
  ThreadsIcon,
} from "@/components/brand-icons";

interface IconProps extends LucideProps {
  name: string;
}

const brandIcons: Record<string, React.ComponentType<LucideProps>> = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  Linkedin: LinkedinIcon,
  Twitter: XIcon,
  Music2: TiktokIcon,
  Pinterest: PinterestIcon,
  Youtube: YoutubeIcon,
  Slack: SlackIcon,
  Threads: ThreadsIcon,
};

export function Icon({ name, ...props }: IconProps) {
  const BrandIcon = brandIcons[name];
  if (BrandIcon) return <BrandIcon {...props} />;

  const LucideIcon = (icons as Record<string, React.ComponentType<LucideProps>>)[name];
  if (!LucideIcon) return <HelpCircle {...props} />;
  return <LucideIcon {...props} />;
}
