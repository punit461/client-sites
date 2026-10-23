import Link from "next/link";
import { FinalCta } from "@/components/sections/FinalCta";
import { PageHero } from "@/components/templates/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/ui/JsonLd";
import { generalFaqs } from "@/content/faqs";
import { services } from "@/content/services";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers about our plumbing services, estimates, service areas, inspections, urgent leaks and how repair prices are prepared.",
  path: "/faq/",
});

export default function FaqPage() {
  const general = generalFaqs();
  const all = [...general, ...services.flatMap((s) => s.faqs)];

  return (
    <>
      <PageHero
        crumbs={[{ name: "FAQ", href: "/faq/" }]}
        eyebrow="FAQ"
        title="Frequently asked questions."
        lead={
          <>
            Can&apos;t find your answer? <Link href="/contact/" className="font-semibold text-navy underline underline-offset-4">Get in touch</Link> and we will help.
          </>
        }
      />

      <section aria-labelledby="general-title" className="section-y">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <h2 id="general-title" className="t-h2 text-navy lg:col-span-4">
            General
          </h2>
          <div className="lg:col-span-8">
            <Accordion items={general} />
          </div>
        </div>
      </section>

      {services.map((s) => (
        <section key={s.slug} aria-labelledby={`faq-${s.slug}`} className="pb-16 sm:pb-20">
          <div className="shell grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 id={`faq-${s.slug}`} className="t-h3 text-navy">
                {s.name}
              </h2>
              <Link href={`/services/${s.slug}/`} className="mt-1 inline-flex min-h-11 items-center text-sm font-semibold text-copper-ink underline underline-offset-4">
                About this service
              </Link>
            </div>
            <div className="lg:col-span-8">
              <Accordion items={s.faqs} />
            </div>
          </div>
        </section>
      ))}

      <JsonLd data={faqJsonLd(all)} />
      <FinalCta />
    </>
  );
}
