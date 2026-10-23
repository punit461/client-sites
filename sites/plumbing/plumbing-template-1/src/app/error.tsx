"use client";

import { useEffect } from "react";
import { business, telHref } from "@/config/business";

/** Error boundary for every route: a way forward, and the phone number. */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="section-y">
      <div className="shell max-w-2xl">
        <p className="t-eyebrow text-copper-ink">Something went wrong</p>
        <h1 className="t-h1 mt-4 text-navy">This page didn&apos;t load properly.</h1>
        <p className="t-lead mt-5 text-slate">
          Please try again. If you need help now, call us on{" "}
          <a href={telHref} className="font-semibold text-navy underline underline-offset-4">
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
