import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export default function Home() {
  return (
    <>
      <section className="max-w-2xl">
        <p className="text-sm text-muted">{site.role}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Hi, I&apos;m {site.name}.
        </h1>
        <p className="mt-4 text-lg text-muted">{site.intro}</p>
        <p className="mt-3 text-muted">{site.about[0]}</p>
      </section>

      <section className="mt-14">
        <h2 className="text-sm font-medium text-muted">Selected work</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} preload={i < 2} />
          ))}
        </div>
      </section>
    </>
  );
}
