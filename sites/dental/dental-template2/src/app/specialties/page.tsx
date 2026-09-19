import type { Metadata } from "next";
import SpecialtiesBento from "@/components/sections/SpecialtiesBento";
import { Breadcrumbs, Container, Label } from "@/components/ui/primitives";
import { group } from "@/data/group";

export const metadata: Metadata = {
  title: "Specialties",
  description: `The specialties available across ${group.fullName} clinics.`,
};

export default function SpecialtiesPage() {
  return (
    <>
      <section className="border-b border-line bg-surface py-12 sm:py-16">
        <Container wide>
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Specialties" }]} />
          <Label>Find care</Label>
          <h1 className="display-xl mt-4 max-w-3xl text-ink">Care, by specialty</h1>
          <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-ink-soft">
            Each specialty page lists the treatments offered, the clinicians who provide them and
            the clinics where they run.
          </p>
        </Container>
      </section>

      <SpecialtiesBento />
    </>
  );
}
