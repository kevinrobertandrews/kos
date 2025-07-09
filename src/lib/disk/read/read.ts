import fs from "fs";
import path from "path";
import { TMP_DIR, ROOT, DATA_DIR, LOGS_DIR } from "@lib/paths";

type FolderScope = "root" | "tmp" | "data" | "logs";

/**
 * Reads file contents as UTF-8 text.
 *
 * @param {string} file - File name relative to scope base.
 * @param {FolderScope} scope - Which base directory to read from.
 * @returns {string | null} Contents or null if file does not exist.
 */
export function read(file: string, scope: FolderScope = "root"): string | null {
  const base = {
    tmp: TMP_DIR,
    data: DATA_DIR,
    logs: LOGS_DIR,
    root: ROOT,
  }[scope];

  const fullPath = path.join(base, file);

  try {
    if (fs.existsSync(fullPath)) {
      return fs.readFileSync(fullPath, "utf-8");
    }
    return null;
  } catch (err) {
    console.error("Could not read file", file, err);
    return null;
  }
}
