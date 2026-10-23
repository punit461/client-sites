import Link from "next/link";
import { Item, Stagger } from "@/components/motion/Motion";
import { FinalCta } from "@/components/sections/FinalCta";
import { ServiceCard, toneAt } from "@/components/sections/ServicesGrid";
import { PageHero } from "@/components/templates/PageHero";
import { Button } from "@/components/ui/Buttons";
import { Icon } from "@/components/ui/Icon";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Plumbing Services",
  description:
    "Leak detection, drain cleaning, water heaters, toilet and faucet repair, bathroom plumbing, pipe replacement, sewer lines and preventive maintenance.",
  path: "/services/",
  photo: "basinSupply",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Services", href: "/services/" }]}
        eyebrow="Our services"
        title="The right help for your plumbing needs."
        lead="Choose a service to see what it covers, how a visit runs, and what to do while you wait. Not sure which you need? Describe the problem in a quote request and we'll work it out together."
        photo="basinSupply"
      >
        <Button href="/request-a-quote/">Request a Quote</Button>
      </PageHero>
      <section aria-label="All services" className="section-y bg-white">
        <div className="shell">
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Item key={s.slug}>
                <ServiceCard service={s} tone={toneAt(i, 4)} />
              </Item>
            ))}
          </Stagger>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {[
              { href: "/residential-plumbing/", icon: "house" as const, title: "For homeowners", body: "Repairs, upgrades and bathroom plumbing at home." },
              { href: "/commercial-plumbing/", icon: "building" as const, title: "For businesses", body: "Repairs and planned maintenance for your premises." },
            ].map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="group flex items-center gap-5 rounded-[var(--radius-card)] border border-line-cool bg-sand p-6 transition-shadow hover:shadow-[var(--shadow-soft)] sm:p-8"
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white text-teal">
                  <Icon name={c.icon} className="h-6 w-6" />
                </span>
                <span className="flex-1">
                  <span className="t-h3 block text-teal">{c.title}</span>
                  <span className="mt-1 block text-stone">{c.body}</span>
                </span>
                <Icon name="arrow" className="arrow h-5 w-5 text-teal" strokeWidth={1.8} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
