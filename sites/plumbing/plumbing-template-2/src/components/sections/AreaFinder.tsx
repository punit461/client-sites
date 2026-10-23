"use client";

import { CircleCheck, CircleHelp, CircleX, MapPin, Search } from "lucide-react";
import Link from "next/link";
import { useId, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Buttons";
import { Label } from "@/components/ui/SectionHead";
import { business, telHref } from "@/config/business";
import { areas, checkCoverage, type CoverageResult } from "@/content/areas";

/**
 * Checks a postal code or place name against the configured service areas
 * (src/content/areas.ts). It never says yes by default: an unlisted postal
 * code is outside the area, an unrecognised name means "contact us to
 * confirm", and edge-of-range areas say so.
 */
export function AreaFinder({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<CoverageResult | null>(null);
  const [checked, setChecked] = useState("");
  const [empty, setEmpty] = useState(false);
  const H = headingLevel;

  const run = (value: string) => {
    const r = checkCoverage(value);
    setEmpty(!r);
    setResult(r);
    setChecked(value.trim());
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    run(query);
    if (!query.trim()) input.current?.focus();
  };

  return (
    <section aria-labelledby={`${id}-title`} className="dark section-y bg-charcoal text-white">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Label dark>Service area</Label>
          <H id={`${id}-title`} className="t-h2 mt-4">
            Do we cover your area?
          </H>
          <p className="t-lead mt-5 text-gray">Enter your postal code or neighborhood to check against the areas we serve.</p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {areas.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/service-areas/${a.slug}/`}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-[4px] border border-rule-dark px-3 text-sm font-medium text-white transition-colors hover:border-lime"
                >
                  <MapPin className="h-3.5 w-3.5 text-lime" strokeWidth={2} aria-hidden="true" />
                  {a.name}
                  {a.coverage === "confirm" ? <span className="text-gray">*</span> : null}
                </Link>
              </li>
            ))}
          </ul>
          {areas.some((a) => a.coverage === "confirm") ? (
            <p className="mt-3 text-sm text-gray">* By arrangement — contact us to confirm.</p>
          ) : null}
        </div>

        <div className="lg:col-span-7">
          <form onSubmit={onSubmit} noValidate className="rounded-[var(--radius-box)] bg-charcoal-2 p-5 sm:p-8">
            <label htmlFor={`${id}-q`} className="t-label text-white">
              Postal code or neighborhood
            </label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                ref={input}
                id={`${id}-q`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="postal-code"
                placeholder="e.g. 00113 or Midtown"
                aria-describedby={empty ? `${id}-empty` : undefined}
                aria-invalid={empty || undefined}
                className="field flex-1 text-lg"
              />
              <button type="submit" className="btn btn-lime min-h-12">
                <Search className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
                Check
              </button>
            </div>
            {empty ? (
              <p id={`${id}-empty`} className="mt-3 text-sm text-lime">
                Please enter a postal code or neighborhood.
              </p>
            ) : null}

            <div role="status" aria-live="polite" className="mt-6">
              {result ? <Result result={result} query={checked} onPick={(name) => { setQuery(name); run(name); }} /> : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Result({ result, query, onPick }: { result: CoverageResult; query: string; onPick: (name: string) => void }) {
  if (result.status === "covered")
    return (
      <Box tone="ok" icon={<CircleCheck className="h-6 w-6" strokeWidth={2} aria-hidden="true" />} title={`Yes — we cover ${result.area.name}.`}>
        <p>Tell us what&apos;s going on and we&apos;ll get back to you to arrange things.</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Button href="/request-a-quote/" variant="lime">
            Get an estimate
          </Button>
          <Button href={`/service-areas/${result.area.slug}/`} variant="line-light">
            {result.area.name} details
          </Button>
        </div>
      </Box>
    );

  if (result.status === "confirm")
    return (
      <Box tone="maybe" icon={<CircleHelp className="h-6 w-6" strokeWidth={2} aria-hidden="true" />} title={`${result.area.name} is at the edge of our area.`}>
        <p>We can sometimes reach {result.area.name}, depending on the job and our schedule. Contact us to confirm before booking.</p>
        <div className="mt-4">
          <Button href={telHref} variant="lime" icon="phone">
            Call {business.phone.display}
          </Button>
        </div>
      </Box>
    );

  if (result.status === "outside")
    return (
      <Box tone="no" icon={<CircleX className="h-6 w-6" strokeWidth={2} aria-hidden="true" />} title={`${result.postalCode} is outside our current service area.`}>
        <p>
          Sorry — we don&apos;t currently work there. If you think that&apos;s a mistake, or you&apos;re right on the border, call us
          on{" "}
          <a href={telHref} className="font-semibold text-white underline underline-offset-4">
            {business.phone.display}
          </a>{" "}
          and we&apos;ll give you a straight answer.
        </p>
      </Box>
    );

  return (
    <Box tone="maybe" icon={<CircleHelp className="h-6 w-6" strokeWidth={2} aria-hidden="true" />} title={`We couldn't match “${query}” to an area we cover.`}>
      {result.suggestions.length ? (
        <>
          <p>Did you mean:</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {result.suggestions.map((a) => (
              <li key={a.slug}>
                <button
                  type="button"
                  onClick={() => onPick(a.name)}
                  className="min-h-10 rounded-[4px] bg-white px-3 font-display text-sm font-semibold text-charcoal hover:bg-lime"
                >
                  {a.name}
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Try a 5-digit postal code — or contact us and we&apos;ll confirm whether we can help.</p>
      )}
    </Box>
  );
}

function Box({
  tone,
  icon,
  title,
  children,
}: {
  tone: "ok" | "maybe" | "no";
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  const style = {
    ok: { border: "border-lime", icon: "text-lime" },
    maybe: { border: "border-white", icon: "text-white" },
    no: { border: "border-gray", icon: "text-gray" },
  }[tone];
  return (
    <div className={`border-l-4 pl-5 ${style.border}`}>
      <p className={`flex items-center gap-2 font-display text-xl font-bold ${style.icon}`}>
        {icon}
        <span className="text-white">{title}</span>
      </p>
      <div className="mt-2 text-gray">{children}</div>
    </div>
  );
}
