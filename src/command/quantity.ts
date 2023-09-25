import type { CAC } from "cac";

import { execCommand, loggerInfo } from "@/helper";
import path from "node:path";
import { ACTIVATION } from "@/config";

export const quantity = async (dir: string) => {
  if (ACTIVATION) {
    loggerInfo(`clear 参数信息: \n${dir}`);
  }
  const root = path.join(process.cwd(), dir);
  await execCommand("npx", ["cloc", root], {
    stdio: "inherit",
  });
};

export default function quantityInstaller(cli: CAC) {
  return {
    name: "quantityInstaller",
    setup: () => {
      cli
        .command("quantity", "运行 cloc 分析并统计代码量")
        .option("-p, --path <path>", "设置代码路径", {
          default: ".",
        })
        .action(async (options) => {
          const { path } = options;
          await quantity(path);
        });
    },
  };
}
