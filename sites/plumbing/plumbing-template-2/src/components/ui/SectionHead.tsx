import type { ReactNode } from "react";

/** The small uppercase label with a square marker, used above section titles. */
export function Label({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={`t-label flex items-center gap-2.5 ${dark ? "text-gray" : "text-ink-soft"}`}>
      <span aria-hidden="true" className={`h-2 w-2 ${dark ? "bg-lime" : "bg-blue"}`} />
      {children}
    </p>
  );
}

export function SectionHead({
  label,
  title,
  lead,
  dark = false,
  id,
  as: Tag = "h2",
  className = "",
}: {
  label?: string;
  title: ReactNode;
  lead?: ReactNode;
  dark?: boolean;
  id?: string;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      {label ? <Label dark={dark}>{label}</Label> : null}
      <Tag id={id} className={`${Tag === "h1" ? "t-h1" : "t-h2"} mt-4 ${dark ? "text-white" : "text-charcoal"}`}>
        {title}
      </Tag>
      {lead ? <div className={`t-lead mt-5 max-w-2xl ${dark ? "text-gray" : "text-ink-soft"}`}>{lead}</div> : null}
    </div>
  );
}
