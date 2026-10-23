import { FinalCta } from "@/components/sections/FinalCta";
import { ServiceSelector } from "@/components/sections/ServiceSelector";
import { ServiceTile } from "@/components/sections/ServiceBento";
import { Item, Stagger } from "@/components/motion/Motion";
import { PageHero } from "@/components/templates/PageHero";
import { Button } from "@/components/ui/Buttons";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Plumbing Services",
  description:
    "Leaking pipes, blocked drains, water heaters, toilet and faucet repairs, new installations, bathroom plumbing, commercial plumbing and inspections.",
  path: "/services/",
  photo: "basinConnection",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Services", href: "/services/" }]}
        label="Services"
        title="Plumbing services, done properly."
        lead="Pick the problem closest to yours to see how we handle it — or describe it in an estimate request and we'll work it out together."
        photo="basinConnection"
      >
        <Button href="/request-a-quote/">Request an Estimate</Button>
      </PageHero>
      <section aria-label="All services" className="section-y bg-white">
        <div className="shell">
          <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {services.map((s, i) => (
              <Item key={s.slug}>
                <ServiceTile service={s} index={i} />
              </Item>
            ))}
          </Stagger>
        </div>
      </section>
      <ServiceSelector services={services} />
      <FinalCta />
    </>
  );
}
