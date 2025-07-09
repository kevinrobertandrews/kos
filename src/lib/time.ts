import { formatDistance } from "date-fns";

export default {
  YYYYMMDD: () => new Date().toISOString().slice(0, 10),
  hhmm: () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  },
  since: (timestamp: string): number => {
    const time = new Date(timestamp).getTime();
    const now = new Date().getTime();
    const diff = now - time;
    const hours = diff / 1000 / 60 / 60;
    return hours;
  },
  timestamp: () => new Date().toISOString(),
  ampm: () => {
    const now = new Date();
    const hours = now.getHours();
    const suffix = hours >= 12 ? "PM" : "AM";
    const hour12 = (hours % 12 || 12).toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hour12}:${minutes} ${suffix}`;
  },
  hhmmTz: () => {
    return new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
  },
  longDateWithOrdinal: () => {
    const now = new Date();

    const day = now.getDate();
    const year = now.getFullYear();
    const weekday = now.toLocaleString("en-US", { weekday: "long" });
    const month = now.toLocaleString("en-US", { month: "long" });

    const getOrdinal = (n: number) => {
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
  },
  longDate: () => {
    const now = new Date();

    const day = now.getDate();
    const year = now.getFullYear();
    const weekday = now.toLocaleString("en-US", { weekday: "long" });
    const month = now.toLocaleString("en-US", { month: "long" });

    return `${weekday}, ${month} ${day}, ${year}`;
  },
  until(timestamp: Date, measure: "seconds" | "hours" = "hours"): number {
    const then = new Date(timestamp).getTime();
    const now = Date.now();
    const deltaMs = then - now;

    const units = {
      seconds: 1000,
      hours: 1000 * 60 * 60,
    };

    return +(deltaMs / units[measure]).toFixed(2);
  },
  midnight(prev: boolean = false): Date {
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
  },
  formatDistance(timestamp: Date) {
    return formatDistance(this.midnight(), timestamp);
  },
  isToday(input: string | number | Date): boolean {
    const now = new Date();
    const date = new Date(input);

    return (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  },
  isTodayUTC(input: string | number | Date): boolean {
    const date = new Date(input);
    const now = new Date();

    return (
      date.getUTCFullYear() === now.getUTCFullYear() &&
      date.getUTCMonth() === now.getUTCMonth() &&
      date.getUTCDate() === now.getUTCDate()
    );
  },
};
