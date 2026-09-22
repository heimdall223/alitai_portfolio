/**
 * Join Astro `base` with a root-absolute path from content (e.g. `/images/...`).
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  if (!path) return base;
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${normalized}`;
}
