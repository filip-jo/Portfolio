import { AboutMe } from "@/components/AboutMe";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export default function Home() {
  return (
    <>
      <section className="max-w-2xl pt-6 lg:pt-intro-offset">
        <h1 className="highlight-fade text-display">{site.greeting}</h1>
        <AboutMe className="mt-4 text-heading font-normal" />
        <p className="mt-4 text-heading font-normal text-muted">
          {site.workIntro}
        </p>
      </section>

      {/* No visible heading: the last line of the intro leads into the cases. */}
      <section aria-label="Selected work" className="mt-10">
        <div className="grid gap-5 sm:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} preload={i < 2} />
          ))}
        </div>
      </section>

      <div className="mt-16 grid gap-12 sm:grid-cols-2">
        <section>
          <h2 className="text-label font-medium text-muted">Experience</h2>
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
          <h2 className="text-label font-medium text-muted">Skills</h2>
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
