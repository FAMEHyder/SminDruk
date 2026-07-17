import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help Center",
  description: "Documentation, guides, and tutorials to help you get the most out of Zarshan.",
};

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
