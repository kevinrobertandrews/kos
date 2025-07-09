/**
 * Converts a string to Title Case, capitalizing the first letter of each word and making the rest lowercase.
 */
export function toTitleCase(input: string): string {
  return input
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
