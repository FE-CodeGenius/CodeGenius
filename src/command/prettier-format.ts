import type { CAC } from "cac";

import { execCommand, loggerInfo } from "@/shared/index";
import { ACTIVATION, formatGlob } from "@/shared/config";
import { action, args, command } from "@/shared/reflect";
import { BaseCommand } from "@/shared/types";

export const prettierFormat = async (paths: string[]) => {
  if (ACTIVATION) {
    loggerInfo("prettierFormat 参数信息: \n");
    console.table(paths);
  }

  await execCommand("npx", ["prettier", "--write", ...paths], {
    stdio: "inherit",
  });
};

export default function prettierFormatInstaller(cli: CAC) {
  return {
    name: "prettierFormatInstaller",
    setup: () => {
      cli
        .command("format", "运行 prettier 格式化代码风格")
        .option("-p, --pattern <pattern>", "设置匹配规则", {
          default: [...formatGlob],
        })
        .action(async (options) => {
          const patterns =
            typeof options.pattern === "string"
              ? [options.pattern]
              : options.pattern;
          await prettierFormat(patterns);
        });
    },
  };
}

@command("format", "运行 prettier 格式化代码风格")
export class PrettierFormatCommand extends BaseCommand {
  @args({
    rawName: "-p, --pattern <pattern>",
    description: "设置匹配规则设置匹配规则",
    default: [...formatGlob],
  })
  pattern: string | undefined;

  @action
  protected async action(options: { pattern: string }): Promise<void> {
    const patterns =
      typeof options.pattern === "string" ? [options.pattern] : options.pattern;
    await prettierFormat(patterns);
  }
}
