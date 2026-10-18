import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { Container } from "@/components/ui/primitives";
import { contact, school, whatsappLink } from "@/data/school";

export default function AdmissionsCta() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[30px] bg-coral px-6 py-14 text-white shadow-[var(--shadow-lift)] sm:px-12 sm:py-20">
            <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-saffron/40 blur-3xl" aria-hidden />
            <div className="pointer-events-none absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-white/15 blur-3xl" aria-hidden />

            <div className="relative grid items-center gap-10 lg:grid-cols-[3fr_2fr]">
              <div>
                <p className="eyebrow text-white/80">Admissions open</p>
                <h2 className="display-lg mt-4 text-white">
                  {school.classes}. No donation, ever.
                </h2>
                <p className="mt-5 max-w-xl text-[1.02rem] leading-relaxed text-white/85">
                  Talk to the school office about the class and academic year you are applying for, and arrange a
                  visit to see the campus for yourself.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  href="/admissions"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-[0.92rem] font-semibold text-cream transition hover:bg-ink/90"
                >
                  How admissions work
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
                <a
                  href={`tel:${contact.phoneDial}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-[0.92rem] font-semibold text-ink transition hover:bg-cream"
                >
                  <Phone className="h-4 w-4" strokeWidth={1.9} aria-hidden />
                  {contact.phone}
                </a>
                <a
                  href={whatsappLink("Hello New Pratham Public School, I would like to know more about admissions.")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-4 text-[0.92rem] font-semibold text-white transition hover:bg-white/10"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={1.9} aria-hidden />
                  WhatsApp the office
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
