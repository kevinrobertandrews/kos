import random from "@lib/random";

/**
 * Create a deck
 */
export function deck<T>(array: T[]): {
  cards: T[];
  draw: () => T;
  list: () => T[];
} {
  return {
    cards: array,
    draw: () => {
      return random.pick(array);
    },
    list: () => {
      return array.map((card) => card);
    },
  };
}
