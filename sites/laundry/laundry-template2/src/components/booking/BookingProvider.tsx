"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

/** What the hero's floating card hands to the modal when it opens it. */
export interface BookingSeed {
  day?: string;
  window?: string;
}

interface BookingContext {
  isOpen: boolean;
  seed: BookingSeed;
  open: (seed?: BookingSeed) => void;
  close: () => void;
}

const Ctx = createContext<BookingContext | null>(null);

/**
 * "Book a pickup" appears in the header, the hero, the hero's booking card,
 * the calculator and the final CTA. They all open one modal, so the state
 * lives here rather than in each of them.
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
