// src/router.ts
export function routeCommand(command: string, args: string[]) {
  switch (command) {
    case "status":
      return console.log("📊 status...");
    case "water":
      return console.log("💧 water...");
    default:
      return console.log(`❓ Unknown command: ${command}`);
  }
}
