"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import { brand, contact, nav } from "@/data/site";

/**
 * Transparent over the hero, then a floating frosted pill once the page moves.
 * The switch happens at 40px so it reads as a deliberate state change rather
 * than a flicker on the first scroll wheel notch.
 */
export default function Navbar() {
  const { open } = useBooking();
  const still = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menu) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setMenu(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[90] px-3 pt-3 sm:px-5 sm:pt-4">
        <nav
          aria-label="Main"
          className={`mx-auto flex max-w-[1520px] items-center gap-6 rounded-full px-4 py-3 transition-all duration-300 sm:px-6 ${
            scrolled ? "panel" : "border border-transparent"
          }`}
        >
          <a href="#top" className="flex items-baseline gap-1.5">
            <span className="font-display text-[1.35rem] font-semibold leading-none tracking-tight text-mist">
              {brand.name}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
          </a>

          <ul className="ml-4 hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-[0.86rem] font-medium text-mist-soft transition-colors hover:text-mist"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-2">
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className="hidden items-center gap-2 rounded-full border border-white/12 px-4 py-2.5 text-[0.82rem] font-semibold text-mist transition hover:border-ice/60 hover:text-ice md:inline-flex"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden />
              {contact.phone}
            </a>

            <button
              type="button"
              onClick={() => open()}
              className="hidden items-center gap-2 rounded-full bg-ice px-5 py-2.5 text-[0.84rem] font-semibold text-night transition hover:bg-ice-deep sm:inline-flex"
            >
              Book a collection
              <ArrowUpRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => setMenu(true)}
              aria-label="Open menu"
              aria-expanded={menu}
              className="rounded-full border border-white/12 p-2.5 text-mist transition hover:border-ice/60 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* ------------------------------------------------- mobile menu sheet */}
      <AnimatePresence>
        {menu ? (
          <>
            <motion.div
              className="fixed inset-0 z-[100] bg-night/70 backdrop-blur-sm lg:hidden"
              initial={still ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenu(false)}
              aria-hidden
            />

            <motion.div
              className="fixed inset-x-3 top-3 z-[110] overflow-hidden rounded-[26px] border border-line bg-deep lg:hidden"
              initial={still ? false : { opacity: 0, y: -22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={still ? { opacity: 0 } : { opacity: 0, y: -18 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <span className="font-display text-[1.3rem] font-semibold leading-none text-mist">
                  {brand.name}
                </span>
                <button
                  type="button"
                  onClick={() => setMenu(false)}
                  aria-label="Close menu"
                  className="rounded-full border border-line p-2.5 text-mist"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <ul className="px-3 py-3">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={still ? false : { opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.3 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setMenu(false)}
                      className="flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-[1.25rem] font-medium tracking-tight text-mist transition hover:bg-white/5"
                    >
                      {item.label}
                      <ArrowUpRight className="h-4 w-4 text-mist-faint" aria-hidden />
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="space-y-2.5 border-t border-line p-4">
                <button
                  type="button"
                  onClick={() => {
                    setMenu(false);
                    open();
                  }}
                  className="w-full rounded-full bg-ice px-6 py-4 text-[0.95rem] font-semibold text-night"
                >
                  Book a collection
                </button>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-line px-6 py-3.5 text-[0.9rem] font-semibold text-mist"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  {contact.phone}
                </a>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
