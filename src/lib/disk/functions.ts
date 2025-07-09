import { ROOT } from "@lib/paths";
import fs from "fs";
import path from "path";

/**
 * Create a directory if it doesn't exist.
 *
 * @param {string} dir - Relative or absolute path to the directory.
 */
export function mkdir(dir: string): void {
  const directory = path.resolve(ROOT, dir);
  console.log("[mkdir]", directory);

  //   if (!fs.existsSync(directory)) {
  //     fs.mkdirSync(directory, { recursive: true });
  //   }

  if (fs.existsSync(directory)) {
    throw Error("oh noes!");
  }
}

/**
 * Append data to a file, creating the file and directory if necessary.
 *
 * @param {string} filePath - Path to the file.
 * @param {string} data - String data to append.
 */
export function save(filePath: string, data: string): void {
  if (!exists(filePath)) {
    const dir = path.dirname(filePath);
    mkdir(dir);
  }
  fs.appendFileSync(filePath, data, "utf-8");
}

/**
 * Check whether a file or directory exists.
 *
 * @param {string} filePath - Path to check.
 * @returns {boolean} True if the file or directory exists.
 */
export function exists(filePath: string): boolean {
  return fs.existsSync(filePath);
}
