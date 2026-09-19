import type { IconName } from "@/lib/icons";
import { avatar } from "@/lib/images";

/** ------------------------------------------------------------ why us */
export interface Feature {
  title: string;
  copy: string;
  icon: IconName;
}

export const features: Feature[] = [
  { title: "Free doorstep pickup", copy: "Collection and delivery are included on every order above ₹499.", icon: "truck" },
  { title: "Professional cleaning", copy: "Commercial machines and finishing presses, not a domestic setup.", icon: "washingMachine" },
  { title: "Fabric-safe processes", copy: "Wash programme chosen per garment from its own care label.", icon: "shirt" },
  { title: "Trained specialists", copy: "Every handler is trained on delicates before touching an order.", icon: "badgeCheck" },
  { title: "Transparent pricing", copy: "Per-kilo and per-item rates published up front. No surcharges.", icon: "wallet" },
  { title: "Real-time tracking", copy: "Follow your order from pickup to doorstep, stage by stage.", icon: "mapPin" },
  { title: "Eco-friendly options", copy: "Plant-based detergents and reusable bags, on request at booking.", icon: "leaf" },
  { title: "Quality guarantee", copy: "Not happy with an item? We re-clean it free, no questions asked.", icon: "shieldCheck" },
];

/** ------------------------------------------------------------ pricing */
export interface Plan {
  id: string;
  name: string;
  price: string;
  unit: string;
  summary: string;
  turnaround: string;
  cleaning: string;
  includes: string[];
  /** One plan is drawn with more emphasis — the middle one, by convention. */
  featured?: boolean;
}

export const plans: Plan[] = [
  {
    id: "everyday",
    name: "Everyday",
    price: "₹99",
    unit: "per kg",
    summary: "Regular wardrobe washing for one or two people.",
    turnaround: "48 hours",
    cleaning: "Machine wash & tumble dry",
    includes: [
      "Wash, dry and fold",
      "Sorted by colour and fabric",
      "Standard detergent",
      "Free pickup above ₹499",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "₹199",
    unit: "per kg",
    summary: "Washing plus pressing, for clothes you wear to work.",
    turnaround: "24 hours",
    cleaning: "Machine wash & steam press",
    includes: [
      "Everything in Everyday",
      "Steam ironing on every item",
      "Hypoallergenic detergent",
      "Returned on hangers",
      "Free pickup and delivery",
    ],
    featured: true,
  },
  {
    id: "complete",
    name: "Complete Care",
    price: "₹399",
    unit: "per kg",
    summary: "Full-wardrobe care including delicates and tailoring.",
    turnaround: "24 hours, priority slot",
    cleaning: "Dry clean, hand wash & press",
    includes: [
      "Everything in Premium",
      "Dry cleaning included",
      "Hand-finished delicates",
      "Minor repairs and button fixes",
      "Named handler for your order",
    ],
  },
];

/** ------------------------------------------------------------ reviews */
export interface Testimonial {
  name: string;
  location: string;
  rating: number;
  service: string;
  quote: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Ananya Rao",
    location: "Indiranagar",
    rating: 5,
    service: "Wash & Fold",
    quote:
      "The pickup was incredibly convenient and my shirts came back perfectly ironed. I have not been to a laundry in four months.",
    avatar: avatar("ananya-rao"),
  },
  {
    name: "Rahul Menon",
    location: "Koramangala",
    rating: 5,
    service: "Premium Care",
    quote:
      "Sent a three-piece suit over before a wedding, half expecting a disaster. It came back boxed, pressed and genuinely better than new.",
    avatar: avatar("rahul-menon"),
  },
  {
    name: "Priya Sharma",
    location: "HSR Layout",
    rating: 5,
    service: "Dry Cleaning",
    quote:
      "A silk saree with an oil stain I had written off completely. They called to confirm the treatment before starting, which nobody does.",
    avatar: avatar("priya-sharma"),
  },
  {
    name: "Karthik Iyer",
    location: "Whitefield",
    rating: 4,
    service: "Steam Ironing",
    quote:
      "Weekly recurring pickup every Sunday evening. Two years in and they have missed the slot exactly once, and called ahead about it.",
    avatar: avatar("karthik-iyer"),
  },
  {
    name: "Meera Nair",
    location: "Jayanagar",
    rating: 5,
    service: "Wash & Fold",
    quote:
      "Tracking is the part I did not expect to care about and now use constantly. You can see exactly which stage your bag is at.",
    avatar: avatar("meera-nair"),
  },
];

/** ------------------------------------------------------------ tracking */
export interface TrackStage {
  label: string;
  detail: string;
}

export const trackedOrder = {
  id: "FL-2048",
  placed: "Today, 9:12 AM",
  eta: "Tomorrow by 7:30 PM",
  items: "12 items · Wash & Press",
};

export const trackStages: TrackStage[] = [
  { label: "Pickup confirmed", detail: "Collected from your door at 9:40 AM" },
  { label: "At cleaning facility", detail: "Logged and sorted by fabric" },
  { label: "Cleaning in progress", detail: "Washed at 40°C, hypoallergenic" },
  { label: "Quality check", detail: "Inspected item by item" },
  { label: "Out for delivery", detail: "On the van with your driver" },
  { label: "Delivered", detail: "Handed over and signed for" },
];

/** How many of the stages above are complete — drives the animated progress. */
export const trackProgress = 3;

/** ------------------------------------------------------------ faq */
export const faqs = [
  {
    q: "How does pickup work?",
    a: "Pick a date and a two-hour slot when you book. A uniformed driver arrives with a reusable bag, counts the items with you and leaves a digital receipt on your phone before driving off.",
  },
  {
    q: "How long does cleaning take?",
    a: "Standard turnaround is 48 hours from collection. Premium and Complete Care orders are back within 24 hours. You are given an exact delivery window as soon as your bag reaches the facility.",
  },
  {
    q: "Do you provide same-day delivery?",
    a: "Yes, on orders collected before 9:00 AM within our core service area, for an express fee. The booking form tells you whether your address and slot qualify before you confirm.",
  },
  {
    q: "What clothes can be dry cleaned?",
    a: "Anything whose care label rules out water: tailored wool, silk, viscose, structured jackets, lined dresses and most embellished garments. If a label is missing we test an inside seam before deciding.",
  },
  {
    q: "How are delicate clothes handled?",
    a: "Delicates are separated at intake, washed by hand or on a dedicated low-agitation programme, dried flat and finished by hand. They never share a load with everyday washing.",
  },
  {
    q: "What happens if a garment is damaged?",
    a: "Every item is photographed at intake, so damage is easy to establish. If we caused it we repair it, or reimburse up to ten times the cleaning charge for that item, settled within seven days.",
  },
  {
    q: "Can I schedule recurring pickups?",
    a: "Yes. Choose a weekly or fortnightly slot at checkout and the same driver returns at the same time. Skip or move any individual pickup from your order page, up to two hours before.",
  },
  {
    q: "How can I track my order?",
    a: "Every order gets an ID like FL-2048. Enter it in the tracking section and you will see which of the six stages your bag is at, along with the current delivery estimate.",
  },
];

/** ------------------------------------------------------------ booking */
export const bookingSlots = [
  "7:00 – 9:00 AM",
  "9:00 – 11:00 AM",
  "11:00 AM – 1:00 PM",
  "3:00 – 5:00 PM",
  "5:00 – 7:00 PM",
  "7:00 – 9:00 PM",
] as const;
