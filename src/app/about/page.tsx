import type { Metadata } from "next";
import { AboutMe } from "@/components/AboutMe";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
};

export default function About() {
  return (
    <>
      <header className="max-w-2xl">
        <p className="text-sm text-muted">About</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          {site.name}
        </h1>
        <p className="mt-2 text-muted">
          {site.role} · {site.location}
        </p>
      </header>

      <div className="mt-10 max-w-2xl">
        <p className="font-semibold">{site.greeting}</p>
        <AboutMe className="mt-2" />
      </div>

      <section className="mt-14 max-w-2xl">
        <h2 className="text-sm font-medium text-muted">Experience</h2>
        <ul className="mt-4 divide-y divide-border border-y border-border">
          {site.experience.map((job, i) => (
            <li key={i} className="flex flex-wrap items-baseline justify-between gap-x-4 py-4">
              <span>
                <span className="font-medium">{job.title}</span>
                <span className="text-muted"> · {job.company}</span>
              </span>
              {job.period && <span className="text-sm text-muted">{job.period}</span>}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 max-w-2xl">
        <h2 className="text-sm font-medium text-muted">Skills</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {site.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-border bg-surface px-3 py-1 text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
