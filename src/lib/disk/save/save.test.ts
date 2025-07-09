import { describe, it, expect, afterEach } from "vitest";
import { save } from "./save";
import fs from "fs";
import path from "path";
import { TMP_DIR } from "@lib/paths";

const filePath = "journal/entry.txt";
const fullPath = path.join(TMP_DIR, filePath);

afterEach(() => {
  fs.rmSync(TMP_DIR, { recursive: true, force: true });
});

describe("disk.save", () => {
  it("should save data to a new file", () => {
    save(filePath, "hello\n", "tmp");
    const contents = fs.readFileSync(fullPath, "utf-8");
    expect(contents).toBe("hello\n");
  });

  it("should append data to an existing file", () => {
    save(filePath, "first\n", "tmp");
    save(filePath, "second\n", "tmp");

    const contents = fs.readFileSync(fullPath, "utf-8");
    expect(contents).toBe("first\nsecond\n");
  });

  it("should create nested directories automatically", () => {
    save("nested/deep/file.log", "yo", "tmp");
    const exists = fs.existsSync(path.join(TMP_DIR, "nested/deep/file.log"));
    expect(exists).toBe(true);
  });

  it("should return the full path to the saved file", () => {
    const result = save(filePath, "test", "tmp");
    expect(result).toBe(fullPath);
  });
});
