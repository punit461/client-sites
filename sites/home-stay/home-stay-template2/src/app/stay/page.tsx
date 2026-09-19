import type { Metadata } from "next";
import StayPanels from "@/components/sections/StayPanels";
import { Container, Label } from "@/components/ui";
import { property } from "@/data/stay";

export const metadata: Metadata = {
  title: "Stay",
  description: `Rooms and rates at ${property.fullName} — four rooms and a cabin, all meals included.`,
};

export default function StayPage() {
  return (
    <>
      <section className="pb-4 pt-16 sm:pt-24">
        <Container wide>
          <Label>Stay with us</Label>
          <h1 className="display-xl mt-5 max-w-3xl text-brown">
            Four rooms, and <span className="hand text-terracotta">a cabin</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-brown-soft">
            Every rate includes all three meals and the walks that run from the house. Rooms are
            held on enquiry — a real person replies within a day.
          </p>
        </Container>
      </section>

      <StayPanels />
    </>
  );
}
