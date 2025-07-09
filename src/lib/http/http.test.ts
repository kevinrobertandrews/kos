import { describe, it, expect } from "vitest";
import { ping } from "./ping";

describe("http module", () => {
  it("ping should return false for non-existent server", async () => {
    const result = await ping("http://localhost:9999");
    expect(result).toBe(false);
  });
});