/**
 * Create an event object
 */
export function event(name: string): {
  name: string;
  emit: () => void;
  on: () => void;
} {
  return {
    name,
    emit: () => {},
    on: () => {},
  };
}
