import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GraduationCap, Languages, MapPin } from "lucide-react";
import { Breadcrumbs, Container, Icon, Label, PlaceholderNote } from "@/components/ui/primitives";
import { Reveal } from "@/components/animations";
import { doctors, findDoctor } from "@/data/doctors";
import { findSpecialty, treatmentsFor } from "@/data/care";
import { locations } from "@/data/locations";
import { evidence, group } from "@/data/group";

export function generateStaticParams() {
  return doctors.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doctor = findDoctor(slug);
  if (!doctor) return {};
  return {
    title: doctor.name,
    description: `${doctor.name}, ${doctor.specialtyName} at ${group.fullName}.`,
  };
}

const TIMES = ["9:00 AM", "10:30 AM", "12:00 PM", "3:00 PM", "4:30 PM", "6:00 PM"];

export default async function DoctorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doctor = findDoctor(slug);
  if (!doctor) notFound();

  const specialty = findSpecialty(doctor.specialty);
  const clinics = locations.filter((l) => doctor.locations.includes(l.slug));
  const related = treatmentsFor(doctor.specialty);

  return (
    <>
      <section className="border-b border-line bg-surface py-12 sm:py-16">
        <Container wide>
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Doctors", href: "/doctors" },
              { label: doctor.name },
            ]}
          />

          <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-14">
            <div className="relative aspect-4/5 overflow-hidden rounded-[24px] bg-surface-2">
              <Image
                src={doctor.portrait}
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 20rem"
                className="object-cover"
              />
            </div>

            <div className="lg:pt-3">
              <Label>{doctor.specialtyName}</Label>
              <h1 className="display-xl mt-4 text-ink">{doctor.name}</h1>

              <dl className="mt-6 space-y-3.5 text-[0.95rem]">
                <div className="flex gap-3">
                  <dt className="flex-none">
                    <GraduationCap className="h-5 w-5 text-forest" strokeWidth={1.7} aria-hidden />
                    <span className="sr-only">Qualifications</span>
                  </dt>
                  <dd className="text-ink-soft">{doctor.qualifications}</dd>
                </div>
                {doctor.registration ? (
                  <div className="flex gap-3">
                    <dt className="flex-none">
                      <Icon name="shieldCheck" className="h-5 w-5 text-forest" />
                      <span className="sr-only">Registration</span>
                    </dt>
                    <dd className="text-ink-soft">{doctor.registration}</dd>
                  </div>
                ) : null}
                <div className="flex gap-3">
                  <dt className="flex-none">
                    <Languages className="h-5 w-5 text-forest" strokeWidth={1.7} aria-hidden />
                    <span className="sr-only">Languages</span>
                  </dt>
                  <dd className="text-ink-soft">{doctor.languages.join(", ")}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="flex-none">
                    <MapPin className="h-5 w-5 text-forest" strokeWidth={1.7} aria-hidden />
                    <span className="sr-only">Clinics</span>
                  </dt>
                  <dd className="text-ink-soft">
                    {clinics.map((c, i) => (
                      <span key={c.slug}>
                        {i > 0 ? ", " : ""}
                        <Link href={`/locations/${c.slug}`} className="underline underline-offset-4 hover:text-ink">
                          {c.name}
                        </Link>
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>

              <Link
                href={`/book?doctor=${doctor.slug}`}
                className="mt-8 inline-flex items-center rounded-full bg-forest px-7 py-4 text-[0.92rem] font-semibold text-paper transition hover:bg-forest-deep"
              >
                Book appointment
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16 [&>*]:min-w-0">
            <div className="space-y-10">
              <Reveal>
                <h2 className="font-display text-[1.5rem] font-semibold text-ink">About</h2>
                <p className="mt-3 max-w-2xl text-[1rem] leading-relaxed text-ink-soft">{doctor.bio}</p>
              </Reveal>

              <Reveal>
                <h2 className="font-display text-[1.5rem] font-semibold text-ink">
                  Clinical interests
                </h2>
                <ul className="mt-3 space-y-2">
                  {doctor.clinicalInterests.map((interest) => (
                    <li key={interest} className="flex gap-2.5 text-[0.98rem] text-ink-soft">
                      <span className="mt-[0.5rem] h-1.5 w-1.5 flex-none rounded-full bg-mint-deep" aria-hidden />
                      {interest}
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* ------------------------------------ availability */}
              <Reveal>
                <h2 className="font-display text-[1.5rem] font-semibold text-ink">
                  Available appointments
                </h2>
                <div className="mt-4 rounded-[20px] border border-line bg-surface p-5">
                  <p className="text-[0.88rem] text-ink-soft">
                    Next available: <strong className="text-ink">{doctor.nextAvailable}</strong>
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {TIMES.map((t) => (
                      <li key={t}>
                        <Link
                          href={`/book?doctor=${doctor.slug}`}
                          className="inline-block rounded-full border border-line bg-paper px-4 py-2.5 text-[0.86rem] font-medium text-ink transition hover:border-forest hover:bg-mint"
                        >
                          {t}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-[0.8rem] leading-relaxed text-ink-faint">
                    {evidence.liveScheduling
                      ? "These are live availability."
                      : "These are indicative times, not live availability. Choosing one starts a request — the clinic confirms the actual appointment."}
                  </p>
                </div>
              </Reveal>

              <PlaceholderNote>
                <strong className="font-semibold text-ink">Placeholder profile.</strong> Every
                qualification, membership and availability slot on this page is scaffolding.
                Replace it with what this clinician can evidence, and include the registration
                number where your jurisdiction expects it.
              </PlaceholderNote>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-[20px] border border-line bg-surface p-6">
                <h2 className="label text-forest">Education</h2>
                <ul className="mt-4 space-y-3">
                  {doctor.education.map((e) => (
                    <li key={e.qualification}>
                      <span className="block text-[0.9rem] font-semibold text-ink">
                        {e.qualification}
                      </span>
                      <span className="block text-[0.8rem] text-ink-faint">
                        {e.institution} · {e.year}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[20px] border border-line bg-surface p-6">
                <h2 className="label text-forest">Experience</h2>
                <ul className="mt-4 space-y-2 text-[0.88rem] text-ink-soft">
                  {doctor.experience.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[20px] border border-line bg-surface p-6">
                <h2 className="label text-forest">Memberships</h2>
                <ul className="mt-4 space-y-2 text-[0.88rem] text-ink-soft">
                  {doctor.memberships.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>

              {related.length ? (
                <div className="rounded-[20px] border border-line bg-surface p-6">
                  <h2 className="label text-forest">Treatments</h2>
                  <ul className="mt-4 space-y-2.5">
                    {related.map((t) => (
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
                  {specialty ? (
                    <Link
                      href={`/specialties/${specialty.slug}`}
                      className="mt-4 inline-block text-[0.86rem] font-semibold text-forest underline underline-offset-4"
                    >
                      All {specialty.name}
                    </Link>
                  ) : null}
                </div>
              ) : null}
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
