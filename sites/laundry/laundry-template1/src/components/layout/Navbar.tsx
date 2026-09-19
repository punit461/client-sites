"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { brand, nav } from "@/data/site";
import { useBooking } from "@/components/booking/BookingProvider";

function Wordmark({ onDark = false }: { onDark?: boolean }) {
  return (
    <a
      href="#top"
      className="group inline-flex items-center gap-2.5"
      aria-label={`${brand.name} — home`}
    >
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-white">
        {/* A folded-linen mark: two stacked sheets. */}
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden>
          <path
            d="M4 8.5 12 4l8 4.5-8 4.5-8-4.5Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M4 14.5 12 19l8-4.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span
        className={`font-display text-[1.32rem] font-semibold tracking-tight ${
          onDark ? "text-white" : "text-ink"
        }`}
      >
        {brand.name}
      </span>
    </a>
  );
}

export default function Navbar() {
  const { open } = useBooking();
  const still = useReducedMotion();
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);

  // Transparent over the hero, solid once the page has moved under it.
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The drawer covers the page, so the page behind it must not scroll.
  useEffect(() => {
    if (!menu) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          solid
            ? "border-b border-line bg-bg/85 backdrop-blur-xl supports-[backdrop-filter]:bg-bg/70"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          className="mx-auto flex max-w-[1440px] items-center gap-6 px-5 py-3.5 sm:px-8 lg:px-12"
          aria-label="Main"
        >
          <Wordmark />

          <ul className="ml-4 hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-[0.88rem] font-medium text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-2.5">
            <a
              href="#tracking"
              className="hidden rounded-full px-4 py-2.5 text-[0.88rem] font-semibold text-ink transition-colors hover:bg-surface-2 sm:inline-flex"
            >
              Track order
            </a>
            <button
              type="button"
              onClick={() => open()}
              className="hidden rounded-full bg-accent px-5 py-2.5 text-[0.88rem] font-semibold text-white shadow-[0_10px_28px_-14px_rgba(14,159,110,0.9)] transition hover:bg-accent-dark sm:inline-flex"
            >
              Schedule pickup
            </button>

            <button
              type="button"
              className="rounded-xl border border-line bg-surface p-2.5 text-ink transition hover:bg-surface-2 lg:hidden"
              onClick={() => setMenu(true)}
              aria-label="Open menu"
              aria-expanded={menu}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* ------------------------------------------------ mobile drawer */}
      <AnimatePresence>
        {menu ? (
          <div className="fixed inset-0 z-[70] lg:hidden">
            <motion.div
              className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
              initial={still ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenu(false)}
              aria-hidden
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="absolute inset-y-0 right-0 flex w-[min(21rem,88vw)] flex-col bg-bg shadow-2xl"
              initial={still ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <Wordmark />
                <button
                  type="button"
                  onClick={() => setMenu(false)}
                  className="rounded-full p-2 text-ink-soft transition hover:bg-surface-2 hover:text-ink"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <ul className="flex-1 overflow-y-auto px-3 py-4">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={still ? false : { opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.045, duration: 0.3 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setMenu(false)}
                      className="block rounded-xl px-3 py-3 font-display text-[1.35rem] text-ink transition hover:bg-surface-2"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="space-y-2.5 border-t border-line p-4">
                <a
                  href="#tracking"
                  onClick={() => setMenu(false)}
                  className="block rounded-full border border-line bg-surface px-5 py-3 text-center text-sm font-semibold text-ink"
                >
                  Track order
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setMenu(false);
                    open();
                  }}
                  className="block w-full rounded-full bg-accent px-5 py-3 text-center text-sm font-semibold text-white"
                >
                  Schedule pickup
                </button>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
