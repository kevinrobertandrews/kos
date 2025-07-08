// Commands is where the system defines what commands are possible

type Command = {
  name: string;
  description: string;
};

export const Commands: Record<string, Command> = {
  Water: { name: "water", description: "log hydration" },
  Fuel: { name: "fuel", description: "log meals" },
  Status: { name: "status", description: "view current status" },
  Chore: { name: "chore", description: "add a chore done" },
} as const;

export type CommandKey = keyof typeof Commands;
export type CommandValue = (typeof Commands)[CommandKey];

export function getCommand() {
  const [command, ...args] = process.argv.slice(2);
  return { command, args };
}

/* 

Potential structure to consider

returns something like { command: "water", { drank: true, cup: true }}

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

*/
