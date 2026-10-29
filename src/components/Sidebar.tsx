"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Mail } from "lucide-react";
import { LinkedInIcon } from "@/components/LinkedInIcon";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

const ease = [0.22, 1, 0.36, 1] as const;

// Height-and-fade wrapper for the blocks that only show while a case is open.
const reveal = {
  initial: { height: 0, opacity: 0 },
  animate: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.4, ease },
  className: "overflow-hidden",
};

// Short biography shown while a case is open: the block opens up, then the
// sentences fade and slide in one after the other.
function ShortBio() {
  return (
    <motion.div {...reveal}>
      <motion.p
        className="px-2.5 pt-4 text-ui text-muted"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { delayChildren: 0.25, staggerChildren: 0.18 } } }}
      >
        {site.shortBio.map((sentence, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={{
              hidden: { opacity: 0, y: 6, filter: "blur(4px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5 } },
            }}
          >
            {sentence}
          </motion.span>
        ))}
      </motion.p>
    </motion.div>
  );
}

// List of cases shown under the bio while a case is open. The items fade in
// after the bio; the highlight slides to the current case when it changes.
function CaseNav() {
  const pathname = usePathname();
  return (
    <motion.nav aria-label="Cases" {...reveal}>
      <p className="px-2.5 pt-6 pb-2 text-label font-medium text-muted">Cases</p>
      <motion.ul
        className="flex flex-col gap-0.5"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { delayChildren: 0.45, staggerChildren: 0.06 } } }}
      >
        {projects.map((project) => {
          const href = `/${project.slug}/`;
          const active = pathname === href || pathname === href.slice(0, -1);
          return (
            <motion.li
              key={project.slug}
              variants={{
                hidden: { opacity: 0, x: -6 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease } },
              }}
            >
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`relative flex rounded-md px-2.5 py-1.5 text-ui transition-colors ${
                  active ? "text-foreground" : "text-muted hover:bg-surface-hover/60 hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="case-active"
                    className="absolute inset-0 rounded-md bg-surface-hover"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                  />
                )}
                <span className="relative truncate">{project.title}</span>
              </Link>
            </motion.li>
          );
        })}
      </motion.ul>
    </motion.nav>
  );
}

export function Sidebar({
  caseOpen = false,
  onCaseContentHidden,
}: {
  /** Shows the short bio and the case list. */
  caseOpen?: boolean;
  /** Called once the bio and case list have finished animating out. */
  onCaseContentHidden?: () => void;
}) {
  return (
    <div className="flex h-full flex-col overflow-y-auto px-3 py-5">
      <Link
        href="/"
        className="-my-1.5 block rounded-md px-2.5 py-1.5 transition-colors hover:bg-surface-hover/60"
      >
        <span className="block truncate text-ui font-medium">{site.name}</span>
        <span className="block truncate text-label text-muted">{site.role}</span>
        <span className="block truncate text-label text-muted">{site.location}</span>
      </Link>

      <AnimatePresence initial={false} onExitComplete={onCaseContentHidden}>
        {caseOpen && <ShortBio key="bio" />}
        {caseOpen && <CaseNav key="cases" />}
      </AnimatePresence>

      <div className="mt-auto flex flex-col gap-3 pt-6">
        <a
          href={`mailto:${site.email}`}
          className="flex items-center gap-2.5 rounded-md bg-foreground px-2.5 py-2 text-background transition-opacity hover:opacity-90"
        >
          <Mail className="size-4 shrink-0" />
          <span className="min-w-0">
            <span className="block text-ui font-medium">Get in touch</span>
            <span className="block truncate text-label opacity-70">{site.email}</span>
          </span>
        </a>
        <div className="flex flex-col gap-0.5">
          {site.social.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-ui text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
            >
              {link.label === "LinkedIn" && <LinkedInIcon className="size-4 shrink-0" />}
              {link.label}
              <ArrowUpRight className="size-3" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
