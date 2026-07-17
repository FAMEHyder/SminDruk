import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "Connect Zarshan with Facebook, Instagram, LinkedIn, X, TikTok, Pinterest, Canva, Google Drive, and Slack.",
};

export default function IntegrationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
