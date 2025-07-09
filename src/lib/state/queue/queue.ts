/**
 * Create a queue.
 */
export function queue<T>(initial: T[] = []): {
  enqueue: (item: T) => void;
  dequeue: () => T | undefined;
  peek: () => T | undefined;
  clear: () => void;
  size: () => number;
  toArray: () => T[];
} {
  const items = [...initial];

  return {
    enqueue: (item) => items.push(item),
    dequeue: () => items.shift(),
    peek: () => items[0],
    clear: () => {
      items.length = 0;
    },
    size: () => items.length,
    toArray: () => [...items],
  };
}
