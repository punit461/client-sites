"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

/**
 * "Book an appointment" appears in the top bar, the header, the hero, every
 * treatment page, each clinician profile, the urgent-care panel and the mobile
 * bar. They all open one dialog, so the state lives here.
 */
interface BookingSeed {
  treatment?: string;
  clinician?: string;
}

interface BookingContext {
  isOpen: boolean;
  seed: BookingSeed;
  open: (seed?: BookingSeed) => void;
  close: () => void;
}

const Ctx = createContext<BookingContext | null>(null);

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
