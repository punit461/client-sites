import { AudiencePage, type AudienceContent } from "@/components/templates/AudiencePage";
import { pageMetadata } from "@/lib/seo";

const content: AudienceContent = {
  audience: "commercial",
  path: "/commercial-plumbing/",
  crumb: "Commercial Plumbing",
  eyebrow: "For businesses",
  title: "Commercial plumbing that respects your working day.",
  lead: "For shops, offices, restaurants and managed buildings, a plumbing fault costs trading time as well as repair money. We plan visits around your operation, keep you informed, and leave a clear written record of the work.",
  photo: "commercialKitchen",
  sidePhoto: "plantRoom",
  commitmentsTitle: "Built around how your business runs.",
  commitments: [
    {
      icon: "calendar",
      title: "Visits planned around trading",
      body: "We schedule work within our opening hours at the times that disrupt you least.",
    },
    {
      icon: "message",
      title: "One point of contact",
      body: "You deal with one person who knows the job, from estimate through to completion.",
    },
    {
      icon: "file",
      title: "Written records",
      body: "A written summary of what was done, for your maintenance file or your landlord.",
    },
    {
      icon: "clipboard",
      title: "Planned maintenance",
      body: "Scheduled checks that catch problems before they close a kitchen or a washroom.",
    },
  ],
  whoTitle: "Plumbing for the places people work.",
  who: [
    "Restaurants and commercial kitchens",
    "Retail units",
    "Offices",
    "Property and facilities managers",
    "Clinics and studios",
    "Multi-unit residential buildings",
  ],
  faqs: [
    {
      q: "Can you work outside our trading hours?",
      a: "We schedule commercial work within our published opening hours, choosing the quietest times for your business where we can. Talk to us about your constraints when you request a quote.",
    },
    {
      q: "Do you provide documentation for our records?",
      a: "Yes. You receive a written summary of the work carried out, which you can keep for your maintenance records or share with your landlord or insurer.",
    },
    {
      q: "Can we set up regular maintenance visits?",
      a: "Yes. We agree what each visit covers and how often, then provide a written summary after each one with any recommendations in order of priority.",
    },
  ],
  ctaTitle: "Plumbing for your premises, planned properly.",
};

export const metadata = pageMetadata({
  title: "Commercial Plumbing",
  description:
    "Plumbing repairs and planned maintenance for shops, offices, restaurants and managed buildings — scheduled around your operation, with written records.",
  path: content.path,
  photo: content.photo,
});

export default function CommercialPage() {
  return <AudiencePage c={content} />;
}
