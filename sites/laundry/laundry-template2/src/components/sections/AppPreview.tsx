"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useRef, useState } from "react";
import { TextReveal } from "@/components/animations";
import { Container, Label } from "@/components/ui/primitives";
import { appScreens } from "@/data/content";
import { garments, rupees } from "@/data/pricing";

/** The five app screens, drawn rather than screenshotted — no asset to go stale. */
function Screen({ name }: { name: string }) {
  if (name === "Schedule pickup") {
    return (
      <div className="flex h-full flex-col gap-3 p-4">
        <p className="font-display text-[1.05rem] font-bold uppercase tracking-tight">Pickup</p>
        <div className="grid grid-cols-3 gap-1.5">
          {["Today", "Tue", "Wed"].map((d, i) => (
            <div
              key={d}
              className={`rounded-lg py-2 text-center text-[0.6rem] font-bold ${
                i === 1 ? "bg-ink text-paper" : "bg-paper-2 text-ink"
              }`}
            >
              {d}
            </div>
          ))}
        </div>
        <div className="space-y-1.5">
          {["9 – 11 AM", "3 – 5 PM", "7 – 9 PM"].map((t, i) => (
            <div
              key={t}
              className={`rounded-lg px-3 py-2 text-[0.62rem] font-semibold ${
                i === 0 ? "bg-lime text-ink" : "bg-paper-2 text-ink-soft"
              }`}
            >
              {t}
            </div>
          ))}
        </div>
        <div className="mt-auto rounded-full bg-ink py-2.5 text-center text-[0.62rem] font-bold text-paper">
          Confirm
        </div>
      </div>
    );
  }

  if (name === "Order tracking") {
    return (
      <div className="flex h-full flex-col gap-3 p-4">
        <p className="font-mono text-[0.6rem] uppercase tracking-wider text-ink-faint">LOOP-20481</p>
        <p className="font-display text-[0.95rem] font-bold uppercase">Out for delivery</p>
        <ol className="mt-1 space-y-2.5">
          {["Pickup", "Cleaning", "Ironing", "Quality", "On the way"].map((s, i) => (
            <li key={s} className="flex items-center gap-2">
              <span
                className={`flex h-4 w-4 flex-none items-center justify-center rounded-full ${
                  i < 4 ? "bg-lime text-ink" : "bg-paper-2"
                }`}
              >
                {i < 4 ? <Check className="h-2.5 w-2.5" strokeWidth={4} /> : null}
              </span>
              <span className={`text-[0.62rem] ${i < 4 ? "text-ink" : "text-ink-faint"}`}>{s}</span>
            </li>
          ))}
        </ol>
        <div className="mt-auto rounded-xl bg-paper-2 p-2.5 text-[0.58rem] text-ink-soft">
          Arriving today by 7:30 PM
        </div>
      </div>
    );
  }

  if (name === "Pricing") {
    return (
      <div className="flex h-full flex-col gap-2 p-4">
        <p className="font-display text-[1.05rem] font-bold uppercase tracking-tight">Rates</p>
        {garments.slice(0, 5).map((g) => (
          <div key={g.id} className="flex items-center justify-between border-b border-line py-1.5">
            <span className="text-[0.62rem] text-ink">{g.name}</span>
            <span className="text-[0.62rem] font-bold text-ink">{rupees(g.price)}</span>
          </div>
        ))}
        <div className="mt-auto flex items-center justify-between rounded-xl bg-ink px-3 py-2.5">
          <span className="text-[0.58rem] text-paper/60">Total</span>
          <span className="text-[0.75rem] font-bold text-lime">₹486</span>
        </div>
      </div>
    );
  }

  if (name === "Profile") {
    return (
      <div className="flex h-full flex-col gap-3 p-4">
        <div className="flex items-center gap-2.5">
          <span className="h-9 w-9 rounded-full bg-lime" aria-hidden />
          <span>
            <span className="block text-[0.72rem] font-bold text-ink">Rahul M.</span>
            <span className="block text-[0.55rem] text-ink-faint">LOOP since 2023</span>
          </span>
        </div>
        {["Addresses", "Payment methods", "Recurring pickups", "Order history"].map((row) => (
          <div
            key={row}
            className="flex items-center justify-between rounded-lg bg-paper-2 px-3 py-2.5 text-[0.62rem] text-ink"
          >
            {row}
            <ArrowRight className="h-2.5 w-2.5" />
          </div>
        ))}
      </div>
    );
  }

  // Home
  return (
    <div className="flex h-full flex-col gap-3 p-4">
      <p className="text-[0.58rem] text-ink-faint">Good evening,</p>
      <p className="font-display text-[1.15rem] font-bold uppercase leading-none tracking-tight">
        Send a bag
      </p>
      <div className="rounded-xl bg-lime p-3">
        <p className="text-[0.58rem] font-bold uppercase tracking-wider text-ink/70">Next pickup</p>
        <p className="mt-0.5 text-[0.75rem] font-bold text-ink">Tomorrow, 9 – 11 AM</p>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {["Laundry", "Dry clean", "Ironing", "Shoes"].map((s) => (
          <div
            key={s}
            className="rounded-lg bg-paper-2 px-2.5 py-3 text-[0.6rem] font-semibold text-ink"
          >
            {s}
          </div>
        ))}
      </div>
      <div className="mt-auto rounded-full bg-ink py-2.5 text-center text-[0.62rem] font-bold text-paper">
        Book a pickup
      </div>
    </div>
  );
}

export default function AppPreview() {
  const ref = useRef<HTMLElement>(null);
  const still = useReducedMotion();
  const [screen, setScreen] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const y = useTransform(scrollYProgress, [0, 1], [90, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [7, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [0, 1]);

  return (
    <section ref={ref} className="overflow-hidden bg-paper py-24 sm:py-32">
      <Container wide>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Label>The app</Label>
            <TextReveal
              text="Your wardrobe, in your pocket."
              className="type-xl mt-5 max-w-[12ch] text-ink"
            />
            <p className="mt-6 max-w-md text-[0.98rem] leading-relaxed text-ink-soft">
              Book, reschedule, track and pay without talking to anybody. Pick a screen to see it.
            </p>

            <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="App screens">
              {appScreens.map((name, i) => (
                <button
                  key={name}
                  type="button"
                  role="tab"
                  aria-selected={i === screen}
                  onClick={() => setScreen(i)}
                  className={`rounded-full border px-4 py-2.5 text-[0.82rem] font-semibold transition-all duration-200 ${
                    i === screen
                      ? "border-ink bg-ink text-paper"
                      : "border-line bg-paper text-ink hover:border-ink/45"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* ------------------------------------------------ the handset */}
          <motion.div
            className="mx-auto w-full max-w-[17rem]"
            style={still ? undefined : { y, rotate, opacity }}
          >
            <div className="relative aspect-[9/19] rounded-[2.4rem] border-[6px] border-ink bg-ink p-1.5 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.6)]">
              {/* notch */}
              <span
                className="absolute left-1/2 top-2.5 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-ink"
                aria-hidden
              />
              <div className="h-full overflow-hidden rounded-[1.9rem] bg-paper pt-5">
                <Screen name={appScreens[screen]} />
              </div>
            </div>
            <p className="mt-4 text-center text-[0.78rem] text-ink-faint">
              {appScreens[screen]} — illustrative preview
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
