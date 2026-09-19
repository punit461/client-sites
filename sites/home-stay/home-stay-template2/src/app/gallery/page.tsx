import type { Metadata } from "next";
import { PhotoJournal } from "@/components/sections/Journal";
import { TravelMoments } from "@/components/sections/Closing";
import { property } from "@/data/stay";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Photographs from ${property.fullName} — the house, the food and the hills.`,
};

export default function GalleryPage() {
  return (
    <>
      <PhotoJournal />
      <TravelMoments />
    </>
  );
}
