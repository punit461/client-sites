"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container, Icon } from "@/components/ui";
import { contact, nav, property } from "@/data/stay";

/** ------------------------------------------------- announcement strip */
export function Announcement() {
  const still = useReducedMotion();
  if (!property.announcement) return null;

  return (
    <div className="relative z-50 bg-brown text-cream">
      <div className="mx-auto flex max-w-[1460px] items-center justify-center gap-2.5 px-4 py-2.5 text-center">
        <motion.span
          className="flex-none text-yellow"
          animate={still ? undefined : { rotate: [0, 12, -8, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          <Icon name="coffee" className="h-4 w-4" strokeWidth={1.9} />
        </motion.span>
        <p className="text-[0.78rem] font-medium sm:text-[0.84rem]">{property.announcement}</p>
      </div>
    </div>
  );
}

/** ------------------------------------------------- navigation */
export function Navbar() {
  const still = useReducedMotion();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? "border-b border-line bg-cream/90 backdrop-blur-xl" : "bg-cream"
        }`}
      >
        <nav
          className="mx-auto flex max-w-[1460px] items-center gap-8 px-5 py-4 sm:px-8 lg:px-12"
          aria-label="Main"
        >
          <Link href="/" className="flex items-baseline gap-1.5" aria-label={`${property.fullName} — home`}>
            <span className="font-display text-[1.45rem] font-bold tracking-tight text-brown">
              {property.name}
            </span>
            <span className="hand text-[1.35rem] text-terracotta">{property.suffix}</span>
          </Link>

          <ul className="ml-4 hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                  className={`text-[0.88rem] font-medium transition-colors ${
                    pathname.startsWith(item.href)
                      ? "text-terracotta"
                      : "text-brown-soft hover:text-brown"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-2.5">
            <Link
              href="/booking"
              className="hidden items-center gap-2 rounded-full bg-terracotta px-6 py-3 text-[0.86rem] font-semibold text-cream transition hover:bg-terracotta-deep sm:inline-flex"
            >
              Book now
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <button
              type="button"
              onClick={() => setMenu(true)}
              aria-label="Open menu"
              aria-expanded={menu}
              className="rounded-full border border-line bg-surface p-2.5 text-brown transition hover:border-terracotta lg:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={1.8} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menu ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[90] flex flex-col bg-terracotta text-cream lg:hidden"
            initial={still ? false : { clipPath: "circle(0% at 92% 5%)" }}
            animate={{ clipPath: "circle(150% at 92% 5%)" }}
            exit={still ? { opacity: 0 } : { clipPath: "circle(0% at 92% 5%)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between px-5 py-4">
              <span className="font-display text-[1.45rem] font-bold tracking-tight">
                {property.name}
                <span className="hand ml-1.5 text-[1.35rem]">{property.suffix}</span>
              </span>
              <button
                type="button"
                onClick={() => setMenu(false)}
                aria-label="Close menu"
                className="rounded-full border border-cream/30 p-2.5"
              >
                <X className="h-5 w-5" strokeWidth={1.8} />
              </button>
            </div>

            <ul className="flex flex-1 flex-col justify-center gap-1 px-6">
              {nav.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={still ? false : { opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.22 + i * 0.05, duration: 0.4 }}
                >
                  <Link href={item.href} className="block py-2 font-display text-[2.3rem] font-bold tracking-tight">
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="space-y-2.5 p-6">
              <a
                href={`tel:${contact.phoneDial}`}
                className="block rounded-full border border-cream/30 px-6 py-3.5 text-center text-[0.9rem] font-medium"
              >
                {contact.phone}
              </a>
              <Link
                href="/booking"
                className="block rounded-full bg-cream px-6 py-4 text-center text-[0.92rem] font-semibold text-terracotta"
              >
                Book now
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

/** ------------------------------------------------- sticky mobile CTA */
export function MobileBookBar() {
  const still = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 p-3 backdrop-blur-xl sm:hidden"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
          initial={still ? false : { y: "100%" }}
          animate={{ y: 0 }}
          exit={still ? undefined : { y: "100%" }}
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
        >
          <div className="flex items-center gap-2.5">
            <a
              href={`https://wa.me/${contact.whatsapp}`}
              className="inline-flex h-12 w-12 flex-none items-center justify-center rounded-full border border-line bg-surface text-brown"
              aria-label="Message on WhatsApp"
            >
              <Icon name="phone" className="h-5 w-5" />
            </a>
            <Link
              href="/booking"
              className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-terracotta text-[0.92rem] font-semibold text-cream"
            >
              Book your stay
            </Link>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/** ------------------------------------------------- footer */
const SOCIAL: Record<string, string> = {
  instagram:
    "M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 3.1A6.7 6.7 0 1 0 18.7 12 6.7 6.7 0 0 0 12 5.3Zm0 11a4.3 4.3 0 1 1 4.3-4.3 4.3 4.3 0 0 1-4.3 4.3Zm6.9-11.3a1.6 1.6 0 1 1-1.6-1.6 1.6 1.6 0 0 1 1.6 1.6Z",
  whatsapp:
    "M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.38a9.87 9.87 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2Zm0 18.05c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.05-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.24 8.24Zm4.52-6.17c-.25-.13-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.05-.39-2-1.23a7.4 7.4 0 0 1-1.37-1.71c-.15-.25-.02-.38.1-.51.12-.11.25-.29.37-.44.13-.15.17-.25.25-.41.09-.17.05-.31-.01-.43-.07-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42l-.48-.01a.92.92 0 0 0-.67.31c-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.12.16 1.77 2.71 4.3 3.8.6.26 1.07.41 1.44.53.6.2 1.16.17 1.6.1.48-.07 1.47-.6 1.68-1.19.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z",
};

export function Footer() {
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contact.mapsQuery)}`;

  return (
    <footer className="border-t border-line bg-brown pt-16 text-cream/70">
      <Container wide>
        <div className="grid gap-12 pb-14 lg:grid-cols-[1.3fr_2fr] lg:gap-20">
          <div>
            <p className="font-display text-[2.4rem] font-bold leading-none tracking-tight text-cream">
              {property.name}
              <span className="hand ml-2 text-[2.2rem] text-yellow">{property.suffix}</span>
            </p>
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed">{property.intro}</p>

            <ul className="mt-7 flex gap-2.5">
              {(["instagram", "whatsapp"] as const).map((key) => (
                <li key={key}>
                  <a
                    href={key === "whatsapp" ? `https://wa.me/${contact.whatsapp}` : "#"}
                    aria-label={key[0].toUpperCase() + key.slice(1)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 transition hover:border-yellow hover:bg-yellow hover:text-brown"
                  >
                    <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="currentColor" aria-hidden>
                      <path d={SOCIAL[key]} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            <nav aria-label="Pages">
              <h2 className="label text-cream">Wander</h2>
              <ul className="mt-5 space-y-2.5 text-[0.9rem]">
                {nav.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="transition-colors hover:text-cream">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="label text-cream">Find us</h2>
              <address className="mt-5 space-y-2.5 text-[0.9rem] not-italic">
                {contact.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                <a
                  href={directions}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 pt-1 text-yellow hover:text-cream"
                >
                  Open in Maps
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </address>
            </div>

            <div>
              <h2 className="label text-cream">Talk to us</h2>
              <ul className="mt-5 space-y-2.5 text-[0.9rem]">
                <li>
                  <a href={`tel:${contact.phoneDial}`} className="hover:text-cream">
                    {contact.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${contact.email}`} className="break-all hover:text-cream">
                    {contact.email}
                  </a>
                </li>
                <li>
                  <a href={`https://wa.me/${contact.whatsapp}`} className="hover:text-cream">
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-cream/12 py-7 text-[0.82rem] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {property.fullName}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            <li>
              <Link href="/#" className="hover:text-cream">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/#" className="hover:text-cream">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
