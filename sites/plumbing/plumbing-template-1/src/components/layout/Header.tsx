"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { business, telHref } from "@/config/business";
import { primaryNav, serviceNav } from "@/config/navigation";
import { EASE } from "@/components/motion/Reveal";
import { Logo } from "./Logo";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href);

/** Trailing slashes differ between dev and export; compare without them. */
const norm = (p: string) => (p.length > 1 ? p.replace(/\/$/, "") : p);

export function Header() {
  const rawPath = usePathname() || "/";
  const pathname = norm(rawPath);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const servicesBtn = useRef<HTMLButtonElement>(null);
  const servicesWrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Navigating closes every menu (adjusted during render, not in an effect).
  const [lastPath, setLastPath] = useState(rawPath);
  if (lastPath !== rawPath) {
    setLastPath(rawPath);
    setServicesOpen(false);
    setDrawerOpen(false);
  }

  // The services panel closes on Escape (focus back to its button) and on a click elsewhere.
  useEffect(() => {
    if (!servicesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        servicesBtn.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!servicesWrap.current?.contains(e.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [servicesOpen]);

  const servicesActive = pathname.startsWith("/services");

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled || drawerOpen
          ? "border-b border-line/80 bg-ivory/95 shadow-[0_8px_30px_-20px_rgb(16_29_50/0.35)] backdrop-blur-md"
          : "border-b border-transparent bg-ivory"
      }`}
    >
      <div className="shell flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
        <Logo />

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-6 whitespace-nowrap text-[0.94rem] font-medium 2xl:gap-7">
            <li>
              <Link href="/" aria-current={pathname === "/" ? "page" : undefined} className="link-underline py-2">
                Home
              </Link>
            </li>
            <li>
              <div ref={servicesWrap} className="relative">
                <button
                  ref={servicesBtn}
                  type="button"
                  aria-expanded={servicesOpen}
                  aria-controls="services-menu"
                  onClick={() => setServicesOpen((o) => !o)}
                  className={`flex items-center gap-1 py-2 ${servicesActive ? "text-copper-ink" : ""}`}
                >
                  Services
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </button>
                <AnimatePresence>
                  {servicesOpen ? (
                    <motion.div
                      id="services-menu"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.2, ease: EASE }}
                      className="absolute left-1/2 top-full z-10 w-[34rem] -translate-x-1/2 pt-4"
                    >
                      <div className="rounded-2xl border border-line bg-white p-3 shadow-[var(--shadow-lift)]">
                        <ul className="grid grid-cols-2 gap-1">
                          {serviceNav.map((s) => (
                            <li key={s.href}>
                              <Link
                                href={s.href}
                                aria-current={isActive(pathname, norm(s.href)) ? "page" : undefined}
                                className="block rounded-lg px-3 py-2.5 text-[0.92rem] transition-colors hover:bg-ivory aria-[current=page]:bg-ivory aria-[current=page]:text-copper-ink"
                              >
                                {s.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-2 flex items-center justify-between rounded-xl bg-ivory px-4 py-3 text-sm">
                          <span className="text-slate">Not sure what you need?</span>
                          <Link href="/services/" className="font-semibold text-navy link-underline">
                            View all services
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </li>
            {primaryNav.slice(1).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, norm(item.href)) ? "page" : undefined}
                  className="link-underline py-2 aria-[current=page]:text-copper-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={telHref}
            className="hidden min-h-11 items-center gap-2 rounded-lg px-3 py-2 text-[0.94rem] font-semibold whitespace-nowrap text-navy transition-colors hover:bg-white md:flex"
          >
            <Phone className="h-4 w-4 text-copper-ink" strokeWidth={1.8} aria-hidden="true" />
            {/* At xl the full nav needs the room, so the number collapses to its icon. */}
            <span className="xl:sr-only 2xl:not-sr-only">
              <span className="sr-only">Call </span>
              {business.phone.display}
            </span>
          </a>
          <Link href="/request-a-quote/" className="btn btn-primary hidden min-h-11 px-5 sm:inline-flex">
            Request a Quote
          </Link>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-expanded={drawerOpen}
            aria-controls="mobile-menu"
            className="grid h-11 w-11 place-items-center rounded-lg border border-line bg-white text-navy xl:hidden"
          >
            <Menu className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </div>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} pathname={pathname} />
    </header>
  );
}

function MobileDrawer({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const panel = useRef<HTMLDivElement>(null);
  const opener = useRef<Element | null>(null);
  const still = useReducedMotion();
  const [servicesOpen, setServicesOpen] = useState(pathname.startsWith("/services"));

  const close = useCallback(() => onClose(), [onClose]);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    // Focus the first control once the panel exists.
    requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>("button, a")?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;
      // Keep Tab inside the drawer while it is open.
      const focusable = Array.from(
        panel.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
      ).filter((el) => el.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = prevOverflow;
      if (opener.current instanceof HTMLElement) opener.current.focus();
    };
  }, [open, close]);

  if (!mounted) return null;
  // Rendered into <body>: the header's backdrop-filter would otherwise become
  // the containing block for this fixed panel and clip it to the header.
  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="xl:hidden">
          <motion.div
            key="scrim"
            className="fixed inset-0 z-[60] bg-navy/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            aria-hidden="true"
          />
          <motion.div
            key="panel"
            id="mobile-menu"
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={still ? { opacity: 0 } : { x: "100%" }}
            animate={still ? { opacity: 1 } : { x: 0 }}
            exit={still ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col overflow-y-auto bg-ivory shadow-2xl"
          >
            <div className="flex h-[4.5rem] items-center justify-between border-b border-line px-5">
              <span className="font-display text-lg font-bold">Menu</span>
              <button
                type="button"
                onClick={close}
                className="grid h-11 w-11 place-items-center rounded-lg border border-line bg-white"
              >
                <X className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                <span className="sr-only">Close menu</span>
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 px-5 py-4">
              <ul className="divide-y divide-line">
                <li>
                  <DrawerLink href="/" pathname={pathname}>
                    Home
                  </DrawerLink>
                </li>
                <li>
                  <button
                    type="button"
                    aria-expanded={servicesOpen}
                    aria-controls="drawer-services"
                    onClick={() => setServicesOpen((o) => !o)}
                    className="flex min-h-14 w-full items-center justify-between py-3 font-display text-lg font-semibold"
                  >
                    Services
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                  </button>
                  <div id="drawer-services" hidden={!servicesOpen}>
                    <ul className="mb-3 space-y-0.5 border-l border-copper/50 pl-4">
                      {serviceNav.map((s) => (
                        <li key={s.href}>
                          <Link
                            href={s.href}
                            aria-current={pathname === norm(s.href) ? "page" : undefined}
                            className="flex min-h-11 items-center text-[0.97rem] text-slate aria-[current=page]:font-semibold aria-[current=page]:text-copper-ink"
                          >
                            {s.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link href="/services/" className="flex min-h-11 items-center font-semibold text-navy">
                          All services
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                {primaryNav.slice(1).map((item) => (
                  <li key={item.href}>
                    <DrawerLink href={item.href} pathname={pathname}>
                      {item.label}
                    </DrawerLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-3 border-t border-line bg-white px-5 py-5">
              <Link href="/request-a-quote/" className="btn btn-primary w-full">
                Request a Quote
              </Link>
              <a href={telHref} className="btn btn-outline w-full">
                <Phone className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                Call {business.phone.display}
              </a>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

function DrawerLink({ href, pathname, children }: { href: string; pathname: string; children: React.ReactNode }) {
  const active = isActive(pathname, norm(href));
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className="flex min-h-14 items-center py-3 font-display text-lg font-semibold aria-[current=page]:text-copper-ink"
    >
      {children}
    </Link>
  );
}
