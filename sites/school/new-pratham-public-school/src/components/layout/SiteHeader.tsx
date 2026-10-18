"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Clock, Mail, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Wordmark from "@/components/layout/Wordmark";
import { contact, hoursSummary, nav } from "@/data/school";

/** The thin strip above the header. Scrolls away — it is information, not navigation. */
function TopBar() {
  return (
    <div className="bg-ink text-cream">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-x-6 gap-y-1 px-5 py-2 text-[0.74rem] sm:px-8 lg:px-12">
        <span className="hidden items-center gap-2 text-cream/75 md:inline-flex">
          <Clock className="h-3.5 w-3.5 text-saffron" strokeWidth={2} aria-hidden />
          {hoursSummary}
        </span>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-1.5 hover:text-saffron">
            <Mail className="h-3.5 w-3.5 text-saffron" strokeWidth={2} aria-hidden />
            {contact.email}
          </a>
          <a href={`tel:${contact.phoneDial}`} className="inline-flex items-center gap-1.5 font-semibold hover:text-saffron">
            <Phone className="h-3.5 w-3.5 text-saffron" strokeWidth={2} aria-hidden />
            <span className="sr-only">Call the school on </span>
            {contact.phone}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function SiteHeader() {
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

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <TopBar />

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          solid
            ? "border-b border-line bg-cream/88 shadow-[0_1px_20px_rgba(29,36,51,0.07)] backdrop-blur-xl"
            : "border-b border-transparent bg-cream"
        }`}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center gap-6 px-5 py-3 sm:px-8 lg:px-12" aria-label="Main">
          <Wordmark />

          <ul className="ml-4 hidden items-center gap-0.5 xl:flex">
            {nav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`rounded-full px-3.5 py-2 text-[0.88rem] transition-colors ${
                    isActive(item.href)
                      ? "bg-saffron-wash font-bold text-ink"
                      : "font-medium text-ink-soft hover:bg-surface-2 hover:text-ink"
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
              aria-label="Call the school"
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink transition hover:border-ink/25 hover:bg-surface-2 sm:inline-flex"
            >
              <Phone className="h-4.5 w-4.5" strokeWidth={1.8} />
            </a>
            <Link
              href="/admissions"
              className="hidden rounded-full bg-coral px-5 py-3 text-[0.87rem] font-semibold text-white transition hover:bg-coral-deep sm:inline-flex"
            >
              Admissions
            </Link>

            <button
              type="button"
              onClick={() => setMenu(true)}
              aria-label="Open menu"
              aria-expanded={menu}
              className="rounded-xl border border-line bg-surface p-2.5 text-ink transition hover:bg-surface-2 xl:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* ------------------------------------------------- mobile drawer */}
      <AnimatePresence>
        {menu ? (
          <div className="fixed inset-0 z-[80] xl:hidden">
            <motion.div
              className="absolute inset-0 bg-ink/45 backdrop-blur-sm"
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
              className="absolute inset-y-0 right-0 flex w-[min(22rem,90vw)] flex-col bg-cream shadow-2xl"
              initial={still ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 34 }}
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <Wordmark compact />
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
                      onClick={() => setMenu(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={`block rounded-xl px-3 py-3 font-display text-[1.35rem] transition hover:bg-surface-2 ${
                        isActive(item.href) ? "text-coral-deep" : "text-ink"
                      }`}
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
                <Link
                  href="/admissions"
                  onClick={() => setMenu(false)}
                  className="block w-full rounded-full bg-coral px-5 py-3 text-center text-sm font-semibold text-white"
                >
                  Admissions enquiry
                </Link>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
