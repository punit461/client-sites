import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Item, Reveal, Stagger } from "@/components/motion/Motion";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { ProjectCard } from "@/components/sections/ProjectGallery";
import { ServiceCard } from "@/components/sections/ServicesGrid";
import { PageHero } from "@/components/templates/PageHero";
import { Button } from "@/components/ui/Buttons";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHead } from "@/components/ui/SectionHead";
import { business, telHref } from "@/config/business";
import { coveredAreas, listNames } from "@/content/areas";
import { projects } from "@/content/projects";
import { getService, relatedServices, services } from "@/content/services";
import { absolute, faqJsonLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return pageMetadata({ title: s.name, description: s.summary, path: `/services/${s.slug}/`, photo: s.photo });
}

export default async function ServicePage({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) notFound();
  const related = relatedServices(service);
  const work = projects.filter((p) => p.service === service.slug).slice(0, 3);

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Services", href: "/services/" },
          { name: service.name, href: `/services/${service.slug}/` },
        ]}
        eyebrow={service.audiences.length > 1 ? "Homes & businesses" : "For homeowners"}
        title={service.name}
        lead={service.intro}
        photo={service.photo}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={`/request-a-quote/?service=${service.slug}`}>Request a Quote</Button>
          <Button href={telHref} variant="outline" icon="phone">
            {business.phone.display}
          </Button>
        </div>
      </PageHero>

      <section aria-labelledby="signs-title" className="section-y bg-white">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <SectionHead id="signs-title" eyebrow="Signs to look for" title="You may need this if…" className="lg:col-span-4" />
          <Stagger className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
            {service.signs.map((sign) => (
              <Item key={sign} className="flex items-start gap-3 rounded-[var(--radius-card)] bg-sage p-5">
                <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-teal" strokeWidth={1.8} />
                <span className="text-charcoal">{sign}</span>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section aria-labelledby="includes-title" className="section-y bg-sand">
        <div className="shell">
          <SectionHead id="includes-title" eyebrow="What's included" title="What this service covers." />
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.includes.map((x, i) => (
              <Item key={x.title} className="rounded-[var(--radius-card)] border border-line bg-white p-6">
                <p className="font-display text-sm font-bold text-clay">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="t-h3 mt-3">{x.title}</h3>
                <p className="mt-2 text-muted">{x.body}</p>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section aria-labelledby="steps-title" className="section-y bg-white">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHead id="steps-title" eyebrow="How a visit runs" title="Step by step." />
            <ol className="relative mt-10 space-y-6 before:absolute before:top-5 before:bottom-5 before:left-5 before:w-px before:bg-line-cool">
              {service.steps.map((step, i) => (
                <li key={step} className="relative flex items-center gap-5">
                  <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-teal font-display text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-lg text-charcoal">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <Reveal className="lg:col-span-6">
            <aside aria-labelledby="meanwhile-title" className="on-teal rounded-[var(--radius-photo)] bg-teal p-7 text-sage sm:p-9">
              <h3 id="meanwhile-title" className="t-h3 flex items-center gap-3">
                <Icon name="alert" className="h-6 w-6 text-terracotta" strokeWidth={1.7} />
                While you wait
              </h3>
              <p className="mt-4 text-lg">{service.meanwhile}</p>
              <p className="mt-5 text-sm">Please don&apos;t attempt repairs on pressurized pipes, gas appliances or electrics.</p>
              <Button href={telHref} variant="light" icon="phone" className="mt-6">
                Call {business.phone.display}
              </Button>
            </aside>
          </Reveal>
        </div>
      </section>

      <FaqSection items={service.faqs} eyebrow="Questions" title={`About ${service.short.toLowerCase()}`} tone="sand" />
      <JsonLd data={faqJsonLd(service.faqs)} />

      {work.length ? (
        <section aria-labelledby="work-title" className="section-y bg-white">
          <div className="shell">
            <SectionHead id="work-title" eyebrow="Related work" title="What this work looks like." />
            <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {work.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {related.length ? (
        <section aria-labelledby="related-title" className="section-y bg-white">
          <div className="shell">
            <SectionHead
              id="related-title"
              eyebrow="Related services"
              title="Often needed alongside."
              lead={
                <>
                  Available in {listNames(coveredAreas.map((a) => a.name))}.{" "}
                  <Link href="/service-areas/" className="font-semibold text-teal underline underline-offset-4">
                    Check your area
                  </Link>
                  .
                </>
              }
            />
            <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
              {related.map((r, i) => (
                <Item key={r.slug}>
                  <ServiceCard service={r} tone={i === 1 ? "sage" : "white"} />
                </Item>
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
          url: absolute(`/services/${service.slug}/`),
          provider: { "@id": `${absolute("/")}#business` },
          areaServed: coveredAreas.map((a) => ({ "@type": "Place", name: `${a.name}, ${a.region}` })),
        }}
      />
    </>
  );
}
