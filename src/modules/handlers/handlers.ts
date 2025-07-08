import { Commands } from "../commands";
import { LifeState } from "../state";
import {
  chore,
  command_not_found,
  fuel,
  show_status,
  water,
} from "./functions";

/**
 * Record of handlers so we don't have to switch/case
 */
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

/**
 * Helper to return commands and handle edge cases
 */
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
