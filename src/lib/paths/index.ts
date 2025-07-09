import path from "path";
import esm from "@lib/esm";

export const ROOT = path.resolve(esm.__dirname, "../..");
export const TMP_DIR = path.join(ROOT, "__tmp__");
export const LOGS_DIR = path.join(ROOT, "logs");
export const DATA_DIR = path.join(ROOT, "data");
export const CONFIG_FILE = path.join(ROOT, "config.json");
