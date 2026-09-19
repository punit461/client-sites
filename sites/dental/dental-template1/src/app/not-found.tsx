import Link from "next/link";
import { Container } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32">
      <Container narrow>
        <h1 className="display-lg text-ink">Page not found</h1>
        <p className="mt-5 max-w-lg text-[1.02rem] leading-relaxed text-ink-soft">
          That address does not exist. The treatments and team pages below are what is here.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-full bg-ink px-6 py-3.5 text-[0.9rem] font-semibold text-ivory transition hover:bg-ink/90"
          >
            Back to home
          </Link>
          <Link
            href="/treatments"
            className="rounded-full border border-line bg-surface px-6 py-3.5 text-[0.9rem] font-semibold text-ink transition hover:border-ink/25"
          >
            Treatments
          </Link>
        </div>
      </Container>
    </section>
  );
}
