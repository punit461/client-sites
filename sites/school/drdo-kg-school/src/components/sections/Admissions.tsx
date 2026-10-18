import { Phone } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { Container, Copy, CtaButton, SectionHeading } from "@/components/ui/primitives";
import { admissions } from "@/data/content";
import { contact } from "@/data/site";

export default function Admissions() {
  return (
    <section id="admissions" className="py-20 sm:py-24">
      <Container className="grid items-start gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        <Reveal>
          <SectionHeading eyebrow={admissions.eyebrow} title={admissions.title} />
          <p className="mt-6 text-[1.05rem] leading-relaxed text-ink-soft">
            {admissions.policy} <Copy value={admissions.policyCheck} />
          </p>

          <ol className="mt-8 space-y-5">
            {admissions.steps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span
                  className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-sun font-display text-lg font-extrabold text-ink"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <div className="pt-1.5">
                  <h3 className="text-[1.2rem] text-ink">{step.title}</h3>
                  <p className="mt-1 leading-relaxed text-ink-soft">
                    {step.copy} {step.detail ? <Copy value={step.detail} /> : null}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.1}>
          <aside className="rounded-[var(--radius-card)] bg-teal p-7 text-white shadow-[var(--shadow-soft)]">
            <h3 className="text-[1.5rem] text-sun">Classes</h3>
            <ul className="mt-4">
              {admissions.classes.map((c) => (
                <li
                  key={c.name}
                  className="flex items-center justify-between gap-4 border-b border-white/20 py-3.5 text-[1.1rem] font-bold"
                >
                  <span>{c.name}</span>
                  <span className="text-[0.95rem] font-semibold">
                    <Copy value={c.age} />
                  </span>
                </li>
              ))}
            </ul>
            <CtaButton href={contact.phoneHref} className="mt-6 w-full">
              <Phone className="h-4 w-4" strokeWidth={2.2} aria-hidden />
              Call {contact.phone}
            </CtaButton>
          </aside>
        </Reveal>
      </Container>
    </section>
  );
}
