import { describe, expect, it } from "vitest";
import { event } from ".";

describe("event module", () => {
  it("should have a name", () => {
    const evt = event("hi");
    expect(evt.name).toBe("hi");
  });
});
