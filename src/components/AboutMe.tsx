import { Fragment } from "react";
import { site } from "@/content/site";

// Renders **text** as bold; everything else as-is.
function withBold(line: string) {
  return line
    .split("**")
    .map((part, i) => (i % 2 === 1 ? <strong key={i} className="font-semibold text-foreground">{part}</strong> : part));
}

export function AboutMe({ className = "" }: { className?: string }) {
  return (
    <p className={`leading-relaxed text-muted ${className}`}>
      {site.about.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {withBold(line)}
        </Fragment>
      ))}
    </p>
  );
}
