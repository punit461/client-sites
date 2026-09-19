import type { Metadata } from "next";
import Story from "@/components/sections/Story";
import { GuestStories } from "@/components/sections/Journal";
import { property } from "@/data/stay";

export const metadata: Metadata = {
  title: "Our Story",
  description: `How ${property.fullName} started, and who runs it.`,
};

export default function StoryPage() {
  return (
    <>
      <Story />
      <GuestStories />
    </>
  );
}
