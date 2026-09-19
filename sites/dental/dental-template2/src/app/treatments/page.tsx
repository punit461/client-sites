import type { Metadata } from "next";
import FeaturedTreatments from "@/components/sections/FeaturedTreatments";
import { Breadcrumbs, Container, Label } from "@/components/ui/primitives";
import { group } from "@/data/group";

export const metadata: Metadata = {
  title: "Treatments",
  description: `Treatments available across ${group.fullName} clinics.`,
};

export default function TreatmentsPage() {
  return (
    <>
      <section className="border-b border-line bg-surface py-12 sm:py-16">
        <Container wide>
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Treatments" }]} />
          <Label>Treatments</Label>
          <h1 className="display-xl mt-4 max-w-3xl text-ink">What we treat</h1>
          <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-ink-soft">
            Each page sets out what the treatment involves and what a first appointment looks like.
            None of it replaces a consultation.
          </p>
        </Container>
      </section>

      <FeaturedTreatments />
    </>
  );
}
