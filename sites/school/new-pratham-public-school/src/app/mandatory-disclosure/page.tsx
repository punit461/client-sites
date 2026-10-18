import type { Metadata } from "next";
import { Download, ExternalLink } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { Container, PageHero } from "@/components/ui/primitives";
import { school } from "@/data/school";
import { asset } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Mandatory public disclosure",
  description: `The CBSE mandatory public disclosure document for ${school.name} (Affiliation No. ${school.affiliationNumber}).`,
};

const PDF = "/documents/mandatory-disclosure.pdf";

export default function MandatoryDisclosurePage() {
  const href = asset(PDF);
  return (
    <>
      <PageHero
        crumb="Mandatory disclosure"
        eyebrow="CBSE"
        title="Mandatory public disclosure"
        copy={`As required by the Central Board of Secondary Education, ${school.name} (Affiliation No. ${school.affiliationNumber}) publishes its general information, documents, academic details, staff, infrastructure and results in the document below.`}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={href}
            download="New-Pratham-Public-School-Mandatory-Disclosure.pdf"
            className="inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3.5 text-[0.9rem] font-semibold text-white transition hover:bg-coral-deep"
          >
            <Download className="h-4 w-4" strokeWidth={1.9} aria-hidden />
            Download the PDF
          </a>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3.5 text-[0.9rem] font-semibold text-ink transition hover:border-ink/25 hover:bg-surface-2"
          >
            <ExternalLink className="h-4 w-4" strokeWidth={1.9} aria-hidden />
            Open in a new tab
          </a>
        </div>
      </PageHero>

      <section className="py-12 sm:py-16">
        <Container wide>
          <Reveal>
            <div className="card overflow-hidden">
              <object data={href} type="application/pdf" className="h-[75vh] w-full" aria-label="Mandatory public disclosure document">
                <div className="p-8 text-center text-[0.95rem] text-ink-soft">
                  Your browser cannot display the document here.{" "}
                  <a href={href} className="font-semibold text-coral-deep underline underline-offset-4">
                    Download the PDF
                  </a>{" "}
                  instead.
                </div>
              </object>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
