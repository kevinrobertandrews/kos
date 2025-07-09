import { mkdir } from "./mkdir";
import { TMP_DIR } from "@lib/paths";
import path from "path";
import { afterEach, describe, expect, it } from "vitest";
import fs from "fs";

const FOLDER_NAME = "my-cool-folder";

describe("disk.mkdir", () => {
  const target = path.join(TMP_DIR, FOLDER_NAME);

  afterEach(() => {
    fs.rmSync(TMP_DIR, { recursive: true, force: true });
  });

  it("should create a new directory if it does not exist", () => {
    const dir = mkdir("foo", "tmp");
    expect(fs.existsSync(dir)).toBe(true);
  });

  it("should not throw if the directory already exists", () => {
    const create = () => mkdir(FOLDER_NAME, "tmp");
    create();
    expect(create).not.toThrow();
  });
});
