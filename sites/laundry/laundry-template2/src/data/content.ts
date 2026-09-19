import type { IconName } from "@/lib/icons";
import { img, portrait } from "@/lib/images";

/** ------------------------------------------------------- bento services */
export interface BentoItem {
  id: string;
  name: string;
  copy: string;
  from: string;
  image: string;
  alt: string;
  /** How much of the 6-column grid this card takes at lg and up. */
  span: "wide" | "lg" | "md" | "sm";
}

export const bento: BentoItem[] = [
  {
    id: "laundry",
    name: "Laundry",
    copy: "Everyday washing, dried and folded. Sorted by colour and fabric before it goes anywhere near a drum.",
    from: "₹99 / kg",
    image: img.bentoLaundry,
    alt: "A basket of clothes ready for washing",
    span: "lg",
  },
  {
    id: "dry-cleaning",
    name: "Dry Cleaning",
    copy: "Solvent cleaning for anything water would ruin.",
    from: "₹149 / item",
    image: img.bentoDryClean,
    alt: "A rail of dark garments after dry cleaning",
    span: "md",
  },
  {
    id: "ironing",
    name: "Steam Ironing",
    copy: "Pressed on commercial tables.",
    from: "₹29 / item",
    image: img.bentoIron,
    alt: "A steam iron pressing a shirt",
    span: "sm",
  },
  {
    id: "shoes",
    name: "Shoe Cleaning",
    copy: "Leather, suede and canvas.",
    from: "₹249 / pair",
    image: img.bentoShoes,
    alt: "A cleaned leather sneaker",
    span: "sm",
  },
  {
    id: "curtains",
    name: "Curtain Cleaning",
    copy: "Taken down, cleaned, re-hung. Blackout linings included.",
    from: "₹199 / panel",
    image: img.bentoCurtains,
    alt: "Curtains in a bright living room",
    span: "md",
  },
  {
    id: "premium",
    name: "Premium Garment Care",
    copy: "Bridalwear, tailoring and designer pieces. Logged, photographed and handled by one named specialist from collection to return.",
    from: "₹299 / item",
    image: img.bentoPremium,
    alt: "A tailored suit jacket",
    span: "wide",
  },
];

/** ------------------------------------------------------- journey rail */
export interface Stage {
  n: string;
  title: string;
  copy: string;
  image: string;
  alt: string;
}

export const journey: Stage[] = [
  { n: "01", title: "Pickup", copy: "A driver collects at the window you chose, counts the bag with you and leaves a digital receipt.", image: img.journeyPickup, alt: "A delivery vehicle on the road" },
  { n: "02", title: "Sort", copy: "Every item is tagged, weighed and separated by colour, fabric and the treatment its label asks for.", image: img.journeySort, alt: "Clothes sorted on a rail" },
  { n: "03", title: "Clean", copy: "Washed at the right temperature on commercial machines, or dry cleaned where water would do damage.", image: img.journeyClean, alt: "A row of commercial washing machines" },
  { n: "04", title: "Care", copy: "Stains are treated by hand, delicates dried flat, and anything structured is finished on a form press.", image: img.journeyCare, alt: "A washing machine drum mid-cycle" },
  { n: "05", title: "Quality check", copy: "Item by item against the intake photos. Anything that is not right goes back through rather than out.", image: img.journeyCheck, alt: "Pressed shirts hanging on a rail" },
  { n: "06", title: "Delivery", copy: "Back at your door inside 24–48 hours, folded in a reusable bag or on hangers, whichever you picked.", image: img.journeyDeliver, alt: "Folded shirts stacked neatly" },
];

/** ------------------------------------------------------- fabric guide */
export interface Fabric {
  id: string;
  name: string;
  copy: string;
  image: string;
  alt: string;
  cleaning: string;
  temperature: string;
  drying: string;
  ironing: string;
  icon: IconName;
}

export const fabrics: Fabric[] = [
  {
    id: "cotton",
    name: "Cotton",
    copy: "Hard-wearing and forgiving, but it shrinks the first time it meets heat it was not finished for.",
    image: img.fabricCotton,
    alt: "A white cotton t-shirt",
    cleaning: "Machine wash",
    temperature: "40°C",
    drying: "Tumble dry low",
    ironing: "Hot, with steam",
    icon: "shirt",
  },
  {
    id: "silk",
    name: "Silk",
    copy: "Delicate cleaning process designed to preserve softness, colour and texture.",
    image: img.fabricSilk,
    alt: "Soft draped fabric",
    cleaning: "Hand wash or dry clean",
    temperature: "Cold, 30°C max",
    drying: "Flat, out of sunlight",
    ironing: "Cool, reverse side",
    icon: "sparkles",
  },
  {
    id: "wool",
    name: "Wool",
    copy: "Agitation is what felts wool, not water. It gets a dedicated low-movement programme.",
    image: img.fabricWool,
    alt: "Folded knitted garments",
    cleaning: "Wool programme",
    temperature: "30°C",
    drying: "Dry flat, never hung",
    ironing: "Steam only, no pressure",
    icon: "snowflake",
  },
  {
    id: "denim",
    name: "Denim",
    copy: "Washed inside out and cold, so indigo stays in the fibre rather than in the water.",
    image: img.fabricDenim,
    alt: "Close-up of denim fabric",
    cleaning: "Machine wash, inside out",
    temperature: "30°C",
    drying: "Line dry",
    ironing: "Medium, damp",
    icon: "droplets",
  },
  {
    id: "linen",
    name: "Linen",
    copy: "Creases are the point. We press it damp so it falls softly instead of looking starched.",
    image: img.fabricLinen,
    alt: "A linen garment",
    cleaning: "Machine wash, gentle",
    temperature: "40°C",
    drying: "Line dry, slightly damp",
    ironing: "Hot, while damp",
    icon: "sun",
  },
  {
    id: "suit",
    name: "Suit",
    copy: "Jacket and trousers are always cleaned together, so the two halves never drift apart in shade.",
    image: img.fabricSuit,
    alt: "A tailored suit",
    cleaning: "Dry clean only",
    temperature: "Solvent",
    drying: "Form press",
    ironing: "Professional finish",
    icon: "gem",
  },
  {
    id: "dress",
    name: "Dress",
    copy: "Beading, lining and shell can each want something different, so they are tested separately first.",
    image: img.fabricDress,
    alt: "A flowing dress",
    cleaning: "Depends on the lining",
    temperature: "Cold",
    drying: "Hung on a padded form",
    ironing: "Steam finish",
    icon: "flame",
  },
];

/** ------------------------------------------------------- transformation */
export const transformStats = [
  { value: 3, suffix: " hrs", label: "Saved every week" },
  { value: 50, suffix: "K+", label: "Garments cleaned" },
  { value: 99, suffix: "%", label: "Quality checks passed" },
] as const;

/** ------------------------------------------------------- stories */
export interface Story {
  headline: string;
  body: string;
  name: string;
  city: string;
  service: string;
  image: string;
}

export const stories: Story[] = [
  {
    headline: "Before LOOP, Sunday meant laundry day.",
    body: "Two loads, a drying rack in the living room and an hour of ironing in front of whatever was on. Now the bag goes out on Friday evening and comes back Sunday morning, and the rack is in the loft.",
    name: "Rahul",
    city: "Bengaluru",
    service: "Wash + Iron",
    image: portrait.rahul,
  },
  {
    headline: "I stopped owning clothes I was scared to wear.",
    body: "Half my wardrobe was dry-clean-only, which in practice meant never worn. Sending three things a month costs less than the two dresses I used to replace every year.",
    name: "Ananya",
    city: "Chennai",
    service: "Dry Cleaning",
    image: portrait.ananya,
  },
  {
    headline: "The first month I tracked how long it actually took.",
    body: "Four hours a week, counting the trips to the machine. That is a working morning, every week, for something a van does on the way past.",
    name: "Dev",
    city: "Hyderabad",
    service: "Laundry",
    image: portrait.dev,
  },
  {
    headline: "They called before touching the saree.",
    body: "There was an oil mark I had written off. Someone rang to explain what they wanted to try and what the risk was, then did it. It is the phone call that made me stay.",
    name: "Meera",
    city: "Bengaluru",
    service: "Premium Care",
    image: portrait.meera,
  },
];

/** ------------------------------------------------------- sustainability */
/**
 * These are claims about a business's operations, so they are configuration,
 * not copy: an operator sets figures they can actually evidence. Left at zero
 * the section simply does not render that number.
 */
export const sustainability = {
  points: [
    { title: "Water-efficient cleaning", copy: "Machines are run at full load and metered per cycle." },
    { title: "Eco-friendly detergents", copy: "Plant-based formulations, available on request at booking." },
    { title: "Reusable packaging", copy: "Bags come back with the next order instead of the bin." },
    { title: "Optimised delivery routes", copy: "Pickups are batched by area rather than by order time." },
  ],
  stats: [
    { value: 35, suffix: "%", label: "Less water per kilo" },
    { value: 60, suffix: "K+", label: "Reusable bags in rotation" },
    { value: 120, suffix: "K+", label: "Eco washes run" },
  ],
} as const;

/** ------------------------------------------------------- app preview */
export const appScreens = ["Home", "Schedule pickup", "Order tracking", "Pricing", "Profile"] as const;

/** ------------------------------------------------------- faq */
export const faqs = [
  {
    q: "How does pickup work?",
    a: "Pick a date and a two-hour window. A driver arrives with a reusable bag, counts the items with you and leaves a digital receipt before leaving. You do not need to be the one who hands it over — a doorman or a neighbour is fine if you say so at booking.",
  },
  {
    q: "How quickly will I get my clothes?",
    a: "Standard turnaround is 48 hours from collection; express is 24. You get an exact delivery window as soon as the bag is weighed in at the facility, not a vague estimate at booking.",
  },
  {
    q: "Do you handle delicate fabrics?",
    a: "Yes. Silk, wool, viscose and anything embellished are separated at intake and cleaned by hand or on a dedicated low-agitation programme. If a care label is missing, an inside seam is tested before anything else happens.",
  },
  {
    q: "What happens if I miss my pickup?",
    a: "Nothing is charged. The driver waits five minutes, then messages you to rebook — the next available window is usually the same evening. Missing one does not affect a recurring schedule.",
  },
  {
    q: "Can I schedule recurring laundry?",
    a: "Weekly or fortnightly, same window, same driver. Individual pickups can be skipped or moved from your order page up to two hours before the window opens.",
  },
  {
    q: "How do I track my order?",
    a: "Every order gets an ID like LOOP-20481. Enter it in the tracking section above and you will see which of the six stages the bag is at, plus the current delivery estimate.",
  },
  {
    q: "What payment methods are supported?",
    a: "UPI, cards, net banking and cash on delivery. Nothing is charged at booking — items are counted and priced with you at pickup, and payment is taken when the clean laundry arrives.",
  },
];
