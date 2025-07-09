/**
 * Return a random value from an array
 * @param array
 * @returns a value
 */
export function pick<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}

export default {
  pick,
};
