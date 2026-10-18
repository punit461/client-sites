import Footer from "@/components/layout/Footer";
import MobileCtaBar from "@/components/layout/MobileCtaBar";
import Navbar from "@/components/layout/Navbar";
import About from "@/components/sections/About";
import Admissions from "@/components/sections/Admissions";
import Contact from "@/components/sections/Contact";
import Facilities from "@/components/sections/Facilities";
import Gallery from "@/components/sections/Gallery";
import Hero from "@/components/sections/Hero";
import ParentVoices from "@/components/sections/ParentVoices";

/** One page, composed of sections in the order a parent reads them. */
export default function Home() {
  return (
    <>
      <Navbar />

      <main id="main">
        <span id="top" aria-hidden />
        <Hero />
        <About />
        <Facilities />
        <Admissions />
        <ParentVoices />
        <Gallery />
        <Contact />
      </main>

      <Footer />
      <MobileCtaBar />
    </>
  );
}
