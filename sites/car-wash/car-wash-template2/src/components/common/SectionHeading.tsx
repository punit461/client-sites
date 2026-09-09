"use client";
import { motion } from "framer-motion";
import { fadeUp } from "@/utils/animations";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  highlightedWord?: string;
}

function HighlightedTitle({
  title,
  highlightedWord,
}: {
  title: string;
  highlightedWord?: string;
}) {
  if (!highlightedWord) {
    return <>{title}</>;
  }

  const regex = new RegExp(`(${highlightedWord})`, "i");
  const parts = title.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="text-gradient-orange">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export default function SectionHeading({
  title,
  subtitle,
  highlightedWord,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="mx-auto max-w-2xl text-center"
    >
      <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-5xl">
        <HighlightedTitle title={title} highlightedWord={highlightedWord} />
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-text-secondary md:text-xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
