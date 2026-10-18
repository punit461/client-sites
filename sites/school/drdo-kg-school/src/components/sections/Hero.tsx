import Image from "next/image";
import { Phone } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { Container, CtaButton, Stars } from "@/components/ui/primitives";
import { brand, contact, rating } from "@/data/site";
import { img } from "@/lib/images";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[min(82vh,680px)] items-end overflow-hidden text-white">
      <Image
        src={img.hero}
        alt="D.R.D.O KG School building and play area"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#14282d]/15 via-[#14282d]/45 to-[#14282d]/85"
        aria-hidden
      />

      <Container className="pb-14 pt-28 sm:pb-20">
        <Reveal>
          <p className="text-[0.8rem] font-extrabold uppercase tracking-[0.14em] text-sun">
            {brand.kind} · {brand.area}
          </p>
          <h1 className="display-xl mt-3 max-w-[14ch]">{brand.tagline}</h1>
          <p className="mt-4 max-w-[38ch] text-lg leading-relaxed text-white/90 sm:text-xl">
            Caring teachers, bright classrooms and one of the best play areas in the neighbourhood.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-3">
          <CtaButton href="#admissions" size="lg">
            Admissions
          </CtaButton>
          <CtaButton href={contact.phoneHref} size="lg" variant="outline-light">
            <Phone className="h-4 w-4" strokeWidth={2.2} aria-hidden />
            Call {contact.phone}
          </CtaButton>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="mt-7 flex items-center gap-2 text-[0.95rem] font-bold">
            <Stars rating={rating.value} />
            {rating.value} on {rating.source} · {rating.count} reviews
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
