import { mkdir } from "./mkdir";
import { TMP_DIR, ROOT, DATA_DIR, LOGS_DIR } from "@lib/paths";
import fs from "fs";
import path from "path";
import { afterEach, describe, expect, it } from "vitest";

const FOLDER_NAME = "my-cool-folder";

describe("disk.mkdir", () => {
  afterEach(() => {
    fs.rmSync(TMP_DIR, { recursive: true, force: true });
    fs.rmSync(DATA_DIR, { recursive: true, force: true });
    fs.rmSync(LOGS_DIR, { recursive: true, force: true });
  });

  it("should create a new directory if it does not exist", () => {
    const target = mkdir(FOLDER_NAME, "tmp");
    expect(fs.existsSync(target)).toBe(true);
  });

  it("should not throw if the directory already exists", () => {
    const run = () => mkdir(FOLDER_NAME, "tmp");
    run();
    expect(run).not.toThrow();
  });

  it("should return the full resolved directory path", () => {
    const nested = "deep/path/to/folder";
    const result = mkdir(nested, "tmp");
    expect(result).toBe(path.join(TMP_DIR, nested));
    expect(fs.existsSync(result)).toBe(true);
  });

  it("should create nested directories recursively", () => {
    const deep = "nested/dir/structure";
    const target = mkdir(deep, "tmp");
    expect(fs.existsSync(target)).toBe(true);
  });

  it("should create directory in TMP_DIR when scope is 'tmp'", () => {
    const result = mkdir(FOLDER_NAME, "tmp");
    expect(result.startsWith(TMP_DIR)).toBe(true);
  });

  const scopes = [
    { name: "root", base: ROOT },
    { name: "data", base: DATA_DIR },
    { name: "logs", base: LOGS_DIR },
  ] as const;

  scopes.forEach(({ name, base }) => {
    it(`should create directory in ${name.toUpperCase()} scope`, () => {
      const target = mkdir(FOLDER_NAME, name);
      expect(target.startsWith(base)).toBe(true);
      expect(fs.existsSync(target)).toBe(true);
    });
  });

  it("should throw for invalid scope", () => {
    expect(() => mkdir("whatever", "invalid" as any)).toThrow(
      /Invalid folder scope/i
    );
  });
});
