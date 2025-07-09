/**
 * Deep clone an object and handle edge cases.
 *
 * @param value
 * @returns an object
 */
export function clone<T>(value: T): T {
  if (value === null || typeof value !== "object") return value;

  if (value instanceof Date) return new Date(value.getTime()) as any;
  if (value instanceof RegExp)
    return new RegExp(value.source, value.flags) as any;
  if (value instanceof Map)
    return new Map(
      [...value.entries()].map(([k, v]) => [clone(k), clone(v)])
    ) as any;
  if (value instanceof Set) return new Set([...value].map(clone)) as any;

  if (Array.isArray(value)) return value.map(clone) as any;

  const result: any = {};
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      result[key] = clone((value as any)[key]);
    }
  }

  return result;
}
