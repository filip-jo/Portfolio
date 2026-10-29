// Shared interaction styles, so every control hovers, presses and focuses the
// same way. Callers add layout and padding; add `group` to animate icons inside.
// Hover only applies with a mouse or trackpad; `active:` repeats it while a
// finger is down, so touch screens get feedback too.

/** Text links and nav items: grey background and darker text on hover. */
export const navItem =
  "rounded-md text-ui text-muted transition-[color,background-color,scale] duration-150 hover:bg-surface-hover hover:text-foreground active:bg-surface-hover active:text-foreground motion-safe:active:scale-[0.98]";

/** Primary buttons: dark fill that turns the highlight blue on hover. */
export const primaryButton =
  "rounded-md bg-foreground text-background transition-[background-color,scale] duration-200 hover:bg-highlight active:bg-highlight motion-safe:active:scale-[0.98]";
