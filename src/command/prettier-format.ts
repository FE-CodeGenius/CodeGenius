import type { CAC } from "cac";

import { execCommand, loggerInfo } from "@/helper";
import { ACTIVATION, formatGlob } from "@/config";

export const prettierFormat = async (paths: string[]) => {
  if (ACTIVATION) {
    loggerInfo(`prettierFormat 参数信息: \n${JSON.stringify(paths)}`);
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
