"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Container } from "@/components/ui/primitives";
import { img } from "@/lib/images";

/**
 * Three image layers moving at different speeds. Scroll-driven transforms
 * rather than `background-attachment: fixed`, which iOS Safari has never
 * supported and which repaints the whole layer every frame.
 *
 * The stack, back to front: photo, tint, the two drifting plates, a scrim, and
 * finally the text. The scrim is the important one — without it a bright plate
 * can drift behind the headline and make it unreadable.
 */
export default function ParallaxRoom() {
  const ref = useRef<HTMLElement>(null);
  const still = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const backY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["16%", "-16%"]);
  const frontY = useTransform(scrollYProgress, [0, 1], ["34%", "-30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["18%", "-18%"]);

  return (
    <section
      ref={ref}
      aria-label="Inside the facility"
      className="relative isolate min-h-[42rem] overflow-hidden bg-ink sm:min-h-[52rem]"
    >
      {/* back: the machines */}
      <motion.div className="absolute inset-0 z-[-40]" style={still ? undefined : { y: backY }}>
        <Image
          src={img.roomBack}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="scale-110 object-cover opacity-70"
        />
      </motion.div>
      <div className="absolute inset-0 z-[-30] bg-ink/55" aria-hidden />

      {/* middle: a rail of clothes, drifting the other way */}
      <motion.div
        className="absolute -right-12 top-[8%] z-[-20] h-48 w-64 overflow-hidden rounded-[28px] sm:right-[4%] sm:h-72 sm:w-80"
        style={still ? undefined : { y: midY }}
      >
        <Image
          src={img.roomMid}
          alt=""
          aria-hidden
          fill
          sizes="(max-width: 640px) 16rem, 20rem"
          className="object-cover"
        />
      </motion.div>

      {/* front: a basket, fastest */}
      <motion.div
        className="absolute -left-10 bottom-[8%] z-[-20] h-44 w-56 overflow-hidden rounded-[24px] sm:left-[5%] sm:h-60 sm:w-72"
        style={still ? undefined : { y: frontY }}
      >
        <Image
          src={img.roomFront}
          alt=""
          aria-hidden
          fill
          sizes="(max-width: 640px) 14rem, 18rem"
          className="object-cover"
        />
      </motion.div>

      {/* scrim: sits above every plate so the headline always stays readable */}
      <div
        className="absolute inset-0 z-[-10] bg-[radial-gradient(ellipse_at_center,rgba(10,10,10,0.82)_38%,rgba(10,10,10,0.45)_72%)]"
        aria-hidden
      />

      <Container wide className="relative z-10 flex min-h-[42rem] items-center sm:min-h-[52rem]">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          style={still ? undefined : { y: textY }}
        >
          <h2 className="type-xl text-paper">
            Professional equipment.
            <br />
            Professional results.
          </h2>
          <p className="mx-auto mt-6 max-w-md text-[1.02rem] leading-relaxed text-paper/70">
            Commercial drums, calibrated dosing and form presses. The difference between a machine
            built for one household and one built for four hundred.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
