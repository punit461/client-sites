import AboutPreview from "@/components/sections/AboutPreview";
import AchievementsGrid from "@/components/sections/AchievementsGrid";
import AdmissionsCta from "@/components/sections/AdmissionsCta";
import FacilitiesGrid from "@/components/sections/FacilitiesGrid";
import GalleryPreview from "@/components/sections/GalleryPreview";
import Hero from "@/components/sections/Hero";
import Highlights from "@/components/sections/Highlights";
import LocationSection from "@/components/sections/LocationSection";
import Pillars from "@/components/sections/Pillars";

/**
 * The home page, top to bottom. The header, footer and mobile bar live in
 * app/layout.tsx because every route needs them.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Highlights />
      <Pillars />
      <AboutPreview />
      <FacilitiesGrid limit={4} />
      <GalleryPreview />
      <AchievementsGrid limit={3} />
      <AdmissionsCta />
      <LocationSection />
    </>
  );
}
