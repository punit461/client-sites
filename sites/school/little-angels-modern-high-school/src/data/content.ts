import { img } from "@/lib/asset";
import type { IconName } from "@/lib/icons";

/**
 * Everything the pages say, as data. The wording comes from the school's own
 * site (lamhs.in), tightened for the web — nothing here is invented. Where the
 * old site cut a story off behind "Show more", the summary stops where the
 * school's text did; ask the school for the full write-ups before launch.
 */

export const stats = [
  { value: "1981", label: "Founded by a family of educators" },
  { value: "N – 10", label: "Montessori and Nursery to Class 10" },
  { value: "4,000+", label: "Books in our library" },
  { value: "1 : 1", label: "Shadow teachers for children who need them" },
] as const;

export const story = {
  founders: "Wing Cdr V K S Rao, his wife Lakshmi and their daughter Prema",
  paragraphs: [
    "Little Angels Modern High School was founded in 1981 by Wing Cdr V K S Rao, a decorated Air Force officer, together with his wife Lakshmi and their daughter Prema — all three passionate educators.",
    "Their dream was a full school for middle- and lower-income families. In 1994 that dream became a reality, and the school has grown with the neighbourhood ever since.",
  ],
  mission:
    "We are a not-for-profit school offering quality education infused with Indian values, from Montessori through Secondary (Class 10). We don't just teach — we foster an inclusive environment that nurtures curious minds, critical thinkers and well-rounded individuals, so that students of all abilities thrive.",
};

export const timeline = [
  { year: "1981", title: "A family of educators begins", copy: "Wing Cdr V K S Rao, Lakshmi and Prema start Little Angels." },
  { year: "1994", title: "A full school", copy: "The dream of a complete school for middle- and lower-income families comes true." },
  { year: "1990s →", title: "Generations of Little Angels", copy: "Alumni memories from the 1990s onwards now fill our Museum of Little Angels." },
  { year: "Today", title: "Montessori to Class 10", copy: "An inclusive, not-for-profit school with labs, a 4,000-book library and a green campus." },
] as const;

export type Feature = { icon: IconName; title: string; copy: string };

export const differentiators: Feature[] = [
  {
    icon: "handHeart",
    title: "Inclusive & caring",
    copy: "Children with autism and learning disabilities are welcomed, with one-on-one shadow teachers and a dedicated special educator.",
  },
  {
    icon: "flower",
    title: "Montessori magic",
    copy: "Our little ones explore, create and grow at their own pace.",
  },
  {
    icon: "school",
    title: "Great spaces",
    copy: "Spacious classrooms, labs, a library, and a large, green campus with a playground.",
  },
  {
    icon: "lightbulb",
    title: "Beyond books",
    copy: "We prioritise extracurriculars, creativity and a questioning spirit.",
  },
  {
    icon: "sparkles",
    title: "Holistic learning",
    copy: "From Yoga to personality-development workshops, we believe in a well-rounded education.",
  },
];

export const stages = [
  {
    name: "Montessori & Nursery",
    range: "Early years",
    copy: "Little ones learn by doing — celebrating festivals, gardening together and joining hands-on science workshops that spark wonder.",
    image: img.montessori,
  },
  {
    name: "Primary",
    range: "Classes 1 – 5",
    copy: "Drama-integrated lessons, AV classes and project work turn the basics into adventures, with a low student-teacher ratio so no child gets lost.",
    image: img.newsInEducation,
  },
  {
    name: "Middle & Secondary",
    range: "Classes 6 – 10",
    copy: "Labs, debates, exhibitions and the Interact Club build the confidence and critical thinking students carry into Class 10 and beyond.",
    image: img.scienceFair,
  },
] as const;

export const academics: (Feature & { image: string })[] = [
  {
    icon: "users",
    title: "Low student-teacher ratio",
    copy: "Innovative teaching combined with a low student-teacher ratio means every child gets personal mentorship and a front-row seat to discovery. The classroom becomes a supportive family where each child's potential is recognised and nurtured every day.",
    image: img.activityHall,
  },
  {
    icon: "lightbulb",
    title: "Innovative teaching methods",
    copy: "Drama-integrated lessons and AV classes turn learning into an immersive experience. Project-based learning lets students solve real-world challenges, building the critical thinking and confidence they need for the future.",
    image: img.projectExhibition,
  },
  {
    icon: "newspaper",
    title: "News in education",
    copy: "Our assemblies turn global headlines into a canvas for discussion, igniting curiosity that turns world news into personal inspiration — creative thinkers who don't just study the world but reimagine their place in it.",
    image: img.newsInEducation,
  },
  {
    icon: "palette",
    title: "Art & culture",
    copy: "Rooted in tradition, we connect students with their heritage so they grow into well-rounded individuals. Cultural exploration here extends beyond the classroom, shaping character and identity alongside academic success.",
    image: img.bharatanatyam,
  },
  {
    icon: "trophy",
    title: "Co-curricular & extra-curricular",
    copy: "The Annual Science Exhibition, Spelling Bees, Creative Writing competitions, Art Showcases and Inter-House Debates let students step out of the classroom and onto the stage — building the grit and confidence needed for life beyond school.",
    image: img.scienceFair,
  },
  {
    icon: "heart",
    title: "Interact Club",
    copy: "Our Interact Club is an incubator for compassionate leaders. Through community service and collaborative outreach, students move beyond themselves to address real-world challenges, developing empathy and civic responsibility.",
    image: img.interactTeam,
  },
];

export const facilities: (Feature & { image: string; highlight?: string })[] = [
  {
    icon: "volleyball",
    title: "Playground",
    highlight: "Cluster-level winners",
    copy: "More than just a field — a training ground for champions. Over the last three years it has produced cluster-level winners in Volleyball and Throwball, proof that discipline and sportsmanship deliver real results.",
    image: img.houseMarch,
  },
  {
    icon: "flask",
    title: "Science labs",
    copy: "Our science labs are where students move from theory to discovery. We encourage young innovators to push the boundaries of curiosity and turn bold ideas into scientific reality.",
    image: img.scienceFair,
  },
  {
    icon: "book",
    title: "Library",
    highlight: "4,000+ books",
    copy: "With over 4,000 books lining its shelves, our library is the heart of the campus. Reading is an essential life skill here, and every student has access to resources that fuel imagination and academic growth.",
    image: img.newsInEducation,
  },
  {
    icon: "monitor",
    title: "Computer lab",
    copy: "Our computer lab moves beyond the screen, turning students from passive users into active creators through real-world tech challenges — building the practical AI fluency and problem-solving a digital world asks for.",
    image: img.activityHall,
  },
];

export type SchoolEvent = {
  title: string;
  date: string;
  image: string;
  summary: string;
};

export const events: SchoolEvent[] = [
  {
    title: "Grandparents' Day",
    date: "August 2026",
    image: img.grandparentsDay,
    summary:
      "Grandparents are the pillars of the family — they cared for our parents and now give us immense love. We celebrated them with our students, and they guessed every antique object right.",
  },
  {
    title: "Independence Day",
    date: "15 August 2026",
    image: img.independenceDay,
    summary:
      "India celebrated its 80th Independence Day, and our national song Vande Mataram turned 150. We passed the legacy on to the next generation of responsible citizens.",
  },
  {
    title: "Investiture Ceremony 2026–27",
    date: "July 2026",
    image: img.investiture,
    summary:
      "Student leaders are chosen democratically by the students themselves — the first lesson in leadership, accountability and pride in the school community.",
  },
  {
    title: "International Yoga Day",
    date: "21 June 2026",
    image: img.yogaDay,
    summary:
      "The theme of the 12th International Yoga Day was Yoga for Healthy Ageing. Yogis of all ages joined in, trained by our Yoga Guru Shweta Naveen.",
  },
  {
    title: "World Environment Day",
    date: "June 2026",
    image: img.environmentDay,
    summary:
      "Students made eco-friendly posters, caps and teddy bears, ran a hugely successful e-waste collection drive and took the oath to protect the environment.",
  },
];

export const traditions: Feature[] = [
  { icon: "users", title: "Investiture Ceremony", copy: "Students choose their leaders — the first lesson of democracy and responsibility." },
  { icon: "graduation", title: "Class 10 Graduation Day", copy: "A turning point: new subjects, new choices and a chance to write their own future." },
  { icon: "sparkles", title: "School Fun Fest", copy: "Face painting, music and public speaking — talents that only show up when learning is fun." },
  { icon: "sprout", title: "Interact Club service", copy: "Community service and outreach that build empathy and civic responsibility." },
  { icon: "palette", title: "Cultural programmes", copy: "Classical dance, music and drama on stage, rooted in Indian tradition." },
  { icon: "trophy", title: "Quizzes & spelling bees", copy: "Quizzes, spelling bees, creative writing and inter-house debates all year round." },
];

export type GalleryPhoto = { src: string; alt: string; caption: string; tall?: boolean };

export const gallery: GalleryPhoto[] = [
  { src: img.bharatanatyam, alt: "Four students in Bharatanatyam costume posing on stage", caption: "Classical dance on stage" },
  { src: img.christmas, alt: "Students in red jumpers beside a decorated Christmas tree", caption: "Christmas celebrations", tall: true },
  { src: img.environmentOath, alt: "Students raising their right hands to take an oath", caption: "World Environment Day oath" },
  { src: img.culturalProgramme, alt: "Students performing a cultural programme in front of a temple backdrop", caption: "Cultural programme" },
  { src: img.scienceFair, alt: "A visitor examines a student model of a hydro-electric power plant", caption: "Science exhibition", tall: true },
  { src: img.houseMarch, alt: "Students in house colours line up outdoors with house banners", caption: "House march" },
  { src: img.interactShowcase, alt: "Interact Club members presenting their projects", caption: "Interact Club showcase" },
  { src: img.artExhibition, alt: "Students in traditional dress present an art exhibit to a teacher", caption: "Art & culture exhibition", tall: true },
  { src: img.projectExhibition, alt: "Children and grandparents look at student projects on a table", caption: "Project day with families" },
  { src: img.communityOath, alt: "Parents, grandparents and teachers taking an oath together", caption: "Families join the oath" },
  { src: img.interactStall, alt: "The Interact Club display with plants and posters", caption: "Interact Club stall" },
  { src: img.montessori, alt: "Montessori children sitting with their teacher in a decorated classroom", caption: "Montessori classroom", tall: true },
];

export const videos = [
  { id: "DbzApBxf1ZY", title: "Parents speak about LAMHS", length: "2:44" },
  { id: "ucEWKrPnXyM", title: "Courage Jar — brave kids", length: "1:18" },
  { id: "8vmBX_XLJ6k", title: "Seed-ball plantation drive", length: "0:31" },
] as const;

export const admissionSteps = [
  { title: "Enquire", copy: "Call, WhatsApp or send the enquiry form below with your child's details." },
  { title: "Visit the campus", copy: "Meet our teachers and see the classrooms, labs, library and playground." },
  { title: "Register", copy: "Fill in the online registration form and attach the application." },
  { title: "Welcome to Little Angels", copy: "We confirm the seat and share everything you need for the first day." },
] as const;

export const classOptions = [
  "Nursery / Montessori",
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
] as const;

export const faq = [
  {
    q: "Which classes does Little Angels offer?",
    a: "We teach from Montessori and Nursery through to Secondary — Class 10.",
  },
  {
    q: "Do you support children with special needs?",
    a: "Yes. Children with autism and learning disabilities are welcomed, with one-on-one shadow teachers and a dedicated special educator.",
  },
  {
    q: "What are the school timings?",
    a: "Monday to Friday, 9:00 am to 4:00 pm, and Saturday 9:00 am to 1:00 pm. The school is closed on Sundays.",
  },
  {
    q: "Is admission open now?",
    a: "Yes — admissions for 2026–27 are open from Nursery to Class 10. Call us, message us on WhatsApp or fill in the registration form.",
  },
  {
    q: "Is the school recognised?",
    a: "Little Angels is an English-medium school recognised by the Government of Karnataka, run on a not-for-profit basis.",
  },
] as const;
