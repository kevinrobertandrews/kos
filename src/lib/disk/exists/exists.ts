import fs from "fs";
import path from "path";
import { TMP_DIR, ROOT, DATA_DIR, LOGS_DIR } from "@lib/paths";

type FolderScope = "root" | "tmp" | "data" | "logs";

/**
 * Check whether a file or directory exists.
 *
 * @param {string} target - File or folder relative to scope base.
 * @param {FolderScope} scope - The base folder to resolve from.
 * @returns {boolean} Whether the target exists.
 */
export function exists(target: string, scope: FolderScope = "root"): boolean {
  const base = {
    tmp: TMP_DIR,
    data: DATA_DIR,
    logs: LOGS_DIR,
    root: ROOT,
  }[scope];

  const fullPath = path.join(base, target);
  return fs.existsSync(fullPath);
}
