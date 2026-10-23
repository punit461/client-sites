import type { ReactNode } from "react";

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={`t-eyebrow flex items-center gap-3 ${dark ? "text-copper-soft" : "text-copper-ink"}`}>
      <span aria-hidden="true" className={`h-px w-8 ${dark ? "bg-copper-soft/60" : "bg-copper"}`} />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  dark = false,
  align = "left",
  id,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  dark?: boolean;
  align?: "left" | "center";
  id?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center [&_p.t-eyebrow]:justify-center" : ""}`}>
      {eyebrow ? <Eyebrow dark={dark}>{eyebrow}</Eyebrow> : null}
      <Tag id={id} className={`${Tag === "h1" ? "t-h1" : "t-h2"} mt-4 ${dark ? "text-ivory" : "text-navy"}`}>
        {title}
      </Tag>
      {lead ? <div className={`t-lead mt-5 ${dark ? "text-ivory/75" : "text-slate"}`}>{lead}</div> : null}
    </div>
  );
}
