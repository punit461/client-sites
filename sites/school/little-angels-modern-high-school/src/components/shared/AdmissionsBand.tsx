import { ArrowRight, MessageCircle } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { Container, CtaButton, Eyebrow } from "@/components/ui/primitives";
import { admissionSteps } from "@/data/content";
import { admissions, whatsappLink } from "@/data/site";

/** The closing call to action on most pages. */
export default function AdmissionsBand() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal className="rounded-[28px] bg-gold-soft p-8 sm:p-12 lg:p-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <Eyebrow>Admissions {admissions.session}</Eyebrow>
              <h2 className="display-lg mt-4 text-navy">Give your child a place to grow</h2>
              <p className="mt-4 leading-relaxed text-ink-soft sm:text-lg">
                Admissions are open from Nursery to Class 10. Talk to us — we&apos;d love to meet you and your child.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <CtaButton href="/admissions/" size="lg">
                  Start your enquiry <ArrowRight className="h-4 w-4" aria-hidden />
                </CtaButton>
                <CtaButton href={whatsappLink("Hello, I would like to know about admissions at Little Angels Modern High School.")} size="lg" variant="ghost">
                  <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
                </CtaButton>
              </div>
            </div>
            <ol className="grid gap-3 sm:grid-cols-2">
              {admissionSteps.map((s, i) => (
                <li key={s.title} className="rounded-2xl bg-white p-5 shadow-soft">
                  <span className="font-display text-3xl font-semibold text-gold">{i + 1}</span>
                  <h3 className="mt-2 font-display text-lg text-ink">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{s.copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
