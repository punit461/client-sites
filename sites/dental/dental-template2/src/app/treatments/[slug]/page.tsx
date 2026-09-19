import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, Info } from "lucide-react";
import { Breadcrumbs, Container, Label } from "@/components/ui/primitives";
import { Reveal } from "@/components/animations";
import { findSpecialty, findTreatment, treatments } from "@/data/care";
import { doctorsFor } from "@/data/doctors";
import { group } from "@/data/group";

export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const treatment = findTreatment(slug);
  if (!treatment) return {};
  return {
    title: treatment.name,
    description: treatment.summary,
    openGraph: { title: `${treatment.name} · ${group.fullName}`, images: [treatment.image] },
  };
}

export default async function TreatmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const treatment = findTreatment(slug);
  if (!treatment) notFound();

  const specialty = findSpecialty(treatment.specialty);
  const clinicians = doctorsFor(treatment.specialty);
  const others = treatments.filter((t) => t.slug !== treatment.slug).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: treatment.name,
    description: treatment.whatItIs,
    provider: { "@type": "MedicalClinic", name: group.fullName },
  };

  return (
    <>
      <section className="border-b border-line bg-surface py-12 sm:py-16">
        <Container wide>
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Treatments", href: "/treatments" },
              { label: treatment.name },
            ]}
          />

          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14">
            <div>
              {specialty ? (
                <Link href={`/specialties/${specialty.slug}`}>
                  <Label>{specialty.name}</Label>
                </Link>
              ) : null}
              <h1 className="display-xl mt-4 text-ink">{treatment.name}</h1>
              <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-ink-soft">
                {treatment.summary}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href={`/book?specialty=${treatment.specialty}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-forest px-7 py-4 text-[0.92rem] font-semibold text-paper transition hover:bg-forest-deep"
                >
                  Book a consultation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <p className="inline-flex items-center gap-2 text-[0.88rem] text-ink-soft">
                  <Clock className="h-4 w-4 text-forest" strokeWidth={1.8} aria-hidden />
                  {treatment.consultationType}
                </p>
              </div>
            </div>

            <div className="relative aspect-4/3 overflow-hidden rounded-[24px] bg-surface-2">
              <Image
                src={treatment.image}
                alt={treatment.alt}
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
            <div className="space-y-10">
              <Reveal>
                <h2 className="display-md text-ink">What it is</h2>
                <p className="mt-3 max-w-2xl text-[1rem] leading-relaxed text-ink-soft">
                  {treatment.whatItIs}
                </p>
              </Reveal>

              <Reveal>
                <h2 className="display-md text-ink">What to expect</h2>
                <ol className="mt-4 space-y-3">
                  {treatment.whatToExpect.map((point, i) => (
                    <li key={point} className="flex gap-4">
                      <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-mint text-[0.78rem] font-bold text-forest">
                        {i + 1}
                      </span>
                      <span className="pt-0.5 text-[0.98rem] leading-relaxed text-ink-soft">
                        {point}
                      </span>
                    </li>
                  ))}
                </ol>
              </Reveal>

              <p className="flex items-start gap-2.5 rounded-2xl border border-line bg-surface p-5 text-[0.86rem] leading-relaxed text-ink-soft">
                <Info className="mt-0.5 h-4 w-4 flex-none text-forest" aria-hidden />
                <span>
                  General information only, and not a promise about results. Whether this treatment
                  is appropriate for you can only be decided after an examination by a qualified
                  clinician.
                </span>
              </p>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
              {clinicians.length ? (
                <div className="rounded-[20px] border border-line bg-surface p-6">
                  <h2 className="label text-forest">Clinicians</h2>
                  <ul className="mt-4 space-y-3">
                    {clinicians.map((d) => (
                      <li key={d.slug}>
                        <Link href={`/doctors/${d.slug}`} className="group flex items-center gap-3">
                          <Image
                            src={d.portrait}
                            alt=""
                            width={40}
                            height={40}
                            className="h-10 w-10 flex-none rounded-full object-cover"
                          />
                          <span className="min-w-0">
                            <span className="block truncate text-[0.9rem] font-semibold text-ink group-hover:text-coral-deep">
                              {d.name}
                            </span>
                            <span className="block truncate text-[0.76rem] text-ink-faint">
                              {d.specialtyName}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="rounded-[20px] border border-line bg-surface p-6">
                <h2 className="label text-forest">Other treatments</h2>
                <ul className="mt-4 space-y-2.5">
                  {others.map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={`/treatments/${t.slug}`}
                        className="text-[0.9rem] text-ink hover:text-coral-deep"
                      >
                        {t.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
