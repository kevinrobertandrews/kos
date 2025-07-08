import { FUEL_DECAY, WATER_DECAY } from "../config";
import { readLogs } from "./log";

export type Stat = {
  level: number; // from 0 to 1
  lastUpdated: string; // ISO timestamp
};

export type LifeState = {
  water: Stat;
  fuel: Stat;
  chores: {
    count: number; // number of chores done in a day
    lastReset: string;
  };
  // mood, rest, energy can be added later
};

const DECAY_RATE = {
  water: WATER_DECAY,
  fuel: FUEL_DECAY,
};

function decayLevel(level: number, hoursElapsed: number, rate: number): number {
  return Math.max(0, level - hoursElapsed * rate);
}

export function reduce(): LifeState {
  const logs = readLogs();

  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  let state: LifeState = {
    water: { level: 0, lastUpdated: "" },
    fuel: { level: 0, lastUpdated: "" },
    chores: { count: 0, lastReset: today },
  };

  for (const log of logs) {
    const timestamp = new Date(log.timestamp).toISOString();
    const now = new Date(log.timestamp).getTime();

    // For each relevant stat, decay it to current log time
    for (const statKey of ["water", "fuel"] as const) {
      const prev = new Date(
        state[statKey].lastUpdated || log.timestamp
      ).getTime();
      const hours = (now - prev) / (1000 * 60 * 60);
      state[statKey].level = decayLevel(
        state[statKey].level,
        hours,
        DECAY_RATE[statKey]
      );
      state[statKey].lastUpdated = timestamp;
    }

    if (log.command === "chore") {
      const logDate = log.timestamp.slice(0, 10);
      if (logDate !== state.chores.lastReset) {
        state.chores.count = 0; // reset count
        state.chores.lastReset = logDate;
      }

      state.chores.count += 1;
    }

    // Apply effects
    if (log.command === "water") {
      state.water.level = Math.min(1, state.water.level + 1);
    } else if (log.command === "fuel") {
      state.fuel.level = 1;
    }
  }

  return state;
}
