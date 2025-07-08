import fs from "fs";

function makeDirectory(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export default {
  makeDirectory,
};
