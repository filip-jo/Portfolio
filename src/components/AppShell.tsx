"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { isCasePath } from "@/content/projects";
import { site } from "@/content/site";

const ease = [0.22, 1, 0.36, 1] as const;

// Height of an element, kept up to date as it resizes.
function useHeight(ref: React.RefObject<HTMLElement | null>) {
  const [height, setHeight] = useState<number>();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(() => setHeight(el.clientHeight));
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return height;
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [openPath, setOpenPath] = useState<string | null>(null);
  const pathname = usePathname();
  // The drawer is only open on the page it was opened from, so navigating closes it.
  const mobileOpen = openPath === pathname;
  const close = () => setOpenPath(null);

  // On a case page the sidebar shows the short bio and case list and fills
  // the screen height; on the overview it shrinks to fit its content. When
  // leaving a case, those fade out first and only then does the sidebar shrink.
  const caseOpen = isCasePath(pathname);
  const [bioPresent, setBioPresent] = useState(caseOpen);
  if (caseOpen && !bioPresent) setBioPresent(true);
  const expanded = caseOpen || bioPresent;

  const trackRef = useRef<HTMLDivElement>(null);
  const trackHeight = useHeight(trackRef);

  return (
    <div className="min-h-dvh">
      {/* Desktop sidebar: the track spans the screen height, the panel inside
          is as tall as its content (vertically centred) or, while a case is
          open, the whole track. */}
      <div
        ref={trackRef}
        className="pointer-events-none fixed inset-y-sidebar-inset left-sidebar-inset hidden w-sidebar flex-col justify-center lg:flex"
      >
        <motion.aside
          initial={false}
          animate={{ height: expanded ? (trackHeight ?? "100%") : "auto" }}
          transition={{ duration: 0.5, ease }}
          className="pointer-events-auto max-h-full overflow-hidden rounded-sidebar border border-border bg-surface shadow-sidebar"
        >
          {/* Separate layout groups so the two sidebars' case highlights don't animate between each other. */}
          <LayoutGroup id="desktop-nav">
            <Sidebar caseOpen={caseOpen} onCaseContentHidden={() => setBioPresent(false)} />
          </LayoutGroup>
        </motion.aside>
      </div>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-surface/80 px-4 backdrop-blur lg:hidden">
        <span className="text-ui font-medium">{site.name}</span>
        <button
          type="button"
          onClick={() => setOpenPath(pathname)}
          className="-mr-2 rounded-md p-2 text-muted hover:bg-surface-hover hover:text-foreground"
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
                className="absolute top-3 right-3 rounded-md p-2 text-muted hover:bg-surface-hover hover:text-foreground"
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

      <main className="lg:pl-sidebar-offset">
        <div className="mx-auto max-w-content px-4 py-10 sm:px-8 lg:py-16">
          {children}
        </div>
      </main>
    </div>
  );
}
