import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import { FinalCta } from "@/components/sections/Closing";
import SuiteRail from "@/components/sections/SuiteRail";
import { Container } from "@/components/ui";
import { fromRate, maxGuests, rooms } from "@/data/stay";
import { numeral, rupees } from "@/lib/format";

export const metadata: Metadata = {
  title: "Suites",
  description:
    "Five rooms at Kayal House — lake veranda, teak room, boathouse suite, paddy room and the courtyard cottage. Rates include all meals.",
};

export default function SuitesPage() {
  return (
    <>
      <PageHeader
        index={numeral(1)}
        marker="Where you sleep"
        title="Five rooms, no two the same."
        copy="Two face the lake, one the courtyard, one the paddy, and the cottage stands on its own across the garden. Every rate includes all three meals, the tea tray and the four-thirty snack."
      >
        <dl className="mono mt-10 grid max-w-2xl grid-cols-2 gap-6 border-t border-line pt-7 text-[0.8rem] sm:grid-cols-4">
          {[
            ["Rooms", String(rooms.length)],
            ["From", rupees(fromRate)],
            ["Largest", `${maxGuests} guests`],
            ["Meals", "All included"],
          ].map(([term, value]) => (
            <div key={term}>
              <dt className="text-bone-faint">{term}</dt>
              <dd className="mt-1.5 text-bone">{value}</dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      <section className="py-16 sm:py-24">
        <Container wide>
          <SuiteRail variant="stack" />
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
