"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui";
import { contact, nav, property } from "@/data/stay";
import { numeral } from "@/lib/format";
import { img } from "@/lib/images";

/**
 * A thin bar that only grows a background once you have left the hero, with a
 * brass reading line along its bottom edge and a drawer that comes in from the
 * right at every width — there is no desktop link row to collapse.
 */
export default function Navbar() {
  const still = useReducedMotion();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer when the route changes. Adjusting state during render
  // rather than in an effect: navigation is not an external system to
  // synchronise with, and an effect here costs a second render every time.
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled ? "bg-ink/88 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1500px] items-center gap-6 px-5 py-5 sm:px-8 lg:px-14">
          <Link href="/" className="flex items-baseline gap-2" aria-label={`${property.fullName} — home`}>
            <span className="font-display text-[1.5rem] leading-none text-bone">{property.name}</span>
            <span className="label text-brass">{property.suffix}</span>
          </Link>

          {/* The three shortcuts worth having without opening the drawer. */}
          <ul className="ml-6 hidden items-center gap-8 lg:flex">
            {nav.slice(0, 3).map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                  className={`text-[0.86rem] transition-colors ${
                    pathname.startsWith(item.href) ? "text-brass" : "text-bone-soft hover:text-bone"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-3">
            <a
              href={`tel:${contact.phoneDial}`}
              className="mono hidden text-[0.78rem] text-bone-soft transition-colors hover:text-brass xl:block"
            >
              {contact.phone}
            </a>
            <Link
              href="/booking"
              className="hidden items-center gap-2 rounded-sm bg-brass px-6 py-3 text-[0.82rem] font-medium tracking-wide text-ink transition-colors hover:bg-brass-deep sm:inline-flex"
            >
              Check dates
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="group flex items-center gap-3 rounded-sm border border-bone/20 px-4 py-3 text-bone transition-colors hover:border-brass"
            >
              <span className="label hidden sm:block">Menu</span>
              <span className="flex w-5 flex-col gap-[5px]" aria-hidden>
                <span className="h-px w-full bg-current transition-transform duration-300 group-hover:translate-x-1" />
                <span className="h-px w-full bg-current" />
                <span className="h-px w-3/5 bg-current transition-all duration-300 group-hover:w-full" />
              </span>
            </button>
          </div>
        </div>

        {/* How far down the page you are, in brass. */}
        <motion.div
          className="h-px origin-left bg-brass"
          style={{ scaleX: still ? 0 : progress }}
          aria-hidden
        />
      </header>

      {/* ------------------------------------------------------------ drawer */}
      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              tabIndex={-1}
              className="fixed inset-0 z-[90] cursor-default bg-ink/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              initial={still ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed inset-y-0 right-0 z-[95] flex w-full max-w-[560px] flex-col overflow-y-auto bg-ink-2"
              initial={still ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={still ? { opacity: 0 } : { x: "100%" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between px-7 py-5">
                <span className="label text-bone-faint">{property.region}</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="rounded-sm border border-line p-2.5 text-bone transition-colors hover:border-brass hover:text-brass"
                >
                  <X className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </div>

              <nav aria-label="Main" className="px-7 pt-4">
                <ul>
                  {nav.map((item, i) => (
                    <motion.li
                      key={item.label}
                      className="border-b border-line-soft"
                      initial={still ? false : { opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.16 + i * 0.05, duration: 0.45 }}
                    >
                      <Link
                        href={item.href}
                        className="group flex items-baseline gap-5 py-4 text-bone transition-colors hover:text-brass"
                      >
                        <span className="mono text-[0.72rem] text-bone-faint">{numeral(i + 1)}</span>
                        <span className="font-display text-[1.9rem] leading-none">{item.label}</span>
                        <ArrowUpRight className="ml-auto h-5 w-5 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="relative mx-7 mt-8 aspect-16/9 overflow-hidden rounded-sm">
                <Image
                  src={img.veranda}
                  alt="The veranda at Kayal House"
                  fill
                  sizes="(max-width: 640px) 90vw, 500px"
                  className="object-cover"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" aria-hidden />
                <p className="absolute bottom-4 left-5 font-display text-[1.3rem] text-bone">
                  The veranda, most of the day
                </p>
              </div>

              <div className="mt-auto space-y-3 p-7">
                <div className="grid gap-3 sm:grid-cols-2">
                  <a
                    href={`tel:${contact.phoneDial}`}
                    className="flex items-center justify-center gap-2.5 rounded-sm border border-line px-5 py-3.5 text-[0.86rem] text-bone transition-colors hover:border-brass"
                  >
                    <Icon name="phone" className="h-4 w-4" />
                    {contact.phone}
                  </a>
                  <a
                    href={`https://wa.me/${contact.whatsapp}`}
                    className="flex items-center justify-center gap-2.5 rounded-sm border border-line px-5 py-3.5 text-[0.86rem] text-bone transition-colors hover:border-brass"
                  >
                    WhatsApp
                  </a>
                </div>
                <Link
                  href="/booking"
                  className="flex items-center justify-center gap-2 rounded-sm bg-brass px-6 py-4 text-[0.9rem] font-medium text-ink transition-colors hover:bg-brass-deep"
                >
                  Check dates
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

/** The sticky phone-only call to action, once the hero is behind you. */
export function ReserveBar() {
  const still = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/95 p-3 backdrop-blur-xl sm:hidden"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
          initial={still ? false : { y: "100%" }}
          animate={{ y: 0 }}
          exit={still ? undefined : { y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 32 }}
        >
          <div className="flex items-center gap-2.5">
            <a
              href={`https://wa.me/${contact.whatsapp}`}
              className="inline-flex h-12 w-12 flex-none items-center justify-center rounded-sm border border-line text-bone"
              aria-label="Message on WhatsApp"
            >
              <Icon name="phone" className="h-5 w-5" />
            </a>
            <Link
              href="/booking"
              className="inline-flex h-12 flex-1 items-center justify-center rounded-sm bg-brass text-[0.9rem] font-medium text-ink"
            >
              Check dates
            </Link>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
