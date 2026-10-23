import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { FinalCta } from "@/components/sections/FinalCta";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { PageHero } from "@/components/templates/PageHero";
import { Icon } from "@/components/ui/Icon";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Plumbing Services",
  description:
    "Leak detection, drain cleaning, water heaters, fixtures, toilets, bathroom plumbing, sewer line inspection and preventive maintenance — with an upfront price before work begins.",
  path: "/services/",
  photo: "doubleVanity",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Services", href: "/services/" }]}
        eyebrow="Our services"
        title="Every plumbing job, done the same careful way."
        lead="Choose a service to see what it covers, how a visit runs and what to do while you wait. Not sure which you need? Describe the problem in a quote request and we will work it out with you."
        photo="doubleVanity"
      />
      <ServicesGrid services={services} heading={false} />
      <section aria-label="Services by property type" className="pb-8">
        <div className="shell grid gap-4 md:grid-cols-2">
          {[
            { href: "/residential-plumbing/", icon: "house" as const, title: "For homeowners", body: "Repairs, upgrades and bathroom plumbing in occupied homes." },
            { href: "/commercial-plumbing/", icon: "building" as const, title: "For businesses", body: "Planned and reactive plumbing for shops, offices and kitchens." },
          ].map((c) => (
            <Reveal key={c.href}>
              <Link
                href={c.href}
                className="group flex items-center gap-5 rounded-2xl border border-line bg-white p-6 transition-shadow hover:shadow-[var(--shadow-card)] sm:p-8"
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-ivory text-copper-ink">
                  <Icon name={c.icon} className="h-6 w-6" />
                </span>
                <span className="flex-1">
                  <span className="t-h3 block text-navy">{c.title}</span>
                  <span className="mt-1 block text-slate">{c.body}</span>
                </span>
                <Icon name="arrow" className="arrow h-5 w-5 text-navy" strokeWidth={1.8} />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <FinalCta />
    </>
  );
}
