/**
 * A safe, reusable helper to get the current module’s directory path, replicating __dirname in ESM.
 *
 * Why?
 * In ESM, __dirname and __filename are not available. But you can use import.meta.url and a conversion trick.
 */
import { fileURLToPath } from "url";
import { dirname } from "path";

export function getESModuleDir(importMeta: ImportMeta): string {
  return dirname(fileURLToPath(importMeta.url));
}
