import type { Metadata } from "next";
import RoomsShowcase from "@/components/sections/RoomsShowcase";
import { Container, Label } from "@/components/ui";
import { property } from "@/data/stay";

export const metadata: Metadata = {
  title: "Rooms",
  description: `The rooms at ${property.fullName} — rates, sizes and what each one looks out on.`,
};

export default function RoomsPage() {
  return (
    <>
      <section className="pb-6 pt-32 sm:pt-40">
        <Container wide>
          <Label>Rooms &amp; stays</Label>
          <h1 className="display-xl mt-5 max-w-3xl text-charcoal">Six rooms, no two alike.</h1>
          <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-charcoal-soft">
            Every rate includes all three meals and the walks that run from the house. Rooms are
            held on enquiry — we confirm by phone or email within a day.
          </p>
        </Container>
      </section>

      <RoomsShowcase />
    </>
  );
}
