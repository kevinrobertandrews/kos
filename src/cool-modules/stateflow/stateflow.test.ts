import { describe, it, expect, vi } from "vitest";
import { createStateflow } from "./stateflow";

describe("stateflow", () => {
  it("should emit a change event on set", () => {
    const flow = createStateflow({ initial: { mode: "idle" } });

    const listener = vi.fn();
    flow.subscribe("change", listener);

    flow.set({ mode: "active" });

    expect(listener).toHaveBeenCalledOnce();
    expect(flow.get().mode).toBe("active");
  });

  it("should schedule a state change", async () => {
    const flow = createStateflow({ initial: { count: 0 } });

    const listener = vi.fn();
    flow.subscribe("change", listener);

    flow.schedule({ count: 10 }, 100);

    await new Promise((r) => setTimeout(r, 150));

    expect(flow.get().count).toBe(10);
    expect(listener).toHaveBeenCalledOnce();
  });

  it("should expire keys after TTL", async () => {
    const flow = createStateflow({
      initial: { mode: "temporary" },
      ttl: { mode: 100 }
    });

    await new Promise((r) => setTimeout(r, 150));

    expect(flow.get().mode).toBeUndefined();
  });
});