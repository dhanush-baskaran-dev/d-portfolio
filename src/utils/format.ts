/** Formatting helpers shared across sections. No component formats inline. */

const MONTH_YEAR = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** `"2025-11-18"` → `"Nov 2025"`. Fixed to UTC so server and client agree. */
export function formatMonthYear(isoDate: string): string {
  return MONTH_YEAR.format(new Date(`${isoDate}T00:00:00Z`));
}

/** `11` → `"11 min read"`. The unit lives here, not in a section. */
export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}

/** `40`, `"+"` → `"40+"`. Keeps the suffix out of the count-up animation. */
export function formatStat(value: number, suffix: string): string {
  return `${value}${suffix}`;
}

/** Zero-pads a gutter line number so the editor gutter never reflows. */
export function formatLineNumber(index: number, total: number): string {
  return String(index + 1).padStart(String(total).length, "0");
}

/**
 * Fills `{token}` placeholders in a data string, so copy containing runtime
 * values (`"Testimonial {current} of {total}"`) still lives entirely in `data/`.
 */
export function interpolate(
  template: string,
  values: Readonly<Record<string, string | number>>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => {
    const value = values[key];
    return value === undefined ? match : String(value);
  });
}

/**
 * Small stable string hash. Used to pick a deterministic placeholder gradient
 * so the same media box looks identical on the server and the client.
 */
export function hashString(value: string): number {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return Math.abs(hash);
}
