import { describe, it, expect, afterEach } from "vitest";
import { save } from "../save/save";
import { read } from "./read";
import fs from "fs";
import path from "path";
import { TMP_DIR } from "@lib/paths";

const filePath = "reading/test.log";
const fullPath = path.join(TMP_DIR, filePath);

afterEach(() => {
  fs.rmSync(TMP_DIR, { recursive: true, force: true });
});

describe("disk.read", () => {
  it("should return contents of an existing file", () => {
    save(filePath, "hello world", "tmp");
    const contents = read(filePath, "tmp");
    expect(contents).toBe("hello world");
  });

  it("should return null for a file that does not exist", () => {
    const contents = read("missing/file.log", "tmp");
    expect(contents).toBe(null);
  });

  it("should read files in nested directories", () => {
    save("nested/dir/file.txt", "deep thoughts", "tmp");
    const contents = read("nested/dir/file.txt", "tmp");
    expect(contents).toBe("deep thoughts");
  });

  it("should default to root scope", () => {
    const file = "test.txt";
    const full = path.join(TMP_DIR, "..", file);

    fs.writeFileSync(full, "rooty");

    const contents = read(file); // no scope provided
    expect(contents).toBe("rooty");

    fs.unlinkSync(full); // cleanup manually since we're outside TMP
  });
});
