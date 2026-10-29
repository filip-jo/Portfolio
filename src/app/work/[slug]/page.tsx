import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProject, projects } from "@/content/projects";

// Static export: only the slugs listed here exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const previous = projects[index - 1];
  const next = projects[index + 1];

  const meta = [
    { label: "Company", value: project.client },
    { label: "Role", value: project.role },
    { label: "Year", value: project.year },
  ];

  return (
    <article>
      <header className="max-w-2xl">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-4 text-lg text-muted">{project.summary}</p>
      </header>

      <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-border py-5">
        {meta.map((item) => (
          <div key={item.label}>
            <dt className="text-xs text-muted">{item.label}</dt>
            <dd className="mt-1 text-sm">{item.value}</dd>
          </div>
        ))}
      </dl>

      <div
        className="mt-10 aspect-[16/9] rounded-card"
        style={{
          background: `linear-gradient(135deg, ${project.accent}, color-mix(in oklch, ${project.accent} 40%, var(--surface)))`,
        }}
      />

      {project.outcomes.length > 0 && (
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {project.outcomes.map((outcome) => (
            <div
              key={outcome.label}
              className="rounded-card border border-border bg-surface p-5"
            >
              <p className="text-3xl font-semibold tracking-tight">{outcome.value}</p>
              <p className="mt-1 text-sm text-muted">{outcome.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-14 flex max-w-2xl flex-col gap-12">
        {project.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-semibold tracking-tight">{section.heading}</h2>
            {section.body.map((paragraph, i) => (
              <p key={i} className="mt-3 leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>

      <nav className="mt-20 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
        {previous ? (
          <Link
            href={`/work/${previous.slug}/`}
            className="group rounded-card p-4 transition-colors hover:bg-surface-hover"
          >
            <span className="flex items-center gap-1 text-xs text-muted">
              <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-0.5" />
              Previous
            </span>
            <span className="mt-1 block font-medium">{previous.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/work/${next.slug}/`}
            className="group rounded-card p-4 text-right transition-colors hover:bg-surface-hover"
          >
            <span className="flex items-center justify-end gap-1 text-xs text-muted">
              Next
              <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
            </span>
            <span className="mt-1 block font-medium">{next.title}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
