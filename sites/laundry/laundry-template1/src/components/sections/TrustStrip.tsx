"use client";

import { stats } from "@/data/site";
import { Container, Counter } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";

export default function TrustStrip() {
  return (
    <section aria-label="Customer numbers" className="border-y border-line bg-surface">
      <Container wide>
        <div className="grid items-center gap-10 py-12 lg:grid-cols-[minmax(0,15rem)_1fr] lg:gap-14 lg:py-14">
          <Reveal>
            <p className="font-display text-[1.6rem] leading-tight text-ink">
              Trusted by <span className="text-accent">10,000+</span> customers
            </p>
            <p className="mt-2 text-sm text-ink-soft">
              Across Bengaluru, since 2019.
            </p>
          </Reveal>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-4 lg:gap-x-8">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-[2.1rem] font-semibold leading-none text-ink sm:text-[2.6rem]">
                    <Counter
                      value={stat.value}
                      suffix={stat.suffix}
                      decimals={"decimals" in stat ? stat.decimals : 0}
                    />
                  </span>
                  <span className="mt-2.5 block text-[0.82rem] text-ink-soft">{stat.label}</span>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
