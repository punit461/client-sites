import type { ReactNode } from "react";
import { Container, Marker } from "@/components/ui";

/**
 * The top of every page that is not the home page. A server component: it
 * renders the client `Marker`, which is allowed — what a server component
 * cannot do is *call* a function exported from a "use client" module.
 *
 * The padding clears the fixed header, which is transparent until you scroll.
 */
export default function PageHeader({
  index,
  marker,
  title,
  copy,
  children,
}: {
  index?: string;
  marker: string;
  title: ReactNode;
  copy?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-line pb-14 pt-36 sm:pt-44">
      <Container wide>
        <Marker index={index}>{marker}</Marker>
        <h1 className="display-xl mt-7 max-w-[16ch] text-bone">{title}</h1>
        {copy ? (
          <p className="mt-7 max-w-2xl text-[1.04rem] leading-relaxed text-bone-soft">{copy}</p>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
