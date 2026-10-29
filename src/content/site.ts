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
  name: "Filip Jo Friemann",
  role: "Senior Product Designer",
  location: "Berlin",
  url: "https://filipjo.com/portfolio-1/", // TODO at launch: /portfolio/
  email: "mail@filipjo.com",
  // Plain-text summary for search results and link previews.
  intro:
    "A hands-on Senior Product Designer with 6 years of experience in UX & UI design, based in Berlin.",
  // The about-me text from the original portfolio, rendered as one flowing
  // paragraph (the strings are joined with spaces). **text** is bold.
  greeting: "Hi, i’m Filip,",
  about: [
    "**a hands-on Senior Product Designer with 6 years of experience in UX & UI design.**",
    "As a Product designer I solve the customers problems together with engineering.",
    "**I’m a builder at heart, prototyping daily and opening PRs with my LLM + repo.** Pairing my experience with my business degree creates a holistic approach to product design – i’m here for the success of the product, not just a feature. Always been part of agile, international environments – SaaS, agency, e-commmerce.",
  ],
  workIntro: "Here is a quick glimpse in a handful of projects.",
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
