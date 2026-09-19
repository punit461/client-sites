import { avatar, img } from "@/lib/images";
import type { IconName } from "@/lib/icons";

/** Property-level content. A hand-over starts here. */
export const property = {
  name: "Wander",
  suffix: "& Pine",
  fullName: "Wander & Pine",
  announcement: "Wake up to mountains, coffee & fresh air",
  eyebrow: "Your home in the hills",
  headline: ["Slow down.", "Stay longer.", "Explore more."],
  intro:
    "A four-room house on a hillside above the coffee, run by two people who moved here in 2018 and never went back.",
  since: 2018,
  region: "Coorg, Karnataka",
  rating: { score: 4.9, count: 128, source: "guest reviews" },
};

export const contact = {
  phone: "+91 90080 44120",
  phoneDial: "+919008044120",
  whatsapp: "919008044120",
  email: "hello@wanderandpine.example",
  address: ["Wander & Pine", "Kabbinakad Road", "Madikeri, Coorg 571201"],
  mapsQuery: "Kabbinakad Road, Madikeri, Coorg 571201",
};

export const nav = [
  { label: "Stay", href: "/stay" },
  { label: "Experiences", href: "/experiences" },
  { label: "Explore", href: "/explore" },
  { label: "Gallery", href: "/gallery" },
  { label: "Our Story", href: "/story" },
  { label: "Contact", href: "/contact" },
] as const;

/** The floating cards on the hero. */
export const heroCards = [
  { value: `${property.rating.score}/5`, label: "Guest rating", icon: "star" as IconName },
  { value: "Surrounded", label: "by nature", icon: "trees" as IconName },
  { value: "Fresh local", label: "breakfast", icon: "croissant" as IconName },
];

/** ------------------------------------------------------------ rooms */
export interface Room {
  slug: string;
  name: string;
  tagline: string;
  blurb: string;
  description: string[];
  guests: number;
  bed: string;
  size: string;
  rate: number;
  amenities: string[];
  images: { src: string; alt: string }[];
  accent: "terracotta" | "sage" | "yellow" | "sky";
}

export const rooms: Room[] = [
  {
    slug: "the-loft",
    name: "The Loft",
    tagline: "Top floor, best light",
    blurb: "Sloped ceilings, a window seat, and the whole valley when the mist lifts.",
    description: [
      "Right at the top of the house under the eaves, with a deep window seat that most guests end up spending the morning in.",
      "Two flights of stairs and a low beam by the door — worth knowing before you book if either is a problem.",
    ],
    guests: 2,
    bed: "Queen bed",
    size: "28 m²",
    rate: 6500,
    amenities: ["Window seat", "Valley view", "Ensuite shower", "Coffee kit", "Wi-Fi", "Heater"],
    images: [
      { src: img.roomLoft, alt: "The Loft bedroom" },
      { src: img.interior, alt: "The window seat" },
    ],
    accent: "terracotta",
  },
  {
    slug: "pine-room",
    name: "Pine Room",
    tagline: "The quiet one",
    blurb: "Backs onto the trees, so you wake up to birds rather than anything else.",
    description: [
      "On the north side of the house facing straight into the pines. The darkest room in the morning and the coolest in the afternoon.",
      "The room people pick when they actually want to sleep in.",
    ],
    guests: 2,
    bed: "Queen bed",
    size: "26 m²",
    rate: 5800,
    amenities: ["Forest view", "Blackout curtains", "Ensuite shower", "Coffee kit", "Wi-Fi"],
    images: [
      { src: img.roomPine, alt: "The Pine Room" },
      { src: img.terrace, alt: "The terrace outside" },
    ],
    accent: "sage",
  },
  {
    slug: "garden-suite",
    name: "Garden Suite",
    tagline: "Step straight out",
    blurb: "Ground floor with its own door onto the garden and a hammock nobody has ever regretted.",
    description: [
      "The only room on the ground floor, with double doors onto the garden and a hammock strung between two jackfruit trees.",
      "Step-free from the driveway, which makes it the easiest room to reach with luggage or a bad knee.",
    ],
    guests: 3,
    bed: "King bed, plus a single",
    size: "34 m²",
    rate: 7800,
    amenities: ["Garden door", "Hammock", "Step-free entry", "Ensuite with tub", "Coffee kit", "Wi-Fi"],
    images: [
      { src: img.roomGarden, alt: "The Garden Suite" },
      { src: img.storyMain, alt: "The garden" },
    ],
    accent: "yellow",
  },
  {
    slug: "the-cabin",
    name: "The Cabin",
    tagline: "Away from the house",
    blurb: "A separate timber cabin a short walk down the slope. Dogs welcome.",
    description: [
      "Built in 2021 out of timber from a tree that came down in a storm. About ninety seconds' walk from the main house, far enough to feel separate.",
      "Its own veranda, a kettle and a fridge, and the only place on the property a dog can stay.",
    ],
    guests: 4,
    bed: "King bed and a sofa bed",
    size: "45 m²",
    rate: 9800,
    amenities: ["Private veranda", "Kitchenette", "Dog friendly", "Wood stove", "Wi-Fi"],
    images: [
      { src: img.roomCabin, alt: "The Cabin interior" },
      { src: img.tent, alt: "The view from the cabin" },
    ],
    accent: "sky",
  },
];

export const findRoom = (slug: string) => rooms.find((r) => r.slug === slug);
export const fromRate = Math.min(...rooms.map((r) => r.rate));

/** ------------------------------------------------------------ experiences */
export interface Experience {
  slug: string;
  name: string;
  blurb: string;
  detail: string;
  duration: string;
  included: boolean;
  image: string;
  alt: string;
  icon: IconName;
  /** Footprint in the bento grid at lg and up. */
  span: "lg" | "wide" | "md" | "sm";
}

export const experiences: Experience[] = [
  {
    slug: "sunrise-trek",
    name: "Sunrise Trek",
    blurb: "Up at five, on the ridge by six, back for breakfast.",
    detail:
      "About ninety minutes up a forest path to a clearing that looks east over the whole valley. Between November and February the cloud sits below you.",
    duration: "3 hours",
    included: true,
    image: img.trek,
    alt: "Mountains above cloud at sunrise",
    icon: "mountainSnow",
    span: "lg",
  },
  {
    slug: "coffee-plantation-tour",
    name: "Coffee Plantation Tour",
    blurb: "From the tree to the cup you had at breakfast.",
    detail:
      "An hour with whoever is working that day, through flowering, picking, pulping and drying depending on the season.",
    duration: "1 hour",
    included: true,
    image: img.plantation,
    alt: "Coffee beans drying",
    icon: "coffee",
    span: "md",
  },
  {
    slug: "campfire-nights",
    name: "Campfire Nights",
    blurb: "Lit most dry evenings, no plan required.",
    detail: "The fire goes on around seven. Blankets are in the wooden box; so is the marshmallow situation.",
    duration: "Evenings",
    included: true,
    image: img.campfire,
    alt: "A campfire in the evening",
    icon: "flame",
    span: "sm",
  },
  {
    slug: "local-cooking",
    name: "Local Cooking",
    blurb: "Learn three Coorgi dishes, then eat them.",
    detail:
      "An afternoon in the kitchen with Latha — usually a curry, a chutney and something with rice. Vegetarian unless you say otherwise.",
    duration: "3 hours",
    included: false,
    image: img.cooking,
    alt: "A home-cooked meal",
    icon: "soup",
    span: "sm",
  },
  {
    slug: "waterfall-visit",
    name: "Waterfall Visit",
    blurb: "Forty minutes by jeep, then a short scramble.",
    detail:
      "Best right after the monsoon when there is actually water in it. Bring shoes you do not mind getting wet.",
    duration: "Half day",
    included: false,
    image: img.waterfall,
    alt: "A mountain lake and falls",
    icon: "compass",
    span: "md",
  },
  {
    slug: "village-walk",
    name: "Village Walk",
    blurb: "Down the hill and around, at a conversational pace.",
    detail:
      "About four kilometres through the village and back up through the estate. The best way to end up invited in for tea by someone.",
    duration: "2 hours",
    included: true,
    image: img.village,
    alt: "A walker on a hill path",
    icon: "footprints",
    span: "wide",
  },
];

export const findExperience = (slug: string) => experiences.find((e) => e.slug === slug);

/** ------------------------------------------------------------ explore */
export interface Place {
  name: string;
  kind: "Waterfall" | "Viewpoint" | "Coffee estate" | "Food" | "Adventure" | "Culture";
  distance: string;
  time: string;
  copy: string;
  image: string;
  /** Position on the stylised map, in percent. */
  x: number;
  y: number;
}

export const places: Place[] = [
  { name: "Abbey Falls", kind: "Waterfall", distance: "14 km", time: "35 min", copy: "Loud after the monsoon, a trickle by March. The walkway gets busy by ten.", image: img.waterfall, x: 26, y: 30 },
  { name: "Raja's Seat", kind: "Viewpoint", distance: "9 km", time: "22 min", copy: "The sunset spot in Madikeri. Go on a weekday if you can.", image: img.viewpoint, x: 62, y: 22 },
  { name: "Tata Coffee Estate", kind: "Coffee estate", distance: "18 km", time: "40 min", copy: "A bigger, more formal plantation tour than ours, worth it for the contrast.", image: img.estate, x: 40, y: 58 },
  { name: "Coorg Cuisine, Madikeri", kind: "Food", distance: "10 km", time: "25 min", copy: "Pandi curry and akki roti done properly. Small, so go early.", image: img.dinner, x: 72, y: 52 },
  { name: "Barapole River", kind: "Adventure", distance: "48 km", time: "1 hr 40", copy: "Grade III rafting from June to September. Book ahead in season.", image: img.lake, x: 18, y: 74 },
  { name: "Omkareshwara Temple", kind: "Culture", distance: "11 km", time: "26 min", copy: "1820s temple in the middle of town, unusual mix of styles.", image: img.meadow, x: 84, y: 76 },
];

export const placeKinds = ["All", "Waterfall", "Viewpoint", "Coffee estate", "Food", "Adventure", "Culture"] as const;

/** ------------------------------------------------------------ food */
export const menu = [
  { course: "Breakfast", items: ["Akki roti with chutney", "Eggs, however you like them", "Fruit from the garden", "Estate coffee"], image: img.breakfast, icon: "croissant" as IconName },
  { course: "Lunch", items: ["Rice and two curries", "Seasonal vegetable palya", "Curd and pickle"], image: img.dinner, icon: "soup" as IconName },
  { course: "Dinner", items: ["Coorgi pandi curry or a vegetarian equivalent", "Kadambuttu or rice", "Something sweet, occasionally"], image: img.dinner, icon: "utensils" as IconName },
  { course: "All day", items: ["Filter coffee from the estate", "Tea whenever", "Banana chips that disappear fast"], image: img.coffee, icon: "coffee" as IconName },
];

/** ------------------------------------------------------------ stories */
/** PLACEHOLDER GUEST STORIES — illustrative, replace before launch. */
export const stories = [
  {
    name: "Meera",
    from: "Bengaluru",
    date: "November 2025",
    rating: 5,
    stay: "The Loft · 3 nights",
    quote:
      "I booked two nights and extended to three from the window seat. Did not go anywhere on the last day and do not regret it.",
    avatar: avatar("meera-wp"),
  },
  {
    name: "Jonas",
    from: "Berlin",
    date: "January 2026",
    rating: 5,
    stay: "The Cabin · 5 nights",
    quote:
      "The trek at sunrise was the single best thing we did in three weeks in India. Ravi got us up there in the dark and it was worth every minute.",
    avatar: avatar("jonas-wp"),
  },
  {
    name: "Aisha & Sam",
    from: "Dubai",
    date: "October 2025",
    rating: 5,
    stay: "Garden Suite · 4 nights",
    quote:
      "Came with a toddler expecting it to be hard work. Latha basically adopted her for four days and we read books in the hammock.",
    avatar: avatar("aisha-sam-wp"),
  },
];

/** ------------------------------------------------------------ journal */
export const journal = [
  { kind: "photo" as const, src: img.trek, alt: "The ridge at sunrise", caption: "5:40 AM, the ridge", tall: true },
  { kind: "quote" as const, text: "Some places you visit. Some places you remember." },
  { kind: "photo" as const, src: img.coffee, alt: "Coffee from the estate", caption: "Second cup" },
  { kind: "polaroid" as const, src: img.campfire, alt: "The campfire", caption: "Tuesday, late" },
  { kind: "photo" as const, src: img.waterfall, alt: "The falls after rain", alt2: "", tall: true },
  { kind: "text" as const, text: "Four rooms. One long table. No television anywhere on the property." },
  { kind: "photo" as const, src: img.roomGarden, alt: "The Garden Suite" },
  { kind: "polaroid" as const, src: img.stars, alt: "The night sky", caption: "No streetlights" },
  { kind: "photo" as const, src: img.village, alt: "On the village walk", tall: true },
];

/** ------------------------------------------------------------ seasons */
export const seasons = [
  { name: "Winter", months: "December – February", weather: "12–24°C, clear mornings", activities: ["Sunrise treks", "Campfires", "Coffee picking"], pick: "Sunrise Trek", image: img.trek, icon: "snowflake" as IconName },
  { name: "Summer", months: "March – May", weather: "18–32°C, hazy afternoons", activities: ["Early walks", "Waterfall dips", "Long lunches"], pick: "Waterfall Visit", image: img.waterfall, icon: "sun" as IconName },
  { name: "Monsoon", months: "June – September", weather: "18–26°C, heavy rain", activities: ["Rafting", "Reading", "Watching it come down"], pick: "Local Cooking", image: img.estate, icon: "cloudRain" as IconName },
  { name: "Autumn", months: "October – November", weather: "16–28°C, everything green", activities: ["Village walks", "Plantation tours", "Photography"], pick: "Village Walk", image: img.meadow, icon: "leaf" as IconName },
];

/** ------------------------------------------------------------ faq */
export const faqs = [
  { q: "What time is check-in?", a: "From 1:00 PM, and check-out is 11:00 AM. If you are arriving late, tell us and we will leave dinner out." },
  { q: "Do you provide breakfast?", a: "Yes — breakfast, lunch and dinner are all included, along with coffee and tea through the day. Tell us about dietary requirements when you book." },
  { q: "Is parking available?", a: "Yes, free, right by the house. The last 1.5 km is estate road; any car manages it outside heavy monsoon." },
  { q: "Are pets allowed?", a: "Dogs are welcome in The Cabin only, by prior arrangement. We have two resident dogs who will want to meet yours." },
  { q: "How far are the attractions?", a: "Madikeri town is about 25 minutes. Most waterfalls and viewpoints are between 20 minutes and an hour." },
  { q: "Is Wi-Fi available?", a: "Yes, in the house and the cabin. It is fine for messages and email, patchy for video calls. Mobile signal is best on the terrace." },
  { q: "Can we arrange local activities?", a: "Yes. Treks, plantation tours and village walks are included; rafting, cooking classes and drivers we arrange for you at cost." },
  { q: "What is the cancellation policy?", a: "Free cancellation up to seven days before arrival. Inside seven days we charge the first night. This is what the enquiry form applies." },
];
