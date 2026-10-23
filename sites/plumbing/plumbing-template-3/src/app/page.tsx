import { Benefits } from "@/components/sections/Benefits";
import { FaqSection } from "@/components/sections/FaqSection";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { Reviews } from "@/components/sections/Reviews";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { TeamStory } from "@/components/sections/TeamStory";
import { UrgentHelp } from "@/components/sections/UrgentHelp";
import { WhyUs } from "@/components/sections/WhyUs";
import { business } from "@/config/business";
import { faqs } from "@/content/faqs";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

const title = `${business.name} | Plumbing repairs, installations & maintenance`;

export const metadata = {
  ...pageMetadata({ title, description: business.description, path: "/" }),
  title: { absolute: title },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Benefits />
      <ServicesGrid services={services} />
      <WhyUs />
      <Journey />
      <FeaturedWork />
      <UrgentHelp />
      <TeamStory />
      <Reviews />
      <ServiceArea />
      <FaqSection items={faqs()} />
      <FinalCta />
    </>
  );
}
