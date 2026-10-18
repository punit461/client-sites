import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import EnquiryForm from "@/components/sections/EnquiryForm";
import LocationSection from "@/components/sections/LocationSection";
import { Container, PageHero, SectionHeading } from "@/components/ui/primitives";
import { contact, school } from "@/data/school";

export const metadata: Metadata = {
  title: "Contact",
  description: `How to reach ${school.name}: ${contact.address.line1}, ${contact.address.line2}, ${contact.address.city} ${contact.address.postcode}. Phone ${contact.phone}, WhatsApp and email.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Contact"
        title="Getting in touch"
        copy="Call during school hours to speak to the office, message us on WhatsApp, or send a request and we will call you back."
      />

      <LocationSection compact />

      <section className="bg-surface py-20 sm:py-28">
        <Container wide>
          <div className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
            <Reveal>
              <SectionHeading
                eyebrow="Write to us"
                title="Request a call back"
                copy="For admissions, a campus visit, or anything else — leave your number and the office will get back to you during school hours."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <EnquiryForm subject="General enquiry" />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
