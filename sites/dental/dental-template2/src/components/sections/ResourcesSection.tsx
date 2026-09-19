import { ArrowUpRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/animations";
import { resources } from "@/data/content";

export default function ResourcesSection({ limit = 3 }: { limit?: number }) {
  const shown = resources.slice(0, limit);

  return (
    <section id="resources" className="py-16 sm:py-24">
      <Container wide>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            label="Patient resources"
            title="Things worth reading beforehand"
            copy="Short, practical pages about appointments, preparation and aftercare."
          />
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 text-[0.9rem] font-semibold text-forest hover:text-coral-deep"
          >
            All resources
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((resource, i) => (
            <Reveal key={resource.slug} delay={i * 0.07}>
              <Link
                href={`/resources/${resource.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-forest/40 hover:shadow-[var(--shadow-lift)]"
              >
                <div className="relative aspect-16/10 overflow-hidden">
                  <Image
                    src={resource.image}
                    alt={resource.alt}
                    fill
                    sizes="(max-width: 1024px) 92vw, 31vw"
                    className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-paper/92 px-3 py-1 text-[0.7rem] font-semibold text-forest backdrop-blur">
                    {resource.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-[1.15rem] font-semibold text-ink">
                    {resource.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[0.88rem] leading-relaxed text-ink-soft">
                    {resource.excerpt}
                  </p>
                  <p className="mt-4 flex items-center gap-1.5 text-[0.78rem] text-ink-faint">
                    <Clock className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
                    {resource.readingTime}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
