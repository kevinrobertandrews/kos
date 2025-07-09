/**
 * Checks if a given lat/lon coordinate falls within a rectangular bounding box.
 */
export function isWithinBoundingBox(
  lat: number,
  lon: number,
  bounds: { north: number; south: number; east: number; west: number }
): boolean {
  return (
    lat <= bounds.north &&
    lat >= bounds.south &&
    lon <= bounds.east &&
    lon >= bounds.west
  );
}
