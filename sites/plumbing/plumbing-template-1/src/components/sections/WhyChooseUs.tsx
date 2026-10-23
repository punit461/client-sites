import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { business, standards } from "@/config/business";

export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-title" className="section-y bg-ivory-2/60">
      <div className="shell grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="relative lg:col-span-5">
          <div className="group relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-sand">
            <div className="zoom-img absolute inset-0">
              <Photo
                name="yardExcavation"
                width={900}
                sizes="(min-width: 1024px) 30rem, 100vw"
                className="object-cover object-[60%_50%]"
              />
            </div>
          </div>
          <div className="absolute -right-4 -bottom-8 hidden aspect-square w-44 overflow-hidden rounded-xl border-[6px] border-ivory shadow-[var(--shadow-lift)] sm:block lg:-right-10 lg:w-52">
            <Photo name="serviceVan" width={420} sizes="13rem" className="object-cover object-[22%_50%]" />
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <SectionHeading
            id="why-title"
            eyebrow={`Why ${business.shortName}`}
            title="What our customers count on, every job."
            lead="Every promise below is something our Google reviewers have described us doing — not a slogan."
          />
          <Stagger className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {standards.map((s, i) => (
              <StaggerItem key={s.title} className="border-t border-line pt-5">
                <p className="font-display text-sm font-bold text-copper-ink">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="t-h3 mt-2 text-navy">{s.title}</h3>
                <p className="mt-2 text-[0.95rem] text-slate">{s.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
