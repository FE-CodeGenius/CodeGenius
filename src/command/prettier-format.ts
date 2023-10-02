import type { CAC } from "cac";

import { ACTIVATION, formatGlob } from "@/config";
import { execCommand, loggerInfo } from "@/helper";

import { CodeGeniusOptions } from "./../types";

const mergeConfig = async (config: CodeGeniusOptions) => {
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

export default function prettierFormatInstaller(
  cli: CAC,
  config: CodeGeniusOptions,
) {
  return {
    name: "prettierFormatInstaller",
    setup: () => {
      cli
        .command("format", "运行 prettier 格式化代码风格")
        .option("-p, --pattern <pattern>", "设置匹配规则")
        .action(async (options) => {
          const { paths } = await mergeConfig(config);
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
