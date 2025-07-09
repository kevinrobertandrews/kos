import { time } from "@lib";
import { LifeState } from "../state";

export function show_status(state: LifeState): void {
  console.clear();
  console.log(time.longDate(), "·", time.hhmm());
  console.log("");
  console.log(
    `water   ${state.water.level.toFixed(2)} · ${state.water.since.toFixed(2)}h`
  );
  console.log(
    `fuel    ${state.fuel.level.toFixed(2)} · ${state.fuel.since.toFixed(2)}h`
  );
  console.log("");
  console.log(`chores  ${state.chores.count}`);

  console.log("");
  console.log(time.between(time.now(), time.bedtime()), "until bedtime");
  // console.log("placeholder status text...");
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

export default {
  show_status,
  chore,
  water,
  fuel,
  command_not_found,
};
