import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions",
  description: "Zarshan solutions for creators, businesses, agencies, and enterprises.",
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
