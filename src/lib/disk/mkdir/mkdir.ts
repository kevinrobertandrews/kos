import path from "path";
import fs from "fs";
import { TMP_DIR, ROOT, DATA_DIR, LOGS_DIR } from "@lib/paths";

type FolderScope = "root" | "tmp" | "data" | "logs";

/**
 * Create a directory if it doesn't exist.
 *
 * @param {string} folder - Name of directory being created.
 */
export function mkdir(folder: string, scope: FolderScope = "root"): string {
  const base = {
    tmp: TMP_DIR,
    data: DATA_DIR,
    logs: LOGS_DIR,
    root: ROOT,
  }[scope];

  if (!base) {
    throw new Error(`Invalid folder scope: ${scope}`);
  }

  const directory = path.join(base, folder);

  try {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
    return directory;
  } catch (err) {
    console.error("Could not make directory:", directory, err);
    throw err;
  }
}
