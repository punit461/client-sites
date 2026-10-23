import { Item, Reveal, Stagger } from "@/components/motion/Motion";
import { Photo } from "@/components/ui/Photo";
import { SectionHead } from "@/components/ui/SectionHead";
import { business, principles } from "@/config/business";

export function Standard() {
  return (
    <section aria-labelledby="standard-title" className="dark section-y bg-charcoal text-white">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHead
            dark
            id="standard-title"
            label={`The ${business.shortName} standard`}
            title="How we work. Every job, every time."
          />
          <Stagger as="ol" className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-box)] bg-rule-dark sm:grid-cols-2">
            {principles.map((p, i) => (
              <Item key={p.title} className="bg-charcoal p-6 sm:p-7">
                <p className="font-display text-5xl font-bold tracking-tighter text-lime sm:text-6xl">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="t-h3 mt-5 text-white">{p.title}</h3>
                <p className="mt-2 text-gray">{p.body}</p>
              </Item>
            ))}
          </Stagger>
        </div>
        <Reveal x={30} className="relative lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-box)] bg-charcoal-3 lg:sticky lg:top-28">
            <Photo name="basinTrapCloseUp" width={900} sizes="(min-width: 1024px) 34vw, 100vw" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
