import type { CAC } from "cac";

import { ACTIVATION, formatGlob } from "@/config";
import { execCommand, loadConfigModule, loggerInfo } from "@/helper";

const mergeConfig = async () => {
  const config = await loadConfigModule();
  const commands = config && config?.commands;
  if (commands && commands.format) {
    const { paths } = commands.format;
    return {
      paths: paths && paths.length > 0 ? paths : formatGlob,
    };
  }
  return {
    paths: formatGlob,
  };
};

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
        .option("-p, --pattern <pattern>", "设置匹配规则")
        .action(async (options) => {
          const { paths } = await mergeConfig();
          const { pattern } = options;
          if (pattern) {
            await prettierFormat(
              typeof pattern === "string" ? [pattern] : pattern,
            );
          } else {
            await prettierFormat(paths);
          }
        });
    },
  };
}
