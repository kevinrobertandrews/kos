#!/usr/bin/env node

import { getCommand, parseArgs } from "./lib/index";

const { command, args } = getCommand();

if (command == "water") {
  console.log("water");
}

if (command == "fuel") {
  console.log("fuel");
}

if (command == "status") {
  console.log("status");
}

// hiaasdfsa
