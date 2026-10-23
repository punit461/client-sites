import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Item, Stagger } from "@/components/motion/Motion";
import { AreaChecker } from "@/components/sections/AreaChecker";
import { FinalCta } from "@/components/sections/FinalCta";
import { ServiceCard, toneAt } from "@/components/sections/ServicesGrid";
import { PageHero } from "@/components/templates/PageHero";
import { Button } from "@/components/ui/Buttons";
import { Icon } from "@/components/ui/Icon";
import { SectionHead } from "@/components/ui/SectionHead";
import { afterRequest, business, compactHours, telHref } from "@/config/business";
import { areas, getArea, isIndexable } from "@/content/areas";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getArea((await params).slug);
  if (!a) return {};
  return pageMetadata({
    title: `Plumbing in ${a.name}`,
    description: `Plumbing repairs, installations and maintenance in ${a.name} (${a.postalCodes.join(", ")}). How visits work and how to request a quote.`,
    path: `/service-areas/${a.slug}/`,
    photo: "plumberUnderBasin",
    // Kept out of search results until it has genuinely local content.
    noindex: !isIndexable(a),
  });
}

export default async function AreaPage({ params }: Props) {
  const area = getArea((await params).slug);
  if (!area) notFound();
  const confirm = area.coverage === "confirm";

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Service Areas", href: "/service-areas/" },
          { name: area.name, href: `/service-areas/${area.slug}/` },
        ]}
        eyebrow={`${area.region} · ${area.postalCodes.join(", ")}`}
        title={`Plumbing in ${area.name}`}
        lead={
          confirm
            ? `${area.name} is at the edge of our service area. We can sometimes reach it, depending on the job and our schedule — please get in touch to confirm before sending a request.`
            : `We carry out plumbing repairs, installations and maintenance for homes and businesses in ${area.name}.`
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          {confirm ? (
            <Button href={telHref} icon="phone">
              Call to confirm
            </Button>
          ) : (
            <Button href="/request-a-quote/">Request a Quote</Button>
          )}
          <Button href={telHref} variant="outline" icon="phone">
            {business.phone.display}
          </Button>
        </div>
      </PageHero>

      {area.localNotes.length ? (
        <section aria-labelledby="local-title" className="section-y bg-white">
          <div className="shell grid gap-10 lg:grid-cols-12">
            <SectionHead id="local-title" eyebrow="Local knowledge" title={`What we see in ${area.name}.`} className="lg:col-span-5" />
            <ul className="space-y-3 lg:col-span-7">
              {area.localNotes.map((n) => (
                <li key={n} className="rounded-[var(--radius-card)] bg-sage p-5 text-charcoal">
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="svc-title" className="section-y bg-white">
        <div className="shell">
          <SectionHead id="svc-title" eyebrow="Services" title={`Services in ${area.name}`} />
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Item key={s.slug}>
                <ServiceCard service={s} tone={toneAt(i, 4)} />
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section aria-labelledby="visit-title" className="section-y bg-sand">
        <div className="shell grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHead id="visit-title" eyebrow="Visits" title="How it works here." />
            <ol className="mt-8 space-y-3">
              {afterRequest.map((s, i) => (
                <li key={s} className="flex gap-4 rounded-[var(--radius-card)] bg-white p-4">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-teal text-sm font-bold text-white">{i + 1}</span>
                  <span className="text-charcoal">{s}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm text-stone">Visits are arranged within our opening hours: {compactHours()}.</p>
            <h2 className="t-label mt-10 text-clay">Nearby areas</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {areas
                .filter((a) => a.slug !== area.slug)
                .map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/service-areas/${a.slug}/`}
                      className="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-white px-3 text-sm font-semibold text-teal hover:bg-sage"
                    >
                      <Icon name="pin" className="h-3.5 w-3.5 text-clay" strokeWidth={1.8} />
                      {a.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <AreaChecker />
        </div>
      </section>

      <FinalCta title={`A plumbing problem in ${area.name}?`} />
    </>
  );
}
