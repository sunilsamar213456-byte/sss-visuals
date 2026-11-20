import {
  Camera,
  Clapperboard,
  Film,
  Globe2,
  Headphones,
  Layers,
  Megaphone,
  ShieldCheck,
  Wand2,
  type LucideIcon,
} from "lucide-react";

/* ---------- Media helpers ---------- */

export const pexels = (id: number, w: number, h: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const heroVideo = {
  src: "https://videos.pexels.com/video-files/36604690/15520309_1920_1080_25fps.mp4",
  poster:
    "https://images.pexels.com/videos/36604690/pexels-photo-36604690.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
};

/* ---------- Navigation ---------- */

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

/* ---------- Social proof ---------- */

export const clients = ["VIDEO EDITING", "BRAND FILMS", "PRODUCT VISUALS", "MOTION DESIGN", "AI VIDEO", "SOCIAL CONTENT", "COLOR GRADING", "STORYTELLING"];

export const stats = [
  { value: 1, suffix: " team", decimals: 0, label: "One creative partner" },
  { value: 3, suffix: " steps", decimals: 0, label: "Brief · Create · Deliver" },
  { value: 2, suffix: " formats", decimals: 0, label: "Landscape and vertical" },
  { value: 1, suffix: " goal", decimals: 0, label: "Make your story stand out" },
];

/* ---------- Services ---------- */

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
}

export const services: Service[] = [
  {
    icon: Film,
    title: "Brand Films",
    description:
      "Narrative films that tell your story with intent, from concept and script to a final cut that earns trust in the first few seconds.",
    tags: ["Storytelling", "Direction", "4K"],
  },
  {
    icon: Megaphone,
    title: "Commercials & Ads",
    description:
      "Scroll-stopping ads cut natively for Reels, Shorts, YouTube and connected TV, engineered around your conversion goals.",
    tags: ["Paid social", "CTV", "Cutdowns"],
  },
  {
    icon: Camera,
    title: "Product & Photography",
    description:
      "Studio and lifestyle imagery with precise lighting, color-accurate retouching and a consistent visual language across channels.",
    tags: ["Product", "Editorial", "Retouch"],
  },
  {
    icon: Wand2,
    title: "Motion Graphics & 3D",
    description:
      "Logo reveals, explainers and photoreal 3D renders that make abstract products tangible and memorable.",
    tags: ["Motion", "CGI", "Explainers"],
  },
  {
    icon: Clapperboard,
    title: "Post & Color",
    description:
      "Editing, color grading, sound design and HDR mastering, so every frame looks deliberate on any screen.",
    tags: ["Grading", "Sound", "HDR"],
  },
  {
    icon: Globe2,
    title: "Global Delivery",
    description:
      "Remote-first production with multi-currency billing, NDA-first workflows and subtitles in 12+ languages.",
    tags: ["Subtitles", "Localization", "NDA"],
  },
];

/* ---------- Portfolio ---------- */

export type WorkCategory = "All" | "Films" | "Product" | "Photography" | "Architecture" | "Motion";

export interface WorkItem {
  id: number;
  title: string;
  client: string;
  category: Exclude<WorkCategory, "All">;
  year: string;
  image: string;
  alt: string;
  summary: string;
  result: string;
}

export const workCategories: WorkCategory[] = [
  "All",
  "Films",
  "Product",
  "Photography",
  "Architecture",
  "Motion",
];

export const portfolio: WorkItem[] = [
  {
    id: 1,
    title: "Automotive Campaign Concept",
    client: "SSS VISUALS · Concept project",
    category: "Films",
    year: "2026",
    image: pexels(23384400, 1200, 900),
    alt: "Cameraman with a professional cinema camera, backlit in a moody set",
    summary: "A cinematic launch film for a global EV brand.",
    result: "Concept project — a cinematic launch-film direction for an automotive brand.",
  },
  {
    id: 2,
    title: "Action Brand Concept",
    client: "SSS VISUALS · Concept project",
    category: "Films",
    year: "2025",
    image: pexels(23384407, 1200, 900),
    alt: "Film crew filming an action scene in a dimly lit warehouse",
    summary: "High-energy action spot produced across two continents.",
    result: "Concept project — fast-paced editing and platform-ready campaign cutdowns.",
  },
  {
    id: 3,
    title: "Documentary Visual Concept",
    client: "SSS VISUALS · Concept project",
    category: "Films",
    year: "2025",
    image: pexels(13811053, 1200, 900),
    alt: "Filmmaker operating a camcorder during an indoor shoot",
    summary: "An editorial documentary series for a global sustainability report.",
    result: "Concept project — documentary-style storytelling with a clear visual narrative.",
  },
  {
    id: 4,
    title: "Luxury Product Concept",
    client: "SSS VISUALS · Concept project",
    category: "Product",
    year: "2025",
    image: pexels(258244, 1200, 900),
    alt: "Black and white close-up of a designer perfume bottle with reflections",
    summary: "Sculpted product photography with dramatic editorial lighting.",
    result: "Concept project — premium product lighting, retouching and art direction.",
  },
  {
    id: 5,
    title: "Skincare Campaign Concept",
    client: "SSS VISUALS · Concept project",
    category: "Product",
    year: "2026",
    image: pexels(7814535, 1200, 900),
    alt: "Sleek skincare bottle surrounded by flowers and water droplets",
    summary: "Launch film and still-life system for a botanical skincare line.",
    result: "Concept project — clean skincare visuals designed for a product launch.",
  },
  {
    id: 6,
    title: "Fashion Editorial Concept",
    client: "SSS VISUALS · Concept project",
    category: "Photography",
    year: "2026",
    image: pexels(13660183, 1200, 900),
    alt: "Model in a black outfit posing with dramatic studio lighting",
    summary: "Editorial portraits art-directed for a Paris-based fashion label.",
    result: "Concept project — editorial styling and a cohesive fashion campaign look.",
  },
  {
    id: 7,
    title: "Property Film Concept",
    client: "SSS VISUALS · Concept project",
    category: "Architecture",
    year: "2025",
    image: pexels(31817164, 1200, 900),
    alt: "Spacious modern villa interior with large windows overlooking the ocean",
    summary: "A slow, sweeping property film for an oceanfront residence.",
    result: "Concept project — cinematic property visuals with an emphasis on space and atmosphere.",
  },
  {
    id: 8,
    title: "Motion Identity Concept",
    client: "SSS VISUALS · Concept project",
    category: "Motion",
    year: "2026",
    image: pexels(33797643, 1200, 900),
    alt: "Abstract 3D render with vibrant purple and pink curves",
    summary: "A flexible motion identity system for a fintech product launch.",
    result: "Concept project — a flexible motion identity for digital touchpoints.",
  },
  {
    id: 9,
    title: "3D Product Concept",
    client: "SSS VISUALS · Concept project",
    category: "Motion",
    year: "2026",
    image: pexels(29355999, 1200, 900),
    alt: "Abstract neon gradient with 3D shapes and glowing curves",
    summary: "Photoreal 3D hero visuals for a global smartphone keynote.",
    result: "Concept project — a polished 3D product launch visual.",
  },
];

/* ---------- Benefits ---------- */

export const benefits: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Layers,
    title: "Fixed scope, transparent pricing",
    description:
      "Know your total before we start. Milestone-based invoicing in USD, EUR or GBP, with no surprise line items.",
  },
  {
    icon: Globe2,
    title: "Built for global time zones",
    description:
      "Overlap with London, New York, Dubai or Singapore. Async review tools and a weekly sync keep momentum high.",
  },
  {
    icon: ShieldCheck,
    title: "You own every frame",
    description:
      "Full usage rights transfer on final payment. Raw footage and project files are available on request.",
  },
  {
    icon: Headphones,
    title: "Localized for every market",
    description:
      "Native-speaker subtitles, voiceovers and on-screen text in 12+ languages, ready for every channel.",
  },
];

export const crewRoles = [
  "Creative director",
  "Director of photography",
  "Producer",
  "Colorist & sound designer",
];

export const processSteps = [
  {
    step: "01",
    title: "Discovery call",
    description:
      "A 30-minute call to understand your goals, audience and constraints. Proposal within 48 hours.",
  },
  {
    step: "02",
    title: "Concept & treatment",
    description:
      "Moodboard, script or storyboard. You approve the creative direction before we shoot or animate.",
  },
  {
    step: "03",
    title: "Production",
    description:
      "Shoot, design or 3D build, led by a dedicated producer who protects your timeline and budget.",
  },
  {
    step: "04",
    title: "Post & finishing",
    description:
      "Edit, color grade, sound design and subtitles, with two structured review rounds.",
  },
  {
    step: "05",
    title: "Delivery",
    description:
      "Platform-ready masters and cut-downs, with usage rights transferred on final payment.",
  },
];

/* ---------- Testimonials ---------- */

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  metric: string;
  metricLabel: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: "Every project starts with a clear brief, agreed deliverables and a realistic timeline. You stay informed at each milestone.",
    name: "Clear communication",
    role: "Our working principle",
    company: "The SSS VISUALS approach",
    metric: "01",
    metricLabel: "A dedicated point of contact",
    avatar: pexels(40035691, 160, 160),
  },
  {
    quote: "We shape the edit around your audience and platform, then refine the details through structured feedback rounds.",
    name: "Purposeful editing",
    role: "Our creative process",
    company: "The SSS VISUALS approach",
    metric: "02",
    metricLabel: "Feedback-led refinement",
    avatar: pexels(28442318, 160, 160),
  },
  {
    quote: "Final exports are prepared for the placements you need, with formats and handover details agreed before delivery.",
    name: "Ready-to-publish delivery",
    role: "Our delivery standard",
    company: "The SSS VISUALS approach",
    metric: "03",
    metricLabel: "Platform-ready deliverables",
    avatar: pexels(40322798, 160, 160),
  },
];

/* ---------- Pricing ---------- */

export interface PricingTier {
  name: string;
  tagline: string;
  price: { project: number; retainer: number } | null;
  features: string[];
  cta: string;
  highlighted: boolean;
  badge?: string;
}

export const pricingTiers: PricingTier[] = [
  {
    name: "Launch",
    tagline: "Your first hero piece, done right.",
    price: null,
    features: [
      "1 brand teaser up to 60 seconds",
      "Half-day shoot or full motion design build",
      "Color grade and sound mix",
      "3 platform cut-downs (9:16, 1:1, 16:9)",
      "2 structured review rounds",
      "Delivered in 10 business days",
    ],
    cta: "Start with Launch",
    highlighted: false,
  },
  {
    name: "Growth",
    tagline: "A full brand film and campaign system.",
    price: null,
    features: [
      "Brand film up to 2 minutes",
      "Up to 2 shoot days with a full crew",
      "Motion graphics and title package",
      "Subtitles in 3 languages",
      "Dedicated producer and weekly check-ins",
      "Delivered in 3 weeks",
    ],
    cta: "Book a Growth project",
    highlighted: true,
    badge: "Most booked",
  },
  {
    name: "Studio Partner",
    tagline: "An embedded creative team for global brands.",
    price: null,
    features: [
      "Monthly content retainer with custom scope",
      "Dedicated director and editor",
      "48-hour priority turnaround",
      "Unlimited revisions within scope",
      "Quarterly strategy sessions",
      "NET-30 invoicing and multi-currency billing",
    ],
    cta: "Talk to our team",
    highlighted: false,
  },
];

/* ---------- FAQ ---------- */

export const faqs = [
  {
    question: "Do you work with clients outside your home country?",
    answer:
      "Yes. Most of our projects are fully remote. We sign contracts and NDAs in English, invoice in USD, EUR or GBP, and coordinate across time zones with clear milestones.",
  },
  {
    question: "How do we get started?",
    answer:
      "Book a 30-minute discovery call or send a brief through the form. Within 48 hours you receive a fixed-scope proposal with timeline, deliverables and pricing.",
  },
  {
    question: "What is your typical turnaround?",
    answer:
      "Social and short-form content usually takes 7 to 10 business days. Brand films, including pre-production and shoot days, typically take three to six weeks depending on scope.",
  },
  {
    question: "Who owns the final files and usage rights?",
    answer:
      "You do. Full usage rights transfer to you on final payment. Raw footage and project files can be provided for an agreed fee.",
  },
  {
    question: "Can you handle travel and on-location shoots?",
    answer:
      "Yes. We produce on location across multiple countries. Travel, crew, permits and location costs are itemized in your proposal, so there are no hidden extras.",
  },
  {
    question: "Do you deliver subtitles and voiceovers in other languages?",
    answer:
      "Yes. We deliver subtitles, dubbing and localized on-screen text in 12+ languages through trusted native-speaker partners, with full quality checks.",
  },
];

/* ---------- Footer ---------- */

export const footerLinks = {
  services: [
    { label: "Brand films", href: "#services" },
    { label: "Commercials & ads", href: "#services" },
    { label: "Product photography", href: "#services" },
    { label: "Motion & 3D", href: "#services" },
    { label: "Post-production & color", href: "#services" },
  ],
  studio: [
    { label: "Selected work", href: "#work" },
    { label: "How it works", href: "#process" },
    { label: "Client stories", href: "#testimonials" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "Start a project", href: "#contact" },
  ],
};
