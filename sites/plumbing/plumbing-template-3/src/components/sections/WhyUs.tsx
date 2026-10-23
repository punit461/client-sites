import { Item, Reveal, Stagger } from "@/components/motion/Motion";
import { Photo } from "@/components/ui/Photo";
import { SectionHead } from "@/components/ui/SectionHead";
import { approach } from "@/config/business";

export function WhyUs() {
  return (
    <section aria-labelledby="why-title" className="section-y bg-sand">
      <div className="shell grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="relative lg:col-span-5">
          <div className="group relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[var(--radius-photo)] bg-sand-deep">
            <div className="zoom absolute inset-0">
              <Photo name="basinSupply" width={900} sizes="(min-width: 1024px) 34vw, 100vw" />
            </div>
          </div>
          <div className="absolute -right-3 -bottom-6 hidden w-40 overflow-hidden rounded-[var(--radius-card)] border-[6px] border-sand shadow-[var(--shadow-lift)] sm:block lg:-right-8 lg:w-48">
            <div className="relative aspect-square">
              <Photo name="basinTrap" width={400} sizes="12rem" />
            </div>
          </div>
        </Reveal>
        <div className="lg:col-span-7">
          <SectionHead
            id="why-title"
            eyebrow="Why homeowners choose us"
            title="A Better Plumbing Experience Starts Here."
            lead="Good plumbing is mostly invisible once it's done. What you remember is how the job was handled."
          />
          <Stagger as="ol" className="mt-10 space-y-4">
            {approach.map((p, i) => (
              <Item key={p.title} className="flex gap-5 rounded-[var(--radius-card)] border border-line bg-white/70 p-5 sm:p-6">
                <span className="font-display text-sm font-bold text-clay">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="t-h3">{p.title}</h3>
                  <p className="mt-1.5 text-stone">{p.body}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
