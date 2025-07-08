import { Commands } from "./commands";
import { LifeState } from "./state";

export type CommandHandler = (state: LifeState, args: string[]) => void;

export function show_status(state: LifeState): void {
  console.log("");
  console.log(
    `water   ${state.water.level.toFixed(2)} · ${state.water.since.toFixed(2)}h`
  );
  console.log(
    `fuel    ${state.fuel.level.toFixed(2)} · ${state.fuel.since.toFixed(2)}h`
  );
  console.log("");
  console.log(`chores  ${state.chores.count} today`);

  console.log("");
  console.log("placeholder status text...");
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
    fuel: { ...state.fuel, level: 1.0 },
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
    chores: { count: state.chores.count + 1 },
  };
}

export function command_not_found(state: LifeState, args: string[]) {
  console.log("command not found");
}

export const handlers: Record<
  string,
  (state: LifeState, args: string[]) => void
> = {
  [Commands.Status.name]: show_status,
  [Commands.Water.name]: drink_water,
  [Commands.Fuel.name]: eat_meal, // optional if not implemented yet
  [Commands.Chore.name]: log_chore,
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
