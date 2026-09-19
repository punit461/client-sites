import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import { FinalCta } from "@/components/sections/Closing";
import GalleryStrip from "@/components/sections/GalleryStrip";
import { Container } from "@/components/ui";
import { gallery } from "@/data/stay";
import { numeral } from "@/lib/format";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "The house, the rooms, the water and the table at Kayal House — photographed as they are, without a wide-angle lens.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        index={numeral(1)}
        marker="The place, as it is"
        title="No filters, no wide-angle lens."
        copy={`${gallery.length} photographs of the house, the rooms, the water and the table. Nothing here is staged, and nothing is a room you cannot book.`}
      />

      <section className="py-16 sm:py-24">
        <Container wide>
          <GalleryStrip variant="grid" />
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
