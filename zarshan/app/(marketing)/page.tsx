import { Hero } from "@/sections/home/hero";
import { TrustedCompanies } from "@/sections/home/trusted-companies";
import { FeaturesOverview } from "@/sections/home/features-overview";
import { PlatformLogos } from "@/sections/home/platform-logos";
import { ProductDemo } from "@/sections/home/product-demo";
import { AiShowcase } from "@/sections/home/ai-showcase";
import { AnalyticsPreview } from "@/sections/home/analytics-preview";
import { IntegrationsPreview } from "@/sections/home/integrations-preview";
import { Testimonials } from "@/sections/shared/testimonials";
import { PricingPreview } from "@/sections/home/pricing-preview";
import { FaqSection } from "@/sections/shared/faq-section";
import { CtaSection } from "@/sections/shared/cta-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedCompanies />
      <FeaturesOverview />
      <ProductDemo />
      <AiShowcase />
      <AnalyticsPreview />
      <PlatformLogos />
      <IntegrationsPreview />
      <Testimonials />
      <PricingPreview />
      <FaqSection limit={6} />
      <CtaSection />
    </>
  );
}
