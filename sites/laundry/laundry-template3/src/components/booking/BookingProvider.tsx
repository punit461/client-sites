"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

/** What a call site can pre-fill before the drawer opens. */
export interface BookingSeed {
  /** ISO date, as the day chips emit it. */
  day?: string;
  window?: string;
  frequency?: string;
  /** A plan id, when the request came from a membership card. */
  plan?: string;
}

interface BookingContext {
  isOpen: boolean;
  seed: BookingSeed;
  open: (seed?: BookingSeed) => void;
  close: () => void;
}

const Ctx = createContext<BookingContext | null>(null);

/**
 * "Book a collection" appears in the header, the hero, every membership card,
 * the stain guide, the mobile dock and the final call to action. They all open
 * one drawer, so its state lives here rather than in each of them.
 */
export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [seed, setSeed] = useState<BookingSeed>({});

  const open = useCallback((next: BookingSeed = {}) => {
    setSeed(next);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, seed, open, close }), [isOpen, seed, open, close]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useBooking() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}
