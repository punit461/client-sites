"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

/**
 * The "Schedule Pickup" CTA appears in the header, the hero, the pricing cards,
 * the final call to action and the mobile bar. They all open the same modal, so
 * the open/closed state lives once, here, rather than in each of them.
 */
interface BookingContext {
  isOpen: boolean;
  /** Optionally pre-selects a service, e.g. from a pricing card. */
  open: (serviceId?: string) => void;
  close: () => void;
  initialService?: string;
}

const Ctx = createContext<BookingContext | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialService, setInitialService] = useState<string | undefined>();

  const open = useCallback((serviceId?: string) => {
    setInitialService(serviceId);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, open, close, initialService }),
    [isOpen, open, close, initialService],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useBooking() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}
