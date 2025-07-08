#!/usr/bin/env node

import { terminal } from "@lib";
import { router } from "@modules";

const { command, args } = terminal.getCommandLineArguments();

function main() {
  router.route(command, args);
}

main();
