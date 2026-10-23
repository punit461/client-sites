import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Item, Stagger } from "@/components/motion/Motion";
import { ArrowLink } from "@/components/ui/Buttons";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { SectionHead } from "@/components/ui/SectionHead";
import type { Service } from "@/content/types";

/** Spans for the asymmetric grid; entries with a photo get the bigger tiles. */
const layout: { span: string; photo?: boolean }[] = [
  { span: "lg:col-span-6 lg:row-span-2", photo: true },
  { span: "lg:col-span-3" },
  { span: "lg:col-span-3" },
  { span: "lg:col-span-3" },
  { span: "lg:col-span-3" },
  { span: "lg:col-span-4", photo: true },
  { span: "lg:col-span-4" },
  { span: "lg:col-span-4" },
];

export function ServiceTile({ service, index, photo = false }: { service: Service; index: number; photo?: boolean }) {
  const href = `/services/${service.slug}/`;
  if (photo)
    return (
      <article className="group dark relative flex h-full min-h-[20rem] flex-col justify-end overflow-hidden rounded-[var(--radius-box)] bg-charcoal text-white">
        <div className="zoom absolute inset-0">
          <Photo name={service.photo} width={1100} sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/55 to-charcoal/0" />
        <div className="relative p-6 sm:p-8">
          <p className="t-label text-lime">{String(index + 1).padStart(2, "0")} · {service.need}</p>
          <h3 className="t-h3 mt-3 text-2xl sm:text-3xl">
            <Link href={href} className="after:absolute after:inset-0">
              {service.name}
            </Link>
          </h3>
          <p className="mt-3 max-w-md text-white">{service.summary}</p>
          <span aria-hidden="true" className="mt-5 inline-grid h-11 w-11 place-items-center rounded-[var(--radius-box)] bg-lime text-charcoal">
            <ArrowUpRight className="nudge-up h-5 w-5 transition-transform duration-200" strokeWidth={2.2} />
          </span>
        </div>
      </article>
    );

  return (
    <article className="draw-border group relative flex h-full flex-col rounded-[var(--radius-box)] border-[1.5px] border-rule bg-white p-6 transition-colors duration-200 hover:border-charcoal">
      <div className="flex items-start justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-[var(--radius-box)] bg-off text-blue transition-colors duration-200 group-hover:bg-blue group-hover:text-white">
          <Icon name={service.icon} className="h-6 w-6" />
        </span>
        <span className="t-label text-ink-soft">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <h3 className="t-h3 mt-6">
        <Link href={href} className="after:absolute after:inset-0">
          {service.name}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-[0.95rem] text-ink-soft">{service.summary}</p>
      <ArrowUpRight aria-hidden="true" className="nudge-up mt-5 h-5 w-5 text-blue transition-transform duration-200" strokeWidth={2.2} />
    </article>
  );
}

export function ServiceBento({ services }: { services: Service[] }) {
  return (
    <section aria-labelledby="services-title" className="section-y bg-white">
      <div className="shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHead
            id="services-title"
            label="Services"
            title="From a slow drain to a new sewer line."
            lead="Every job starts the same way: find the real cause, explain every step, agree the price up front."
          />
          <ArrowLink href="/services/" className="shrink-0">
            All services
          </ArrowLink>
        </div>
        <Stagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:auto-rows-[minmax(14rem,auto)] lg:grid-cols-12 lg:gap-4">
          {services.map((s, i) => {
            const l = layout[i] ?? { span: "lg:col-span-4" };
            return (
              <Item key={s.slug} className={`${l.span} ${l.photo && i === 0 ? "sm:col-span-2" : ""}`}>
                <ServiceTile service={s} index={i} photo={l.photo} />
              </Item>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
