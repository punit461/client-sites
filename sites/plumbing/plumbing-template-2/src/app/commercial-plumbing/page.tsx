import { AudiencePage, type AudienceContent } from "@/components/templates/AudiencePage";
import { pageMetadata } from "@/lib/seo";

const c: AudienceContent = {
  audience: "commercial",
  path: "/commercial-plumbing/",
  crumb: "Commercial",
  label: "For businesses",
  title: "Commercial plumbing that keeps you open.",
  lead: "Restaurants, shops, offices and apartment complexes across Houston: we start early, work around your operation, and keep you updated.",
  photo: "vansDowntown",
  sidePhoto: "floorDrainCabling",
  pointsTitle: "Less downtime. More clarity.",
  points: [
    { title: "Early starts", body: "We open at 5am, seven days a week, so many jobs can be done before you open your doors." },
    { title: "Drain specialists", body: "Floor drains, grease-heavy kitchen lines and restroom drains cleared by cable machine or hydro-jetting." },
    { title: "Water and sewer lines", body: "Water and sewer lines under parking lots and common areas repaired or replaced." },
    { title: "Kept in the loop", body: "Every step explained, and a call before we arrive and whenever plans change." },
  ],
  forTitle: "Plumbing for the places people work.",
  forList: ["Restaurants and commercial kitchens", "Retail units", "Offices and studios", "Property and facilities managers", "Multi-unit residential buildings"],
  faqs: [
    {
      q: "Can you work before we open?",
      a: "Often, yes. We open at 5am Monday to Saturday and 7am on Sunday, and pick the least disruptive slot we can. Tell us your hours when you get in touch.",
    },
    {
      q: "Do you clear grease-heavy kitchen lines?",
      a: "Yes. Cable machines clear the blockage; hydro-jetting scours the grease off the pipe walls so it doesn't come straight back.",
    },
    {
      q: "Do you work on apartment complexes?",
      a: "Yes — including water lines that run under parking lots and common areas, where the work has to be planned around residents.",
    },
  ],
  cta: "Keep your business flowing.",
};

export const metadata = pageMetadata({
  title: "Commercial Plumbing",
  description:
    "Drain cleaning, hydro-jetting, water and sewer line repairs for Houston restaurants, shops, offices and apartment complexes — from 5am, seven days a week.",
  path: c.path,
  photo: c.photo,
});

export default function Page() {
  return <AudiencePage c={c} />;
}
