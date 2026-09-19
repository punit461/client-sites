import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Info } from "lucide-react";
import { Breadcrumbs, Container, Icon, Label } from "@/components/ui/primitives";
import { Reveal } from "@/components/animations";
import { findSpecialty, specialties, treatmentsFor } from "@/data/care";
import { doctorsFor } from "@/data/doctors";
import { locations } from "@/data/locations";
import { group } from "@/data/group";

export function generateStaticParams() {
  return specialties.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const specialty = findSpecialty(slug);
  if (!specialty) return {};
  return {
    title: specialty.name,
    description: specialty.intro,
    openGraph: { title: `${specialty.name} · ${group.fullName}`, images: [specialty.image] },
  };
}

export default async function SpecialtyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const specialty = findSpecialty(slug);
  if (!specialty) notFound();

  const treatments = treatmentsFor(specialty.slug);
  const doctors = doctorsFor(specialty.slug);
  const clinics = locations.filter((l) => l.specialties.includes(specialty.slug));

  return (
    <>
      <section className="border-b border-line bg-surface py-12 sm:py-16">
        <Container wide>
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Specialties", href: "/specialties" },
              { label: specialty.name },
            ]}
          />

          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14">
            <div>
              <Label>Specialty</Label>
              <h1 className="display-xl mt-4 text-ink">{specialty.name}</h1>
              <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-ink-soft">
                {specialty.intro}
              </p>
              <Link
                href={`/book?specialty=${specialty.slug}`}
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-forest px-7 py-4 text-[0.92rem] font-semibold text-paper transition hover:bg-forest-deep"
              >
                Book {specialty.name.toLowerCase()}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="relative aspect-4/3 overflow-hidden rounded-[24px] bg-surface-2">
              <Image
                src={specialty.image}
                alt={specialty.alt}
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 46vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16 [&>*]:min-w-0">
            <div className="space-y-12">
              {treatments.length ? (
                <Reveal>
                  <h2 className="display-md text-ink">Treatments</h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {treatments.map((t) => (
                      <Link
                        key={t.slug}
                        href={`/treatments/${t.slug}`}
                        className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-forest/40"
                      >
                        <div className="relative aspect-16/9 overflow-hidden">
                          <Image
                            src={t.image}
                            alt={t.alt}
                            fill
                            sizes="(max-width: 1024px) 92vw, 30vw"
                            className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-display text-[1.05rem] font-semibold text-ink">
                            {t.name}
                          </h3>
                          <p className="mt-1.5 text-[0.85rem] leading-relaxed text-ink-soft">
                            {t.summary}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </Reveal>
              ) : null}

              {doctors.length ? (
                <Reveal>
                  <h2 className="display-md text-ink">Clinicians</h2>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2 [&>*]:min-w-0">
                    {doctors.map((d) => (
                      <li key={d.slug}>
                        <Link
                          href={`/doctors/${d.slug}`}
                          className="group flex min-w-0 items-center gap-3 rounded-[18px] border border-line bg-surface p-4 transition hover:border-forest/40"
                        >
                          <Image
                            src={d.portrait}
                            alt=""
                            width={52}
                            height={52}
                            className="h-13 w-13 flex-none rounded-full object-cover"
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block text-[0.95rem] font-semibold text-ink">
                              {d.name}
                            </span>
                            <span className="block truncate text-[0.8rem] text-ink-faint">
                              {d.languages.join(", ")}
                            </span>
                          </span>
                          <ArrowUpRight className="h-4 w-4 flex-none text-ink-faint transition-colors group-hover:text-forest" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ) : null}

              <p className="flex items-start gap-2.5 rounded-2xl border border-line bg-surface p-5 text-[0.86rem] leading-relaxed text-ink-soft">
                <Info className="mt-0.5 h-4 w-4 flex-none text-forest" aria-hidden />
                <span>
                  This page is general information, not advice about your own situation. What is
                  appropriate for you can only be decided after a consultation.
                </span>
              </p>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-[20px] border border-line bg-surface p-6">
                <h2 className="label text-forest">Commonly asked about</h2>
                <ul className="mt-4 space-y-2">
                  {specialty.popular.map((p) => (
                    <li key={p} className="flex gap-2.5 text-[0.9rem] text-ink-soft">
                      <span className="mt-[0.45rem] h-1.5 w-1.5 flex-none rounded-full bg-mint-deep" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              {clinics.length ? (
                <div className="rounded-[20px] border border-line bg-surface p-6">
                  <h2 className="label text-forest">Available at</h2>
                  <ul className="mt-4 space-y-2.5">
                    {clinics.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/locations/${c.slug}`}
                          className="flex items-center gap-2 text-[0.9rem] text-ink hover:text-coral-deep"
                        >
                          <Icon name="mapPin" className="h-4 w-4 text-forest" />
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="rounded-[20px] border border-line bg-surface p-6">
                <h2 className="label text-forest">Other specialties</h2>
                <ul className="mt-4 space-y-2">
                  {specialties
                    .filter((s) => s.slug !== specialty.slug)
                    .slice(0, 5)
                    .map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/specialties/${s.slug}`}
                          className="flex items-center gap-2 text-[0.9rem] text-ink hover:text-coral-deep"
                        >
                          <Icon name={s.icon} className="h-4 w-4 text-forest" />
                          {s.name}
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
