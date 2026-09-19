import type { Metadata } from "next";
import LocationsSection from "@/components/sections/LocationsSection";
import { Breadcrumbs, Container, Label } from "@/components/ui/primitives";
import { group } from "@/data/group";

export const metadata: Metadata = {
  title: "Locations",
  description: `${group.fullName} clinics — addresses, opening hours and specialties.`,
};

export default function LocationsPage() {
  return (
    <>
      <section className="border-b border-line bg-surface py-12 sm:py-16">
        <Container wide>
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Locations" }]} />
          <Label>Locations</Label>
          <h1 className="display-xl mt-4 max-w-3xl text-ink">Find a clinic near you</h1>
          <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-ink-soft">
            Three clinics across Bengaluru. Each has its own specialties, hours and access details.
          </p>
        </Container>
      </section>

      <LocationsSection />
    </>
  );
}
