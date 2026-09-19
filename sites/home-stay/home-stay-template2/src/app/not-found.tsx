import Link from "next/link";
import { Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32">
      <Container narrow>
        <p className="hand text-[1.6rem] text-terracotta">well, this is awkward</p>
        <h1 className="display-lg mt-2 text-brown">Page not found</h1>
        <p className="mt-5 max-w-lg text-[1.02rem] leading-relaxed text-brown-soft">
          That address does not exist. The rooms and experiences below do.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="rounded-full bg-terracotta px-7 py-3.5 text-[0.9rem] font-semibold text-cream transition hover:bg-terracotta-deep">
            Back to home
          </Link>
          <Link href="/stay" className="rounded-full border-2 border-brown/15 px-7 py-3.5 text-[0.9rem] font-semibold text-brown transition hover:border-brown">
            See the rooms
          </Link>
        </div>
      </Container>
    </section>
  );
}
