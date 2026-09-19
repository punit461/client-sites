import Link from "next/link";
import { Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="pb-24 pt-40 sm:pb-32">
      <Container narrow>
        <h1 className="display-lg text-charcoal">Page not found</h1>
        <p className="mt-5 max-w-lg text-[1.02rem] leading-relaxed text-charcoal-soft">
          That address does not exist. The rooms and experiences below are what is here.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="rounded-full bg-forest px-7 py-3.5 text-[0.88rem] font-medium tracking-wide text-ivory transition hover:bg-forest-deep">
            Back to home
          </Link>
          <Link href="/rooms" className="rounded-full border border-charcoal/20 px-7 py-3.5 text-[0.88rem] font-medium tracking-wide text-charcoal transition hover:border-charcoal">
            See the rooms
          </Link>
        </div>
      </Container>
    </section>
  );
}
