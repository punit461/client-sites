"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Search } from "lucide-react";
import { useState } from "react";
import { Reveal, TextReveal } from "@/components/animations";
import { Container, Label } from "@/components/ui/primitives";
import { serviceAreas, servedPincodes } from "@/data/site";

type Result = { ok: boolean; message: string } | null;

export default function Locations() {
  const still = useReducedMotion();
  const [pin, setPin] = useState("");
  const [result, setResult] = useState<Result>(null);

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pin)) {
      setResult({ ok: false, message: "A PIN code is six digits." });
      return;
    }
    setResult(
      servedPincodes.includes(pin)
        ? { ok: true, message: "Good news — we collect from this PIN code. Slots open daily from 7 AM." }
        : {
            ok: false,
            message:
              "Not collecting here yet. Leave your PIN with us and you will hear the week it opens.",
          },
    );
  };

  return (
    <section id="areas" className="bg-paper-2/60 py-24 sm:py-32">
      <Container wide>
        {/* min-w-0 on the columns: a grid item's automatic minimum is its
            content's min-content, so without it the PIN input's intrinsic
            width pushes the whole page sideways on a narrow phone. */}
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16 [&>*]:min-w-0">
          <div>
            <Label>Coverage</Label>
            <TextReveal
              text="Fresh clothes, wherever you are."
              className="type-xl mt-5 max-w-[13ch] text-ink"
            />

            <form onSubmit={check} className="mt-9 max-w-sm" noValidate>
              <label htmlFor="pincode" className="label mb-2.5 block text-ink-faint">
                Check availability
              </label>
              <div className="flex flex-col gap-2.5 min-[380px]:flex-row">
                <input
                  id="pincode"
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value.replace(/\D/g, "").slice(0, 6));
                    setResult(null);
                  }}
                  inputMode="numeric"
                  placeholder="Enter your PIN code"
                  aria-describedby="pin-result"
                  className="min-w-0 flex-1 rounded-full border border-line bg-paper px-5 py-3.5 text-[0.92rem] text-ink outline-none transition placeholder:text-ink-faint focus:border-ink"
                />
                <button
                  type="submit"
                  className="inline-flex flex-none items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[0.88rem] font-semibold text-paper transition hover:bg-night"
                >
                  <Search className="h-4 w-4" strokeWidth={2.2} />
                  Check area
                </button>
              </div>

              <p
                id="pin-result"
                role="status"
                className={`mt-3 min-h-[2.4rem] text-[0.85rem] leading-relaxed ${
                  result?.ok ? "text-ink" : "text-ink-soft"
                }`}
              >
                {result?.message ?? ""}
              </p>
            </form>

            <p className="mt-2 max-w-sm text-[0.78rem] leading-relaxed text-ink-faint">
              Cities are listed with the number of areas currently collected from. Anything marked
              &ldquo;opening soon&rdquo; is not yet served.
            </p>
          </div>

          {/* ------------------------------------------------ the map card */}
          <Reveal>
            <div className="relative overflow-hidden rounded-[28px] border border-line bg-paper p-6 sm:p-8">
              {/* An abstract grid standing in for a map — no third-party tiles,
                  no API key, nothing to break when a plan expires. */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #0a0a0a 1px, transparent 1px), linear-gradient(to bottom, #0a0a0a 1px, transparent 1px)",
                  backgroundSize: "34px 34px",
                }}
                aria-hidden
              />

              <ul className="relative space-y-1">
                {serviceAreas.map((area, i) => (
                  <motion.li
                    key={area.city}
                    initial={still ? false : { opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="flex items-center gap-4 border-b border-line py-4 last:border-b-0"
                  >
                    <span
                      className={`flex h-9 w-9 flex-none items-center justify-center rounded-full ${
                        area.live ? "bg-lime text-ink" : "bg-paper-2 text-ink-faint"
                      }`}
                    >
                      <MapPin className="h-4 w-4" strokeWidth={2} aria-hidden />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-[1.05rem] font-bold tracking-tight text-ink">
                        {area.city}
                      </span>
                      <span className="block text-[0.8rem] text-ink-faint">
                        {area.live ? `${area.areas} areas collected` : "Opening soon"}
                      </span>
                    </span>

                    {area.live ? (
                      <span className="label flex-none text-ink-faint">Live</span>
                    ) : (
                      <span className="label flex-none rounded-full border border-line px-3 py-1 text-ink-faint">
                        Soon
                      </span>
                    )}
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
