import type { Metadata } from "next";
import ExploreMap from "@/components/sections/ExploreMap";
import { Food } from "@/components/sections/Journal";
import { property } from "@/data/stay";

export const metadata: Metadata = {
  title: "Explore",
  description: `Waterfalls, viewpoints, coffee estates and food near ${property.fullName}.`,
};

export default function ExplorePage() {
  return (
    <>
      <ExploreMap />
      <Food />
    </>
  );
}
