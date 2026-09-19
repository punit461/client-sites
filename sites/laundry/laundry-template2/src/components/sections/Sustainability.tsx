"use client";

import Image from "next/image";
import { Reveal, TextReveal } from "@/components/animations";
import { Container, Counter, Label } from "@/components/ui/primitives";
import { sustainability } from "@/data/content";
import { img } from "@/lib/images";

/**
 * The figures here are claims about a business's operations, so they come from
 * data/content.ts rather than being written into the markup — an operator sets
 * numbers they can evidence, and a zero simply drops out of the list.
 */
export default function Sustainability() {
  const stats = sustainability.stats.filter((s) => s.value > 0);

  return (
    <section
      id="sustainability"
      className="bg-[#10190f] py-24 text-paper sm:py-32"
    >
      <Container wide>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Label className="text-lime">Sustainability</Label>
            <TextReveal
              text="Cleaner clothes. A cleaner future."
              className="type-xl mt-5 max-w-[12ch] text-paper"
            />

            <ul className="mt-10 divide-y divide-paper/12 border-y border-paper/12">
              {sustainability.points.map((point) => (
                <li key={point.title} className="py-5">
                  <h3 className="font-sans text-[1rem] font-bold tracking-tight text-paper">
                    {point.title}
                  </h3>
                  <p className="mt-1.5 text-[0.9rem] leading-relaxed text-paper/55">{point.copy}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-8">
            <Reveal>
              <div className="relative aspect-4/3 overflow-hidden rounded-[28px]">
                <Image
                  src={img.eco}
                  alt="Reusable kraft packaging used for deliveries"
                  fill
                  sizes="(max-width: 1024px) 92vw, 44vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            {stats.length ? (
              <dl className="grid grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                  <Reveal key={stat.label} delay={i * 0.08}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="numeral block text-[clamp(1.9rem,3.4vw,2.9rem)] text-lime">
                        <Counter value={stat.value} suffix={stat.suffix} />
                      </span>
                      <span className="mt-2.5 block text-[0.78rem] leading-snug text-paper/55">
                        {stat.label}
                      </span>
                    </dd>
                  </Reveal>
                ))}
              </dl>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
