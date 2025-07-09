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
    since: number; // hours ago since last update
  };
  chores: {
    count: number; // number of chores done in a day
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

export function reduce(logs?: any[]): LifeState {
  let state: LifeState = {
    water: {
      level: 0,
      since: 0,
    },
    fuel: {
      level: 0,
      since: 0,
    },
    chores: {
      count: 0,
    },
  };

  const entries = readLogs();

  for (const log of entries) {
    // reduce water
    if (log.command == Commands.Water.name) {
      const since = time.since(log.timestamp);
      state.water.level = Math.max(1 - since * config.WATER_DECAY, 0);
      state.water.since = since;
    }

    // reduce fuel
    if (log.command == Commands.Fuel.name) {
      const since = time.since(log.timestamp);
      state.fuel.level = Math.max(1 - since * config.FUEL_DECAY, 0);
      state.fuel.since = since;
    }

    // reduce chores
    if (log.command == Commands.Chore.name) {
      if (time.isToday(log.timestamp)) {
        state.chores.count = state.chores.count + 1;
      }
    }
  }

  return state;
}
