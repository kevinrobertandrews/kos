import time from "@lib/time";

export function log(...message: any[]) {
  console.log(...message);
}

export function debug(...message: any[]) {
  console.log("[ DEBUG ]", time.hhmm(), ...message);
}

export function info(...message: any[]) {
  console.log("[ INFO ]", ...message);
}

export function warn(...message: any[]) {
  console.log("[ WARN ]", ...message);
}

export default {
  log,
  debug,
  info,
  warn,
};
