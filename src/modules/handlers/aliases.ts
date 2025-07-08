import { Commands } from "../commands";

const aliases: Record<string, string> = {
  eat: Commands.Fuel.name,
  food: Commands.Fuel.name,
  drink: Commands.Water.name,
  hydrate: Commands.Water.name,
} satisfies Record<string, string>;

export function resolveCommand(input: string): string {
  return aliases[input] ?? input;
}
