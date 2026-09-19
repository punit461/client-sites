"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Search, SlidersHorizontal, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Container, Icon, SectionHeading } from "@/components/ui/primitives";
import { allLanguages, doctors, type Doctor } from "@/data/doctors";
import { specialties } from "@/data/care";
import { locations } from "@/data/locations";

const ANY = "";

function DoctorCard({ doctor }: { doctor: Doctor }) {
  const clinics = locations.filter((l) => doctor.locations.includes(l.slug));
  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[20px] border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-forest/40 hover:shadow-[var(--shadow-lift)]">
      <div className="flex gap-4 p-5">
        <Image
          src={doctor.portrait}
          alt=""
          width={72}
          height={72}
          className="h-18 w-18 flex-none rounded-2xl object-cover"
        />
        <div className="min-w-0">
          <h3 className="font-display text-[1.15rem] font-semibold text-ink">{doctor.name}</h3>
          <p className="mt-0.5 text-[0.85rem] font-medium text-forest">{doctor.specialtyName}</p>
          <p className="mt-1 truncate text-[0.78rem] text-ink-faint">{doctor.qualifications}</p>
        </div>
      </div>

      <dl className="flex-1 space-y-2 border-t border-line px-5 py-4 text-[0.82rem]">
        <div className="flex gap-2.5">
          <dt className="flex-none text-ink-faint">
            <Icon name="mapPin" className="h-4 w-4" />
            <span className="sr-only">Clinics</span>
          </dt>
          <dd className="text-ink-soft">{clinics.map((c) => c.name.replace("Vivera ", "")).join(", ")}</dd>
        </div>
        <div className="flex gap-2.5">
          <dt className="flex-none text-ink-faint">
            <Icon name="languages" className="h-4 w-4" />
            <span className="sr-only">Languages</span>
          </dt>
          <dd className="text-ink-soft">{doctor.languages.join(", ")}</dd>
        </div>
        <div className="flex gap-2.5">
          <dt className="flex-none text-ink-faint">
            <Icon name="clock" className="h-4 w-4" />
            <span className="sr-only">Next available</span>
          </dt>
          <dd className="font-semibold text-ink">{doctor.nextAvailable}</dd>
        </div>
      </dl>

      <div className="flex gap-2 border-t border-line p-4">
        <Link
          href={`/doctors/${doctor.slug}`}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-line px-4 py-2.5 text-[0.84rem] font-semibold text-ink transition hover:border-forest/40"
        >
          View profile
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
        <Link
          href={`/book?doctor=${doctor.slug}`}
          className="inline-flex flex-1 items-center justify-center rounded-full bg-forest px-4 py-2.5 text-[0.84rem] font-semibold text-paper transition hover:bg-forest-deep"
        >
          Book
        </Link>
      </div>
    </article>
  );
}

export default function DoctorDirectory({ heading = true }: { heading?: boolean }) {
  const still = useReducedMotion();
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState(ANY);
  const [location, setLocation] = useState(ANY);
  const [gender, setGender] = useState(ANY);
  const [language, setLanguage] = useState(ANY);
  const [availableToday, setAvailableToday] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return doctors.filter((d) => {
      if (q && !`${d.name} ${d.specialtyName} ${d.clinicalInterests.join(" ")}`.toLowerCase().includes(q)) {
        return false;
      }
      if (specialty && d.specialty !== specialty) return false;
      if (location && !d.locations.includes(location)) return false;
      if (gender && d.gender !== gender) return false;
      if (language && !d.languages.includes(language)) return false;
      if (availableToday && !d.nextAvailable.toLowerCase().startsWith("today")) return false;
      return true;
    });
  }, [query, specialty, location, gender, language, availableToday]);

  const active = [specialty, location, gender, language].filter(Boolean).length + (availableToday ? 1 : 0);

  const clearAll = () => {
    setSpecialty(ANY);
    setLocation(ANY);
    setGender(ANY);
    setLanguage(ANY);
    setAvailableToday(false);
  };

  const select =
    "w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-[0.86rem] text-ink outline-none transition focus:border-forest";

  return (
    <section id="doctors" className="py-16 sm:py-24">
      <Container wide>
        {heading ? (
          <SectionHeading
            label="Doctors"
            title="Meet your care team"
            copy="Filter by specialty, clinic, language or availability."
          />
        ) : null}

        {/* ------------------------------------------------- search */}
        <div className={`${heading ? "mt-10" : ""} grid gap-3 lg:grid-cols-[1fr_auto]`}>
          <label className="relative block">
            <span className="sr-only">Search doctors</span>
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ink-faint"
              strokeWidth={1.8}
              aria-hidden
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, specialty or interest"
              className="w-full rounded-full border border-line bg-surface py-3.5 pl-11 pr-4 text-[0.92rem] text-ink outline-none transition placeholder:text-ink-faint focus:border-forest"
            />
          </label>

          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            aria-expanded={filtersOpen}
            aria-controls="doctor-filters"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-surface px-5 py-3.5 text-[0.88rem] font-semibold text-ink transition hover:border-forest/40 lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" strokeWidth={1.9} aria-hidden />
            Filters{active ? ` (${active})` : ""}
          </button>
        </div>

        {/* ------------------------------------------------- filters */}
        <div
          id="doctor-filters"
          className={`mt-3 gap-3 sm:grid-cols-2 lg:grid-cols-5 ${filtersOpen ? "grid" : "hidden lg:grid"}`}
        >
          <label className="block">
            <span className="mb-1.5 block text-[0.74rem] font-semibold uppercase tracking-wide text-ink-faint">
              Specialty
            </span>
            <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} className={select}>
              <option value={ANY}>Any specialty</option>
              {specialties.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[0.74rem] font-semibold uppercase tracking-wide text-ink-faint">
              Clinic
            </span>
            <select value={location} onChange={(e) => setLocation(e.target.value)} className={select}>
              <option value={ANY}>Any clinic</option>
              {locations.map((l) => (
                <option key={l.slug} value={l.slug}>
                  {l.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[0.74rem] font-semibold uppercase tracking-wide text-ink-faint">
              Language
            </span>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className={select}>
              <option value={ANY}>Any language</option>
              {allLanguages.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[0.74rem] font-semibold uppercase tracking-wide text-ink-faint">
              Doctor
            </span>
            <select value={gender} onChange={(e) => setGender(e.target.value)} className={select}>
              <option value={ANY}>No preference</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </label>

          <label className="flex items-end pb-0.5">
            <span className="inline-flex cursor-pointer items-center gap-2.5 rounded-xl border border-line bg-surface px-3.5 py-3 text-[0.86rem] text-ink">
              <input
                type="checkbox"
                checked={availableToday}
                onChange={(e) => setAvailableToday(e.target.checked)}
                className="h-4 w-4 accent-[#153c36]"
              />
              Available today
            </span>
          </label>
        </div>

        {/* ------------------------------------------------- results */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[0.88rem] text-ink-soft" role="status" aria-live="polite">
            {results.length} {results.length === 1 ? "doctor" : "doctors"}
            {active ? " matching your filters" : ""}
          </p>
          {active ? (
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex items-center gap-1.5 text-[0.84rem] font-semibold text-forest hover:text-coral-deep"
            >
              <X className="h-3.5 w-3.5" /> Clear filters
            </button>
          ) : null}
        </div>

        {results.length ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 [&>*]:min-w-0">
            {results.map((doctor) => (
              <motion.div
                key={doctor.slug}
                layout={!still}
                initial={still ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <DoctorCard doctor={doctor} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-[20px] border border-dashed border-line bg-surface p-10 text-center">
            <p className="text-[1rem] font-semibold text-ink">No doctors match those filters.</p>
            <p className="mx-auto mt-2 max-w-sm text-[0.9rem] text-ink-soft">
              Try widening the search, or call the clinic and the team will find someone suitable.
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="mt-5 rounded-full bg-forest px-5 py-2.5 text-[0.86rem] font-semibold text-paper transition hover:bg-forest-deep"
            >
              Clear filters
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
