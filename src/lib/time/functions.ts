import { formatDistance } from "date-fns";

/**
 * Get the current date formatted as YYYY-MM-DD.
 *
 * @returns {string} The date in YYYY-MM-DD format (e.g., "2025-07-09").
 */
export function YYYYMMDD(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Get the current time in 24-hour clock format.
 *
 * @returns {string} Time in 24-hour format (e.g., "14:05").
 */
export function hhmm(): string {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

/**
 * Get the number of hours since a given timestamp.
 *
 * @param {string} timestamp - An ISO or parsable date string.
 * @returns {number} Hours since the given timestamp, as a decimal.
 */
export function since(timestamp: string): number {
  const time = new Date(timestamp).getTime();
  const now = new Date().getTime();
  const diff = now - time;
  const hours = diff / 1000 / 60 / 60;
  return hours;
}

/**
 * Get the current timestamp in ISO format.
 *
 * @returns {string} The current timestamp (e.g., "2025-07-09T14:05:00.000Z").
 */
export function timestamp(): string {
  return new Date().toISOString();
}

/**
 * Get the current time in 12-hour clock format with AM/PM.
 *
 * @returns {string} Time in 12-hour format (e.g., "09:45 PM").
 */
export function ampm(): string {
  const now = new Date();
  const hours = now.getHours();
  const suffix = hours >= 12 ? "PM" : "AM";
  const hour12 = (hours % 12 || 12).toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hour12}:${minutes} ${suffix}`;
}

/**
 * Get the current local time in 24-hour format with time zone.
 *
 * @returns {string} Time in 24-hour format with time zone (e.g., "14:45 EDT").
 */
export function hhmmTz(): string {
  return new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZoneName: "short",
  });
}

/**
 * Get the current date in a long-form format with ordinal suffix.
 *
 * @returns {string} Long-form date with ordinal (e.g., "Tuesday, July 9th, 2025").
 */
export function longDateWithOrdinal(): string {
  const now = new Date();
  const day = now.getDate();
  const year = now.getFullYear();
  const weekday = now.toLocaleString("en-US", { weekday: "long" });
  const month = now.toLocaleString("en-US", { month: "long" });

  const getOrdinal = (n: number): string => {
    if (n >= 11 && n <= 13) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${weekday}, ${month} ${day}${getOrdinal(day)}, ${year}`;
}

/**
 * Get the current date in a long-form format without ordinal.
 *
 * @returns {string} Long-form date (e.g., "Tuesday, July 9, 2025").
 */
export function longDate(): string {
  const now = new Date();
  const day = now.getDate();
  const year = now.getFullYear();
  const weekday = now.toLocaleString("en-US", { weekday: "long" });
  const month = now.toLocaleString("en-US", { month: "long" });

  return `${weekday}, ${month} ${day}, ${year}`;
}

/**
 * Get the time remaining until a given timestamp.
 *
 * @param {Date} timestamp - Future date to compare.
 * @param {"seconds" | "hours"} [measure="hours"] - Unit of time to return.
 * @returns {number} Time until the given date, rounded to two decimals.
 */
export function until(
  timestamp: Date,
  measure: "seconds" | "hours" = "hours"
): number {
  const then = new Date(timestamp).getTime();
  const now = Date.now();
  const deltaMs = then - now;

  const units = {
    seconds: 1000,
    hours: 1000 * 60 * 60,
  };

  return +(deltaMs / units[measure]).toFixed(2);
}

/**
 * Get a Date object representing midnight.
 *
 * @param {boolean} [prev=false] - If true, returns today at midnight; else next midnight.
 * @returns {Date} Date object set to midnight.
 */
export function midnight(prev: boolean = false): Date {
  const now = new Date();
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + (prev ? 0 : 1),
    0,
    0,
    0,
    0
  );
}
/**
 * Get a Date object representing today's bedtime (6:00 PM).
 *
 * @returns {Date} Date object set to 18:00.
 */
export function bedtime(): Date {
  const now = new Date();
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    18,
    0,
    0,
    0
  );
}

/**
 * Get the current local time as a Date object.
 *
 * @returns {Date} The current local time.
 */
export function now(): Date {
  return new Date();
}

/**
 * Get the distance between two dates in human-readable format.
 *
 * @param {Date} from - Start time.
 * @param {Date} to - End time.
 * @returns {string} Human-readable time distance (e.g., "about 3 hours").
 */
export function between(from: Date, to: Date): string {
  return formatDistance(to, from);
}

/**
 * Check if a given timestamp falls on today's date (local time).
 *
 * @param {string | number | Date} input - Date to check.
 * @returns {boolean} True if the input is today.
 */
export function isToday(input: string | number | Date): boolean {
  const now = new Date();
  const date = new Date(input);

  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
}

/**
 * Check if a given timestamp falls on today's date (UTC).
 *
 * @param {string | number | Date} input - Date to check.
 * @returns {boolean} True if the input is today in UTC.
 */
export function isTodayUTC(input: string | number | Date): boolean {
  const date = new Date(input);
  const now = new Date();

  return (
    date.getUTCFullYear() === now.getUTCFullYear() &&
    date.getUTCMonth() === now.getUTCMonth() &&
    date.getUTCDate() === now.getUTCDate()
  );
}
