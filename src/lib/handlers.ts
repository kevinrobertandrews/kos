import { Command } from "./commands";
import { LifeState } from "./state";

export type CommandHandler = (state: LifeState, args: string[]) => void;

function showStatus(state: LifeState): void {
  console.log("");
  console.log(`💧 water  : ${state.water.level.toFixed(2)}`);
  console.log(`🍖 fuel   : ${state.fuel.level.toFixed(2)}`);
  console.log(`🧹 chores : ${state.chores.count} today\n`);
}

export function drink_water(state: LifeState) {
  console.log("watering...");
  return {
    ...state,
    water: { ...state.water, level: 1.0 },
  };
}

export function eatMeal() {
  console.log("eating...");
}

export function doChore(state: LifeState, args: string[]) {
  if (args.length === 0) {
    console.error(
      '❌ Chore requires a description.\nUsage: kos chore "wash dishes"'
    );
    process.exit(1);
  }

  const choreName = args.join(" ") || "Chore";
  console.log(`🧹 Logged: ${choreName}`);
}

export function commandNameNotFound() {
  console.log("command name not found");
  process.exit(1);
}

export const handlers: Record<
  string,
  (state: LifeState, args: string[]) => void
> = {
  [Command.Status.name]: showStatus,
  [Command.Water.name]: drink_water,
  [Command.Fuel.name]: eatMeal, // optional if not implemented yet
  [Command.Chore.name]: doChore,
  default: commandNameNotFound,
};
