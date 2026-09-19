"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef } from "react";
import { Container, Icon, Label, Reveal, Stars } from "@/components/ui";
import { contact, gallery, nearby, property, reviews } from "@/data/stay";
import { img } from "@/lib/images";

/** ---------------------------------------------------------- nearby rail */
export function Nearby() {
  const rail = useRef<HTMLDivElement>(null);

  const step = useCallback((dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 320) + 20), behavior: "smooth" });
  }, []);

  return (
    <section className="overflow-hidden py-24 sm:py-32">
      <Container wide>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <Label>Nearby</Label>
            <h2 className="display-lg mt-5 text-charcoal">Worth the drive.</h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-charcoal transition hover:border-forest hover:bg-forest hover:text-ivory"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-charcoal transition hover:border-forest hover:bg-forest hover:text-ivory"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </Container>

      <div
        ref={rail}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:px-8 lg:px-[max(3rem,calc((100vw-1480px)/2+3rem))]"
      >
        {nearby.map((place) => (
          <article
            key={place.name}
            className="w-[78vw] flex-none snap-start sm:w-[22rem]"
          >
            <div className="relative aspect-4/3 overflow-hidden rounded-[22px] bg-ivory-2">
              <Image
                src={place.image}
                alt={place.name}
                fill
                sizes="(max-width: 640px) 78vw, 22rem"
                className="object-cover"
              />
            </div>
            <h3 className="mt-5 font-display text-[1.4rem] text-charcoal">{place.name}</h3>
            <p className="mt-1.5 flex items-center gap-4 text-[0.82rem] text-charcoal-faint">
              <span className="inline-flex items-center gap-1.5">
                <Icon name="navigation" className="h-3.5 w-3.5" />
                {place.distance}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="clock" className="h-3.5 w-3.5" />
                {place.time}
              </span>
            </p>
            <p className="mt-2.5 text-[0.92rem] leading-relaxed text-charcoal-soft">{place.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/** ---------------------------------------------------------- reviews */
export function Reviews() {
  return (
    <section className="border-y border-line bg-ivory-2/60 py-24 sm:py-32">
      <Container wide>
        <div className="max-w-xl">
          <Label>Guests</Label>
          <h2 className="display-lg mt-5 text-charcoal">What people said afterwards.</h2>
        </div>

        <div className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 lg:grid lg:grid-cols-2 lg:overflow-visible">
          {reviews.map((review, i) => (
            <Reveal key={review.name} delay={i * 0.07} className="w-[82vw] flex-none snap-start sm:w-[26rem] lg:w-auto">
              <figure className="flex h-full flex-col rounded-[22px] border border-line bg-surface p-7">
                <Stars rating={review.rating} />
                <blockquote className="mt-5 flex-1 font-display text-[1.3rem] leading-snug text-charcoal">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3.5 border-t border-line pt-5">
                  <Image
                    src={review.avatar}
                    alt=""
                    width={44}
                    height={44}
                    className="h-11 w-11 flex-none rounded-full object-cover"
                  />
                  <span className="min-w-0">
                    <span className="block text-[0.92rem] font-medium text-charcoal">
                      {review.name}
                    </span>
                    <span className="block truncate text-[0.8rem] text-charcoal-faint">
                      {review.location} · {review.stay}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-[0.78rem] text-charcoal-faint">
          Illustrative reviews. Replace with the property&rsquo;s own before launch.
        </p>
      </Container>
    </section>
  );
}

/** ---------------------------------------------------------- location */
export function LocationSection() {
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contact.mapsQuery)}`;

  return (
    <section id="location" className="py-24 sm:py-32">
      <Container wide>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 [&>*]:min-w-0">
          <div>
            <Label>Finding us</Label>
            <h2 className="display-lg mt-5 text-charcoal">Up the estate road.</h2>

            <address className="mt-8 space-y-1 text-[1.02rem] not-italic leading-relaxed text-charcoal">
              {contact.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>

            <dl className="mt-9 space-y-5 border-t border-line pt-8">
              {[
                ["Mangaluru airport", "145 km · 3 hr 30 drive"],
                ["Hassan railway station", "62 km · 1 hr 40 drive"],
                ["Chikmagalur town", "12 km · 25 min drive"],
                ["The last stretch", "2 km of unpaved estate road, fine in any car outside monsoon"],
              ].map(([term, detail]) => (
                <div key={term} className="flex flex-wrap gap-x-6 gap-y-1">
                  <dt className="w-44 flex-none text-[0.86rem] text-charcoal">{term}</dt>
                  <dd className="min-w-0 flex-1 text-[0.9rem] text-charcoal-soft">{detail}</dd>
                </div>
              ))}
            </dl>

            <a
              href={directions}
              target="_blank"
              rel="noreferrer"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3.5 text-[0.88rem] font-medium tracking-wide text-ivory transition hover:bg-forest-deep"
            >
              <Icon name="navigation" className="h-4 w-4" strokeWidth={1.6} />
              Get directions
            </a>
          </div>

          {/* A drawn map rather than an embed: no API key, no third-party
              cookies dropped before anyone has consented to them. */}
          <Reveal>
            <div className="relative aspect-4/3 overflow-hidden rounded-[26px] border border-line bg-ivory-2 lg:aspect-auto lg:h-full lg:min-h-[30rem]">
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 22% 28%, rgba(122,139,111,0.22), transparent 42%), radial-gradient(circle at 72% 68%, rgba(138,106,79,0.18), transparent 46%)",
                }}
                aria-hidden
              />
              <div
                className="absolute inset-0 opacity-[0.35]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #e2dbcb 1px, transparent 1px), linear-gradient(to bottom, #e2dbcb 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
                aria-hidden
              />
              <div className="absolute left-[10%] top-[38%] h-1 w-[68%] -rotate-6 rounded-full bg-beige" aria-hidden />
              <div className="absolute left-[24%] top-[66%] h-1 w-[58%] rotate-3 rounded-full bg-beige" aria-hidden />

              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-forest text-ivory shadow-lg">
                  <Icon name="mountain" className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <span className="mt-3 rounded-full bg-surface px-4 py-2 text-[0.82rem] font-medium text-charcoal shadow-[var(--shadow-soft)]">
                  {property.fullName}
                </span>
              </div>

              <p className="absolute inset-x-0 bottom-4 text-center text-[0.74rem] text-charcoal-faint">
                Illustrative map — connect a provider before launch.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/** ---------------------------------------------------------- social */
export function Social() {
  return (
    <section className="pb-24 sm:pb-32">
      <Container wide>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Label>Instagram</Label>
            <h2 className="display-md mt-4 text-charcoal">@ridgelineretreat</h2>
          </div>
          <a
            href="#"
            className="text-[0.88rem] tracking-wide text-charcoal-soft underline-offset-8 transition hover:text-charcoal hover:underline"
          >
            Follow along
          </a>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-6">
          {gallery.slice(0, 6).map((item) => (
            <a
              key={item.src}
              href="#"
              className="group relative aspect-square overflow-hidden rounded-[14px] bg-ivory-2"
              aria-label={`${item.alt} — open Instagram`}
            >
              <Image
                src={item.src}
                alt=""
                fill
                sizes="(max-width: 1024px) 31vw, 16vw"
                className="object-cover transition-transform duration-[900ms] group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-charcoal/0 transition-colors duration-300 group-hover:bg-charcoal/20" />
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}

/** ---------------------------------------------------------- final CTA */
export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[80svh] items-center overflow-hidden">
      <motion.div className="absolute inset-0 -z-20" style={still ? undefined : { y }}>
        <Image
          src={img.finalCta}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="scale-110 object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-charcoal/55" aria-hidden />

      <Container wide className="py-24 text-center">
        <Reveal>
          <h2 className="display-xl mx-auto max-w-3xl text-ivory">Your perfect escape awaits</h2>
          <p className="mx-auto mt-6 max-w-md text-[1.05rem] leading-relaxed text-ivory/75">
            Six rooms, forty acres, and however long you can stay.
          </p>

          <div className="mt-11 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/booking"
              className="rounded-full bg-ivory px-9 py-4 text-[0.92rem] font-medium tracking-wide text-charcoal transition hover:bg-white"
            >
              Book your stay
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-ivory/35 px-9 py-4 text-[0.92rem] font-medium tracking-wide text-ivory transition hover:bg-ivory hover:text-charcoal"
            >
              Contact us
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
