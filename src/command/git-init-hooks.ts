import path from "node:path";
import { existsSync } from "node:fs";

import { execCommand } from "@/shared/index";
import { action, command } from "@/shared/reflect";
import { BaseCommand } from "@/shared/types";

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

@command("hooks", "新增或修改 simple-git-hooks 配置后需要重新初始化")
export class GitInitSimpleHooksCommand extends BaseCommand {
  @action
  protected async action(): Promise<void> {
    await gitInitSimpleHooks();
  }
}
