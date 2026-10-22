"use client";

import { ChevronDown, Clock, LogIn, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import Crest from "@/components/ui/Crest";
import { contact, nav, school } from "@/content/school";
import type { NavItem } from "@/content/types";

const strip = (p: string) => (p.length > 1 ? p.replace(/\/$/, "") : p);

function useIsActive() {
  const pathname = strip(usePathname() || "/");
  return useCallback(
    (href: string) => {
      const target = strip(href.split("#")[0]);
      return target === "/" ? pathname === "/" : pathname === target || pathname.startsWith(`${target}/`);
    },
    [pathname],
  );
}

/**
 * Fixed header. Transparent with white type over the navy hero every page
 * opens with; solid white once the page scrolls. The utility bar folds away
 * at the same moment so the sticky header stays slim.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const [seenPath, setSeenPath] = useState(pathname);

  // A navigation always closes the mobile menu (adjusting state during render, not in an effect).
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <UtilityBar hidden={solid} />
      <div
        className={`transition-[background-color,box-shadow,color] duration-500 ${
          solid ? "bg-white/95 text-navy shadow-[0_1px_0_rgb(26_42_94/0.08),0_10px_30px_rgb(26_42_94/0.06)] backdrop-blur-md" : "bg-transparent text-white"
        }`}
      >
        <div className={`container-x flex items-center justify-between gap-3 transition-[height] duration-500 ${solid ? "h-[4.5rem]" : "h-20 lg:h-24"}`}>
          <Link href="/" className="flex min-w-0 shrink items-center gap-2.5 sm:shrink-0 sm:gap-3" aria-label={`${school.name} — home`}>
            <Crest className="h-10 w-10 shrink-0 sm:h-11 sm:w-11" />
            <span className="min-w-0 leading-none">
              <span className="block truncate font-display text-[1.05rem] tracking-tight min-[400px]:text-[1.2rem] sm:text-[1.45rem]">{school.shortName}</span>
              <span className={`mt-1 hidden text-[0.62rem] font-semibold uppercase tracking-[0.22em] sm:block ${solid ? "text-gold-ink" : "text-gold"}`}>
                {school.descriptor}
              </span>
            </span>
          </Link>

          <DesktopNav solid={solid} />

          <div className="flex items-center gap-2">
            <Link
              href="/admissions/#enquire"
              className={`inline-flex min-h-11 items-center whitespace-nowrap rounded-sm px-4 text-[0.86rem] font-semibold tracking-wide transition sm:px-5 ${
                solid ? "bg-navy text-white hover:bg-blue" : "bg-gold text-navy-deep hover:bg-gold-hover"
              }`}
            >
              <span className="sm:hidden">Enquire</span>
              <span className="hidden sm:inline 2xl:hidden">Enquire Now</span>
              <span className="hidden 2xl:inline">Admission Enquiry</span>
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-current/20 xl:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden />
              <span className="sr-only">Open menu</span>
            </button>
          </div>
        </div>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}

function UtilityBar({ hidden }: { hidden: boolean }) {
  return (
    <div
      className={`hidden overflow-hidden bg-navy-deep text-[0.78rem] text-white/75 transition-[max-height,opacity] duration-500 md:block ${
        hidden ? "max-h-0 opacity-0" : "max-h-10 opacity-100"
      }`}
      aria-hidden={hidden}
      inert={hidden}
    >
      <div className="container-x flex h-9 items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <a href={contact.phoneHref} className="inline-flex items-center gap-2 transition hover:text-white">
            <Phone className="h-3.5 w-3.5 text-gold" aria-hidden />
            {contact.phone}
          </a>
          {contact.email ? (
            <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 transition hover:text-white">
              <Mail className="h-3.5 w-3.5 text-gold" aria-hidden />
              {contact.email}
            </a>
          ) : null}
          <span className="hidden items-center gap-2 lg:inline-flex">
            <Clock className="h-3.5 w-3.5 text-gold" aria-hidden />
            {contact.schoolTimings}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-white">
            <MapPin className="h-3.5 w-3.5 text-gold" aria-hidden />
            {contact.address.locality}, {contact.address.city}
          </a>
          <Link href="/admissions/#faq" className="transition hover:text-white">
            Admissions FAQ
          </Link>
          {contact.parentPortal ? (
            <a href={contact.parentPortal} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-gold transition hover:text-white">
              <LogIn className="h-3.5 w-3.5" aria-hidden />
              Parent Portal
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function DesktopNav({ solid }: { solid: boolean }) {
  const isActive = useIsActive();
  const [open, setOpen] = useState<string | null>(null);
  const pathname = usePathname();
  const [seenPath, setSeenPath] = useState(pathname);

  // A navigation always closes any open dropdown.
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setOpen(null);
  }

  return (
    <nav aria-label="Main" className="hidden xl:block">
      <ul className="flex items-center">
        {nav.map((item) =>
          item.children ? (
            <Dropdown
              key={item.label}
              item={item}
              solid={solid}
              open={open === item.label}
              setOpen={(v) => setOpen(v ? item.label : null)}
              active={item.children.some((c) => isActive(c.href)) || isActive(item.href)}
              isActive={isActive}
            />
          ) : (
            <li key={item.label}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="relative flex h-11 items-center whitespace-nowrap px-2 text-[0.82rem] font-semibold tracking-wide 2xl:px-3 2xl:text-[0.86rem]"
              >
                {item.label}
                <ActiveBar on={isActive(item.href)} solid={solid} />
              </Link>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}

function ActiveBar({ on, solid }: { on: boolean; solid: boolean }) {
  return (
    <span
      aria-hidden
      className={`absolute inset-x-2 bottom-1 h-px 2xl:inset-x-3 origin-left transition-transform duration-500 ${solid ? "bg-gold-ink" : "bg-gold"} ${
        on ? "scale-x-100" : "scale-x-0"
      }`}
    />
  );
}

/**
 * Disclosure-pattern dropdown: the label is a button (its first link is the
 * section overview), opens on click, hover or Enter/Space, and closes on
 * Escape, outside click, or when focus leaves it.
 */
function Dropdown({
  item,
  solid,
  open,
  setOpen,
  active,
  isActive,
}: {
  item: NavItem;
  solid: boolean;
  open: boolean;
  setOpen: (v: boolean) => void;
  active: boolean;
  isActive: (href: string) => boolean;
}) {
  const id = useId();
  const ref = useRef<HTMLLIElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open, setOpen]);

  return (
    <li
      ref={ref}
      className="relative"
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        clearTimeout(hoverTimer.current);
        setOpen(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        hoverTimer.current = setTimeout(() => setOpen(false), 140);
      }}
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          button.current?.focus();
        }
      }}
    >
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
        className="relative flex h-11 items-center gap-1 whitespace-nowrap px-2 text-[0.82rem] font-semibold tracking-wide 2xl:px-3 2xl:text-[0.86rem]"
      >
        {item.label}
        <ChevronDown className={`h-3.5 w-3.5 opacity-70 transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden />
        <ActiveBar on={active} solid={solid} />
      </button>
      <div
        id={id}
        className={`absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3 transition duration-300 ease-out ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <ul className="overflow-hidden rounded-sm border border-line bg-white p-2 text-navy shadow-lift">
          {item.children!.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                aria-current={isActive(c.href) && !c.href.includes("#") ? "page" : undefined}
                onClick={() => setOpen(false)}
                className="group block rounded-xs px-4 py-3 transition hover:bg-ivory focus-visible:bg-ivory aria-[current=page]:bg-ivory"
              >
                <span className="flex items-center gap-2 text-[0.9rem] font-semibold">
                  {c.label}
                  <span className="h-px w-0 bg-gold-ink transition-all duration-300 group-hover:w-4" aria-hidden />
                </span>
                {c.description ? <span className="mt-0.5 block text-[0.78rem] text-slate">{c.description}</span> : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

/**
 * A native modal <dialog>: it traps focus, closes on Escape and returns focus
 * to the menu button by itself, which is most of an accessible menu for free.
 */
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const isActive = useIsActive();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && d.open) {
      d.close();
    }
    if (!open) document.documentElement.style.overflow = "";
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      aria-label="Site menu"
      className="m-0 ml-auto h-dvh max-h-none w-full max-w-md bg-navy p-0 text-white backdrop:bg-navy-deep/80 open:animate-[page-in_0.35s_ease-out]"
    >
      <div className="flex h-full flex-col">
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-line-dark px-5">
          <span className="flex items-center gap-3">
            <Crest className="h-10 w-10" />
            <span className="font-display text-xl">{school.shortName}</span>
          </span>
          <button type="button" onClick={onClose} className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-white/20" autoFocus>
            <X className="h-5 w-5" aria-hidden />
            <span className="sr-only">Close menu</span>
          </button>
        </div>

        <nav aria-label="Main" className="flex-1 overflow-y-auto px-5 py-4">
          <ul className="divide-y divide-white/10">
            {nav.map((item) =>
              item.children ? (
                <li key={item.label}>
                  <details className="group" open={item.children.some((c) => isActive(c.href))}>
                    <summary className="flex min-h-14 items-center justify-between font-display text-[1.45rem]">
                      {item.label}
                      <ChevronDown className="h-5 w-5 text-gold transition-transform group-open:rotate-180" aria-hidden />
                    </summary>
                    <ul className="pb-4 pl-1">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            onClick={onClose}
                            aria-current={isActive(c.href) && !c.href.includes("#") ? "page" : undefined}
                            className="flex min-h-11 items-center gap-3 text-[0.97rem] text-white/75 transition hover:text-white aria-[current=page]:text-gold"
                          >
                            <span className="h-px w-3 bg-gold/60" aria-hidden />
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="flex min-h-14 items-center font-display text-[1.45rem] aria-[current=page]:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="shrink-0 space-y-3 border-t border-line-dark p-5">
          <Link
            href="/admissions/#enquire"
            onClick={onClose}
            className="flex min-h-12 w-full items-center justify-center rounded-sm bg-gold font-semibold text-navy-deep"
          >
            Admission Enquiry
          </Link>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <a href={contact.phoneHref} className="flex min-h-11 items-center justify-center gap-2 rounded-sm border border-white/20">
              <Phone className="h-4 w-4 text-gold" aria-hidden /> Call
            </a>
            {contact.parentPortal ? (
              <a href={contact.parentPortal} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center gap-2 rounded-sm border border-white/20">
                <LogIn className="h-4 w-4 text-gold" aria-hidden /> Parent Portal
              </a>
            ) : contact.email ? (
              <a href={`mailto:${contact.email}`} className="flex min-h-11 items-center justify-center gap-2 rounded-sm border border-white/20">
                <Mail className="h-4 w-4 text-gold" aria-hidden /> Email
              </a>
            ) : (
              <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center gap-2 rounded-sm border border-white/20">
                <MapPin className="h-4 w-4 text-gold" aria-hidden /> Directions
              </a>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}
