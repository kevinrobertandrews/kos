import { describe, it, expect } from "vitest";
import { drink_water } from "../../src/modules/handlers";
import { reduce } from "../../src/modules/state";

describe("drink_water", () => {
  it("should set the water value to 1", () => {
    const state = reduce([]);
    const test = drink_water(state);
    expect(test.water.level).toBe(1.0);
  });
});
