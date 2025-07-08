#!/usr/bin/env node

import { getCommand } from "./lib/index";
import { routeCommand } from "./router";
import { Command } from "./types/models";

const { command, args } = getCommand();

function main() {
  routeCommand(command, args);
}

main();
