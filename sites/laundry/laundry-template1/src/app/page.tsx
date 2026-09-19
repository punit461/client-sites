import BookingModal from "@/components/booking/BookingModal";
import { BookingProvider } from "@/components/booking/BookingProvider";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Footer from "@/components/layout/Footer";
import MobileCtaBar from "@/components/layout/MobileCtaBar";
import Navbar from "@/components/layout/Navbar";
import BeforeAfter from "@/components/sections/BeforeAfter";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import OrderTracking from "@/components/sections/OrderTracking";
import ParallaxBanner from "@/components/sections/ParallaxBanner";
import Pricing from "@/components/sections/Pricing";
import ServiceShowcase from "@/components/sections/ServiceShowcase";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import TrustStrip from "@/components/sections/TrustStrip";
import WhyChooseUs from "@/components/sections/WhyChooseUs";

/**
 * One page, composed of sections in the order the brief lays them out. The
 * booking provider wraps everything because the "Schedule pickup" CTA appears
 * in the header, the hero, every pricing card and the mobile bar.
 */
export default function Home() {
  return (
    <BookingProvider>
      <AnnouncementBar />
      <Navbar />

      <main id="main">
        <Hero />
        <TrustStrip />
        <Services />
        <ServiceShowcase />
        <HowItWorks />
        <BeforeAfter />
        <WhyChooseUs />
        <ParallaxBanner />
        <Pricing />
        <Testimonials />
        <OrderTracking />
        <Faq />
        <FinalCta />
      </main>

      <Footer />
      <MobileCtaBar />
      <BookingModal />
    </BookingProvider>
  );
}
