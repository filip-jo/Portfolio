import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProject, projects, type Project } from "@/content/projects";
import { Reveal } from "@/components/Reveal";
import { asset } from "@/lib/asset";
import { navItem } from "@/lib/ui";

// Case studies live at /<slug>/ to match the old WordPress URLs.
// Static export: only the slugs listed here exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: { images: [asset(project.cover.src)] },
  };
}

// Position in the page's entrance cascade (see .stagger-in in globals.css).
const step = (i: number) => ({ "--i": i }) as React.CSSProperties;

const navLink = `inline-flex items-center gap-1.5 px-2 py-1 ${navItem}`;

// Previous/next case link; shown dimmed (not a link) at either end of the list
// so the buttons keep their position.
function CaseLink({ project, direction }: { project?: Project; direction: "previous" | "next" }) {
  const label = direction === "previous" ? "Previous" : "Next";
  const icon =
    direction === "previous" ? (
      <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
    ) : (
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
    );
  const content =
    direction === "previous" ? (
      <>
        {icon}
        {label}
      </>
    ) : (
      <>
        {label}
        {icon}
      </>
    );

  if (!project) {
    return (
      <span aria-hidden="true" className="inline-flex items-center gap-1.5 px-2 py-1 text-ui text-muted opacity-40">
        {content}
      </span>
    );
  }
  return (
    <Link
      href={`/${project.slug}/`}
      title={project.title}
      aria-label={`${label} case: ${project.title}`}
      className={`group ${navLink}`}
    >
      {content}
    </Link>
  );
}

export default async function CaseStudy({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const previous = projects[index - 1];
  const next = projects[index + 1];

  const meta = [
    { label: "Company", value: project.client },
    { label: "Company type", value: [...project.tags, project.stage].join(" · ") },
    { label: "Role", value: project.role },
    ...(project.timeline ? [{ label: "Timeline", value: project.timeline }] : []),
  ];

  return (
    <article>
      <div className="stagger-in mb-6 flex items-center justify-between gap-4" style={step(0)}>
        <Link href="/" className={`group -ml-2 ${navLink}`}>
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          Overview
        </Link>
        <nav aria-label="Cases" className="-mr-2 flex items-center gap-1">
          <CaseLink project={previous} direction="previous" />
          <CaseLink project={next} direction="next" />
        </nav>
      </div>
      <header className="max-w-2xl">
        <h1 className="stagger-in text-display" style={step(1)}>
          {project.title}
        </h1>
        <p className="stagger-in mt-4 text-body text-muted" style={step(2)}>
          {project.summary}
        </p>
      </header>

      <dl
        className="stagger-in mt-8 grid grid-cols-2 gap-4 border-y border-border py-5 sm:grid-cols-4"
        style={step(3)}
      >
        {meta.map((item) => (
          <div key={item.label}>
            <dt className="text-label text-muted">{item.label}</dt>
            <dd className="mt-1 text-ui">{item.value}</dd>
          </div>
        ))}
      </dl>

      <Image
        src={asset(project.cover.src)}
        alt={project.cover.alt}
        width={project.cover.width}
        height={project.cover.height}
        sizes="(min-width: 1024px) 56rem, 100vw"
        preload
        className="stagger-in mt-10 max-h-[70vh] w-full rounded-card bg-surface-hover object-cover"
        style={step(4)}
      />

      {project.outcomes.length > 0 && (
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {project.outcomes.map((outcome, i) => (
            <Reveal
              key={outcome.label}
              delay={i * 0.1}
              className="rounded-card border border-border bg-surface p-5"
            >
              <p className="text-display">{outcome.value}</p>
              <p className="mt-1 text-ui text-muted">{outcome.label}</p>
            </Reveal>
          ))}
        </div>
      )}

      <div className="mt-14 flex flex-col gap-12">
        {project.sections.map((section) => (
          <section key={section.heading}>
            <Reveal className="max-w-2xl">
              <h2 className="text-heading">{section.heading}</h2>
              {section.body.map((paragraph, i) => (
                <p key={i} className="mt-3 text-body text-muted">
                  {paragraph}
                </p>
              ))}
              {section.list && (
                <ul className="mt-3 list-disc space-y-1 pl-5 text-body text-muted marker:text-border">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </Reveal>
            {section.images?.map((image) => (
              <Reveal key={image.src} className="mt-8">
                <Image
                  src={asset(image.src)}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 1024px) 56rem, 100vw"
                  className="w-full rounded-card border border-border"
                />
              </Reveal>
            ))}
          </section>
        ))}
      </div>

    </article>
  );
}
