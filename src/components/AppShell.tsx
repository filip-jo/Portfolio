"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { site } from "@/content/site";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [openPath, setOpenPath] = useState<string | null>(null);
  const pathname = usePathname();
  // The drawer is only open on the page it was opened from, so navigating closes it.
  const mobileOpen = openPath === pathname;
  const close = () => setOpenPath(null);

  return (
    <div className="min-h-dvh">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-sidebar-inset left-sidebar-inset hidden w-sidebar overflow-hidden rounded-sidebar border border-border bg-surface shadow-sidebar lg:block">
        {/* Separate layout groups so the two sidebars' active highlights don't animate between each other. */}
        <LayoutGroup id="desktop-nav">
          <Sidebar />
        </LayoutGroup>
      </aside>

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
                <Sidebar />
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
