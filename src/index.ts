#!/usr/bin/env node

import { getCommand } from "./commands";
import { routeCommand } from "./router";

const { command, args } = getCommand();

function main() {
  routeCommand(command, args);
}

main();
