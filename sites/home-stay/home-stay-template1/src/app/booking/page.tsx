import type { Metadata } from "next";
import { Suspense } from "react";
import EnquiryForm from "@/components/booking/EnquiryForm";
import { Container } from "@/components/ui";
import { property } from "@/data/stay";

export const metadata: Metadata = {
  title: "Book Your Stay",
  description: `Send an enquiry to ${property.fullName} — we reply within a day.`,
};

export default function BookingPage() {
  // useSearchParams needs a Suspense boundary in a statically exported app.
  return (
    <Suspense fallback={<Container className="py-40">Loading…</Container>}>
      <EnquiryForm />
    </Suspense>
  );
}
