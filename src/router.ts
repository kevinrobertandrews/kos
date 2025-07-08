import { Command } from "./commands";
import { readLogs, writeLog } from "./log";

export function routeCommand(command: string, args: string[]) {
  writeLog(command, args);

  switch (command) {
    case Command.Status.name:
      const logs = readLogs();
      console.log("📚 Recent logs:");
      logs.slice(-5).forEach((entry) => {
        console.log(
          `${entry.timestamp} — ${entry.command} ${entry.args.join(" ")}`
        );
      });
      return;
    case Command.Water.name:
      return console.log("💧 water...");
    case Command.Fuel.name:
      return console.log("🍖 fuel...");
    default:
      return console.log(`❓ Unknown command: ${command}`);
  }
}
