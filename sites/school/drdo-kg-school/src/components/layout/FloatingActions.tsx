"use client";

import { ArrowUp, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { whatsappLink } from "@/content/school";

/** Back-to-top (after the first screen) and WhatsApp, bottom right. */
export default function FloatingActions() {
  const [show, setShow] = useState(false);
  const wa = whatsappLink("Hello, I have a question about the school.");

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <button
        type="button"
        onClick={() => {
          const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          window.scrollTo({ top: 0, behavior: still ? "auto" : "smooth" });
          document.querySelector<HTMLElement>("#top")?.focus({ preventScroll: true });
        }}
        aria-label="Back to top"
        tabIndex={show ? 0 : -1}
        aria-hidden={!show}
        className={`flex h-12 w-12 items-center justify-center rounded-sm border border-line bg-white text-navy shadow-soft transition duration-300 hover:border-navy ${
          show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <ArrowUp className="h-5 w-5" aria-hidden />
      </button>
      {wa ? (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-12 items-center justify-center rounded-sm bg-[#1f7a4d] text-white shadow-soft transition hover:bg-[#186640]"
        >
          <MessageCircle className="h-5 w-5" aria-hidden />
          <span className="sr-only">Message the school on WhatsApp</span>
        </a>
      ) : null}
    </div>
  );
}
