#!/usr/bin/env node

import { getCommand } from "./lib/commands";
import { routeCommand } from "./lib/router";

const { command, args } = getCommand();

function main() {
  routeCommand(command, args);
}

main();
