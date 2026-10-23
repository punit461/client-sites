import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { FinalCta } from "@/components/sections/FinalCta";
import { ServiceCard } from "@/components/sections/ServicesGrid";
import { PageHero } from "@/components/templates/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/ArrowLink";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { business, telHref } from "@/config/business";
import { areas, listNames, servicesIn } from "@/content/areas";
import { getService, relatedServices, services } from "@/content/services";
import { absolute, faqJsonLd, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({ title: service.name, description: service.summary, path: `/services/${slug}/`, photo: service.photo });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = relatedServices(service);
  const coveredIn = areas.filter((a) => servicesIn(a).some((s) => s.slug === service.slug));

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Services", href: "/services/" },
          { name: service.name, href: `/services/${service.slug}/` },
        ]}
        eyebrow={service.audiences.length === 2 ? "Residential & commercial" : "Residential"}
        title={service.name}
        lead={service.intro}
        photo={service.photo}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={`/request-a-quote/?service=${service.slug}`}>Request a Quote</ButtonLink>
          <ButtonLink href={telHref} variant="outline" icon="phone">
            {business.phone.display}
          </ButtonLink>
        </div>
      </PageHero>

      <section aria-labelledby="signs-title" className="section-y">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="signs-title" eyebrow="Signs to look for" title="When to call us about this." />
          </div>
          <Stagger className="grid gap-x-8 sm:grid-cols-2 lg:col-span-7">
            {service.signs.map((sign) => (
              <StaggerItem key={sign} className="flex items-start gap-3 border-b border-line py-4">
                <Icon name="check" className="mt-1 h-5 w-5 shrink-0 text-copper-ink" />
                <span className="text-navy">{sign}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section aria-labelledby="scope-title" className="section-y bg-white">
        <div className="shell">
          <SectionHeading id="scope-title" eyebrow="What's included" title="What this service covers." />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.scope.map((item, i) => (
              <StaggerItem key={item.title} className="rounded-2xl border border-line bg-ivory p-6">
                <p className="font-display text-sm font-bold text-copper-ink">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="t-h3 mt-3 text-navy">{item.title}</h3>
                <p className="mt-2 text-[0.95rem] text-slate">{item.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section aria-labelledby="approach-title" className="section-y">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading id="approach-title" eyebrow="How a visit runs" title="Our approach." />
            <ol className="mt-10 space-y-6">
              {service.approach.map((step, i) => (
                <li key={step} className="flex gap-5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-navy font-display text-sm font-bold">
                    {i + 1}
                  </span>
                  <span className="pt-1.5 text-navy">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <Reveal className="lg:col-span-6">
            <aside aria-labelledby="meanwhile-title" className="on-dark rounded-2xl bg-navy p-7 text-ivory sm:p-9">
              <h3 id="meanwhile-title" className="t-h3 flex items-center gap-3">
                <Icon name="alert" className="h-6 w-6 text-copper-soft" />
                While you wait
              </h3>
              <p className="mt-4 text-ivory/80">{service.meanwhile}</p>
              <p className="mt-6 text-sm text-ivory/60">
                Please don&apos;t attempt repairs on pressurized pipes, gas appliances or electrics. Make things safe, then call.
              </p>
              <a href={telHref} className="btn btn-primary mt-7">
                <Icon name="phone" className="h-4 w-4" strokeWidth={1.8} />
                Call {business.phone.display}
              </a>
            </aside>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="service-faq-title" className="section-y bg-white">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="service-faq-title" eyebrow="Questions" title={`About ${service.short.toLowerCase()}`} />
            <p className="mt-6 text-slate">
              Available in {listNames(coveredIn.map((a) => a.name))}.{" "}
              <Link href="/service-areas/" className="font-semibold text-navy underline underline-offset-4">
                See our service area
              </Link>
              .
            </p>
          </div>
          <div className="lg:col-span-8">
            <Accordion items={service.faqs} />
          </div>
        </div>
        <JsonLd data={faqJsonLd(service.faqs)} />
      </section>

      {related.length ? (
        <section aria-labelledby="related-title" className="section-y">
          <div className="shell">
            <SectionHeading id="related-title" eyebrow="Related" title="Often needed alongside." />
            <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
              {related.map((r) => (
                <StaggerItem key={r.slug}>
                  <ServiceCard service={r} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      ) : null}

      <FinalCta title={`Need help with ${service.short.toLowerCase()}?`} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.name,
          description: service.summary,
          serviceType: service.name,
          url: absolute(`/services/${service.slug}/`),
          provider: { "@id": `${absolute("/")}#business` },
          areaServed: coveredIn.map((a) => ({ "@type": "Place", name: `${a.name}, ${a.region}` })),
        }}
      />
    </>
  );
}
