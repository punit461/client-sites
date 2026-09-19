"use client";

import { useSearchParams } from "next/navigation";
import BookingFlow from "./BookingFlow";
import { doctors } from "@/data/doctors";
import { specialties } from "@/data/care";

/**
 * Reads ?doctor= and ?specialty= so a "Book" button anywhere on the site can
 * drop someone straight into the right step. Values are validated against the
 * data rather than trusted, so a hand-edited URL cannot seed a bad state.
 */
export default function BookingEntry() {
  const params = useSearchParams();

  const doctorParam = params.get("doctor") ?? "";
  const doctor = doctors.find((d) => d.slug === doctorParam);

  const specialtyParam = params.get("specialty") ?? "";
  const specialty =
    specialties.find((s) => s.slug === specialtyParam)?.slug ?? doctor?.specialty ?? "";

  return <BookingFlow initialSpecialty={specialty} initialDoctor={doctor?.slug ?? ""} />;
}
