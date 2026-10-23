import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { FinalCta } from "@/components/sections/FinalCta";
import { ServiceCard } from "@/components/sections/ServicesGrid";
import { PageHero } from "@/components/templates/PageHero";
import { ButtonLink } from "@/components/ui/ArrowLink";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { business, compactHours, telHref } from "@/config/business";
import { areas, getArea, isIndexable, servicesIn } from "@/content/areas";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) return {};
  return pageMetadata({
    title: `Plumbing in ${area.name}`,
    description: `Plumbing repairs, installations and maintenance in ${area.name} (${area.postalCodes.join(", ")}). Services available, how visits work and how to request a quote.`,
    path: `/service-areas/${slug}/`,
    photo: "serviceVan",
    // A page with nothing local to say is kept out of search results.
    noindex: !isIndexable(area),
  });
}

export default async function AreaPage({ params }: Props) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  const available = servicesIn(area);
  const unavailable = services.filter((s) => !available.includes(s));
  const nearby = areas.filter((a) => a.slug !== area.slug);

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Service Areas", href: "/service-areas/" },
          { name: area.name, href: `/service-areas/${area.slug}/` },
        ]}
        eyebrow={`${area.region} · ${area.postalCodes.join(", ")}`}
        title={`Plumbing in ${area.name}`}
        lead={`We carry out plumbing repairs, installations and maintenance for homes and businesses in ${area.name}. Visits are arranged by phone or through a quote request${business.address ? "" : " — we come to you, and there is no walk-in office"}.`}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/request-a-quote/">Request a Quote</ButtonLink>
          <ButtonLink href={telHref} variant="outline" icon="phone">
            {business.phone.display}
          </ButtonLink>
        </div>
      </PageHero>

      {area.localNotes.length ? (
        <section aria-labelledby="local-title" className="section-y bg-white">
          <div className="shell grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading id="local-title" eyebrow="Local knowledge" title={`Plumbing in ${area.name}: what we see.`} />
            </div>
            <ul className="space-y-5 lg:col-span-7">
              {area.localNotes.map((n) => (
                <li key={n} className="flex gap-3 border-b border-line pb-5 text-navy">
                  <Icon name="check" className="mt-1 h-5 w-5 shrink-0 text-copper-ink" />
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="avail-title" className="section-y">
        <div className="shell">
          <SectionHeading
            id="avail-title"
            eyebrow="Available here"
            title={`Services in ${area.name}`}
            lead={
              unavailable.length
                ? `Not currently offered in ${area.name}: ${unavailable.map((s) => s.short).join(", ")}.`
                : undefined
            }
          />
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {available.map((s) => (
              <StaggerItem key={s.slug}>
                <ServiceCard service={s} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section aria-labelledby="visit-title" className="section-y bg-ivory-2/60">
        <div className="shell grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading id="visit-title" eyebrow="Visits" title={`Booking a visit in ${area.name}`} />
            <ul className="mt-8 space-y-4 text-navy">
              <li className="flex gap-3">
                <Icon name="clock" className="mt-0.5 h-5 w-5 shrink-0 text-copper-ink" />
                Visits are arranged within our opening hours: {compactHours()}.
              </li>
              <li className="flex gap-3">
                <Icon name="calendar" className="mt-0.5 h-5 w-5 shrink-0 text-copper-ink" />
                We confirm every appointment with you directly — a quote request on its own is not a booking.
              </li>
              <li className="flex gap-3">
                <Icon name="file" className="mt-0.5 h-5 w-5 shrink-0 text-copper-ink" />
                You get an upfront price before any work begins.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="t-h3 text-navy">Postal codes covered</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {area.postalCodes.map((p) => (
                <li key={p} className="rounded-md border border-line bg-white px-3 py-1.5 font-mono text-sm text-navy">
                  {p}
                </li>
              ))}
            </ul>
            <h2 className="t-h3 mt-10 text-navy">Nearby areas we cover</h2>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {nearby.map((a) => (
                <li key={a.slug}>
                  <Link href={`/service-areas/${a.slug}/`} className="link-underline inline-flex min-h-11 items-center font-semibold text-navy">
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
