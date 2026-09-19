import type { Metadata } from "next";
import { LocationSection, Nearby } from "@/components/sections/Closing";
import { Container, Label } from "@/components/ui";
import { property } from "@/data/stay";

export const metadata: Metadata = {
  title: "Location",
  description: `How to reach ${property.fullName}, and what is worth visiting nearby.`,
};

export default function LocationPage() {
  return (
    <>
      <section className="pb-4 pt-32 sm:pt-40">
        <Container wide>
          <Label>Finding us</Label>
          <h1 className="display-xl mt-5 max-w-3xl text-charcoal">Getting here</h1>
          <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-charcoal-soft">
            {property.region}. The last two kilometres are estate road — slow, but fine in any car
            outside the monsoon.
          </p>
        </Container>
      </section>

      <LocationSection />
      <Nearby />
    </>
  );
}
