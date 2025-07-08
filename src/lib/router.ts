import { handlers } from "./handlers";
import { log } from "./log";
import { reduce } from "./state";

export function router(command: string, args: string[]) {
  // take command with arguments and timestamp to a log
  log(command, args);
  // build state from log entries
  const state = reduce();
  // tee-up a handler to consume command and args
  const handler = handlers[command] ?? handlers.default;
  // execute
  handler(state, args);
}
