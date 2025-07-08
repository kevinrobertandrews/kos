import { describe, it, expect } from "vitest";
import { water, fuel, chore } from "./handlers";
import { reduce } from "./state";

describe("water", () => {
  it("should set the water value to 1", () => {
    const state = reduce([]);
    const test = water(state);
    expect(test.water.level).toBe(1.0);
  });
});

describe("fuel", () => {
  it("should set the fuel value to 1", () => {
    const state = reduce([]);
    const test = fuel(state);
    expect(test.fuel.level).toBe(1.0);
  });
});

describe("chore <name>", () => {
  it("should increment chore value", () => {
    const state = reduce([]);
    const test = chore(state, ["wash dishes"]);
    expect(test.chores.count).toBe(1.0);
  });
});
