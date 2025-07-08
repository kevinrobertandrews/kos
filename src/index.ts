#!/usr/bin/env node

import { getCommand } from "./lib/commands";
import { router } from "./lib/router";

const { command, args } = getCommand();

function main() {
  router(command, args);
}

main();
