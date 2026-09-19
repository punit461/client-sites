import BookingModal from "@/components/booking/BookingModal";
import { BookingProvider } from "@/components/booking/BookingProvider";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PricingCalculator from "@/components/pricing/PricingCalculator";
import AppPreview from "@/components/sections/AppPreview";
import BentoServices from "@/components/sections/BentoServices";
import FabricGuide from "@/components/sections/FabricGuide";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import Hero from "@/components/sections/Hero";
import Journey from "@/components/sections/Journey";
import Locations from "@/components/sections/Locations";
import ParallaxRoom from "@/components/sections/ParallaxRoom";
import ScrollStatement from "@/components/sections/ScrollStatement";
import Stories from "@/components/sections/Stories";
import Sustainability from "@/components/sections/Sustainability";
import Transformation from "@/components/sections/Transformation";
import OrderTracking from "@/components/tracking/OrderTracking";

/**
 * One page, in the order the brief lays it out. The booking provider wraps
 * everything because "Book a pickup" appears in the header, the hero, its
 * floating card, every bento tile, the calculator and the final CTA.
 */
export default function Home() {
  return (
    <BookingProvider>
      <Navbar />

      <main id="main">
        <Hero />
        <ScrollStatement />
        <BentoServices />
        <Journey />
        <FabricGuide />
        <ParallaxRoom />
        <PricingCalculator />
        <OrderTracking />
        <Transformation />
        <Stories />
        <Sustainability />
        <AppPreview />
        <Locations />
        <Faq />
        <FinalCta />
      </main>

      <Footer />
      <BookingModal />
    </BookingProvider>
  );
}
