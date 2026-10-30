import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { asset } from "@/lib/asset";

export function ProjectCard({
  project,
  index = 0,
  preload = false,
}: {
  project: Project;
  /** Position in the grid; staggers the entrance animation. */
  index?: number;
  preload?: boolean;
}) {
  return (
    <Link
      href={`/${project.slug}/`}
      style={{ "--i": index } as React.CSSProperties}
      className="stagger-in group flex flex-col overflow-hidden rounded-card border border-border bg-surface transition-[translate,scale,box-shadow,border-color] duration-300 ease-out hover:border-muted hover:shadow-sidebar active:border-muted active:shadow-sidebar focus-visible:border-muted focus-visible:shadow-sidebar focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight motion-safe:hover:-translate-y-1 motion-safe:focus-visible:-translate-y-1 motion-safe:active:scale-[0.99]"
    >
      <div className="aspect-[4/3] overflow-hidden bg-surface-hover">
        <Image
          src={asset(project.cover.src)}
          alt={project.cover.alt}
          width={project.cover.width}
          height={project.cover.height}
          sizes="(min-width: 640px) 50vw, 100vw"
          preload={preload}
          className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center justify-between gap-4 text-label text-muted">
          <span>{project.client}</span>
          <span>
            {project.market} · {project.stage}
          </span>
        </div>
        <h3 className="text-heading transition-colors group-hover:text-highlight group-focus-visible:text-highlight group-active:text-highlight">
          {project.title}
        </h3>
        <p className="text-ui text-muted">{project.summary}</p>
      </div>
    </Link>
  );
}
