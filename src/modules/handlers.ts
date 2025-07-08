import { Command } from "./commands";
import { LifeState } from "./state";

export type CommandHandler = (state: LifeState, args: string[]) => void;

export function show_status(state: LifeState): void {
  console.log("");
  console.log(`water  : ${state.water.level.toFixed(2)}`);
  console.log(`fuel   : ${state.fuel.level.toFixed(2)}`);
  console.log(`chores : ${state.chores.count} today\n`);
}

export function drink_water(state: LifeState): LifeState {
  return {
    ...state,
    water: { ...state.water, level: 1.0 },
  };
}

export function eat_meal(state: LifeState): LifeState {
  return {
    ...state,
    water: { ...state.fuel, level: 1.0 },
  };
}

export function log_chore(state: LifeState, args: string[]): LifeState {
  if (args.length === 0) {
    console.error(
      '❌ Chore requires a description.\nUsage: kos chore "wash dishes"'
    );
    process.exit(1);
  }

  return {
    ...state,
    chores: { count: 4, lastReset: "" },
  };
}

export function command_not_found(state: LifeState, args: string[]) {
  console.log("command not found");
}

export const handlers: Record<
  string,
  (state: LifeState, args: string[]) => void
> = {
  [Command.Status.name]: show_status,
  [Command.Water.name]: drink_water,
  [Command.Fuel.name]: eat_meal, // optional if not implemented yet
  [Command.Chore.name]: log_chore,
  default: command_not_found,
};

export function getHandler(command: string) {
  if (handlers[command]) {
    return handlers[command];
  } else if (command == undefined) {
    return handlers["status"];
  } else {
    return () => {
      console.log("could not find command", command);
    };
  }
}
