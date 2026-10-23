"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { business, compactHours, telHref } from "@/config/business";
import { primaryNav } from "@/config/navigation";
import { ScrollProgress, SNAP } from "@/components/motion/Motion";
import { Logo } from "./Logo";

const norm = (p: string) => (p.length > 1 ? p.replace(/\/$/, "") : p);
const active = (path: string, href: string) => path === norm(href) || path.startsWith(norm(href) + "/");

export function Header() {
  const raw = usePathname() || "/";
  const path = norm(raw);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), [setOpen]);

  // Navigating closes the menu (adjusted during render, not in an effect).
  const [lastPath, setLastPath] = useState(raw);
  if (lastPath !== raw) {
    setLastPath(raw);
    setOpen(false);
  }

  return (
    <header className="dark sticky top-0 z-50 border-b border-rule-dark bg-charcoal">
      <div className="shell flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <Logo />

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-7 whitespace-nowrap font-display text-[0.95rem] font-medium text-white/85">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active(path, item.href) ? "page" : undefined}
                  className="nav-line py-2 transition-colors hover:text-white aria-[current=page]:text-white"
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
            className="hidden min-h-11 items-center gap-2 whitespace-nowrap px-2 font-display font-semibold text-white hover:text-lime md:flex"
          >
            <Phone className="h-4 w-4 text-lime" strokeWidth={2} aria-hidden="true" />
            <span className="sr-only">Call </span>
            {business.phone.display}
          </a>
          <a
            href={telHref}
            className="grid h-11 w-11 place-items-center rounded-[var(--radius-box)] border border-rule-dark text-lime md:hidden"
          >
            <Phone className="h-[1.1rem] w-[1.1rem]" strokeWidth={2} aria-hidden="true" />
            <span className="sr-only">Call {business.phone.display}</span>
          </a>
          <Link href="/request-a-quote/" className="btn btn-blue hidden min-h-11 sm:inline-flex">
            Get an Estimate
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="grid h-11 w-11 place-items-center rounded-[var(--radius-box)] bg-white text-charcoal xl:hidden"
          >
            <Menu className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </div>
      <ScrollProgress />
      <MenuOverlay open={open} onClose={close} path={path} />
    </header>
  );
}

function MenuOverlay({ open, onClose, path }: { open: boolean; onClose: () => void; path: string }) {
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
  // Portalled to <body> so no ancestor's transform or filter can trap the
  // fixed overlay.
  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key="menu"
          id="site-menu"
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={still ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          animate={still ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
          exit={still ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.35, ease: SNAP }}
          className="dark grid-lines fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-charcoal text-white xl:hidden"
        >
          <div className="shell flex h-16 shrink-0 items-center justify-between">
            <span className="t-label text-gray">Menu</span>
            <button
              type="button"
              onClick={onClose}
              className="grid h-11 w-11 place-items-center rounded-[var(--radius-box)] bg-white text-charcoal"
            >
              <X className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <nav aria-label="Mobile" className="shell flex-1 py-6">
            <ul>
              {[{ label: "Home", href: "/" }, ...primaryNav, { label: "Projects", href: "/projects/" }].map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={still ? false : { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: still ? 0 : 0.08 + i * 0.035, duration: 0.3, ease: SNAP }}
                  className="border-b border-rule-dark"
                >
                  <Link
                    href={item.href}
                    aria-current={(item.href === "/" ? path === "/" : active(path, item.href)) ? "page" : undefined}
                    className="group flex min-h-16 items-center justify-between font-display text-3xl font-bold tracking-tight aria-[current=page]:text-lime sm:text-4xl"
                  >
                    {item.label}
                    <ArrowRight className="nudge h-6 w-6 text-gray" strokeWidth={2} aria-hidden="true" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
          <div className="shell shrink-0 space-y-3 pb-8">
            <p className="text-sm text-gray">{compactHours()}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link href="/request-a-quote/" className="btn btn-lime">
                Get an Estimate
              </Link>
              <a href={telHref} className="btn btn-line-light">
                <Phone className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                {business.phone.display}
              </a>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
