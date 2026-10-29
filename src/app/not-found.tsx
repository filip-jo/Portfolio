import Link from "next/link";
import { primaryButton } from "@/lib/ui";

export default function NotFound() {
  return (
    <div className="max-w-xl">
      <p className="text-label font-medium text-muted">404</p>
      <h1 className="mt-2 text-display">Page not found</h1>
      <p className="mt-4 text-body text-muted">This page doesn&apos;t exist or has moved.</p>
      <Link
        href="/"
        className={`mt-6 inline-block px-3 py-2 text-ui font-medium ${primaryButton}`}
      >
        Back to overview
      </Link>
    </div>
  );
}
