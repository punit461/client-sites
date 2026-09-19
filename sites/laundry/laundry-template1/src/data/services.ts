import { img } from "@/lib/images";
import type { IconName } from "@/lib/icons";

export interface Service {
  id: string;
  name: string;
  blurb: string;
  from: string;
  icon: IconName;
  image: string;
  /** Alt text is content, not decoration, so it lives beside the image. */
  alt: string;
}

export const services: Service[] = [
  {
    id: "wash-fold",
    name: "Wash & Fold",
    blurb: "Everyday clothes washed, dried and returned neatly folded, sorted by colour and fabric.",
    from: "₹99 / kg",
    icon: "washingMachine",
    image: img.washFold,
    alt: "A basket of freshly laundered clothes",
  },
  {
    id: "dry-cleaning",
    name: "Dry Cleaning",
    blurb: "Solvent cleaning for delicate and premium garments that water would ruin.",
    from: "₹149 / item",
    icon: "sparkles",
    image: img.dryClean,
    alt: "A rail of dark garments after dry cleaning",
  },
  {
    id: "ironing",
    name: "Steam Ironing",
    blurb: "Crisp, wrinkle-free clothes pressed on professional steam tables and delivered ready to wear.",
    from: "₹29 / item",
    icon: "wind",
    image: img.ironing,
    alt: "A steam iron pressing a shirt on an ironing board",
  },
  {
    id: "premium-care",
    name: "Premium Care",
    blurb: "Hand-finished treatment for suits, gowns, silk, wool and designer labels.",
    from: "₹299 / item",
    icon: "gem",
    image: img.premiumCare,
    alt: "A tailored suit being fastened",
  },
];

/** The sticky split-screen section: scrolling the text swaps the image. */
export interface ShowcaseItem {
  index: string;
  title: string;
  copy: string;
  image: string;
  alt: string;
  points: string[];
}

export const showcase: ShowcaseItem[] = [
  {
    index: "01",
    title: "Wash & Fold",
    copy: "Sorted by colour and fabric, washed at the right temperature, tumble-dried low and folded the way you would fold it yourself.",
    image: img.showcaseWash,
    alt: "A row of commercial washing machines",
    points: ["Sorted by colour & fabric", "Hypoallergenic detergent", "Folded and bagged"],
  },
  {
    index: "02",
    title: "Dry Cleaning",
    copy: "Garments that water would shrink, bleed or distort are cleaned in solvent, spot-treated by hand and finished on a form press.",
    image: img.showcaseDryClean,
    alt: "Neutral coats hanging after dry cleaning",
    points: ["Hand spot-treatment", "Form-press finishing", "Protective garment covers"],
  },
  {
    index: "03",
    title: "Ironing",
    copy: "Professional steam tables reach temperatures a home iron cannot, so collars sit flat and creases stay put until you wear them.",
    image: img.showcaseIron,
    alt: "Pressed shirts hanging on a rail",
    points: ["Industrial steam finish", "Collar & cuff shaping", "Hung, not folded"],
  },
  {
    index: "04",
    title: "Shoe & Bag Cleaning",
    copy: "Leather, suede and canvas cleaned, conditioned and re-shaped by hand — soles, laces and hardware included.",
    image: img.showcaseShoes,
    alt: "A pair of cleaned pastel sneakers",
    points: ["Leather & suede safe", "Deodorised interiors", "Hardware polished"],
  },
  {
    index: "05",
    title: "Premium Garment Care",
    copy: "Bridalwear, tailoring and designer pieces are logged, photographed and handled by one named specialist from collection to return.",
    image: img.showcasePremium,
    alt: "A tailored green suit jacket",
    points: ["Photographed on arrival", "One named handler", "Boxed or hung to order"],
  },
];

export interface Step {
  index: string;
  title: string;
  copy: string;
  icon: IconName;
}

export const steps: Step[] = [
  {
    index: "01",
    title: "Book a pickup",
    copy: "Pick a date and a two-hour slot. It takes about a minute.",
    icon: "calendar",
  },
  {
    index: "02",
    title: "We collect",
    copy: "A uniformed driver arrives with a reusable bag and a receipt.",
    icon: "truck",
  },
  {
    index: "03",
    title: "We clean",
    copy: "Sorted, treated and finished at our facility, then quality checked.",
    icon: "sparkles",
  },
  {
    index: "04",
    title: "We deliver",
    copy: "Back at your door within 24–48 hours, folded or on hangers.",
    icon: "packageCheck",
  },
];
