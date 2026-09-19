"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, property } from "@/data/stay";

/**
 * Transparent over the hero, solid once the page moves. On any route other
 * than the home page there is no hero behind it, so it starts solid.
 */
export default function Navbar() {
  const still = useReducedMotion();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
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

  const solid = scrolled || !isHome;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid ? "border-b border-line bg-ivory/90 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <nav
          className="mx-auto flex max-w-[1480px] items-center gap-8 px-5 py-4 sm:px-8 lg:px-12"
          aria-label="Main"
        >
          <Link href="/" className="flex items-baseline gap-2" aria-label={`${property.fullName} — home`}>
            <span
              className={`font-display text-[1.5rem] tracking-tight transition-colors ${
                solid ? "text-charcoal" : "text-ivory"
              }`}
            >
              {property.name}
            </span>
            <span
              className={`label transition-colors ${solid ? "text-charcoal-faint" : "text-ivory/70"}`}
            >
              {property.suffix}
            </span>
          </Link>

          <ul className="ml-4 hidden items-center gap-7 lg:flex">
            {nav.slice(1).map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={`text-[0.86rem] tracking-wide transition-colors ${
                    solid
                      ? pathname === item.href
                        ? "text-charcoal"
                        : "text-charcoal-soft hover:text-charcoal"
                      : "text-ivory/80 hover:text-ivory"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-3">
            <Link
              href="/booking"
              className={`hidden rounded-full px-6 py-3 text-[0.84rem] font-medium tracking-wide transition sm:inline-flex ${
                solid
                  ? "bg-forest text-ivory hover:bg-forest-deep"
                  : "bg-ivory text-charcoal hover:bg-white"
              }`}
            >
              Book your stay
            </Link>

            <button
              type="button"
              onClick={() => setMenu(true)}
              aria-label="Open menu"
              aria-expanded={menu}
              className={`rounded-full border p-2.5 transition lg:hidden ${
                solid ? "border-line text-charcoal" : "border-ivory/35 text-ivory"
              }`}
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </header>

      {/* --------------------------------------------- full-bleed menu */}
      <AnimatePresence>
        {menu ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[90] flex flex-col bg-forest text-ivory lg:hidden"
            initial={still ? false : { clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={still ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between px-5 py-4">
              <span className="font-display text-[1.5rem] tracking-tight">{property.name}</span>
              <button
                type="button"
                onClick={() => setMenu(false)}
                aria-label="Close menu"
                className="rounded-full border border-ivory/25 p-2.5"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <ul className="flex flex-1 flex-col justify-center gap-2 px-6">
              {nav.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={still ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + i * 0.05, duration: 0.4 }}
                >
                  <Link href={item.href} className="block py-2 font-display text-[2.1rem] leading-tight">
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="p-6">
              <Link
                href="/booking"
                className="block rounded-full bg-ivory px-6 py-4 text-center text-[0.92rem] font-medium text-charcoal"
              >
                Book your stay
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
