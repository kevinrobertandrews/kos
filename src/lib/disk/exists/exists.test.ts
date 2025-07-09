import { describe, it, expect, afterEach } from "vitest";
import { exists } from "./exists";
import { save } from "../save/save";
import fs from "fs";
import path from "path";
import { TMP_DIR } from "@lib/paths";

afterEach(() => {
  fs.rmSync(TMP_DIR, { recursive: true, force: true });
});

describe("disk.exists", () => {
  it("should return true for an existing file", () => {
    save("truth.txt", "yes", "tmp");
    expect(exists("truth.txt", "tmp")).toBe(true);
  });

  it("should return false for a missing file", () => {
    expect(exists("ghost.txt", "tmp")).toBe(false);
  });

  it("should return true for an existing folder", () => {
    fs.mkdirSync(path.join(TMP_DIR, "folder"), { recursive: true });
    expect(exists("folder", "tmp")).toBe(true);
  });

  it("should return false for a missing folder", () => {
    expect(exists("missing-folder", "tmp")).toBe(false);
  });

  it("should default to root scope", () => {
    const file = "root.txt";
    const full = path.join(TMP_DIR, "..", file);
    fs.writeFileSync(full, "root");

    expect(exists(file)).toBe(true);

    fs.unlinkSync(full);
  });
});
