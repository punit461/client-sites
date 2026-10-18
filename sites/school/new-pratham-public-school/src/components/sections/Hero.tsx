"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, BadgeCheck, HandCoins, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Container } from "@/components/ui/primitives";
import { contact, school } from "@/data/school";
import { asset, campus } from "@/lib/assets";

/**
 * The entrance is CSS (`.rise` in globals.css), not Framer Motion: the hero is
 * the first thing a parent sees, and a JS-driven fade leaves it blank until the
 * bundle has loaded on a slow connection. Framer only drives the scroll
 * parallax, which is harmless if it never runs.
 */
const rise = (delay: number) => ({ className: "rise", style: { animationDelay: `${delay}s` } });

export default function Hero() {
  const still = useReducedMotion();
  const section = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);

  const moments = [campus.moment4, campus.moment2, campus.moment5].filter(Boolean);

  return (
    <section ref={section} className="relative overflow-hidden pb-16 pt-10 sm:pb-24 sm:pt-16">
      <div
        className="pointer-events-none absolute -left-32 top-10 -z-10 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(244,183,64,0.28),transparent_65%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 top-0 -z-10 h-[40rem] w-[46rem] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(228,87,46,0.14),transparent_62%)]"
        aria-hidden
      />

      <Container wide>
        <div className="grid items-center gap-12 lg:grid-cols-[46fr_54fr] lg:gap-14">
          {/* --------------------------------------------------- copy */}
          <motion.div style={still ? undefined : { y: copyY }}>
            <p {...rise(0.05)}>
              <span className="eyebrow">
                {school.affiliation} · {school.classes}
              </span>
            </p>

            <h1 className="display-xl mt-6 text-ink rise" style={{ animationDelay: "0.12s" }}>
              Where every child is helped to{" "}
              <span className="underline-saffron">realise their potential</span>.
            </h1>

            <p className="rise mt-7 max-w-lg text-[1.05rem] leading-relaxed text-ink-soft sm:text-lg" style={{ animationDelay: "0.22s" }}>
              {school.description}
            </p>

            <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: "0.3s" }}>
              <Link
                href="/admissions"
                className="group inline-flex items-center gap-2 rounded-full bg-coral px-7 py-4 text-[0.95rem] font-semibold text-white transition hover:bg-coral-deep"
              >
                Admissions enquiry
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
              <Link
                href="/facilities"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-7 py-4 text-[0.95rem] font-semibold text-ink transition hover:border-ink/25 hover:bg-surface-2"
              >
                Explore the campus
              </Link>
            </div>

            <ul className="rise mt-10 flex flex-wrap gap-x-7 gap-y-3 text-[0.85rem] text-ink-soft" style={{ animationDelay: "0.38s" }}>
              <li className="inline-flex items-center gap-2">
                <BadgeCheck className="h-4.5 w-4.5 text-leaf" strokeWidth={1.9} aria-hidden />
                CBSE Affiliation No. {school.affiliationNumber}
              </li>
              <li className="inline-flex items-center gap-2">
                <HandCoins className="h-4.5 w-4.5 text-leaf" strokeWidth={1.9} aria-hidden />
                No-donation admissions
              </li>
              <li className="inline-flex items-center gap-2">
                <Phone className="h-4.5 w-4.5 text-leaf" strokeWidth={1.9} aria-hidden />
                <a href={`tel:${contact.phoneDial}`} className="font-semibold text-ink hover:text-coral-deep">
                  {contact.phone}
                </a>
              </li>
            </ul>
          </motion.div>

          {/* --------------------------------------------- composition */}
          <div className="rise relative" style={{ animationDelay: "0.15s" }}>
            <motion.div
              className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-surface-2 shadow-[var(--shadow-lift)] sm:aspect-[3/2]"
              style={still ? undefined : { y: imageY }}
            >
              <Image
                src={asset(campus.building.src)}
                alt="The New Pratham Public School building, with its coral and cream façade and open balconies"
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 54vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/40 to-transparent" aria-hidden />
            </motion.div>

            {/* floating card */}
            <div className="rise absolute -bottom-6 left-4 w-[15.5rem] sm:left-8 sm:w-72" style={{ animationDelay: "0.55s" }}>
              <div className="glass rounded-2xl p-4">
                <p className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-ink-faint">
                  Admissions {new Date().getFullYear()}–{String(new Date().getFullYear() + 1).slice(-2)}
                </p>
                <p className="mt-1.5 font-display text-[1.2rem] font-semibold text-ink">{school.classes}</p>
                <p className="mt-1 text-[0.76rem] leading-relaxed text-ink-soft">
                  Concept-based learning, mapped to NEP 2020. Call the office to arrange a visit.
                </p>
              </div>
            </div>

            {/* moments strip */}
            {moments.length ? (
              <ul
                className="rise absolute -right-2 -top-6 hidden gap-2 sm:flex"
                style={{ animationDelay: "0.7s" }}
                aria-label="Moments from school life"
              >
                {moments.map((m, i) => (
                  <li
                    key={m.src}
                    className="relative h-16 w-20 overflow-hidden rounded-xl border-2 border-cream shadow-[var(--shadow-soft)]"
                    style={{ transform: `rotate(${(i - 1) * 3}deg)` }}
                  >
                    <Image src={asset(m.src)} alt="" fill sizes="80px" className="object-cover" />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
