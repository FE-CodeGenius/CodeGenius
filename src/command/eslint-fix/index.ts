import type { CAC } from "cac";

import { ACTIVATION, eslintGlob } from "@/config";
import { execCommand } from "@/helper";
import { loggerError, loggerInfo, printError, printInfo } from "@/logger";
import { CommandsOptions } from "@/types";

export const eslintFix = async (paths: string[]) => {
  if (ACTIVATION) {
    loggerInfo(`eslintFix 参数信息: \n ${paths}`);
  }

  try {
    await execCommand("npx", ["eslint", "--fix", ...paths], {
      stdio: "inherit",
    });
    printInfo("代码已通过 eslint 校验");
  } catch (error) {
    printError(`代码未通过 eslint 校验`);
    loggerError(error);
    process.exit(1);
  }
};

export default function eslintFixInstaller(config: CommandsOptions) {
  const { fix } = config;
  return {
    name: "fix",
    describe: "运行 eslint 静态扫描和修复代码中存在的问题",
    command: "fix",
    setup: (cli: CAC) => {
      cli
        .command("fix", "运行 eslint 静态扫描和修复代码中存在的问题")
        .option("-p, --pattern <pattern>", "设置匹配规则")
        .action(async (options) => {
          let paths = fix?.paths || eslintGlob;
          const { pattern } = options;
          if (pattern) {
            paths = typeof pattern === "string" ? [pattern] : pattern;
          }
          await eslintFix(paths);
        });
    },
  };
}
