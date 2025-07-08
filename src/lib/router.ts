// Router takes in commands and finds a handler to execute

import { Command } from "./commands";
import { writeLog } from "./log";
import { reconstructState } from "./state";

export function routeCommand(command: string, args: string[]) {
  writeLog(command, args);

  switch (command) {
    case Command.Status.name:
      const state = reconstructState();
      console.log("\n🌡️  Current State:");
      console.log(`💧 Water  : ${state.water.level.toFixed(2)}`);
      console.log(`🍽️  Hunger : ${state.fuel.level.toFixed(2)}\n`);
      return;
    case Command.Water.name:
      return console.log("💧 water...");
    case Command.Fuel.name:
      return console.log("🍖 fuel...");
    default:
      return console.log(`❓ Unknown command: ${command}`);
  }
}
