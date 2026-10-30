"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, LayoutGroup, MotionConfig, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { isCasePath } from "@/content/projects";
import { site } from "@/content/site";
import { navItem } from "@/lib/ui";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [openPath, setOpenPath] = useState<string | null>(null);
  const pathname = usePathname();
  // The drawer is only open on the page it was opened from, so navigating closes it.
  const mobileOpen = openPath === pathname;
  const close = () => setOpenPath(null);

  // On a case page the sidebar also shows the short bio and case list.
  const caseOpen = isCasePath(pathname);

  // Page exits: clicking an internal link first fades the current page out,
  // then navigates; the new page fades in through template.tsx. New-tab
  // clicks, external links and browser back/forward behave as usual.
  const router = useRouter();
  const [leaving, setLeaving] = useState<{ from: string; to: string } | null>(null);
  // Forget a finished exit once the page changes, so returning to that page
  // (e.g. with the back button) doesn't replay it.
  const [shownPath, setShownPath] = useState(pathname);
  if (pathname !== shownPath) {
    setShownPath(pathname);
    setLeaving(null);
  }
  const isLeaving = leaving?.from === pathname;

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a");
      if (!link || (link.target && link.target !== "_self") || link.hasAttribute("download")) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || !url.pathname.startsWith(`${base}/`)) return;
      if (url.pathname === window.location.pathname) return;
      // Stops the default navigation and next/link's own handler, which skips
      // clicks that are already default-prevented.
      e.preventDefault();
      setOpenPath(null);
      setLeaving({ from: pathname, to: url.pathname.slice(base.length) + url.search + url.hash });
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  return (
    // reducedMotion="user": visitors who ask for less motion get fades without movement.
    <MotionConfig reducedMotion="user">
      <div className="min-h-dvh">
        {/* Desktop sidebar: the track spans the screen height; the panel inside
            is as tall as its content and vertically centred. It grows and
            shrinks with the bio and case list as they animate in and out. */}
        <div className="pointer-events-none fixed inset-y-sidebar-inset left-sidebar-inset hidden w-sidebar flex-col justify-center lg:flex">
          <aside className="pointer-events-auto flex max-h-full flex-col overflow-hidden rounded-sidebar border border-border bg-surface shadow-sidebar">
            {/* Separate layout groups so the two sidebars' case highlights don't animate between each other. */}
            <LayoutGroup id="desktop-nav">
              <Sidebar caseOpen={caseOpen} />
            </LayoutGroup>
          </aside>
        </div>

        {/* Mobile top bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-surface/80 px-4 backdrop-blur lg:hidden">
          <span className="text-ui font-medium">{site.name}</span>
          <button
            type="button"
            onClick={() => setOpenPath(pathname)}
            className={`-mr-2 p-2 ${navItem}`}
            aria-label="Open navigation"
            aria-expanded={mobileOpen}
          >
            <Menu className="size-5" />
          </button>
        </header>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={close}
              />
              <motion.aside
                className="fixed inset-y-sidebar-inset left-sidebar-inset z-50 w-sidebar max-w-[85vw] overflow-hidden rounded-sidebar border border-border bg-surface shadow-sidebar lg:hidden"
                initial={{ x: "-110%" }}
                animate={{ x: 0 }}
                exit={{ x: "-110%" }}
                transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              >
                <button
                  type="button"
                  onClick={close}
                  className={`absolute top-3 right-3 p-2 ${navItem}`}
                  aria-label="Close navigation"
                >
                  <X className="size-5" />
                </button>
                <LayoutGroup id="mobile-nav">
                  <Sidebar caseOpen={caseOpen} />
                </LayoutGroup>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        <motion.main
          className="lg:pl-sidebar-offset"
          initial={false}
          animate={{ opacity: isLeaving ? 0 : 1 }}
          // Fade out on exit; snap back instantly so the new page's own fade-in shows.
          transition={{ duration: isLeaving ? 0.2 : 0, ease: "easeIn" }}
          onAnimationComplete={() => {
            if (isLeaving && leaving) router.push(leaving.to);
          }}
        >
          <div className="mx-auto max-w-content px-4 py-10 sm:px-8 lg:py-16">
            {children}
          </div>
        </motion.main>
      </div>
    </MotionConfig>
  );
}
