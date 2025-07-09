import { describe, it, expect } from "vitest";
import time from "./index";

describe("time module", () => {
  it("YYYYMMDD returns ISO date", () => {
    const result = time.YYYYMMDD();
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("hhmm returns time in hh:mm format", () => {
    const result = time.hhmm();
    expect(result).toMatch(/^\d{2}:\d{2}$/);
  });

  it("timestamp returns full ISO string", () => {
    const result = time.timestamp();
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it("ampm returns 12-hour time with AM/PM", () => {
    const result = time.ampm();
    expect(result).toMatch(/^\d{2}:\d{2} (AM|PM)$/);
  });

  it("hhmmTz includes time and timezone", () => {
    const result = time.hhmmTz();
    expect(result).toMatch(/^\d{2}:\d{2} [A-Z]+$/);
  });

  it("longDateWithOrdinal includes day suffix", () => {
    const result = time.longDateWithOrdinal();
    expect(result).toMatch(/^\w+, \w+ \d{1,2}(st|nd|rd|th), \d{4}$/);
  });

  it("longDate matches expected format", () => {
    const result = time.longDate();
    expect(result).toMatch(/^\w+, \w+ \d{1,2}, \d{4}$/);
  });

  it("since returns number of hours since timestamp", () => {
    const threeHoursAgo = new Date(Date.now() - 3 * 3600 * 1000).toISOString();
    const hours = time.since(threeHoursAgo);
    expect(hours).toBeGreaterThan(2.9);
    expect(hours).toBeLessThan(3.1);
  });

  it("until returns time until future timestamp", () => {
    const oneHourFromNow = new Date(Date.now() + 3600 * 1000);
    const result = time.until(oneHourFromNow, "hours");
    expect(result).toBeGreaterThan(0.9);
    expect(result).toBeLessThan(1.1);
  });

  it("midnight returns correct time for next day", () => {
    const midnight = time.midnight();
    expect(midnight.getHours()).toBe(0);
    expect(midnight.getMinutes()).toBe(0);
    expect(midnight.getSeconds()).toBe(0);
  });

  it("midnight(true) returns today at 00:00", () => {
    const midnight = time.midnight(true);
    const now = new Date();
    expect(midnight.getDate()).toBe(now.getDate());
  });

  it("bedtime returns today at 18:00", () => {
    const bedtime = time.bedtime();
    expect(bedtime.getHours()).toBe(18);
    expect(bedtime.getMinutes()).toBe(0);
  });

  it("now returns a Date close to current time", () => {
    const result = time.now();
    expect(result).toBeInstanceOf(Date);
    expect(Math.abs(result.getTime() - Date.now())).toBeLessThan(5000);
  });

  it("between returns readable time difference", () => {
    const from = new Date();
    const to = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes later
    const result = time.between(from, to);
    expect(result).toMatch(/minute/);
  });

  it("isToday returns true for today's date", () => {
    expect(time.isToday(new Date())).toBe(true);
  });

  it("isToday returns false for yesterday", () => {
    const yesterday = new Date(Date.now() - 86400000);
    expect(time.isToday(yesterday)).toBe(false);
  });

  it("isTodayUTC matches today's UTC date", () => {
    const now = new Date();
    expect(time.isTodayUTC(now)).toBe(true);
  });
});
