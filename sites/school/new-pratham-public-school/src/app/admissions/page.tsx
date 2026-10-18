import type { Metadata } from "next";
import { ExternalLink, FileText, Phone, Smartphone } from "lucide-react";
import Link from "next/link";
import Reveal, { Stagger } from "@/components/motion/Reveal";
import EnquiryForm from "@/components/sections/EnquiryForm";
import Faq from "@/components/sections/Faq";
import { Container, PageHero, SectionHeading } from "@/components/ui/primitives";
import { admissions } from "@/data/content";
import { contact, school } from "@/data/school";

export const metadata: Metadata = {
  title: "Admissions",
  description: `Admissions to ${school.name}, ${school.classes}. How to enquire, visit and apply — with a no-donation policy.`,
};

export default function AdmissionsPage() {
  return (
    <>
      <PageHero tone="ink" crumb="Admissions" eyebrow="Admissions" title={`Joining ${school.short}: ${school.classes}.`} copy={admissions.intro}>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`tel:${contact.phoneDial}`}
            className="inline-flex items-center gap-2 rounded-full bg-saffron px-6 py-3.5 text-[0.9rem] font-semibold text-ink transition hover:bg-saffron-deep"
          >
            <Phone className="h-4 w-4" strokeWidth={1.9} aria-hidden />
            Call {contact.phone}
          </a>
          <a
            href="#enquire"
            className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-6 py-3.5 text-[0.9rem] font-semibold text-cream transition hover:bg-cream/10"
          >
            Send an enquiry
          </a>
        </div>
      </PageHero>

      {/* --------------------------------------------------------- steps */}
      <section className="py-20 sm:py-28">
        <Container wide>
          <Reveal>
            <SectionHeading eyebrow="How it works" title="Four steps from enquiry to the first day" />
          </Reveal>
          <Stagger as="ul" className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {admissions.steps.map((step, i) => (
              <li key={step.title} className="card relative flex flex-col p-6">
                <span className="font-display text-[2.6rem] font-semibold leading-none text-saffron">0{i + 1}</span>
                <h3 className="mt-4 font-display text-[1.3rem] font-semibold text-ink">{step.title}</h3>
                <p className="mt-2.5 text-[0.92rem] leading-relaxed text-ink-soft">{step.copy}</p>
              </li>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ------------------------------------------------------- enquiry */}
      <section id="enquire" className="scroll-mt-24 bg-surface py-20 sm:py-28">
        <Container wide>
          <div className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
            <Reveal>
              <SectionHeading
                eyebrow="Enquire"
                title="Tell us about your child"
                copy="The office will call you back with the application form and the list of documents for the class you are applying for."
              />

              <div className="mt-9 space-y-4">
                <a
                  href={contact.admissionApp}
                  target="_blank"
                  rel="noreferrer"
                  className="card group flex items-start gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
                >
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-leaf-wash text-leaf-deep">
                    <Smartphone className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                  </span>
                  <span>
                    <span className="flex items-center gap-2 font-semibold text-ink">
                      Admission enquiry app
                      <ExternalLink className="h-3.5 w-3.5 text-ink-faint" strokeWidth={2} aria-hidden />
                    </span>
                    <span className="mt-1 block text-[0.85rem] leading-relaxed text-ink-soft">
                      The school&apos;s Android app on Google Play, with the official enquiry form.
                    </span>
                  </span>
                </a>

                <Link
                  href="/mandatory-disclosure"
                  className="card group flex items-start gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
                >
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-sky-wash text-sky">
                    <FileText className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                  </span>
                  <span>
                    <span className="block font-semibold text-ink">CBSE mandatory public disclosure</span>
                    <span className="mt-1 block text-[0.85rem] leading-relaxed text-ink-soft">
                      Affiliation details, infrastructure and staff information, as required by CBSE.
                    </span>
                  </span>
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <EnquiryForm />
            </Reveal>
          </div>
        </Container>
      </section>

      <Faq items={admissions.faqs} />
    </>
  );
}
