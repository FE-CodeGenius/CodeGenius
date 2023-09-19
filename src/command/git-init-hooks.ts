import path from "node:path";
import { existsSync } from "node:fs";

import { execCommand } from "@/shared/index";

export const gitInitSimpleHooks = async (cwd = process.cwd()) => {
  const dohusky = path.join(cwd, ".husky");
  const githooks = path.join(cwd, ".git", "hooks");
  const exists = existsSync(dohusky);
  if (exists) {
    await execCommand("npx", ["rimraf", dohusky], {
      stdio: "inherit",
    });
    await execCommand("git", ["config", "core.hooksPath", githooks], {
      stdio: "inherit",
    });
  }
  await execCommand("npx", ["rimraf", githooks], {
    stdio: "inherit",
  });
  await execCommand("npx", ["simple-git-hooks"], { stdio: "inherit" });
};
