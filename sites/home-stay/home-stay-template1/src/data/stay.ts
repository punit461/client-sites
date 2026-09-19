import { img, avatar } from "@/lib/images";
import type { IconName } from "@/lib/icons";

/**
 * Property-level content. A hand-over starts here: change the name, the rooms,
 * the rates and the location, and the whole site follows.
 */
export const property = {
  name: "Ridgeline",
  suffix: "Retreat",
  fullName: "Ridgeline Retreat",
  tagline: "A peaceful escape in nature",
  headline: "Stay somewhere beautiful",
  intro:
    "Six rooms on a working coffee estate, looking out over the valley. No crowds, no schedule, and dinner cooked by the people who live here.",
  since: 2016,
  region: "Chikmagalur, Karnataka",
};

export const contact = {
  phone: "+91 98450 22110",
  phoneDial: "+919845022110",
  whatsapp: "919845022110",
  email: "stay@ridgelineretreat.example",
  address: ["Ridgeline Estate", "Mullayanagiri Road", "Chikmagalur 577101"],
  mapsQuery: "Mullayanagiri Road, Chikmagalur 577101",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "/rooms" },
  { label: "Experiences", href: "/experiences" },
  { label: "Gallery", href: "/gallery" },
  { label: "Location", href: "/location" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/** ------------------------------------------------------------ rooms */
export interface Room {
  slug: string;
  name: string;
  blurb: string;
  description: string[];
  guests: number;
  bed: string;
  size: string;
  view: string;
  rate: number;
  amenities: string[];
  images: { src: string; alt: string }[];
}

export const rooms: Room[] = [
  {
    slug: "valley-suite",
    name: "Valley Suite",
    blurb: "The corner room, with windows on two sides and the best of the morning light.",
    description: [
      "The largest room on the property, on the upper floor at the western corner. Windows on two sides mean you get the sunrise over the ridge and the light again in the late afternoon.",
      "A separate sitting area with two armchairs, a writing desk by the window, and a private balcony wide enough for breakfast.",
    ],
    guests: 3,
    bed: "King bed, plus a day bed",
    size: "42 m²",
    view: "Valley and ridge",
    rate: 9500,
    amenities: ["Private balcony", "Sitting area", "Ensuite with bathtub", "Tea and coffee", "Wi-Fi", "Heating"],
    images: [
      { src: img.roomValley, alt: "The Valley Suite bedroom" },
      { src: img.interior, alt: "The sitting area" },
      { src: img.valley, alt: "The view from the balcony" },
    ],
  },
  {
    slug: "garden-room",
    name: "Garden Room",
    blurb: "Ground floor, opening straight onto the lawn and the coffee beyond it.",
    description: [
      "A ground-floor room with double doors onto the lawn. Step out and you are among the coffee within about twenty paces.",
      "Quieter than the upper rooms in the evening, and the easiest room to reach if stairs are a problem.",
    ],
    guests: 2,
    bed: "Queen bed",
    size: "30 m²",
    view: "Garden and plantation",
    rate: 7200,
    amenities: ["Garden access", "Step-free entry", "Ensuite shower", "Tea and coffee", "Wi-Fi"],
    images: [
      { src: img.roomGarden, alt: "The Garden Room" },
      { src: img.property, alt: "The lawn outside the Garden Room" },
    ],
  },
  {
    slug: "attic-loft",
    name: "Attic Loft",
    blurb: "Under the eaves, with a skylight over the bed and the whole ridge at dawn.",
    description: [
      "A sloped-ceiling room right at the top of the house, with a skylight directly above the bed. On clear nights you can see a surprising number of stars from it.",
      "Low beams in places — worth knowing if you are tall. The climb is two flights.",
    ],
    guests: 2,
    bed: "Queen bed",
    size: "26 m²",
    view: "Ridge and sky",
    rate: 6800,
    amenities: ["Skylight", "Reading nook", "Ensuite shower", "Tea and coffee", "Wi-Fi"],
    images: [
      { src: img.roomLoft, alt: "The Attic Loft" },
      { src: img.terrace, alt: "The terrace below the loft" },
    ],
  },
  {
    slug: "estate-cottage",
    name: "Estate Cottage",
    blurb: "A separate two-bedroom cottage at the edge of the plantation.",
    description: [
      "A self-contained cottage about two minutes' walk from the main house, with its own veranda and a small kitchen.",
      "The right choice for a family or two couples travelling together, and the only accommodation on the property where a dog is welcome.",
    ],
    guests: 4,
    bed: "One king, one twin room",
    size: "68 m²",
    view: "Plantation",
    rate: 14500,
    amenities: ["Two bedrooms", "Private veranda", "Kitchenette", "Dog friendly", "Wi-Fi", "Heating"],
    images: [
      { src: img.roomCottage, alt: "The Estate Cottage living area" },
      { src: img.property, alt: "The cottage from outside" },
    ],
  },
];

export const findRoom = (slug: string) => rooms.find((r) => r.slug === slug);
export const fromRate = Math.min(...rooms.map((r) => r.rate));

/** ------------------------------------------------------------ why stay */
export const reasons: { title: string; copy: string; icon: IconName }[] = [
  { title: "Surrounded by nature", copy: "Forty acres of working coffee estate, and the ridge behind it.", icon: "trees" },
  { title: "Local cuisine", copy: "Three meals a day, cooked by the family, mostly grown here.", icon: "utensils" },
  { title: "Peaceful rooms", copy: "Six rooms only, no televisions, and the nearest road is far enough.", icon: "moon" },
  { title: "Outdoor experiences", copy: "Guided walks, plantation tours and a viewpoint worth the early start.", icon: "footprints" },
  { title: "Campfire evenings", copy: "Lit most nights when it is dry, down by the lower terrace.", icon: "flame" },
  { title: "Personal hospitality", copy: "You will be looked after by the people whose home this is.", icon: "heart" },
];

/** ------------------------------------------------------------ experiences */
export interface Experience {
  slug: string;
  name: string;
  blurb: string;
  detail: string;
  duration: string;
  when: string;
  included: boolean;
  image: string;
  alt: string;
}

export const experiences: Experience[] = [
  {
    slug: "coffee-plantation-walk",
    name: "Coffee Plantation Walk",
    blurb: "An hour through the estate with whoever is picking that day.",
    detail:
      "You will see the whole cycle depending on the season — flowering in spring, picking from late November. It ends at the drying yard with a cup of what came off it last year.",
    duration: "About 1 hour",
    when: "Daily, 8:00 AM and 4:30 PM",
    included: true,
    image: img.plantation,
    alt: "Coffee beans drying",
  },
  {
    slug: "sunrise-viewpoint",
    name: "Sunrise at the Viewpoint",
    blurb: "A 4:30 AM start and a short drive for the cloud inversion.",
    detail:
      "On a clear morning between October and February the valley below fills with cloud and the ridges come through it. Flask of coffee provided; warm layers are your problem.",
    duration: "About 3 hours",
    when: "On request, weather permitting",
    included: false,
    image: img.sunrise,
    alt: "Mountains above a sea of cloud at sunrise",
  },
  {
    slug: "campfire-evenings",
    name: "Campfire Evenings",
    blurb: "Lit most dry nights on the lower terrace.",
    detail:
      "Nothing organised about it — the fire is lit around seven and people drift down. Blankets are in the basket by the door.",
    duration: "As long as you like",
    when: "Most evenings, weather permitting",
    included: true,
    image: img.campfire,
    alt: "People around a campfire at dusk",
  },
  {
    slug: "local-food-experience",
    name: "Local Food Experience",
    blurb: "Cook a Malnad meal in the estate kitchen.",
    detail:
      "An afternoon in the kitchen learning three or four dishes from this region specifically, then eating them. Vegetarian by default; say if you would rather not.",
    duration: "About 3 hours",
    when: "Tuesdays and Fridays, on request",
    included: false,
    image: img.localFood,
    alt: "A home-cooked meal",
  },
  {
    slug: "nature-walk",
    name: "Guided Nature Walk",
    blurb: "The forest trail behind the estate, at the pace of whoever is slowest.",
    detail:
      "About four kilometres on an easy gradient, with a good chance of hornbills and, if you are quiet, giant squirrels. Boots are better than trainers after rain.",
    duration: "About 2 hours",
    when: "Daily, 7:00 AM",
    included: true,
    image: img.natureWalk,
    alt: "Sunlight through a forest",
  },
  {
    slug: "stargazing",
    name: "Stargazing",
    blurb: "No streetlight within several kilometres.",
    detail:
      "On a moonless clear night the Milky Way is visible from the lawn without any equipment. Deck chairs come out on request.",
    duration: "An hour or two",
    when: "Clear nights",
    included: true,
    image: img.stargazing,
    alt: "A night sky full of stars",
  },
];

export const findExperience = (slug: string) => experiences.find((e) => e.slug === slug);

/** ------------------------------------------------------------ nearby */
export const nearby = [
  { name: "Mullayanagiri Peak", distance: "18 km", time: "45 min drive", copy: "The highest point in Karnataka, and a short walk from the car park.", image: img.valley },
  { name: "Hebbe Falls", distance: "34 km", time: "1 hr 20 drive", copy: "A two-stage waterfall reached by jeep track through the coffee.", image: img.natureWalk },
  { name: "Baba Budangiri", distance: "26 km", time: "1 hr drive", copy: "Ridge road with viewpoints the whole way along.", image: img.meadow },
  { name: "Coffee Museum", distance: "12 km", time: "25 min drive", copy: "Small, well put together, and useful before a plantation walk.", image: img.coffee },
  { name: "Ayyanakere Lake", distance: "30 km", time: "1 hr drive", copy: "Large lake at the foot of the hills, best in the late afternoon.", image: img.terrace },
] as const;

/** ------------------------------------------------------------ gallery */
export interface GalleryImage {
  src: string;
  alt: string;
  category: string;
  /** Portrait tiles, for the masonry rhythm. */
  tall?: boolean;
}

export const gallery: GalleryImage[] = [
  { src: img.property, alt: "The main house at dusk", category: "Property", tall: true },
  { src: img.roomValley, alt: "The Valley Suite", category: "Rooms" },
  { src: img.dining, alt: "Dinner on the terrace", category: "Food" },
  { src: img.valley, alt: "The valley from the ridge", category: "Nature", tall: true },
  { src: img.campfire, alt: "The campfire on the lower terrace", category: "Experiences" },
  { src: img.coffee, alt: "Coffee from the estate", category: "Food" },
  { src: img.roomLoft, alt: "The Attic Loft", category: "Rooms" },
  { src: img.meadow, alt: "Evening light over the meadow", category: "Nature", tall: true },
  { src: img.terrace, alt: "The terrace", category: "Property" },
  { src: img.hiker, alt: "On the forest trail", category: "Experiences" },
  { src: img.natureWalk, alt: "The forest behind the estate", category: "Nature" },
  { src: img.interior, alt: "The sitting room", category: "Property" },
];

export const galleryCategories = ["All", "Rooms", "Property", "Nature", "Food", "Experiences"] as const;

/** ------------------------------------------------------------ reviews */
/**
 * PLACEHOLDER GUEST REVIEWS. These are illustrative, not real guests. Replace
 * them with reviews the property has actually received before launch.
 */
export const reviews = [
  {
    name: "Anjali & Rohit",
    location: "Mumbai, India",
    rating: 5,
    stay: "Valley Suite · 3 nights",
    quote:
      "We came to do nothing and the place made that easy. The balcony in the morning was the whole holiday.",
    avatar: avatar("anjali-rohit"),
  },
  {
    name: "Thomas Behrens",
    location: "Hamburg, Germany",
    rating: 5,
    stay: "Attic Loft · 4 nights",
    quote:
      "The plantation walk with Suresh was the best hour of the trip. He explained the whole process without ever making it a lecture.",
    avatar: avatar("thomas-behrens"),
  },
  {
    name: "Priya Nambiar",
    location: "Bengaluru, India",
    rating: 5,
    stay: "Estate Cottage · 2 nights",
    quote:
      "Took my parents and a dog. All three were happy, which has never happened before on a trip.",
    avatar: avatar("priya-nambiar"),
  },
  {
    name: "Claire Whitfield",
    location: "Bristol, UK",
    rating: 4,
    stay: "Garden Room · 5 nights",
    quote:
      "Food was the surprise — three meals a day, all different, all excellent. Bring warm clothes for the evenings.",
    avatar: avatar("claire-whitfield"),
  },
] as const;

/** ------------------------------------------------------------ faq */
export const faqs = [
  { q: "What time is check-in and check-out?", a: "Check-in from 1:00 PM and check-out by 11:00 AM. If you are arriving late, tell us when you book and we will keep dinner." },
  { q: "Are meals included?", a: "Yes — breakfast, lunch and dinner are included in the room rate, along with tea and coffee through the day. Tell us about any dietary requirements at booking." },
  { q: "Is there parking?", a: "Yes, free on-site parking beside the main house. The last two kilometres are an unpaved estate road, passable in any car outside heavy monsoon." },
  { q: "Are pets allowed?", a: "Dogs are welcome in the Estate Cottage only, by prior arrangement. The main house has resident cats." },
  { q: "Is there Wi-Fi and mobile signal?", a: "Wi-Fi in the main house and the cottage. Mobile signal is patchy — Jio and Airtel work in most spots, others less so." },
  { q: "What is the cancellation policy?", a: "Free cancellation up to seven days before arrival. Inside seven days the first night is charged. This is the policy the booking form applies." },
  { q: "Can you arrange transport?", a: "Yes. We can arrange a car from Chikmagalur town, Hassan or Mangaluru airport for a fixed fare — ask when you book." },
  { q: "When is the best time to visit?", a: "October to March for clear mornings and cool nights. June to September is monsoon: green, dramatic and wet, with some trails closed." },
];
