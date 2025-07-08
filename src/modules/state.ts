import { L } from "vitest/dist/chunks/reporters.d.BFLkQcL6";
import time from "../lib/time";
import config from "../modules/config";
import { Commands } from "./commands";
import { readLogs } from "./log";

export type LifeState = {
  water: {
    level: number; // 0.0 - 1.0
    since: number; // hours ago since last update
  };
  fuel: {
    level: number; // 0.0 - 1.0
    lastUpdated: string;
  };
  chores: {
    count: number; // number of chores done in a day
    lastReset: string;
  };
  // bank: {};
  // sleep: {};
  // fit: {};
  // mood: {};
  // music: {};
  // career: {};
  // love: {};
  // read: {};
};

const DECAY_RATE = {
  water: config.WATER_DECAY,
  fuel: config.FUEL_DECAY,
};

function decayLevel(level: number, hoursElapsed: number, rate: number): number {
  return Math.max(0, level - hoursElapsed * rate);
}

export function reduce(logs?: any[]): LifeState {
  let state: LifeState = {
    water: {
      level: 0,
      since: 0,
    },
    fuel: {
      level: 0,
      lastUpdated: "",
    },
    chores: {
      count: 0,
      lastReset: "",
    },
  };

  const entries = readLogs();

  for (const log of entries) {
    if (log.command == Commands.Water.name) {
      state.water.level = Math.max(1 - time.since(log.timestamp), 0);
      state.water.since = time.since(log.timestamp);
    }
  }

  return state;

  // for (const log of entries) {
  //   const timestamp = new Date(log.timestamp).toISOString();
  //   const now = new Date(log.timestamp).getTime();

  //   // For each relevant stat, decay it to current log time
  //   for (const statKey of ["water", "fuel"] as const) {
  //     const prev = new Date(
  //       state[statKey].lastUpdated || log.timestamp
  //     ).getTime();
  //     const hours = (now - prev) / (1000 * 60 * 60);
  //     state[statKey].level = decayLevel(
  //       state[statKey].level,
  //       hours,
  //       DECAY_RATE[statKey]
  //     );
  //     state[statKey].lastUpdated = timestamp;
  //   }

  //   // count chores
  //   if (log.command === "chore") {
  //     const logDate = log.timestamp.slice(0, 10);
  //     if (logDate !== state.chores.lastReset) {
  //       state.chores.count = 0; // reset count
  //       state.chores.lastReset = logDate;
  //     }

  //     state.chores.count += 1;
  //   }

  //   // Apply effects
  //   if (log.command === "water") {
  //     state.water.level = Math.min(1, state.water.level + 1);
  //   } else if (log.command === "fuel") {
  //     state.fuel.level = 1;
  //   }
  // }

  // return state;
}
