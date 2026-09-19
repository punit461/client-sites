import type { Metadata } from "next";
import ExperienceBento from "@/components/sections/ExperienceBento";
import { Seasons } from "@/components/sections/Journal";
import { property } from "@/data/stay";

export const metadata: Metadata = {
  title: "Experiences",
  description: `Treks, plantation tours, campfires and cooking at ${property.fullName}.`,
};

export default function ExperiencesPage() {
  return (
    <>
      <ExperienceBento />
      <Seasons />
    </>
  );
}
