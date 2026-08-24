import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import Stats from "@/components/stats/Stats";
import About from "@/components/about/About";
import Services from "@/components/services/Services";
import HowItWorks from "@/components/howItWorks/HowItWorks";
import BeforeAfter from "@/components/beforeAfter/BeforeAfter";
import WhyChooseUs from "@/components/whyChooseUs/WhyChooseUs";
import Pricing from "@/components/pricing/Pricing";
import Booking from "@/components/booking/Booking";
import Testimonials from "@/components/testimonials/Testimonials";
import Gallery from "@/components/gallery/Gallery";
import FAQ from "@/components/faq/FAQ";
import Contact from "@/components/contact/Contact";
import CTA from "@/components/cta/CTA";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Services />
      <HowItWorks />
      <BeforeAfter />
      <WhyChooseUs />
      <Pricing />
      <Booking />
      <Testimonials />
      <Gallery />
      <FAQ />
      <Contact />
      <CTA />
      <Footer />
    </main>
  );
}
