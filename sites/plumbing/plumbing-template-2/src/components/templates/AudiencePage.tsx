import { Item, Reveal, Stagger } from "@/components/motion/Motion";
import { FaqBlock } from "@/components/sections/FaqBlock";
import { FinalCta } from "@/components/sections/FinalCta";
import { ServiceTile } from "@/components/sections/ServiceBento";
import { Button } from "@/components/ui/Buttons";
import { Photo } from "@/components/ui/Photo";
import { SectionHead } from "@/components/ui/SectionHead";
import { business, telHref } from "@/config/business";
import { services, servicesFor } from "@/content/services";
import type { Audience, Faq } from "@/content/types";
import type { PhotoKey } from "@/lib/images";
import { PageHero } from "./PageHero";

export type AudienceContent = {
  audience: Audience;
  path: string;
  crumb: string;
  label: string;
  title: string;
  lead: string;
  photo: PhotoKey;
  sidePhoto: PhotoKey;
  pointsTitle: string;
  points: { title: string; body: string }[];
  forTitle: string;
  forList: string[];
  faqs: Faq[];
  cta: string;
};

/** Residential and commercial share a layout; their words are their own. */
export function AudiencePage({ c }: { c: AudienceContent }) {
  const list = servicesFor(c.audience);
  return (
    <>
      <PageHero crumbs={[{ name: c.crumb, href: c.path }]} label={c.label} title={c.title} lead={c.lead} photo={c.photo}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/request-a-quote/">Get an Estimate</Button>
          <Button href={telHref} variant="line-light" icon="phone">
            {business.phone.display}
          </Button>
        </div>
      </PageHero>

      <section aria-labelledby="points-title" className="section-y bg-white">
        <div className="shell">
          <SectionHead id="points-title" label="Why it works" title={c.pointsTitle} />
          <Stagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {c.points.map((p, i) => (
              <Item key={p.title} className="draw-border rounded-[var(--radius-box)] border-[1.5px] border-rule p-6">
                <p className="font-display text-4xl font-bold text-blue">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="t-h3 mt-4">{p.title}</h3>
                <p className="mt-2 text-ink-soft">{p.body}</p>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section aria-labelledby="for-title" className="dark section-y bg-charcoal text-white">
        <div className="shell grid items-center gap-12 lg:grid-cols-12">
          <Reveal x={-24} className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-box)] bg-charcoal-3 lg:col-span-6">
            <Photo name={c.sidePhoto} width={1000} sizes="(min-width: 1024px) 45vw, 100vw" />
          </Reveal>
          <div className="lg:col-span-6">
            <SectionHead dark id="for-title" label="Who it's for" title={c.forTitle} />
            <ul className="mt-8 border-t border-rule-dark">
              {c.forList.map((w) => (
                <li key={w} className="flex items-center gap-3 border-b border-rule-dark py-4 font-display text-lg">
                  <span aria-hidden="true" className="h-2 w-2 bg-lime" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="aud-services" className="section-y bg-off">
        <div className="shell">
          <SectionHead id="aud-services" label="Services" title="What we can help with." />
          <Stagger className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((s) => (
              <Item key={s.slug}>
                <ServiceTile service={s} index={services.indexOf(s)} />
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <FaqBlock items={c.faqs} label="Questions" title="Good to know." className="bg-white" />
      <FinalCta title={c.cta} />
    </>
  );
}
