import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow, PlaceholderNote } from "@/components/ui/primitives";
import TeamSection from "@/components/sections/TeamSection";
import { clinic } from "@/data/clinic";

export const metadata: Metadata = {
  title: "Our Team",
  description: `The clinical team at ${clinic.fullName}.`,
};

export default function TeamPage() {
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
                Our Team
              </li>
            </ol>
          </nav>

          <Eyebrow>Our team</Eyebrow>
          <h1 className="display-xl mt-5 max-w-3xl text-ink">
            Meet the people behind your care
          </h1>
          <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-ink-soft">
            You will know who you are seeing before you arrive, what they focus on, and which
            languages they speak.
          </p>

          <PlaceholderNote>
            <strong className="font-semibold text-ink">Placeholder profiles.</strong> The names,
            roles and qualifications below are scaffolding. Replace them with the practice&rsquo;s
            own clinicians and their actual registration details before launch — published
            qualifications are a registrable claim.
          </PlaceholderNote>
        </Container>
      </section>

      <TeamSection />
    </>
  );
}
