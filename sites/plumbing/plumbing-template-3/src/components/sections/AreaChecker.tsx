"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/Buttons";
import { Icon } from "@/components/ui/Icon";
import { business, telHref } from "@/config/business";
import { checkCoverage, type CoverageResult } from "@/content/areas";

/**
 * Postal code (or place name) checker against the configured areas. It never
 * says yes by default: an unlisted postal code is outside the area, an
 * unrecognised name means "contact us to confirm", and edge-of-range areas
 * say so.
 */
export function AreaChecker() {
  const id = useId();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<CoverageResult | null>(null);
  const [checked, setChecked] = useState("");
  const [empty, setEmpty] = useState(false);

  const run = (value: string) => {
    const r = checkCoverage(value);
    setEmpty(!r);
    setResult(r);
    setChecked(value.trim());
  };

  return (
    <form
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        run(query);
      }}
      noValidate
      className="rounded-[var(--radius-photo)] bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8"
    >
      <label htmlFor={`${id}-q`} className="font-display text-lg font-semibold text-teal">
        Check your postal code
      </label>
      <p id={`${id}-hint`} className="mt-1 text-sm text-muted">
        Or type your neighborhood.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          id={`${id}-q`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="postal-code"
          placeholder="e.g. 00123"
          aria-describedby={`${id}-hint${empty ? ` ${id}-empty` : ""}`}
          aria-invalid={empty || undefined}
          className="field flex-1"
        />
        <button type="submit" className="btn btn-teal min-h-12">
          <Icon name="pin" className="h-4 w-4" strokeWidth={1.8} />
          Check
        </button>
      </div>
      {empty ? (
        <p id={`${id}-empty`} className="mt-2 text-sm font-medium text-danger">
          Please enter a postal code or neighborhood.
        </p>
      ) : null}
      <div role="status" aria-live="polite" className="mt-5 empty:mt-0">
        {result ? <Outcome result={result} query={checked} onPick={(n) => { setQuery(n); run(n); }} /> : null}
      </div>
    </form>
  );
}

function Outcome({ result, query, onPick }: { result: CoverageResult; query: string; onPick: (name: string) => void }) {
  if (result.status === "covered")
    return (
      <Box tone="ok" title={`Yes — we cover ${result.area.name}.`}>
        <p>Tell us what&apos;s going on and we&apos;ll get back to you to arrange things.</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Button href="/request-a-quote/">Request a Quote</Button>
          <Button href={`/service-areas/${result.area.slug}/`} variant="outline">
            About {result.area.name}
          </Button>
        </div>
      </Box>
    );
  if (result.status === "confirm")
    return (
      <Box tone="maybe" title={`${result.area.name} is at the edge of our area.`}>
        <p>We can sometimes reach {result.area.name}, depending on the job and our schedule. Please get in touch to confirm before booking.</p>
        <Button href={telHref} icon="phone" className="mt-4">
          Call {business.phone.display}
        </Button>
      </Box>
    );
  if (result.status === "outside")
    return (
      <Box tone="no" title={`${result.postalCode} is outside our current service area.`}>
        <p>
          Sorry — we don&apos;t currently work there. If you&apos;re right on the border or think that&apos;s a mistake, call{" "}
          <a href={telHref} className="font-semibold text-teal underline underline-offset-4">
            {business.phone.display}
          </a>{" "}
          and we&apos;ll give you a straight answer.
        </p>
      </Box>
    );
  return (
    <Box tone="maybe" title={`We couldn't match “${query}” to an area we serve.`}>
      {result.suggestions.length ? (
        <>
          <p>Did you mean:</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {result.suggestions.map((a) => (
              <li key={a.slug}>
                <button type="button" onClick={() => onPick(a.name)} className="min-h-10 rounded-lg bg-sage px-3 text-sm font-semibold text-teal hover:bg-sage-deep">
                  {a.name}
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Try a 5-digit postal code — or call us and we&apos;ll confirm whether we can help.</p>
      )}
    </Box>
  );
}

function Box({ tone, title, children }: { tone: "ok" | "maybe" | "no"; title: string; children: ReactNode }) {
  const style = {
    ok: { bar: "border-teal", icon: "check" as const, iconCls: "bg-teal text-white" },
    maybe: { bar: "border-terracotta", icon: "message" as const, iconCls: "bg-sand text-clay" },
    no: { bar: "border-muted", icon: "pin" as const, iconCls: "bg-sage text-stone" },
  }[tone];
  return (
    <div className={`border-l-[3px] pl-4 ${style.bar}`}>
      <p className="flex items-center gap-2.5 font-display text-lg font-semibold text-teal">
        <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${style.iconCls}`}>
          <Icon name={style.icon} className="h-4 w-4" strokeWidth={2} />
        </span>
        {title}
      </p>
      <div className="mt-2 text-stone">{children}</div>
    </div>
  );
}
