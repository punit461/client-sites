"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { contact, group, nav } from "@/data/group";

function Wordmark() {
  return (
    <Link href="/" className="inline-flex items-baseline gap-1.5" aria-label={`${group.fullName} — home`}>
      <span className="font-display text-[1.35rem] font-bold tracking-tight text-forest">
        {group.name}
      </span>
      <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink-faint">
        {group.suffix}
      </span>
    </Link>
  );
}

export default function Navbar() {
  const still = useReducedMotion();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-line bg-paper/88 py-1 backdrop-blur-xl"
            : "border-b border-transparent bg-paper py-2"
        }`}
      >
        <nav
          className="mx-auto flex max-w-[1440px] items-center gap-6 px-5 py-3 sm:px-8 lg:px-12"
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
                      ? "bg-mint font-semibold text-forest"
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
              className="hidden items-center gap-2 rounded-full border border-line px-4 py-2.5 text-[0.85rem] font-semibold text-ink transition hover:border-forest/40 sm:inline-flex"
            >
              <Phone className="h-4 w-4" strokeWidth={1.8} aria-hidden />
              Call
            </a>
            <Link
              href="/book"
              className="hidden rounded-full bg-forest px-5 py-2.5 text-[0.85rem] font-semibold text-paper transition hover:bg-forest-deep sm:inline-flex"
            >
              Book appointment
            </Link>

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
              className="absolute inset-y-0 right-0 flex w-[min(22rem,90vw)] flex-col bg-paper shadow-2xl"
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
                      className="block rounded-xl px-3 py-3 font-display text-[1.3rem] font-semibold text-ink transition hover:bg-surface-2"
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
                  href="/book"
                  className="block rounded-full bg-forest px-5 py-3 text-center text-sm font-semibold text-paper"
                >
                  Book appointment
                </Link>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
