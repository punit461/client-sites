import Link from "next/link";
import { Item, Stagger } from "@/components/motion/Motion";
import { AreaFinder } from "@/components/sections/AreaFinder";
import { FinalCta } from "@/components/sections/FinalCta";
import { PageHero } from "@/components/templates/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { business } from "@/config/business";
import { areas, listNames } from "@/content/areas";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Service Areas",
  description: `${business.name} works in ${listNames(areas.filter((a) => a.coverage === "covered").map((a) => a.name))}. Check your postal code.`,
  path: "/service-areas/",
  photo: "pipeRuns",
});

export default function AreasPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Service Areas", href: "/service-areas/" }]}
        label="Service areas"
        title="Where we work."
        lead={
          business.address
            ? "Check your postal code below, or browse the areas we cover."
            : "We're a mobile team — we come to you, and there's no walk-in office. Check your postal code below, or browse the areas we cover."
        }
      />
      <AreaFinder />
      <section aria-labelledby="list-title" className="section-y bg-white">
        <div className="shell">
          <SectionHead id="list-title" label="All areas" title="Areas we cover." />
          <Stagger className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((a) => (
              <Item key={a.slug}>
                <Link
                  href={`/service-areas/${a.slug}/`}
                  className="draw-border group flex h-full flex-col rounded-[var(--radius-box)] border-[1.5px] border-rule p-6 transition-colors hover:border-charcoal"
                >
                  <span className="t-label text-ink-soft">{a.region}</span>
                  <span className="mt-2 font-display text-2xl font-bold">{a.name}</span>
                  <span className="mt-2 text-sm text-ink-soft">Postal codes {a.postalCodes.join(", ")}</span>
                  <span
                    className={`t-label mt-5 self-start rounded-[4px] px-2.5 py-1.5 ${
                      a.coverage === "covered" ? "bg-lime text-charcoal" : "bg-off text-charcoal"
                    }`}
                  >
                    {a.coverage === "covered" ? "Covered" : "By arrangement"}
                  </span>
                </Link>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
