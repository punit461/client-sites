import { AudiencePage, type AudienceContent } from "@/components/templates/AudiencePage";
import { pageMetadata } from "@/lib/seo";

const content: AudienceContent = {
  audience: "residential",
  path: "/residential-plumbing/",
  crumb: "Residential Plumbing",
  eyebrow: "For homeowners",
  title: "Plumbing for the home you live in.",
  lead: "Repairs, replacements and upgrades carried out in an occupied home — which means arriving when we said, keeping the work area contained, and explaining your options before anything is changed.",
  photo: "plumberBathroom",
  sidePhoto: "bathroomBright",
  commitmentsTitle: "Working in your home, the way you'd want.",
  commitments: [
    {
      icon: "calendar",
      title: "An arrival window you can plan around",
      body: "We agree a time window with you, and call ahead if anything changes.",
    },
    {
      icon: "house",
      title: "Floors and furnishings protected",
      body: "Dust sheets and floor protection go down before tools come out.",
    },
    {
      icon: "file",
      title: "Your options, explained",
      body: "What needs fixing now, what can wait, and the price for each, in writing.",
    },
    {
      icon: "sparkles",
      title: "Left clean and working",
      body: "Old parts removed, the area wiped down, everything tested before we go.",
    },
  ],
  whoTitle: "From a dripping faucet to a new bathroom.",
  who: [
    "Homeowners",
    "Renters, with landlord approval",
    "Landlords and letting agents",
    "Buyers checking an older property",
    "Families planning a renovation",
    "Builders needing a plumber for a project",
  ],
  faqs: [
    {
      q: "Do I need to be home during the visit?",
      a: "Usually yes, or someone over 18 who can let us in and approve the work. If that's difficult, tell us when you request a quote and we will discuss the options.",
    },
    {
      q: "I rent my home. Can I book a repair?",
      a: "For most repairs your landlord or letting agent needs to authorize the work. We are happy to speak to them directly — include their details in your request.",
    },
    {
      q: "Will you explain what's wrong before you start?",
      a: "Always. We tell you what we found, what we recommend, and the price in writing. Nothing starts until you approve it.",
    },
  ],
  ctaTitle: "Plumbing problem at home? Let's talk it through.",
};

export const metadata = pageMetadata({
  title: "Residential Plumbing",
  description:
    "Plumbing repairs, replacements and bathroom plumbing for homeowners and landlords — clear arrival windows, protected floors and a written estimate first.",
  path: content.path,
  photo: content.photo,
});

export default function ResidentialPage() {
  return <AudiencePage c={content} />;
}
