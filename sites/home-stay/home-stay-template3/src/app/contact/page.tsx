import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import { Faq, FinalCta } from "@/components/sections/Closing";
import Journey from "@/components/sections/Journey";
import { Container, Icon } from "@/components/ui";
import { contact, property } from "@/data/stay";
import { numeral } from "@/lib/format";

export const metadata: Metadata = {
  title: "Contact",
  description: `Phone, WhatsApp, email and directions for ${property.fullName}, ${property.region}.`,
};

const WAYS = [
  {
    icon: "phone" as const,
    term: "Phone",
    value: contact.phone,
    href: `tel:${contact.phoneDial}`,
    note: "Thomas, usually. Between seven and nine.",
  },
  {
    icon: "sparkles" as const,
    term: "WhatsApp",
    value: "Message us",
    href: `https://wa.me/${contact.whatsapp}`,
    note: "The fastest way to reach anyone here.",
  },
  {
    icon: "mail" as const,
    term: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
    note: "Answered within a day, usually the same evening.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        index={numeral(1)}
        marker="Contact"
        title="Write, call, or send a message."
        copy="A person reads all of it. For dates, the enquiry form is quickest — it collects what we would otherwise have to ask you for."
      >
        <Link
          href="/booking"
          className="mt-9 inline-flex items-center gap-2.5 rounded-sm bg-brass px-7 py-4 text-[0.88rem] font-medium text-ink transition-colors hover:bg-brass-deep"
        >
          Check dates
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </PageHeader>

      <section className="py-16 sm:py-24">
        <Container wide>
          <ul className="grid gap-5 sm:grid-cols-3">
            {WAYS.map((way) => (
              <li key={way.term}>
                <a
                  href={way.href}
                  className="group flex h-full flex-col rounded-sm border border-line bg-ink-2 p-6 transition-colors hover:border-brass"
                >
                  <Icon name={way.icon} className="h-5 w-5 text-brass" />
                  <p className="label mt-5 text-bone-faint">{way.term}</p>
                  <p className="mt-2 break-all text-[1.05rem] text-bone transition-colors group-hover:text-brass">
                    {way.value}
                  </p>
                  <p className="mt-auto pt-5 text-[0.86rem] leading-relaxed text-bone-soft">{way.note}</p>
                </a>
              </li>
            ))}
          </ul>

          <p className="mono mt-8 text-[0.76rem] text-bone-faint">{contact.hours}</p>
        </Container>
      </section>

      <Journey index={numeral(2)} />
      <Faq index={numeral(3)} />
      <FinalCta />
    </>
  );
}
