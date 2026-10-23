import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { FinalCta } from "@/components/sections/FinalCta";
import { ServiceAreaSection } from "@/components/sections/ServiceAreaSection";
import { PageHero } from "@/components/templates/PageHero";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { business } from "@/config/business";
import { areaNames, areas, listNames, servicesIn } from "@/content/areas";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Service Areas",
  description: `${business.name} works in ${listNames(areaNames)}. See which services are available in your area and how to check coverage.`,
  path: "/service-areas/",
  photo: "yardExcavation",
});

export default function ServiceAreasPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Service Areas", href: "/service-areas/" }]}
        eyebrow="Service areas"
        title="The areas we cover."
        lead={
          business.address
            ? "We work across the areas below. If you are close by but not listed, ask — we will tell you honestly whether we can reach you."
            : "We are a mobile plumbing service: we come to you, and there is no walk-in office. If you are close to these areas but not listed, ask — we will tell you honestly whether we can reach you."
        }
      />

      <section aria-labelledby="area-list-title" className="section-y">
        <div className="shell">
          <SectionHeading id="area-list-title" eyebrow="Coverage" title="Find your area." />
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((a) => {
              const available = servicesIn(a);
              return (
                <StaggerItem key={a.slug}>
                  <Link
                    href={`/service-areas/${a.slug}/`}
                    className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                  >
                    <span className="flex items-center gap-3">
                      <Icon name="pin" className="h-5 w-5 text-copper-ink" />
                      <span className="t-h3 text-navy">{a.name}</span>
                    </span>
                    <span className="mt-2 text-sm text-slate">
                      {a.region} · {a.postalCodes.join(", ")}
                    </span>
                    <span className="mt-4 flex-1 text-[0.95rem] text-slate">
                      {available.length === services.length
                        ? "All of our services are available here."
                        : `${available.length} of our ${services.length} services are available here.`}
                    </span>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy">
                      <span className="link-underline">Area details</span>
                      <Icon name="arrow" className="arrow h-4 w-4" strokeWidth={1.8} />
                    </span>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <ServiceAreaSection />
      <FinalCta title="In our area? Tell us what's going on." />
    </>
  );
}
