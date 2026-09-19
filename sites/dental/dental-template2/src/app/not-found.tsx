import Link from "next/link";
import { Container } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32">
      <Container narrow>
        <h1 className="display-lg text-ink">Page not found</h1>
        <p className="mt-5 max-w-lg text-[1.02rem] leading-relaxed text-ink-soft">
          That address does not exist. Find a doctor, a treatment or a clinic below.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="rounded-full bg-forest px-6 py-3.5 text-[0.9rem] font-semibold text-paper transition hover:bg-forest-deep">
            Back to home
          </Link>
          <Link href="/doctors" className="rounded-full border border-line bg-surface px-6 py-3.5 text-[0.9rem] font-semibold text-ink transition hover:border-forest/40">
            Find a doctor
          </Link>
        </div>
      </Container>
    </section>
  );
}
