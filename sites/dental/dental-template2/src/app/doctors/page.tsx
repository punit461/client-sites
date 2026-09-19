import type { Metadata } from "next";
import DoctorDirectory from "@/components/doctors/DoctorDirectory";
import { Breadcrumbs, Container, Label, PlaceholderNote } from "@/components/ui/primitives";
import { group } from "@/data/group";

export const metadata: Metadata = {
  title: "Doctors",
  description: `Find a clinician at ${group.fullName} by specialty, clinic, language or availability.`,
};

export default function DoctorsPage() {
  return (
    <>
      <section className="border-b border-line bg-surface py-12 sm:py-16">
        <Container wide>
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Doctors" }]} />
          <Label>Doctors</Label>
          <h1 className="display-xl mt-4 max-w-3xl text-ink">Find the right clinician</h1>
          <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-ink-soft">
            Filter by specialty, clinic, language spoken or availability. Every profile lists scope
            of practice so you know what a clinician actually treats.
          </p>

          <div className="max-w-2xl">
            <PlaceholderNote>
              <strong className="font-semibold text-ink">Placeholder profiles.</strong> Names,
              qualifications and availability below are scaffolding. Replace them with the
              group&rsquo;s own clinicians and their registration details before launch.
            </PlaceholderNote>
          </div>
        </Container>
      </section>

      <DoctorDirectory heading={false} />
    </>
  );
}
