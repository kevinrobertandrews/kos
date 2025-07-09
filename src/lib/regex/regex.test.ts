import { describe, it, expect } from "vitest";
import { match, capture, build } from "./index";

describe("regex", () => {
  it("should match an email", () => {
    const str = "Email me at kevin@example.com!";
    const result = str.match(match.email);
    expect(result?.[0]).toBe("kevin@example.com");
  });

  it("should build and match a custom pattern", () => {
    const pattern = build([capture("\\d{3}"), "-", capture("\\d{4}")]);
    const result = "Call me at 123-4567".match(pattern);
    expect(result).toBeTruthy();
  });
});
