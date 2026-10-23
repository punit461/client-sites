import { AudiencePage, type AudienceContent } from "@/components/templates/AudiencePage";
import { pageMetadata } from "@/lib/seo";

const c: AudienceContent = {
  audience: "commercial",
  path: "/commercial-plumbing/",
  crumb: "Commercial",
  label: "For businesses",
  title: "Commercial plumbing that keeps you open.",
  lead: "Restaurants, shops, offices and managed buildings: we plan around your operation, keep you updated, and document every job.",
  photo: "commercialKitchen",
  sidePhoto: "plantRoom",
  pointsTitle: "Less downtime. More clarity.",
  points: [
    { title: "Scheduled around you", body: "Visits within our opening hours, timed for the quietest part of your day where possible." },
    { title: "One point of contact", body: "One person who knows your job from estimate to sign-off." },
    { title: "Written records", body: "A summary of every job for your maintenance file, landlord or insurer." },
    { title: "Planned maintenance", body: "Regular checks that catch problems before they close a kitchen or washroom." },
  ],
  forTitle: "Plumbing for the places people work.",
  forList: ["Restaurants and commercial kitchens", "Retail units", "Offices and studios", "Property and facilities managers", "Multi-unit residential buildings"],
  faqs: [
    {
      q: "Can you work outside our trading hours?",
      a: "We schedule within our published opening hours and pick the least disruptive slot we can. Tell us your constraints and we'll plan around them as far as possible.",
    },
    {
      q: "Do we get documentation?",
      a: "Yes — a written summary of the work for your records, landlord or insurer.",
    },
    {
      q: "Can we set up planned maintenance?",
      a: "Yes. We agree what each visit covers and how often, and send a written report after each one.",
    },
  ],
  cta: "Keep your business flowing.",
};

export const metadata = pageMetadata({
  title: "Commercial Plumbing",
  description:
    "Plumbing repairs and planned maintenance for restaurants, shops, offices and managed buildings — scheduled around your operation, with written records.",
  path: c.path,
  photo: c.photo,
});

export default function Page() {
  return <AudiencePage c={c} />;
}
