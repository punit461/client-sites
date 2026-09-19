import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import { FinalCta } from "@/components/sections/Closing";
import ExperienceList from "@/components/sections/ExperienceList";
import { experiences } from "@/data/stay";
import { numeral } from "@/lib/format";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "Sunrise canoes, a coir village walk, a toddy shop lunch and an afternoon in the kitchen — what there is to do from Kayal House, and what is already in the rate.",
};

const included = experiences.filter((e) => e.included).length;

export default function ExperiencesPage() {
  return (
    <>
      <PageHeader
        index={numeral(1)}
        marker="What there is to do"
        title="Mostly water, and one very good lunch."
        copy="Nothing here is compulsory and none of it is a package. Tell us the night before and it happens; sleep through it and nobody minds."
      >
        <dl className="mono mt-10 grid max-w-2xl grid-cols-2 gap-6 border-t border-line pt-7 text-[0.8rem] sm:grid-cols-3">
          {[
            ["On offer", String(experiences.length)],
            ["In the rate", String(included)],
            ["Booked for you", String(experiences.length - included)],
          ].map(([term, value]) => (
            <div key={term}>
              <dt className="text-bone-faint">{term}</dt>
              <dd className="mt-1.5 text-bone">{value}</dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      {/* ExperienceList brings its own container. */}
      <div className="py-16 sm:py-24">
        <ExperienceList detailed />
      </div>

      <FinalCta />
    </>
  );
}
