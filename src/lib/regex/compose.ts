export function build(parts: string[]): RegExp {
  return new RegExp(parts.join(""), "g");
}
