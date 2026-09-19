import Link from "next/link";
import ExperienceList from "@/components/sections/ExperienceList";
import GalleryStrip from "@/components/sections/GalleryStrip";
import Hero from "@/components/sections/Hero";
import Journey from "@/components/sections/Journey";
import Prelude, { HouseNotes } from "@/components/sections/Prelude";
import SuiteRail from "@/components/sections/SuiteRail";
import TheDay from "@/components/sections/TheDay";
import Voices from "@/components/sections/Voices";
import { Faq, FinalCta } from "@/components/sections/Closing";
import { Container, Marker } from "@/components/ui";
import { numeral } from "@/lib/format";

/**
 * The home page. The sections are numbered in the order they appear, which is
 * the only thing keeping the mono markers honest — renumber them if you move
 * one. Header, footer and the sticky phone bar live in app/layout.tsx.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Prelude />
      <HouseNotes />
      <SuiteRail />
      <TheDay />
      <ExperienceList limit={4} />

      <section className="overflow-hidden border-t border-line py-24 sm:py-32">
        <Container wide>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-xl">
              <Marker index={numeral(5)}>The place, as it is</Marker>
              <h2 className="display-lg mt-6 text-bone">No filters, no wide-angle lens.</h2>
            </div>
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-3 text-[0.88rem] text-bone transition-colors hover:text-brass"
            >
              <span className="rule w-8 transition-all group-hover:w-14" aria-hidden />
              Full gallery
            </Link>
          </div>
        </Container>

        {/* Runs off the right edge on purpose — the strip is meant to be dragged. */}
        <div className="mt-12">
          <GalleryStrip />
        </div>
      </section>

      <Voices />
      <Journey />
      <Faq index={numeral(8)} />
      <FinalCta />
    </>
  );
}
