import path from "path";

export const ROOT = path.resolve(__dirname, "../..");
export const TMP_DIR = path.join(ROOT, "__tmp__");
export const LOGS_DIR = path.join(ROOT, "logs");
export const DATA_DIR = path.join(ROOT, "data");
export const CONFIG_FILE = path.join(ROOT, "config.json");
