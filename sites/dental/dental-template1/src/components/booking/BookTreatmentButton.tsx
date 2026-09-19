"use client";

import { ArrowRight } from "lucide-react";
import { useBooking } from "./BookingProvider";

/**
 * A client island so that treatment and clinician pages can stay server
 * components — only this button needs the booking context.
 */
export default function BookTreatmentButton({
  treatment,
  clinician,
  label = "Book an appointment",
  full = false,
}: {
  treatment?: string;
  clinician?: string;
  label?: string;
  full?: boolean;
}) {
  const { open } = useBooking();

  return (
    <button
      type="button"
      onClick={() => open({ treatment, clinician })}
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-terracotta px-7 py-4 text-[0.92rem] font-semibold text-white transition hover:bg-terracotta-deep ${
        full ? "w-full" : ""
      }`}
    >
      {label}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </button>
  );
}
