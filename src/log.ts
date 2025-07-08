// src/log.ts
import fs from "fs";
import path from "path";
import { Command } from "./commands";

const logPath = path.resolve(__dirname, "../data/log.jsonl");

export function writeLog(command: string, args: string[]) {
  if (command == Command.Status.name) {
    return; // don't log passive introspection
  }

  const entry = {
    timestamp: new Date().toISOString(),
    command,
    args,
  };

  const line = JSON.stringify(entry) + "\n";
  fs.appendFileSync(logPath, line, "utf-8");
}

export function readLogs(): Array<{
  timestamp: string;
  command: string;
  args: string[];
}> {
  if (!fs.existsSync(logPath)) return [];

  const lines = fs.readFileSync(logPath, "utf-8").split("\n").filter(Boolean);
  return lines.map((line) => JSON.parse(line));
}
