import { getHandler, resolveCommand } from "./handlers/handlers";
import { log } from "./log";
import { reduce } from "./state";

/**
 * Route command to handler
 */
function route(command: string, args: string[]) {
  // take command with arguments and timestamp to a log
  log(resolveCommand(command), args);
  // build state from log entries
  const state = reduce();
  // tee-up a handler to consume command and args
  const handler = getHandler(command);
  // execute
  handler(state, args);
}

export default {
  route,
};
