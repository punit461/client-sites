import { contact } from "./school";
import type { FaqItem } from "./types";

/**
 * Everything on the admissions page. CONFIRM with the school: ages, cut-off
 * date, documents and the admission priority. Fees are not published; the
 * page asks families to call or enquire.
 */

export const admissionSteps = [
  { title: "Call or visit", text: `Call the office on ${contact.phone}, or visit on a weekday between 8 am and 3 pm, to check seat availability.` },
  { title: "Collect the form", text: "Pick up the admission form and the list of documents from the school office." },
  { title: "Submit with documents", text: "Return the completed form with copies of the documents. Originals are checked at the office." },
  { title: "Confirmation", text: "The office confirms your child's place and tells you about fees, uniform and the first day." },
];

/** Typical ages under Karnataka's school-entry rules. CONFIRM the cut-off date with the school. */
export const eligibility = [
  { grade: "Nursery", age: "3 years and above" },
  { grade: "LKG", age: "4 years and above" },
  { grade: "UKG", age: "5 years and above" },
];

/** What schools in Karnataka usually ask for. CONFIRM the school's own list. */
export const documents = [
  "Child's birth certificate",
  "Recent passport-size photographs of the child",
  "Aadhaar card of the child and parents, if available",
  "Proof of address",
  "DRDO employee ID, for admission under the DRDO priority",
];

/** The facts a family needs before calling. */
export const atAGlance = [
  { value: "Nursery · LKG · UKG", label: "Classes" },
  { value: "Mon – Fri", label: "Office open 8 am – 3 pm for enquiries" },
  { value: "DRDO families", label: "Given priority, then open to all" },
  { value: contact.phone, label: "Call to check seat availability" },
];

export const applicationInstructions = [
  `Call the school office on ${contact.phone} to ask whether seats are available in the class you need.`,
  "Visit on a weekday between 8 am and 3 pm to collect the admission form and see the school.",
  "Keep photocopies of the documents ready. Originals are checked at the time of admission.",
  "If you are a DRDO employee, mention it when you call: children of DRDO employees are given priority.",
];

export const fees = {
  /**
   * Publish the fee schedule here (rows below), or leave rows empty to show
   * the "ask for the fee details" card instead.
   */
  intro: "The school office shares the fee details for each class with families when they enquire.",
  rows: [] as { grade: string; annual: string }[],
  note: `Call ${contact.phone} or send an enquiry, and the office will share the fees for the class you need.`,
};

export const faqs: FaqItem[] = [
  {
    q: "Which classes does the school have?",
    a: "D.R.D.O KG School is a kindergarten: it takes children for Nursery, LKG and UKG, before they move to Class 1 at a primary school.",
  },
  {
    q: "Is the school only for children of DRDO employees?",
    a: "No. Children of DRDO employees are given priority for admission, and the remaining seats are open to other families. Call the office to check availability.",
  },
  {
    q: "Who runs the school?",
    a: "The school is run by the DRDO Employees Educational Trust (DEET).",
  },
  {
    q: "What are the office hours?",
    a: "The office is open Monday to Friday, 8 am to 3 pm, and closed on Saturday and Sunday. Class timings are shared at admission.",
  },
  {
    q: "Can we visit before applying?",
    a: `Yes. Visit on any weekday between 8 am and 3 pm. It helps to call ${contact.phone} first so the office can make time for you.`,
  },
  {
    q: "Is the campus wheelchair accessible?",
    a: "Yes. The school's entrance and car park are wheelchair accessible.",
  },
  {
    q: "How much are the fees?",
    a: `The office shares the fee details for each class when you enquire. Call ${contact.phone} or use the enquiry form on this page.`,
  },
];

/** The classes the enquiry form offers. */
export const gradeOptions = ["Nursery", "LKG", "UKG"] as const;
