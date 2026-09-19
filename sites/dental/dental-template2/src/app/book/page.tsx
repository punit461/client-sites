import type { Metadata } from "next";
import { Suspense } from "react";
import BookingEntry from "@/components/booking/BookingEntry";
import { Breadcrumbs, Container } from "@/components/ui/primitives";
import { group } from "@/data/group";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description: `Request an appointment at ${group.fullName} in seven short steps.`,
  robots: { index: true, follow: true },
};

export default function BookPage() {
  return (
    <>
      <section className="border-b border-line bg-surface pb-6 pt-10">
        <Container narrow>
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Book" }]} />
        </Container>
      </section>

      {/* useSearchParams needs a Suspense boundary in a statically exported app. */}
      <Suspense fallback={<Container narrow className="py-20">Loading…</Container>}>
        <BookingEntry />
      </Suspense>
    </>
  );
}
