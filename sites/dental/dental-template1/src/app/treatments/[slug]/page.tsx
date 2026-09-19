import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, Info } from "lucide-react";
import { Container, Eyebrow, Icon } from "@/components/ui/primitives";
import Reveal from "@/components/motion/Reveal";
import BookTreatmentButton from "@/components/booking/BookTreatmentButton";
import { findTreatment, treatments } from "@/data/treatments";
import { cliniciansFor } from "@/data/team";
import { clinic } from "@/data/clinic";

/** Every treatment is a real, statically exported route. */
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
    openGraph: {
      title: `${treatment.name} · ${clinic.fullName}`,
      description: treatment.summary,
      images: [treatment.image],
    },
  };
}

export default async function TreatmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const treatment = findTreatment(slug);
  if (!treatment) notFound();

  const clinicians = cliniciansFor(treatment.slug);
  const related = treatments.filter((t) => t.slug !== treatment.slug).slice(0, 3);

  /** Service schema, generated from the same content the page renders. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: treatment.name,
    description: treatment.whatItIs,
    provider: { "@type": "Dentist", name: clinic.fullName },
  };

  return (
    <>
      <section className="border-b border-line bg-surface py-12 sm:py-16">
        <Container wide>
          <nav aria-label="Breadcrumb" className="mb-6 text-[0.82rem] text-ink-faint">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-ink">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/treatments" className="hover:text-ink">
                  Treatments
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-ink">
                {treatment.name}
              </li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14">
            <div>
              <Eyebrow>{treatment.category}</Eyebrow>
              <h1 className="display-xl mt-5 text-ink">{treatment.name}</h1>
              <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink-soft">
                {treatment.intro}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <BookTreatmentButton treatment={treatment.slug} />
                <p className="inline-flex items-center gap-2 text-[0.9rem] text-ink-soft">
                  <Clock className="h-4 w-4 text-sage-deep" strokeWidth={1.8} aria-hidden />
                  {treatment.appointmentLength}
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
              {[
                ["What it is", treatment.whatItIs],
                ["Who it may be for", treatment.whoItMayBeFor],
              ].map(([term, body]) => (
                <Reveal key={term}>
                  <h2 className="font-display text-[1.6rem] text-ink">{term}</h2>
                  <p className="mt-3 max-w-2xl text-[1rem] leading-relaxed text-ink-soft">{body}</p>
                </Reveal>
              ))}

              <Reveal>
                <h2 className="font-display text-[1.6rem] text-ink">What to expect</h2>
                <ol className="mt-4 space-y-3">
                  {treatment.whatToExpect.map((point, i) => (
                    <li key={point} className="flex gap-4">
                      <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-sage-wash text-[0.78rem] font-bold text-sage-deep">
                        {i + 1}
                      </span>
                      <span className="pt-0.5 text-[0.98rem] leading-relaxed text-ink-soft">
                        {point}
                      </span>
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal>
                <h2 className="font-display text-[1.6rem] text-ink">Recovery and aftercare</h2>
                <p className="mt-3 max-w-2xl text-[1rem] leading-relaxed text-ink-soft">
                  {treatment.aftercare}
                </p>
              </Reveal>

              <p className="flex items-start gap-2.5 rounded-2xl border border-line bg-surface p-5 text-[0.86rem] leading-relaxed text-ink-soft">
                <Info className="mt-0.5 h-4 w-4 flex-none text-sage-deep" aria-hidden />
                <span>
                  This page is general information, not advice about your own situation. Whether
                  this treatment is appropriate for you can only be decided after an examination by
                  a qualified clinician.
                </span>
              </p>
            </div>

            {/* ------------------------------------------ side rail */}
            <aside className="lg:sticky lg:top-32 lg:self-start">
              {clinicians.length ? (
                <div className="rounded-[22px] border border-line bg-surface p-6">
                  <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-sage-deep">
                    Clinicians for this treatment
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {clinicians.map((c) => (
                      <li key={c.slug}>
                        <Link href={`/team/${c.slug}`} className="group flex items-center gap-3">
                          <Image
                            src={c.portrait}
                            alt=""
                            width={44}
                            height={44}
                            className="h-11 w-11 flex-none rounded-full object-cover"
                          />
                          <span className="min-w-0">
                            <span className="block truncate text-[0.92rem] font-semibold text-ink group-hover:text-terracotta">
                              {c.name}
                            </span>
                            <span className="block truncate text-[0.78rem] text-ink-faint">
                              {c.role}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5">
                    <BookTreatmentButton treatment={treatment.slug} label="Book a consultation" full />
                  </div>
                </div>
              ) : null}

              <div className="mt-5 rounded-[22px] border border-line bg-surface p-6">
                <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-sage-deep">
                  Other treatments
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {related.map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={`/treatments/${t.slug}`}
                        className="group flex items-center gap-2.5 text-[0.92rem] text-ink hover:text-terracotta"
                      >
                        <Icon name={t.icon} className="h-4 w-4 text-sage-deep" />
                        {t.name}
                        <ArrowRight className="ml-auto h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
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
