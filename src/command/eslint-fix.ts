import type { CAC } from "cac";

import { ACTIVATION, eslintGlob } from "@/config";
import {
  execCommand,
  loadConfigModule,
  loggerError,
  loggerInfo,
  printError,
  printInfo,
} from "@/helper";

const mergeConfig = async () => {
  const config = await loadConfigModule();
  const commands = config && config?.commands;
  if (commands && commands.fix) {
    const { paths } = commands.fix;
    return {
      paths: paths && paths.length > 0 ? paths : eslintGlob,
    };
  }
  return {
    paths: eslintGlob,
  };
};

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
          const { paths } = await mergeConfig();
          const { pattern } = options;
          if (pattern) {
            await eslintFix(typeof pattern === "string" ? [pattern] : pattern);
          } else {
            await eslintFix(paths);
          }
        });
    },
  };
}
