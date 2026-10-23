import { FaqSection } from "@/components/sections/FaqSection";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { ServiceAreaSection } from "@/components/sections/ServiceAreaSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { UrgentCallout } from "@/components/sections/UrgentCallout";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { business } from "@/config/business";
import { generalFaqs } from "@/content/faqs";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: `${business.name} | Plumbing repairs, installations & maintenance`,
    description: business.description,
    path: "/",
  }),
  // The home title stands alone rather than repeating the brand via the template.
  title: { absolute: `${business.name} | Plumbing repairs, installations & maintenance` },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesGrid services={services} />
      <WhyChooseUs />
      <Process />
      <FeaturedWork />
      <UrgentCallout />
      <ReviewsSection />
      <ServiceAreaSection />
      <FaqSection faqs={generalFaqs()} />
      <FinalCta />
    </>
  );
}
