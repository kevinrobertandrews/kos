// Log handles saving data to disk

import fs from "fs";
import path from "path";
import { Commands } from "./commands";
import { handlers } from "./handlers/handlers";
import { time, json, disk } from "@lib";

const dataDir = "../data";
const logPath = path.join(dataDir, "log.jsonl");

disk.mkdir(dataDir);

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
  if (!disk.exists(logPath)) return [];

  // wut
  const lines = fs.readFileSync(logPath, "utf-8").split("\n").filter(Boolean);

  // wut
  return lines.map((line) => JSON.parse(line));
}
