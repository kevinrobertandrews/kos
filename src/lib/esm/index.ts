import { fileURLToPath } from "url";
import { dirname } from "path";

// these two lines recreate __filename and __dirname
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export default {
  __filename,
  __dirname,
};
