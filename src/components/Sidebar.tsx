"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Mail } from "lucide-react";
import { LinkedInIcon } from "@/components/LinkedInIcon";
import { site } from "@/content/site";

// Short biography shown while a case is open: the block opens up, then the
// sentences fade and slide in one after the other.
function ShortBio() {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden"
    >
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

export function Sidebar({
  showBio = false,
  onBioHidden,
}: {
  showBio?: boolean;
  /** Called once the bio has finished animating out. */
  onBioHidden?: () => void;
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

      <AnimatePresence initial={false} onExitComplete={onBioHidden}>
        {showBio && <ShortBio key="bio" />}
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
