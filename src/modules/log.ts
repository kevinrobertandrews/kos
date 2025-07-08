// Log handles saving data to disk

import fs from "fs";
import path from "path";
import { Commands } from "./commands";
import disk from "../lib/disk";
import { handlers } from "./handlers";
import time from "../lib/time";
import json from "../lib/json";

const dataDir = "../data";
const logPath = path.join(dataDir, "log.jsonl");

disk.mkdir(dataDir);

export function log(command: string, args: string[]) {
  if (handlers[command] == undefined) {
    return; // command not found, no op
  }

  if (command == Commands.Status.name || command == undefined) {
    return; // not adding state, don't add to log
  }

  const entry = {
    timestamp: time.timestamp(),
    command,
    args,
  };

  const line = json.format(entry);
  disk.save(logPath, line);
}

type Log = {
  timestamp: string;
  command: string;
  args: string[];
};

export function readLogs(): Array<Log> {
  if (!disk.exists(logPath)) return []; // fail if no path

  const lines = fs.readFileSync(logPath, "utf-8").split("\n").filter(Boolean);
  return lines.map((line) => JSON.parse(line));
}
