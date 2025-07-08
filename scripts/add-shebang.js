// TypeScript by default strips shebangs out, so we have to add it back in manually when we build

const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "../dist/index.js");
const shebang = "#!/usr/bin/env node\n";

const content = fs.readFileSync(outputPath, "utf8");
if (!content.startsWith(shebang)) {
  fs.writeFileSync(outputPath, shebang + content);
}
