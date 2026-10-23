import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Item, Stagger } from "@/components/motion/Motion";
import { FinalCta } from "@/components/sections/FinalCta";
import { ServiceTile } from "@/components/sections/ServiceBento";
import { PageHero } from "@/components/templates/PageHero";
import { Button } from "@/components/ui/Buttons";
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
    description: `Plumbing repairs, installations and maintenance in ${a.name} (${a.postalCodes.join(", ")}). How visits work and how to get an estimate.`,
    path: `/service-areas/${a.slug}/`,
    photo: "plumberUnderBasin",
    // Indexed only once it has genuinely local content.
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
        label={`${area.region} · ${area.postalCodes.join(", ")}`}
        title={`Plumbing in ${area.name}`}
        lead={
          confirm
            ? `${area.name} is at the edge of our service area. We can sometimes reach it depending on the job and our schedule — please contact us to confirm before sending a request.`
            : `We handle plumbing repairs, installations and maintenance for homes and businesses in ${area.name}.`
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          {confirm ? (
            <Button href={telHref} icon="phone">
              Call to confirm
            </Button>
          ) : (
            <Button href="/request-a-quote/">Get an Estimate</Button>
          )}
          <Button href={telHref} variant="line-light" icon="phone">
            {business.phone.display}
          </Button>
        </div>
      </PageHero>

      {area.localNotes.length ? (
        <section aria-labelledby="local-title" className="section-y bg-white">
          <div className="shell grid gap-10 lg:grid-cols-12">
            <SectionHead id="local-title" label="Local knowledge" title={`What we see in ${area.name}.`} className="lg:col-span-5" />
            <ul className="border-t-2 border-charcoal lg:col-span-7">
              {area.localNotes.map((n) => (
                <li key={n} className="border-b border-rule py-5 font-display text-lg">
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="svc-title" className="section-y bg-off">
        <div className="shell">
          <SectionHead id="svc-title" label="Services" title={`Services in ${area.name}`} />
          <Stagger className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Item key={s.slug}>
                <ServiceTile service={s} index={i} />
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section aria-labelledby="visit-title" className="section-y bg-white">
        <div className="shell grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHead id="visit-title" label="Visits" title="How it works here." />
            <ol className="mt-8 border-t-2 border-charcoal">
              {afterRequest.map((s, i) => (
                <li key={s} className="flex gap-4 border-b border-rule py-4">
                  <span className="font-display font-bold text-blue">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm text-ink-soft">Visits are arranged within our opening hours: {compactHours()}.</p>
          </div>
          <div>
            <h2 className="t-label">Postal codes</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {area.postalCodes.map((p) => (
                <li key={p} className="rounded-[4px] bg-charcoal px-3 py-1.5 font-display font-semibold text-white">
                  {p}
                </li>
              ))}
            </ul>
            <h2 className="t-label mt-10">Nearby</h2>
            <ul className="mt-3 flex flex-wrap gap-x-6">
              {areas
                .filter((a) => a.slug !== area.slug)
                .map((a) => (
                  <li key={a.slug}>
                    <Link href={`/service-areas/${a.slug}/`} className="inline-flex min-h-11 items-center font-display font-semibold underline-offset-4 hover:underline">
                      {a.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>

      <FinalCta title={`Plumbing problem in ${area.name}?`} />
    </>
  );
}
