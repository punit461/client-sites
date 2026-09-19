import BookingModal from "@/components/booking/BookingModal";
import { BookingProvider } from "@/components/booking/BookingProvider";
import Footer from "@/components/layout/Footer";
import MobileDock from "@/components/layout/MobileDock";
import Navbar from "@/components/layout/Navbar";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import Hero from "@/components/sections/Hero";
import Membership from "@/components/sections/Membership";
import Process from "@/components/sections/Process";
import ServiceAccordion from "@/components/sections/ServiceAccordion";
import StainGuide from "@/components/sections/StainGuide";
import Standard from "@/components/sections/Standard";
import StatementPlate from "@/components/sections/StatementPlate";
import Stories from "@/components/sections/Stories";
import Ticker from "@/components/sections/Ticker";
import Tracking from "@/components/sections/Tracking";
import WashHouse from "@/components/sections/WashHouse";

/**
 * One page, in the order the brief lays it out. The booking provider wraps
 * everything because "Book a collection" appears in the header, the hero, each
 * service panel, every membership card, the stain guide, the mobile dock and
 * the final call to action — all of them opening the one drawer.
 */
export default function Home() {
  return (
    <BookingProvider>
      <Navbar />

      <main id="main">
        <Hero />
        <Ticker />
        <ServiceAccordion />
        <Standard />
        <Process />
        <StatementPlate />
        <Membership />
        <StainGuide />
        <Tracking />
        <WashHouse />
        <Stories />
        <Faq />
        <FinalCta />
      </main>

      <Footer />
      <MobileDock />
      <BookingModal />
    </BookingProvider>
  );
}
