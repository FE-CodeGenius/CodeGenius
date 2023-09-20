import type { CAC } from "cac";

import { execCommand, loggerInfo } from "@/shared/index";
import { ACTIVATION, clearGlob } from "@/shared/config";

export const clear = async (paths: string[]) => {
  if (ACTIVATION) {
    loggerInfo("clear 参数信息: \n");
    console.table(paths);
  }
  await execCommand("npx", ["rimraf", "--glob", ...paths], {
    stdio: "inherit",
  });
};

export default function clearInstaller(cli: CAC) {
  return {
    name: "clearInstaller",
    setup: () => {
      cli
        .command("clear", "运行 rimraf 删除不再需要的文件或文件夹")
        .option("-p, --pattern <pattern>", "设置配置规则", {
          default: [...clearGlob],
        })
        .action(async (options) => {
          const patterns =
            typeof options.pattern === "string"
              ? [options.pattern]
              : options.pattern;
          await clear(patterns);
        });
    },
  };
}
