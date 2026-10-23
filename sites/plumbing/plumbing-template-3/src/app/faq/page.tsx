import Link from "next/link";
import { FinalCta } from "@/components/sections/FinalCta";
import { PageHero } from "@/components/templates/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqs } from "@/content/faqs";
import { services } from "@/content/services";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Our services, requesting a quote, emergencies, service areas, preparing for a visit, estimates, maintenance and what to do about a leak.",
  path: "/faq/",
});

export default function FaqPage() {
  const general = faqs();
  return (
    <>
      <PageHero
        crumbs={[{ name: "FAQ", href: "/faq/" }]}
        eyebrow="FAQ"
        title="Questions, answered clearly."
        lead={
          <>
            Can&apos;t find what you need?{" "}
            <Link href="/contact/" className="font-semibold text-teal underline underline-offset-4">
              Get in touch
            </Link>
            .
          </>
        }
      />
      <section aria-labelledby="general" className="section-y bg-white">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <h2 id="general" className="t-h2 lg:col-span-4">
            General
          </h2>
          <div className="lg:col-span-8">
            <Accordion items={general} />
          </div>
        </div>
      </section>
      <section aria-labelledby="by-service" className="section-y bg-sand">
        <div className="shell">
          <h2 id="by-service" className="t-h2">
            By service
          </h2>
          <div className="mt-12 space-y-14">
            {services.map((s) => (
              <div key={s.slug} className="grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <h3 className="t-h3">{s.name}</h3>
                  <Link
                    href={`/services/${s.slug}/`}
                    className="inline-flex min-h-11 items-center text-sm font-semibold text-clay underline underline-offset-4"
                  >
                    About this service
                  </Link>
                </div>
                <div className="lg:col-span-8">
                  <Accordion items={s.faqs} level={4} tone="sand" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <JsonLd data={faqJsonLd([...general, ...services.flatMap((s) => s.faqs)])} />
      <FinalCta />
    </>
  );
}
