import { Item, Reveal, Stagger } from "@/components/motion/Motion";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { ServiceCard, toneAt } from "@/components/sections/ServicesGrid";
import { Button } from "@/components/ui/Buttons";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { SectionHead } from "@/components/ui/SectionHead";
import { business, telHref } from "@/config/business";
import { servicesFor } from "@/content/services";
import type { Audience, Faq } from "@/content/types";
import type { PhotoKey } from "@/lib/images";
import { PageHero } from "./PageHero";

export type AudienceContent = {
  audience: Audience;
  path: string;
  crumb: string;
  eyebrow: string;
  title: string;
  lead: string;
  photo: PhotoKey;
  sidePhoto: PhotoKey;
  pointsTitle: string;
  points: { icon: IconName; title: string; body: string }[];
  forTitle: string;
  forList: string[];
  faqs: Faq[];
  cta: string;
};

/** Residential and commercial share a layout, never their words. */
export function AudiencePage({ c }: { c: AudienceContent }) {
  return (
    <>
      <PageHero crumbs={[{ name: c.crumb, href: c.path }]} eyebrow={c.eyebrow} title={c.title} lead={c.lead} photo={c.photo}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/request-a-quote/">Request a Quote</Button>
          <Button href={telHref} variant="outline" icon="phone">
            {business.phone.display}
          </Button>
        </div>
      </PageHero>

      <section aria-labelledby="points-title" className="section-y bg-white">
        <div className="shell">
          <SectionHead id="points-title" eyebrow="How we work" title={c.pointsTitle} />
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.points.map((p, i) => (
              <Item key={p.title} className={`rounded-[var(--radius-card)] p-6 ${i % 2 ? "bg-sage" : "border border-line-cool bg-white"}`}>
                <span className={`grid h-12 w-12 place-items-center rounded-full text-teal ${i % 2 ? "bg-white" : "bg-sage"}`}>
                  <Icon name={p.icon} className="h-[1.35rem] w-[1.35rem]" />
                </span>
                <h3 className="t-h3 mt-5">{p.title}</h3>
                <p className={`mt-2 ${i % 2 ? "text-stone" : "text-muted"}`}>{p.body}</p>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section aria-labelledby="for-title" className="section-y bg-sand">
        <div className="shell grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-photo)] bg-sand-deep lg:col-span-6">
            <Photo name={c.sidePhoto} width={1000} sizes="(min-width: 1024px) 45vw, 100vw" />
          </Reveal>
          <div className="lg:col-span-6">
            <SectionHead id="for-title" eyebrow="Who we help" title={c.forTitle} />
            <ul className="mt-8 grid gap-2 sm:grid-cols-2">
              {c.forList.map((w) => (
                <li key={w} className="flex items-center gap-3 rounded-[var(--radius-card)] bg-white px-4 py-3 text-charcoal">
                  <Icon name="check" className="h-5 w-5 shrink-0 text-teal" strokeWidth={1.8} />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="aud-services" className="section-y bg-white">
        <div className="shell">
          <SectionHead id="aud-services" eyebrow="Services" title="What we can help with." />
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {servicesFor(c.audience).map((s, i) => (
              <Item key={s.slug}>
                <ServiceCard service={s} tone={toneAt(i, 4)} />
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <FaqSection items={c.faqs} eyebrow="Questions" title="Good to know." more={false} tone="sand" />
      <FinalCta title={c.cta} />
    </>
  );
}
