import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Car, Navigation, Phone, TrainFront } from "lucide-react";
import { Breadcrumbs, Container, Icon, Label } from "@/components/ui/primitives";
import { Reveal } from "@/components/animations";
import { findLocation, locations } from "@/data/locations";
import { specialties } from "@/data/care";
import { doctors } from "@/data/doctors";
import { facilities } from "@/data/content";
import { group } from "@/data/group";

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = findLocation(slug);
  if (!location) return {};
  return {
    title: location.name,
    description: `${location.name} — ${location.address.join(", ")}. Opening hours, specialties and clinicians.`,
  };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = findLocation(slug);
  if (!location) notFound();

  const here = specialties.filter((s) => location.specialties.includes(s.slug));
  const team = doctors.filter((d) => d.locations.includes(location.slug));
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.mapsQuery)}`;

  return (
    <>
      {/* ------------------------------------------------------- hero */}
      <section className="relative isolate overflow-hidden bg-forest text-paper">
        <Image
          src={location.image}
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover opacity-35"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest via-forest/80 to-forest/60" aria-hidden />

        <Container wide className="py-14 sm:py-20">
          <div className="[&_a]:text-paper/70 [&_a:hover]:text-paper [&_span]:text-paper">
            <Breadcrumbs
              trail={[
                { label: "Home", href: "/" },
                { label: "Locations", href: "/locations" },
                { label: location.name },
              ]}
            />
          </div>

          <h1 className="display-xl max-w-3xl text-paper">{location.name}</h1>
          <p className="mt-4 text-[1.02rem] text-paper/75">{location.address.join(", ")}</p>

          <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3 text-[0.92rem] text-paper/75">
            {location.hours.map((h) => (
              <div key={h.days}>
                <dt className="text-[0.72rem] font-semibold uppercase tracking-wide text-mint">
                  {h.days}
                </dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-2.5">
            <Link
              href={`/book`}
              className="inline-flex items-center rounded-full bg-coral px-7 py-3.5 text-[0.9rem] font-semibold text-white transition hover:bg-coral-deep"
            >
              Book appointment
            </Link>
            <a
              href={`tel:${location.phoneDial}`}
              className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-6 py-3.5 text-[0.9rem] font-semibold text-paper transition hover:bg-paper hover:text-ink"
            >
              <Phone className="h-4 w-4" strokeWidth={1.9} aria-hidden />
              {location.phone}
            </a>
            <a
              href={directions}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-6 py-3.5 text-[0.9rem] font-semibold text-paper transition hover:bg-paper hover:text-ink"
            >
              <Navigation className="h-4 w-4" strokeWidth={1.9} aria-hidden />
              Directions
            </a>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16 [&>*]:min-w-0">
            <div className="space-y-12">
              <Reveal>
                <h2 className="display-md text-ink">Specialties here</h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2 [&>*]:min-w-0">
                  {here.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/specialties/${s.slug}`}
                        className="group flex min-w-0 items-center gap-3 rounded-[18px] border border-line bg-surface p-4 transition hover:border-forest/40"
                      >
                        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-mint text-forest">
                          <Icon name={s.icon} className="h-5 w-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[0.95rem] font-semibold text-ink">{s.name}</span>
                          <span className="block truncate text-[0.8rem] text-ink-faint">{s.blurb}</span>
                        </span>
                        <ArrowUpRight className="h-4 w-4 flex-none text-ink-faint group-hover:text-forest" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {team.length ? (
                <Reveal>
                  <h2 className="display-md text-ink">Clinicians at this clinic</h2>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2 [&>*]:min-w-0">
                    {team.map((d) => (
                      <li key={d.slug}>
                        <Link
                          href={`/doctors/${d.slug}`}
                          className="group flex min-w-0 items-center gap-3 rounded-[18px] border border-line bg-surface p-4 transition hover:border-forest/40"
                        >
                          <Image
                            src={d.portrait}
                            alt=""
                            width={48}
                            height={48}
                            className="h-12 w-12 flex-none rounded-full object-cover"
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block text-[0.95rem] font-semibold text-ink">{d.name}</span>
                            <span className="block truncate text-[0.8rem] text-ink-faint">
                              {d.specialtyName}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ) : null}

              <Reveal>
                <h2 className="display-md text-ink">Gallery</h2>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {facilities.slice(0, 6).map((f) => (
                    <figure key={f.label} className="group overflow-hidden rounded-[16px]">
                      <div className="relative aspect-4/3 overflow-hidden bg-surface-2">
                        <Image
                          src={f.image}
                          alt={f.alt}
                          fill
                          sizes="(max-width: 640px) 46vw, 22vw"
                          className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
                        />
                      </div>
                      <figcaption className="mt-2 text-[0.8rem] text-ink-soft">{f.label}</figcaption>
                    </figure>
                  ))}
                </div>
              </Reveal>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-[20px] border border-line bg-surface p-6">
                <h2 className="label text-forest">Facilities</h2>
                <ul className="mt-4 space-y-2">
                  {location.facilities.map((f) => (
                    <li key={f} className="flex gap-2.5 text-[0.9rem] text-ink-soft">
                      <Icon name="check" className="mt-0.5 h-4 w-4 flex-none text-forest" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[20px] border border-line bg-surface p-6">
                <h2 className="label text-forest">Getting here</h2>
                <p className="mt-4 flex gap-2.5 text-[0.9rem] leading-relaxed text-ink-soft">
                  <Car className="mt-0.5 h-4 w-4 flex-none text-forest" strokeWidth={1.7} aria-hidden />
                  {location.parking}
                </p>
                <p className="mt-3 flex gap-2.5 text-[0.9rem] leading-relaxed text-ink-soft">
                  <TrainFront className="mt-0.5 h-4 w-4 flex-none text-forest" strokeWidth={1.7} aria-hidden />
                  {location.transport}
                </p>
              </div>

              <div className="rounded-[20px] border border-line bg-surface p-6">
                <h2 className="label text-forest">Other clinics</h2>
                <ul className="mt-4 space-y-2.5">
                  {locations
                    .filter((l) => l.slug !== location.slug)
                    .map((l) => (
                      <li key={l.slug}>
                        <Link
                          href={`/locations/${l.slug}`}
                          className="text-[0.9rem] text-ink hover:text-coral-deep"
                        >
                          {l.name}
                          <span className="block text-[0.78rem] text-ink-faint">{l.area}</span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
