"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { contact, nav } from "@/data/site";
import Wordmark from "./Wordmark";

export default function Navbar() {
  const still = useReducedMotion();
  const [raised, setRaised] = useState(false);
  const [menu, setMenu] = useState(false);

  // A shadow once the page has scrolled under the header.
  useEffect(() => {
    const onScroll = () => setRaised(window.scrollY > 8);
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
        className={`sticky top-0 z-50 border-b bg-bg/90 backdrop-blur-xl transition-shadow duration-300 ${
          raised ? "border-line shadow-[0_8px_24px_-18px_rgba(35,48,58,0.5)]" : "border-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-[1440px] items-center gap-6 px-4 py-3 sm:px-8 lg:px-12" aria-label="Main">
          <Wordmark />

          <ul className="ml-auto hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-[0.95rem] font-bold text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-2.5 lg:ml-2">
            <a
              href={contact.phoneHref}
              className="hidden items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[0.92rem] font-bold text-white transition hover:bg-accent-dark sm:inline-flex"
            >
              <Phone className="h-4 w-4" strokeWidth={2} aria-hidden />
              {contact.phone}
            </a>
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
              className="absolute inset-y-0 right-0 flex w-[min(20rem,86vw)] flex-col bg-bg shadow-2xl"
              initial={still ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
            >
              <div className="flex items-center justify-end border-b border-line px-4 py-3">
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
                {nav.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={() => setMenu(false)}
                      className="block rounded-xl px-3 py-3 font-display text-[1.3rem] font-bold text-ink transition hover:bg-surface-2"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="border-t border-line p-4">
                <a
                  href={contact.phoneHref}
                  className="flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-white"
                >
                  <Phone className="h-4 w-4" strokeWidth={2} aria-hidden />
                  Call {contact.phone}
                </a>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
