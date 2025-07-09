import fs from "fs";
import path from "path";

function mkdir(dir: string): void {
  const directory = path.resolve(__dirname, dir);

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

/**
 * Appends data to file
 */
function save(path: string, data: string): void {
  fs.appendFileSync(path, data, "utf-8");
}

function exists(path: string): boolean {
  return fs.existsSync(path);
}

export default {
  mkdir,
  save,
  exists,
};
