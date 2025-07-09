import { clone } from "./clone";
import { describe, it, expect } from "vitest";

describe("clone", () => {
  it("deep clones nested objects", () => {
    const original = { a: 1, b: { c: 2 } };
    const copy = clone(original);
    expect(copy).toEqual(original);
    expect(copy.b).not.toBe(original.b);
  });

  it("clones arrays", () => {
    const original = [1, [2, 3]];
    const copy = clone(original);
    expect(copy).toEqual(original);
    expect(copy[1]).not.toBe(original[1]);
  });

  it("clones dates", () => {
    const date = new Date();
    const copy = clone(date);
    expect(copy).toEqual(date);
    expect(copy).not.toBe(date);
  });

  it("clones regexps", () => {
    const re = /hello/g;
    const copy = clone(re);
    expect(copy.source).toBe(re.source);
    expect(copy.flags).toBe(re.flags);
    expect(copy).not.toBe(re);
  });

  it("clones maps and sets", () => {
    const map = new Map([["a", { x: 1 }]]);
    const copyMap = clone(map);
    expect(copyMap.get("a")).toEqual({ x: 1 });
    expect(copyMap.get("a")).not.toBe(map.get("a"));

    const set = new Set([{ x: 1 }]);
    const copySet = clone(set);
    expect([...copySet][0]).toEqual({ x: 1 });
    expect([...copySet][0]).not.toBe([...set][0]);
  });
});
