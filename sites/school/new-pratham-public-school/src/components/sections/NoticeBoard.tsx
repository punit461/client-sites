import { CalendarDays, Download, Megaphone } from "lucide-react";
import Link from "next/link";
import { Container, Pill } from "@/components/ui/primitives";
import { notices } from "@/data/content";
import { contact, socials } from "@/data/school";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default function NoticeBoard() {
  return (
    <section className="py-16 sm:py-24">
      <Container narrow>
        {notices.length ? (
          <ol className="space-y-4">
            {notices.map((n) => (
              <li key={`${n.date}-${n.title}`} className="card p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Pill tone={n.kind === "circular" ? "leaf" : "coral"}>{n.kind}</Pill>
                  <time dateTime={n.date} className="inline-flex items-center gap-1.5 text-[0.8rem] text-ink-faint">
                    <CalendarDays className="h-3.5 w-3.5" strokeWidth={1.9} aria-hidden />
                    {formatDate(n.date)}
                  </time>
                </div>
                <h2 className="mt-3 font-display text-[1.25rem] font-semibold text-ink">{n.title}</h2>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-soft">{n.copy}</p>
                {n.href ? (
                  <a
                    href={n.href}
                    className="mt-4 inline-flex items-center gap-2 text-[0.85rem] font-semibold text-coral-deep hover:text-ink"
                  >
                    <Download className="h-4 w-4" strokeWidth={1.9} aria-hidden />
                    Download
                  </a>
                ) : null}
              </li>
            ))}
          </ol>
        ) : (
          <div className="card flex flex-col items-center p-10 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-saffron-wash text-saffron-deep">
              <Megaphone className="h-6 w-6" strokeWidth={1.7} aria-hidden />
            </span>
            <h2 className="mt-5 font-display text-[1.5rem] font-semibold text-ink">No notices at the moment</h2>
            <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-ink-soft">
              Circulars and announcements will appear here as the school publishes them. In the meantime, the
              office is the quickest way to get an answer.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href={`tel:${contact.phoneDial}`}
                className="rounded-full bg-ink px-5 py-3 text-[0.86rem] font-semibold text-cream transition hover:bg-ink/90"
              >
                Call {contact.phone}
              </a>
              <a
                href={socials[2].href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-line bg-surface px-5 py-3 text-[0.86rem] font-semibold text-ink transition hover:bg-surface-2"
              >
                WhatsApp the office
              </a>
              <Link
                href="/mandatory-disclosure"
                className="rounded-full border border-line bg-surface px-5 py-3 text-[0.86rem] font-semibold text-ink transition hover:bg-surface-2"
              >
                Mandatory disclosure
              </Link>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
