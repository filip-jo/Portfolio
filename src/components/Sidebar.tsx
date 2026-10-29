"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { ArrowUpRight, LayoutGrid, Mail, User } from "lucide-react";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

const primaryNav = [
  { href: "/", label: "Overview", icon: LayoutGrid },
  { href: "/about/", label: "About", icon: User },
];

function normalize(path: string) {
  return path.endsWith("/") ? path : `${path}/`;
}

function NavItem({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`relative flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm transition-colors ${
        active ? "text-foreground" : "text-muted hover:text-foreground"
      }`}
    >
      {active && (
        <motion.span
          layoutId="sidebar-active"
          className="absolute inset-0 rounded-md bg-surface-hover"
          transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
        />
      )}
      <span className="relative flex min-w-0 items-center gap-2.5">{children}</span>
    </Link>
  );
}

export function Sidebar() {
  const pathname = normalize(usePathname());

  return (
    <div className="flex h-full flex-col overflow-y-auto px-3 py-5">
      <Link href="/" className="flex items-center gap-3 px-2.5">
        <span className="flex size-9 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
          {site.name.charAt(0)}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-medium">{site.name}</span>
          <span className="block truncate text-xs text-muted">{site.role}</span>
        </span>
      </Link>

      <nav className="mt-8 flex flex-col gap-0.5">
        {primaryNav.map(({ href, label, icon: Icon }) => (
          <NavItem key={href} href={href} active={pathname === href}>
            <Icon className="size-4 shrink-0" />
            {label}
          </NavItem>
        ))}
      </nav>

      <div className="mt-8">
        <p className="px-2.5 pb-2 text-xs font-medium tracking-wide text-muted uppercase">
          Work
        </p>
        <nav className="flex flex-col gap-0.5">
          {projects.map((project) => {
            const href = `/${project.slug}/`;
            return (
              <NavItem key={project.slug} href={href} active={pathname === href}>
                <span
                  className="size-2 shrink-0 rounded-full"
                  style={{ background: project.accent }}
                />
                <span className="truncate">{project.title}</span>
              </NavItem>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto flex flex-col gap-3 pt-8">
        <div className="flex items-center gap-2 px-2.5 text-xs text-muted">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          {site.availability}
        </div>
        <a
          href={`mailto:${site.email}`}
          className="flex items-center justify-center gap-2 rounded-md bg-foreground px-3 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          <Mail className="size-4" />
          Get in touch
        </a>
        <div className="flex gap-1">
          {site.social.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-1 rounded-md px-2 py-1.5 text-xs text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
            >
              {link.label}
              <ArrowUpRight className="size-3" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
