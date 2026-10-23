import { AudiencePage, type AudienceContent } from "@/components/templates/AudiencePage";
import { pageMetadata } from "@/lib/seo";

const c: AudienceContent = {
  audience: "commercial",
  path: "/commercial-plumbing/",
  crumb: "Commercial Plumbing",
  eyebrow: "For businesses",
  title: "Commercial plumbing that respects your working day.",
  lead: "For shops, offices, restaurants and managed buildings, a plumbing fault costs time as well as money. We plan visits around your operation, keep you informed, and leave a written record of the work.",
  photo: "commercialKitchen",
  sidePhoto: "plantRoom",
  pointsTitle: "Organized around how you work.",
  points: [
    { icon: "calendar", title: "Visits planned around you", body: "Scheduled within our opening hours, at the least disruptive time we can." },
    { icon: "message", title: "One point of contact", body: "One person who knows your job, from estimate to completion." },
    { icon: "file", title: "Written records", body: "A summary of the work for your files, landlord or insurer." },
    { icon: "clipboard", title: "Planned maintenance", body: "Regular checks that catch problems before they close a kitchen or washroom." },
  ],
  forTitle: "Plumbing for the places people work.",
  forList: ["Restaurants and cafés", "Shops and retail units", "Offices and studios", "Property managers", "Clinics and salons", "Multi-unit buildings"],
  faqs: [
    {
      q: "Can you work outside our trading hours?",
      a: "We schedule within our published opening hours, choosing the quietest time for your business where we can. Tell us your constraints and we'll plan around them as far as possible.",
    },
    {
      q: "Do we get documentation of the work?",
      a: "Yes — a written summary for your maintenance file, landlord or insurer.",
    },
    {
      q: "Can we set up regular maintenance?",
      a: "Yes. We agree what each visit covers and how often, then send a written summary after each one.",
    },
  ],
  cta: "Plumbing for your premises, planned properly.",
};

export const metadata = pageMetadata({
  title: "Commercial Plumbing",
  description:
    "Plumbing repairs and planned maintenance for shops, offices, restaurants and managed buildings — planned around your operation, with written records.",
  path: c.path,
  photo: c.photo,
});

export default function Page() {
  return <AudiencePage c={c} />;
}
