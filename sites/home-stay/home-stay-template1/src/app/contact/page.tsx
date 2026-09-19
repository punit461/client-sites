import type { Metadata } from "next";
import Link from "next/link";
import { LocationSection } from "@/components/sections/Closing";
import Faq from "@/components/sections/Faq";
import { Container, Icon, Label } from "@/components/ui";
import { contact, property } from "@/data/stay";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${property.fullName} — phone, email, WhatsApp and how to find us.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="pb-12 pt-32 sm:pt-40">
        <Container wide>
          <Label>Contact</Label>
          <h1 className="display-xl mt-5 max-w-3xl text-charcoal">Talk to us</h1>
          <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-charcoal-soft">
            The quickest way to reach us is WhatsApp. Phone works during the day; email is answered
            within a day.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3 [&>*]:min-w-0">
            {[
              { icon: "phone", label: "Phone", value: contact.phone, href: `tel:${contact.phoneDial}` },
              { icon: "mail", label: "Email", value: contact.email, href: `mailto:${contact.email}` },
              { icon: "sparkles", label: "WhatsApp", value: "Message us", href: `https://wa.me/${contact.whatsapp}` },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group flex min-w-0 items-center gap-4 rounded-[22px] border border-line bg-surface p-6 transition hover:border-forest"
              >
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-olive-soft text-forest">
                  <Icon name={item.icon as "phone"} className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="label block text-charcoal-faint">{item.label}</span>
                  <span className="mt-1 block truncate text-[0.98rem] text-charcoal">{item.value}</span>
                </span>
              </a>
            ))}
          </div>

          <Link
            href="/booking"
            className="mt-8 inline-flex rounded-full bg-forest px-7 py-3.5 text-[0.88rem] font-medium tracking-wide text-ivory transition hover:bg-forest-deep"
          >
            Send a booking enquiry
          </Link>
        </Container>
      </section>

      <LocationSection />
      <Faq />
    </>
  );
}
