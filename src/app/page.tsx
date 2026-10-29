import { AboutMe } from "@/components/AboutMe";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export default function Home() {
  return (
    <>
      <section className="max-w-2xl">
        <h1 className="text-display">{site.greeting}</h1>
        <AboutMe className="mt-4 text-heading font-normal" />
        <p className="mt-4 text-body text-muted">
          {site.workIntro}
          <br />
          <a href={`mailto:${site.email}`} className="text-foreground underline underline-offset-4">
            {site.email}
          </a>
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-label font-medium tracking-wide text-muted uppercase">Selected work</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} preload={i < 2} />
          ))}
        </div>
      </section>

      <div className="mt-16 grid gap-12 sm:grid-cols-2">
        <section>
          <h2 className="text-label font-medium tracking-wide text-muted uppercase">Experience</h2>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {site.experience.map((job, i) => (
              <li key={i} className="flex flex-wrap items-baseline justify-between gap-x-4 py-4">
                <span>
                  <span className="text-body font-medium">{job.title}</span>
                  <span className="text-muted"> · {job.company}</span>
                </span>
                {job.period && <span className="text-ui text-muted">{job.period}</span>}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-label font-medium tracking-wide text-muted uppercase">Skills</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {site.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-border bg-surface px-3 py-1 text-ui"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
