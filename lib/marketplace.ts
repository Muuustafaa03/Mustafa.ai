/** Fallback when legacy rows have no title (should not happen after migration). */
export function ideaDisplayTitle(item: {
  title?: string | null;
  concept?: string | null;
}): string {
  const t = item.title?.trim();
  if (t) return t;
  const c = item.concept?.trim();
  if (!c) return "Untitled";
  const first = c.split(/\r?\n/).find((line) => line.trim())?.trim() ?? c;
  return first.length > 120 ? `${first.slice(0, 117)}…` : first;
}
