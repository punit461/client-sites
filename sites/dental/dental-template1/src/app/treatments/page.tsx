import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Eyebrow, Icon } from "@/components/ui/primitives";
import Reveal from "@/components/motion/Reveal";
import { treatments } from "@/data/treatments";
import { clinic } from "@/data/clinic";

export const metadata: Metadata = {
  title: "Treatments",
  description: `Dental treatments at ${clinic.fullName}, from routine checkups to restorative and cosmetic care.`,
};

const CATEGORIES = ["General", "Restorative", "Cosmetic", "Orthodontics", "Children"] as const;

export default function TreatmentsPage() {
  return (
    <>
      <section className="border-b border-line bg-surface py-14 sm:py-20">
        <Container wide>
          {/* Breadcrumbs: a real nav landmark, not decoration. */}
          <nav aria-label="Breadcrumb" className="mb-6 text-[0.82rem] text-ink-faint">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-ink">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-ink">
                Treatments
              </li>
            </ol>
          </nav>

          <Eyebrow>Treatments</Eyebrow>
          <h1 className="display-xl mt-5 max-w-3xl text-ink">
            Complete care for every stage of your smile
          </h1>
          <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-ink-soft">
            Plain-English summaries of what each treatment involves. Whether one is right for you
            can only be decided after an examination.
          </p>
        </Container>
      </section>

      {CATEGORIES.map((category) => {
        const group = treatments.filter((t) => t.category === category);
        if (!group.length) return null;
        return (
          <section key={category} className="border-b border-line py-14 last:border-b-0 sm:py-16">
            <Container wide>
              <h2 className="font-display text-[1.7rem] text-ink">{category}</h2>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.map((treatment, i) => (
                  <Reveal key={treatment.slug} delay={i * 0.06}>
                    <Link
                      href={`/treatments/${treatment.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-sage hover:shadow-[var(--shadow-lift)]"
                    >
                      <div className="relative aspect-16/10 overflow-hidden">
                        <Image
                          src={treatment.image}
                          alt={treatment.alt}
                          fill
                          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw"
                          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                        />
                        <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg bg-white/92 text-sage-deep backdrop-blur">
                          <Icon name={treatment.icon} className="h-4.5 w-4.5" />
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="font-display text-[1.3rem] text-ink">{treatment.name}</h3>
                        <p className="mt-2 flex-1 text-[0.88rem] leading-relaxed text-ink-soft">
                          {treatment.summary}
                        </p>
                        <span className="mt-5 inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-sage-deep transition-colors group-hover:text-terracotta">
                          Learn more
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </Container>
          </section>
        );
      })}
    </>
  );
}
