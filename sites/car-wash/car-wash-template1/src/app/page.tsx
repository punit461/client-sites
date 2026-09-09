import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import TrustSection from "@/components/trust/TrustSection";
import AboutSection from "@/components/about/AboutSection";
import ServicesSection from "@/components/services/ServicesSection";
import BookingSection from "@/components/booking/BookingSection";
import WhyChooseUsSection from "@/components/why-choose/WhyChooseUsSection";
import HowItWorksSection from "@/components/how-it-works/HowItWorksSection";
import BeforeAfterSection from "@/components/before-after/BeforeAfterSection";
import TestimonialCarousel from "@/components/testimonials/TestimonialCarousel";
import PricingSection from "@/components/pricing/PricingSection";
import GallerySection from "@/components/gallery/GallerySection";
import FAQSection from "@/components/faq/FAQSection";
import ContactSection from "@/components/contact/ContactSection";
import Footer from "@/components/layout/Footer";
import ToastContainer from "@/components/common/ToastContainer";

export default function Home() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <main>
        <HeroSection />
        <TrustSection />
        <AboutSection />
        <ServicesSection />
        <BookingSection />
        <WhyChooseUsSection />
        <HowItWorksSection />
        <BeforeAfterSection />
        <TestimonialCarousel />
        <PricingSection />
        <GallerySection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
