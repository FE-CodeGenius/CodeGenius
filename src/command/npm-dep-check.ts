import type { CAC } from "cac";

import { execCommand } from "@/shared/index";

export const npmDepCheck = async () => {
  await execCommand("npx", ["npm-check"], {
    stdio: "inherit",
  });
};

export default function npmDepCheckInstaller(cli: CAC) {
  return {
    name: "npmDepCheckInstaller",
    setup: () => {
      cli
        .command(
          "depcheck",
          "运行 npm-check 检查过时的、不正确的和未使用的依赖项",
        )
        .action(async () => {
          await npmDepCheck();
        });
    },
  };
}
