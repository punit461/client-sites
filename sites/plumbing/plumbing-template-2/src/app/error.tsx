"use client";

import { useEffect } from "react";
import { business, telHref } from "@/config/business";

/** Error boundary for every route: retry, or call. */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <section className="section-y bg-off">
      <div className="shell max-w-2xl">
        <p className="t-label text-blue">Something went wrong</p>
        <h1 className="t-h1 mt-4">This page didn&apos;t load properly.</h1>
        <p className="t-lead mt-5 text-ink-soft">
          Try again — or if you need help now, call{" "}
          <a href={telHref} className="font-semibold text-charcoal underline underline-offset-4">
            {business.phone.display}
          </a>
          .
        </p>
        <button type="button" onClick={reset} className="btn btn-dark mt-8">
          Try again
        </button>
      </div>
    </section>
  );
}
