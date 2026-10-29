import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-xl">
      <p className="text-label font-medium tracking-wide text-muted uppercase">404</p>
      <h1 className="mt-2 text-display">Page not found</h1>
      <p className="mt-4 text-body text-muted">This page doesn&apos;t exist or has moved.</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-md bg-foreground px-3 py-2 text-ui font-medium text-background hover:opacity-90"
      >
        Back to overview
      </Link>
    </div>
  );
}
