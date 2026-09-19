import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/sections/Closing";
import { Container, Icon, Label } from "@/components/ui";
import { contact, property } from "@/data/stay";

export const metadata: Metadata = {
  title: "Contact",
  description: `Reach ${property.fullName} by phone, WhatsApp or email.`,
};

const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contact.mapsQuery)}`;

export default function ContactPage() {
  return (
    <>
      <section className="pb-8 pt-16 sm:pt-24">
        <Container wide>
          <Label>Contact</Label>
          <h1 className="display-xl mt-5 max-w-3xl text-brown">
            Say <span className="hand text-terracotta">hello</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-brown-soft">
            WhatsApp is quickest. Phone works during the day, email within a day.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3 [&>*]:min-w-0">
            {[
              { icon: "phone", label: "WhatsApp", value: "Message us", href: `https://wa.me/${contact.whatsapp}` },
              { icon: "phone", label: "Phone", value: contact.phone, href: `tel:${contact.phoneDial}` },
              { icon: "mail", label: "Email", value: contact.email, href: `mailto:${contact.email}` },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="group flex min-w-0 items-center gap-4 rounded-[26px] border border-line bg-surface p-6 transition hover:border-terracotta"
              >
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-yellow/20 text-terracotta">
                  <Icon name={item.icon as "phone"} className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="label block text-brown-faint">{item.label}</span>
                  <span className="mt-1 block truncate text-[0.96rem] font-medium text-brown">
                    {item.value}
                  </span>
                </span>
              </a>
            ))}
          </div>

          <div className="mt-10 rounded-[26px] border border-line bg-surface p-6 sm:p-8">
            <h2 className="font-display text-[1.4rem] font-bold tracking-tight text-brown">
              Finding us
            </h2>
            <address className="mt-4 space-y-1 text-[0.98rem] not-italic leading-relaxed text-brown-soft">
              {contact.address.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </address>
            <p className="mt-4 text-[0.9rem] leading-relaxed text-brown-soft">
              The last 1.5 km is estate road. Any car manages it outside heavy monsoon — call if you
              would rather we met you at the junction.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={directions}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-terracotta px-6 py-3.5 text-[0.88rem] font-semibold text-cream transition hover:bg-terracotta-deep"
              >
                Open in Maps
              </a>
              <Link
                href="/booking"
                className="rounded-full border-2 border-brown/15 px-6 py-3.5 text-[0.88rem] font-semibold text-brown transition hover:border-brown"
              >
                Send a booking enquiry
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Faq />
    </>
  );
}
