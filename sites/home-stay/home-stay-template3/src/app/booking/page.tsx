import type { Metadata } from "next";
import { Suspense } from "react";
import EnquiryForm from "@/components/booking/EnquiryForm";
import { Container } from "@/components/ui";
import { property } from "@/data/stay";

export const metadata: Metadata = {
  title: "Check dates",
  description: `Send a booking enquiry to ${property.fullName} — a person replies within a day, and no card details are taken.`,
};

export default function BookingPage() {
  // useSearchParams needs a Suspense boundary in a statically exported app.
  return (
    <Suspense
      fallback={
        <Container className="py-40">
          <p className="mono text-[0.8rem] text-bone-faint">Loading…</p>
        </Container>
      }
    >
      <EnquiryForm />
    </Suspense>
  );
}
