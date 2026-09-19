"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import { clinic, contact, hoursSummary, nav } from "@/data/clinic";

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-baseline gap-2 ${className}`} aria-label={`${clinic.fullName} — home`}>
      <span className="font-display text-[1.6rem] leading-none tracking-[0.08em] text-ink">
        {clinic.name}
      </span>
      <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-ink-faint">
        {clinic.suffix}
      </span>
    </Link>
  );
}

/** The thin strip above the header. Scrolls away — it is information, not navigation. */
function TopBar() {
  return (
    <div className="border-b border-line bg-ink text-ivory">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-x-6 gap-y-1 px-5 py-2 text-[0.73rem] sm:px-8 lg:px-12">
        {clinic.acceptingNewPatients ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-sage" aria-hidden />
            Accepting new patients
          </span>
        ) : (
          <span />
        )}
        <span className="hidden text-ivory/70 sm:inline">{hoursSummary}</span>
        <a href={`tel:${contact.phoneDial}`} className="inline-flex items-center gap-1.5 font-semibold hover:text-sage">
          <Phone className="h-3.5 w-3.5" strokeWidth={1.9} aria-hidden />
          <span className="sr-only">Call the clinic on </span>
          {contact.phone}
        </a>
      </div>
    </div>
  );
}

export default function SiteHeader() {
  const { open } = useBooking();
  const still = useReducedMotion();
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer whenever the route changes.
  useEffect(() => setMenu(false), [pathname]);

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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("#")[0]) && href !== "/";

  return (
    <>
      <TopBar />

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          solid
            ? "border-b border-line bg-ivory/85 shadow-[0_1px_20px_rgba(23,33,33,0.06)] backdrop-blur-xl"
            : "border-b border-transparent bg-ivory"
        }`}
      >
        <nav
          className="mx-auto flex max-w-[1440px] items-center gap-6 px-5 py-3.5 sm:px-8 lg:px-12"
          aria-label="Main"
        >
          <Wordmark />

          <ul className="ml-6 hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`rounded-full px-3.5 py-2 text-[0.87rem] transition-colors ${
                    isActive(item.href)
                      ? "font-semibold text-ink"
                      : "text-ink-soft hover:bg-surface-2 hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-2.5">
            <a
              href={`tel:${contact.phoneDial}`}
              aria-label={`Call ${clinic.fullName}`}
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition hover:border-ink/25 hover:bg-surface-2 sm:inline-flex"
            >
              <Phone className="h-4.5 w-4.5" strokeWidth={1.8} />
            </a>
            <button
              type="button"
              onClick={() => open()}
              className="hidden rounded-full bg-terracotta px-5 py-3 text-[0.87rem] font-semibold text-white transition hover:bg-terracotta-deep sm:inline-flex"
            >
              Book appointment
            </button>

            <button
              type="button"
              onClick={() => setMenu(true)}
              aria-label="Open menu"
              aria-expanded={menu}
              className="rounded-xl border border-line bg-surface p-2.5 text-ink transition hover:bg-surface-2 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* ------------------------------------------------- mobile drawer */}
      <AnimatePresence>
        {menu ? (
          <div className="fixed inset-0 z-[80] lg:hidden">
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
              className="absolute inset-y-0 right-0 flex w-[min(22rem,90vw)] flex-col bg-ivory shadow-2xl"
              initial={still ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 34 }}
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <Wordmark />
                <button
                  type="button"
                  onClick={() => setMenu(false)}
                  aria-label="Close menu"
                  className="rounded-full p-2 text-ink-soft transition hover:bg-surface-2 hover:text-ink"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <ul className="flex-1 overflow-y-auto px-3 py-4">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={still ? false : { opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className="block rounded-xl px-3 py-3 font-display text-[1.4rem] text-ink transition hover:bg-surface-2"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="space-y-2.5 border-t border-line p-4">
                <a
                  href={`tel:${contact.phoneDial}`}
                  className="block rounded-full border border-line bg-surface px-5 py-3 text-center text-sm font-semibold text-ink"
                >
                  Call {contact.phone}
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setMenu(false);
                    open();
                  }}
                  className="block w-full rounded-full bg-terracotta px-5 py-3 text-center text-sm font-semibold text-white"
                >
                  Book appointment
                </button>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
