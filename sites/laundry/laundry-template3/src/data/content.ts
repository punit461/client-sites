import type { IconName } from "@/lib/icons";
import { avatar, img } from "@/lib/images";

/** ---------------------------------------------------- the ticker strip */
export const promises = [
  "24-hour turnaround",
  "Hand-finished pressing",
  "Collection seven days a week",
  "Eco-certified solvents",
  "Every garment tagged and tracked",
  "Insured door to door",
  "Re-cleaned free if it is not right",
] as const;

/** ------------------------------------------------- services (accordion) */
export interface Service {
  id: string;
  name: string;
  /** The vertical label shown while the panel is collapsed. */
  short: string;
  copy: string;
  from: string;
  points: string[];
  image: string;
  icon: IconName;
}

export const services: Service[] = [
  {
    id: "laundry",
    name: "Laundry & fold",
    short: "Laundry",
    copy: "The weekly bag. Sorted by colour and fabric, washed at the temperature the label asks for, dried and folded to a standard size so it stacks straight into a drawer.",
    from: "₹99 / kg",
    points: [
      "Sorted by colour and fabric",
      "Hypoallergenic detergent",
      "Folded or hung, your choice",
    ],
    image: img.serviceLaundry,
    icon: "washingMachine",
  },
  {
    id: "dry-clean",
    name: "Dry cleaning",
    short: "Dry clean",
    copy: "For suits, coats, silk and anything lined. Solvent-based cleaning in a closed-loop machine, spot treatment by hand first, and a press before it comes back.",
    from: "₹199 / item",
    points: [
      "Closed-loop, eco-certified solvent",
      "Hand spotting before the cycle",
      "Returned hung in a breathable cover",
    ],
    image: img.serviceDryClean,
    icon: "sparkles",
  },
  {
    id: "press",
    name: "Pressing & steam",
    short: "Pressing",
    copy: "Already clean, just creased. Shirts on a shirt press, everything else finished by hand on a vacuum table so the shape stays where the tailor put it.",
    from: "₹59 / item",
    points: [
      "Shirt press for collars and cuffs",
      "Hand finishing on tailoring",
      "Same-day on orders before 10 AM",
    ],
    image: img.servicePress,
    icon: "flame",
  },
  {
    id: "couture",
    name: "Couture care",
    short: "Couture",
    copy: "Bridal, heirloom and occasion wear. Cleaned by a named specialist, photographed before and after, and stored flat in acid-free tissue if you are not wearing it soon.",
    from: "On assessment",
    points: [
      "Named specialist, start to finish",
      "Photographed before and after",
      "Acid-free boxing and storage",
    ],
    image: img.serviceCouture,
    icon: "gem",
  },
  {
    id: "home",
    name: "Home linen",
    short: "Home",
    copy: "Bedding, towels, curtains and covers. Washed at a temperature that actually sanitises, pressed flat, and returned in one wrapped set per bed.",
    from: "₹149 / kg",
    points: [
      "60°C sanitising wash on bedding",
      "Curtains taken down and rehung",
      "Wrapped as complete sets",
    ],
    image: img.serviceHome,
    icon: "house",
  },
];

/** --------------------------------------------------------- the standard */
export interface Standard {
  id: string;
  title: string;
  copy: string;
  image: string;
  icon: IconName;
}

export const standards: Standard[] = [
  {
    id: "inspect",
    title: "Every garment is inspected before it is cleaned",
    copy: "Pockets emptied, seams and buttons checked, existing damage photographed. If something is already torn you hear about it that evening, not when it comes back.",
    image: img.standardInspect,
    icon: "search",
  },
  {
    id: "tag",
    title: "Nothing is washed in a batch with another household",
    copy: "Each collection is tagged to one member and stays together through the wash house. Your shirts never meet somebody else's towels.",
    image: img.standardSort,
    icon: "badgeCheck",
  },
  {
    id: "programme",
    title: "The care label sets the programme, not the schedule",
    copy: "Temperature, agitation and drying are read off the garment. If the label says cold and dry flat, it is washed cold and dried flat, even when that costs us a day.",
    image: img.standardClean,
    icon: "thermometer",
  },
  {
    id: "finish",
    title: "Finishing is done by hand, on a press built for it",
    copy: "Collars and cuffs on a shirt press, tailoring on a vacuum table, knitwear steamed flat and never hung wet. Creases end up where the pattern intended.",
    image: img.standardFinish,
    icon: "flame",
  },
  {
    id: "return",
    title: "If it is not right, it is re-cleaned free",
    copy: "Tell us within 48 hours of the return and it goes back through at our cost. Every garment is covered door to door as well, up to your plan's limit.",
    image: img.standardReturn,
    icon: "shieldCheck",
  },
];

/** ------------------------------------------------------------- process */
export interface Step {
  id: string;
  title: string;
  copy: string;
  meta: string;
  icon: IconName;
}

export const steps: Step[] = [
  {
    id: "book",
    title: "Set your schedule",
    copy: "Pick a day and a two-hour window. Members keep the same slot every week and can move or skip one from a text message.",
    meta: "Takes about a minute",
    icon: "calendar",
  },
  {
    id: "collect",
    title: "We collect from your door",
    copy: "A driver arrives inside the window with a reusable bag. Nothing to weigh and nothing to count — that happens under camera at the wash house.",
    meta: "Seven days a week",
    icon: "truck",
  },
  {
    id: "inspect",
    title: "Inspected, tagged and photographed",
    copy: "Every item is logged against your account with its care label and its condition, and the list reaches your phone before anything is washed.",
    meta: "Within two hours of collection",
    icon: "search",
  },
  {
    id: "clean",
    title: "Cleaned and finished",
    copy: "Laundry, dry cleaning or hand care, each on the programme its label asks for, then pressed and checked by a second pair of eyes.",
    meta: "24 to 48 hours",
    icon: "sparkles",
  },
  {
    id: "return",
    title: "Returned, hung and ready to wear",
    copy: "Back in the same window, hung in breathable covers with folded items wrapped separately. The bag goes back with the driver for next time.",
    meta: "On the day we promised",
    icon: "packageCheck",
  },
];

/** --------------------------------------------------------- stain guide */
export const stainCategories = [
  { id: "food", label: "Food & drink" },
  { id: "oil", label: "Oil & grease" },
  { id: "ink", label: "Ink & dye" },
  { id: "outdoors", label: "Outdoors" },
  { id: "body", label: "Body & beauty" },
] as const;

export type StainCategory = (typeof stainCategories)[number]["id"];

export interface Stain {
  id: string;
  name: string;
  category: StainCategory;
  /** What a member should do before the driver arrives. */
  firstAid: string;
  /** What happens to it at the wash house. */
  treatment: string;
  /** Share of these removed completely, from our own records. */
  success: number;
  /** Whether stain work on it is inside the membership or quoted separately. */
  included: boolean;
}

export const stains: Stain[] = [
  {
    id: "red-wine",
    name: "Red wine",
    category: "food",
    firstAid:
      "Blot, never rub. Cover the patch in salt to hold the pigment at the surface and leave it dry.",
    treatment:
      "Oxygen-based bleaching bath at 30°C, then a tannin remover worked in by hand on the spotting table.",
    success: 94,
    included: true,
  },
  {
    id: "coffee",
    name: "Coffee & tea",
    category: "food",
    firstAid:
      "Rinse from the back of the fabric with cold water, so the stain leaves the way it came in.",
    treatment: "Tannin solvent, then an enzyme soak for anything with milk in it.",
    success: 97,
    included: true,
  },
  {
    id: "turmeric",
    name: "Turmeric & curry",
    category: "food",
    firstAid: "Keep it out of sunlight and do not iron it — heat sets the colour for good.",
    treatment:
      "Alkaline pre-treatment followed by controlled UV fading, repeated over two cycles where it needs it.",
    success: 88,
    included: true,
  },
  {
    id: "chocolate",
    name: "Chocolate",
    category: "food",
    firstAid: "Let it harden, then lift the solids off with a blunt edge before anything gets wet.",
    treatment: "Enzyme pre-soak for the protein, then a solvent pass for the cocoa butter.",
    success: 96,
    included: true,
  },
  {
    id: "cooking-oil",
    name: "Cooking oil",
    category: "oil",
    firstAid:
      "Dust it with talc or cornflour and leave it alone — the powder pulls the oil out of the weave.",
    treatment: "Solvent spotting, then a hot wash with a grease-releasing surfactant.",
    success: 93,
    included: true,
  },
  {
    id: "engine-grease",
    name: "Engine grease",
    category: "oil",
    firstAid: "Nothing wet. Water spreads it and sets the ring around the edge.",
    treatment: "Dry-side spotting agent under a steam gun, then dry cleaned rather than laundered.",
    success: 85,
    included: false,
  },
  {
    id: "ballpoint",
    name: "Ballpoint ink",
    category: "ink",
    firstAid: "Slide a clean cloth underneath so the ink has somewhere to go, and leave the rest.",
    treatment: "Alcohol-based spotting, flushed through repeatedly onto an absorbent pad.",
    success: 89,
    included: true,
  },
  {
    id: "dye-transfer",
    name: "Dye transfer",
    category: "ink",
    firstAid:
      "Keep the garment damp and send it the same day — dye that dries in is far harder to lift.",
    treatment: "Reducing bath under close watch, stopped the moment the transferred colour goes.",
    success: 72,
    included: false,
  },
  {
    id: "mud",
    name: "Mud & clay",
    category: "outdoors",
    firstAid: "Let it dry completely, then brush the loose soil off outdoors. Wet mud only spreads.",
    treatment: "Mechanical brushing, then an alkaline pre-wash to release the mineral content.",
    success: 98,
    included: true,
  },
  {
    id: "grass",
    name: "Grass",
    category: "outdoors",
    firstAid: "Resist the urge to soap it — that fixes chlorophyll into cotton.",
    treatment: "Enzyme and alcohol combination on the spotting table before a warm wash.",
    success: 91,
    included: true,
  },
  {
    id: "sweat",
    name: "Sweat & deodorant",
    category: "body",
    firstAid: "Send it sooner rather than later. Old collar marks oxidise and turn yellow.",
    treatment: "Enzyme soak for the protein, then a mild reducing agent on the yellowing.",
    success: 90,
    included: true,
  },
  {
    id: "makeup",
    name: "Foundation & lipstick",
    category: "body",
    firstAid: "Lift the excess with tape rather than a tissue, which grinds it in.",
    treatment: "Oil-side spotting for the pigment base, then a fine-fabric wash or a dry clean.",
    success: 94,
    included: true,
  },
  {
    id: "blood",
    name: "Blood",
    category: "body",
    firstAid: "Cold water only. Warm water cooks the protein into the fibre and it stays there.",
    treatment: "Cold enzyme soak, then hydrogen peroxide on whites only.",
    success: 92,
    included: true,
  },
];

/** ------------------------------------------------------- order tracking */
export interface TrackStage {
  id: string;
  label: string;
  detail: string;
  icon: IconName;
}

export const trackStages: TrackStage[] = [
  { id: "booked", label: "Collection booked", detail: "A driver is assigned to your window", icon: "calendar" },
  { id: "collected", label: "Collected", detail: "Bag sealed and tagged at your door", icon: "package" },
  { id: "logged", label: "Inspected & logged", detail: "Each item photographed against your account", icon: "search" },
  { id: "cleaning", label: "In the wash house", detail: "Programme set from every care label", icon: "washingMachine" },
  { id: "finishing", label: "Pressing & checks", detail: "Hand finished, then checked a second time", icon: "flame" },
  { id: "out", label: "Out for return", detail: "On the van, back inside your window", icon: "truck" },
];

/**
 * The demo lookup. A real one would ask an API; keeping it here is what lets
 * the section work in a static export with nothing behind it.
 */
export const demoOrders: Record<
  string,
  { stage: number; items: number; eta: string; plan: string }
> = {
  "CRISP-4821": { stage: 4, items: 22, eta: "Today, 6 – 8 PM", plan: "Signature" },
  "CRISP-1174": { stage: 1, items: 9, eta: "Thursday, 9 – 11 AM", plan: "Essential" },
  "CRISP-9006": { stage: 5, items: 31, eta: "Today, 8 – 10 PM", plan: "Atelier" },
};

/** ------------------------------------------------- inside the wash house */
export const gallery = [
  { src: img.houseFloor, caption: "The floor, mid-shift" },
  { src: img.houseSteam, caption: "Finishing on the vacuum table" },
  { src: img.houseRack, caption: "Tagged, waiting for checks" },
  { src: img.houseDetail, caption: "Spotting, by hand" },
  { src: img.houseVan, caption: "Loaded for the evening round" },
  { src: img.houseWardrobe, caption: "Returned, hung and covered" },
] as const;

/** --------------------------------------------------------- testimonials */
export interface Story {
  id: string;
  quote: string;
  name: string;
  role: string;
  area: string;
  plan: string;
  rating: number;
  photo: string;
}

export const stories: Story[] = [
  {
    id: "nikhil",
    quote:
      "I travel four days a week and used to lose an entire evening to laundry. The bag goes out on Sunday night and comes back Tuesday, pressed. I have not thought about it since March.",
    name: "Nikhil Rao",
    role: "Consultant",
    area: "Indiranagar",
    plan: "Signature",
    rating: 5,
    photo: avatar("nikhil-rao"),
  },
  {
    id: "priya",
    quote:
      "They photographed a tear in a kurta I had not even noticed and asked before doing anything about it. That one message is why I now send them things I actually care about.",
    name: "Priya Venkatesh",
    role: "Architect",
    area: "Koramangala",
    plan: "Atelier",
    rating: 5,
    photo: avatar("priya-venkatesh"),
  },
  {
    id: "arjun",
    quote:
      "Turmeric on a white linen shirt. I had written the shirt off. It came back and I genuinely cannot find where the stain was.",
    name: "Arjun Shetty",
    role: "Restaurateur",
    area: "HSR Layout",
    plan: "Signature",
    rating: 5,
    photo: avatar("arjun-shetty"),
  },
  {
    id: "maya",
    quote:
      "Two children, one washing machine and no time. Four bags a month covers us, and the driver has been there inside the window every Tuesday since we joined.",
    name: "Maya Iyer",
    role: "Doctor",
    area: "Jayanagar",
    plan: "Essential",
    rating: 4,
    photo: avatar("maya-iyer"),
  },
];

/** ------------------------------------------------------------------ faq */
export const faqs = [
  {
    q: "What happens if I am not home when the driver arrives?",
    a: "Leave the bag with a guard, a neighbour or at the door and say so in the app. The driver photographs every collection either way, so there is always a record of what left and when.",
  },
  {
    q: "Can I pause my membership?",
    a: "Yes, for up to eight weeks a year, from the account page or a message to the concierge. Unused bags roll into the following month and expire only if the membership is cancelled.",
  },
  {
    q: "What counts as a bag?",
    a: "Up to six kilograms, which is roughly a week of clothes for one person — about 18 shirts, or a double duvet cover with two pillowcases. Bags are weighed under camera and you see the number before anything is washed.",
  },
  {
    q: "Do you handle things that cannot go in a machine?",
    a: "Silk, wool, leather trim, beading and bridal wear all go to a specialist rather than a machine. Send a photograph first and you get a quote before we collect.",
  },
  {
    q: "What if something is damaged or lost?",
    a: "Every garment is covered door to door up to your plan's limit, and the inspection photographs settle what it looked like when it reached us. Claims are answered within three working days.",
  },
  {
    q: "Which areas do you collect from?",
    a: "Eight Bengaluru neighbourhoods today, listed in the footer. If you are just outside one, ask the concierge — we often already pass your street on an existing round.",
  },
] as const;
