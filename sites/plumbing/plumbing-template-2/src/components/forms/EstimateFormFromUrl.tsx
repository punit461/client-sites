"use client";

import { useSearchParams } from "next/navigation";
import { services } from "@/content/services";
import { EstimateForm } from "./EstimateForm";

/** Preselects the category when a link carries ?service=<slug>. */
export function EstimateFormFromUrl({ serviceOptions }: { serviceOptions: string[] }) {
  const slug = useSearchParams().get("service");
  const initial = services.find((s) => s.slug === slug)?.need ?? "";
  return <EstimateForm serviceOptions={serviceOptions} initialService={initial} />;
}
