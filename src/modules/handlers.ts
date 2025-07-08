import { Commands } from "./commands";
import { LifeState } from "./state";

const aliases: Record<string, string> = {
  eat: Commands.Fuel.name,
  food: Commands.Fuel.name,
  drink: Commands.Water.name,
  hydrate: Commands.Water.name,
} satisfies Record<string, string>;

export function resolveCommand(input: string): string {
  return aliases[input] ?? input;
}

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

export function water(state: LifeState): LifeState {
  console.log("adding hydration to log...");
  return {
    ...state,
    water: { level: 1.0, since: state.water.since },
  };
}

export function fuel(state: LifeState): LifeState {
  console.log("adding meal to log...");
  return {
    ...state,
    fuel: { level: 1.0, since: state.fuel.since },
  };
}

export function chore(state: LifeState, args: string[]): LifeState {
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

export function command_not_found() {
  console.log("command not found");
}

export const handlers: Record<
  string,
  (state: LifeState, args: string[]) => void
> = {
  [Commands.Status.name]: show_status,
  [Commands.Water.name]: water,
  ["drink"]: water,
  ["hydrate"]: water,
  [Commands.Fuel.name]: fuel,
  ["eat"]: fuel,
  ["meal"]: fuel,
  [Commands.Chore.name]: chore,
  default: command_not_found,
};

export function getHandler(command: string) {
  if (handlers[command]) {
    return handlers[command];
  } else if (command == undefined) {
    return handlers["status"];
  } else {
    return () => {
      // console.log("could not find command", command);
      // no op??
    };
  }
}
