import type { Metadata } from "next";
import { ExperienceCards } from "@/components/sections/Experiences";
import { Container, Label } from "@/components/ui";
import { property } from "@/data/stay";

export const metadata: Metadata = {
  title: "Experiences",
  description: `Walks, plantation tours, campfires and viewpoints at ${property.fullName}.`,
};

export default function ExperiencesPage() {
  return (
    <section className="pb-24 pt-32 sm:pb-32 sm:pt-40">
      <Container wide>
        <Label>Experiences</Label>
        <h1 className="display-xl mt-5 max-w-3xl text-charcoal">
          Things to do, and permission to do none of them.
        </h1>
        <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-charcoal-soft">
          Most of these are included and none of them are compulsory. Tell us the night before if
          you would like to join something.
        </p>

        <div className="mt-14">
          <ExperienceCards />
        </div>
      </Container>
    </section>
  );
}
