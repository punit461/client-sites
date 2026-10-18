import type { Metadata } from "next";
import { ArrowUpRight, MessageCircle, Phone } from "lucide-react";
import EnquiryForm from "@/components/shared/EnquiryForm";
import Faq from "@/components/shared/Faq";
import VisitUs from "@/components/shared/VisitUs";
import Reveal from "@/components/ui/Reveal";
import { Container, CtaButton, PageHero, SectionHeading } from "@/components/ui/primitives";
import { admissionSteps } from "@/data/content";
import { admissions, contact, whatsappLink } from "@/data/site";
import { img } from "@/lib/asset";

export const metadata: Metadata = {
  title: `Admissions ${admissions.session} & contact`,
  description:
    "Admissions are open for 2026–27, from Nursery to Class 10. Enquire by phone or WhatsApp, register online, or visit our campus in Sadanandanagar, Bengaluru.",
};

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        eyebrow={`Admissions open · ${admissions.session}`}
        title="We'd love to welcome your child"
        copy="Admissions for the upcoming academic year are open from Nursery to Class 10. Here's how to get started."
        image={img.environmentOath}
        imageAlt="Students taking an oath at assembly"
      />

      <section className="py-20 sm:py-28">
        <Container>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {admissionSteps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.06} className="rounded-[var(--radius-card)] border border-line bg-surface p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy font-display font-semibold text-gold-bright">
                  {i + 1}
                </span>
                <h2 className="mt-4 font-display text-xl text-ink">{s.title}</h2>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{s.copy}</p>
              </Reveal>
            ))}
          </ol>

          <div className="mt-16 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <Reveal className="rounded-[28px] border border-line bg-surface p-6 shadow-soft sm:p-10">
              <h2 className="display-md text-ink">Send an enquiry</h2>
              <p className="mt-2 mb-8 text-ink-soft">Tell us a little about your child and we&apos;ll get back to you.</p>
              <EnquiryForm />
            </Reveal>

            <Reveal delay={0.1} className="space-y-4">
              <div className="rounded-[28px] bg-navy p-8 text-white">
                <h2 className="font-display text-2xl">Ready to register?</h2>
                <p className="mt-3 leading-relaxed text-white/75">
                  Download our application, then attach it to the online registration form.
                </p>
                <CtaButton href={contact.registrationForm} variant="gold" className="mt-6">
                  Open registration form <ArrowUpRight className="h-4 w-4" aria-hidden />
                </CtaButton>
              </div>
              <div className="rounded-[28px] border border-line bg-surface p-8">
                <h2 className="font-display text-2xl text-ink">Prefer to talk?</h2>
                <p className="mt-3 leading-relaxed text-ink-soft">Our admissions team is happy to answer questions.</p>
                <div className="mt-6 flex flex-col gap-3">
                  <CtaButton href={contact.admissionsPhoneHref} variant="ghost">
                    <Phone className="h-4 w-4" aria-hidden /> {contact.admissionsPhone}
                  </CtaButton>
                  <CtaButton href={whatsappLink()} variant="ghost">
                    <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp {contact.phone}
                  </CtaButton>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-surface-2 py-20 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <SectionHeading eyebrow="Questions" title="Frequently asked" copy="Can't find what you're looking for? Call us during school hours." />
          <Faq />
        </Container>
      </section>

      <VisitUs />
    </>
  );
}
