import fs from "fs";
import path from "path";
import { mkdir } from "../mkdir/mkdir";
import { TMP_DIR, ROOT, DATA_DIR, LOGS_DIR } from "@lib/paths";

type FolderScope = "root" | "tmp" | "data" | "logs";

/**
 * Appends data to a file, creating the directory (and file) if it doesn't exist.
 *
 * @param {string} file - File name (can include subfolders).
 * @param {string} data - The string data to append.
 * @param {FolderScope} scope - Folder category to save to.
 * @returns {string} Full path to the file.
 */
export function save(
  file: string,
  data: string,
  scope: FolderScope = "root"
): string {
  const base = {
    tmp: TMP_DIR,
    data: DATA_DIR,
    logs: LOGS_DIR,
    root: ROOT,
  }[scope];

  const fullPath = path.join(base, file);
  const dir = path.dirname(fullPath);

  mkdir(path.relative(base, dir), scope); // Create any missing directories within the scope
  fs.appendFileSync(fullPath, data, "utf-8");

  return fullPath;
}
