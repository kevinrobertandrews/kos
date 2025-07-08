import { describe, it, expect } from "vitest";
import { reduce } from "../src/lib/state";

describe("reduce", () => {
  it("returns a default state when logs are empty", () => {
    const state = reduce([]);
    expect(state.water.level).toBe(0);
    expect(state.fuel.level).toBe(0);
    expect(state.chores.count).toBe(0);
  });
});
