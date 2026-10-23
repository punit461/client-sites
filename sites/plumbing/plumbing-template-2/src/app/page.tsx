import { AreaFinder } from "@/components/sections/AreaFinder";
import { EmergencyBanner } from "@/components/sections/EmergencyBanner";
import { EstimateSection } from "@/components/sections/EstimateSection";
import { FaqBlock } from "@/components/sections/FaqBlock";
import { Feedback } from "@/components/sections/Feedback";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { ServiceBento } from "@/components/sections/ServiceBento";
import { ServiceSelector } from "@/components/sections/ServiceSelector";
import { Standard } from "@/components/sections/Standard";
import { business } from "@/config/business";
import { faqs } from "@/content/faqs";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

const title = `${business.name} | Plumbing repairs, installs & maintenance`;

export const metadata = {
  ...pageMetadata({ title, description: business.description, path: "/" }),
  title: { absolute: title },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ServiceSelector services={services} />
      <ServiceBento services={services} />
      <Standard />
      <EmergencyBanner />
      <HowItWorks />
      <ProjectShowcase />
      <Feedback />
      <AreaFinder />
      <EstimateSection />
      <FaqBlock items={faqs()} />
      <FinalCta />
    </>
  );
}
