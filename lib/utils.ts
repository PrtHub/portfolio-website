export type ClassValue = string | false | null | undefined;

/** Joins conditional class names. Keeps JSX readable without pulling in a dependency. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
