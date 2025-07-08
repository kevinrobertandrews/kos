#!/usr/bin/env node

import { getCommand } from "./lib/index";
import { Command } from "./types/models";

const { command, args } = getCommand();

if (command == Command.Water) {
  console.log("water");
}

if (command == Command.Fuel) {
  console.log("fuel");
}

if (command == Command.Status) {
  console.log("status");
}

// hiaasdfsa
