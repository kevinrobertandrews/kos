/**
 * Parse command and arguments from the terminal
 */
export function getCommand() {
  const [command, ...args] = process.argv.slice(2);
  return { command, args };
}

/**
 * Command registry that defines program's commands
 */
export const Commands: Record<string, Command> = {
  Water: { name: "water", description: "log hydration" },
  Fuel: { name: "fuel", description: "log meals" },
  Status: { name: "status", description: "view current status" },
  Chore: { name: "chore", description: "add a chore done" },
} as const;

/**
 * Base command type
 */
type Command = {
  name: string;
  description: string;
};

/**
 * Easily get the possible commands as a type
 */
export type CommandKey = keyof typeof Commands;

/**
 * Easily retrieve the types possible command values
 */
export type CommandValue = (typeof Commands)[CommandKey];
