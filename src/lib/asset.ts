// next/link adds the basePath automatically, but plain paths to files in
// public/ (images, PDFs) don't get it, so prefix them here.
export function asset(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
