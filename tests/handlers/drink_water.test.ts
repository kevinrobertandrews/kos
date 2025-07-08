import { describe, it, expect } from "vitest";
import { drink_water } from "../../src/lib/handlers";
import { reduce } from "../../src/lib/state";

describe("drink_water", () => {
  it("should set the water value to 1", () => {
    const state = reduce([]);
    const test = drink_water(state);
    expect(test.water.level).toBe(1.0);
  });
});
