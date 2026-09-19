import type { Metadata } from "next";
import ResourcesSection from "@/components/sections/ResourcesSection";
import { Breadcrumbs, Container, Label, PlaceholderNote } from "@/components/ui/primitives";
import { resources } from "@/data/content";
import { group } from "@/data/group";

export const metadata: Metadata = {
  title: "Patient Resources",
  description: `Practical guidance from ${group.fullName} on appointments, preparation and aftercare.`,
};

export default function ResourcesPage() {
  return (
    <>
      <section className="border-b border-line bg-surface py-12 sm:py-16">
        <Container wide>
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Patient Resources" }]} />
          <Label>Patient resources</Label>
          <h1 className="display-xl mt-4 max-w-3xl text-ink">Before, during and after</h1>
          <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-ink-soft">
            Short, practical pages about appointments and aftercare. None of it is advice about
            your own situation.
          </p>

          <div className="max-w-2xl">
            <PlaceholderNote>
              <strong className="font-semibold text-ink">Not clinician-reviewed.</strong> Every
              article here is marked unreviewed, and each page says so. Do not set
              <code className="mx-1 rounded bg-surface-2 px-1 py-0.5 text-[0.75rem]">clinicianReviewed</code>
              until a named, qualified clinician has actually reviewed the content.
            </PlaceholderNote>
          </div>
        </Container>
      </section>

      <ResourcesSection limit={resources.length} />
    </>
  );
}
