import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GraduationCap, Languages } from "lucide-react";
import { Container, Eyebrow, Icon, PlaceholderNote } from "@/components/ui/primitives";
import Reveal from "@/components/motion/Reveal";
import BookTreatmentButton from "@/components/booking/BookTreatmentButton";
import { findClinician, team } from "@/data/team";
import { findTreatment } from "@/data/treatments";
import { clinic } from "@/data/clinic";

export function generateStaticParams() {
  return team.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const clinician = findClinician(slug);
  if (!clinician) return {};
  return {
    title: clinician.name,
    description: `${clinician.name}, ${clinician.role} at ${clinic.fullName}.`,
  };
}

export default async function ClinicianPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const clinician = findClinician(slug);
  if (!clinician) notFound();

  const treatments = clinician.bookableFor
    .map((s) => findTreatment(s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

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
                <Link href="/team" className="hover:text-ink">
                  Our Team
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-ink">
                {clinician.name}
              </li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-14">
            <div className="relative aspect-4/5 overflow-hidden rounded-[24px] bg-surface-2">
              <Image
                src={clinician.portrait}
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 22rem"
                className="object-cover"
              />
            </div>

            <div className="lg:pt-4">
              <Eyebrow>{clinician.role}</Eyebrow>
              <h1 className="display-xl mt-5 text-ink">{clinician.name}</h1>

              <dl className="mt-7 space-y-4 text-[0.95rem]">
                <div className="flex gap-3">
                  <dt className="flex-none">
                    <GraduationCap className="h-5 w-5 text-sage-deep" strokeWidth={1.7} aria-hidden />
                    <span className="sr-only">Qualifications</span>
                  </dt>
                  <dd className="text-ink-soft">{clinician.qualifications}</dd>
                </div>
                {clinician.registration ? (
                  <div className="flex gap-3">
                    <dt className="flex-none">
                      <Icon name="shieldCheck" className="h-5 w-5 text-sage-deep" />
                      <span className="sr-only">Registration</span>
                    </dt>
                    <dd className="text-ink-soft">{clinician.registration}</dd>
                  </div>
                ) : null}
                <div className="flex gap-3">
                  <dt className="flex-none">
                    <Languages className="h-5 w-5 text-sage-deep" strokeWidth={1.7} aria-hidden />
                    <span className="sr-only">Languages</span>
                  </dt>
                  <dd className="text-ink-soft">{clinician.languages.join(", ")}</dd>
                </div>
              </dl>

              <ul className="mt-6 flex flex-wrap gap-2">
                {clinician.areasOfPractice.map((area) => (
                  <li
                    key={area}
                    className="rounded-full border border-line bg-ivory px-3 py-1.5 text-[0.8rem] text-ink-soft"
                  >
                    {area}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <BookTreatmentButton
                  clinician={clinician.slug}
                  label={`Book with ${clinician.name.split(" ").slice(0, 2).join(" ")}`}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16 [&>*]:min-w-0">
            <div className="space-y-10">
              <Reveal>
                <h2 className="font-display text-[1.6rem] text-ink">About {clinician.name}</h2>
                <p className="mt-3 max-w-2xl text-[1rem] leading-relaxed text-ink-soft">
                  {clinician.bio}
                </p>
              </Reveal>

              <Reveal>
                <h2 className="font-display text-[1.6rem] text-ink">Patient approach</h2>
                <p className="mt-3 max-w-2xl text-[1rem] leading-relaxed text-ink-soft">
                  {clinician.approach}
                </p>
              </Reveal>

              <Reveal>
                <h2 className="font-display text-[1.6rem] text-ink">Clinical interests</h2>
                <ul className="mt-3 space-y-2">
                  {clinician.clinicalInterests.map((interest) => (
                    <li key={interest} className="flex gap-2.5 text-[0.98rem] text-ink-soft">
                      <span className="mt-[0.5rem] h-1.5 w-1.5 flex-none rounded-full bg-sage" aria-hidden />
                      {interest}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <PlaceholderNote>
                <strong className="font-semibold text-ink">Placeholder profile.</strong> Every
                qualification, membership and biography on this page is scaffolding. Replace it with
                what this clinician can evidence, and include the registration number where your
                jurisdiction expects it to be displayed.
              </PlaceholderNote>
            </div>

            <aside className="space-y-5 lg:sticky lg:top-32 lg:self-start">
              <div className="rounded-[22px] border border-line bg-surface p-6">
                <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-sage-deep">
                  Education
                </h2>
                <ul className="mt-4 space-y-3">
                  {clinician.education.map((e) => (
                    <li key={e.qualification}>
                      <span className="block text-[0.92rem] font-semibold text-ink">
                        {e.qualification}
                      </span>
                      <span className="block text-[0.82rem] text-ink-faint">
                        {e.institution} · {e.year}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[22px] border border-line bg-surface p-6">
                <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-sage-deep">
                  Professional memberships
                </h2>
                <ul className="mt-4 space-y-2 text-[0.9rem] text-ink-soft">
                  {clinician.memberships.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[22px] border border-line bg-surface p-6">
                <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-sage-deep">
                  Treatments offered
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {treatments.map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={`/treatments/${t.slug}`}
                        className="flex items-center gap-2.5 text-[0.92rem] text-ink hover:text-terracotta"
                      >
                        <Icon name={t.icon} className="h-4 w-4 text-sage-deep" />
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
    </>
  );
}
