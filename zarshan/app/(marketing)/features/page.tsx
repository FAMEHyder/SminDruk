import { Metadata } from "next";
import { PageHero } from "@/sections/features/page-hero";
import { FeatureDetail } from "@/sections/features/feature-detail";
import { CtaSection } from "@/sections/shared/cta-section";
import { features } from "@/data/features";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore Zarshan's full feature set — content scheduling, analytics, team collaboration, AI assistant, social inbox, automation, media library, and integrations.",
};

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title="Everything you need to manage social media, in one place"
        description="From planning to publishing to reporting, Zarshan brings your entire social workflow together."
      />
      {features.map((feature, index) => (
        <FeatureDetail key={feature.slug} feature={feature} index={index} />
      ))}
      <CtaSection />
    </>
  );
}
