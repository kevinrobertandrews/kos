/**
 * Parse command and arguments from the terminal
 */
export function getCommand() {
  const [command, ...args] = process.argv.slice(2);
  return { command, args };
}

export default {
  getCommandLineArguments: getCommand,
};
