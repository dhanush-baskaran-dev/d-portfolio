/**
 * Conditional class composition.
 *
 * Deliberately dependency-free: SPEC §1 forbids adding packages that are not in
 * the pinned stack, and every primitive in `components/ui` takes its variation
 * through props rather than through overriding utilities, so a Tailwind class
 * *merger* is not needed — only a joiner that understands falsy values, arrays
 * and condition maps.
 */

export type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | readonly ClassValue[]
  | { readonly [key: string]: boolean | null | undefined };

function push(target: string[], value: ClassValue): void {
  if (value === null || value === undefined || value === false || value === "") {
    return;
  }

  if (typeof value === "string") {
    target.push(value);
    return;
  }

  if (typeof value === "number") {
    target.push(String(value));
    return;
  }

  if (Array.isArray(value)) {
    for (const entry of value) {
      push(target, entry);
    }
    return;
  }

  for (const [key, enabled] of Object.entries(value)) {
    if (enabled) {
      target.push(key);
    }
  }
}

export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    push(classes, input);
  }

  return classes.join(" ");
}
