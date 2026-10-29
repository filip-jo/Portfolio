import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}/`}
      className="group flex flex-col overflow-hidden rounded-card border border-border bg-surface transition-colors hover:border-muted"
    >
      <div
        className="aspect-[16/10] transition-transform duration-500 group-hover:scale-[1.02]"
        style={{
          background: `linear-gradient(135deg, ${project.accent}, color-mix(in oklch, ${project.accent} 40%, var(--surface)))`,
        }}
      />
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center justify-between gap-4 text-xs text-muted">
          <span>{project.client}</span>
          <span>{project.year}</span>
        </div>
        <h3 className="flex items-center gap-1 font-medium">
          {project.title}
          <ArrowUpRight className="size-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </h3>
        <p className="text-sm text-muted">{project.summary}</p>
      </div>
    </Link>
  );
}
