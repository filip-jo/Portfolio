// Site-wide content. Everything marked TODO is a placeholder to be replaced
// with the real copy from filipjo.com/portfolio.

export type SocialLink = {
  label: string;
  href: string;
};

export const site = {
  name: "Filip", // TODO: full name
  role: "Senior Product Designer",
  location: "TODO: City, Country",
  url: "https://www.filipjo.com/portfolio/",
  email: "TODO@filipjo.com",
  availability: "Open to senior product design roles",
  intro:
    "TODO: One or two sentences on who you are, the kind of products you design, and the impact you're known for.",
  about: [
    "TODO: Paragraph about your background and how you got into product design.",
    "TODO: Paragraph about how you work — collaboration with PM and engineering, research, systems thinking.",
    "TODO: Paragraph about what you're looking for next.",
  ],
  experience: [
    { company: "TODO: Company", title: "TODO: Title", period: "20XX – Present" },
    { company: "TODO: Company", title: "TODO: Title", period: "20XX – 20XX" },
  ],
  skills: [
    "Product strategy",
    "Interaction design",
    "Design systems",
    "Prototyping",
    "User research",
  ], // TODO: confirm
  social: [
    { label: "LinkedIn", href: "#" }, // TODO
    { label: "Resume", href: "#" }, // TODO: e.g. /resume.pdf
  ] satisfies SocialLink[],
};
