import { Info } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/animations";
import { explainer } from "@/data/content";

/**
 * Explains what a consultation involves — a process, not a diagnosis. The
 * disclaimer is part of the section, not a footnote, because this is exactly
 * the kind of content people mistake for advice about their own situation.
 */
export default function Explainer() {
  return (
    <section className="bg-surface-2/70 py-16 sm:py-24">
      <Container>
        <SectionHeading label="Understand your care" title={explainer.question} align="center" />

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {explainer.steps.map((step, i) => (
            <Reveal as="li" key={step.n} delay={i * 0.08}>
              <div className="h-full rounded-[20px] border border-line bg-surface p-6">
                {/* A small drawn mark rather than a photo: this is a process,
                    and a stock photo here would imply a specific clinical case. */}
                <svg viewBox="0 0 48 48" className="h-11 w-11 text-forest" fill="none" aria-hidden>
                  <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="1.5" opacity="0.25" />
                  <circle
                    cx="24"
                    cy="24"
                    r="21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray={`${((i + 1) / 4) * 132} 132`}
                    transform="rotate(-90 24 24)"
                  />
                  <text
                    x="24"
                    y="29"
                    textAnchor="middle"
                    fill="currentColor"
                    fontSize="13"
                    fontWeight="700"
                  >
                    {step.n}
                  </text>
                </svg>

                <h3 className="mt-4 font-display text-[1.15rem] font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-[0.88rem] leading-relaxed text-ink-soft">{step.copy}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <p className="mx-auto mt-8 flex max-w-2xl items-start gap-2.5 text-[0.82rem] leading-relaxed text-ink-faint">
          <Info className="mt-0.5 h-4 w-4 flex-none text-forest" aria-hidden />
          This describes how a consultation is structured. It is not advice about your own
          situation — what is appropriate for you can only be decided after an examination.
        </p>
      </Container>
    </section>
  );
}
