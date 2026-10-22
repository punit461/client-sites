import CountUp from "@/components/motion/CountUp";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { school, stats } from "@/content/school";

/** A restrained row of figures. Each must be verifiable from a public source or the school itself. */
export default function StatsBand() {
  return (
    <section id="credibility" aria-labelledby="credibility-title" className="border-b border-line bg-ivory">
      <div className="container-x py-14 lg:py-16">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="credibility-title" className="eyebrow text-gold-ink">
            {school.shortName} at a glance
          </h2>
        </div>
        <Stagger as="ul" className="mt-8 grid grid-cols-2 gap-y-10 md:grid-cols-4 lg:divide-x lg:divide-line">
          {stats.map((s) => (
            <StaggerItem as="li" key={s.label} className="pr-4 lg:px-8 lg:first:pl-0">
              <p className="font-display text-[clamp(2.4rem,1.8rem+2.2vw,3.6rem)] leading-none text-navy">
                <CountUp value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-[0.88rem] font-medium leading-snug text-slate">{s.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
