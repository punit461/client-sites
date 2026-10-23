import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Item, Reveal, Stagger } from "@/components/motion/Motion";
import { FaqBlock } from "@/components/sections/FaqBlock";
import { FinalCta } from "@/components/sections/FinalCta";
import { ServiceTile } from "@/components/sections/ServiceBento";
import { PageHero } from "@/components/templates/PageHero";
import { Button } from "@/components/ui/Buttons";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHead } from "@/components/ui/SectionHead";
import { business, telHref } from "@/config/business";
import { areas, listNames } from "@/content/areas";
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
  const covered = areas.filter((a) => a.coverage === "covered").map((a) => a.name);

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Services", href: "/services/" },
          { name: service.name, href: `/services/${service.slug}/` },
        ]}
        label={service.need}
        title={service.name}
        lead={service.intro}
        photo={service.photo}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={`/request-a-quote/?service=${service.slug}`}>Get an Estimate</Button>
          <Button href={telHref} variant="line-light" icon="phone">
            {business.phone.display}
          </Button>
        </div>
      </PageHero>

      <section aria-labelledby="signs-title" className="section-y bg-white">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <SectionHead id="signs-title" label="Signs" title="You might need this if…" className="lg:col-span-4" />
          <Stagger className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
            {service.signs.map((sign) => (
              <Item key={sign} className="flex items-start gap-3 rounded-[var(--radius-box)] border-[1.5px] border-rule p-5">
                <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 bg-blue" />
                <span className="font-display font-medium">{sign}</span>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section aria-labelledby="includes-title" className="dark section-y bg-charcoal text-white">
        <div className="shell">
          <SectionHead dark id="includes-title" label="What's included" title="What we take care of." />
          <Stagger className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-box)] bg-rule-dark sm:grid-cols-2 lg:grid-cols-4">
            {service.includes.map((x, i) => (
              <Item key={x.title} className="bg-charcoal p-6">
                <p className="font-display text-4xl font-bold text-lime">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="t-h3 mt-4">{x.title}</h3>
                <p className="mt-2 text-gray">{x.body}</p>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section aria-labelledby="process-title" className="section-y bg-off">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHead id="process-title" label="How it goes" title="The visit, step by step." />
            <ol className="mt-10 border-t-2 border-charcoal">
              {service.process.map((step, i) => (
                <li key={step} className="flex items-center gap-5 border-b border-rule py-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[4px] bg-charcoal font-display font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="font-display text-lg font-medium">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <Reveal x={24} className="lg:col-span-5">
            <aside aria-labelledby="safety-title" className="dark rounded-[var(--radius-box)] bg-blue p-7 text-white sm:p-9">
              <h3 id="safety-title" className="t-label flex items-center gap-2 text-white">
                <Icon name="alert" className="h-4 w-4 text-lime" strokeWidth={2.2} />
                While you wait
              </h3>
              <p className="mt-4 font-display text-xl leading-snug font-medium">{service.safety}</p>
              <p className="mt-5 text-sm text-white">
                Please don&apos;t attempt repairs on pressurized pipes, gas appliances or electrics.
              </p>
              <Button href={telHref} variant="lime" icon="phone" className="mt-6">
                Call {business.phone.display}
              </Button>
            </aside>
          </Reveal>
        </div>
      </section>

      {work.length ? (
        <section aria-labelledby="work-title" className="section-y bg-white">
          <div className="shell">
            <SectionHead id="work-title" label="Related work" title="What this work looks like." />
            <ul className="mt-10 grid gap-4 sm:grid-cols-3">
              {work.map((p) => (
                <li key={p.slug}>
                  <Link href={`/projects/${p.slug}/`} className="group block">
                    <span className="t-label text-ink-soft">{p.category}</span>
                    <span className="mt-1 block font-display text-lg font-semibold group-hover:text-blue">{p.title}</span>
                    <span className="mt-1 block text-sm text-ink-soft">{p.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <FaqBlock items={service.faqs} title={`About ${service.need.toLowerCase()}`} label="Questions" className="bg-off" />
      <JsonLd data={faqJsonLd(service.faqs)} />

      {related.length ? (
        <section aria-labelledby="related-title" className="section-y bg-white">
          <div className="shell">
            <SectionHead
              id="related-title"
              label="Related"
              title="Often needed alongside."
              lead={`Available across ${listNames(covered)}.`}
            />
            <Stagger className="mt-10 grid gap-3 md:grid-cols-3">
              {related.map((r) => (
                <Item key={r.slug}>
                  <ServiceTile service={r} index={services.indexOf(r)} />
                </Item>
              ))}
            </Stagger>
          </div>
        </section>
      ) : null}

      <FinalCta title={`Need help with ${service.need.toLowerCase()}?`} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.name,
          description: service.summary,
          url: absolute(`/services/${service.slug}/`),
          provider: { "@id": `${absolute("/")}#business` },
          areaServed: covered.map((name) => ({ "@type": "Place", name })),
        }}
      />
    </>
  );
}
