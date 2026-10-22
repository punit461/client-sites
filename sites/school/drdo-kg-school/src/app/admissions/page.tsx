import { Check, Download, Mail, MapPin, Phone } from "lucide-react";
import EnquiryForm from "@/components/forms/EnquiryForm";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";
import AdmissionSteps from "@/components/sections/AdmissionSteps";
import Faq from "@/components/sections/Faq";
import { ButtonLink } from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { applicationInstructions, atAGlance, documents, eligibility, faqs, fees } from "@/content/admissions";
import { trust } from "@/content/campus";
import { contact, school } from "@/content/school";
import { asset, photos } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Admissions",
  description: `How to join ${school.name} in C V Raman Nagar: Nursery, LKG and UKG, ages, documents, the DRDO admission priority, fees and an enquiry form.`,
  path: "/admissions/",
});

const prospectusHref = school.prospectusUrl
  ? school.prospectusUrl.startsWith("/")
    ? asset(school.prospectusUrl)
    : school.prospectusUrl
  : null;

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Admissions"
        title={
          <>
            Joining {school.shortName}, <em className="text-gold">step by step.</em>
          </>
        }
        lead="Who can join, what to bring and how to apply for Nursery, LKG and UKG. The school office is happy to answer any question along the way."
        crumbs={[{ name: "Admissions", href: "/admissions/" }]}
        photo={photos.cycling}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#enquire" variant="gold">
            Make an Enquiry
          </ButtonLink>
          {prospectusHref ? (
            <a
              href={prospectusHref}
              download
              className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-sm border border-white/35 px-6 py-3 text-[0.94rem] font-semibold text-white transition hover:bg-white hover:text-navy"
            >
              <Download className="h-4 w-4" aria-hidden /> Download Prospectus
            </a>
          ) : (
            <ButtonLink href={contact.phoneHref} variant="outlineLight" arrow={false}>
              <Phone className="h-4 w-4" aria-hidden /> Call {contact.phone}
            </ButtonLink>
          )}
        </div>
      </PageHero>

      {/* Journey */}
      <section aria-labelledby="steps-title" className="section-y bg-ivory">
        <div className="container-x">
          <SectionHeading eyebrow="The admission journey" title={<span id="steps-title">Four steps from first call to first day.</span>} />
          <div className="mt-16">
            <AdmissionSteps tone="light" />
          </div>
        </div>
      </section>

      {/* Eligibility, documents, at a glance */}
      <section aria-labelledby="eligibility-title" className="section-y bg-white">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading eyebrow="Eligibility" title={<span id="eligibility-title">Age guide</span>} />
            <Reveal className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[22rem] border-collapse text-left text-[0.95rem]">
                <caption className="sr-only">Age guide by class</caption>
                <thead>
                  <tr className="border-b-2 border-navy">
                    <th scope="col" className="py-3 pr-6 font-semibold text-ink">
                      Class
                    </th>
                    <th scope="col" className="py-3 font-semibold text-ink">
                      Age
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {eligibility.map((e) => (
                    <tr key={e.grade} className="border-b border-line">
                      <th scope="row" className="py-4 pr-6 font-display text-lg font-normal text-ink">
                        {e.grade}
                      </th>
                      <td className="py-4">{e.age}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 text-[0.9rem]">Ages follow Karnataka&apos;s school-entry rules. The office will confirm the cut-off date for the year you are applying for.</p>
            </Reveal>
            <Reveal className="mt-12 border-l-2 border-gold bg-ivory p-7">
              <h3 className="eyebrow text-gold-ink">Admission priority</h3>
              <p className="mt-3 text-ink">{trust.priority}</p>
            </Reveal>
          </div>

          <div className="space-y-14 lg:col-span-5 lg:col-start-8">
            <Reveal>
              <h2 className="t-h3">Documents you will need</h2>
              <ul className="mt-6 space-y-3">
                {documents.map((d) => (
                  <li key={d} className="flex gap-3">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-gold-ink" aria-hidden />
                    {d}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[0.9rem]">The office gives you the full list with the admission form.</p>
            </Reveal>
            <Reveal>
              <h2 className="t-h3">At a glance</h2>
              <dl className="mt-6 border-t border-line">
                {atAGlance.map((d) => (
                  <div key={d.label} className="flex justify-between gap-6 border-b border-line py-4">
                    <dt>{d.label}</dt>
                    <dd className="text-right font-semibold text-ink">{d.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Instructions */}
      <section aria-labelledby="apply-title" className="section-y bg-ivory">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Applying" title={<span id="apply-title">How to apply</span>} />
          </div>
          <Stagger as="ol" className="space-y-6 lg:col-span-7">
            {applicationInstructions.map((t, i) => (
              <StaggerItem as="li" key={t} className="flex gap-6 border-b border-line pb-6">
                <span className="font-display text-2xl text-gold-ink">{i + 1}.</span>
                <span className="t-lead">{t}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Fees */}
      <section id="fees" aria-labelledby="fees-title" className="section-y bg-navy text-white">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHeading tone="light" eyebrow="Fees" title={<span id="fees-title">Fee details</span>} lead={fees.intro} />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            {fees.rows.length ? (
              <Reveal className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <caption className="sr-only">Annual fees for {school.academicYear}</caption>
                  <thead>
                    <tr className="border-b border-white/30">
                      <th scope="col" className="py-3">
                        Class
                      </th>
                      <th scope="col" className="py-3 text-right">
                        Annual fee
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fees.rows.map((r) => (
                      <tr key={r.grade} className="border-b border-white/10">
                        <th scope="row" className="py-3 font-normal">
                          {r.grade}
                        </th>
                        <td className="py-3 text-right font-semibold">{r.annual}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Reveal>
            ) : (
              <Reveal className="border border-white/20 p-7 sm:p-9">
                <p className="font-display text-xl text-gold">Ask the office</p>
                <p className="mt-3 text-white/75">{fees.note}</p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href={contact.phoneHref} variant="gold" arrow={false}>
                    <Phone className="h-4 w-4" aria-hidden /> {contact.phone}
                  </ButtonLink>
                  <ButtonLink href="#enquire" variant="outlineLight">
                    Send an enquiry
                  </ButtonLink>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-title" className="section-y bg-white">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Questions" title={<span id="faq-title">Admissions FAQ</span>} />
          </div>
          <div className="lg:col-span-8">
            <Faq items={faqs} structuredData />
          </div>
        </div>
      </section>

      {/* Enquiry form */}
      <section id="enquire" aria-labelledby="enquire-title" className="section-y scroll-mt-24 bg-ivory">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Enquire"
              title={<span id="enquire-title">Start with a conversation.</span>}
              lead="Tell us a little about your child and the class you are looking for, and the school office will get back to you."
            />
            <Reveal className="mt-10 space-y-4 text-[0.95rem]">
              <p className="font-semibold text-ink">Prefer to talk?</p>
              <a href={contact.phoneHref} className="flex items-center gap-3 hover:text-navy">
                <Phone className="h-4 w-4 text-gold-ink" aria-hidden /> {contact.phone}
              </a>
              {contact.email ? (
                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 break-all hover:text-navy">
                  <Mail className="h-4 w-4 shrink-0 text-gold-ink" aria-hidden /> {contact.email}
                </a>
              ) : null}
              <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-navy">
                <MapPin className="h-4 w-4 shrink-0 text-gold-ink" aria-hidden /> Visit Mon – Fri, 8 am – 3 pm
              </a>
            </Reveal>
          </div>
          <div className="bg-white p-6 shadow-soft sm:p-10 lg:col-span-8">
            <EnquiryForm kind="admission" />
          </div>
        </div>
      </section>
    </>
  );
}
