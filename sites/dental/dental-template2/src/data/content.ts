import { img } from "@/lib/images";
import type { IconName } from "@/lib/icons";

/** ------------------------------------------------------- resources */
/**
 * PLACEHOLDER PATIENT INFORMATION.
 *
 * `clinicianReviewed` is false on every article here, and the article pages
 * say so. Do not flip it to true until a named, qualified clinician has
 * actually reviewed the content — presenting unreviewed material as
 * clinician-reviewed is the specific thing this flag exists to prevent.
 */
export interface Resource {
  slug: string;
  title: string;
  category: "Dental Care" | "Preventive Care" | "Treatment Guides" | "Before Your Appointment" | "Aftercare";
  excerpt: string;
  readingTime: string;
  image: string;
  alt: string;
  clinicianReviewed: boolean;
  reviewedBy: string | null;
  body: string[];
}

export const resources: Resource[] = [
  {
    slug: "what-to-bring-to-your-first-appointment",
    title: "What to bring to your first appointment",
    category: "Before Your Appointment",
    excerpt: "A short list so the first visit is not spent chasing paperwork.",
    readingTime: "3 min read",
    image: img.discover,
    alt: "A clinician reviewing notes",
    clinicianReviewed: false,
    reviewedBy: null,
    body: [
      "Bring photo identification, a list of any medicines you take including doses, and details of any allergies.",
      "If you have had recent tests or imaging elsewhere, bring the reports or the discs. It saves repeating things.",
      "If you are using insurance, bring the policy details and any pre-authorisation reference.",
      "If English is not the language you are most comfortable in, say so when you book — a clinician who speaks your language may be available.",
    ],
  },
  {
    slug: "preparing-for-a-dental-consultation",
    title: "Preparing for a dental consultation",
    category: "Dental Care",
    excerpt: "What happens at an assessment, and what to think about beforehand.",
    readingTime: "4 min read",
    image: img.dental,
    alt: "A dental treatment room",
    clinicianReviewed: false,
    reviewedBy: null,
    body: [
      "A first dental consultation is mostly conversation and examination. Nothing invasive normally happens at the first visit.",
      "It helps to note down when a problem started, what makes it worse, and whether anything has changed recently.",
      "You will be asked about your general health and medicines, because both affect what treatment is appropriate.",
      "You should leave with a written summary of what was found and what the options are, including doing nothing for now.",
    ],
  },
  {
    slug: "after-a-procedure-what-to-expect",
    title: "After a procedure: what to expect",
    category: "Aftercare",
    excerpt: "General guidance on the first few days, and when to make contact.",
    readingTime: "3 min read",
    image: img.consultRoom,
    alt: "A consultation room",
    clinicianReviewed: false,
    reviewedBy: null,
    body: [
      "Your own written aftercare instructions always take priority over general guidance like this page.",
      "Some discomfort and swelling in the first few days is common after many procedures. Your clinician will tell you what is expected for yours.",
      "Contact the clinic if pain is getting worse rather than better, if bleeding does not settle, or if you develop a fever.",
      "If you have swelling that affects your breathing, swallowing or vision, treat it as an emergency and use your local emergency service.",
    ],
  },
  {
    slug: "how-preventive-health-checks-work",
    title: "How preventive health checks work",
    category: "Preventive Care",
    excerpt: "Why the tests are chosen rather than bundled, and what happens after.",
    readingTime: "5 min read",
    image: img.preventive,
    alt: "Laboratory sample vials",
    clinicianReviewed: false,
    reviewedBy: null,
    body: [
      "A useful health check starts with a conversation, not a fixed panel of tests. What is worth measuring depends on your age, history and risk factors.",
      "More tests are not automatically better. Some produce findings that lead to further investigation without improving anything.",
      "You should have a follow-up appointment booked before you leave, so results are explained rather than emailed without context.",
      "You should also get a written summary you can take to any other clinician involved in your care.",
    ],
  },
  {
    slug: "understanding-a-treatment-plan",
    title: "Understanding a treatment plan",
    category: "Treatment Guides",
    excerpt: "What a plan should tell you before you agree to it.",
    readingTime: "4 min read",
    image: img.diagnostics,
    alt: "Clinicians reviewing imaging",
    clinicianReviewed: false,
    reviewedBy: null,
    body: [
      "A treatment plan should set out the stages, roughly how long each takes, and what each stage costs, before you commit to anything.",
      "It should also describe the alternatives, including the option of doing nothing for now, and what is likely to happen in each case.",
      "You are entitled to take the plan away and think about it. A plan that only stands up under time pressure is not a good plan.",
      "If anything in it is unclear, ask. A clinician would rather explain twice than treat someone who did not understand what was agreed.",
    ],
  },
  {
    slug: "bringing-a-child-to-an-appointment",
    title: "Bringing a child to an appointment",
    category: "Before Your Appointment",
    excerpt: "Small things that make a first visit go better.",
    readingTime: "3 min read",
    image: img.pediatrics,
    alt: "A clinician with a young patient",
    clinicianReviewed: false,
    reviewedBy: null,
    body: [
      "Book a time when your child is normally rested rather than at the end of a long day.",
      "Explain where you are going in plain terms. Avoid words like 'it will not hurt' — children hear the word that matters.",
      "A first visit is often just looking around and counting teeth. Nothing has to happen on day one.",
      "Bring a comfort object if your child has one, and let the clinician know about any previous experience that went badly.",
    ],
  },
];

export const findResource = (slug: string) => resources.find((r) => r.slug === slug);
export const resourceCategories = [...new Set(resources.map((r) => r.category))];

/** ------------------------------------------------------- journey */
export const patientJourney = [
  { stage: "Discover", copy: "Search by symptom, treatment or specialty.", image: img.discover, alt: "Looking something up" },
  { stage: "Book", copy: "Choose a clinician, clinic and time.", image: img.reception, alt: "A clinic reception" },
  { stage: "Arrive", copy: "Step-free access and a short check-in.", image: img.corridor, alt: "A clinic corridor" },
  { stage: "Consult", copy: "A conversation, an examination and a written plan.", image: img.consultRoom, alt: "A consultation room" },
  { stage: "Follow up", copy: "Results explained, and a clear next step.", image: img.diagnostics, alt: "Reviewing results" },
] as const;

/** ------------------------------------------------------- facilities */
export const facilities = [
  { label: "Reception", image: img.reception, alt: "A clinic reception area" },
  { label: "Consultation rooms", image: img.consultRoom, alt: "A consultation room" },
  { label: "Treatment rooms", image: img.dental, alt: "A treatment room" },
  { label: "Waiting area", image: img.waiting, alt: "A calm waiting area" },
  { label: "Diagnostics", image: img.diagnostics, alt: "Diagnostic equipment" },
  { label: "Laboratory", image: img.lab, alt: "A laboratory bench" },
] as const;

/** ------------------------------------------------------- explainer */
export const explainer = {
  question: "What happens during a dental implant consultation?",
  steps: [
    { n: "01", title: "Assessment", copy: "Examination and imaging to look at bone, gums and the space itself." },
    { n: "02", title: "Discussion", copy: "The realistic options, including alternatives to an implant." },
    { n: "03", title: "Treatment planning", copy: "A written plan with stages, timings and costs." },
    { n: "04", title: "Next steps", copy: "Time to consider it, then a decision made with you." },
  ],
} as const;

/** ------------------------------------------------------- payment */
export const paymentOptions: { title: string; copy: string; icon: IconName }[] = [
  { title: "Insurance", copy: "Accepted insurers are confirmed by each clinic — ask when you book.", icon: "shieldCheck" },
  { title: "Payment options", copy: "Cards, UPI and net banking. Costs are agreed before treatment starts.", icon: "creditCard" },
  { title: "Financing", copy: "Where available, terms are set out in writing before you commit.", icon: "wallet" },
  { title: "Membership plans", copy: "Ask about routine-care plans if you attend regularly.", icon: "clipboard" },
];

/** ------------------------------------------------------- reviews */
/**
 * Placeholders, not testimonials. Writing plausible patient quotes here would
 * be fabricating them; these slots stay empty until real verified reviews
 * are supplied and `evidence.reviewsAreReal` is set.
 */
export const reviewPlaceholders = [
  { quote: "Patient review goes here.", name: "Patient name", service: "Service used" },
  { quote: "Patient review goes here.", name: "Patient name", service: "Service used" },
  { quote: "Patient review goes here.", name: "Patient name", service: "Service used" },
] as const;

/** ------------------------------------------------------- faq */
export const faqGroups = [
  {
    category: "General",
    items: [
      { q: "Do I need a referral?", a: "No. You can book directly with any of our clinicians. If a specialist opinion is needed later, that referral is arranged for you." },
      { q: "Are the clinics accessible?", a: "All three clinics have step-free access and an accessible WC. Tell us when you book if you need anything else arranged." },
    ],
  },
  {
    category: "Appointments",
    items: [
      { q: "How do I book?", a: "Use the booking flow on this site or call the clinic. A request is confirmed by the team — it is not a confirmed appointment until you hear back." },
      { q: "How do I reschedule or cancel?", a: "Call the clinic as early as you can. Giving notice means the slot can be offered to someone else who needs it." },
      { q: "What if I am running late?", a: "Call ahead. Depending on the clinic's list, the appointment may need to be moved rather than shortened." },
    ],
  },
  {
    category: "Treatments",
    items: [
      { q: "Will I get a written plan?", a: "Yes. Any treatment plan is given to you in writing with stages and costs before you agree to it." },
      { q: "Can I get a second opinion?", a: "Yes, and you are welcome to take your plan elsewhere. Any clinician worth seeing will expect that." },
    ],
  },
  {
    category: "Payments",
    items: [
      { q: "What payment methods do you take?", a: "Cards, UPI and net banking. Payment is taken after the consultation unless something is agreed in advance." },
      { q: "Do you work with insurers?", a: "Accepted insurers vary by clinic and change over time, so they are confirmed when you book rather than listed here." },
    ],
  },
  {
    category: "New patients",
    items: [
      { q: "What should I bring?", a: "Photo identification, a list of your medicines, and any recent reports or imaging from elsewhere." },
      { q: "How long is a first appointment?", a: "Usually longer than a follow-up — typically 30 to 45 minutes depending on the specialty." },
    ],
  },
] as const;
