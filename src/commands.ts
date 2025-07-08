// commands.ts
export const Command = {
  Water: { name: "water", description: "log hydration" },
  Fuel: { name: "fuel", description: "log meals" },
  Status: { name: "status", description: "view current status" },
} as const;

export type CommandKey = keyof typeof Command;
export type CommandValue = (typeof Command)[CommandKey];
