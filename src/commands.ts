// commands.ts
export const Command = {
  Water: { name: "water", description: "log hydration" },
  Fuel: { name: "fuel", description: "log meals" },
  Status: { name: "status", description: "view current status" },
} as const;

export type CommandKey = keyof typeof Command;
export type CommandValue = (typeof Command)[CommandKey];

export function getCommand() {
  const [command, ...args] = process.argv.slice(2);
  return { command, args };
}

export function parseArgs() {
  const raw = process.argv.slice(2);
  const [command, ...rest] = raw;

  const flags: Record<string, string | boolean> = {};
  rest.forEach((arg) => {
    if (arg.includes("=")) {
      const [key, value] = arg.split("=");
      flags[key] = value;
    } else {
      flags[arg] = true;
    }
  });

  return { command, flags };
}
