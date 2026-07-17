import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Strategy, AI, analytics, and product updates from the Zarshan team.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
