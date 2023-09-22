import type { CAC } from "cac";

import {
  execCommand,
  loggerError,
  printError,
  printInfo,
} from "@/shared/index";

export const npmDepCheck = async () => {
  try {
    await execCommand("npx", ["depcheck"], {
      stdio: "inherit",
    });
    printInfo("项目依赖检查通过");
  } catch (error) {
    printError(`项目依赖存在一些问题`);
    loggerError(error);
    process.exit(1);
  }
};

export default function npmDepCheckInstaller(cli: CAC) {
  return {
    name: "npmDepCheckInstaller",
    setup: () => {
      cli
        .command(
          "depcheck",
          "运行 depcheck 检查过时的、不正确的和未使用的依赖项",
        )
        .action(async () => await npmDepCheck());
    },
  };
}
