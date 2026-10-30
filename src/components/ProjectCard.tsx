import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { asset } from "@/lib/asset";

// A case tile: the thumbnail floats on its own, and the text card floats in
// front of its lower edge.
//
// Hover only animates transform and opacity, which the GPU composites without
// repainting: the tile lifts with `translate`, the thumbnail lifts further
// than the text card for a sense of depth, and the deeper shadow is a
// separate layer that fades in. Animating box-shadow or scaling the image
// repaints the large thumbnail and its blur every frame and makes hover lag.
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
      className="stagger-in group flex flex-col rounded-card transition-[translate,scale] duration-300 ease-out [will-change:translate] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight motion-safe:hover:-translate-y-1 motion-safe:focus-visible:-translate-y-1 motion-safe:active:scale-[0.99]"
    >
      {/* From two columns up, every thumbnail gets the same slot so tiles in a
          row line up: bare screenshots show whole and sit on the text card,
          others fill it. In one column, screenshots keep their own height. */}
      <div className="sm:flex sm:aspect-[3/2] sm:items-end sm:justify-center">
        <span
          className={`relative block rounded-lg shadow-thumb transition-[translate] duration-300 ease-out [will-change:translate] motion-safe:group-hover:-translate-y-1.5 motion-safe:group-focus-visible:-translate-y-1.5 after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:opacity-0 after:shadow-thumb-hover after:transition-opacity after:duration-300 after:[will-change:opacity] group-hover:after:opacity-100 group-focus-visible:after:opacity-100 group-active:after:opacity-100 ${
            project.cover.framed ? "sm:max-h-full sm:max-w-full" : "w-full"
          }`}
        >
          <Image
            src={asset(project.cover.src)}
            alt={project.cover.alt}
            width={project.cover.width}
            height={project.cover.height}
            sizes="(min-width: 640px) 50vw, 100vw"
            preload={preload}
            className={`rounded-lg ${
              project.cover.framed
                ? "h-auto w-full sm:max-h-full sm:w-auto sm:max-w-full"
                : "aspect-[3/2] w-full object-cover"
            }`}
          />
        </span>
      </div>
      <div className="relative z-10 -mt-8 flex flex-1 flex-col gap-2 rounded-card border border-border bg-surface p-5 shadow-sidebar transition-colors duration-300 group-hover:border-muted group-focus-visible:border-muted group-active:border-muted">
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
