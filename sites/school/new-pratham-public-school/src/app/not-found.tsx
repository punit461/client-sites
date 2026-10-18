import Link from "next/link";
import { Container } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32">
      <Container narrow>
        <p className="eyebrow">404</p>
        <h1 className="display-lg mt-4 text-ink">Page not found</h1>
        <p className="mt-5 max-w-lg text-[1.02rem] leading-relaxed text-ink-soft">
          That address does not exist. Try the home page, admissions or the gallery.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="rounded-full bg-ink px-6 py-3.5 text-[0.9rem] font-semibold text-cream transition hover:bg-ink/90">
            Back to home
          </Link>
          <Link
            href="/admissions"
            className="rounded-full border border-line bg-surface px-6 py-3.5 text-[0.9rem] font-semibold text-ink transition hover:border-ink/25"
          >
            Admissions
          </Link>
          <Link
            href="/gallery"
            className="rounded-full border border-line bg-surface px-6 py-3.5 text-[0.9rem] font-semibold text-ink transition hover:border-ink/25"
          >
            Gallery
          </Link>
        </div>
      </Container>
    </section>
  );
}
