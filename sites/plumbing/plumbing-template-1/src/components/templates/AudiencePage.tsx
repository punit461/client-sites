import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ButtonLink } from "@/components/ui/ArrowLink";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
  commitmentsTitle: string;
  commitments: { icon: IconName; title: string; body: string }[];
  whoTitle: string;
  who: string[];
  faqs: Faq[];
  ctaTitle: string;
};

/** Residential and commercial pages share a structure, not their words. */
export function AudiencePage({ c }: { c: AudienceContent }) {
  return (
    <>
      <PageHero crumbs={[{ name: c.crumb, href: c.path }]} eyebrow={c.eyebrow} title={c.title} lead={c.lead} photo={c.photo}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/request-a-quote/">Request a Quote</ButtonLink>
          <ButtonLink href={telHref} variant="outline" icon="phone">
            {business.phone.display}
          </ButtonLink>
        </div>
      </PageHero>

      <section aria-labelledby="commit-title" className="section-y">
        <div className="shell">
          <SectionHeading id="commit-title" eyebrow="How we work" title={c.commitmentsTitle} />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.commitments.map((item) => (
              <StaggerItem key={item.title} className="rounded-2xl border border-line bg-white p-6">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-ivory text-copper-ink">
                  <Icon name={item.icon} className="h-[1.35rem] w-[1.35rem]" />
                </span>
                <h3 className="t-h3 mt-5 text-navy">{item.title}</h3>
                <p className="mt-2 text-[0.95rem] text-slate">{item.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section aria-labelledby="who-title" className="section-y bg-ivory-2/60">
        <div className="shell grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-sand lg:col-span-6">
            <Photo name={c.sidePhoto} width={1000} sizes="(min-width: 1024px) 36rem, 100vw" />
          </Reveal>
          <div className="lg:col-span-6">
            <SectionHeading id="who-title" eyebrow="Who we help" title={c.whoTitle} />
            <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
              {c.who.map((w) => (
                <li key={w} className="flex items-center gap-3 border-b border-line py-3.5 text-navy">
                  <Icon name="check" className="h-5 w-5 shrink-0 text-copper-ink" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="aud-services-title" className="pt-20 sm:pt-28">
        <div className="shell">
          <SectionHeading id="aud-services-title" eyebrow="Services" title="What we can help with." />
        </div>
      </section>
      <div className="-mt-8 sm:-mt-12">
        <ServicesGrid services={servicesFor(c.audience)} heading={false} />
      </div>

      <FaqSection faqs={c.faqs} eyebrow="Questions" title="Good to know." />
      <FinalCta title={c.ctaTitle} />
    </>
  );
}
