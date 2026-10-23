import { AudiencePage, type AudienceContent } from "@/components/templates/AudiencePage";
import { pageMetadata } from "@/lib/seo";

const c: AudienceContent = {
  audience: "residential",
  path: "/residential-plumbing/",
  crumb: "Residential Plumbing",
  eyebrow: "For homeowners",
  title: "Plumbing for the home you live in.",
  lead: "Leaks, blocked drains, water heaters, new fixtures and bathroom projects — handled by people who explain what they find, agree the price first, and leave your home tidy.",
  photo: "plumberBathroom",
  sidePhoto: "bathroomBright",
  pointsTitle: "Calm, considerate, and clear.",
  points: [
    { icon: "calendar", title: "A time that suits you", body: "We agree a visit time with you, and call if anything changes." },
    { icon: "file", title: "The price first", body: "Your options and their prices explained before any work begins." },
    { icon: "house", title: "Your home protected", body: "Floors covered, the work area contained, everything tidied after." },
    { icon: "message", title: "Honest advice", body: "What needs doing now, what can wait, and what doesn't need doing at all." },
  ],
  forTitle: "From a dripping faucet to a new bathroom.",
  forList: ["Homeowners", "Landlords", "Renters, with landlord approval", "Buyers checking a property", "Families renovating", "Builders needing a plumber"],
  faqs: [
    {
      q: "Do I need to be home during the visit?",
      a: "Usually, yes — or another adult who can let us in and approve the work. If that's difficult, mention it in your request and we'll discuss options.",
    },
    {
      q: "I'm renting. Can I request a repair?",
      a: "Most repairs need your landlord's approval. Add their details to your request and we're happy to speak with them directly.",
    },
    {
      q: "Can you work around children and pets?",
      a: "Yes. We keep the work area contained and tools out of reach — just let us know what to expect when we arrange the visit.",
    },
  ],
  cta: "A plumbing problem at home? Let's talk it through.",
};

export const metadata = pageMetadata({
  title: "Residential Plumbing",
  description:
    "Home plumbing repairs, water heaters, fixtures and bathroom plumbing — clear explanations, the price agreed before work begins, and a tidy finish.",
  path: c.path,
  photo: c.photo,
});

export default function Page() {
  return <AudiencePage c={c} />;
}
