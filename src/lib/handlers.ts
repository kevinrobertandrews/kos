import { Command } from "./commands";
import { LifeState } from "./state";

export type CommandHandler = (state: LifeState, args: string[]) => void;

function showStatus(state: LifeState): void {
  console.log(`💧 water : ${state.water.level.toFixed(2)}`);
  console.log(`🍖 fuel  : ${state.fuel.level.toFixed(2)}\n`);
}

function drinkWater() {
  console.log("watering...");
}

function eatMeal() {
  console.log("eating...");
}

export const handlers: Record<
  string,
  (state: LifeState, args: string[]) => void
> = {
  [Command.Status.name]: showStatus,
  [Command.Water.name]: drinkWater,
  [Command.Fuel?.name ?? "fuel"]: eatMeal, // optional if not implemented yet
  default: showStatus,
};
