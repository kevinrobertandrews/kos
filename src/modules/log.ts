// Log handles saving data to disk

import fs from "fs";
import path from "path";
import { Commands } from "./commands";
import { handlers } from "./handlers/handlers";
import { time, json, disk } from "@lib";
import config from "./config";

const logPath = path.join(__dirname, config.LOG_PATH, config.LOG_FILE);

if (!disk.exists(config.LOG_PATH)) {
  disk.mkdir(config.LOG_PATH);
}

/**
 * Log command and arguments to disk
 */
export function log(command: string, args: string[]): void {
  // guard command not found
  if (handlers[command] == undefined) {
    return;
  }

  // guard adding log to command that doesn't add state
  if (command == Commands.Status.name || command == undefined) {
    return;
  }

  // construct entry log
  const entry = {
    timestamp: time.timestamp(),
    command,
    args,
  };

  // format entry line
  const line = json.format(entry);

  // save log to disk
  disk.save(logPath, line);
}

/**
 * Base Log type
 */
type Log = {
  timestamp: string;
  command: string;
  args: string[];
};

/**
 * Read logs from disk
 */
export function readLogs(): Array<Log> {
  // fail if no path
  if (!disk.exists(config.LOG_PATH)) return [];

  // wut
  const lines = fs
    .readFileSync(config.LOG_PATH + "/" + config.LOG_FILE, "utf-8")
    .split("\n")
    .filter(Boolean);

  // wut
  return lines.map((line) => JSON.parse(line));
}

export default {
  readLogs,
};
