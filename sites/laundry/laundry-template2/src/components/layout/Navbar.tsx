"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import { brand, nav } from "@/data/site";

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
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[90] transition-all duration-300 ${
          scrolled ? "bg-paper/85 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <nav
          className="mx-auto flex max-w-[1560px] items-center gap-8 px-5 py-4 sm:px-8 lg:px-12"
          aria-label="Main"
        >
          <a
            href="#top"
            className={`font-display text-[1.5rem] font-bold uppercase leading-none tracking-tight transition-colors ${
              scrolled ? "text-ink" : "text-paper"
            }`}
          >
            {brand.name}
          </a>

          <ul className="ml-2 hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={`label transition-colors ${
                    scrolled ? "text-ink-soft hover:text-ink" : "text-paper/70 hover:text-paper"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => open()}
              className={`hidden items-center gap-2 rounded-full px-5 py-2.5 text-[0.85rem] font-semibold transition sm:inline-flex ${
                scrolled ? "bg-ink text-paper hover:bg-night" : "bg-lime text-ink hover:bg-lime-deep"
              }`}
            >
              Book a pickup
              <ArrowUpRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => setMenu(true)}
              aria-label="Open menu"
              aria-expanded={menu}
              className={`rounded-full border p-2.5 transition lg:hidden ${
                scrolled ? "border-ink/20 text-ink" : "border-paper/30 text-paper"
              }`}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* ------------------------------------------- full-bleed mobile menu */}
      <AnimatePresence>
        {menu ? (
          <motion.div
            className="fixed inset-0 z-[110] flex flex-col bg-ink text-paper lg:hidden"
            initial={still ? false : { clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={still ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between px-5 py-4">
              <span className="font-display text-[1.5rem] font-bold uppercase leading-none">
                {brand.name}
              </span>
              <button
                type="button"
                onClick={() => setMenu(false)}
                aria-label="Close menu"
                className="rounded-full border border-paper/25 p-2.5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <ul className="flex flex-1 flex-col justify-center gap-1 px-5">
              {nav.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={still ? false : { opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16 + i * 0.06, duration: 0.4 }}
                >
                  <a
                    href={item.href}
                    onClick={() => setMenu(false)}
                    className="block py-2 font-display text-[2.4rem] font-bold uppercase leading-none tracking-tight"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="p-5">
              <button
                type="button"
                onClick={() => {
                  setMenu(false);
                  open();
                }}
                className="w-full rounded-full bg-lime px-6 py-4 text-[0.95rem] font-semibold text-ink"
              >
                Book a pickup
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
