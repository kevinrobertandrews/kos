export function createState<T>(initial: T) {
  let value = initial;
  const listeners = new Set<(val: T) => void>();

  return {
    get: () => value,
    set: (next: T) => {
      value = next;
      listeners.forEach((fn) => fn(value));
    },
    subscribe: (fn: (val: T) => void) => {
      listeners.add(fn);
      fn(value); // trigger immediately
      return () => listeners.delete(fn);
    },
  };
}

export function withHistory<T>(state: ReturnType<typeof createState<T>>) {
  const history: T[] = [state.get()];
  let index = 0;

  return {
    ...state,
    set: (next: T) => {
      // Truncate future
      history.splice(index + 1);
      history.push(next);
      index++;
      state.set(next);
    },
    undo: () => {
      if (index > 0) {
        index--;
        state.set(history[index]);
      }
    },
    redo: () => {
      if (index < history.length - 1) {
        index++;
        state.set(history[index]);
      }
    },
    history: () => [...history],
    at: () => index,
  };
}

/*

Example

import { createState } from "@lib/state";
import { withHistory } from "@lib/state";
import { log } from "@lib/logger";

const mood = withHistory(createState("😐"));

mood.subscribe((val) => log(`🧠 Mood: ${val}`));

mood.set("🙂");
mood.set("😠");
mood.undo(); // back to 🙂
mood.set("🤯");
mood.undo(); // back to 🙂
mood.redo(); // forward to 🤯

*/
