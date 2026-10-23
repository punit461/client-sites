"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { FLOW } from "@/components/motion/Motion";
import { Icon } from "@/components/ui/Icon";
import { business, compactHours, telHref } from "@/config/business";
import { primaryNav } from "@/config/navigation";
import { Logo } from "./Logo";

const norm = (p: string) => (p.length > 1 ? p.replace(/\/$/, "") : p);
const isActive = (path: string, href: string) =>
  href === "/" ? path === "/" : path === norm(href) || path.startsWith(norm(href) + "/");

/**
 * Sticky header. At the top it shares the sand of the page hero; once the page
 * scrolls it becomes solid white with a hairline and soft shadow.
 */
export function Header() {
  const raw = usePathname() || "/";
  const path = norm(raw);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = useCallback(() => setOpen(false), [setOpen]);

  // Navigating closes the menu (adjusted during render, not in an effect).
  const [lastPath, setLastPath] = useState(raw);
  if (lastPath !== raw) {
    setLastPath(raw);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled ? "border-line-cool bg-white/95 shadow-[var(--shadow-soft)] backdrop-blur-md" : "border-transparent bg-sand"
      }`}
    >
      <div className="shell flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
        <Logo />

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-6 whitespace-nowrap text-[0.93rem] font-medium text-charcoal">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(path, item.href) ? "page" : undefined}
                  className="underline-draw py-2 transition-colors hover:text-teal aria-[current=page]:text-teal"
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
            className="hidden min-h-11 items-center gap-2 rounded-lg px-2.5 font-semibold whitespace-nowrap text-teal hover:bg-sage/60 md:flex"
          >
            <Icon name="phone" className="h-4 w-4 text-clay" strokeWidth={1.8} />
            {/* At xl the full menu needs the room; the number returns at 2xl. */}
            <span className="xl:sr-only 2xl:not-sr-only">
              <span className="sr-only">Call </span>
              {business.phone.display}
            </span>
          </a>
          <Link href="/request-a-quote/" className="btn btn-teal hidden min-h-11 px-5 sm:inline-flex">
            Request a Quote
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-white text-teal xl:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path d="M4 8h16M4 16h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </div>
      <Drawer open={open} onClose={close} path={path} />
    </header>
  );
}

function Drawer({ open, onClose, path }: { open: boolean; onClose: () => void; path: string }) {
  const panel = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>("button")?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab" || !panel.current) return;
      const els = Array.from(panel.current.querySelectorAll<HTMLElement>("a[href], button"));
      const first = els[0];
      const last = els[els.length - 1];
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
      html.style.overflow = prev;
      opener?.focus();
    };
  }, [open, onClose]);

  if (!mounted) return null;
  // Portalled to <body>: the header's backdrop-filter would otherwise become
  // the containing block for this fixed panel and clip it to the header.
  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="xl:hidden">
          <motion.div
            key="scrim"
            aria-hidden="true"
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-charcoal/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.div
            key="panel"
            id="site-menu"
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={still ? { opacity: 0 } : { x: "100%" }}
            animate={still ? { opacity: 1 } : { x: 0 }}
            exit={still ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: 0.38, ease: FLOW }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col overflow-y-auto rounded-l-[1.75rem] bg-sand shadow-2xl"
          >
            <div className="flex h-[4.5rem] shrink-0 items-center justify-between px-6">
              <span className="t-label text-clay">Menu</span>
              <button
                type="button"
                onClick={onClose}
                className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-white text-teal"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <span className="sr-only">Close menu</span>
              </button>
            </div>
            <nav aria-label="Mobile" className="flex-1 px-6">
              <ul className="divide-y divide-line">
                {primaryNav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={still ? false : { opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: still ? 0 : 0.1 + i * 0.03, duration: 0.3, ease: FLOW }}
                  >
                    <Link
                      href={item.href}
                      aria-current={isActive(path, item.href) ? "page" : undefined}
                      className="group flex min-h-14 items-center justify-between font-display text-xl font-semibold text-teal aria-[current=page]:text-clay"
                    >
                      {item.label}
                      <Icon name="arrow" className="arrow h-5 w-5 text-muted" strokeWidth={1.6} />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="shrink-0 space-y-3 px-6 pt-6 pb-8">
              <p className="text-sm text-stone">{compactHours()}</p>
              <Link href="/request-a-quote/" className="btn btn-teal w-full">
                Request a Quote
              </Link>
              <a href={telHref} className="btn btn-outline w-full bg-white">
                <Icon name="phone" className="h-4 w-4" strokeWidth={1.8} />
                {business.phone.display}
              </a>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
