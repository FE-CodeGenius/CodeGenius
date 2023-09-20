import type { CAC } from "cac";

import { execCommand, loggerInfo } from "@/shared/index";
import { ACTIVATION, eslintGlob } from "@/shared/config";

export const eslintFix = async (paths: string[]) => {
  if (ACTIVATION) {
    loggerInfo("eslintFix 参数信息: \n");
    console.table(paths);
  }

  await execCommand(
    "npx",
    ["eslint", "--fix", "--fix-type", "problem,suggestion", ...paths],
    {
      stdio: "inherit",
    },
  );
};

export default function eslintFixInstaller(cli: CAC) {
  return {
    name: "eslintFixInstaller",
    setup: () => {
      cli
        .command("fix", "运行 eslint 静态扫描和修复代码中存在的问题")
        .option("-p, --pattern <pattern>", "设置匹配规则", {
          default: [...eslintGlob],
        })
        .action(async (options) => {
          const patterns =
            typeof options.pattern === "string"
              ? [options.pattern]
              : options.pattern;
          await eslintFix(patterns);
        });
    },
  };
}
