import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProject, projects } from "@/content/projects";
import { asset } from "@/lib/asset";

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

export default async function CaseStudy({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const previous = projects[index - 1];
  const next = projects[index + 1];

  const meta = [
    { label: "Company", value: project.client },
    { label: "Role", value: project.role },
    ...(project.timeline ? [{ label: "Timeline", value: project.timeline }] : []),
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

      <dl className="mt-8 grid grid-cols-2 gap-4 border-y border-border py-5 sm:grid-cols-3">
        {meta.map((item) => (
          <div key={item.label}>
            <dt className="text-xs text-muted">{item.label}</dt>
            <dd className="mt-1 text-sm">{item.value}</dd>
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
        className="mt-10 max-h-[70vh] w-full rounded-card bg-surface-hover object-cover"
      />

      {project.outcomes.length > 0 && (
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
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

      <div className="mt-14 flex flex-col gap-12">
        {project.sections.map((section) => (
          <section key={section.heading}>
            <div className="max-w-2xl">
              <h2 className="text-xl font-semibold tracking-tight">{section.heading}</h2>
              {section.body.map((paragraph, i) => (
                <p key={i} className="mt-3 leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
              {section.list && (
                <ul className="mt-3 list-disc space-y-1 pl-5 leading-relaxed text-muted marker:text-border">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
            {section.images?.map((image) => (
              <Image
                  key={image.src}
                  src={asset(image.src)}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 1024px) 56rem, 100vw"
                  className="mt-8 w-full rounded-card border border-border"
                />
            ))}
          </section>
        ))}
      </div>

      <nav className="mt-20 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
        {previous ? (
          <Link
            href={`/${previous.slug}/`}
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
            href={`/${next.slug}/`}
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
