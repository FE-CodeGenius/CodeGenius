import type { CAC } from "cac";

import { readFileSync } from "node:fs";
import path from "node:path";

import { printError, printInfo, execCommand } from "@/helper";

export const gitCommitVerify = async () => {
  const dogit = await execCommand("git", ["rev-parse", "--show-toplevel"]);
  const root = path.join(dogit || "", ".git", "COMMIT_EDITMSG");

  const content = readFileSync(root, { encoding: "utf-8" }).trim();

  const REG_EXP =
    /(?<type>[a-z]+)(\((?<scope>.+)\))?(?<breaking>!)?: (?<description>.+)/i;
  if (!REG_EXP.test(content)) {
    printError(
      "Git 提交信息不符合 Angualr 规范, 建议运行 `npx code-genius commit` 生成规范信息",
    );
    process.exit(1);
  } else {
    printInfo("Git 提交信息校验通过");
  }
};

export default function gitCommitVerifyInstaller(cli: CAC) {
  return {
    name: "gitCommitVerifyInstaller",
    setup: () => {
      cli
        .command("verify", "校验 COMMIT_EDITMSG 中的信息是否符合 Angualr 规范")
        .action(async () => {
          await gitCommitVerify();
        });
    },
  };
}
