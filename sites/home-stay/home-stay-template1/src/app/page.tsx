import Hero from "@/components/sections/Hero";
import { Introduction, Reasons } from "@/components/sections/Introduction";
import RoomsShowcase from "@/components/sections/RoomsShowcase";
import Experiences from "@/components/sections/Experiences";
import GalleryGrid from "@/components/sections/GalleryGrid";
import { FinalCta, LocationSection, Nearby, Reviews, Social } from "@/components/sections/Closing";
import { Container, Label } from "@/components/ui";
import Link from "next/link";

/** The home page. Navbar and footer live in app/layout.tsx. */
export default function Home() {
  return (
    <>
      <Hero />
      <Introduction />
      <Reasons />
      <RoomsShowcase limit={3} />
      <Experiences limit={3} />

      <section className="border-t border-line py-24 sm:py-32">
        <Container wide>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <Label>Gallery</Label>
              <h2 className="display-lg mt-5 text-charcoal">The place, as it is.</h2>
            </div>
            <Link
              href="/gallery"
              className="text-[0.88rem] tracking-wide text-charcoal-soft underline-offset-8 transition hover:text-charcoal hover:underline"
            >
              View full gallery
            </Link>
          </div>
          <div className="mt-12">
            <GalleryGrid limit={6} />
          </div>
        </Container>
      </section>

      <Nearby />
      <Reviews />
      <LocationSection />
      <Social />
      <FinalCta />
    </>
  );
}
