// Case studies, migrated from filipjo.com/portfolio. The array order is the
// order they appear on the overview page. Slugs match the
// old WordPress URLs so existing links keep working after launch.
// Image paths are relative to public/ and get the base path via asset().

export type Image = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** A bare screenshot without its own background: shown whole, inset on a neutral backdrop. */
  framed?: boolean;
};

export type Outcome = {
  value: string;
  label: string;
};

export type Section = {
  heading: string;
  body: string[];
  list?: string[];
  images?: Image[];
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  /** Company's market and funding stage, shown on the overview tiles. */
  market: "B2B" | "B2C";
  stage: string;
  role: string;
  timeline?: string;
  summary: string;
  tags: string[];
  cover: Image;
  outcomes: Outcome[];
  sections: Section[];
};

const peersIntro = [
  "Peers gives enterprises the power of systematic employee skill management, team building and learning. It is enabled by a broad database of skills and learning content, as well as a machine learning recommendation engine.",
  "As Senior Product Designer UX/UI, together with the product and dev team, I not only introduced several essential advancements but designed the product towards product–market fit.",
];

export const projects: Project[] = [
  {
    slug: "energy-report-builder",
    title: "Report builder",
    client: "ecoplanet",
    market: "B2B",
    stage: "Series A",
    role: "Senior Product Designer",
    timeline: "~2 weeks + testing",
    summary: "A reporting tool for energy managers.",
    tags: ["B2B SaaS", "Energy"],
    cover: {
      src: "/images/energy-report-builder/cover-screen.webp",
      alt: "The report builder: module picker next to a live preview of the report",
      width: 1440,
      height: 960,
      framed: true,
    },
    outcomes: [],
    sections: [
      {
        heading: "Context",
        body: [
          "An important job to be done for the core user group of energy managers was to send reports to their team of executives, keeping them up to date on the latest energy developments within their company.",
        ],
      },
      {
        heading: "My responsibilities",
        body: ["As Senior Product Designer, I:"],
        list: [
          "Interviewed users together with the product owner",
          "Made the concept",
          "Built a prototype with Claude, showcased on a branch",
          "Designed the final components in Figma",
          "Wrote the tickets in Linear",
          "Shipped the feature together with the engineering team",
          "Tested it",
        ],
      },
      {
        heading: "Timeline & tools",
        body: [
          "5 days of ideation and concept with the product owners and 5 days of designing and prototyping, followed by testing, feedback and iteration.",
        ],
        list: [
          "Design source of truth: the shipped product",
          "Prototype: Claude Code, built and deployed on Vercel",
          "Component design: Figma",
          "Tickets: Linear",
        ],
      },
      {
        heading: "Assumptions & research",
        body: [
          "Energy managers wanted an easy way to create custom reports. Power users wanted a lot of customization, e.g. comparison periods and multiple time series in bar charts, line charts and tables. They also wanted a heatmap and a KPI module.",
          "Interviews suggested that users wanted custom ways to send reports to their recipients: setting the interval and recipient list, making test runs, pausing, and customizing the look of a report.",
        ],
      },
      {
        heading: "Solution",
        body: [
          "I designed a modular report builder that brings editing and the recipient's view into one workspace. Users can combine charts, KPIs, text and images, with a report outline alongside a preview of the assembled report. Inline editing keeps each module's settings in context, so users can configure the content without losing sight of the report as a whole.",
          "For chart modules, users can choose time series and reporting periods, with additional controls such as granularity for heatmaps. Visible time-range labels and optional data-quality indicators give readers context for interpreting the figures: which period the data covers and how complete it is.",
        ],
        images: [
          {
            src: "/images/energy-report-builder/filled.webp",
            alt: "A filled report: line and bar charts of load profile changes next to the module picker",
            width: 2000,
            height: 1333,
          },
          {
            src: "/images/energy-report-builder/empty.webp",
            alt: "Editing view: chart modules with their settings edited inline",
            width: 2000,
            height: 1333,
          },
        ],
      },
    ],
  },
  {
    slug: "energy-insights-inbox",
    title: "Energy insights inbox",
    client: "ecoplanet",
    market: "B2B",
    stage: "Series A",
    role: "Senior Product Designer",
    timeline: "4 weeks, 2 iterations",
    summary: "An energy insights inbox to detect anomalies during production.",
    tags: ["B2B SaaS", "Energy"],
    cover: {
      src: "/images/energy-insights-inbox/cover-screen.webp",
      alt: "The insights inbox: anomalies grouped by meter next to a consumption chart",
      width: 2000,
      height: 1000,
      framed: true,
    },
    outcomes: [],
    sections: [
      {
        heading: "Context",
        body: [
          "A core value for energy managers was being in control of their environment. By showing them notable signals (insights) during and outside of production times, users became aware of anomalies they would otherwise have missed. These insights could be investigated, turned into a real-life measure for project planning, or dismissed.",
        ],
      },
      {
        heading: "My responsibilities",
        body: [
          "Closing the loop between product owner and engineering to ensure the feature matches and exceeds user expectations.",
        ],
        list: [
          "Interviewed users together with the product owner",
          "Made the concept",
          "Built a prototype with Claude, showcased on a branch",
          "Wrote the tickets",
          "Shipped the feature together with the engineering team",
          "Tested it",
        ],
      },
      {
        heading: "Timeline & tools",
        body: [
          "Shipped in 2 iterations: 1 week of ideation and concept with the product owners and about 3 days of designing and prototyping, followed by testing, feedback and iteration.",
        ],
        list: [
          "Idea to shipped: 4 weeks",
          "Bottleneck: engineering resources, as multiple features were being shipped",
          "Concept and component design: Figma",
          "Prototype: Claude Code, built and deployed on Vercel",
          "Tickets: Linear",
          "Source of truth: the shipped product",
        ],
      },
      {
        heading: "Assumptions & research",
        body: [
          "Energy managers need control over their energy consumption and consumption behavior, as they manage multiple machines per location. Tracking consumption behavior and notifying them when an anomaly happens would save them time and focus their work on actual incidents.",
          "Combining that focus with an actual workflow to solve potential issues (over-consumption) would close the loop, reducing time and effort and saving money.",
        ],
      },
      {
        heading: "Solution",
        body: [
          "I defined the most relevant states an insight could have: new, under investigation, dismissed, solved, and converted to a measure. The interface presents these states prominently and shows the most relevant information for each state.",
          "Users can investigate an anomaly on their own or assign a colleague. The flow from new, to investigation, to corrected or dismissed is fully managed in the app, and even creating a real-life measure, including project management, is derived from it.",
        ],
        images: [
          {
            src: "/images/energy-insights-inbox/inbox.webp",
            alt: "Insights inbox: a list of new anomalies next to a detail view with a consumption chart",
            width: 2000,
            height: 1000,
          },
        ],
      },
    ],
  },
  {
    slug: "onboarding-redesign",
    title: "Onboarding redesign",
    client: "Peers",
    market: "B2B",
    stage: "Seed",
    role: "Senior Product Designer UX/UI",
    timeline: "Several weeks",
    summary:
      "Untangling a long, error-prone onboarding into lean in-app flows that scale.",
    tags: ["B2B SaaS", "EdTech"],
    cover: {
      src: "/images/onboarding-redesign/cover.webp",
      alt: "The redesigned onboarding on a tablet and a phone",
      width: 1024,
      height: 1024,
    },
    outcomes: [],
    sections: [
      { heading: "Context", body: peersIntro },
      {
        heading: "Goals",
        body: ["OKRs: increase user onboarding success (overall UX) and increase scalability."],
      },
      {
        heading: "My responsibilities",
        body: [],
        list: [
          "Research",
          "Interviewing",
          "User flows",
          "Wireframing",
          "Prototyping",
          "Testing",
          "Design",
        ],
      },
      {
        heading: "Timeline",
        body: [
          "This project played out over several weeks, due to planning research, interviews and testing.",
        ],
      },
      {
        heading: "Assumptions & research",
        body: [
          "The onboarding process was longer than similar onboarding processes in the same product category. Completing it took a lot of time and demanded a huge cognitive load (Miller's law). Based on direct user feedback and Hotjar analysis, this process was the reason for errors, dissatisfaction and unnecessary customer support load.",
        ],
      },
      {
        heading: "Solution",
        body: [
          "I set out to break up the complete onboarding to minimize user frustration and reduce customer support load: untangling the whole process to remove unnecessary steps, and showing other steps only when user input was needed.",
          "This resulted in lean in-app flows for both assessments and learning path creation. The UI was cleared to reduce cognitive load to a minimum.",
        ],
        images: [
          {
            src: "/images/onboarding-redesign/flows.webp",
            alt: "The new in-app onboarding flows on a tablet and a phone",
            width: 2000,
            height: 1073,
          },
        ],
      },
    ],
  },
  {
    slug: "peers-saas-increase-task-success",
    title: "Increase task success",
    client: "Peers",
    market: "B2B",
    stage: "Seed",
    role: "Senior Product Designer UX/UI",
    summary:
      "Reworking the learning path task flow: fewer clicks to the main action and quicker orientation.",
    tags: ["B2B SaaS", "EdTech"],
    cover: {
      src: "/images/peers-saas-increase-task-success/cover.webp",
      alt: "A learning path screen on a laptop",
      width: 1024,
      height: 1024,
    },
    outcomes: [
      { value: "−5", label: "Clicks to the target action" },
      { value: "−90%", label: "Error rate" },
      { value: "−5 min", label: "Time to complete the task" },
    ],
    sections: [
      { heading: "Context", body: peersIntro },
      { heading: "Goal", body: ["OKR: increase task success and usability."] },
      {
        heading: "Assumptions & research",
        body: [
          "Users with an active learning path had difficulties starting a learning unit, gathering information and navigating the learning path. Common UX and UI principles had been neglected, and analysis of user recordings revealed flaws in the usability.",
        ],
      },
      {
        heading: "Solution",
        body: [
          "Basic UI principles, such as purposeful button placement and reducing the number of clicks to target, were applied. This way, we got rid of an unnecessary UI layer (the drawer) and some buttons.",
          "This resulted in fewer clicks to the main target action (opening the learning unit) and quicker user orientation in the card lists.",
        ],
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Whether a pathname (with or without trailing slash) is a case study page. */
export function isCasePath(pathname: string) {
  const slug = pathname.replace(/^\/|\/$/g, "");
  return projects.some((project) => project.slug === slug);
}
