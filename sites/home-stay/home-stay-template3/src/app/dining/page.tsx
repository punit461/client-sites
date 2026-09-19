import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import { FinalCta } from "@/components/sections/Closing";
import TheDay from "@/components/sections/TheDay";
import { Container, Reveal } from "@/components/ui";
import { theDay } from "@/data/stay";
import { numeral } from "@/lib/format";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "The Table",
  description:
    "Five sittings a day, all of it cooked in the house and all of it in the rate — appam and stew, lunch on a leaf, and karimeen at the long table.",
};

export default function DiningPage() {
  return (
    <>
      <PageHeader
        index={numeral(1)}
        marker="The table"
        title="Elsy decides after the boat comes in."
        copy="There is no menu card. What arrives depends on what the boat brought and what is ripe in the garden, which is the reason the food here is worth writing about at all."
      >
        <dl className="mono mt-10 grid max-w-2xl grid-cols-2 gap-6 border-t border-line pt-7 text-[0.8rem] sm:grid-cols-4">
          {[
            ["Sittings", String(theDay.length)],
            ["Cost", "In the rate"],
            ["Vegetarian", "Always"],
            ["Long table", "20:00"],
          ].map(([term, value]) => (
            <div key={term}>
              <dt className="text-bone-faint">{term}</dt>
              <dd className="mt-1.5 text-bone">{value}</dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      <Container wide className="pt-14">
        <Reveal>
          <div className="relative aspect-16/9 overflow-hidden rounded-sm bg-ink-2 sm:aspect-21/9">
            <Image
              src={img.lunch}
              alt="Lunch laid out on a banana leaf"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" aria-hidden />
          </div>
        </Reveal>
      </Container>

      <div className="py-16 sm:py-24">
        <TheDay detailed />
      </div>

      <FinalCta />
    </>
  );
}
