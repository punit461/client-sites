import { Container } from "@/components/ui/primitives";
import { brand, contact, nav } from "@/data/site";
import Wordmark from "./Wordmark";

export default function Footer() {
  return (
    // Bottom padding leaves room for the phone CTA bar so it never covers the last line.
    <footer className="bg-ink pb-24 text-white/75 sm:pb-0">
      <Container>
        <div className="flex flex-col gap-10 py-14 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Wordmark onDark />
            <p className="mt-5 text-[0.92rem] leading-relaxed">{brand.description}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5 text-[0.95rem] font-semibold">
              {nav.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <address className="text-[0.92rem] not-italic leading-relaxed">
            {contact.street}
            <br />
            {contact.locality}, {contact.city} {contact.postalCode}
            <br />
            <a href={contact.phoneHref} className="mt-2 inline-block font-bold text-white hover:text-sun">
              {contact.phone}
            </a>
          </address>
        </div>

        <div className="border-t border-white/10 py-6 text-[0.85rem]">
          © {new Date().getFullYear()} {brand.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
