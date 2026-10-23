import Link from "next/link";
import { Item, Stagger } from "@/components/motion/Motion";
import { Button } from "@/components/ui/Buttons";
import { Icon } from "@/components/ui/Icon";
import { SectionHead } from "@/components/ui/SectionHead";
import type { Service } from "@/content/types";

export function ServiceCard({ service, tone = "white" }: { service: Service; tone?: "white" | "sage" }) {
  return (
    <article
      className={`group relative flex h-full flex-col rounded-[var(--radius-card)] border p-6 transition-[transform,box-shadow] duration-300 ease-[var(--ease-flow)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] focus-within:-translate-y-1 focus-within:shadow-[var(--shadow-lift)] sm:p-7 ${
        tone === "sage" ? "border-sage-deep bg-sage" : "border-line-cool bg-white"
      }`}
    >
      <span
        className={`grid h-12 w-12 place-items-center rounded-full text-teal transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-8deg] ${
          tone === "sage" ? "bg-white" : "bg-sage"
        }`}
      >
        <Icon name={service.icon} className="h-[1.35rem] w-[1.35rem]" />
      </span>
      <h3 className="t-h3 mt-6">
        <Link href={`/services/${service.slug}/`} className="after:absolute after:inset-0 after:rounded-[var(--radius-card)] focus-visible:outline-none">
          {service.short}
        </Link>
      </h3>
      <p className={`mt-2.5 flex-1 text-[0.95rem] ${tone === "sage" ? "text-stone" : "text-muted"}`}>{service.summary}</p>
      <span aria-hidden="true" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal">
        <span className="underline-draw group-hover:bg-[length:100%_1.5px]">Explore Service</span>
        <Icon name="arrow" className="arrow h-4 w-4" strokeWidth={1.8} />
      </span>
    </article>
  );
}

/** Checkerboard of white and sage, so neighbours never share a tone. */
export const toneAt = (i: number, cols = 2): "white" | "sage" => ((Math.floor(i / cols) + i) % 2 === 0 ? "white" : "sage");

export function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <section aria-labelledby="services-title" className="section-y bg-white">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHead
              id="services-title"
              eyebrow="Our plumbing services"
              title="The Right Help for Your Plumbing Needs."
              lead="Each service starts the same way: find the real cause, explain it plainly, and agree the price before any work begins."
            />
            <Button href="/services/" variant="outline" className="mt-8">
              All services
            </Button>
          </div>
        </div>
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
          {services.map((s, i) => (
            <Item key={s.slug}>
              <ServiceCard service={s} tone={toneAt(i)} />
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
