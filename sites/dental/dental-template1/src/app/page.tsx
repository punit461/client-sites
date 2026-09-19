import BeforeAfter from "@/components/sections/BeforeAfter";
import ClinicTour from "@/components/sections/ClinicTour";
import Faq from "@/components/sections/Faq";
import FeaturedTreatment from "@/components/sections/FeaturedTreatment";
import FinalCta from "@/components/sections/FinalCta";
import Hero from "@/components/sections/Hero";
import Intents from "@/components/sections/Intents";
import LocationSection from "@/components/sections/LocationSection";
import PatientExperience from "@/components/sections/PatientExperience";
import Reviews from "@/components/sections/Reviews";
import TeamSection from "@/components/sections/TeamSection";
import Technology from "@/components/sections/Technology";
import TreatmentExplorer from "@/components/sections/TreatmentExplorer";
import TreatmentsGrid from "@/components/sections/TreatmentsGrid";
import TrustStrip from "@/components/sections/TrustStrip";
import UrgentCare from "@/components/sections/UrgentCare";

/**
 * The home page, in the order the brief lays it out. The header, footer,
 * booking dialog and mobile bar live in app/layout.tsx because every route
 * needs them.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Intents />
      <TreatmentsGrid />
      <FeaturedTreatment />
      <TreatmentExplorer />
      <TeamSection />
      <PatientExperience />
      <ClinicTour />
      <Technology />
      <Reviews />
      <BeforeAfter />
      <UrgentCare />
      <LocationSection />
      <Faq />
      <FinalCta />
    </>
  );
}
