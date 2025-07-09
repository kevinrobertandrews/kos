import { subscribe, publish } from "@lib/pubsub";

type FlowValue<T> = {
  value: T;
  ttl?: number;
  expiresAt?: number;
};

const state = new Map<string, FlowValue<any>>();

export function set<T>(key: string, value: T, ttl?: number) {
  const expiresAt = ttl ? Date.now() + ttl : undefined;
  const entry: FlowValue<T> = { value, ttl, expiresAt };
  state.set(key, entry);
  publish(`stateflow:${key}`, value);
}

export function get<T>(key: string): T | undefined {
  const entry = state.get(key);
  if (!entry) return undefined;

  if (entry.expiresAt && Date.now() > entry.expiresAt) {
    state.delete(key);
    publish(`stateflow:${key}`, undefined);
    return undefined;
  }

  return entry.value;
}

export function watch<T>(key: string, callback: (value: T) => void) {
  subscribe(`stateflow:${key}`, callback);
  const current = get<T>(key);
  if (current !== undefined) callback(current);
}

export function keys(): string[] {
  return Array.from(state.keys());
}

export function snapshot(): Record<string, any> {
  const out: Record<string, any> = {};
  for (const [key, entry] of state.entries()) {
    out[key] = entry.value;
  }
  return out;
}
