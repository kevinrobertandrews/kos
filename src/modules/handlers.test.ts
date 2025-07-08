import { describe, it, expect } from "vitest";
import { drink_water } from "./handlers";
import { reduce } from "./state";

describe("drink_water", () => {
  it("should set the water value to 1", () => {
    const state = reduce([]);
    const test = drink_water(state);
    expect(test.water.level).toBe(1.0);
  });
});
