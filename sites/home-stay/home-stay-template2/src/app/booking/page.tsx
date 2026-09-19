import type { Metadata } from "next";
import { Suspense } from "react";
import EnquiryForm from "@/components/booking/EnquiryForm";
import { Container } from "@/components/ui";
import { property } from "@/data/stay";

export const metadata: Metadata = {
  title: "Book",
  description: `Send a booking enquiry to ${property.fullName} — a real person replies within a day.`,
};

export default function BookingPage() {
  // useSearchParams needs a Suspense boundary in a statically exported app.
  return (
    <Suspense fallback={<Container className="py-32">Loading…</Container>}>
      <EnquiryForm />
    </Suspense>
  );
}
