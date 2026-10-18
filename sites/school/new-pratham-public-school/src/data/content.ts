import type { IconName } from "@/lib/icons";

/**
 * Page copy. The source text is the school's own (source/website-content/pages),
 * lightly copy-edited for spelling and grammar; claims and names are unchanged.
 */

export const pillars: { title: string; copy: string; icon: IconName }[] = [
  {
    title: "Vision",
    copy:
      "Help children realise their potential in a hassle-free academic environment, with opportunities to learn beyond the classroom through hands-on experience, in an atmosphere enriched with human values.",
    icon: "eye",
  },
  {
    title: "Mission",
    copy:
      "Quality, uncompromised, concept-based teaching and learning. A human-centred, value-rich environment. Physical education and adventure activities for ambitious students — and educational service that reaches rural students and lifts socio-economic standards.",
    icon: "compass",
  },
  {
    title: "Learning process",
    copy:
      "Learning happens through experiential and inquisitive methods. Students work with the latest technologies and equip themselves to become their best.",
    icon: "lightbulb",
  },
  {
    title: "Creative lessons",
    copy:
      "NPPS believes in facilitated learning. Every session is supported by an activity plan, and the learning outcome is the key component exercised in the classroom.",
    icon: "palette",
  },
];

export const highlights: { label: string; value: string; icon: IconName }[] = [
  { label: "Affiliated to CBSE, New Delhi", value: "No. 830770", icon: "badgeCheck" },
  { label: "Teaching since", value: "2010", icon: "calendarDays" },
  { label: "Classes offered", value: "Nursery – X", icon: "graduationCap" },
  { label: "Admission policy", value: "No donation", icon: "handCoins" },
];

export const about = {
  intro:
    "Welcome to New Pratham Public School, where education meets inspiration. We are dedicated to empowering students with knowledge, creativity and the values needed to thrive in an ever-changing world — a nurturing environment that encourages academic excellence, personal growth and a lifelong passion for learning.",
  history: [
    "New Pratham Public School was established in 2010 and is managed by the Sree Venkateshwara Group of Companies (IOCL Indiranagar Petrol Bunk) under the aegis of the Sree Venkateshwara Charitable Trust.",
    "The school is affiliated to the Central Board of Secondary Education (CBSE, New Delhi) and offers classes from Nursery to X, with the dedicated vision of the all-round development of every child in an atmosphere of love and respect.",
    "We endeavour to instil self-discipline and develop self-confidence in children, and to establish an environment in which they can learn, play and grow into true and responsible citizens of our country. We impart sterling education, because knowledge is the most powerful tool for creating a better tomorrow.",
  ],
  award:
    "NPPS has been awarded Best CBSE School for three consecutive years for Outstanding All-Round Excellence in Making Education a Priority.",
  aims: {
    title: "Creating future leaders",
    copy: [
      "NPPS aims to provide high-quality education at an affordable cost, with a strict no-donation policy.",
      "In keeping with the rules and regulations laid down by the National Education Policy (NEP 2020), the entire curriculum is mapped to the policy and our teachers are trained and equipped to teach in line with NEP pedagogy.",
      "New features are regularly added to the campus to ensure the holistic development of our students — from two dedicated play areas to a children's gymnasium, an indoor sports centre and well-equipped laboratories.",
    ],
  },
};

export const leadership = [
  {
    slug: "chairman",
    name: "Dr. S. G. Prakash Rao Sathe",
    role: "Chairman",
    message: [
      "It gives me immense pleasure to welcome you as a student of NPPS. We enjoy the proud and unique distinction of being an institution with a rich history, traditions and proud achievements spanning over a decade.",
    ],
    bio: "A philanthropist known for his exemplary work towards promoting a better society. A man of diverse talents, his vision is the reason behind the successful approach of the Sree Venkateshwara Group and the force behind a flourishing business enterprise. He has been honoured with several national-level awards, including the Bharat Ratna Award and the Doctorate Award.",
  },
  {
    slug: "trustee",
    name: "Dr. Neetha Sathe",
    role: "Managing Trustee",
    message: [
      "Dr. Neetha Sathe inspires her students to be nothing but the best and motivates them to develop holistically. She encourages and cultivates a competitive spirit in her teachers and students, to choose a path and move in the right direction to achieve success.",
    ],
    bio: "A young educationalist and energetic entrepreneur who seeks to foster young talent and nurture women's empowerment. She has been bestowed with the Doctorate Award by Rajamatha Her Excellency Pramoda Devi of Mysore, and the Times 40 Under 40 Achievers award was conferred on her by Shri Anupam Kher.",
  },
  {
    slug: "principal",
    name: "Shri Jeevarathnam Reddy",
    role: "Principal",
    message: [
      "Our faculty is dedicated to designing and executing a unique blend of world-class curriculum with a distinctive amalgamation of contemporary teaching methodologies — and an equal focus on intellectual, physical and personality development that evolves our Prathamites into future leaders and achievers.",
    ],
    bio: "",
  },
] as const;

export type Facility = { title: string; copy: string; icon: IconName; tag?: string };

export const facilities: Facility[] = [
  {
    title: "NPPS Multi-Sports Activity Centre",
    copy: "A state-of-the-art playground with a vast play area, where students train for a range of field sports.",
    icon: "trophy",
    tag: "Playground 1",
  },
  {
    title: "NPPS Playzone",
    copy: "A well-defined, futuristic play area with exceptional playing equipment, designed to boost physical development in the younger years.",
    icon: "ferrisWheel",
    tag: "Playground 2",
  },
  {
    title: "Children's gymnasium",
    copy: "Age-appropriate fitness equipment that builds strength, balance and coordination.",
    icon: "dumbbell",
  },
  {
    title: "Cricket bowling machine",
    copy: "Professional practice facilities, as we aim at bestowing professional training upon our future athletes.",
    icon: "target",
  },
  {
    title: "Indoor sports activity centre",
    copy: "Games and training that carry on whatever the weather.",
    icon: "activity",
  },
  {
    title: "Mini pool",
    copy: "A supervised pool for water confidence and early swimming skills.",
    icon: "waves",
  },
  {
    title: "Air-conditioned classrooms",
    copy: "Comfortable, well-lit classrooms where every learning session is backed by an activity plan.",
    icon: "airVent",
  },
  {
    title: "Well-equipped laboratories",
    copy: "Hands-on science and computer labs, in keeping with the school's experiential approach to learning.",
    icon: "flaskConical",
  },
];

export const admissions = {
  intro:
    "Admissions are open for Nursery to Class X. NPPS follows a no-donation policy and keeps fees affordable — speak to the school office, send a WhatsApp message, or use the school's admission enquiry app.",
  steps: [
    {
      title: "Enquire",
      copy: "Call the office, message us on WhatsApp or fill in the enquiry form below. Tell us the class you are applying for and the academic year.",
    },
    {
      title: "Visit the campus",
      copy: "Come and see the classrooms, the two play areas and the labs, and meet the principal. Visits are during school hours, Monday to Saturday.",
    },
    {
      title: "Submit documents",
      copy: "The office will give you the application form and the list of documents required for the class you are applying for.",
    },
    {
      title: "Confirmation",
      copy: "Once the application is reviewed, the office confirms the seat and explains the fee schedule — with no donation of any kind.",
    },
  ],
  faqs: [
    {
      q: "Which classes does the school offer?",
      a: "Nursery to Class X, following the CBSE curriculum (Affiliation No. 830770).",
    },
    {
      q: "Is there a donation or capitation fee?",
      a: "No. NPPS has a strict no-donation policy and aims to provide high-quality education at an affordable cost.",
    },
    {
      q: "What are the school hours?",
      a: "Monday to Saturday, 7:30 AM to 3:30 PM. The school is closed on Sundays.",
    },
    {
      q: "How is the curriculum taught?",
      a: "The curriculum is mapped to the National Education Policy (NEP 2020). Teachers are trained in NEP pedagogy and every learning session is supported with an activity plan.",
    },
    {
      q: "Where can I read the CBSE mandatory disclosure?",
      a: "The mandatory public disclosure document is published on this website under Mandatory Disclosure, and is available as a PDF.",
    },
  ],
};

export const achievements = [
  {
    slug: "pragmatic-women-leaders-award",
    title: "Pragmatic Women Leaders in Education award",
    image: "ui1v3ned28",
    copy: "Our Managing Trustee was honoured with the Pragmatic Women Leaders in Education award in recognition of her visionary leadership, practical approach to problem-solving and unwavering commitment to academic excellence. The accolade celebrates her contribution to shaping a progressive learning environment, empowering educators and fostering holistic development among students.",
  },
  {
    slug: "educonnectln-excellent-rating",
    title: "“Excellent” rating by EduconnectLN",
    image: "8p0388wg68",
    copy: "The school has been conferred an “Excellent” rating by EduconnectLN, standing out among 6,775 schools across Bengaluru. The evaluation assessed schools on teaching–learning practices, student engagement, infrastructure, innovation and overall institutional effectiveness.",
  },
  {
    slug: "victory-quantum-inter-school-sports-meet",
    title: "Victory Quantum — inter-school sports meet",
    image: "hjvlqr5rt",
    copy: "Our school proudly hosted the inter-school sports meet, bringing together young athletes from various schools to celebrate sportsmanship, teamwork and healthy competition. Our kho-kho girls' team delivered an outstanding performance and emerged as the winners.",
  },
  {
    slug: "abacus-competition",
    title: "Abacus — a celebration of mental-math excellence",
    image: "g8w3t5il4q",
    copy: "An inter-school abacus competition hosted at Adharsh International School, Hoskote, brought together young maths enthusiasts to showcase remarkable mental-calculation skills, with students demonstrating exceptional speed, accuracy and concentration.",
  },
  {
    slug: "india-k12-awards-2025",
    title: "India K-12 Awards (IKA) 2025",
    image: "skym7891or",
    copy: "We are proud to have been honoured with the K-12 Award, a recognition of our commitment to academic excellence and holistic education — and of the collective effort of our educators, students and parent community.",
  },
  {
    slug: "the-power-play",
    title: "The Power Play — inter-school competition",
    image: "9evouos6vg",
    copy: "Our kho-kho girls' team delivered an outstanding performance at the inter-school sports competition held at Christ International School, Bengaluru. Displaying exceptional teamwork, agility and sportsmanship, the team emerged champions, securing first place.",
  },
] as const;

/**
 * Notices and circulars. The previous site had these sections but nothing
 * published in them, so this starts empty and the page says so honestly.
 * Add entries here (newest first) and the Notice board picks them up.
 */
export type Notice = { date: string; title: string; copy: string; href?: string; kind: "notice" | "circular" };
export const notices: Notice[] = [];
