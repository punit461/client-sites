import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container, Icon, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/animations";
import { locations } from "@/data/locations";
import { specialties } from "@/data/care";

export default function LocationsSection() {
  return (
    <section id="locations" className="py-16 sm:py-24">
      <Container wide>
        <SectionHeading
          label="Locations"
          title="Find a clinic near you"
          copy="Three clinics, each with its own specialties and opening hours."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {locations.map((location, i) => (
            <Reveal key={location.slug} delay={i * 0.08}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-forest/40 hover:shadow-[var(--shadow-lift)]">
                <div className="relative aspect-16/10 overflow-hidden">
                  <Image
                    src={location.image}
                    alt={location.alt}
                    fill
                    sizes="(max-width: 1024px) 92vw, 31vw"
                    className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-[1.3rem] font-semibold text-ink">
                    {location.name}
                  </h3>

                  <p className="mt-2 flex items-start gap-2 text-[0.85rem] leading-relaxed text-ink-soft">
                    <MapPin className="mt-0.5 h-4 w-4 flex-none text-forest" strokeWidth={1.7} aria-hidden />
                    {location.address.join(", ")}
                  </p>
                  <p className="mt-1.5 flex items-start gap-2 text-[0.85rem] text-ink-soft">
                    <Clock className="mt-0.5 h-4 w-4 flex-none text-forest" strokeWidth={1.7} aria-hidden />
                    {location.hours[0].time}, {location.hours[0].days}
                  </p>

                  <ul className="mt-4 flex flex-1 flex-wrap gap-1.5">
                    {location.specialties.slice(0, 4).map((slug) => {
                      const s = specialties.find((x) => x.slug === slug);
                      if (!s) return null;
                      return (
                        <li
                          key={slug}
                          className="inline-flex items-center gap-1.5 rounded-full bg-mint px-2.5 py-1 text-[0.72rem] text-forest"
                        >
                          <Icon name={s.icon} className="h-3 w-3" />
                          {s.name}
                        </li>
                      );
                    })}
                  </ul>

                  <Link
                    href={`/locations/${location.slug}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-[0.86rem] font-semibold text-forest transition-colors group-hover:text-coral-deep"
                  >
                    View location
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
