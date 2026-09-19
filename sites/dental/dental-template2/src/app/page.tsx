import DoctorDirectory from "@/components/doctors/DoctorDirectory";
import Explainer from "@/components/sections/Explainer";
import Faq from "@/components/sections/Faq";
import FeaturedTreatments from "@/components/sections/FeaturedTreatments";
import Hero from "@/components/sections/Hero";
import HowCareWorks from "@/components/sections/HowCareWorks";
import LocationsSection from "@/components/sections/LocationsSection";
import PatientJourney from "@/components/sections/PatientJourney";
import Payment from "@/components/sections/Payment";
import QuickSearch from "@/components/sections/QuickSearch";
import ResourcesSection from "@/components/sections/ResourcesSection";
import Reviews from "@/components/sections/Reviews";
import SpecialtiesBento from "@/components/sections/SpecialtiesBento";
import { FinalCta, UrgentContact } from "@/components/sections/UrgentAndCta";

/**
 * The home page. Header, footer and the mobile action bar live in
 * app/layout.tsx because every route needs them.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <QuickSearch />
      <SpecialtiesBento />
      <FeaturedTreatments />
      <HowCareWorks />
      <DoctorDirectory />
      <PatientJourney />
      <LocationsSection />
      <Explainer />
      <ResourcesSection />
      <Reviews />
      <Payment />
      <UrgentContact />
      <Faq />
      <FinalCta />
    </>
  );
}
