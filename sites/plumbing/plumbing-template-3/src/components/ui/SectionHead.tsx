import type { ReactNode } from "react";

/** Small uppercase label with a terracotta dash, above section titles. */
export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`t-label flex items-center gap-3 ${light ? "text-sage" : "text-clay"}`}>
      <span aria-hidden="true" className="h-[2px] w-7 rounded-full bg-terracotta" />
      {children}
    </p>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  id,
  light = false,
  center = false,
  as: Tag = "h2",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  light?: boolean;
  center?: boolean;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center [&>p:first-child]:justify-center" : ""} ${className}`}>
      {eyebrow ? <Eyebrow light={light}>{eyebrow}</Eyebrow> : null}
      <Tag id={id} className={`${Tag === "h1" ? "t-h1" : "t-h2"} mt-4 ${light ? "!text-white" : ""}`}>
        {title}
      </Tag>
      {lead ? <div className={`t-lead mt-5 ${light ? "text-sage" : "text-stone"}`}>{lead}</div> : null}
    </div>
  );
}
