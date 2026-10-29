import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { asset } from "@/lib/asset";

export function ProjectCard({ project, preload = false }: { project: Project; preload?: boolean }) {
  return (
    <Link
      href={`/${project.slug}/`}
      className="group flex flex-col overflow-hidden rounded-card border border-border bg-surface transition-colors hover:border-muted"
    >
      <div className="aspect-[4/3] overflow-hidden bg-surface-hover">
        <Image
          src={asset(project.cover.src)}
          alt={project.cover.alt}
          width={project.cover.width}
          height={project.cover.height}
          sizes="(min-width: 640px) 50vw, 100vw"
          preload={preload}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center justify-between gap-4 text-label text-muted">
          <span>{project.client}</span>
          <span>
            {project.market} · {project.stage}
          </span>
        </div>
        <h3 className="flex items-center gap-1 text-heading">
          {project.title}
          <ArrowUpRight className="size-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </h3>
        <p className="text-ui text-muted">{project.summary}</p>
      </div>
    </Link>
  );
}
