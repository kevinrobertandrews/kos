import { handlers } from "./handlers";
import { writeLog } from "./log";
import { reconstructState } from "./state";

export function routeCommand(command: string, args: string[]) {
  writeLog(command, args);

  const state = reconstructState();
  const handler = handlers[command] ?? handlers.default;

  handler(state, args);
}
