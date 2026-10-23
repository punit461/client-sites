import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TextLink } from "@/components/ui/ArrowLink";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Service } from "@/content/types";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-[transform,box-shadow,border-color] duration-300 ease-[var(--ease-out-quint)] hover:-translate-y-1 hover:border-sand hover:shadow-[var(--shadow-lift)] focus-within:-translate-y-1 focus-within:shadow-[var(--shadow-lift)] sm:p-7">
      <span className="grid h-12 w-12 place-items-center rounded-full border border-line text-copper-ink transition-[transform,background-color,color,border-color] duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-6deg] group-hover:border-navy group-hover:bg-navy group-hover:text-copper-soft">
        <Icon name={service.icon} className="h-[1.35rem] w-[1.35rem]" />
      </span>
      <h3 className="t-h3 mt-6 text-navy">
        {/* The whole card is clickable through this link's ::after. */}
        <Link href={`/services/${service.slug}/`} className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none">
          {service.short}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-[0.95rem] text-slate">{service.summary}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy" aria-hidden="true">
        <span className="link-underline group-hover:bg-[length:100%_1px]">Learn more</span>
        <Icon name="arrow" className="arrow h-4 w-4" strokeWidth={1.8} />
      </span>
    </article>
  );
}

export function ServicesGrid({
  services,
  heading = true,
}: {
  services: Service[];
  heading?: boolean;
}) {
  return (
    <section aria-labelledby={heading ? "services-title" : undefined} className="section-y">
      <div className="shell">
        {heading ? (
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              id="services-title"
              eyebrow="What we do"
              title="Plumbing services, handled properly."
              lead="From a dripping faucet to a full bathroom rough-in — each service starts with understanding the problem, not guessing at it."
            />
            <TextLink href="/services/" className="shrink-0 text-navy">
              View all services
            </TextLink>
          </div>
        ) : null}
        <Stagger className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5 ${heading ? "mt-12 lg:mt-14" : ""}`}>
          {services.map((s) => (
            <StaggerItem key={s.slug}>
              <ServiceCard service={s} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
