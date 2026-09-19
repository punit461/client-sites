import Link from "next/link";
import { Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="py-40 sm:py-48">
      <Container narrow>
        <p className="mono text-[0.76rem] text-brass">404</p>
        <h1 className="display-lg mt-5 text-bone">That page is not in this house.</h1>
        <p className="mt-6 max-w-lg text-[1.02rem] leading-relaxed text-bone-soft">
          The address does not exist. The five rooms below do, and so does the lake.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-sm bg-brass px-7 py-3.5 text-[0.88rem] font-medium text-ink transition-colors hover:bg-brass-deep"
          >
            Back to the house
          </Link>
          <Link
            href="/suites"
            className="rounded-sm border border-line px-7 py-3.5 text-[0.88rem] text-bone transition-colors hover:border-brass hover:text-brass"
          >
            See the rooms
          </Link>
        </div>
      </Container>
    </section>
  );
}
