// Case studies. The array order is the order they appear in the sidebar and
// on the overview page. All entries are placeholders until the real content
// from filipjo.com/portfolio is migrated.

export type Outcome = {
  value: string;
  label: string;
};

export type Section = {
  heading: string;
  body: string[];
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  role: string;
  summary: string;
  tags: string[];
  /** Placeholder cover colour until real imagery is added. */
  accent: string;
  outcomes: Outcome[];
  sections: Section[];
};

const placeholderSections: Section[] = [
  { heading: "Context", body: ["TODO: The product, the team, and the problem you were brought in to solve."] },
  { heading: "My role", body: ["TODO: What you owned, who you worked with, and the scope of your decisions."] },
  { heading: "Process", body: ["TODO: Research, explorations, and the key decisions and tradeoffs you made."] },
  { heading: "Outcome", body: ["TODO: What shipped and what changed as a result."] },
];

export const projects: Project[] = [
  {
    slug: "project-one",
    title: "TODO: Project one",
    client: "TODO: Company",
    year: "20XX",
    role: "Lead Product Designer",
    summary: "TODO: One-line summary of the problem and the result.",
    tags: ["TODO", "Tags"],
    accent: "oklch(0.72 0.12 250)",
    outcomes: [
      { value: "—", label: "TODO: metric" },
      { value: "—", label: "TODO: metric" },
    ],
    sections: placeholderSections,
  },
  {
    slug: "project-two",
    title: "TODO: Project two",
    client: "TODO: Company",
    year: "20XX",
    role: "Senior Product Designer",
    summary: "TODO: One-line summary of the problem and the result.",
    tags: ["TODO", "Tags"],
    accent: "oklch(0.75 0.12 160)",
    outcomes: [
      { value: "—", label: "TODO: metric" },
      { value: "—", label: "TODO: metric" },
    ],
    sections: placeholderSections,
  },
  {
    slug: "project-three",
    title: "TODO: Project three",
    client: "TODO: Company",
    year: "20XX",
    role: "Product Designer",
    summary: "TODO: One-line summary of the problem and the result.",
    tags: ["TODO", "Tags"],
    accent: "oklch(0.75 0.13 40)",
    outcomes: [
      { value: "—", label: "TODO: metric" },
      { value: "—", label: "TODO: metric" },
    ],
    sections: placeholderSections,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
