"use client";

import { useSearchParams } from "next/navigation";
import { services } from "@/content/services";
import { QuoteForm } from "./QuoteForm";

/** Preselects the service when a link carries ?service=<slug>. */
export function QuoteFormFromUrl({ serviceOptions }: { serviceOptions: string[] }) {
  const slug = useSearchParams().get("service");
  const initial = services.find((s) => s.slug === slug)?.short ?? "";
  return <QuoteForm serviceOptions={serviceOptions} initialService={initial} />;
}
