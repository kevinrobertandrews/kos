/**
 * Create a stack.
 * @param initial
 */
export function stack<T>(initial: T[] = []): {
  push: (item: T) => void;
  pop: () => T | undefined;
  peek: () => T | undefined;
  clear: () => void;
  size: () => number;
  toArray: () => T[];
} {
  const items = [...initial];

  return {
    push: (item) => items.push(item),
    pop: () => items.pop(),
    peek: () => items[items.length - 1],
    clear: () => {
      items.length = 0;
    },
    size: () => items.length,
    toArray: () => [...items],
  };
}
