import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as disk from "./functions";
import fs from "fs";
import path from "path";
import { TMP_DIR } from "@lib/paths";

const TEST_FILE = path.join(TMP_DIR, "test.txt");

describe("disk module", () => {
  beforeEach(() => {
    fs.mkdirSync(TMP_DIR, { recursive: true });
    fs.writeFileSync(TEST_FILE, "", "utf-8");
  });
  afterEach(() => {
    fs.rmSync(TMP_DIR, { recursive: true, force: true });
  });
  it("mkdir should create a new directory if it does not exist", () => {
    const target = path.join(TMP_DIR, "my-cool-folder");
    disk.mkdir(target);
    expect(fs.existsSync(target)).toBe(true);
  });

  it.todo("mkdir should not throw if the directory already exists");

  it.todo("exists should return true for existing files");

  it.todo("exists should return false for non-existing files");

  it.todo("save should create the directory if it does not exist");

  it.todo("save should append data to a new file");

  it.todo("save should append data to an existing file");

  it.todo("save should not throw if file already exists");

  it.todo("should handle relative and absolute paths correctly");

  it.todo("cleanup: remove test file and tmp dir after each test");
});
