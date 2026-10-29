"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { LinkedInIcon } from "@/components/LinkedInIcon";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { navItem, primaryButton } from "@/lib/ui";

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
      <p className="px-2.5 pt-6 pb-2 text-label font-medium text-muted">Cases:</p>
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
                className={`group relative flex items-center gap-2 px-2.5 py-1.5 ${
                  active ? "rounded-md text-ui font-medium text-foreground" : navItem
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
                {!active && (
                  <ArrowRight className="ml-auto size-3.5 shrink-0 -translate-x-1 opacity-0 transition-[opacity,translate] duration-150 group-hover:translate-x-0 group-hover:opacity-100 group-active:translate-x-0 group-active:opacity-100" />
                )}
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
}: {
  /** Shows the short bio and the case list. */
  caseOpen?: boolean;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-y-auto px-3 py-5">
      <Link
        href="/"
        className="group -my-1.5 block rounded-md px-2.5 py-1.5 transition-[background-color,scale] duration-150 hover:bg-surface-hover active:bg-surface-hover motion-safe:active:scale-[0.98]"
      >
        <span
          className={`block truncate text-ui font-medium transition-colors duration-300 group-hover:text-highlight ${
            caseOpen ? "text-highlight" : ""
          }`}
        >
          {site.name}
        </span>
        <span className="block text-label text-muted">
          {site.role}, based in {site.location}
        </span>
      </Link>

      <AnimatePresence initial={false}>
        {caseOpen && <ShortBio key="bio" />}
        {caseOpen && <CaseNav key="cases" />}
      </AnimatePresence>

      <div className="mt-auto flex flex-col gap-3 pt-6">
        <a
          href={`mailto:${site.email}`}
          className={`group flex items-center gap-2.5 px-2.5 py-2 ${primaryButton}`}
        >
          <Mail className="size-4 shrink-0 transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-110" />
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
              className={`group flex items-center gap-2.5 px-2.5 py-1.5 ${navItem}`}
            >
              {link.label === "LinkedIn" && (
                <LinkedInIcon className="size-4 shrink-0 transition-colors group-hover:text-highlight" />
              )}
              {link.label}
              <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
