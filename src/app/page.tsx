import { AboutMe } from "@/components/AboutMe";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export default function Home() {
  return (
    <>
      <section className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{site.greeting}</h1>
        <AboutMe className="mt-4 text-lg" />
        <p className="mt-4 text-muted">
          {site.workIntro}
          <br />
          <a href={`mailto:${site.email}`} className="text-foreground underline underline-offset-4">
            {site.email}
          </a>
        </p>
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
