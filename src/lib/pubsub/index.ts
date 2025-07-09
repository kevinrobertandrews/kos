type Callback = (payload?: any) => void;

const channels: Record<string, Callback[]> = {};

export function subscribe(topic: string, callback: Callback) {
  if (!channels[topic]) channels[topic] = [];
  channels[topic].push(callback);
}

export function publish(topic: string, payload?: any) {
  (channels[topic] || []).forEach((cb) => cb(payload));
}

export default {
  subscribe,
  publish,
};

/*

Example: 

import { subscribe } from "@lib/pubsub";
import { log } from "@lib/logger";

subscribe("alert", (msg) => log(`⚠️  ALERT: ${msg}`));
subscribe("status", (msg) => log(`📟 STATUS: ${msg}`));
subscribe("doomslayer/activated", () =>
  log("💀 Doomguy has entered the arena")
);

import { publish } from "@lib/pubsub";

publish("alert", "The modules are converging");
publish("status", "Location: /src/lab/hellgate.ts");
publish("doomslayer/activated");



*/
