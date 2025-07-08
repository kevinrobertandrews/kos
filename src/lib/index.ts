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
