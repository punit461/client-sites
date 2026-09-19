import type { Metadata } from "next";
import { Introduction, Reasons } from "@/components/sections/Introduction";
import { Reviews } from "@/components/sections/Closing";
import { Container, Label } from "@/components/ui";
import { property } from "@/data/stay";

export const metadata: Metadata = {
  title: "About",
  description: `${property.fullName} — a working coffee estate in ${property.region} with six rooms.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="pb-2 pt-32 sm:pt-40">
        <Container wide>
          <Label>About</Label>
          <h1 className="display-xl mt-5 max-w-3xl text-charcoal">
            A family estate that takes guests.
          </h1>
        </Container>
      </section>

      <Introduction />
      <Reasons />
      <Reviews />
    </>
  );
}
