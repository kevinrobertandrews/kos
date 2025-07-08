#!/usr/bin/env node

import { getCommand } from "./modules/commands";
import { router } from "./modules/router";

const { command, args } = getCommand();

function main() {
  router(command, args);
}

main();
