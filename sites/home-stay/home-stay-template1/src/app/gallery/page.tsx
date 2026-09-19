import type { Metadata } from "next";
import GalleryGrid from "@/components/sections/GalleryGrid";
import { Container, Label } from "@/components/ui";
import { property } from "@/data/stay";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Photographs of the rooms, the estate and the valley at ${property.fullName}.`,
};

export default function GalleryPage() {
  return (
    <section className="pb-24 pt-32 sm:pb-32 sm:pt-40">
      <Container wide>
        <Label>Gallery</Label>
        <h1 className="display-xl mt-5 max-w-3xl text-charcoal">The place, as it is.</h1>
        <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-charcoal-soft">
          No filters and no wide-angle tricks. Select an image to see it larger.
        </p>

        <div className="mt-12">
          <GalleryGrid filterable />
        </div>
      </Container>
    </section>
  );
}
