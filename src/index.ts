#!/usr/bin/env node

import terminal from "./lib/terminal";
import router from "./modules/router";

const { command, args } = terminal.getCommandLineArguments();

function main() {
  router.route(command, args);
}

main();
