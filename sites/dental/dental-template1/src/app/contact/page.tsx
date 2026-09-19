import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui/primitives";
import LocationSection from "@/components/sections/LocationSection";
import UrgentCare from "@/components/sections/UrgentCare";
import Faq from "@/components/sections/Faq";
import { clinic } from "@/data/clinic";

export const metadata: Metadata = {
  title: "Contact & Location",
  description: `How to reach ${clinic.fullName} — address, opening hours, parking and urgent care.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-line bg-surface py-14 sm:py-20">
        <Container wide>
          <nav aria-label="Breadcrumb" className="mb-6 text-[0.82rem] text-ink-faint">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-ink">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-ink">
                Contact
              </li>
            </ol>
          </nav>

          <Eyebrow>Contact</Eyebrow>
          <h1 className="display-xl mt-5 max-w-3xl text-ink">Getting in touch</h1>
          <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-ink-soft">
            Call during opening hours to speak to the team, or send an appointment request and they
            will call you back.
          </p>
        </Container>
      </section>

      <LocationSection />
      <UrgentCare />
      <Faq />
    </>
  );
}
