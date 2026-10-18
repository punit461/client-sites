"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Crest } from "@/components/ui/primitives";
import { contact, nav, school } from "@/data/site";

function Wordmark() {
  return (
    <Link href="/" className="group inline-flex items-center gap-3" aria-label={`${school.name} — home`}>
      <Crest className="h-11 w-11 sm:h-12 sm:w-12" />
      <span className="leading-tight">
        <span className="block font-display text-[1.02rem] font-semibold tracking-tight text-navy sm:text-[1.15rem]">
          Little Angels
        </span>
        <span className="block text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-gold sm:text-[0.7rem]">
          Modern High School
        </span>
      </span>
    </Link>
  );
}

/** "/about/" is active on /about/ and nothing else; "/admissions/#visit" on /admissions/. */
function isActive(pathname: string, href: string) {
  const path = href.split("#")[0];
  return pathname === path || pathname === path.replace(/\/$/, "");
}

export default function Navbar() {
  const still = useReducedMotion();
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 12);
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
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          solid ? "border-line bg-bg/90 backdrop-blur-xl" : "border-transparent bg-bg"
        }`}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-3 sm:px-8 lg:px-12" aria-label="Main">
          <Wordmark />

          <ul className="ml-auto hidden items-center gap-0.5 xl:flex">
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-full px-3.5 py-2 text-[0.88rem] font-medium transition-colors ${
                      active ? "bg-navy-soft text-navy" : "text-ink-soft hover:bg-surface-2 hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="ml-auto flex items-center gap-2 xl:ml-3">
            <a
              href={contact.phoneHref}
              className="hidden items-center gap-2 rounded-full px-3 py-2.5 text-[0.88rem] font-semibold text-navy transition-colors hover:bg-surface-2 md:inline-flex"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {contact.phone}
            </a>
            <Link
              href="/admissions/"
              className="hidden rounded-full bg-gold-bright px-5 py-2.5 text-[0.88rem] font-semibold text-navy-dark transition hover:bg-gold hover:text-white sm:inline-flex"
            >
              Admissions
            </Link>
            <button
              type="button"
              className="rounded-xl border border-line bg-surface p-2.5 text-ink transition hover:bg-surface-2 xl:hidden"
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
          <div className="fixed inset-0 z-[70] xl:hidden">
            <motion.div
              className="absolute inset-0 bg-navy-dark/50 backdrop-blur-sm"
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
              className="absolute inset-y-0 right-0 flex w-[min(22rem,90vw)] flex-col bg-bg shadow-2xl"
              initial={still ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
            >
              <div className="flex items-center justify-between border-b border-line px-4 py-3">
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
                {[{ label: "Home", href: "/" }, ...nav].map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={still ? false : { opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenu(false)}
                      className="block rounded-xl px-3 py-3 font-display text-[1.3rem] text-ink transition hover:bg-surface-2"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="space-y-2.5 border-t border-line p-4">
                <a
                  href={contact.phoneHref}
                  className="flex items-center justify-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-sm font-semibold text-navy"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  {contact.phone}
                </a>
                <Link
                  href="/admissions/"
                  onClick={() => setMenu(false)}
                  className="block rounded-full bg-gold-bright px-5 py-3 text-center text-sm font-semibold text-navy-dark"
                >
                  Admissions 2026–27
                </Link>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
