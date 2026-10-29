// Site-wide content, migrated from filipjo.com/portfolio.

export type SocialLink = {
  label: string;
  href: string;
};

export type Job = {
  company: string;
  title: string;
  period?: string;
};

const experience: Job[] = [
  { company: "ecoplanet", title: "Senior Product Designer" },
  { company: "Peers", title: "Senior Product Designer UX/UI" },
];

export const site = {
  name: "Filip",
  role: "Senior Product Designer",
  url: "https://filipjo.com/portfolio-1/", // TODO at launch: /portfolio/
  email: "mail@filipjo.com",
  availability: "Open to senior product design roles",
  intro:
    "A hands-on Senior Product Designer with 6 years of experience in UX & UI design.",
  about: [
    "As a product designer, I solve customers' problems together with engineering.",
    "I'm a builder at heart, prototyping daily and opening PRs with my LLM and repo. Pairing my experience with my business degree creates a holistic approach to product design – I'm here for the success of the product, not just a feature.",
    "I've always been part of agile, international environments – SaaS, agency and e-commerce.",
  ],
  experience,
  skills: [
    "User research & interviews",
    "Concepts & user flows",
    "Prototyping in code",
    "UI & component design",
    "Shipping with engineering",
    "Figma",
    "Claude Code",
    "Linear",
  ],
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/filipjo/" },
  ] satisfies SocialLink[],
};
